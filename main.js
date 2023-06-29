
// SELECTORS
const cart = document.querySelector('#float-card ul.products-in-cart')
const formCheckout = document.querySelector('form#checkout-form')
const pricesList   = document.querySelector('#float-card ul.prices-and-taxes')
const allInputs = [ ...formCheckout.querySelectorAll('.form-section .field input') ]


// vars
let timeoutModalID;



const registerQuantityProductsButtons = () => { 
    const quantityButtons = [ ...cart.querySelectorAll('.product-item .info-product .quantity button') ]

    quantityButtons.forEach( button => { 
        button.addEventListener('click', (e) => {
            const operation = e.target.getAttribute('data-operation');
            const quantityElement = e.target.parentNode.querySelector('span');
            let quantityValue = Number(quantityElement.textContent);

            switch (operation) {
                case 'minus':
                    quantityElement.textContent = (quantityValue > 1) 
                                                    ? quantityValue-1
                                                    : 0;
                    break;
                case 'plus':
                    quantityElement.textContent = (quantityValue < 20) 
                                                    ? quantityValue+1
                                                    : quantityValue;
                    break;
            }
        })
    })
}

const registerInputsChange = () => { 
    allInputs.forEach( inputElement => {
        inputElement.addEventListener('change', (e) => {
            if( e.target.value.trim().length === 0 ){ return }
            e.target.classList.remove('empty') 
        })
    })
 }


const registerSubmitForm = () => { 
    formCheckout.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate empty inputs
        const emptyInputs = allInputs.filter( input =>  input.value.trim().length === 0 )
        if( emptyInputs.length > 0 ) {
            emptyInputs.forEach( input => { input.classList.add('empty') })
            return displayModalWithTimer({timer: 5000,
                mesagge: 'Something is missing, some fields are empty 😕',
                classes: ['error']
            })
        }

        // Clear input empty classes
        allInputs.forEach( input => { input.classList.remove('empty') })
        
        displayModalWithTimer({timer: 5000, mesagge: 'Well done, form is submitted! 🥳'})
    })
}

const displayModalWithTimer = ({ timer, mesagge, classes = [] }) => { 
    const modal = document.querySelector('main .modal');
    const classesToClean = () => [ ...modal.classList].filter(classStyle => classStyle != 'modal' );
    modal.classList.remove( ...classesToClean() );
    
    clearTimeout(timeoutModalID);

    const textModal = modal.querySelector('p');
    textModal.textContent = mesagge;

    modal.classList.add('show', ...classes);

    // Clear text and hide the modal
    timeoutModalID = setTimeout(() => {
        modal.classList.remove( ...classesToClean() );
        textModal.textContent = '';
    }, timer);
}

const registerEvents = () => { 
    registerSubmitForm();
    registerInputsChange();
    registerQuantityProductsButtons();
}

window.addEventListener('DOMContentLoaded', () => {
    registerEvents();
})


