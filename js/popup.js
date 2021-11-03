import {getOffer} from './data.js';
import {getIntegerFromRange} from './util.js';

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
/*const renderFeatures = (features, popupFeatures) => {
  features.forEach((element) => {
    const feature = document.createElement('li');

    feature.classList.add('popup__feature', `popup__feature--${element}`);
    popupFeatures.append(feature);
  });
};*/

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

  const popupPhotos = popup.querySelector('.popup__photos');
  const popupPhoto = popupPhotos.querySelector('.popup__photo');

  const popupAvatars = popup.querySelector('.popup__avatar');
  popupAvatars.src = author.avatar;

  //Удобства
  const popupFeatures = popup.querySelector('.popup__features');
  const popupFeatureList = popupFeatures.querySelectorAll('.popup__feature');

  if(Array.isArray(offer.features)) {
    const modifiers = offer.features.map((featureValue) =>`popup__feature--${featureValue}`);

    popupFeatureList.forEach((popupFeature) => {
      const modifier = popupFeature.classList[1];
      if (!modifiers.includes(modifier)) {
        popupFeature.remove();
      }
    });
  } else {
    const modifiers = `popup__feature--${offer.features}`;
    popupFeatureList.forEach((popupFeature) => {
      const modifier = popupFeature.classList[1];
      if (modifiers <= modifier) {
        popupFeature.remove();
      }
    });}

  //Фото
  /*const popupPhotos = popup.querySelector('.popup__photos');
  const popupPhoto = popupPhotos.querySelector('.popup__photo');

  if(Array.isArray(offer.photos)) {
    offer.photos.forEach((photoSrc, index) => {
      if(index !== 0){
        popupPhoto.src = offer.photos[0];
      } else {
        const popupPhotoItem = popupPhoto.cloneNode(true);
        popupPhotoItem.src = photoSrc;
        popupPhotos.appendChild(popupPhotoItem);
      }
    });
  } else {
    popupPhoto.src = offer.photos;
  }*/


  return popup;
};

const offerNode = createPopup(similarOffer[0]);

const canvas = document.querySelector('#map-canvas');
canvas.appendChild(offerNode);

console.log(similarOffer);
