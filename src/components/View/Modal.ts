import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { TModal } from '../../types';
import { appEvents, cssClasses } from '../../utils/constants';
import { ensureElement } from '../../utils/utils';

export class Modal extends Component<TModal> {
    protected closeButton: HTMLButtonElement;
    protected contentElement: HTMLElement;
    protected events: IEvents;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        this.closeButton = ensureElement<HTMLButtonElement>(
            '.modal__close',
            this.container
        );
        this.contentElement = ensureElement<HTMLElement>(
            '.modal__content',
            this.container
        );

        this.closeButton.addEventListener('click', () => {
            this.events.emit(appEvents.modalClose);
        });

        this.container.addEventListener('click', (event) => {
            if (event.target === this.container) {
                this.events.emit(appEvents.modalClose);
            }
        });
    }

    set content(value: HTMLElement) {
        this.contentElement.replaceChildren(value);
    }

    open(): void {
        this.toggleClass(this.container, cssClasses.modalActive, true);
    }

    close(): void {
        this.toggleClass(this.container, cssClasses.modalActive, false);
        this.contentElement.replaceChildren();
    }
}