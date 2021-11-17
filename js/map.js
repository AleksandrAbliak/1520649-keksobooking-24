import { activateForm } from './filters.js';
import {disableForm} from './filters.js';
import {createPopup} from './popup.js';
import {getOffer} from './data.js';
disableForm();

const LOCATION_LAT_DEFAULT = 35.68;
const LOCATION_LNG_DEFAULT = 139.77;
const ZOOM_MAP = 13;
const resetButton = document.querySelector('#form-reset');

const map = L.map('map-canvas')
  .on('load', () => {
    activateForm();
  })
  .setView([LOCATION_LAT_DEFAULT, LOCATION_LNG_DEFAULT], ZOOM_MAP);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' , {
  attribution : 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
},
).addTo(map);

const mainMarkerIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52,52],
  iconAnchor: [26,52],
});
const marker = L.marker(
  {
    lat :LOCATION_LAT_DEFAULT,
    lng :LOCATION_LNG_DEFAULT,
  },
  {
    draggable : true,
    icon : mainMarkerIcon,
  },
);
marker.addTo(map);

const addressForm = document.querySelector('#address');
addressForm.value = `${marker._latlng.lat}, ${marker._latlng.lng}`;
marker.on('drag', (evt) => {
  const markerAdress = evt.target.getLatLng();
  addressForm.value = `${markerAdress.lat.toFixed(5)} ${markerAdress.lng.toFixed(5)}`;
});

const commonMarkerIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize:[40,40],
  iconAnchor:[20,40],
});
const offerList = getOffer();
offerList.forEach((offer) => {
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


resetButton.addEventListener('click', () => {
  marker.setLatLng({
    lat: LOCATION_LAT_DEFAULT,
    lng: LOCATION_LNG_DEFAULT,
  });

  map.setView({
    lat: LOCATION_LAT_DEFAULT,
    lng: LOCATION_LNG_DEFAULT,
  }, ZOOM_MAP);
});
