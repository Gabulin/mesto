// Валидация
export class FormValidator {
  constructor(formData, formElement) {
    this._inputSelector = formData.inputSelector;
    this._submitButtonSelector = formData.submitButtonSelector;
    this._inactiveButtonClass = formData.inactiveButtonClass;
    this._inputErrorClass = formData.inputErrorClass;
    this._errorClass = formData.errorClass;
    this._formElement = formElement;
  }
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}`).nextElementSibling;
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }
  
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}`).nextElementSibling;
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }
  
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  
  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
  }
  
  _toggleButtonState (inputList, buttonElement) {
  if (this._hasInvalidInput(inputList)) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
  }
  
  _setEventListeners () {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
  
    
    this._formElement.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButtonState(inputList, buttonElement);
      }, 0); 
    });
  
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement)
      })
    })
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._toggleButtonState(inputList, buttonElement);
    })
    this._toggleButtonState(inputList, buttonElement);
  }
  
  enableValidation () {
    this._setEventListeners();
  }
  
}
//Код прошлой валидации оставил про запас, после сдачи проекта будет удалён
/*
const showInputError = (setting, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}`).nextElementSibling;
  console.log(errorElement)
  inputElement.classList.add(setting.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(setting.errorClass);
}

const hideInputError = (setting, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}`).nextElementSibling;
  inputElement.classList.remove(setting.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(setting.errorClass);
}

const checkInputValidity = (setting, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(setting, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(setting, formElement, inputElement);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  })
}

const toggleButtonState = (setting, inputList, buttonElement) => {
if (hasInvalidInput(inputList)) {
  buttonElement.classList.add(setting.inactiveButtonClass);
  buttonElement.disabled = true;
} else {
  buttonElement.classList.remove(setting.inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
}
}

const setEventListeners = (setting, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(setting.inputSelector));
  const buttonElement = formElement.querySelector(setting.submitButtonSelector);
  toggleButtonState(setting, inputList, buttonElement);

  
  formElement.addEventListener('reset', () => {
    setTimeout(() => {
      toggleButtonState(setting, inputList, buttonElement);
    }, 0); 
  });


  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(setting, formElement, inputElement);
      toggleButtonState(setting, inputList, buttonElement)
    })
  })
}

const enableValidation = (setting) => {
  const formList = Array.from(document.querySelectorAll(setting.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(setting, formElement);
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'input__error',
  errorClass: 'popup__input-error_active'
});
*/