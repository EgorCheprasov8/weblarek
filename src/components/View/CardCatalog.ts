import { ProductCard } from './ProductCard';
import { TCardCatalog } from '../../types';

export class CardCatalog extends ProductCard<TCardCatalog> {
    constructor(container: HTMLElement, onClick: () => void) {
        super(container);
        this.container.addEventListener('click', onClick);
    }
}