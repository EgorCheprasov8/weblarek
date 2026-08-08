export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}
 
export type TPayment = 'card' | 'cash' | '';
 
export interface IBuyer {
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
}

export type TValidationErrors = Partial<Record<keyof IBuyer, string>>;

export interface ICatalog {
    setItems(items: IProduct[]): void;
    getItems(): IProduct[];
    getItemById(id: string): IProduct | undefined;
    setSelectedItem(item: IProduct): void;
    getSelectedItem(): IProduct | null;
}
 
export interface ICart {
    getItems(): IProduct[];
    addItem(item: IProduct): void;
    removeItem(item: IProduct): void;
    clear(): void;
    getTotalPrice(): number;
    getItemsCount(): number;
    hasItem(id: string): boolean;
}
 
export interface IBuyerModel {
    setData(data: Partial<IBuyer>): void;
    getData(): IBuyer;
    clear(): void;
    validate(): TValidationErrors;
}

export interface IApiList<T> {
    total: number;
    items: T[];
}

export interface IOrder extends IBuyer {
    total: number;
    items: string[];
}

export interface IOrderResult {
    id: string;
    total: number;
}