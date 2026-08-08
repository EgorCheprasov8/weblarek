import { IApi, IProduct, IOrder, IApiList, IOrderResult } from '../../types';
import { PRODUCTS_ENDPOINT, ORDER_ENDPOINT } from '../../utils/constants';

export class LarekApi {
    protected api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    getProducts(): Promise<IApiList<IProduct>> {
        return this.api.get<IApiList<IProduct>>(PRODUCTS_ENDPOINT);
    }

    postOrder(order: IOrder): Promise<IOrderResult> {
        return this.api.post<IOrderResult>(ORDER_ENDPOINT, order);
    }
}