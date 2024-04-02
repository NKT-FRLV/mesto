// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardlist = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(date, callback) {
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

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach( cardDate => {
  const cardElement = createCard(cardDate, deleteCard);
  cardlist.append(cardElement); 
});
