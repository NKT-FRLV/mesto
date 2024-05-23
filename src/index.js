// импорт главного файла стилей
import "./index.css";
// импорт модуля API.
import { getUserDates, getCards, patchProfileDates, postNewCard, patchAvatar } from "./components/api.js";
// импорт модуля с Функциями создания карточки.
import {createCard, deleteCardHendler, likeCard} from "./components/card.js";
// импорт модуля с Функциями Модальных окон.
import {openModal, closePopup, closeByOverlay} from "./components/modal.js";
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
const createCardButton = mainContent.querySelector(".profile__add-button");
const profileAvatarImage = mainContent.querySelector(".profile__image");
// ПОПАПЫ
const popupProfileEditer = document.querySelector(".popup_type_edit");
const popupAvatar = document.querySelector(".popup_change-avatar");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
// Массив попапов
const popups = Array.from(document.querySelectorAll(".popup"));
// ФОРМЫ ПОПАПОВ
const profileEditerForm = popupProfileEditer.querySelector(".popup__form");
const createCardForm = popupNewCard.querySelector(".popup__form");
const avatarForm = popupAvatar.querySelector(".popup__form");

// Поля ввода ПОПАПОВ
const nameInput = profileEditerForm.querySelector(".popup__input_type_name");
const jobInput = profileEditerForm.querySelector(".popup__input_type_description");
const placeInput = createCardForm.querySelector(".popup__input_type_card-name");
const linkInput = createCardForm.querySelector(".popup__input_type_url");
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


const initPage = ()=> {
  return Promise.all([getUserDates(), getCards()])
    .then(([userData, cardsData]) => ({ userData, cardsData }))
    .then(({ userData, cardsData }) => {
      // Сохраняем userId в глобальную переменную для дальнейшего использования
      userId = userData._id; 
      // Настройка профиля Юзера данными с сервера
      profileTitle.textContent = userData.name 
      profileDescription.textContent = userData.about
      profileAvatarImage.style.backgroundImage = `url('${userData.avatar}')`;
      // Вызов карточек С СЕРВЕРА на страницу
      createInitialCards(cardsData)
      // Включаем валидацию форм
      enableValidation(validationConfig)
      // Настройка аватара
    })
    .catch((err) => {
      console.log('Произошла ошибка при получении данных с сервера:', err);
      console.error(err);
    })
}
initPage()


// @todo: Вывести карточки на страницу
function createInitialCards(initialCards) {
  initialCards.forEach((cardDate) => {
    const cardElement = createCard(userId, cardDate, cardTemplate, deleteCardHendler, likeCard, openImageZoomingPopup);
    cardlist.append(cardElement);
  });
}

// Слушатели для Открытия модалок.
profileEditBtn.addEventListener("click", () => {
  openModal(popupProfileEditer);
  setProfileInputsValue();
  clearValidation(profileForm, validationConfig)
});

createCardButton.addEventListener("click", () => {
  openModal(popupNewCard);
  createCardForm.reset();
  clearValidation(newCardCreatorForm, validationConfig);
});

profileAvatarImage.addEventListener("click", () => {
  openModal(popupAvatar);
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
});

// Вешаю Слушатели для закрытия модальных окон 
popups.forEach((popup) => {
  // Слушатель закрытия по кнопке крестику.
  const clsBtn = popup.querySelector(".popup__close");
  clsBtn.addEventListener("click", () => {
    closePopup(popup);
  });
  // Слушатель закрытия по клику на оверлэю
  popup.addEventListener("click", closeByOverlay);
})

// слушатель формы редактир. Профиля
profileEditerForm.addEventListener("submit", handleEditForm);
// Слушатель формы создания карточки
createCardForm.addEventListener("submit", handleCardAddingForm);
// Слушатель формы редактирования Аватара
avatarForm.addEventListener("submit", handleAvatarForm);


// Обработчик формы редактирования аватара
function handleAvatarForm(evt) {
  const url = linkInputAvatar.value;
  console.log(evt.submitter)
  handleFormWithImageSubmission(evt, url, avatarForm, linkInputAvatar, validationConfig, (url) => {
    return patchAvatar(url)
    .then((updatedUser) => {
      profileAvatarImage.style.backgroundImage = `url('${updatedUser.avatar}')`;
      closePopup(popupAvatar);
    })
  })
}

// Обработчик формы создания карточки
function handleCardAddingForm(evt) {
  // Обновленный объект карточки
  const cardName = placeInput.value;
  const cardUrl = linkInput.value;
  handleFormWithImageSubmission(evt, cardUrl, createCardForm, linkInput, validationConfig, (url) => {
    return postNewCard(cardName, url)
      .then((newCardObj) => {
        const newCard = createCard(userId, newCardObj, cardTemplate, deleteCardHendler, likeCard, openImageZoomingPopup);
        cardlist.prepend(newCard);
        closePopup(popupNewCard);
      });
  });
}

// Обработчик форм работающих с картинками
function handleFormWithImageSubmission(evt, url, formElement, inputElement, validationConfig, successCallback) {
  evt.preventDefault();
  const popupButton = evt.submitter;
  popupButton.textContent = 'Сохранение...';
  validateImageUrl(url, formElement, inputElement, validationConfig)
    .then((isValid) => {
      if (isValid) {
        successCallback(url)
          .catch((error) => {
            console.log(`Ошибка: ${error}`);
          })
          .finally(() => {
            popupButton.textContent = 'Сохранить';
          });
      }
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
      popupButton.textContent = 'Сохранить';
    });
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
      console.log(`Ошибка: ${error}`);
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


