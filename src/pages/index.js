import Api from "../components/api";
import Card from "../components/Card";
import FormValidator from "../components/formValidator";
import Popup from "../components/popup";
import PopupConfirmation from "../components/PopupConfirmation";
import PopupWithForm from "../components/popupWithForm";
import PopupWithImage from "../components/popupWithImage";
import Section from "../components/section";
import UserInfo from "../components/userInfo";
import "./index.css"

const main = document.querySelector(".main");
const profileButton = main.querySelector(".profile__button");
const closeButton = document.querySelector(".popup__closed");
const popupProfileOp = main.querySelector(".popup_profile");
const profileForm = popupProfileOp.querySelector(".popup__form_profile");
const nameInput = document.querySelector(".popup__input_name");
const jobInput = document.querySelector(".popup__input_job");
const profileTitle = main.querySelector(".profile__title");
const profileSubtitle = main.querySelector(".profile__subtitle");

const popupCard = document.querySelector(".popup_new-card");
const popupNewCard = document.querySelector(".profile__add-card");
const buttonSubmitAddCard = popupCard.querySelector(".popup__submit");

const buttonEditAvatar = document.querySelector(".profile__avatar-edit");

const cards = document.querySelector(".elements");
const templateSelector = document
  .querySelector("#element")
  .content.querySelector(".element");

const popupFormCard = document.querySelector(".popup__form_card");
const imgName = document.querySelector(".popup__input_image");
const imgLink = document.querySelector(".popup__input_link");

const popupOpenImage = document.querySelector(".popup_image-open");
const imgOpenFull = popupOpenImage.querySelector(".image__opened");
const imgOpenFullName = popupOpenImage.querySelector(".image__name");

const popups = document.querySelectorAll(".popup");

const popupOpenImageSelector = "#popup_image-open";
const popupProfileOpSelector = "#popup_profile";
const popupCardSelector = "#popup_new-card";
const popupConfirmationSelector = ".popup__confirm"
const popupEditAvatarSelector = ".popup__avatar"

const apiData = {
  link: 'https://mesto.nomoreparties.co/v1/cohort-63/',
  headers: {
    authorization: '94aa74ad-5308-499e-afc4-7f416a23dd02',
    'Content-Type': 'application/json'
  }
}

const options = {
  formSelector: '.popup__form',
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "input__error",
  errorClass: "popup__input-error_active",
};

const api = new Api(apiData);
let userId;

//добавление карточки в секцию
const submitAddCardFormHandler = (data) => {
  popupWithFormAddCard.setSavingProcessText();
  api.addNewCard(data)
  .then((card) => {
    cardList.addItem(createCard(card));
    popupWithFormAddCard.close();
  })
  .catch((err) => {
    console.log(`При добавлении новой карточки возникла ошибка: ${err}`)
  })
  .finally(() => {
    popupWithFormAddCard.returnSavingProcessText();
  })
}

const submitEditProfileFormHandler = (userProfileData) => {
  popupProfile.setSavingProcessText();
  api.sendUserData(userProfileData)
  .then(res => {
    userInfo.setUserInfo({name: res.name, job: res.job});
    popupProfile.close();
  })
  .catch((err) => {
    console.log(`При редактировании профиля произошла ошибка: ${err}`)
  })
  .finally(() => {
    popupProfile.returnSavingProcessText()
  })
}

const submitEditAvatarFormHandler = (userProfileData) => {
  popupWithEditAvatar.setSavingProcessText();
  api.sendAvatarData(userProfileData)
  .then((res) => {
    userInfo.setUserAvatar(res.avatar);
    popupWithEditAvatar.close();
    })
    .catch(err => {
      console.log(`Ошибка обновления аватара: ${err}`)
   })
   .finally(() => {
     popupWithEditAvatar.returnSavingProcessText();
   })
  }

const callbackConfirmation = (cardElement, cardId) => {
  api.deleteCard(cardId, cardElement)
  .then(() => {
    cardElement.deleteCard();
    popupConfirmation.close();
  })
  .catch((err) => {
    console.log(`Ошибка при удалении карточки: ${err}`)
  })
}


const popupProfile = new PopupWithForm(popupProfileOpSelector, submitEditProfileFormHandler);
popupProfile.setEventListeners();
const popupWithImage = new PopupWithImage(popupOpenImageSelector);
popupWithImage.setEventListeners();
const popupWithFormAddCard = new PopupWithForm(popupCardSelector, submitAddCardFormHandler);
popupWithFormAddCard.setEventListeners();
const userInfo = new UserInfo({
  titleSelector: '.profile__title', 
  jobSelector: '.profile__subtitle', 
  avatarSelector: '.profile__avatar'});
const popupWithEditAvatar = new PopupWithForm(popupEditAvatarSelector, submitEditAvatarFormHandler);
popupWithEditAvatar.setEventListeners();
const popupConfirmation = new PopupConfirmation(popupConfirmationSelector, callbackConfirmation);
popupConfirmation.setEventListeners();

const cardList = new Section({renderer: (item) => {
  const card = createCard(item);
  cardList.addItem(card)}
    }, '.elements');

Promise.all([ api.getUserData(), api.getInitialCards() ])
  .then(([ userProfileData, cardObject ]) => {
    userId = userProfileData._id;
    userInfo.setUserInfo({ name: userProfileData.name, job: userProfileData.about });
    userInfo.setUserAvatar(userProfileData.avatar);
    cardList.renderItems(cardObject.reverse());
  })
  .catch((err) => { console.log(`Возникла глобальная ошибка: ${err}`) })

//валидация
const formValidators = {};
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

enableValidation(options);

//слушатели
profileButton.addEventListener('click', function() {
  formValidators['edit-form'].resetValidation();
  popupProfile.setInputValues(userInfo.getUserInfo());
  popupProfile.open()});
  popupNewCard.addEventListener('click', function () {
  formValidators['add-form'].resetValidation();
  popupWithFormAddCard.open()});
buttonEditAvatar.addEventListener('click', function () {
  popupWithEditAvatar.open();
  formValidators['avatar-edit-form'].resetValidation();
})

//функция создания новой карточки
const createCard = function (cardObject) {
  const card = new Card (
    cardObject, 
    '.template_element',
    userId,
    {cardId: cardObject._id, ownerId: cardObject.owner._id, }, {
    handleCardClick: (data) => {
      popupWithImage.open(data)},

    handleCardDelete: (cardElement, cardId) => {
      popupConfirmation.open(cardElement, cardId)},

    handleCardLike: (_id, renderCardLike) => {
      api.sendCardLike(_id)
      .then((res) => {
        renderCardLike(res);
      })
      .catch((err) => {
        console.log(`При лайке карточки возникла ошибка: ${err}`)
      })
    },

    handleCardDeleteLike: (_id, renderCardLike) => {
      api.deleteCardLike(_id)
       .then((res) => {
        renderCardLike(res);
       })
       .catch((err) => {
        console.log(`При дизлайке карточки возникла ошибка: ${err}`)
       })
    },
  }).generateCard();
  return card;
}