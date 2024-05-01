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

export function apiRequest(apiRequestConfig) {
  return fetch(`${apiConfig.baseUrl}/${apiRequestConfig.url}`, {
    method: `${apiRequestConfig.method}`,
    headers: apiConfig.headers,
    body: JSON.stringify(apiRequestConfig.body),
  }).then(handleResponse);
}
