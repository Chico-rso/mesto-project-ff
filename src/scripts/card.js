const cardTemplate = document.querySelector('#card-template').content

export function createCard(cardData, removeCard)
{
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteBtnCard = cardElement.querySelector('.card__delete-button');

  deleteBtnCard.addEventListener('click', (event) => {
    removeCard(event);
  });

  cardImage.src = cardData.link;
  cardImage.alt = cardData.alt
  cardTitle.textContent = cardData.name;

  return cardElement;
}

export function removeCard(event)
{
  const target = event.target.closest('.places__item');

  target.remove();
}

// export default {
//   removeCard,
//   createCard
// }