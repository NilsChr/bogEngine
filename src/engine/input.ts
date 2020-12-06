
class Input {

    pressed: string[] = [];
    released: string[] = [];
    held: string[] = [];

    constructor() {}

}

const GlobalInput = new Input();

export default GlobalInput;