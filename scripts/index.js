const main = document.querySelector('.main')
const popup = main.querySelector('.popup');
const profileButton = main.querySelector('.profile__button');
const popupProfile = main.querySelector('.popup_profile');
const closePopupBtn = popupProfile.querySelector('.popup__closed');
const formPopup = popup.querySelector('.popup__form');
const nameInput = document.getElementById('input__name');
const jobInput = document.getElementById('input__job');
const profileTitle = main.querySelector('.profile__title');
const profileSubtitle = main.querySelector('.profile__subtitle');


 

function openPopup(popup){
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened')
};

function profileInfo() {
    nameInput.value = profileTitle.textContent 
    jobInput.value = profileSubtitle.textContent 
}

function openPopupProfile() {
    openPopup(popup);
    profileInfo();
}

profileButton.addEventListener('click', () => 
openPopupProfile(popupProfile));


closePopupBtn.addEventListener('click', () =>
closePopup(popupProfile));

function handleFormSubmit(evt) {
    evt.preventDefault(); 

    profileTitle.textContent = nameInput.value 
    profileSubtitle.textContent = jobInput.value 

    closePopup(popupProfile)   
}
formPopup.addEventListener('submit', handleFormSubmit);

const popupCard = document.querySelector('.popup_new-card');
const popupNewCard = document.querySelector('.profile__add-card');
const addCard = popupCard.querySelector('.popup__submit');
const closeCard = popupCard.querySelector('.popup__closed');

popupNewCard.addEventListener('click', () => {
    openPopup(popupCard);
});

closeCard.addEventListener('click', () => {
    closePopup(popupCard);
});

addCard.addEventListener('click', () => {
    closePopup(popupCard);
});

const cards = document.querySelector('.elements');

function addNewCard(name, link) {
    const cardTemplate = document.querySelector('#element').content;

    const card = cardTemplate.querySelector('.element').cloneNode(true);
    const cardImage = card.querySelector('.element__image');
    const cardTitle = card.querySelector('.element__title');
    const cardTrash = card.querySelector('.element__trash');
    const cardLike = card.querySelector('.element__button');
    const trash = card.querySelector('.element__trash');
    const like = card.querySelector('.element__button');
    
    cardTitle.textContent = name;
    cardImage.src = link;

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
    });

    return card;
}

const popupFormCard = document.querySelector('.popup__form_card');
const imgName = document.getElementById('input__image');
const imgLink = document.getElementById('input__link');



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


  initialCards.forEach(function(element){
    const newCard = addNewCard(element.name, element.link); 
    openCard(newCard, cards);
  });

  function openCard(card, cards) {
    cards.prepend(card);
  }

function submitCardForm(evt) {
  evt.preventDefault(); 
    const newCard = addNewCard(imgName.value, imgLink.value);
    openCard(newCard, cards);
    closePopup(popupCard);
    evt.target.reset();

}



popupFormCard.addEventListener('submit', submitCardForm);

const popupOpenImage = document.querySelector('.popup_image-open');
const closeImageBtn = popupOpenImage.querySelector('.popup__closed');
const imgOpenFull = popupOpenImage.querySelector('.image__opened');
const imgOpenFullName = popupOpenImage.querySelector('.image__name');

closeImageBtn.addEventListener('click', () => {
  closePopup(popupOpenImage);
});
