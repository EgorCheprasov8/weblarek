import { Form } from './Form.ts';
import { IEvents } from '../base/Events';
import { TContactsForm } from '../../types';
import { ensureElement } from '../../utils/utils';
 
export class ContactsForm extends Form<TContactsForm> {
    protected emailInput: HTMLInputElement;
    protected phoneInput: HTMLInputElement;
 
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
 
        this.emailInput = ensureElement<HTMLInputElement>(
            'input[name=email]',
            this.container
        );
        this.phoneInput = ensureElement<HTMLInputElement>(
            'input[name=phone]',
            this.container
        );
    }
 
    set email(value: string) {
        if (this.emailInput.value !== value) {
            this.emailInput.value = value;
        }
    }

    set phone(value: string) {
        if (this.phoneInput.value !== value) {
            this.phoneInput.value = value;
        }
    }
}
