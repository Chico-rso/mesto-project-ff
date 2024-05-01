import { removeMyCard, likeCardApi } from "../components/api.js";

export function createCard({link, name, _id, likes, owner}, removeCard, likeCard, openImagePopup, ownerId) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteBtnCard = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");

  if(ownerId !== owner._id) {
    deleteBtnCard.remove();
  }

  deleteBtnCard.addEventListener("click", (event) => {
    removeCard(event, _id);
  });
  cardImage.addEventListener("click", () =>
    openImagePopup(link, name)
  );

  likeButton.addEventListener("click", likeCard(_id, likeButton, likeCounter));

  cardImage.src = link;
  cardImage.alt = name;
  likeCounter.textContent = likes.length;
  cardTitle.textContent = name;

  if(likes.some((like) => like._id === ownerId)) {
    likeButton.classList.add("card__like-button_is-active");
  }


  return cardElement;
}

export function removeCard(event, _id) {
  const card = event.target.closest(".card");
  removeMyCard(_id)
    .then(() => {
      card.remove();
    })
}

export function likeCard(_id, likeButton, likeCounter) {
  return function () {
    const isLiked = likeButton.classList.contains("card__like-button_is-active");
    likeCardApi(_id, isLiked)
      .then((data) => {
        likeButton.classList.toggle("card__like-button_is-active");
        likeCounter.textContent = data.likes.length;
      });
  };
}
