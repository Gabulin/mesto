import Popup from "./popup";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector(".image__opened");
    this._title = this._popupElement.querySelector(".image__name");
  }

  open(data) {
    this._image.src = data.link;
    this._image.alt = data.name;
    this._title.textContent = data.name;
    super.open();
  }
}