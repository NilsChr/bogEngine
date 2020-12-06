import Vector2 from "./physics/vector2";

export default class Camera {
    
    pos: Vector2;
    scale: Vector2;
    dim: Vector2;

    constructor(pos: Vector2, scale: Vector2) {
        this.pos = pos;
        this.scale = scale;

        this.dim = new Vector2(window.innerWidth, window.innerHeight);
    }

    screenToWorldPoint(screenPos:Vector2): Vector2 {
        let worldPos = new Vector2(screenPos.x + this.pos.x, screenPos.y + this.pos.y);
        worldPos.x /= this.scale.x;
        worldPos.y /= this.scale.x;

        return worldPos;
    }

    setScale(scalarVec: Vector2) {
        this.scale = scalarVec;

        this.dim.x = window.innerWidth  / scalarVec.x;
        this.dim.y = window.innerHeight / scalarVec.y;
    }

    left() {
        return 0;
    }

    top() {
        return 0;
    }

    right() {
        return this.dim.x;
    }

    bottom() {
        return this.dim.y;
    }
}