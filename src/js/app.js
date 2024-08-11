import Board from '../components/board/board';
import Column from '../components/column/column';
import Card from '../components/card/card';
import AddCardForm from '../components/form/addcard';

import boardList from '../data/board-list.json';
import cardList from '../data/card-list.json';

import DragController from './DragController';
import BoardStateService from './BoardStateService';
import BoardState from './BoardState';

export default class App { 
    constructor() {
        this.board = null;
        this.columns = {};
       
        this.boardState = new BoardState();
        
        this.mouseClick = this.mouseClick.bind(this);
    }

    init() {
        const container = document.querySelector('.container');
        let content;

        const data = BoardStateService.load();

        if (data) {
            content = BoardState.from(data);
        } else {
            content = cardList;
        }

        this.drawUI(container, content);
        document.addEventListener('click', this.mouseClick);

        const dragCtrl = new DragController(this.boardState);
        dragCtrl.init();
    }

    drawUI(container, content) {
        const board = new Board(container);
        this.board = board.render();
        container.appendChild(this.board);   

        let card, cardElem, addCardObject, addCardForm;

        for (let key in boardList) {
            this.columns[key] = new Column(boardList[key]).render();
            addCardObject = new AddCardForm(this.columns[key]);
            addCardForm = addCardObject.render();
            this.board.appendChild(this.columns[key]);

            this.boardState[key] = [];

            content[key].forEach(item => {
                card = new Card(item);
                cardElem = card.render();

                cardElem.addEventListener('mouseenter', card.mouseEnter);
                cardElem.addEventListener('mouseleave', card.mouseLeave);

                this.columns[key].insertBefore(cardElem, addCardForm);

                this.boardState[key].push(item);
            })
            
            BoardStateService.save(this.boardState);
        }
    }

    mouseClick = (e) => {
        e.preventDefault();
        let data;

        if (e.target.classList.contains('card_close')) {
            data = BoardStateService.load();

            if (data) {
                this.boardState = BoardState.from(data);
            }

            const cardToDelete = e.target.closest('.card');
            const cardText = cardToDelete.querySelector('.card-text').textContent;
            
            const currentColumn = e.target.closest('.column');
            const currentColumnName = currentColumn.querySelector('.column-head').textContent;
                        
            for (let key in boardList) {                
                if (boardList[key] === currentColumnName) {                    
                    for (let i = 0; i < this.boardState[key].length; i++) {
                        if (this.boardState[key][i] === cardText) {
                            this.boardState[key].splice(i, 1);                       
                        }
                    }
                }
            }

            cardToDelete.remove();
            BoardStateService.save(this.boardState);            
        }

        if (e.target.classList.contains('add-another-card-button')) {
            AddCardForm.showInput(e.target.closest('.column'));
        } 

        if (e.target.classList.contains('cancel-button')) {
            AddCardForm.cancel(e.target.closest('.column'));
        }    

        if (e.target.classList.contains('add-card-button')) {
            data = BoardStateService.load();

            if (data) {
                this.boardState = BoardState.from(data);
            }
            
            const currentColumn = e.target.closest('.column');
            let value =  AddCardForm.input(currentColumn);
            
            if (value) {    
                const currentColumnName = currentColumn.querySelector('.column-head').textContent;
                const addCardForm = currentColumn.querySelector('.add-card-form');
                
                let card = new Card(value);
                let cardElem = card.render();

                cardElem.addEventListener('mouseenter', card.mouseEnter);
                cardElem.addEventListener('mouseleave', card.mouseLeave);

                currentColumn.insertBefore(cardElem, addCardForm);

                for (let key in boardList) {                
                    if (boardList[key] === currentColumnName) {
                        this.boardState[key].push(value);
                    }
                }
                BoardStateService.save(this.boardState);
            }

            AddCardForm.cancel(currentColumn);            
        } 
    }

}