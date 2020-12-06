import Camera from "./camera";
import GameObject from "./models/gameObject";
import { Scene } from "./models/scene";
import p5 from "p5";
import Vector2 from "./physics/vector2";

class GameEngine {
  private deleteBeforeNextFrame: number[] = [];
  private deleteBeforeNextFrameGUI: number[] = [];

  private gameObjects: GameObject[] = [];
  private guiElements: GameObject[] = [];

  private id: number = 1;
  private scene: Scene;
  private camera: Camera;

  constructor() {}

  public run(p5: p5) {
    p5.push();

    if (this.camera) {
      p5.translate(-this.camera.pos.x, -this.camera.pos.y);
      p5.scale(this.camera.scale.x, this.camera.scale.y);
    }

    // Physics
    this.gameObjects.filter((o) => o.update != null).forEach((o) => o.update());

    // Renderer
    this.gameObjects
      .filter((o) => o.render != null)
      .forEach((o) => o.render(p5));

    p5.pop();

    this.guiElements
      .filter((o) => o.render != null)
      .forEach((o) => o.render(p5));

    // Delete Object
    for (let i = this.gameObjects.length - 1; i >= 0; i--) {
      if (this.deleteBeforeNextFrame.includes(this.gameObjects[i].id)) {
        this.deleteBeforeNextFrame.splice(
          this.deleteBeforeNextFrame.indexOf(this.gameObjects[i].id, 1)
        );

        this.gameObjects.splice(i, 1);
      }
    }

    for (let i = this.guiElements.length - 1; i >= 0; i--) {
      if (this.deleteBeforeNextFrameGUI.includes(this.guiElements[i].id)) {
        console.log(this.guiElements[i]);

        this.guiElements.splice(i, 1);
      }
    }
  }

  public getId() {
    return this.id++;
  }

  public setupCamera(camera: Camera) {
    this.camera = camera;
  }

  public getCamera(): Camera {
      return this.camera;
  }

  public addGameObject(gameObject: GameObject) {
    console.log("ADDING GO", gameObject);
    this.gameObjects.push(gameObject);
    gameObject.init();
    this.gameObjects = this.gameObjects.sort((a, b) => {
      return a.z - b.z;
    });
  }

  public addGUIElement(guiElement: GameObject) {
    this.guiElements.push(guiElement);
    guiElement.init();
    this.guiElements = this.guiElements.sort((a, b) => {
      return a.z - b.z;
    });
  }

  public findGameObjectByTitle(title: string) {
    return this.gameObjects.filter((o) => o.title == title)[0];
  }
  public findGameObjectById(id: number) {
    return this.gameObjects.filter((o) => o.id == id)[0];
  }
  public findGUIElementByTitle(title: string) {
    return this.guiElements.filter((o) => o.title == title)[0];
  }
  public findGUIElementById(id: number) {
    return this.guiElements.filter((o) => o.id == id)[0];
  }

  public deleteGameObject(gameObject: GameObject, force: boolean) {
    if (force) gameObject.persist = false;
    this.deleteBeforeNextFrame.push(gameObject.id);
  }
  public deleteGuiElement(guiElement: GameObject, force: boolean) {
    if (force) guiElement.persist = false;
    this.deleteBeforeNextFrameGUI.push(guiElement.id);
  }

  public loadScene(scene: Scene) {
    this.gameObjects = this.gameObjects.filter((o) => o.persist == true);
    this.guiElements = this.guiElements.filter((o) => o.persist == true);
    if (this.scene && this.scene.beforeClose) this.scene.beforeClose();
    this.scene = scene;
    this.scene.init();
  }

  public mousePressed(mx: number, my: number) {
    let mouseScaled: Vector2;
    if (this.camera) {
      mouseScaled = this.camera.screenToWorldPoint(new Vector2(mx, my));
    }

    this.gameObjects
      .filter((o) => (<any>o).mousePressed != null)
      .forEach((o) => (<any>o).mousePressed(mouseScaled.x, mouseScaled.y));
    this.guiElements
      .filter((o) => (<any>o).mousePressed != null)
      .forEach((o) => (<any>o).mousePressed(mx, my));
  }

  public mouseReleased(mx: number, my: number) {
    let mouseScaled: Vector2;
    if (this.camera) {
      mouseScaled = this.camera.screenToWorldPoint(new Vector2(mx, my));
    }

    this.gameObjects
      .filter((o) => (<any>o).mouseReleased != null)
      .forEach((o) => (<any>o).mouseReleased(mouseScaled.x, mouseScaled.y));
    this.guiElements
      .filter((o) => (<any>o).mouseReleased != null)
      .forEach((o) => (<any>o).mouseReleased(mx, my));
  }

  public mouseDragged(dx: number, dy: number) {
    this.gameObjects
      .filter((o) => (<any>o).mouseDragged != null)
      .forEach((o) => (<any>o).mouseDragged(dx, dy));
    this.guiElements
      .filter((o) => (<any>o).mouseDragged != null)
      .forEach((o) => (<any>o).mouseDragged(dx, dy));
  }

  public mouseWheel(delta: number) {
    this.gameObjects
      .filter((o) => (<any>o).mouseWheel != null)
      .forEach((o) => (<any>o).mouseWheel(delta));
    this.guiElements
      .filter((o) => (<any>o).mouseWheel != null)
      .forEach((o) => (<any>o).mouseWheel(delta));
  }

  public touchPan(pos: Vector2, pan: Vector2) {
    this.gameObjects
    .filter((o) => (<any>o).touchPan != null)
    .forEach((o) => (<any>o).touchPan(pos, pan));
  this.guiElements
    .filter((o) => (<any>o).touchPan != null)
    .forEach((o) => (<any>o).touchPan(pos, pan));
  }
}

const GlobalGameEngine = new GameEngine();

export default GlobalGameEngine;
