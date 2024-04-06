export function createCard(cardData, removeCard, likeCard, openImagePopup) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteBtnCard = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  deleteBtnCard.addEventListener("click", (event) => {
    removeCard(event);
  });

  cardImage.addEventListener("click", () =>
    openImagePopup(cardImage.src, cardImage.alt)
  );

  likeButton.addEventListener("click", likeCard);

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  return cardElement;
}

export function removeCard(event) {
  const target = event.target.closest(".places__item");

  target.remove();
}

export function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
