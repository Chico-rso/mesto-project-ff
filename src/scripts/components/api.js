import { catchError } from "./utils";

const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-12",
  headers: {
    authorization: "53e1d05a-4ac4-45db-8bf9-b6c0dd4cd836",
    "Content-Type": "application/json",
  },
};

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getInitialCards = () => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    headers: apiConfig.headers,
  })
  .then(handleResponse)
  .catch(catchError);
};

export const getUserInfo = () => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    headers: apiConfig.headers,
  })
  .then(handleResponse)
  .catch(catchError);
};

export const editProfile = (name, about) => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  })
  .then(handleResponse)
  .catch(catchError);
};

export const addCard = (name, link) => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  })
  .then(handleResponse)
  .catch(catchError);
};

export const removeMyCard = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  })
  .then(handleResponse)
  .catch(catchError);
};

export const likeCardApi = (cardId, isLiked) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: isLiked ? "DELETE" : "PUT",
    headers: apiConfig.headers,
  })
  .then(handleResponse)
  .catch(catchError);
};

export const updateAvatar = (avatar) => {
  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar,
    }),
  })
  .then(handleResponse)
  .catch(catchError);
};