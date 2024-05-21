export {enableValidation, clearValidation, showInputError, hideInputError, checkInputValidity, validateImageUrl};

const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector)
  toggleButtonState(inputList, buttonElement, validationConfig)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig)
    });
  });
};

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig)
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement)=> {
    return !inputElement.validity.valid
  })
}

function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true
    buttonElement.classList.add(validationConfig.inactiveButtonClass)
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass)
    buttonElement.disabled = false
  }
}

// Функция отчисти полей ошибки при открытии формы Настройки профиля
function clearValidation(formElement, validationConfig) {
  const inputsOnError = Array.from(formElement.querySelectorAll(`.${validationConfig.inputErrorClass}`));
  inputsOnError.forEach((inputElement)=> {
    hideInputError(formElement, inputElement, validationConfig)
    // inputElement.value = ''
  })
  // Функция Дизейбляшая кнопку добавления карточки при открытии Попапа.
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector)
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  toggleButtonState(inputList, buttonElement, validationConfig)
}

function validateImageUrl(url, formElement, inputElement, validationConfig) {
  // Запрос на проверку URL через CORS прокси сервер
  const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
  return fetch(proxyUrl, { method: 'HEAD' })
    .then(response => {
      // Проверка статуса ответа
      if (!response.ok) {
        showInputError(formElement, inputElement, 'URL недоступен или не существует', validationConfig);
        return false
      }
      // Проверка mime-типа в заголовках
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.startsWith('image/')) {
        showInputError(formElement, inputElement, 'Ссылка не ведет к изображению', validationConfig);
        return false
      }
      return true;
    });
}
