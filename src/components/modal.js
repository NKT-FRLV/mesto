import {
  cardlist,
  profileTitle,
  profileDescription,
  popupProfileEditer,
  popupNewCard,
  nameInput,
  jobInput,
  addingForm,
  placeInput,
  linkInput,
  formElement,
} from "./variables.js";

import {createCard, imageZoom, deleteCard, likeCard} from "../index.js";

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

// функция закрытия по кнопке
const closePopup = (popupToClose) => {
  popupToClose.classList.remove("popup_is-opened");
  setTimeout(()=> {
    popupToClose.classList.remove("popup_is-animated");
  },600)
  
};

// функция закрытия по Overlay
const closeByOverlay = (evt) => {
  // console.log(evt.target);
  if (evt.target.classList.contains("popup_is-opened")) {
    // в данном случае с этой проверкой, evt.target какраз является ОТКРЫТЫМ попапом,
    // И передается функции для его закрытия.
    closePopup(evt.target);
  }
};

export {openModal};
