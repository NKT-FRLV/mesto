
export {openModal,  
  closeByEscapeKay,
  closePopup,
  closeByOverlay
};

function openModal(popup) {
  // Открытие модалки
  popup.classList.add("popup_is-animated")
  setTimeout(() => {
    popup.classList.add("popup_is-opened");
  }, 11);
  // Вешаю Слушатели для закрытия модалки
  document.addEventListener("click", closeByOverlay);
  document.addEventListener("keydown", closeByEscapeKay);
};

// Функция закрытия по клавише ESC
function closeByEscapeKay(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened"); // при нажатии Esc ищу открытый Попап
    closePopup(openedPopup); // закрываю открытый попап
  }
};

// Функция закрытия по кнопке
function closePopup(popupToClose) {
  document.removeEventListener("click", closeByOverlay);  // Снятие слушателя закрытия по Overlay
  document.removeEventListener("keydown", closeByEscapeKay); // Снятие слушателя Esc
  popupToClose.classList.remove("popup_is-opened");
  setTimeout(()=> {
    popupToClose.classList.remove("popup_is-animated");
  },600)
  
};

// Функция закрытия по Overlay
function closeByOverlay(evt) {
  if (evt.target.classList.contains("popup_is-opened")) {
    closePopup(evt.target);
  }
};