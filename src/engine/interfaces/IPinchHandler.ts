export default interface IPinchHandler {
    onPinch(type: IPinchType, scale: number);
}

export enum IPinchType {
    PINCHSTART = 'pinchstart',
    PINCHMOVE = 'pinchmove'
}