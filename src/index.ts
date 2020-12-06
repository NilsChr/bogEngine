import p5 from "p5";
import GlobalGameEngine from "./engine/gameEngine";
import AssetManager from "./engine/managers/assetManager/assetManager";
import DemoScene from "./scenes/demoScene/demoScene";
import "./engine/initSettings";
import { StateManager } from "./engine/managers/stateManager/stateManager";
import GlobalInput from "./engine/input";
import Vector2 from "./engine/physics/vector2";
import "hammerjs";

console.log(process.env.NODE_ENV);

const sketch = function (p: p5) {
  p.preload = function () {
    AssetManager.loadAssets(p);
  };

  p.setup = function () {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.noStroke();
    GlobalGameEngine.loadScene(new DemoScene());
  };
  p.draw = function () {
    p.background(0);

    GlobalInput.held = [...GlobalInput.held, ...GlobalInput.pressed].filter(
      (e) => !GlobalInput.released.includes(e)
    );
    GlobalInput.released = [];
    GlobalInput.pressed = [];

    GlobalGameEngine.run(p);
  };

  if (!StateManager.platform.isMobile) {
    p.keyPressed = function (e) {
      GlobalInput.pressed.push(e.key);
    };

    p.keyReleased = function (e) {
      GlobalInput.released.push(e.key);
    };

    p.mousePressed = function () {
      GlobalGameEngine.mousePressed(p.mouseX, p.mouseY);
    };

    p.mouseReleased = function () {
      GlobalGameEngine.mouseReleased(p.mouseX, p.mouseY);
    };

    p.mouseDragged = function (e: any) {
      GlobalGameEngine.mouseDragged(e.movementX, e.movementY);
    };

    p.mouseWheel = function (e: any) {
      GlobalGameEngine.mouseWheel(e.delta);
    };
  } else {
    // HAMMER TIME
    var mc = new Hammer(document.body);

    mc.get("pan").set({ direction: Hammer.DIRECTION_ALL });
    mc.get("pinch").set({
      enable: true,
    });
    mc.on("tap", function (ev) {
      GlobalGameEngine.mouseReleased(ev.center.x, ev.center.y);
    });

    mc.on("pan", function (ev: any) {
      let pos = new Vector2(ev.center.x, ev.center.y);
      let pan = new Vector2(ev.overallVelocityX.x, ev.overallVelocityY.y);

      GlobalGameEngine.touchPan(pos, pan);
    });

    var initScale = 1;
    mc.on("pinchstart pinchmove", function (ev) {
      //return;
      
      console.log(ev);
      let camera = GlobalGameEngine.getCamera();
      if (ev.type == "pinchstart") {
        initScale = camera.scale.x || 1;
      }

      camera.scale.x = initScale * ev.scale;
      camera.scale.y = initScale * ev.scale;
      
    });
  }
};
const p: p5 = new p5(sketch);

export default p;
