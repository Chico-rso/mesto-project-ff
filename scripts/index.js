// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content
// @todo: DOM узлы
const cardList = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard(name, link, removeCard)
{
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteBtnCard = cardElement.querySelector('.card__delete-button');

  deleteBtnCard.addEventListener('click', (event) => {
    removeCard(event);
  });

  cardImage.src = link;
  cardTitle.textContent = name;

  cardList.append(cardElement);
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
  createCard(item.name, item.link, removeCard);
})