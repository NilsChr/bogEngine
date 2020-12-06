import Vector2 from "./vector2";

export default class Circle {

    pos: Vector2;
    radius: number;

    constructor(pos: Vector2, radius: number) {
        this.pos = pos;
        this.radius = radius;
    }

    intersectsCircle(other: Circle) {
        const dx = this.pos.x - other.pos.x;
        const dy = this.pos.y - other.pos.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        return d <= this.radius + other.radius;
    }

}