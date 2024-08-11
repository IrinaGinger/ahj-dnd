import './board.css';

export default class Board {
    constructor(parent) {
        this.parent = parent;
    }

    render() {
        const boardElem = document.createElement('div');
        boardElem.classList.add('board');

        return boardElem;
    }
}