import Popup from "./popup";
export default class PopupConfirmation extends Popup {
    constructor(popupSelector, callbackConfirmation) {
      super(popupSelector);
      this._formElement = this._popupElement.querySelector('.popup__form');
      this._submitButton = this._popupElement.querySelector('.popup__submit');
      this._callbackConfirmation = callbackConfirmation;
    }

    open(cardObject, cardId) {
      this._cardObject = cardObject;
      this._cardId = cardId;
      super.open();
    }

    setDeletingProcessText() {
      this._submitButton.textContent = 'Удаление...';
    }

    returnDeletingProcessText() {
      this._submitButton.textContent = this._submitButtonText;
    }

    setEventListeners() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callbackConfirmation(this._cardObject, this._cardId);
            
        })
        super.setEventListeners();
    }
}