import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { THeader } from '../../types';
import { appEvents } from '../../utils/constants';
import { ensureElement } from '../../utils/utils';

export class Header extends Component<THeader> {
    protected basketButton: HTMLButtonElement;
    protected counterElement: HTMLElement;
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

        this.basketButton.addEventListener('click', () => {
            this.events.emit(appEvents.basketOpen);
        });
    }

    set counter(value: number) {
        this.setText(this.counterElement, value);
    }
}