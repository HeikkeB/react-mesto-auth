import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export function Register({ handleRegister }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [values, setValues] = useState({})

  useEffect(() => {
    setEmail('')
    setPassword('')
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    const { email, password } = values
    handleRegister({ email, password })
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
            value={values.email}
            onChange={handleChange}
            required
          />
          <input
            className="auth__input"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            required
            //minLength="6"
            maxLength="18"
            autoComplete="off"
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
