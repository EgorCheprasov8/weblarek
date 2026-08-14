import { Component } from '../base/Component';
import { TGallery } from '../../types';

export class Gallery extends Component<TGallery> {
    constructor(container: HTMLElement) {
        super(container);
    }

    set catalog(items: HTMLElement[]) {
        this.container.replaceChildren(...items);
    }
}