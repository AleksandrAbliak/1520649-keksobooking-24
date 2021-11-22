import { makeCommonMarkers, layerGroup } from './map.js';
import { debounce } from './util.js';

const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const housingFeatures = [...mapFilters.querySelectorAll('[type="checkbox"]')];
const MAX_OFFERS_PER_TIME = 10;
const DEBOUNCE_TIME = 500;
const HousingTypeValue = {
  'ANY': (value) => value,
  'BUNGALOW': (value) => value === 'bungalow',
  'HOTEL': (value) => value === 'hotel',
  'HOUSE': (value) => value === 'house',
  'FLAT': (value) => value === 'flat',
  'PALACE': (value) => value === 'palace',
};
const PriceValue = {
  'ANY': (value) => value,
  'MIDDLE': (value) => value >= 10000 && value <= 50000,
  'LOW': (value) => value <= 10000,
  'HIGH': (value) => value >= 50000,
};
const RoomsValue = {
  'ANY': (value) => value,
  '1': (value) => value === 1,
  '2': (value) => value === 2,
  '3': (value) => value === 3,
};
const GuestsValue = {
  'ANY': (value) => value,
  '0': (value) => value === 0,
  '1': (value) => value === 1,
  '2': (value) => value === 2,
};
const filterByHousingType = (sortItem) => {
  const type = sortItem.offer.type;
  return HousingTypeValue[housingType.value.toUpperCase()](type);
};
const filterByPrice = (sortItem) => {
  const price = sortItem.offer.price;
  return PriceValue[housingPrice.value.toUpperCase()](price);
};
const filterByRooms = (sortItem) => {
  const rooms = sortItem.offer.rooms;
  return RoomsValue[housingRooms.value.toUpperCase()](rooms);
};
const filterByGuests = (sortItem) => {
  const guests = sortItem.offer.guests;
  return GuestsValue[housingGuests.value.toUpperCase()](guests);
};
const filterByFeatures = (sortItem) => {
  const features = sortItem.offer.features;
  const selectedFeatures = housingFeatures.filter((input) => input.checked);
  return selectedFeatures.every((feature) => features && features.includes(feature.value));
};

const getFiltersData = (offers) => offers.filter((offer) => filterByHousingType(offer) &&
      filterByPrice(offer) &&
      filterByRooms(offer) &&
      filterByGuests(offer) &&
      filterByFeatures(offer));

const getFilteredData = (incomings) => {
  const clonedOffers = incomings.slice();
  makeCommonMarkers(clonedOffers.slice(0, MAX_OFFERS_PER_TIME));
  mapFilters.addEventListener('change', debounce(() => {
    layerGroup.clearLayers();
    makeCommonMarkers(getFiltersData(clonedOffers).slice(0, MAX_OFFERS_PER_TIME));
  }, DEBOUNCE_TIME));
};

export { getFilteredData, mapFilters };
