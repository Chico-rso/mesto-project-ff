export function createCard({link, name}, removeCard, likeCard, openImagePopup) {
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
    openImagePopup(link, name)
  );

  likeButton.addEventListener("click", likeCard);

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  return cardElement;
}

export function removeCard({ target }) {

  const card = target.closest(".places__item");
  if (card) {
    card.remove();
  }
}

export function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
