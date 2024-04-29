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
import { data } from "autoprefixer";

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

// работа с запросами
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
  setDataCards(cards);
  setUserData(userData);
})
.catch(catchError);

function setDataCards(data) {
  data.forEach((item) => {
    cardList.append(createCard(item, removeCard, likeCard, openImagePopup));
  });
}
function setUserData(data) {
  profileName.textContent = data.name;
  profileJob.textContent = data.about;
  avatarImage.style.backgroundImage = `url(${data.avatar})`;
}

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

function openImagePopup(imageSrc, name) {
  imagePopupImage.src = imageSrc;
  imagePopupCaption.textContent = name;
  imagePopupImage.alt = name;

  openPopup(profileImagePopup, POPUP_IS_OPENED);
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

  editProfileData();

  closePopup(profileEditPopup, POPUP_IS_OPENED);
}
function renderCard(evt) {
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
  renderCard(evt);

  formElementAddNewCard.reset();

  closePopup(profileAddPopup, POPUP_IS_OPENED);
});

formElementEditProfile.addEventListener("submit", handleFormEditProfileSubmit);
