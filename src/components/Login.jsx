import React from 'react'

export function Login() {
  return (
    <div className="login">
      <div className="auth__container">
        <h2 className="auth__title">Вход</h2>
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
          <button className="auth__submit-btn">Войти</button>
        </form>
      </div>
    </div>
  )
}
