export function openPopup(popup, addClass) {
  popup.classList.toggle(addClass);
  document.addEventListener("keydown", keyDownHandler);
}

export function closePopup(popup, removeClass) {
  popup.classList.remove(removeClass);
  document.removeEventListener("keydown", keyDownHandler);
}

function keyDownHandler(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"), "popup_is-opened");
  }
}

