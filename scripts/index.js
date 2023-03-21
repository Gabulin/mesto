import { initialCards } from './initialCards.js';
import { Card } from './сard.js';
import { FormValidator } from './validate.js';

const main = document.querySelector('.main')
const profileButton = main.querySelector('.profile__button');
const popupProfile = main.querySelector('.popup_profile');
const profileForm = popupProfile.querySelector('.popup__form_profile');
const nameInput = document.querySelector('.popup__input_name')
const jobInput = document.querySelector('.popup__input_job');
const profileTitle = main.querySelector('.profile__title');
const profileSubtitle = main.querySelector('.profile__subtitle');



//Открытие и закрытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

export {openPopup}

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
const templateSelector = document.querySelector('#element').content.querySelector('.element')

const popupFormCard = document.querySelector('.popup__form_card');
const imgName = document.querySelector('.popup__input_image');
const imgLink = document.querySelector('.popup__input_link');


function addInitialCards() {
  initialCards.forEach(cardData => {
    cards.prepend(renderCard(cardData));
  });
}

addInitialCards();;

function renderCard(card) {
  const newCard = new Card(card, templateSelector, '.element');
  return newCard.createCard();
}

function addDomCard(cardData) {
  const newCard = renderCard(cardData);
  cards.prepend(newCard);
}


function submitCardForm(evt) {
  evt.preventDefault();
  const newCard = { name: imgName.value, link: imgLink.value};
  renderCard(newCard);
  addDomCard(newCard);
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
