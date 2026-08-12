import './scss/styles.scss';
import { API_URL, appEvents, uiLabels } from './utils/constants';
import { ensureElement, cloneTemplate } from './utils/utils';

import { Api } from './components/base/Api';
import { EventEmitter } from './components/base/Events';
import { LarekApi } from './components/Communication/LarekApi';

import { Catalog } from './components/Models/Catalog';
import { Cart } from './components/Models/Cart';
import { Buyer } from './components/Models/Buyer';

import { Page } from './components/View/Page';
import { Modal } from './components/View/Modal';
import { Basket } from './components/View/Basket';
import { Success } from './components/View/Success';
import { CardCatalog } from './components/View/CardCatalog';
import { CardPreview } from './components/View/CardPreview';
import { CardBasket } from './components/View/CardBasket';
import { OrderForm } from './components/View/OrderForm';
import { ContactsForm } from './components/View/ContactsForm';

import { IOrder, TCardEvent, TPaymentEvent, TInputEvent } from './types';

const events = new EventEmitter();

const catalog = new Catalog(events);
const cart = new Cart(events);
const buyer = new Buyer(events);

const api = new Api(API_URL);
const larekApi = new LarekApi(api);

const pageWrapper = ensureElement<HTMLElement>('.page__wrapper');
const modalContainer = ensureElement<HTMLElement>('#modal-container');

const page = new Page(pageWrapper, events);
const modal = new Modal(modalContainer, events);
const basket = new Basket(cloneTemplate<HTMLElement>('#basket'), events);
const success = new Success(cloneTemplate<HTMLElement>('#success'), events);
const orderForm = new OrderForm(
    cloneTemplate<HTMLFormElement>('#order'),
    events
);
const contactsForm = new ContactsForm(
    cloneTemplate<HTMLFormElement>('#contacts'),
    events
);

function renderBasket(): void {
    const items = cart.getItems().map((item, index) => {
        const card = new CardBasket(
            cloneTemplate<HTMLElement>('#card-basket'),
            events
        );
        return card.render({
            id: item.id,
            title: item.title,
            price: item.price,
            index: index + 1,
        });
    });

    basket.render({
        items,
        total: cart.getTotalPrice(),
        buttonDisabled: cart.getItemsCount() === 0,
    });
}

function getButtonLabel(price: number | null, inCart: boolean): string {
    if (price === null) {
        return uiLabels.unavailable;
    }
    return inCart ? uiLabels.removeFromCart : uiLabels.addToCart;
}

// Каталог загружен или изменился
events.on(appEvents.catalogChanged, () => {
    const cards = catalog.getItems().map((item) => {
        const card = new CardCatalog(
            cloneTemplate<HTMLElement>('#card-catalog'),
            events
        );
        return card.render({
            id: item.id,
            title: item.title,
            price: item.price,
            category: item.category,
            image: item.image,
        });
    });

    page.render({ catalog: cards });
});

// Выбран товар для подробного просмотра
events.on(appEvents.catalogSelected, () => {
    const product = catalog.getSelectedItem();
    if (!product) {
        return;
    }

    const card = new CardPreview(
        cloneTemplate<HTMLElement>('#card-preview'),
        events
    );
    const content = card.render({
        id: product.id,
        title: product.title,
        price: product.price,
        category: product.category,
        image: product.image,
        description: product.description,
        buttonLabel: getButtonLabel(product.price, cart.hasItem(product.id)),
        buttonDisabled: product.price === null,
    });

    modal.render({ content });
    modal.open();
});

// Изменилось содержимое корзины
events.on(appEvents.cartChanged, () => {
    page.render({ counter: cart.getItemsCount() });
    renderBasket();
});

// Изменились данные покупателя
events.on(appEvents.buyerChanged, () => {
    const errors = buyer.validate();
    const data = buyer.getData();

    const orderErrors = [errors.payment, errors.address]
        .filter(Boolean)
        .join('. ');
    const contactsErrors = [errors.email, errors.phone]
        .filter(Boolean)
        .join('. ');

    orderForm.render({
        valid: orderErrors.length === 0,
        errors: orderErrors,
        payment: data.payment,
    });

    contactsForm.render({
        valid: contactsErrors.length === 0,
        errors: contactsErrors,
    });
});

// Клик по карточке в каталоге
events.on<TCardEvent>(appEvents.cardSelect, ({ id }) => {
    const product = catalog.getItemById(id);
    if (product) {
        catalog.setSelectedItem(product);
    }
});

// Кнопка покупки или удаления в подробной карточке
events.on<TCardEvent>(appEvents.cardBuy, ({ id }) => {
    const product = catalog.getItemById(id);
    if (!product) {
        return;
    }

    if (cart.hasItem(product.id)) {
        cart.removeItem(product);
    } else {
        cart.addItem(product);
    }

    modal.close();
});

// Кнопка удаления в строке корзины
events.on<TCardEvent>(appEvents.cardRemove, ({ id }) => {
    const product = catalog.getItemById(id);
    if (product) {
        cart.removeItem(product);
    }
});

// Открытие корзины
events.on(appEvents.basketOpen, () => {
    renderBasket();
    modal.render({ content: basket.render() });
    modal.open();
});

// Переход к оформлению
events.on(appEvents.basketOrder, () => {
    const data = buyer.getData();
    modal.render({
        content: orderForm.render({
            payment: data.payment,
            address: data.address,
        }),
    });
    modal.open();
});

// Выбор способа оплаты
events.on<TPaymentEvent>(appEvents.orderPayment, ({ payment }) => {
    buyer.setData({ payment });
});

// Ввод в первой форме
events.on<TInputEvent>(appEvents.orderInput, ({ field, value }) => {
    buyer.setData({ [field]: value });
});

// Переход ко второй форме
events.on(appEvents.orderSubmit, () => {
    const data = buyer.getData();
    modal.render({
        content: contactsForm.render({
            email: data.email,
            phone: data.phone,
        }),
    });
    modal.open();
});

// Ввод во второй форме
events.on<TInputEvent>(appEvents.contactsInput, ({ field, value }) => {
    buyer.setData({ [field]: value });
});

// Отправка заказа на сервер
events.on(appEvents.contactsSubmit, () => {
    const order: IOrder = {
        ...buyer.getData(),
        total: cart.getTotalPrice(),
        items: cart
            .getItems()
            .filter((item) => item.price !== null)
            .map((item) => item.id),
    };

    larekApi
        .postOrder(order)
        .then((result) => {
            cart.clear();
            buyer.clear();
            modal.render({
                content: success.render({ total: result.total }),
            });
            modal.open();
        })
        .catch((error) => {
            console.error('Ошибка оформления заказа:', error);
        });
});

// Блокировка прокрутки страницы
events.on(appEvents.modalOpen, () => {
    page.render({ locked: true });
});

events.on(appEvents.modalClose, () => {
    page.render({ locked: false });
});

// Закрытие экрана успешного заказа
events.on(appEvents.successClose, () => {
    modal.close();
});

// Загрузка каталога с сервера
larekApi
    .getProducts()
    .then((data) => {
        catalog.setItems(data.items);
    })
    .catch((error) => {
        console.error('Ошибка загрузки каталога:', error);
    });