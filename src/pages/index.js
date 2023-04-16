import Api from "../components/Api";
import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import Popup from "../components/Popup";
import PopupConfirmation from "../components/PopupConfirmation";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo";
import "./index.css";

const main = document.querySelector(".main");
const profileButton = main.querySelector(".profile__button");
const closeButton = document.querySelector(".popup__closed");
const formEditProfileOp = main.querySelector(".popup_profile");
const profileForm = formEditProfileOp.querySelector(".popup__form_profile");
const nameInput = document.querySelector(".popup__input_name");
const jobInput = document.querySelector(".popup__input_job");
const profileTitle = main.querySelector(".profile__title");
const profileSubtitle = main.querySelector(".profile__subtitle");

const popupCard = document.querySelector(".popup_new-card");
const popupNewCard = document.querySelector(".profile__add-card");
const buttonSubmitAddCard = popupCard.querySelector(".popup__submit");

const buttonEditAvatar = document.querySelector(".profile__avatar-edit");

const cards = document.querySelector(".elements");

const popupFormCard = document.querySelector(".popup__form_card");
const imgName = document.querySelector(".popup__input_image");
const imgLink = document.querySelector(".popup__input_link");

const popupOpenImage = document.querySelector(".popup_image-open");
const imgOpenFull = popupOpenImage.querySelector(".image__opened");
const imgOpenFullName = popupOpenImage.querySelector(".image__name");

const popups = document.querySelectorAll(".popup");

//Селекторы
const templateSelector = document
  .querySelector("#element")
  .content.querySelector(".element");
const popupOpenImageSelector = "#popup_image-open";
const popupProfSelector = "#popup_profile";
const popupCardSelector = "#popup_new-card";
const popupConfirmationSelector = ".popup_confirm";
const popupEditAvatarSelector = ".popup_avatar";

//Api

const apiConfig = {
  link: "https://mesto.nomoreparties.co/v1/cohort-63/",
  headers: {
    authorization: "94aa74ad-5308-499e-afc4-7f416a23dd02",
    "Content-Type": "application/json",
  },
};

const api = new Api(apiConfig);
let userId;

//Сервер

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userProfileData, cardData]) => {
    userId = userProfileData._id;
    userInfo.setUserInfo({
      name: userProfileData.name,
      job: userProfileData.about,
    });
    userInfo.setUserAvatar(userProfileData.avatar);
    cardList.renderItems(cardData.reverse());
  })
  .catch((err) => {
    console.log(`Возникла глобальная ошибка: ${err}`);
  });

//Попап новой карточки

const submitAddCardFormHandle = (data) => {
  formAddCard.setSavingProcessText();
  api
    .addNewCard(data)
    .then((card) => {
      cardList.addItem(createCard(card));
      formAddCard.close();
    })
    .catch((err) => {
      console.log(`При добавлении новой карточки возникла ошибка: ${err}`);
    })
    .finally(() => {
      formAddCard.returnSavingProcessText();
    });
};

const createCard = function (cardData) {
  const card = new Card(
    cardData,
    ".template_element",
    userId,
    { cardId: cardData._id, ownerId: cardData.owner._id },
    {
      handleCardClick: (data) => {
        popupWithImage.open(data);
      },

      handleCardDelete: (cardElement, cardId) => {
        popupConfirmation.open(cardElement, cardId);
      },

      handleCardLike: (_id, renderCardLike) => {
        api
          .sendCardLike(_id)
          .then((res) => {
            renderCardLike(res);
          })
          .catch((err) => {
            console.log(`При лайке карточки возникла ошибка: ${err}`);
          });
      },

      handleCardDeleteLike: (_id, renderCardLike) => {
        api
          .deleteCardLike(_id)
          .then((res) => {
            renderCardLike(res);
          })
          .catch((err) => {
            console.log(`При дизлайке карточки возникла ошибка: ${err}`);
          });
      },
    }
  ).generateCard();
  return card;
};

const formAddCard = new PopupWithForm(
  popupCardSelector,
  submitAddCardFormHandle
);
formAddCard.setEventListeners();

popupNewCard.addEventListener("click", function () {
  formAddCard.open();
});

//Инфо профиля и аватара

const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
  avatarSelector: ".profile__avatar-img",
});

//Попап профиля

const submitEditProfileFormHandle = () => {
  formEditProfile.setSavingProcessText();
  api
    .sendUserData({ name: nameInput.value, job: jobInput.value })
    .then((res) => {
      userInfo.setUserInfo({ name: res.name, job: res.about });
      formEditProfile.close();
    })
    .catch((err) => {
      console.log(`При редактировании профиля произошла ошибка: ${err}`);
    })
    .finally(() => {
      formEditProfile.returnSavingProcessText();
    });
};

const formEditProfile = new PopupWithForm(
  popupProfSelector,
  submitEditProfileFormHandle
);
formEditProfile.setEventListeners();

profileButton.addEventListener("click", function () {
  const { name, job } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  formEditProfile.open();
});

//Попап Аватара

const submitEditAvatarFormHandle = (userProfileData) => {
  formEditAvatar.setSavingProcessText();
  api
    .sendAvatarData(userProfileData)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      formEditAvatar.close();
    })
    .catch((err) => {
      console.log(`Ошибка обновления аватара: ${err}`);
    })
    .finally(() => {
      formEditAvatar.returnSavingProcessText();
    });
};

const formEditAvatar = new PopupWithForm(
  popupEditAvatarSelector,
  submitEditAvatarFormHandle
);
formEditAvatar.setEventListeners();

buttonEditAvatar.addEventListener("click", function () {
  formEditAvatar.open();
});

//Попап подтверждения

const callbackConfirmation = (cardElement, cardId) => {
  popupConfirmation.setDeletingProcessText();
  api
    .deleteCard(cardId, cardElement)
    .then(() => {
      cardElement.deleteCard();
      popupConfirmation.close();
    })
    .catch((err) => {
      console.log(`Ошибка при удалении карточки: ${err}`);
    })
    .finally(() => {
      popupConfirmation.returnDeletingProcessText();
    });
};

const popupConfirmation = new PopupConfirmation(
  popupConfirmationSelector,
  callbackConfirmation
);
popupConfirmation.setEventListeners();

//Попап открытия картинки

const popupWithImage = new PopupWithImage(popupOpenImageSelector);
popupWithImage.setEventListeners();

//Добавление карточек

const cardList = new Section(
  {
    renderer: (item) => {
      const card = createCard(item);
      cardList.addItem(card);
    },
  },
  ".elements"
);

//валидация
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
