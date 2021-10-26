import {getIntegerFromRange, getRandomFloat} from './util.js';
const AVATARS = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png',
  'img/avatars/user09.png',
  'img/avatars/user10.png',
];

const TITLES = [
  'Квартира в Новой Боровой',
  'ЖК Каскад',
  'Площадь Перемен',
  'Ст.м. Пушкинская',
  'ЖК Магистр',
  'Малиновска',
  'Грушевка',
];

const TYPES = ['palace',
  'flat',
  'house',
  'bungalow',
  'hotel'];

const CHECKINS = [
  '12:00',
  '13:00',
  '14:00'];

const CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00'];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'];

const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const GUESTS = [
  '1',
  '3'];

const ROOMS = [
  'big room',
  'small room',
  'medium room'];

const DESCRIPTIONS = ['Лучший номер', 'Средний номер', 'Худший номер'];


const createLocation = () => ({
  lat: getRandomFloat(35.65000 , 35.70000 ,5),
  lng: getRandomFloat(139.70000 , 139.80000 , 5),
});

const createOffer = () => {
  const randomAvatarIndex = getIntegerFromRange(0, AVATARS.length - 1);
  const randomTypeIndex = getIntegerFromRange(0, TYPES.length - 1);
  const randomCheckinIndex = getIntegerFromRange(0, CHECKINS.length - 1);
  const randomCheckoutIndex = getIntegerFromRange(0, CHECKOUTS.length - 1);
  const randomFeatureIndex = getIntegerFromRange(0, FEATURES.length - 1);
  const randomGuestIndex = getIntegerFromRange(0, GUESTS.length - 1);
  const randomPhotoIndex = getIntegerFromRange(0, PHOTOS.length - 1);
  const randomTitleIndex = getIntegerFromRange(0, TITLES.length - 1);
  const randomRoomIndex = getIntegerFromRange(0, ROOMS.length - 1);
  const randomDescriptionIndex = getIntegerFromRange(0, DESCRIPTIONS.length - 1);
  const location = createLocation();
  return {
    author: {
      avatar:AVATARS[randomAvatarIndex],
    },
    offer: {
      price:getIntegerFromRange(0, 1000),
      type:TYPES[randomTypeIndex],
      checkin:CHECKINS[randomCheckinIndex],
      checkout:CHECKOUTS[randomCheckoutIndex],
      adress: `${location.lat}, ${location.lng}`,
      feature:FEATURES[randomFeatureIndex],
      guests: GUESTS[randomGuestIndex],
      photo: PHOTOS[randomPhotoIndex],
      title: TITLES[randomTitleIndex],
      rooms: ROOMS[randomRoomIndex],
      description : DESCRIPTIONS[randomDescriptionIndex],
    },
    location: location,
  };
};

console.log(createOffer());

const OFFERS_COUNT = 10;

const getOffer = () => Array.from({length: OFFERS_COUNT}, createOffer);


console.log(getOffer());

export {getOffer};
