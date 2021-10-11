const getIntegerFromRange = function (min, max) {
  if (min < 0 || max <= min) {
    console.log('Недопустимое значение диапазона');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getIntegerFromRange(1, 10);


const getRandomFloat = (min, max, precision = 2) => {

  if (min >= max || min < 0) {
    console.log('Некорректный диапазон чисел');
  }

  const randomFloat = Math.random() * (max - min) + min;
  const result = randomFloat.toFixed(precision);

  return result;
};

getRandomFloat(1.4, 9.4, 5);


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

const TITLES = [
  'rent house',
  'rent room'];

const ROOMS = [
  'big room',
  'small room',
  'medium room'];

const DESCRIPTIONS = ['Лучший номер', 'Средний номер', 'Худший номер'];


const getAvatarNumber = function () {
  const randomNumber = getIntegerFromRange(0, 10);
  if (randomNumber < 10) {
    return `0${randomNumber}`;
  }
  return randomNumber;
};

const createOffer = () => ({
  author: {
    avatar:`img/avatars/user${getAvatarNumber()}.png`,
  },
  price:getIntegerFromRange(0, 1000),
  type: getIntegerFromRange(0, TYPES.length - 1),
  checkin: getIntegerFromRange(0, CHECKINS.length - 1),
  checkout: getIntegerFromRange(0, CHECKOUTS.length - 1),
  feature: getIntegerFromRange(0, FEATURES.length - 1),
  photo: getIntegerFromRange(0, PHOTOS.length - 1),
  title: getIntegerFromRange(0, TITLES.length - 1),
  room: getIntegerFromRange(0, ROOMS.length - 1),
  description : getIntegerFromRange(0, DESCRIPTIONS.length - 1),
  location: {
    lng:getRandomFloat(35.65000 , 35.70000 ,5),
    lat:getRandomFloat(139.70000 , 139.80000 , 5),
  },
});

console.log(createOffer());

const OFFERS_COUNT = 10;

const similarOffer = Array.from({length: OFFERS_COUNT});
console.log(similarOffer);
