function openPopup(popup, addClass)
{
  popup.classList.toggle(addClass);
  document.addEventListener('keydown', keyDownHendler);
}

function closePopup(popup, removeClass)
{
  popup.classList.remove(removeClass);
  document.removeEventListener('keydown', keyDownHendler);
}

function keyDownHendler(evt)
{
  if(evt.key === 'Escape')
  {
    closePopup(document.querySelector('.popup_is-opened'), 'popup_is-opened')
  }
}

export default {
  openPopup,
  closePopup
}