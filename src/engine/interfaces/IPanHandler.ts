import Vector2 from "../physics/vector2";

export default interface IPanHandler {
    onPan(pos: Vector2, pan:Vector2);
}