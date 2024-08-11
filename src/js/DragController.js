import BoardStateService from './BoardStateService';
import BoardState from './BoardState';

import boardList from '../data/board-list.json';

export default class DragController {
    constructor() {
        this.actualElement = null;
        this.draggedElement = null;
        this.shadow = null;
        this.mousePosition = {};
        this.distance = 10;

        this.boardState = new BoardState();

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
    }

    onMouseOver = (e) => {
        if (!this.actualElement) {
            return;
        }        
        
        if (this.shadow) {
            this.shadow.remove();
        }

        this.insertElement(this.shadow, e.clientX, e.clientY);

        this.draggedElement.style.top = e.clientY - this.mousePosition.y + 'px';
        this.draggedElement.style.left = e.clientX - this.mousePosition.x + 'px';
        
    }

    onMouseUp = (e) => {
        if (!this.draggedElement) {
            return;
        } 

        if (this.shadow) {
            this.shadow.remove();
            this.shadow = null;
        }

        this.actualElement.classList.remove('hide');
        const lastColumnName = this.actualElement.closest('.column').querySelector('.column-head').textContent;
        const cardText = this.actualElement.querySelector('.card-text').textContent;
        
        this.insertElement(this.actualElement, e.clientX, e.clientY);

        const newColumnName = this.actualElement.closest('.column').querySelector('.column-head').textContent;
                
        const data = BoardStateService.load();

        if (data) {
            this.boardState = BoardState.from(data);            
        }

        let foundIndex;

        for (let key in boardList) {                
            if (boardList[key] === lastColumnName) {   
                foundIndex = this.boardState[key].findIndex(elem => elem === cardText);                 
                if (foundIndex > -1) {
                    this.boardState[key].splice(foundIndex, 1);                       
                }
            }
            if (boardList[key] === newColumnName) {
                const next = this.actualElement.nextElementSibling.querySelector('.card-text');

                if (!next) {
                    this.boardState[key].push(cardText);
                } else {
                    foundIndex = this.boardState[key].findIndex(elem => elem === next.textContent);                 
                    if (foundIndex > -1) {
                        this.boardState[key].splice(foundIndex, 0, cardText);                       
                    }                    
                }
            }
        }
        
        BoardStateService.save(this.boardState);

        this.draggedElement.remove();
        this.draggedElement = null;
        this.actualElement = null;

        document.documentElement.removeEventListener('mouseup', this.onMouseUp);
        document.documentElement.removeEventListener('mouseover', this.onMouseOver);
    }


    onMouseDown = (e) => {
        if (e.target.classList.contains('card_close')) {
            return;
        }
        
        this.actualElement = e.target.closest('.card');
                
        if (!this.actualElement) {
            return;
        }

        e.preventDefault();

        const rect = this.actualElement.getBoundingClientRect(); 
        this.mousePosition.x = e.clientX - rect.left;
        this.mousePosition.y = e.clientY - rect.top;

        const container = document.querySelector('.container');
        this.draggedElement = this.actualElement.cloneNode(true);
        this.draggedElement.style.width = this.actualElement.clientWidth + 'px';
        
        this.draggedElement.classList.add('dragged');
        container.appendChild(this.draggedElement);
        this.draggedElement.style.top = e.clientY - this.mousePosition.y + 'px';
        this.draggedElement.style.left = e.clientX - this.mousePosition.x + 'px';

        this.shadow = this.actualElement.cloneNode(true);
        this.shadow.style.backgroundColor = 'rgb(230, 229, 229)';
        this.shadow.style.boxShadow = 'none';
        for (const child of this.shadow.children) {
           child.style.display = 'none';
        }
        
        this.actualElement.classList.add('hide');
        
        document.documentElement.addEventListener('mouseup', this.onMouseUp);
        document.documentElement.addEventListener('mouseover', this.onMouseOver);
    }

    insertElement(element, x, y) {
        if (!element) {
            return;
        }

        this.draggedElement.classList.add('hide');

        const target = document.elementFromPoint(x, y);
   
        const card = target.closest('.card');
        const column = target.closest('.column');
        
        if (!column) {
            return;
        }

        if (!card) {
            let currentElem = document.elementFromPoint(x, y - this.distance);
            let cardUp = currentElem.closest('.card');
            if (cardUp) {
                column.insertBefore(element, cardUp.nextElementSibling);
            } else {                
                const columnHead = column.querySelector('.column-head');
                if (currentElem === columnHead) {
                    let cardDown = columnHead.nextElementSibling.closest('.card');
                    if (cardDown) {
                        column.insertBefore(element, cardDown);
                    }                         
                } else {
                    const columnAddForm = column.querySelector('.add-card-form');
                    column.insertBefore(element, columnAddForm);
                }
            }    
        } else {
            const top = card.getBoundingClientRect().top;
    
            if (y > top + card.offsetHeight / 2) {
                column.insertBefore(element, card.nextElementSibling);
            } else {
                column.insertBefore(element, card);
            }
        }

        this.draggedElement.classList.remove('hide');        
    }

    init() {
        document.documentElement.addEventListener('mousedown', this.onMouseDown);

        return this;
    }
}