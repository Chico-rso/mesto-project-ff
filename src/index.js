import './pages/index.css';
import './scripts/cards.js';

const avatar = new URL('./images/avatar.jpg', import.meta.url);
const avatarObject = {
  link: avatar
};

const avatarImage = document.querySelector('.profile__image');
avatarImage.style.backgroundImage = `url(${avatarObject.link})`

const cardTemplate = document.querySelector('#card-template').content
const cardList = document.querySelector('.places__list');
function createCard(cardData, removeCard)
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

function removeCard(event)
{
  const target = event.target.closest('.places__item');

  target.remove();
}

initialCards.forEach((item) =>
{
  cardList.append(createCard(item, removeCard));
})