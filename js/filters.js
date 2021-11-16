const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const disableForm = () => {
  adForm.classList.add('ad-form--disabled');
  const adFormElements=  adForm.querySelectorAll('.ad-form__element');
  (adFormElements).forEach((element) => {
    element.classList.add('.disabled');
  });
  mapFilters.classList.add('map__filters--disabled');
  const mapFiltersContainer = mapFilters.querySelectorAll('.map__filter');
  (mapFiltersContainer).forEach((element) => {
    element.classList.add('.disabled');
  });
  mapFilters.querySelector('.map__features').classList.add('disabled');
};


const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  const adFormElements=  adForm.querySelectorAll('.ad-form__element');
  (adFormElements).forEach((element) => {
    element.classList.remove('.disabled');
  });
  mapFilters.classList.remove('map__filters--disabled');
  const mapFiltersContainer = mapFilters.querySelectorAll('.map__filter');
  (mapFiltersContainer).forEach((element) => {
    element.classList.remove('.disabled');
  });
  mapFilters.querySelector('.map__features').classList.remove('disabled');
};

export{disableForm, activateForm};
