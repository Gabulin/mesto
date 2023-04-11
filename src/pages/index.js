import { initialCards } from "../utils/initialCards.js";
import { Card } from "../components/сard.js";
import { FormValidator } from "../components/formValidator.js";
import { Popup } from "../components/popup.js";
import { PopupWithImage } from "../components/popupWithImage.js";
import { PopupWithForm } from "../components/popupWithForm.js";
import { UserInfo } from "../components/userInfo.js";
import { Section } from "../components/section.js";
import "./index.css";

const main = document.querySelector(".main");
const profileButton = main.querySelector(".profile__button");
const closeButton = document.querySelector(".popup__closed");
const popupProfile = main.querySelector(".popup_profile");
const profileForm = popupProfile.querySelector(".popup__form_profile");
const nameInput = document.querySelector(".popup__input_name");
const jobInput = document.querySelector(".popup__input_job");
const profileTitle = main.querySelector(".profile__title");
const profileSubtitle = main.querySelector(".profile__subtitle");

const popupCard = document.querySelector(".popup_new-card");
const popupNewCard = document.querySelector(".profile__add-card");
const buttonSubmitAddCard = popupCard.querySelector(".popup__submit");

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
const popupProfileSelector = "#popup_profile";
const popupCardSelector = "#popup_new-card";

//Попап профиля

const userInfo = new UserInfo({
  userNameSelector: ".profile__title",
  userInfoSelector: ".profile__subtitle",
});


const formEditProfile = new PopupWithForm(
  popupProfileSelector, {
    handleFormSubmit: (data) => {
      userInfo.setUserInfo(data);
      formEditProfile.close();
    }
  }
);
formEditProfile.setEventListeners();

profileButton.addEventListener("click", () => {
  const { name, info } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = info;
  formEditProfile.open();
});

//Попап увеличения фото

const popupWithBigImage = new PopupWithImage(popupOpenImageSelector);
popupWithBigImage.setEventListeners();

const handleCardClick = (name, link) => {
  popupWithBigImage.open(name, link);
};

//Попап новой карточки

const renderCard = (item) => {
  const newCard = new Card(item, templateSelector, handleCardClick);
  return newCard.createCard();
};


const formAddCard = new PopupWithForm(
  popupCardSelector, {
    handleFormSubmit: (data) => {
      cardsList.addItem(renderCard({
        name: data.name,
        link: data.link,
        alt: data.name
      }))
      formAddCard.close();  
  }
}
);
formAddCard.setEventListeners();

popupNewCard.addEventListener("click", function () {
  formAddCard.open();
});

//добавление всех карточек
const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardsList.addItem(renderCard(item));
    },
  },
  cards
);

cardsList.renderItems();

//Валидация

function validate() {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach(function (formElement) {
    const formValidator = new FormValidator(
      {
        inputSelector: ".popup__input",
        submitButtonSelector: ".popup__submit",
        inactiveButtonClass: "popup__submit_disabled",
        inputErrorClass: "input__error",
        errorClass: "popup__input-error_active",
      },
      formElement
    );
    formValidator.enableValidation();
  });
}

validate();
