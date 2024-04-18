import {cardTemplate, cardlist, profileTitle, profileDescription, mainContent, 
  profileEditBtn, addBtn, popupProfileEditer, 
  popupNewCard, popupImage, nameInput, jobInput, formElement} 
  from './variables.js'

const openModal = (popup)=> {
  // Меняю значение placeholder на текущее значение
  if (popup.classList.contains('popup_type_edit')) {
    setInputsValue();
  }

  // Открытие модалки
  popup.classList.add('popup_is-opened');
  
  // Закрытия модалки по КНОПКЕ
  const popupCloseBtn = popup.querySelector('.popup__close');

  popupCloseBtn.addEventListener('click', ()=> {
    closePopup(popup);
  });

  // Закрытия модалки По клику на OVERLAY
  popup.addEventListener('click', closeByOverlay);

  // Закрытия модалки По нажатию клавиши "Esc"
  document.addEventListener('keydown', closeByEscapeKay);

}

//
////
/////

const setInputsValue = ()=> {
  nameInput.value = profileTitle.textContent
  jobInput.value = profileDescription.textContent;
  // слушатель отправки Формы
  formElement.addEventListener('submit', handleFormSubmit);
}

// Обработчик «отправки» формы
const handleFormSubmit = (evt)=> {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  // formElement.submit();
  closePopup(formElement.parentElement.parentElement)
}

//////
////
//

const closeByEscapeKay = (evt)=> {
  if (evt.key === 'Escape') {
    
    const modalWindows = Array.from(document.querySelectorAll('.popup')); // создали массив попапов
    const openedPopup = modalWindows.find((openedItem)=> { // ищу актуальный попап(который открыт сейчас)
      return openedItem.classList.contains('popup_is-opened'); 
    });
    closePopup(openedPopup); // закрываю актуальный попап
    document.removeEventListener('keydown', closeByEscapeKay); // Снятие слушателя Esc
  }
}

// функция закрытия по кнопке
const closePopup = (popupToClose)=> {
  popupToClose.classList.remove('popup_is-opened');
}

// функция закрытия по Overlay
const closeByOverlay = (evt)=> {
  // console.log(evt.target);
  if (evt.target.classList.contains('popup_is-opened')) {
    // в данном случае с этой проверкой, evt.target какраз является ОТКРЫТЫМ попапом,
    // И передается функции для его закрытия.
    closePopup(evt.target);
  }
}

export {openModal, closePopup, closeByOverlay, closeByEscapeKay, setInputsValue, handleFormSubmit}