export default class Vector2 {
    x: number;
    y: number;
  
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
    copy(): Vector2 {
      return new Vector2(this.x, this.y);
    }
  
    addTo(vec: Vector2) {
      this.x += vec.x;
      this.y += vec.y;
    }
  
    subtractTo(vec: Vector2) {
      this.x -= vec.x;
      this.y -= vec.y;
    }
  
    divideBy(scalar: number) {
      this.x /= scalar;
      this.y /= scalar;
    }
  
    multiplyBy(scalar: number) {
      this.x *= scalar;
      this.y *= scalar;
    }

    multiplyByOther(vec: Vector2) {
        this.x *= vec.x;
        this.y *= vec.y;
      }
  
    distanceTo(vec: Vector2) {
      var dist = Math.sqrt(
        Math.pow(this.x - vec.x, 2) + Math.pow(this.y - vec.y, 2)
      );
      return dist;
    }
  }
  