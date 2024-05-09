// импорт главного файла стилей
import "./index.css";
// импорт модуля с объектом данных карточек.
import {initialCards} from "./components/cards.js";
// импорт модуля с Функциями создания карточки.
import {createCard, deleteCard, likeCard} from "./components/card.js";
// импорт модуля с Функциями Модальных окон.
import {openModal, closePopup} from "./components/modal.js";
// импорт функции Валидации форм.
import {enableValidation, hideInputError, toggleButtonState} from "./components/validation.js";
// Экспорты
export {cardTemplate};

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
// ПОПАПЫ
const popupProfileEditer = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
// ФОРМЫ ПОПАПОВ
const profileEditerForm = popupProfileEditer.querySelector(".popup__form");
const addingForm = popupNewCard.querySelector(".popup__form");
// Поля ввода ПОПАПОВ
const nameInput = profileEditerForm.querySelector(".popup__input_type_name");
const jobInput = profileEditerForm.querySelector(".popup__input_type_description");
const placeInput = addingForm.querySelector(".popup__input_type_card-name");
const linkInput = addingForm.querySelector(".popup__input_type_url");

// @todo: Вывести карточки на страницу
initialCards.forEach((cardDate) => {
  const cardElement = createCard(cardDate, deleteCard, likeCard, openImageZoomingPopup);
  cardlist.append(cardElement);
});

// Слушатель для Открытия модалок.
mainContent.addEventListener("click", (evt) => { 
  if (evt.target === profileEditBtn) {
    openModal(popupProfileEditer);
    clearValidation(popupProfileEditer.querySelector('.popup__form'))
    setProfileInputsValue();
  } else if (evt.target === addBtn) {
    popupBtnDisable(popupNewCard.querySelector('.popup__form'));
    openModal(popupNewCard);

  }
});

// Функция отчисти полей ошибки при открытии формы Настройки профиля
function clearValidation(formElement) {
  const inputsOnError = Array.from(formElement.querySelectorAll('.popup__input_type_error'));
  inputsOnError.forEach((inputElement)=> {
    hideInputError(formElement, inputElement, {
      inputErrorClass: 'popup__input_type_error',
      errorClass: 'popup__input-error_active'
    })
  })
}

// Функция Дизейбляшая кнопку добавления карточки при открытии Попапа.
function popupBtnDisable(formElement) {
  const buttonElement = formElement.querySelector('.popup__button')
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  toggleButtonState(inputList, buttonElement, {
    inactiveButtonClass: 'popup__button_disabled'
  })
}

// слушатель отправки Формы
profileEditerForm.addEventListener("submit", handleEditForm);

// Слушатель формы создания карточки
addingForm.addEventListener("submit", handleAddForm);

// Слушатель закрытия модалки по кнопке КРЕСТИКУ
document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains('popup__close')){
    closePopup(evt.target.closest('.popup'));
  }
});

// Обработчик формы создания карточки
function handleAddForm(evt) {
  evt.preventDefault();
  const newCardObj = {
    name : placeInput.value,
    link : linkInput.value
  };
  const newCard = createCard(newCardObj, deleteCard, likeCard, openImageZoomingPopup);
  cardlist.prepend(newCard);
  addingForm.reset();
  closePopup(popupNewCard);
}

// Обработчик формы настройки профиля
function  handleEditForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  // formElement.submit();
  closePopup(popupProfileEditer);
};

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
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}); // Вешаем слушатели валидации

