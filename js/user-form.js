import { sendData } from './api.js';
import { returnMainMarker } from './map.js';
import { onFailSubmit } from './user-modal.js';
import { makeCommonMarkers } from './map.js';
import { getData } from './main.js';

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const disableForm = () => {
  adForm.classList.add('ad-form--disabled');
  const adFormElements=  adForm.querySelectorAll('.ad-form__element');
  adFormElements.forEach((element) => {
    element.classList.add('.disabled');
  });
  mapFilters.classList.add('map__filters--disabled');
  const mapFiltersContainers = mapFilters.querySelectorAll('.map__filter');
  mapFiltersContainers.forEach((element) => {
    element.classList.add('.disabled');
  });
  mapFilters.querySelector('.map__features').classList.add('disabled');
};


const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  const adFormElements=  adForm.querySelectorAll('.ad-form__element');
  adFormElements.forEach((element) => {
    element.classList.remove('.disabled');
  });
  mapFilters.classList.remove('map__filters--disabled');
  const mapFiltersContainers = mapFilters.querySelectorAll('.map__filter');
  mapFiltersContainers.forEach((element) => {
    element.classList.remove('.disabled');
  });
  mapFilters.querySelector('.map__features').classList.remove('disabled');
};

const sendUserFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => onFailSubmit('Ошибка при отправке формы. Повторите попытку'),
      new FormData(evt.target),
    );
  });
};
const clearForm = (offers) => {
  adForm.reset();
  returnMainMarker();
  mapFilters.reset();
  makeCommonMarkers(offers);
  getData();
};


export { disableForm, activateForm, sendUserFormSubmit, clearForm };
