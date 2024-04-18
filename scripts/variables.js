// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardlist = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDescription =document.querySelector('.profile__description');

// POP-UP WORKS START
const mainContent = document.querySelector('.content');
// Кнопки появления ПОПАПА
const profileEditBtn = mainContent.querySelector('.profile__edit-button');
const addBtn = mainContent.querySelector('.profile__add-button');
// ПОПАПЫ
const popupProfileEditer = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
// input-ы ПОПАПОВ
// Находим форму в DOM
const formElement = popupProfileEditer.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
// export to index.js

export {cardTemplate, cardlist, profileTitle, profileDescription, mainContent, 
  profileEditBtn, addBtn, popupProfileEditer, 
  popupNewCard, popupImage, nameInput, jobInput, formElement}