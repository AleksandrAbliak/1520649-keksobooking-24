import './util.js';
import './popup.js';
import './form.js';
import './map.js';
import './user-form.js';
import './api.js';
import './user-modal.js';
import './filter.js';
import {  getData} from './api.js';
import { makeCommonMarkers } from './map.js';
import { clearForm } from './user-form.js';
import { sendUserFormSubmit } from './user-form.js';

const OFFERS_COUNT = 10;
const localOffers = [];

getData((offers) => {
  makeCommonMarkers(offers.slice(0,OFFERS_COUNT));
});

sendUserFormSubmit(() => {
  clearForm(localOffers);
});

export { localOffers, getData };
