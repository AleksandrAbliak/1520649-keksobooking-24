import { onSuccessSubmit } from './user-modal.js';
import { onFailSubmit } from './user-modal.js';
import { showAlert } from './show-alert.js';
import {getFiltered} from './filter.js';

const getData = () => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((offers) => {
      getFiltered(offers);
    })
    .catch((err) => {
      showAlert(`Ошибка загрузки данных: ${err}`);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        onSuccessSubmit();
      } else {
        onFailSubmit();
      }
    })
    .catch((err) => {
      onFail(err);
    });
};


export{sendData, getData};
