import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { TBasket } from '../../types';
import { appEvents, uiLabels } from '../../utils/constants';
import { ensureElement } from '../../utils/utils';
 
export class Basket extends Component<TBasket> {
    protected listElement: HTMLElement;
    protected totalElement: HTMLElement;
    protected orderButton: HTMLButtonElement;
    protected events: IEvents;
 
    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;
 
        this.listElement = ensureElement<HTMLElement>('.basket__list', this.container);
        this.totalElement = ensureElement<HTMLElement>('.basket__price', this.container);
        this.orderButton = ensureElement<HTMLButtonElement>(
            '.basket__button',
            this.container
        );
 
        this.orderButton.addEventListener('click', () => {
            this.events.emit(appEvents.basketOrder);
        });
    }
 
    set items(elements: HTMLElement[]) {
        this.listElement.replaceChildren(...elements);
    }
 
    set total(value: number) {
        this.setText(this.totalElement, `${value} ${uiLabels.currency}`);
    }
 
    set buttonDisabled(state: boolean) {
        this.setDisabled(this.orderButton, state);
    }
}
