import { apiRequest, catchError } from "../components/api.js";

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
    removeCard(event);
  });
  cardImage.addEventListener("click", () =>
    openImagePopup(link, name)
  );

  likeButton.addEventListener("click", likeCard(_id, likes, likeButton, likeCounter));

  cardImage.src = link;
  cardImage.alt = name;
  likeCounter.textContent = likes.length;
  cardTitle.textContent = name;

  if(likes.some((like) => like._id === ownerId)) {
    likeButton.classList.add("card__like-button_is-active");
  }


  return cardElement;
}

export function removeCard({ target }) {

  const card = target.closest(".places__item");
  if (card) {
    card.remove();
  }
}

export function likeCard(_id, likes, likeButton, likeCounter) {
  return function () {
    const isLiked = likeButton.classList.contains("card__like-button_is-active");
    const method = isLiked ? "DELETE" : "PUT";
    const url = `cards/likes/${_id}`;
    apiRequest({
      url,
      method,
    }).then((data) => {
      likeButton.classList.toggle("card__like-button_is-active");
      likes = data.likes;
      likeCounter.textContent = likes.length;
    }).catch(catchError);
  };
}
