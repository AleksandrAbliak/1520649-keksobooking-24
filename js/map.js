import { activateForm } from './user-form.js';
import { disableForm } from './user-form.js';
import { createPopup } from './popup.js';


const addressForm = document.querySelector('#address');
const LOCATION_LAT_DEFAULT = 35.68;
const LOCATION_LNG_DEFAULT = 139.77;
const SAME_OFFER_LENGTH = 10;

disableForm();

const map = L.map('map-canvas')
  .on('load', () => {
    activateForm();
  })
  .setView([LOCATION_LAT_DEFAULT, LOCATION_LNG_DEFAULT], 13);

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
    lat: LOCATION_LAT_DEFAULT,
    lng: LOCATION_LNG_DEFAULT,
  },
  {
    draggable : true,
    icon : mainMarkerIcon,
  },
);
marker.addTo(map);

addressForm.value = `${marker._latlng.lat}, ${marker._latlng.lng}`;
marker.on('drag', (evt) => {
  const markerAdress = evt.target.getLatLng();
  addressForm.value = `${markerAdress.lat.toFixed(5)} ${markerAdress.lng.toFixed(5)}`;
});

const returnMainMarker = () => {
  marker.setLatLng({
    lat: LOCATION_LAT_DEFAULT,
    lng: LOCATION_LNG_DEFAULT,
  });
  map.setView({
    lat: LOCATION_LAT_DEFAULT,
    lng: LOCATION_LNG_DEFAULT,
  });
  map.closePopup();
  addressForm.value = `${marker._latlng.lat} ${marker._latlng.lng}`;
};


const commonMarkerIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize:[40,40],
  iconAnchor:[20,40],
});

const layerGroup = L.layerGroup().addTo(map);

const makeCommonMarkers = (offers) => {
  layerGroup.clearLayers();
  offers
    .slice(0,SAME_OFFER_LENGTH)
    .forEach((offer) => {
      const commonMarker = L.marker(
        {
          lat : offer.location.lat,
          lng : offer.location.lng,
        },
        {
          icon: commonMarkerIcon,
        },
      );
      commonMarker.addTo(layerGroup);
      commonMarker.bindPopup(createPopup(offer));
    });
};


export { returnMainMarker, makeCommonMarkers, commonMarkerIcon, layerGroup };
