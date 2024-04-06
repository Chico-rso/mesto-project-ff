import "../../pages/index.css";

import { initialCards } from "./cards.js";
import { createCard, removeCard, likeCard} from "./card.js";
import { openPopup, closePopup } from "./modals.js";

const cardList = document.querySelector(".places__list");

const profileEditPopup = document.querySelector(".popup_type_edit");
const profileAddPopup = document.querySelector(".popup_type_new-card");
const profileImagePopup = document.querySelector(".popup_type_image");

const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const buttonOpenPopupAddNewCard = document.querySelector(".profile__add-button");

const formElementAddNewCard = document.querySelector('[name="new-place"]');
const formElementEditProfile = document.querySelector('[name="edit-profile"]');

const nameInput = formElementEditProfile.querySelector(".popup__input_type_name");
const jobInput = formElementEditProfile.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

const newCardName = document.querySelector(".popup__input_type_card-name");
const inputNameFormCard = document.querySelector(".popup__input_type_url");

const avatar = new URL("../../images/avatar.jpg", import.meta.url);
const avatarObject = {
  link: avatar,
};

const avatarImage = document.querySelector(".profile__image");
avatarImage.style.backgroundImage = `url(${avatarObject.link})`;

buttonOpenPopupProfile.addEventListener("click", () => {
  openPopup(profileEditPopup, "popup_is-opened");
  updatePopupValue();
});

buttonOpenPopupAddNewCard.addEventListener("click", () => {
  openPopup(profileAddPopup, "popup_is-opened");
});

function openImagePopup(imageSrc, link) {
  const imagePopupImage = document.querySelector(".popup__image");
  const imagePopupCaption = document.querySelector(".popup__caption");

  imagePopupImage.src = imageSrc;
  imagePopupCaption.textContent = link;
  openPopup(profileImagePopup, "popup_is-opened");
}
function updatePopupValue() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
function handleFormEditProfileSubmit(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  profileJob.textContent = job;
  profileName.textContent = name;

  closePopup(profileEditPopup, "popup_is-opened");
}
function renderCard(
  evt,
  cardList,
  removeCard,
  likeCard,
  openImagePopup
) {
  evt.preventDefault();

  const dataNewCard = {
    name: newCardName.value,
    link: inputNameFormCard.value,
  };
  cardList.prepend(
    createCard(dataNewCard, removeCard, likeCard, openImagePopup)
  );
}

formElementAddNewCard.addEventListener("submit", (evt) => {
  renderCard(evt, cardList, removeCard, likeCard, openImagePopup);

  formElementAddNewCard.reset();

  closePopup(profileAddPopup, "popup_is-opened");
});

formElementEditProfile.addEventListener("submit", handleFormEditProfileSubmit);

initialCards.forEach((item) => {
  cardList.append(createCard(item, removeCard, likeCard, openImagePopup));
});
