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
  document.addEventListener('keydown', closeByEscape);
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


function handleFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value
  profileSubtitle.textContent = jobInput.value

  closePopup(popupProfile)
}
profileForm.addEventListener('submit', handleFormSubmit);

const popupCard = document.querySelector('.popup_new-card');
const popupNewCard = document.querySelector('.profile__add-card');
const addCard = popupCard.querySelector('.popup__submit');


popupNewCard.addEventListener('click', () => {
  openPopup(popupCard);
});


addCard.addEventListener('click', () => {
  closePopup(popupCard);
});

const cards = document.querySelector('.elements');

//Создание карточки
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

const popupFormCard = document.querySelector('.popup__form_card');
const imgName = document.getElementById('input__image');
const imgLink = document.getElementById('input__link');

//Стандартные карточки
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


initialCards.forEach(function (element) {
  const newCard = addNewCard(element.name, element.link);
  addDomCard(newCard, cards);
});

function addDomCard(card, cards) {
  cards.prepend(card);
}

function submitCardForm(evt) {
  evt.preventDefault();
  const newCard = addNewCard(imgName.value, imgLink.value);
  addDomCard(newCard, cards);
  closePopup(popupCard);
  evt.target.reset();

}



popupFormCard.addEventListener('submit', submitCardForm);

const popupOpenImage = document.querySelector('.popup_image-open');
const imgOpenFull = popupOpenImage.querySelector('.image__opened');
const imgOpenFullName = popupOpenImage.querySelector('.image__name');


// Закрытие по кнопке ESC
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup)
  }
};

const popups = document.querySelectorAll('.popup')

// Спасибо за подсказку объединения крестика и оверлея

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
