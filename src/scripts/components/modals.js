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

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closePopup(popup, "popup_is-opened");
    }
  });
});
document.querySelectorAll(".popup__close").forEach((button) => {
  button.addEventListener("click", (event) => {
    console.log("click");
    const popup = event.target.closest(".popup");
    closePopup(popup, "popup_is-opened");
  });
});
