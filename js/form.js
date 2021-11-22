const typePrice = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOTEL: 3000,
  HOUSE: 5000,
  PALACE: 10000,
};

const capacityRules = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
  RENDER_ERROR: (value) => (value === 100 ? 'Не для гостей' : `Допустимое количество гостей: ${value}`),
};

const form = document.querySelector('.ad-form');
const formType = form.querySelector('#type');
const formPrice = form.querySelector('#price');
const formTimein = form.querySelector('#timein');
const formTimeout = form.querySelector('#timeout');
const formRoomNumber = form.querySelector('#room_number');
const formCapacity = form.querySelector('#capacity');

const changeMinPrice = () => {
  formPrice.min = typePrice[formType.value.toUpperCase()];
  formPrice.placeholder = typePrice[formType.value.toUpperCase()];
};

const onTimeChange = (evt) => {
  formTimein.value = evt.target.value;
  formTimeout.value = evt.target.value;
};

const checkCountGuests = () => {
  const roomsValue = Number(formRoomNumber.value);
  const guestsValue = Number(formCapacity.value);

  if (!capacityRules[roomsValue].includes(guestsValue)) {
    formCapacity.setCustomValidity(capacityRules.RENDER_ERROR(roomsValue));
  } else {
    formCapacity.setCustomValidity('');
  }
};

const validateFields = () => {
  changeMinPrice();
  checkCountGuests();
  formTimeout.value = formTimein.value;
};

const setFormListeners = () => {
  validateFields();
  formType.addEventListener('change', () => changeMinPrice());
  formTimein.addEventListener('change', onTimeChange);
  formTimeout.addEventListener('change', onTimeChange);
  formRoomNumber.addEventListener('change', () => checkCountGuests());
  formCapacity.addEventListener('change', () => checkCountGuests());
};
setFormListeners();

export { changeMinPrice };
