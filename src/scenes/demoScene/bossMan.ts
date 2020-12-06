import AssetManager from "../../engine/managers/assetManager/assetManager";
import GameObject from "../../engine/models/gameObject";
import p5 from 'p5';
import Vector2 from "../../engine/physics/vector2";
import Assets from "../../engine/managers/assetManager/assets";
import GlobalGameEngine from "../../engine/gameEngine";
import Camera from "../../engine/camera";

export default class Bossman extends GameObject {

    pos: Vector2;

    camera: Camera;

    constructor(pos: Vector2) {
        super('Bossman');
        this.pos = pos;

        this.camera = GlobalGameEngine.getCamera();

        console.log(this.camera)
    }

    render(p5: p5) {
        p5.image(AssetManager.getImage(Assets.boss.key), this.pos.x,this.pos.y);
    }

    update() {
        this.pos.addTo(new Vector2(1,1));

        if(this.pos.x > this.camera.right()) {
            this.pos.x = 0;
        }
        if(this.pos.y > this.camera.bottom()) {
            this.pos.y = 0;
        }
    }

}