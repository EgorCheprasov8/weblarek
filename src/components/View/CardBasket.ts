import { Card } from './Card';
import { IEvents } from '../base/Events';
import { TCardBasket, TCardEvent } from '../../types';
import { appEvents } from '../../utils/constants';
import { ensureElement } from '../../utils/utils';
 
export class CardBasket extends Card<TCardBasket> {
    protected indexElement: HTMLElement;
    protected deleteButton: HTMLButtonElement;
    protected events: IEvents;
 
    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;
 
        this.indexElement = ensureElement<HTMLElement>(
            '.basket__item-index',
            this.container
        );
        this.deleteButton = ensureElement<HTMLButtonElement>(
            '.basket__item-delete',
            this.container
        );
 
        this.deleteButton.addEventListener('click', () => {
            this.events.emit<TCardEvent>(appEvents.cardRemove, { id: this.cardId });
        });
    }
 
    set index(value: number) {
        this.setText(this.indexElement, value);
    }
}
