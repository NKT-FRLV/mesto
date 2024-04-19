// variables
import {cardTemplate} from "../index.js";

export { createCard, deleteCard, likeCard };

// @todo: Функция создания карточки
const createCard = (date, callback, likeAction, cardImgZoom) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardText = cardElement.querySelector(".card__title");
  cardImage.src = date.link;
  cardImage.alt = date.name;
  cardText.textContent = date.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    callback(cardElement);
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeAction(likeButton);
  });

  cardImage.addEventListener("click", () => {
    cardImgZoom(cardImage);
  });

  return cardElement;
};

// @todo: Функция удаления карточки Callback
const deleteCard = (card) => {
  card.remove();
};

// @todo: Функция переключения LIKE карточки
const likeCard = (button) => {
  button.classList.toggle("card__like-button_is-active");
};
