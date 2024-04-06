import '../../pages/index.css';

import { initialCards } from './cards.js';
import { createCard, removeCard, likeCard, createNewCard } from './card.js';
import { openPopup, closePopup, updatePopupValue } from './modals.js';

const cardList = document.querySelector('.places__list');
const profileEditPopup = document.querySelector('.popup_type_edit');
const profileAddPopup = document.querySelector('.popup_type_new-card');
const profileImagePopup = document.querySelector('.popup_type_image');
const formAddNewCard = document.querySelector('[name="new-place"]');
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const buttonOpenPopupAddNewCard = document.querySelector('.profile__add-button');


const avatar = new URL('../../images/avatar.jpg', import.meta.url);
const avatarObject = {
  link: avatar
};

const avatarImage = document.querySelector('.profile__image');
avatarImage.style.backgroundImage = `url(${avatarObject.link})`

buttonOpenPopupProfile.addEventListener('click', () => {
  openPopup(profileEditPopup, 'popup_is-opened');
  updatePopupValue();
});

buttonOpenPopupAddNewCard.addEventListener('click', () => {
  openPopup(profileAddPopup, 'popup_is-opened');
})

function openImagePopup(imageSrc, imageAlt)
{
  const popupImage = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');

  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;
  popupCaption.textContent = imageAlt;
  openPopup(profileImagePopup, 'popup_is-opened')
}

formAddNewCard.addEventListener('submit', (evt) => {
  createNewCard(evt, cardList, removeCard, likeCard, openImagePopup)

  formAddNewCard.reset();

  const popupOpen = document.querySelector('.popup_is-opened');
  closePopup(popupOpen, 'popup_is-opened')
})

initialCards.forEach((item) =>
{
  cardList.append(createCard(item, removeCard, likeCard, openImagePopup));
})