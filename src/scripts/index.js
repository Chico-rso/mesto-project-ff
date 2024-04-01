import '../pages/index.css';

import { initialCards } from './cards.js';
import { createCard, removeCard } from './card.js';
import { openPopup, closePopup } from './modals.js';

const cardList = document.querySelector('.places__list');
const avatar = new URL('../images/avatar.jpg', import.meta.url);
const profileEditPopup = document.querySelector('.popup_type_edit');
const profileAddPopup = document.querySelector('.popup_type_new-card');
const profileImagePopup = document.querySelector('.popup_type_image');
const content = document.querySelector('.page__content');


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
  }
  if(target.classList.contains('profile__add-button'))
  {
    openPopup(profileAddPopup, 'popup_is-opened')
  }
  if(target.classList.contains('card__image'))
  {
    openPopup(profileImagePopup, 'popup_is-opened')
  }
})


initialCards.forEach((item) =>
{
  cardList.append(createCard(item, removeCard));
})