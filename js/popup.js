import {getOffer} from './data.js';

const OFFER_TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};
const popupTemplate = document.querySelector('#card').
  content.
  querySelector('.popup');


const similarOffer = getOffer();
const createPopup = (offer) => {
  const popup = popupTemplate.cloneNode(true);
  const popupTitle = popup.querySelector('.popup__title');
  popupTitle.textContent = offer.offer.title;

  const popupAdress = popup.querySelector('.popup__text--address');
  popupAdress.textContent = offer.offer.adress;

  const popupPrice = popup.querySelector('.popup__text--price');
  popupPrice.textContent = `${offer.offer.price} ₽/ночь`;

  const popupType = popup.querySelector('.popup__type');
  popupType.textContent = OFFER_TYPES[offer.offer.type];

  const popupCapacity = popup.querySelector('.popup__text--capacity');
  popupCapacity.textContent = `${ offer.offer.rooms  } комнаты для ${offer.offer.guests} гостей`;

  const popupTime = popup.querySelector('.popup__text--time');
  popupTime.textContent = `Заезд после ${offer.offer.checkin}, выезд до ${offer.offer.checkout}`;

  const popupFeatures = popup.querySelector('.popup__features');
  const popupFeaturesList = popupFeatures.querySelectorAll('.popup__feature');
  popupFeaturesList.textContent = offer.offer.features;

  const popupDescription = popup.querySelector('.popup__description');
  popupDescription.textContent = offer.offer.description;

  const popupPhoto = popup.querySelector('.popup__photo');
  popupPhoto.src = offer.offer.photo;

  const popupAvatars = popup.querySelector('.popup__avatar');
  popupAvatars.src = offer.author.avatar;
  return popup;
};

const offerNode = createPopup(similarOffer[0]);

const canvas = document.querySelector('#map-canvas');
canvas.appendChild(offerNode);

console.log(similarOffer);
