import Vector2 from "./vector2";
import p5 from "p5";

export default class Line {
  start: Vector2;
  end: Vector2;

  constructor(start: Vector2, end: Vector2) {
    this.start = start;
    this.end = end;
  }

  toPoints(): Vector2[] {
    return [this.start.copy(), this.end.copy()];
  }

  get_line_intersection(other: Line): Vector2 {
    let s02_x, s02_y, s10_x, s10_y, s32_x, s32_y, s_numer, t_numer, denom, t;
    s10_x = this.end.x - this.start.x;
    s10_y = this.end.y - this.start.y;
    s32_x = other.end.x - other.start.x;
    s32_y = other.end.y - other.start.y;

    let x, y;

    denom = s10_x * s32_y - s32_x * s10_y;
    if (denom == 0) return null; // Collinear
    let denomPositive = denom > 0;

    s02_x = this.start.x - other.start.x;
    s02_y = this.start.y - other.start.y;
    s_numer = s10_x * s02_y - s10_y * s02_x;
    if (s_numer < 0 == denomPositive) return null; // No collision

    t_numer = s32_x * s02_y - s32_y * s02_x;
    if (t_numer < 0 == denomPositive) return null; // No collision

    if (s_numer > denom == denomPositive || t_numer > denom == denomPositive)
      return null; // No collision
    // Collision detected

    t = t_numer / denom;
    if (x == null) x = this.start.x + t * s10_x;
    if (y == null) y = this.start.y + t * s10_y;

    return new Vector2(x, y);
  }

  debug(p: p5) {
    p.noFill();
    p.line(this.start.x, this.start.y, this.end.x, this.end.y);
  }
}
