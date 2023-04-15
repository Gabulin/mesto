import Popup from "./popup";
export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;
      this._formElement = this._popupElement.querySelector('.popup__form');
      this._inputList = this._popupElement.querySelectorAll('.popup__input');
      this._submitButton = this._popupElement.querySelector('.popup__submit');
      this._submitButtonText = this._submitButton.textContent;
    }

    _getInputValues() {
      this._formValues = {};
      this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
      });
      return this._formValues;
    }

    setInputValues(data) {
        this._inputList.forEach(input => {
            input.value = data[input.name]
        })
    }

    close() {
        this._formElement.reset();
        super.close();
    }

    setSavingProcessText() {
      this._submitButton.textContent = 'Сохранение...';
    }

    returnSavingProcessText() {
      this._submitButton.textContent = this._submitButtonText;
    }

    setEventListeners() {
      this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
        this.close();
      });
      super.setEventListeners();
    }
}