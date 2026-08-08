import './scss/styles.scss';
import { apiProducts } from './utils/data';
import { API_URL } from './utils/constants';
import { Catalog } from './components/Models/Catalog';
import { Cart } from './components/Models/Cart';
import { Buyer } from './components/Models/Buyer';
import { Api } from './components/base/Api';
import { LarekApi } from './components/Communication/LarekApi';

const catalog = new Catalog();
const cart = new Cart();
const buyer = new Buyer();

/* ===== КАТАЛОГ ТОВАРОВ ===== */

console.log('===== КАТАЛОГ ТОВАРОВ =====');

catalog.setItems(apiProducts.items);
console.log('Массив товаров из каталога:', catalog.getItems());

const firstProduct = apiProducts.items[0];
console.log('Товар по существующему id:', catalog.getItemById(firstProduct.id));
console.log('Товар по несуществующему id:', catalog.getItemById('unknown-id'));

console.log('Выбранный товар до выбора:', catalog.getSelectedItem());
catalog.setSelectedItem(firstProduct);
console.log('Выбранный товар после выбора:', catalog.getSelectedItem());

/* КОРЗИНА */

console.log('===== КОРЗИНА =====');

console.log('Товары в пустой корзине:', cart.getItems());
console.log('Количество товаров в пустой корзине:', cart.getItemsCount());
console.log('Стоимость товаров в пустой корзине:', cart.getTotalPrice());

const productWithPrice = apiProducts.items[0];
const productWithoutPrice = apiProducts.items[2];
const productNotInCart = apiProducts.items[3];

cart.addItem(productWithPrice);
cart.addItem(apiProducts.items[1]);
cart.addItem(productWithoutPrice);
console.log('Товары после добавления трёх позиций:', cart.getItems());
console.log('Количество товаров в корзине:', cart.getItemsCount());
console.log('Стоимость товаров в корзине:', cart.getTotalPrice());
console.log('Товар без цены в корзине:', productWithoutPrice.title, productWithoutPrice.price);

console.log('Наличие товара, который есть в корзине:', cart.hasItem(productWithPrice.id));
console.log('Наличие товара, которого нет в корзине:', cart.hasItem(productNotInCart.id));

cart.removeItem(productWithPrice);
console.log('Товары после удаления одной позиции:', cart.getItems());
console.log('Количество товаров после удаления:', cart.getItemsCount());
console.log('Стоимость товаров после удаления:', cart.getTotalPrice());

cart.clear();
console.log('Товары после очистки корзины:', cart.getItems());
console.log('Количество товаров после очистки:', cart.getItemsCount());

/* ПОКУПАТЕЛЬ */

console.log('===== ДАННЫЕ ПОКУПАТЕЛЯ =====');

console.log('Данные покупателя до заполнения:', buyer.getData());
console.log('Ошибки валидации до заполнения:', buyer.validate());

buyer.setData({ address: 'Сургут, ул. Привокзальная, 1' });
console.log('Данные после сохранения только адреса:', buyer.getData());

buyer.setData({ payment: 'card' });
console.log('Данные после сохранения только вида оплаты:', buyer.getData());
console.log('Ошибки валидации при частичном заполнении:', buyer.validate());

buyer.setData({ email: 'test@test.ru', phone: '+79000000000' });
console.log('Данные после полного заполнения:', buyer.getData());
console.log('Ошибки валидации при полном заполнении:', buyer.validate());

buyer.clear();
console.log('Данные покупателя после очистки:', buyer.getData());
console.log('Ошибки валидации после очистки:', buyer.validate());

/* ЗАПРОС КАТАЛОГА С СЕРВЕРА */

const api = new Api(API_URL);
const larekApi = new LarekApi(api);

larekApi
    .getProducts()
    .then((data) => {
        catalog.setItems(data.items);
        console.log('Каталог, загруженный с сервера:', catalog.getItems());
    })
    .catch((error) => {
        console.error('Ошибка загрузки каталога:', error);
    });