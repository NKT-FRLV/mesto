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
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  inputList.forEach((inputElement)=> {
    hideInputError(formElement, inputElement, validationConfig)
  })
  // Дизейблим или активируем кнопку Сабмит
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector)
  toggleButtonState(inputList, buttonElement, validationConfig)
}

function validateImageUrl(url, formElement, inputElement, validationConfig) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      // Проверка прошла успешно, URL ведет к изображению
      resolve(true);
    };
    
    img.onerror = () => {
      // Ошибка загрузки изображения
      showInputError(formElement, inputElement, 'URL недоступен или не существует', validationConfig);
      reject('URL недоступен или не существует, пожалуйста, проверьте URL');
      // resolve(false);
    };
    // Устанавливаем src, чтобы начать загрузку изображения и вернуть true или false
    img.src = url;
  });
}
