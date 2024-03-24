import './pages/index.css';
import './scripts/cards.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content
// @todo: DOM узлы
const cardList = document.querySelector('.places__list');
// @todo: Функция создания карточки
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

// @todo: Функция удаления карточки
function removeCard(event)
{
  const target = event.target.closest('.places__item');

  target.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) =>
{
  cardList.append(createCard(item, removeCard));
})