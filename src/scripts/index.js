import '../pages/index.css';

import { initialCards } from './components/cards.js';
import { createCard, removeCard, likeCard, createNewCard } from './components/card.js';
import { openPopup, closePopup, updatePopupValue, openImagePopup } from './components/modals.js';

const cardList = document.querySelector('.places__list');
const profileEditPopup = document.querySelector('.popup_type_edit');
const profileAddPopup = document.querySelector('.popup_type_new-card');
const profileImagePopup = document.querySelector('.popup_type_image');
const content = document.querySelector('.page__content');
const formAddNewCard = document.querySelector('[name="new-place"]');


const avatar = new URL('../images/avatar.jpg', import.meta.url);
const avatarObject = {
  link: avatar
};

const avatarImage = document.querySelector('.profile__image');
avatarImage.style.backgroundImage = `url(${avatarObject.link})`

content.addEventListener('click', (evt) => {
  let target = evt.target;

  if(target.classList.contains('profile__edit-button'))
  {
    openPopup(profileEditPopup, 'popup_is-opened');
    updatePopupValue();
  }
  if(target.classList.contains('profile__add-button'))
  {
    openPopup(profileAddPopup, 'popup_is-opened')
  }
  if(target.classList.contains('card__image'))
  {
    openPopup(profileImagePopup, 'popup_is-opened')
  }

  if(target.classList.contains('popup__close') || target.classList.contains('popup_is-opened'))
  {
    const popupOpen = content.querySelector('.popup_is-opened');
    closePopup(popupOpen, 'popup_is-opened')
  }
})

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