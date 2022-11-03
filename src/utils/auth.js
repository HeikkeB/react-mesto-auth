//const BASE_URL = process.env.REACT_APP_BASE_URL
const base_url = 'https://auth.nomoreparties.co'

function handleResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

export const register = (email, password) => {
  return fetch(`${base_url}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse)
}

export const authorize = (email, password) => {
  return fetch(`${base_url}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse)
}

export const validateJWT = (token) => {
  return fetch(`${base_url}/users/me`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(handleResponse)
}
