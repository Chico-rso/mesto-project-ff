export function loadingForm(evt, buttonText = "Сохранить") {
  const button = evt.target.querySelector(".popup__button");
  button.textContent = buttonText;
}

export function catchError(err) {
  console.log(`Ошибка: ${err}`);
}