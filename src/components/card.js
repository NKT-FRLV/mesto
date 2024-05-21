
import { cardTemplate, userId} from "../index.js";
import { deleteLike, putLike, deleteCard } from "./api.js";
export { createCard, deleteCardHendler, likeCard };

// @todo: Функция создания карточки
function createCard(date, callback, likeAction, cardImgZoom) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardText = cardElement.querySelector(".card__title");
  const cardLikeCounter = cardElement.querySelector(".card__likes-counter");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  let cardIsLikedByMe = date.likes.some( person => person._id === userId ); // true or false
  cardImage.src = date.link;
  cardImage.alt = date.name;
  cardText.textContent = date.name;
  // Отображение количества лайков под сердечком.
  if (date.likes.length > 0) {
    cardLikeCounter.style.display = 'block';
    cardLikeCounter.textContent = date.likes.length;
  }
  
  //  Проверка, если мной лайкнуто, пускай лайк будет закрашен.
  if (cardIsLikedByMe) {
    likeButton.classList.toggle("card__like-button_is-active");
  }

  deleteButton.addEventListener("click", () => {
    callback(cardElement, date);
  });
  
  // проверка если карточка не моя, убрать кнопку удаления.
  if (date.owner._id !== userId) {
    deleteButtonRemover(callback, deleteButton, cardElement, date)
  }

  likeButton.addEventListener("click", () => {
    likeAction(likeButton, cardLikeCounter, date);
  });

  cardImage.addEventListener("click", () => {
    cardImgZoom(cardImage);
  });

  return cardElement;
};

// Функция убирающая иконку удаления ( если карточка не принадлежит мне) узнать это надо по _id юзера
function deleteButtonRemover(callback,button, card, date) {
  button.removeEventListener("click", () => {
    callback(card, date);
  });
  button.remove()
}

// @todo: Функция удаления карточки Callback функции createCard
const deleteCardHendler = (card, date) => {
  deleteCard(date)
    .then((res) => {
      console.log(res["message"]);
      card.remove();
    })
    .catch(err => console.error('Ошибка при удалении карточки:', err));
};

//
//// ЛАЙКИ
////////////////
// @todo: Функция переключения LIKE карточки
const likeCard = (button, cardLikeCounter, date) => {

  let cardIsLikedByMe = date.likes.some( person => person._id === userId )
  //Создаем функцию которая - Если я лайкал, тогда removeLike, если не лайкал putLike
  let likeOrNot = cardIsLikedByMe ? deleteLike : putLike;

  likeOrNot(date) // Передаем общий аргумент
    .then((result)=> {
      button.classList.toggle("card__like-button_is-active");

      // Обновление объекта date ДАННОЙ КАРТОЧКИ лайками из result
      date.likes = result.likes; 
      cardLikeCounter.textContent = result.likes.length
      cardLikeCounter.style.display = 'block';

      // Скрываем счетчик лайков если их 0
      if (result.likes.length === 0) {
        cardLikeCounter.style.display = 'none';
      }

      return result
    })
      .catch(err => console.error('Ошибка при добавлении лайка:', err));

}
