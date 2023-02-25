// Валидация

//Здравствуйте, уважаемый ревьюер, не могли бы вы в замечании указать, почему инпуты всегда считаются невалидными, правда не могу разобраться.
//Очень вас прошу помочь!

const selectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__input-error_active'
  }; 

  
  const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selectors['inputErrorClass']);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectors['errorClass']);
  };
  
  const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selectors['inputErrorClass']);
  errorElement.classList.remove(selectors['errorClass']);
  errorElement.textContent = '';
  };
  
  
  
  
  const checkInputValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showError(formElement, inputElement, inputElement.validationMessage);  
    } else {
      hideError(formElement, inputElement);                                  
    };
  };
  
  
  
  const hasInvalidInput = (inputList) => {        
    return inputList.some((inputElement) => {  
      return !inputElement.validity.valid;     
    });
  }; 
  
  
  
  
  function setEventListener(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(selectors['inputSelector'])); 
    const buttonElement = formElement.querySelector(selectors['submitButtonSelector']); 
    toggleButtonState(inputList, buttonElement);   
    inputList.forEach((inputElement) => {              
      inputElement.addEventListener('input', () => {
        checkInputValid(formElement, inputElement);    
        toggleButtonState(inputList, buttonElement);   
      });                           
    });
  };
   
  
  
  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(selectors['formSelector']));  
    formList.forEach((formElement) => {                                        
      formElement.addEventListener('submit', (evt) => {                         
        evt.preventDefault();                                                  
      });
      setEventListener(formElement);     
    });
  };
   
  function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {                     
    buttonElement.disabled = true;                        
    buttonElement.classList.add(selectors['inactiveButtonClass']);  
  } else {                                               
    buttonElement.disabled = false;                          
    buttonElement.classList.remove(selectors['inactiveButtonClass']); 
  };
  };
  
  enableValidation();
