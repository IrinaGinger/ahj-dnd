export default class BoardState {
    constructor() {
        this.todo = [];
        this.inprogress = [];
        this.done = [];
    }

    static from(object) {
        const boardState = new BoardState();
        boardState.todo = object.todo;
        boardState.inprogress = object.inprogress;
        boardState.done = object.done;

        return boardState;
    }
}