// импорт главного файла стилей
import "./index.css";

// импорт модуля с объектом данных карточек.
import { initialCards } from "./components/cards.js";

// импорт модуля с Функциями создания карточки.
import { createCard, deleteCard, likeCard } from "./components/card.js";

// импорт модуля с Функциями Модальных окон.
import {openModal, imageZoom} from "./components/modal.js";

// Экспорты
export { createCard, deleteCard, likeCard };
export {
  cardTemplate,
  cardlist,
  profileTitle,
  profileDescription,
  mainContent,
  profileEditBtn,
  addBtn,
  popupProfileEditer,
  popupNewCard,
  popupImage,
  formElement,
  addingForm,
  nameInput,
  jobInput,
  placeInput,
  linkInput,
};

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
const formElement = popupProfileEditer.querySelector(".popup__form");
const addingForm = popupNewCard.querySelector(".popup__form");
// Поля ввода ПОПАПОВ
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
const placeInput = addingForm.querySelector(".popup__input_type_card-name");
const linkInput = addingForm.querySelector(".popup__input_type_url");

// @todo: Вывести карточки на страницу
initialCards.forEach((cardDate) => {
  const cardElement = createCard(cardDate, deleteCard, likeCard, imageZoom);
  cardlist.append(cardElement);
});

// Слушатель для Открытия модалок.
mainContent.addEventListener("click", (evt) => {
  if (evt.target === profileEditBtn) {
    openModal(popupProfileEditer);
  } else if (evt.target === addBtn) {
    openModal(popupNewCard);
  }
});
