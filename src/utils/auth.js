//const BASE_URL = process.env.REACT_APP_BASE_URL
const BASE_URL = 'https://auth.nomoreparties.co'

function handleResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  })
    .then(handleResponse)
    .then((res) => res)
}

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  })
    .then(handleResponse)
    .then((data) => {
      localStorage.setItem('jwt', data.token)
    })
}

export const validateJWT = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(handleResponse)
    .then((data) => data)
}
