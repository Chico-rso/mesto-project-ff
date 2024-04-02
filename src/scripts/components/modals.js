const formElement = document.querySelector('[name="edit-profile"]');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

export function openPopup(popup, addClass)
{
  popup.classList.toggle(addClass);
  document.addEventListener('keydown', keyDownHandler);
}

export function closePopup(popup, removeClass)
{
  popup.classList.remove(removeClass);
  document.removeEventListener('keydown', keyDownHandler);
}
export function updatePopupValue()
{
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
function keyDownHandler(evt)
{
  if(evt.key === 'Escape')
  {
    closePopup(document.querySelector('.popup_is-opened'), 'popup_is-opened')
  }
}

function handleFormSubmit(evt)
{
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  profileJob.textContent = job;
  profileName.textContent = name;

  const popupOpen = document.querySelector('.popup_is-opened');
  closePopup(popupOpen, 'popup_is-opened')
}

formElement.addEventListener('submit', handleFormSubmit);