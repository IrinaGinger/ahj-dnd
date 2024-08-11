import './card.css';

export default class Card {
    constructor(text) {
        this.text = text;
    }

    render() {
        const cardElem = document.createElement('div');
        cardElem.classList.add('card');

        const cardtext = document.createElement('p');
        cardtext.classList.add('card-text');
        cardtext.textContent = this.text;
        cardElem.appendChild(cardtext);

        const closeElement = document.createElement('div');
        closeElement.classList.add('card_close', 'inactive');
        closeElement.innerHTML = `&times;`;
        cardElem.appendChild(closeElement);

        return cardElem;
    }

    mouseEnter(e) {
        const closeElement = e.target.querySelector('.card_close');
        closeElement.classList.remove('inactive');
    }

    mouseLeave(e) {
        const closeElement = e.target.querySelector('.card_close');
        closeElement.classList.add('inactive');
    }

}