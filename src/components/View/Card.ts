import { Component } from '../base/Component';
import { CDN_URL, categoryMap, uiLabels } from '../../utils/constants';
import { ensureElement } from '../../utils/utils';
 
export abstract class Card<T> extends Component<T> {
    protected titleElement: HTMLElement;
    protected priceElement: HTMLElement;
    protected categoryElement: HTMLElement | null;
    protected imageElement: HTMLImageElement | null;
    protected cardId: string = '';
 
    protected constructor(container: HTMLElement) {
        super(container);
 
        this.titleElement = ensureElement<HTMLElement>('.card__title', this.container);
        this.priceElement = ensureElement<HTMLElement>('.card__price', this.container);
        this.categoryElement = this.container.querySelector('.card__category');
        this.imageElement = this.container.querySelector('.card__image');
    }
 
    set id(value: string) {
        this.cardId = value;
    }
 
    set title(value: string) {
        this.setText(this.titleElement, value);
        if (this.imageElement) {
            this.imageElement.alt = value;
        }
    }
 
    set price(value: number | null) {
        this.setText(
            this.priceElement,
            value === null ? uiLabels.priceless : `${value} ${uiLabels.currency}`
        );
    }
 
    set category(value: string) {
        if (!this.categoryElement) {
            return;
        }
        this.setText(this.categoryElement, value);
        Object.values(categoryMap).forEach((className) => {
            this.toggleClass(this.categoryElement, className, false);
        });
        const modifier = categoryMap[value as keyof typeof categoryMap];
        if (modifier) {
            this.toggleClass(this.categoryElement, modifier, true);
        }
    }
 
    set image(value: string) {
        if (this.imageElement) {
            this.setImage(this.imageElement, `${CDN_URL}/${value.replace(/^\//, '')}`);
        }
    }
}
