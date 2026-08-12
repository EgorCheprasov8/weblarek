import { IProduct, ICatalog } from '../../types';
import { IEvents } from '../base/Events';
import { appEvents } from '../../utils/constants';
 
export class Catalog implements ICatalog {
    protected items: IProduct[] = [];
    protected selectedItem: IProduct | null = null;
    protected events: IEvents;
 
    constructor(events: IEvents) {
        this.events = events;
    }
 
    setItems(items: IProduct[]): void {
        this.items = items;
        this.events.emit(appEvents.catalogChanged);
    }
 
    getItems(): IProduct[] {
        return this.items;
    }
 
    getItemById(id: string): IProduct | undefined {
        return this.items.find((item) => item.id === id);
    }
 
    setSelectedItem(item: IProduct): void {
        this.selectedItem = item;
        this.events.emit(appEvents.catalogSelected);
    }
 
    getSelectedItem(): IProduct | null {
        return this.selectedItem;
    }
}
