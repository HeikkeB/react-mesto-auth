import React from 'react'
import { Link } from 'react-router-dom'

export function Register({ handleRegister }) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  React.useEffect(() => {
    setEmail('')
    setPassword('')
  }, [])

  function changeEmail(evt) {
    setEmail(evt.target.value)
  }

  function changePassword(evt) {
    setPassword(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    handleRegister(email, password)
  }

  return (
    <div className="register">
      <div className="auth__container">
        <h2 className="auth__title">Регистрация</h2>
        <form className="auth__form" onSubmit={handleSubmit}>
          <input
            className="auth__input"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={changeEmail}
            required
          />
          <input
            className="auth__input"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={changePassword}
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
