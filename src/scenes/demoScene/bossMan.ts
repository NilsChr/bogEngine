import AssetManager from "../../engine/managers/assetManager/assetManager";
import GameObject from "../../engine/models/gameObject";
import p5 from "p5";
import Vector2 from "../../engine/physics/vector2";
import Assets from "../../engine/managers/assetManager/assets";
import GlobalGameEngine from "../../engine/gameEngine";
import Camera from "../../engine/camera";
import Time from "../../engine/managers/time";
import { EventManager } from "../../engine/managers/eventManager/eventManager";

export default class Bossman extends GameObject {
  pos: Vector2;

  camera: Camera;

  img: p5.Image;

  constructor(pos: Vector2) {
    super("Bossman");
    this.pos = pos;

    this.camera = GlobalGameEngine.getCamera();

    console.log(this.camera);
    this.img = AssetManager.getImage(Assets.boss.key);

    let sub = EventManager.subscribe({
      eventName: "tap",
      callback: function (e) {
          console.log('GETTING TAPPED');
      },
    });
  }

  render(p5: p5) {
    p5.fill(255, 0, 0);
    p5.rect(100, 100, 100, 100);
    p5.image(this.img, this.pos.x, this.pos.y);
  }

  update() {
    let velocity = new Vector2(50, 50);
    velocity.multiplyBy(Time.deltaTime);
    this.pos.addTo(velocity);

    if (this.pos.x > this.camera.right()) {
      this.pos.x = 0;
    }
    if (this.pos.y > this.camera.bottom()) {
      this.pos.y = 0;
    }
  }
}
