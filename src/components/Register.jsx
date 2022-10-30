import React from 'react'

export function Register() {
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
        <a className="auth__link" href="#">
          Уже зарегистрированы? Войти
        </a>
      </div>
    </div>
  )
}
