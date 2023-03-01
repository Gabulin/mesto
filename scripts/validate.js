// Валидация

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