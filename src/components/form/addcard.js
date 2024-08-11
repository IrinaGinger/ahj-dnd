import './addcard.css';

export default class AddCardForm {
    constructor(parent) {
        this.parent = parent;
    }

    render() {
        const addForm = document.createElement('form');
        addForm.classList.add('add-card-form');

        const addInput = document.createElement('textarea');
        addInput.classList.add('add-card-input', 'inactive');
        addInput.placeholder = 'Enter a title for this card...';
        addForm.appendChild(addInput);
        this.input = addInput;

        const buttonsSection = document.createElement('div');
        buttonsSection.classList.add('buttons-section', 'inactive');
        addForm.appendChild(buttonsSection);
        
        const addButton = document.createElement('button');
        addButton.classList.add('add-card-button', 'inactive');
        addButton.type = 'button';
        addButton.textContent = 'Add Card';
        buttonsSection.appendChild(addButton);

        const cancelButton = document.createElement('button');
        cancelButton.classList.add('cancel-button', 'inactive');
        cancelButton.type = 'button';
        cancelButton.innerHTML = `&times;`
        buttonsSection.appendChild(cancelButton);

        const footer = document.createElement('button');
        footer.classList.add('add-another-card-button');
        footer.type = 'button';
        footer.textContent = 'Add another card';
        addForm.appendChild(footer);

        this.parent.appendChild(addForm);
        
        return addForm;
    }

    static showInput(parent) {
        const addAnotherCardButton = parent.querySelector('.add-another-card-button');
        addAnotherCardButton.classList.add('inactive');
        
        const input = parent.querySelector('.add-card-input');
        input.classList.remove('inactive');

        const buttonsSection = parent.querySelector('.buttons-section');
        buttonsSection.classList.remove('inactive');

        const addCardButton = parent.querySelector('.add-card-button');
        addCardButton.classList.remove('inactive');

        const cancelButton = parent.querySelector('.cancel-button');
        cancelButton.classList.remove('inactive');
    }

    static input(parent) {
        return parent.querySelector('.add-card-input').value;
    }

    static cancel(parent) {
        const addAnotherCardButton = parent.querySelector('.add-another-card-button');
        addAnotherCardButton.classList.remove('inactive');
        
        const input = parent.querySelector('.add-card-input');
        input.value = '';
        input.classList.add('inactive');

        const buttonsSection = parent.querySelector('.buttons-section');
        buttonsSection.classList.add('inactive');

        const addCardButton = parent.querySelector('.add-card-button');
        addCardButton.classList.add('inactive');

        const cancelButton = parent.querySelector('.cancel-button');
        cancelButton.classList.add('inactive');
    } 
}