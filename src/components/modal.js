
export {openModal,  
  closePopup,
  closeByOverlay
};

function openModal(popup) {
  // Открытие модалки
  popup.classList.add("popup_is-opened");
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
  popupToClose.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEscapeKay);
};

// Функция закрытия по Overlay
function closeByOverlay(evt) {
  if (evt.target.classList.contains("popup_is-opened")) {
    closePopup(evt.target);
  }
};



