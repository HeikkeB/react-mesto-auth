import React from 'react'
import { Link } from 'react-router-dom'

export function Register({ handleRegister }) {
  return (
    <div className="register">
      <div className="auth__container">
        <h2 className="auth__title">Регистрация</h2>
        <form className="auth__form">
          <input
            className="auth__input"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
          />
          <input
            className="auth__input"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
          />
          <button className="auth__submit-btn">Зарегистрироваться</button>
        </form>
        <Link to="/sign-in" className="auth__link">
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </div>
  )
}
