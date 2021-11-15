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
const renderFeatures = (features, popupFeatures) => {
  features.forEach((element) => {
    const feature = document.createElement('li');

    feature.classList.add('popup__feature', `popup__feature--${element}`);
    popupFeatures.append(feature);
  });
};

const renderPhotos = (photos, popupPhotos, popupPhoto) => {
  photos.forEach((element) => {
    const photo = popupPhoto.cloneNode(true);
    if (element) {
      photo.src = element;
      popupPhotos.append(photo);
    } else {
      photo.alt = '';
      popupPhotos.classList.add('visually-hidden');
    }
  });
};


const similarOffer = getOffer();
const createPopup = ({offer, author}) => {


  const popup = popupTemplate.cloneNode(true);
  const popupTitle = popup.querySelector('.popup__title');
  popupTitle.textContent = offer.title;

  const popupAdress = popup.querySelector('.popup__text--address');
  popupAdress.textContent = offer.adress;

  const popupPrice = popup.querySelector('.popup__text--price');
  popupPrice.textContent = `${offer.price} ₽/ночь`;

  const popupType = popup.querySelector('.popup__type');
  popupType.textContent = OFFER_TYPES[offer.type];

  const popupCapacity = popup.querySelector('.popup__text--capacity');
  popupCapacity.textContent = `${ offer.rooms  } комнаты для ${offer.guests} гостей`;

  const popupTime = popup.querySelector('.popup__text--time');
  popupTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const popupDescription = popup.querySelector('.popup__description');
  popupDescription.textContent = offer.description;

  const popupAvatars = popup.querySelector('.popup__avatar');
  popupAvatars.src = author.avatar;

  const popupFeatures = popup.querySelector('.popup__features');

  const popupPhotos = popup.querySelector('.popup__photos');
  const popupPhoto = popup.querySelector('.popup__photo');

  if (!offer.features) {
    popupFeatures.remove();
  } else {
    popupFeatures.innerHTML = '';
    renderFeatures(offer.features, popupFeatures);
  }

  if (!offer.photos) {
    popupFeatures.remove();
  } else {
    popupPhotos.innerHTML = '';
    renderPhotos(offer.photos, popupPhotos, popupPhoto);
  }


  return popup;
};

const offerNode = createPopup(similarOffer[0]);

const canvas = document.querySelector('#map-canvas');
canvas.appendChild(offerNode);

export{createPopup};
