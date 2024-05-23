
export { makeRequest, getUserDates, getCards, patchProfileDates, postNewCard, patchAvatar, deleteLike, putLike, deleteCard }

const baseUrl = 'https://nomoreparties.co/v1/wff-cohort-13';
const authorizationKay = 'd48aadef-370a-44fe-8d23-f216f65bbe9f';

//// СТРОИМ ОБЩУЮ ФУНКЦИЮ ДЛЯ ЗАПРОСОВ НА СЕРВЕР
const makeRequest = (uri, method = 'GET', date = null) => {
  // Опции запроса
  const options = { 
    method,
    headers: {
      authorization: authorizationKay,
      'Content-Type': 'application/json'
    }
  }
  // если какие то данные передаются
  if (date) {
    options.body = JSON.stringify(date)
  }
  // ** Запрос на сервер **
  return fetch(`${baseUrl}/${uri}`, options)
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status} ${res.statusText}`))
}

// Загрузка страницы
const getUserDates = () => makeRequest('users/me');
const getCards = () => makeRequest('/cards');

// Возможные запросы Юзера
const patchProfileDates = (user, job) => makeRequest('/users/me', 'PATCH', { name: user, about: job });

const postNewCard = (title, link) => makeRequest('/cards', 'POST', { name: title, link: link });

const patchAvatar = (avatarUrl) => makeRequest('/users/me/avatar', 'PATCH', { avatar: avatarUrl });

const putLike = (date) => makeRequest(`cards/likes/${date._id}`, 'PUT');

const deleteLike = (date) => makeRequest(`cards/likes/${date._id}`, 'DELETE')

const deleteCard = (date) =>makeRequest(`cards/${date._id}`, 'DELETE');
