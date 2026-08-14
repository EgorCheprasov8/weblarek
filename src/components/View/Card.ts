import { Component } from '../base/Component';
import { uiLabels } from '../../utils/constants';
import { ensureElement } from '../../utils/utils';

export abstract class Card<T> extends Component<T> {
    protected titleElement: HTMLElement;
    protected priceElement: HTMLElement;

    protected constructor(container: HTMLElement) {
        super(container);

        this.titleElement = ensureElement<HTMLElement>('.card__title', this.container);
        this.priceElement = ensureElement<HTMLElement>('.card__price', this.container);
    }

    set title(value: string) {
        this.setText(this.titleElement, value);
    }

    set price(value: number | null) {
        this.setText(
            this.priceElement,
            value === null ? uiLabels.priceless : `${value} ${uiLabels.currency}`
        );
    }
}