import { Form } from './Form.ts';
import { IEvents } from '../base/Events';
import { TOrderForm, TPayment, TPaymentEvent } from '../../types';
import { appEvents, cssClasses } from '../../utils/constants';
import { ensureElement } from '../../utils/utils';
 
export class OrderForm extends Form<TOrderForm> {
    protected cardButton: HTMLButtonElement;
    protected cashButton: HTMLButtonElement;
    protected addressInput: HTMLInputElement;
 
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
 
        this.cardButton = ensureElement<HTMLButtonElement>(
            'button[name=card]',
            this.container
        );
        this.cashButton = ensureElement<HTMLButtonElement>(
            'button[name=cash]',
            this.container
        );
        this.addressInput = ensureElement<HTMLInputElement>(
            'input[name=address]',
            this.container
        );
 
        this.cardButton.addEventListener('click', () => {
            this.events.emit<TPaymentEvent>(appEvents.orderPayment, { payment: 'card' });
        });
 
        this.cashButton.addEventListener('click', () => {
            this.events.emit<TPaymentEvent>(appEvents.orderPayment, { payment: 'cash' });
        });
    }
 
    set payment(value: TPayment) {
        this.toggleClass(this.cardButton, cssClasses.paymentActive, value === 'card');
        this.toggleClass(this.cashButton, cssClasses.paymentActive, value === 'cash');
    }
 
    set address(value: string) {
        this.addressInput.value = value;
    }
}
