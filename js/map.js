import { activeForm } from './filters.js';
import {disableForm} from './filters.js';
import {createPopup} from './popup.js';
import {getOffer} from './data.js';
disableForm();

const map = L.map('map-canvas')
  .on('load', () => {
    activeForm();
  })
  .setView([35.68, 139.77], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' , {
  attribution : 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
},
).addTo(map);

const mainMarkerIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52,52],
  iconAnchor: [26,52],
});
const marker = L.marker(
  {
    lat :35.68,
    lng :139.77,
  },
  {
    draggable : true,
    icon : mainMarkerIcon,
  },
);
marker.addTo(map);

const addressForm = document.querySelector('#address');
addressForm.value = `${marker._latlng.lat} ${marker._latlng.lng}`;
marker.on('moveend', (evt) => {
  const markerAdress = evt.target.getLatLng();
  addressForm.value = `${markerAdress.lat.toFixed(5)} ${markerAdress.lng.toFixed(5)}`;
});

const commonMarkerIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize:[40,40],
  iconAnchor:[20,40],
});

getOffer.forEach((offer) => {
  const commonMarker = L.marker(
    {
      lat : offer.location.lat,
      lng : offer.location.lng,
    },
    {
      icon: commonMarkerIcon,
    },
  );
  commonMarker.addTo(map);
  createPopup(offer);
  commonMarker.bindPopup(createPopup(offer));
});
