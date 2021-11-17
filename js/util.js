const getIntegerFromRange = function (min, max) {
  if (min < 0 || max <= min) {
    ('Недопустимое значение диапазона');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getIntegerFromRange(1, 10);


const getRandomFloat = (min, max, precision = 2) => {

  if (min >= max || min < 0) {
    ('Некорректный диапазон чисел');
  }

  const randomFloat = Math.random() * (max - min) + min;
  const result = randomFloat.toFixed(precision);

  return result;
};

getRandomFloat(1.4, 9.4, 5);

export{getIntegerFromRange, getRandomFloat};
