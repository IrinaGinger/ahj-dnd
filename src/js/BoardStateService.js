export default class BoardStateService {

    static save(boardState) {
        localStorage.setItem('boardState', JSON.stringify(boardState));
    }

    static load() {
        try {
            return JSON.parse(localStorage.getItem('boardState'));
        } catch (e) {
            throw new Error('Invalid state');
        }
    }
}