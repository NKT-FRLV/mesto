// импорт главного файла стилей
import './index.css'; 

// импорт модуля с объектом карт JS
import { initialCards } from './components/cards.js' 

// импорт модуля с Переменными
import {cardTemplate, cardlist, mainContent, 
  profileEditBtn, addBtn, popupProfileEditer, 
  popupNewCard, popupImage} 
  from './components/variables.js'

// импорт модуля с Functions ПОПАПОВ
import {openModal} from './components/modal.js'


// POP-UP WORKS START


// POP-UP WORKS END
// POP-UP WORKS END

// @todo: Функция создания карточки
const createCard = (date, callback, likeAction, cardImgZoom)=> {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardText = cardElement.querySelector('.card__title');
  cardImage.src = date.link;
  cardImage.alt = date.name;
  cardText.textContent = date.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener( 'click', () => {
    callback(cardElement);
  });

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', ()=> {
    likeAction(likeButton);
  });
  
  cardImage.addEventListener('click', ()=> {
    cardImgZoom(cardImage);
  })

  return cardElement;
}

const imageZoom = (img)=> {
  const imageElement = popupImage.querySelector('.popup__image');
  const textElement = popupImage.querySelector('.popup__caption');
  //наполняем попап данными выбранной карточки.
  imageElement.src = img.src ;
  imageElement.alt = img.alt;
  textElement.textContent = img.alt;
  openModal(popupImage);
}

// @todo: Функция удаления карточки Callback
const deleteCard = (card)=> {
  card.remove();
}

// @todo: Функция переключения LIKE карточки
const likeCard = (button)=> {
  button.classList.toggle('card__like-button_is-active');
}

// @todo: Вывести карточки на страницу
initialCards.forEach( cardDate => {
  const cardElement = createCard(cardDate, deleteCard, likeCard, imageZoom);
  cardlist.append(cardElement); 
});


// POP-UP WORKS START
// POP-UP WORKS START
// POP-UP WORKS START
// Открытие Модалки Настройки профиля
mainContent.addEventListener('click', (evt)=> {

  if (evt.target === profileEditBtn) {
    openModal(popupProfileEditer);
  } else if (evt.target === addBtn) {
    openModal(popupNewCard);
   } //else if (evt.target.classList.contains('card__image')) {
  //   openModal(popupImage);
  // }
});

export {createCard, imageZoom, deleteCard, likeCard}