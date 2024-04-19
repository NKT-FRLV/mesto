// variables
import {
  cardlist,
  profileTitle,
  profileDescription,
  popupProfileEditer,
  popupNewCard,
  popupImage,
  formElement,
  addingForm,
  nameInput,
  jobInput,
  placeInput,
  linkInput,
} from '../index.js'

import {createCard, deleteCard, likeCard} from "./card.js";

export {openModal, 
  setInputsValue, 
  handleFormSubmit, 
  handleAddForm, 
  closeByEscapeKay,
  closePopup,
  closeByOverlay,
  imageZoom
};

const openModal = (popup) => {
  // Меняю значение placeholder на текущее значение
  if (popup.classList.contains("popup_type_edit")) {
    setInputsValue();
  } else if (popup.classList.contains("popup_type_new-card")) {
    addingForm.addEventListener("submit", handleAddForm);
  }

  // Открытие модалки
  popup.classList.add("popup_is-animated")
  // Добавление класса небольшой задержкой что бы увидеть плавность
  setTimeout(() => {
    popup.classList.add("popup_is-opened");
  }, 11);

  // Закрытия модалки по КНОПКЕ
  const popupCloseBtn = popup.querySelector(".popup__close");

  popupCloseBtn.addEventListener("click", () => {
    closePopup(popup);
  });

  // Закрытия модалки По клику на OVERLAY
  popup.addEventListener("click", closeByOverlay);

  // Закрытия модалки По нажатию клавиши "Esc"
  document.addEventListener("keydown", closeByEscapeKay);
};

// Функция установки значения полей ввода
const setInputsValue = () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  // слушатель отправки Формы
  formElement.addEventListener("submit", handleFormSubmit);
};

// Обработчик формы настройки профиля
const handleFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  // formElement.submit();
  closePopup(popupProfileEditer);
};

// Обработчик формы создания карточки
const handleAddForm = (evt) => {
  evt.preventDefault();
  const cardObj = {};
  cardObj.name = placeInput.value;
  cardObj.link = linkInput.value;
  const newCard = createCard(cardObj, deleteCard, likeCard, imageZoom);
  cardlist.prepend(newCard);
  addingForm.reset();
  closePopup(popupNewCard);
}

// Функция закрытия по клавише ESC
const closeByEscapeKay = (evt) => {
  if (evt.key === "Escape") {
    const modalWindows = Array.from(document.querySelectorAll(".popup")); // создали массив попапов
    const openedPopup = modalWindows.find((openedItem) => {
      // ищу актуальный попап(который открыт сейчас)
      return openedItem.classList.contains("popup_is-opened");
    });
    closePopup(openedPopup); // закрываю актуальный попап
    document.removeEventListener("keydown", closeByEscapeKay); // Снятие слушателя Esc
  }
};

// Функция закрытия по кнопке
const closePopup = (popupToClose) => {
  popupToClose.classList.remove("popup_is-opened");
  setTimeout(()=> {
    popupToClose.classList.remove("popup_is-animated");
  },600)
  
};

// Функция закрытия по Overlay
const closeByOverlay = (evt) => {
  // console.log(evt.target);
  if (evt.target.classList.contains("popup_is-opened")) {
    // в данном случае с этой проверкой, evt.target какраз является ОТКРЫТЫМ попапом,
    // И передается функции для его закрытия.
    closePopup(evt.target);
  }
};

// Функция открытия Модалки с увеличенной картинкой.
const imageZoom = (img)=> {
  const imageElement = popupImage.querySelector('.popup__image');
  const textElement = popupImage.querySelector('.popup__caption');
  //наполняем попап данными выбранной карточки.
  imageElement.src = img.src ;
  imageElement.alt = img.alt;
  textElement.textContent = img.alt;
  openModal(popupImage);
}
