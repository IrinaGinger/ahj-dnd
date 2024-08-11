import './column.css';

export default class Column {
    constructor(header) {
        this.header = header;
    }

    render() {
        const column = document.createElement('div');
        column.classList.add('column');

        const header = document.createElement('h2');
        header.classList.add('column-head');
        header.textContent = this.header;

        column.appendChild(header);

        return column;
    }


}