//класс создания карточки
export default class Card {
    constructor(cardData, templateSelector, userId, ownerData, handleActions) {
      this._card = cardData;
      this._name = this._card.name;
      this._link = this._card.link;
      this._templateSelector = templateSelector;
      this._cardLikes = []
      
      this._userId = userId;
      this._cardId = ownerData.cardId; 
      this._ownerId = ownerData.ownerId;
      this._handleCardClick = handleActions.handleCardClick;
      this._handleCardDelete = handleActions.handleCardDelete;
      this._handleCardLike = handleActions.handleCardLike;
      this._handleCardDeleteLike = handleActions.handleCardDeleteLike;
      this.renderCardLike = this.renderCardLike.bind(this);
    }

    _getTemplate() {
      const templateElement = document
      .querySelector(this._templateSelector) 
      .content
      .querySelector('.element')
      .cloneNode(true);

    return templateElement;
    }

    renderCardLike(card) {
      console.log(this)
      this._cardLikes = card.likes;
      if (this._cardLikes.length === 0) {
        this.likeSelector.textContent = '0';
      } else {
        this.likeSelector.textContent = this._cardLikes.length;
      }
      if (this._checkLikeCard()) {
        this._like.classList.add("element__button_active");
      } else {
        this._like.classList.remove("element__button_active");
      }
    }
  
    generateCard() {
      this._element = this._getTemplate();
      this._placeImage = this._element.querySelector(".element__image");
      this._placeTitle = this._element.querySelector(".element__title");
      this._like = this._element.querySelector(".element__button");
      this.likeSelector = this._element.querySelector('.element__button-counter');
      this._trash = this._element.querySelector(".element__trash");
      this._placeImage.src = this._link;
      this._placeImage.alt = this._name;
      this._placeTitle.textContent = this._name;
      this.renderCardLike(this._card);
      this._setEventListeners();
  
      return this._element;
    }

    deleteCard() {
      this._element.remove();
      this._element = null;
    }

    _checkLikeCard() {
      return this._cardLikes.find((userLike) => userLike._id === this._userId);
    }

    _setEventListeners() {
      this._like.addEventListener('click', () => {
        this._handleLikeButton();
      });

      this._placeImage.addEventListener('click', () => {
        this._handleCardClick({name: this._name, link: this._link});
      });

      if (this._userId === this._ownerId) {
        this._trash.addEventListener('click', () => {
          this._handleCardDelete(this, this._cardId, this._card);
        })
      } else {
        this._trash.remove()
      }
    }

    _handleLikeButton() {
      if (this._checkLikeCard()) {
        this._handleCardDeleteLike(this._card._id, this.renderCardLike)
      } else {
        this._handleCardLike(this._card._id, this.renderCardLike)
      }
    };
  }

  