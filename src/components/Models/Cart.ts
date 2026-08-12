import { IProduct, ICart } from '../../types';
import { IEvents } from '../base/Events';
import { appEvents } from '../../utils/constants';
 
export class Cart implements ICart {
    protected items: IProduct[] = [];
    protected events: IEvents;
 
    constructor(events: IEvents) {
        this.events = events;
    }
 
    getItems(): IProduct[] {
        return this.items;
    }
 
    addItem(item: IProduct): void {
        this.items.push(item);
        this.events.emit(appEvents.cartChanged);
    }
 
    removeItem(item: IProduct): void {
        this.items = this.items.filter((cartItem) => cartItem.id !== item.id);
        this.events.emit(appEvents.cartChanged);
    }
 
    clear(): void {
        this.items = [];
        this.events.emit(appEvents.cartChanged);
    }
 
    getTotalPrice(): number {
        return this.items.reduce((sum, item) => sum + (item.price ?? 0), 0);
    }
 
    getItemsCount(): number {
        return this.items.length;
    }
 
    hasItem(id: string): boolean {
        return this.items.some((item) => item.id === id);
    }
}
