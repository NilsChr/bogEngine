import Vector2 from "./vector2";
import p5 from "p5";

export default class HitBox {
  pos: Vector2;
  dim: Vector2;

  constructor(pos: Vector2, dim: Vector2) {
    this.pos = pos;
    this.dim = dim;
  }

  updatePosition(pos: Vector2) {
    this.pos = pos;
  }

  left(): number {
    return this.pos.x;
  }
  right(): number {
    return this.pos.x + this.dim.x;
  }
  top(): number {
    return this.pos.y;
  }
  bottom(): number {
    return this.pos.y + this.pos.y;
  }

  overlaps(other: HitBox): boolean {
    return !(
      other.left() > this.right() ||
      other.right() < this.left() ||
      other.top() > this.bottom() ||
      other.bottom() < this.top()
    );
  }

  pointInside(p: Vector2): boolean {
    return (
      p.x >= this.pos.x &&
      p.x <= this.pos.x + this.dim.x &&
      p.y >= this.pos.y &&
      p.y <= this.pos.y + this.dim.y
    );
  }

  debug = function (p: p5) {
    p.stroke(255, 0, 0);
    p.noFill();
    p.rect(this.x, this.y, this.w, this.h);
  };
}
