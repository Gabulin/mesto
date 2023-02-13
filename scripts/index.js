const major = document.querySelector('.major')
const popup = major.querySelector('.popup');
const profileButton = major.querySelector('.profile__button');
const closePopupBtn = major.querySelector('.popup__closed');
const formPopup = popup.querySelector('.popup__form');
const nameInput = document.getElementById('input__name');
const jobInput = document.getElementById('input__job');
const profileTitle = major.querySelector('.profile__title');
const profileSubtitle = major.querySelector('.profile__subtitle');

function openPopup(){
    popup.classList.add('popup_opened')
    nameInput.value = profileTitle.textContent 
    jobInput.value = profileSubtitle.textContent 
}
profileButton.addEventListener('click', openPopup);

function closePopup() {
    popup.classList.remove('popup_opened')
};

closePopupBtn.addEventListener('click', closePopup);

function handleFormSubmit(evt) {
    evt.preventDefault(); 

    profileTitle.textContent = nameInput.value 
    profileSubtitle.textContent = jobInput.value 

    closePopup()   
}
formPopup.addEventListener('submit', handleFormSubmit);

