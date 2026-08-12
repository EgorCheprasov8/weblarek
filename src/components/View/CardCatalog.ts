import { Card } from './Card';
import { IEvents } from '../base/Events';
import { TCardCatalog, TCardEvent } from '../../types';
import { appEvents } from '../../utils/constants';
 
export class CardCatalog extends Card<TCardCatalog> {
    protected events: IEvents;
 
    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;
 
        this.container.addEventListener('click', () => {
            this.events.emit<TCardEvent>(appEvents.cardSelect, { id: this.cardId });
        });
    }
}
