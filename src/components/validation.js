export {enableValidation, hideInputError, toggleButtonState}

const showInputError = (formElement, inputElement, errorMessage, classesObj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(classesObj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(classesObj.errorClass);
};

const hideInputError = (formElement, inputElement, classesObj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(classesObj.inputErrorClass);
  errorElement.classList.remove(classesObj.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, classesObj) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, classesObj);
  } else {
    hideInputError(formElement, inputElement, classesObj);
  }
};

const setEventListeners = (formElement, classesObj) => {
  const inputList = Array.from(formElement.querySelectorAll(classesObj.inputSelector));
  const buttonElement = formElement.querySelector(classesObj.submitButtonSelector)
  toggleButtonState(inputList, buttonElement, classesObj)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, classesObj);
      toggleButtonState(inputList, buttonElement, classesObj)
    });
  });
};

const enableValidation = (classesObj) => {
  const formList = Array.from(document.querySelectorAll(classesObj.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, classesObj)
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement)=> {
    return !inputElement.validity.valid
  })
}

function toggleButtonState(inputList, buttonElement, classesObj) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true
    buttonElement.classList.add(classesObj.inactiveButtonClass)
  } else {
    buttonElement.classList.remove(classesObj.inactiveButtonClass)
    buttonElement.disabled = false
  }
}

