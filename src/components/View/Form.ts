import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { IBuyer, TInputEvent } from '../../types';
import { ensureElement } from '../../utils/utils';
 
export abstract class Form<T> extends Component<T> {
    protected formElement: HTMLFormElement;
    protected submitButton: HTMLButtonElement;
    protected errorsElement: HTMLElement;
    protected events: IEvents;
 
    protected constructor(container: HTMLFormElement, events: IEvents) {
        super(container);
        this.formElement = container;
        this.events = events;
 
        this.submitButton = ensureElement<HTMLButtonElement>(
            'button[type=submit]',
            this.container
        );
        this.errorsElement = ensureElement<HTMLElement>(
            '.form__errors',
            this.container
        );
 
        this.formElement.addEventListener('input', (event) => {
            const target = event.target as HTMLInputElement;
            this.events.emit<TInputEvent>(`${this.formElement.name}:input`, {
                field: target.name as keyof IBuyer,
                value: target.value,
            });
        });
 
        this.formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            this.events.emit(`${this.formElement.name}:submit`);
        });
    }
 
    set valid(state: boolean) {
        this.setDisabled(this.submitButton, !state);
    }
 
    set errors(value: string) {
        this.setText(this.errorsElement, value);
    }
}
