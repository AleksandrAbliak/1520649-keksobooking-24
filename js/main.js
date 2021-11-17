import './data.js';
import './util.js';
import './popup.js';
import './form.js';
import './map.js';
import './filters.js';
import './api.js';
import './user-form.js';
import {  getData} from './api.js';
import { makeCommonMarkers } from './map.js';
import { clearForm } from './filters.js';
import { sendUserFormSubmit } from './filters.js';
const OFFERS_COUNT = 10;

getData((offers) => {
  makeCommonMarkers(offers.slice(0,OFFERS_COUNT));
});
sendUserFormSubmit(clearForm);
