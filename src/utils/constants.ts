/* Константа для получения полного пути для сервера. Для выполнения запроса 
необходимо к API_URL добавить только ендпоинт. */
export const API_URL = `${import.meta.env.VITE_API_ORIGIN}/api/weblarek`; 

/* Константа для формирования полного пути к изображениям карточек. 
Для получения полной ссылки на картинку необходимо к CDN_URL добавить только название файла изображения,
которое хранится в объекте товара. */
export const CDN_URL = `${import.meta.env.VITE_API_ORIGIN}/content/weblarek`;

/* Константа соответствий категорий товара модификаторам, используемым для отображения фона категории. */
export const categoryMap = {
  'софт-скил': 'card__category_soft',
  'хард-скил': 'card__category_hard',
  'кнопка': 'card__category_button',
  'дополнительное': 'card__category_additional',
  'другое': 'card__category_other',
};

export const settings = {

};

export const validationErrors = {
    payment: 'Не выбран вид оплаты',
    address: 'Укажите адрес',
    email: 'Укажите емэйл',
    phone: 'Укажите телефон',
};

export const PRODUCTS_ENDPOINT = '/product/';
export const ORDER_ENDPOINT = '/order/';

export const appEvents = {
    catalogChanged: 'catalog:changed',
    catalogSelected: 'catalog:selected',
    cartChanged: 'cart:changed',
    buyerChanged: 'buyer:changed',
    cardSelect: 'card:select',
    cardBuy: 'card:buy',
    cardRemove: 'card:remove',
    basketOpen: 'basket:open',
    basketOrder: 'basket:order',
    orderInput: 'order:input',
    orderSubmit: 'order:submit',
    orderPayment: 'order:payment',
    contactsInput: 'contacts:input',
    contactsSubmit: 'contacts:submit',
    modalOpen: 'modal:open',
    modalClose: 'modal:close',
    successClose: 'success:close',
};

export const uiLabels = {
    currency: 'синапсов',
    priceless: 'Бесценно',
    spent: 'Списано',
    addToCart: 'В корзину',
    removeFromCart: 'Удалить из корзины',
    unavailable: 'Недоступно',
};

export const cssClasses = {
    modalActive: 'modal_active',
    pageLocked: 'page__wrapper_locked',
    paymentActive: 'button_alt-active',
};

