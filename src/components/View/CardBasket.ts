import { Card } from './Card';
import { TCardBasket } from '../../types';
import { ensureElement } from '../../utils/utils';

export class CardBasket extends Card<TCardBasket> {
    protected indexElement: HTMLElement;
    protected deleteButton: HTMLButtonElement;

    constructor(container: HTMLElement, onDelete: () => void) {
        super(container);

        this.indexElement = ensureElement<HTMLElement>(
            '.basket__item-index',
            this.container
        );
        this.deleteButton = ensureElement<HTMLButtonElement>(
            '.basket__item-delete',
            this.container
        );

        this.deleteButton.addEventListener('click', onDelete);
    }

    set index(value: number) {
        this.setText(this.indexElement, value);
    }
}