import { Card } from './Card';
import { CDN_URL, categoryMap } from '../../utils/constants';
import { ensureElement } from '../../utils/utils';

export abstract class ProductCard<T> extends Card<T> {
    protected categoryElement: HTMLElement;
    protected imageElement: HTMLImageElement;

    protected constructor(container: HTMLElement) {
        super(container);

        this.categoryElement = ensureElement<HTMLElement>(
            '.card__category',
            this.container
        );
        this.imageElement = ensureElement<HTMLImageElement>(
            '.card__image',
            this.container
        );
    }

    set category(value: string) {
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
        this.setImage(this.imageElement, `${CDN_URL}/${value.replace(/^\//, '')}`);
    }
}