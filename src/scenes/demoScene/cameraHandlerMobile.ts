import GameObject from "../../engine/models/gameObject";
import p5 from "p5";
import Vector2 from "../../engine/physics/vector2";
import GlobalGameEngine from "../../engine/gameEngine";
import Camera from "../../engine/camera";
import IPinchHandler, { IPinchType } from "../../engine/interfaces/IPinchHandler";
import IPanHandler from "../../engine/interfaces/IPanHandler";

export default class CameraHandlerMobile
  extends GameObject
  implements IPinchHandler, IPanHandler {
  pos: Vector2;
  initScale: number;
  camera: Camera;

  constructor(pos: Vector2) {
    super("CameraHandler");
    this.pos = pos;

    this.camera = GlobalGameEngine.getCamera();
  }

  render(p: p5) {}

  update() {}

  onPinch(type: IPinchType, scale: number) {
    if (type == "pinchstart") {
      this.initScale = this.camera.scale.x || 1;
    }
    this.camera.setScale(
      new Vector2(this.initScale * scale, this.initScale * scale)
    );
  }

  onPan(pos: Vector2, pan: Vector2) {
    this.camera.pos.x -= pan.x * 10;
    this.camera.pos.y -= pan.y * 10;
  }
}
