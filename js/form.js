const PRICE_MAX = 1000000;

const titleLength = {
  min: 30,
  max: 100,
};

const typePrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const capacityRules = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
  error: (value) => (value === 100 ? 'Не для гостей' : `Допустимое количество гостей: ${value}`),
};

const form = document.querySelector('.ad-form');
const formTitle = form.querySelector('#title');
const formType = form.querySelector('#type');
const formPrice = form.querySelector('#price');
const formTimein = form.querySelector('#timein');
const formTimeout = form.querySelector('#timeout');
const formRoomNumber = form.querySelector('#room_number');
const formCapacity = form.querySelector('#capacity');

const onTitleInput = () => {
  const valueLength = formTitle.value.length;
  if (valueLength === 0) {
    formTitle.setCustomValidity(`Минимум ${titleLength.min} симв.`);
  } else if (valueLength < titleLength.min) {
    formTitle.setCustomValidity(`Ещё ${titleLength.min - valueLength} симв.`);
  } else if (valueLength > titleLength.max) {
    formTitle.setCustomValidity(`Удалите ${valueLength - titleLength.max} симв.`);
  } else {
    formTitle.setCustomValidity('');
  }
};

const changeMinPrice = () => {
  formPrice.min = typePrice[formType.value];
  formPrice.placeholder = typePrice[formType.value];
};

const onPriceInput = (evt) => {
  const value = evt.target.value;
  const typeValue = typePrice[formType.value];

  if (value.length === 0) {
    formPrice.setCustomValidity(`Минимальная цена ${typeValue}`);
  } else if (value < typeValue) {
    formPrice.setCustomValidity(`Минимальная цена ${typeValue}`);
  } else if (value > PRICE_MAX) {
    formPrice.setCustomValidity(`Максимальная цена ${PRICE_MAX}`);
  } else {
    formPrice.setCustomValidity('');
  }
};

const onTimeChange = (evt) => {
  formTimein.value = evt.target.value;
  formTimeout.value = evt.target.value;
};

const checkCountGuests = () => {
  const roomsValue = Number(formRoomNumber.value);
  const guestsValue = Number(formCapacity.value);

  if (!capacityRules[roomsValue].includes(guestsValue)) {
    formCapacity.setCustomValidity(capacityRules.error(roomsValue));
  } else {
    formCapacity.setCustomValidity('');
  }
};

const validateFields = () => {
  changeMinPrice();
  checkCountGuests();
  formTimeout.value = formTimein.value;
};

export const validateForm = () => {
  validateFields();
  formTitle.addEventListener('invalid', onTitleInput);
  formTitle.addEventListener('input', onTitleInput);
  formType.addEventListener('change', () => changeMinPrice());
  formPrice.addEventListener('invalid', onPriceInput);
  formPrice.addEventListener('input', onPriceInput);
  formTimein.addEventListener('change', onTimeChange);
  formTimeout.addEventListener('change', onTimeChange);
  formRoomNumber.addEventListener('change', () => checkCountGuests());
  formCapacity.addEventListener('change', () => checkCountGuests());
};
