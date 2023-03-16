import { initialCards } from './initialCards.js';
import { Card } from './сard.js';
import { FormValidator } from './validate.js';

const main = document.querySelector('.main')
const profileButton = main.querySelector('.profile__button');
const popupProfile = main.querySelector('.popup_profile');
const profileForm = popupProfile.querySelector('.popup__form_profile');
const nameInput = document.getElementById('input__name');
const jobInput = document.getElementById('input__job');
const profileTitle = main.querySelector('.profile__title');
const profileSubtitle = main.querySelector('.profile__subtitle');



//Открытие и закрытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
};

function fillProfileInputs() {
  nameInput.value = profileTitle.textContent
  jobInput.value = profileSubtitle.textContent
}

function openPopupProfile() {
  openPopup(popupProfile);
  fillProfileInputs();
}

profileButton.addEventListener('click', () => openPopupProfile(popupProfile));


function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value
  profileSubtitle.textContent = jobInput.value

  closePopup(popupProfile)
}
profileForm.addEventListener('submit', handleProfileFormSubmit);

const popupCard = document.querySelector('.popup_new-card');
const popupNewCard = document.querySelector('.profile__add-card');
const addCard = popupCard.querySelector('.popup__submit');


popupNewCard.addEventListener('click', () => {
  openPopup(popupCard);
});

const cards = document.querySelector('.elements');

//Код создания карточки оставлен про запас, после сдачи проекта будет удалён
/*
function addNewCard(name, link) {
  const cardTemplate = document.querySelector('#element').content;

  const card = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = card.querySelector('.element__image');
  const cardTitle = card.querySelector('.element__title');
  const trash = card.querySelector('.element__trash');
  const like = card.querySelector('.element__button');

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  trash.addEventListener('click', () => {
    card.remove();
  });
  like.addEventListener('click', () => {
    like.classList.toggle('element__button_active');
  });

  cardImage.addEventListener('click', () => {
    openPopup(popupOpenImage);
    imgOpenFull.src = link;
    imgOpenFullName.textContent = name;
    imgOpenFull.alt = name;
  });

  return card;
}
*/

const popupFormCard = document.querySelector('.popup__form_card');
const imgName = document.getElementById('input__image');
const imgLink = document.getElementById('input__link');

//Стандартные карточки



initialCards.forEach(function (card) {
  renderCard(card);
}); 

function renderCard(card) {
  const newCard = new Card(card, '.element');
  const node = newCard.createCard(openPopup);
  cards.prepend(node);
}


function submitCardForm(evt) {
  evt.preventDefault();
  const newCard = { name: imgName.value, link: imgLink.value};
  renderCard(newCard);
  closePopup(popupCard);
  imgName.value = '';
  imgLink.value = '';
  evt.target.reset();

}

function validate() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach(function (formElement) {
    const formValidator = new FormValidator({
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__submit',
      inactiveButtonClass: 'popup__submit_disabled',
      inputErrorClass: 'input__error',
      errorClass: 'popup__input-error_active'
    }, formElement);
    formValidator.enableValidation();
  });
}

popupFormCard.addEventListener('submit', submitCardForm);

const popupOpenImage = document.querySelector('.popup_image-open');
const imgOpenFull = popupOpenImage.querySelector('.image__opened');
const imgOpenFullName = popupOpenImage.querySelector('.image__name');

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup)
  }
};

const popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__closed')) {
          closePopup(popup)
        }
    })
})

validate();
