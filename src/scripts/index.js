import { initialCards } from './initialCards.js';
import { Card } from './сard.js';
import { FormValidator } from './validate.js';
import { Popup } from './popup.js';
import { PopupWithImage } from './popupWithImage.js';
import { PopupWithForm } from './popupWithForm.js';
import { UserInfo } from './userInfo.js';
import { Section } from './section.js';
import '../pages/index.css';

const main = document.querySelector('.main')
const profileButton = main.querySelector('.profile__button');
const closeButton = document.querySelector('.popup__closed')
const popupProfile = main.querySelector('.popup_profile');
const profileForm = popupProfile.querySelector('.popup__form_profile');
const nameInput = document.querySelector('.popup__input_name')
const jobInput = document.querySelector('.popup__input_job');
const profileTitle = main.querySelector('.profile__title');
const profileSubtitle = main.querySelector('.profile__subtitle');

const popupCard = document.querySelector('.popup_new-card');
const popupNewCard = document.querySelector('.profile__add-card');
const addCard = popupCard.querySelector('.popup__submit');


const cards = document.querySelector('.elements');
const templateSelector = document.querySelector('#element').content.querySelector('.element')

const popupFormCard = document.querySelector('.popup__form_card');
const imgName = document.querySelector('.popup__input_image');
const imgLink = document.querySelector('.popup__input_link');

const popupOpenImage = document.querySelector('.popup_image-open');
const imgOpenFull = popupOpenImage.querySelector('.image__opened');
const imgOpenFullName = popupOpenImage.querySelector('.image__name');

const popups = document.querySelectorAll('.popup');

const popupOpenImageSelector = '#popup_image-open';
const popupProfileSelector = '#popup_profile'
const popupCardSelector = '#popup_new-card'


//Попап профиля

const userInfo = new UserInfo ({
  userNameSelector: '.profile__title',
  userInfoSelector: '.profile__subtitle'
});
const handleEditProfileFormSubmit = (evt) => {
evt.preventDefault();
userInfo.setUserInfo(nameInput.value, jobInput.value);
EditProfileForm.close();
}

const EditProfileForm = new PopupWithForm (popupProfileSelector, handleEditProfileFormSubmit)
EditProfileForm.setEventListeners();

profileButton.addEventListener('click', () => {
const {name, info} = userInfo.getUserInfo();
nameInput.value = name;
jobInput.value = info;
EditProfileForm.open();
})


//Попап увеличения фото


const popupWithBigImage = new PopupWithImage (popupOpenImageSelector);
popupWithBigImage.setEventListeners();

const handleCardClick = (name, link) => {
  popupWithBigImage.open(name, link);
}


//Попап новой карточки

const renderCard = (item) => {
  const newCard = new Card(item, templateSelector, handleCardClick);
  return newCard.createCard();
}

const handleCardAddFormSubmit = (evt, item) => {
  evt.preventDefault();
  CardsList.addItem(renderCard({name: imgName.value, link: imgLink.value}));
}

const NewCardForm = new PopupWithForm(popupCardSelector, handleCardAddFormSubmit)
NewCardForm.setEventListeners();

popupNewCard.addEventListener('click', function () { 
  addCard.setAttribute('disabled', true)
NewCardForm.open();
}); 

 //добавление всех карточек
const CardsList = new Section({
  items: initialCards, 
  renderer: (item) => { 
     CardsList.addItem(renderCard(item)); 
  },
}, cards) 

CardsList.renderItems();




//Валидация

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

validate();
