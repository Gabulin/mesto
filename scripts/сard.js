export class Card {

    constructor(cardData, templateSelector) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._templateSelector = templateSelector;
        this._popup = document.querySelector('.popup_image-open');
        this._popupImage = this._popup.querySelector('.image__opened');
        this._popupSubtitle = this._popup.querySelector('.image__name');
    }

    _like(evt) {
        evt.target.classList.toggle('element__button_active');
    }

    _remove(evt) {
        const placeItem = evt.target.closest('.element');
        placeItem.remove();
    }

    createCard(openPopup) {
        const cardTemplate = document.querySelector('#element').content;

        const card = cardTemplate.querySelector('.element').cloneNode(true);
        const placeImage = card.querySelector('.element__image');
        const placeTitle = card.querySelector('.element__title');
        placeTitle.textContent = this._name;
        placeImage.alt = this._name;
        placeImage.src = this._link;

        const likeButton = card.querySelector('.element__button');
        const trashButton = card.querySelector('.element__trash');

        likeButton.addEventListener('click', this._like);
        trashButton.addEventListener('click', this._remove);
        placeImage.addEventListener('click', () => {
            this._popupImage.src = this._link;
            this._popupImage.alt - this._name;
            this._popupSubtitle.textContent = this._name;
            openPopup(this._popup);
        });

        return card;
    }


}
