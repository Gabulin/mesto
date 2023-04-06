import { Popup } from "./popup.js";

export class PopupWithImage extends Popup {
  constructor (popupSelector){
  super (popupSelector);
  this._popupImageBigItem = this._popupSelector.querySelector('.image__opened')
  this._popupImageBigName = this._popupSelector.querySelector('.image__name')
  }

 open (name, link) {
    this._popupImageBigItem.src = link;
    this._popupImageBigItem.alt = name;
    this._popupImageBigName.textContent = name;

    super.open();
  }

}