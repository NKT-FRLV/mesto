// импорт главного файла стилей
import "./index.css";
// импорт модуля API.
import { loadUserDates, loadCards, patchProfileDates, postNewCard, patchAvatar } from "./components/api.js";
// импорт модуля с Функциями создания карточки.
import {createCard, deleteCardHendler, likeCard} from "./components/card.js";
// импорт модуля с Функциями Модальных окон.
import {openModal, closePopup} from "./components/modal.js";
// импорт функции Валидации форм.
import {enableValidation, clearValidation, validateImageUrl} from "./components/validation.js";
// Экспорты
export {cardTemplate, postNewCard, userId};

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const cardlist = document.querySelector(".places__list");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
// POP-UP WORKS START
// Контейнер что бы вешать слушатель на все картинки.
const mainContent = document.querySelector(".content");
// Кнопки появления ПОПАПА
const profileEditBtn = mainContent.querySelector(".profile__edit-button");
const addBtn = mainContent.querySelector(".profile__add-button");
const profileAvatar = mainContent.querySelector(".profile__image");
// ПОПАПЫ
const popupProfileEditer = document.querySelector(".popup_type_edit");
const popupAvatar = document.querySelector(".popup_change-avatar");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
// ФОРМЫ ПОПАПОВ
const profileEditerForm = popupProfileEditer.querySelector(".popup__form");
const addingForm = popupNewCard.querySelector(".popup__form");
const avatarForm = popupAvatar.querySelector(".popup__form");

// Поля ввода ПОПАПОВ
const nameInput = profileEditerForm.querySelector(".popup__input_type_name");
const jobInput = profileEditerForm.querySelector(".popup__input_type_description");
const placeInput = addingForm.querySelector(".popup__input_type_card-name");
const linkInput = addingForm.querySelector(".popup__input_type_url");
const linkInputAvatar = popupAvatar.querySelector(".popup__input_type_url");


// Объект конфигурации классов для валидации.
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}
// Формы Модальных Окон :
const profileForm = popupProfileEditer.querySelector(validationConfig.formSelector);
const newCardCreatorForm = popupNewCard.querySelector(validationConfig.formSelector);

//////
let userId; // переменная в которую мы запишем _id юзера зашеднего на страницу.

const promises = [loadUserDates(), loadCards()]

const getDates = ()=> {
  return Promise.all(promises)
  .then(([userData, cardsData]) => ({ userData, cardsData }));

}

function getUserDates() {
  return getDates()
    .then(({ userData }) => {
    // console.log(result.userData._id) // 1260cf58bf1bd4d147c7224a
    userId = userData._id; // Сохраняем userId в глобальную переменную
    // Настройка Профиля стр.
    profileTitle.textContent = userData.name 
    profileDescription.textContent = userData.about
    profileAvatar.style.backgroundImage = `url('${userData.avatar}')`;
    return userData
  })
}
// вызов данных о Пользователе
getUserDates()

// @todo: Вывести карточки С СЕРВЕРА на страницу
function showInitialCards() {
  getDates()
    .then(({cardsData}) => {
      createInitialCards(cardsData)
    });
}

showInitialCards() // ВЫЗОВ РАСКЛАДА НАЧАЛЬНЫХ КАРТОЧЕК

// @todo: Вывести карточки на страницу
function createInitialCards(initialCards) {
  initialCards.forEach((cardDate) => {
    const cardElement = createCard(cardDate, deleteCardHendler, likeCard, openImageZoomingPopup);
    cardlist.append(cardElement);
  });
}


// Слушатель для Открытия модалок.
mainContent.addEventListener("click", (evt) => { 
  if (evt.target === profileEditBtn) {
    openModal(popupProfileEditer);
    setProfileInputsValue();
    clearValidation(profileForm, validationConfig)
  } else if (evt.target === addBtn) {
    openModal(popupNewCard);
    clearValidation(newCardCreatorForm, validationConfig);
   }  else if (evt.target === profileAvatar) {
    openModal(popupAvatar);
    clearValidation(avatarForm, validationConfig);
   }
});

// слушатель формы редактир. Профиля
profileEditerForm.addEventListener("submit", handleEditForm);
// Слушатель формы создания карточки
addingForm.addEventListener("submit", handleAddForm);
// Слушатель формы редактирования Аватара
avatarForm.addEventListener("submit", handleAvatarForm);
// Слушатель закрытия модалки по кнопке КРЕСТИКУ
document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains('popup__close')){
    closePopup(evt.target.closest('.popup'));
  }
});

// Обработчик формы редактирования аватара
function handleAvatarForm(evt) {
  evt.preventDefault();
  const originalUrl = linkInputAvatar.value;
  const popupButton = this.querySelector('.popup__button');
  validateImageUrl(originalUrl, avatarForm, linkInputAvatar, validationConfig)
    .then((isValid) => {
      if (isValid) {
    popupButton.textContent = 'Сохранение...';
    patchAvatar(originalUrl)
      .then((updatedUser) => {
        profileAvatar.style.backgroundImage = `url('${updatedUser.avatar}')`;
        linkInputAvatar.value = '';
        popupButton.textContent = 'Сохранить';
        closePopup(popupAvatar);
      })
      .catch((error) => {
        console.error(error);
      })
    } else {
      console.log('URL недоступен или не существует')
      popupButton.textContent = 'Сохранить';
    }
  })
}

// Обработчик формы создания карточки
function handleAddForm(evt) {
  evt.preventDefault();
  // Обновленный объект карточки
  const cardName = placeInput.value;
  const cardUrl = linkInput.value;
  const popupButton = this.querySelector('.popup__button');
  popupButton.textContent = 'Сохранение...';
  validateImageUrl(cardUrl, addingForm, linkInput, validationConfig)
    .then((isValid) => {
      if (isValid) {
        postNewCard(cardName, cardUrl) 
          .then((newCardObj)=> {
            const newCard = createCard(newCardObj, deleteCardHendler, likeCard, openImageZoomingPopup);
            cardlist.prepend(newCard);
            addingForm.reset();
            popupButton.textContent = 'Сохранить';
            closePopup(popupNewCard);
          })
      } else {
        console.log('URL недоступен или не существует')
        popupButton.textContent = 'Сохранить';
      }
  })
  
}

// Обработчик формы настройки профиля
function handleEditForm(evt) {
  evt.preventDefault();
  const popupButton = this.querySelector('.popup__button');
  popupButton.textContent = 'Сохранение...';
  patchProfileDates(nameInput.value, jobInput.value)
    .then((updatedUser) => {
      profileTitle.textContent = updatedUser.name;
      profileDescription.textContent = updatedUser.about;
      closePopup(popupProfileEditer);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      popupButton.textContent = 'Сохранить';
    })
}


// Функция установки значения полей ввода
function setProfileInputsValue() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
};

// Функция открытия Модалки с увеличенной картинкой.
function openImageZoomingPopup(img) {
  const imageElement = popupImage.querySelector('.popup__image');
  const textElement = popupImage.querySelector('.popup__caption');
  //наполняем попап данными выбранной карточки.
  imageElement.src = img.src ;
  imageElement.alt = img.alt;
  textElement.textContent = img.alt;
  openModal(popupImage);
};


// 
//
//
//
enableValidation(validationConfig); // Вешаем слушатели валидации

