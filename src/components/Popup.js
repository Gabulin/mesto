export default class Popup {
    constructor(popupSelector) {
      this._popupElement = document.querySelector(popupSelector);
      this._handleEscCloseBind = this._handleEscClose.bind(this);
    }

    open() {
        this._popupElement.classList.add('popup_opened');
       document.addEventListener('keydown', this._handleEscCloseBind);
    }

    close() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscCloseBind);
    }

    _handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        this.close();
      }
    };
  
    _closePopupByClickOnOverlay = (e) => {
      if (e.target.classList.contains("popup_opened")) {
        this.close();
      }
    };

    setEventListeners() {
      this._popupElement.addEventListener("mousedown", () => {
        this._closePopupByClickOnOverlay(window.event);
      });
      this._popupElement
        .querySelector(".popup__closed")
        .addEventListener("click", () => {
          this.close();
        });
    }
  }