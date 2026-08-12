import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { TSuccess } from '../../types';
import { appEvents, uiLabels } from '../../utils/constants';
import { ensureElement } from '../../utils/utils';
 
export class Success extends Component<TSuccess> {
    protected descriptionElement: HTMLElement;
    protected closeButton: HTMLButtonElement;
    protected events: IEvents;
 
    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;
 
        this.descriptionElement = ensureElement<HTMLElement>(
            '.order-success__description',
            this.container
        );
        this.closeButton = ensureElement<HTMLButtonElement>(
            '.order-success__close',
            this.container
        );
 
        this.closeButton.addEventListener('click', () => {
            this.events.emit(appEvents.successClose);
        });
    }
 
    set total(value: number) {
        this.setText(
            this.descriptionElement,
            `${uiLabels.spent} ${value} ${uiLabels.currency}`
        );
    }
}
