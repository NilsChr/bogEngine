import Camera from "../../engine/camera";
import GlobalGameEngine from "../../engine/gameEngine";
import { Scene } from "../../engine/models/scene";
import Vector2 from "../../engine/physics/vector2";
import Bossman from "./bossman";

export default class DemoScene extends Scene {
  constructor() {
    super("Demo Scene");
  }

  init() {
    GlobalGameEngine.setupCamera(new Camera(new Vector2(50,50), new Vector2(1,1)));

    GlobalGameEngine.addGameObject(new Bossman(new Vector2(0,0)));

  }
}
