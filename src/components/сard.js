export class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._popup = document.querySelector(".popup_image-open");
    this._popupImage = this._popup.querySelector(".image__opened");
    this._popupSubtitle = this._popup.querySelector(".image__name");
  }

  _getTemplate() {
    const templateElement = this._templateSelector.cloneNode(true);
    return templateElement;
  }

  _like(evt) {
    evt.target.classList.toggle("element__button_active");
  }

  _remove(evt) {
    const placeItem = evt.target.closest(".element");
    placeItem.remove();
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._like);
    this._trashButton.addEventListener("click", this._remove);
    this._placeImage.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );
  }

  createCard() {
    const card = this._getTemplate();
    this._placeImage = card.querySelector(".element__image");
    this._placeTitle = card.querySelector(".element__title");

    this._placeTitle.textContent = this._name;
    this._placeImage.alt = this._name;
    this._placeImage.src = this._link;

    this._likeButton = card.querySelector(".element__button");
    this._trashButton = card.querySelector(".element__trash");

    this._setEventListeners();

    return card;
  }
}
