import "../../pages/index.css";

import { createCard, removeCard, likeCard} from "./card.js";
import { openPopup, closePopup } from "./modals.js";
import {
  validationConfig,
  showInputError,
  hideInputError,
  enableValidation,
  clearValidation,
} from "../components/validation.js";
import { apiRequest, catchError } from "../components/api.js";

/**
 * Constant representing the class name for an opened popup.
 * @constant {string}
 */
const POPUP_IS_OPENED = 'popup_is-opened';

const cardList = document.querySelector(".places__list");
const profileEditPopup = document.querySelector(".popup_type_edit");
const profileAddPopup = document.querySelector(".popup_type_new-card");
const profileAvatarPopup = document.querySelector('.popup_type_avatar');
const profileImagePopup = document.querySelector(".popup_type_image");
const imagePopupImage = document.querySelector(".popup__image");
const imagePopupCaption = document.querySelector(".popup__caption");

const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const buttonOpenPopupAddNewCard = document.querySelector(".profile__add-button");
const buttonOpenPopupAvatar = document.querySelector('.profile__image');

const formElementAddNewCard = document.querySelector('[name="new-place"]');
const formElementEditProfile = document.querySelector('[name="edit-profile"]');
const formElementAvatar = document.querySelector('[name="avatar"]');

const nameInput = formElementEditProfile.querySelector(".popup__input_type_name");
const jobInput = formElementEditProfile.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

const newCardName = document.querySelector(".popup__input_type_card-name");
const inputNameFormCard = document.querySelector(".popup__input_type_url");

const avatarImage = document.querySelector(".profile__image");


enableValidation(validationConfig);

Promise.all([
  apiRequest({
    url: "cards",
    method: "GET",
  }),

  apiRequest({
    url: "users/me",
    method: "GET",
  }),
])
.then(([cards, userData]) => {
  setDataCards(cards, userData._id);
  setUserData(userData);
})
.catch(catchError);

/**
 * Sets the data for the cards.
 * @param {Array} data - The array of card data.
 */
function setDataCards(data, ownerId) {
  console.log(ownerId);
  data.forEach((item) => {
    cardList.append(createCard(item, removeCard, likeCard, openImagePopup, ownerId));
  });
}

/**
 * Sets the user data.
 * @param {Object} data - The user data.
 */
function setUserData(data) {
  profileName.textContent = data.name;
  profileJob.textContent = data.about;
  avatarImage.style.backgroundImage = `url(${data.avatar})`;
}

/**
 * Edits the profile data.
 */
function editProfileData()
{
  apiRequest({
    url: "users/me",
    method: "PATCH",
    body: {
      name: nameInput.value,
      about: jobInput.value,
    },
  }).then((data) => {
    setUserData(data);
  })
}

/**
 * Add new card
 * @param {Object} data - The card data.
 */
function addNewCard(data) {
  apiRequest({
    url: "cards",
    method: "POST",
    body: {
      name: data.name,
      link: data.link,
    },
  }).then((data) => {
    cardList.prepend(createCard(data, removeCard, likeCard, openImagePopup));
  })
}

buttonOpenPopupProfile.addEventListener("click", () => {
  openPopup(profileEditPopup, POPUP_IS_OPENED);
  updatePopupValue();
  clearValidation(formElementEditProfile, validationConfig);
});

buttonOpenPopupAddNewCard.addEventListener("click", () => {
  openPopup(profileAddPopup, POPUP_IS_OPENED);
  clearValidation(formElementAddNewCard, validationConfig);
});

buttonOpenPopupAvatar.addEventListener('click', () => {
  openPopup(profileAvatarPopup, POPUP_IS_OPENED)
  clearValidation(formElementAvatar, validationConfig);
})

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closePopup(popup, POPUP_IS_OPENED);
    }
  });
});
document.querySelectorAll(".popup__close").forEach((button) => {
  button.addEventListener("click", (event) => {
    const popup = event.target.closest(".popup");
    closePopup(popup, POPUP_IS_OPENED);
  });
});

/**
 * Opens the image popup.
 * @param {string} imageSrc - The source of the image.
 * @param {string} name - The name of the image.
 */
function openImagePopup(imageSrc, name) {
  imagePopupImage.src = imageSrc;
  imagePopupCaption.textContent = name;
  imagePopupImage.alt = name;

  openPopup(profileImagePopup, POPUP_IS_OPENED);
}

/**
 * Updates the values in the profile edit popup.
 */
function updatePopupValue() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

/**
 * Handles the form submit event for editing the profile.
 * @param {Event} evt - The form submit event.
 */
function handleFormEditProfileSubmit(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  profileJob.textContent = job;
  profileName.textContent = name;

  editProfileData();

  closePopup(profileEditPopup, POPUP_IS_OPENED);
}

/**
 * Renders a new card.
 * @param {Event} evt - The form submit event.
 */
function renderCard(evt) {
  evt.preventDefault();

  const dataNewCard = {
    name: newCardName.value,
    link: inputNameFormCard.value,
  };
  addNewCard(dataNewCard);
}

formElementAddNewCard.addEventListener("submit", (evt) => {
  renderCard(evt);

  formElementAddNewCard.reset();

  closePopup(profileAddPopup, POPUP_IS_OPENED);
});

formElementEditProfile.addEventListener("submit", handleFormEditProfileSubmit);
