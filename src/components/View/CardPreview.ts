import { ProductCard } from './ProductCard';
import { IEvents } from '../base/Events';
import { TCardPreview } from '../../types';
import { appEvents } from '../../utils/constants';
import { ensureElement } from '../../utils/utils';

export class CardPreview extends ProductCard<TCardPreview> {
    protected descriptionElement: HTMLElement;
    protected actionButton: HTMLButtonElement;
    protected events: IEvents;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        this.descriptionElement = ensureElement<HTMLElement>(
            '.card__text',
            this.container
        );
        this.actionButton = ensureElement<HTMLButtonElement>(
            '.card__button',
            this.container
        );

        this.actionButton.addEventListener('click', () => {
            this.events.emit(appEvents.cardBuy);
        });
    }

    set description(value: string) {
        this.setText(this.descriptionElement, value);
    }

    set buttonLabel(value: string) {
        this.setText(this.actionButton, value);
    }

    set buttonDisabled(state: boolean) {
        this.setDisabled(this.actionButton, state);
    }
}