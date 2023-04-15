import Popup from "./popup";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageBigItem = this._popupElement.querySelector(".image__opened");
    this._popupImageBigName = this._popupElement.querySelector(".image__name");
  }

  open(data) {
    this._popupImageBigItem.src = data.link;
    this._popupImageBigItem.alt = data.name;
    this._popupImageBigName.textContent = data.name;
    super.open();
  }
}