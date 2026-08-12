import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { TPage } from '../../types';
import { appEvents, cssClasses } from '../../utils/constants';
import { ensureElement } from '../../utils/utils';
 
export class Page extends Component<TPage> {
    protected basketButton: HTMLButtonElement;
    protected counterElement: HTMLElement;
    protected galleryElement: HTMLElement;
    protected events: IEvents;
 
    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;
 
        this.basketButton = ensureElement<HTMLButtonElement>(
            '.header__basket',
            this.container
        );
        this.counterElement = ensureElement<HTMLElement>(
            '.header__basket-counter',
            this.container
        );
        this.galleryElement = ensureElement<HTMLElement>('.gallery', this.container);
 
        this.basketButton.addEventListener('click', () => {
            this.events.emit(appEvents.basketOpen);
        });
    }
 
    set counter(value: number) {
        this.setText(this.counterElement, value);
    }
 
    set catalog(items: HTMLElement[]) {
        this.galleryElement.replaceChildren(...items);
    }
 
    set locked(state: boolean) {
        this.toggleClass(this.container, cssClasses.pageLocked, state);
    }
}
