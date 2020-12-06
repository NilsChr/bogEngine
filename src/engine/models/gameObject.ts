import p5 from 'p5';
import GlobalGameEngine from '../gameEngine';

export default class GameObject {

    id: number;
    title: string;
    persist: boolean = false;
    z: number = -1;


    constructor(title: string) {
        this.title = title;
        this.id = GlobalGameEngine.getId();
    }

    init() {

    }

    update() {}
    render(p: p5) {}

}