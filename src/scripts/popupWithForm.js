import {Popup} from "./popup.js";

export class PopupWithForm extends Popup {
  constructor (popupSelector, handleFormSubmit) {
  super(popupSelector)
  this._formElement = this._popupSelector.querySelector('.popup__form');
  this._handleFormSubmit = handleFormSubmit;
  
  }
  
  _getInputValues() {

    this._formValues = {};
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  
  setEventListeners () {
    super.setEventListeners();
    this._popupSelector.querySelector('.popup__form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(evt, this._getInputValues());
      this.close();
    })
  }
  
  close () {
      this._formElement.reset();
      super.close();
  
  
  }
  }
  