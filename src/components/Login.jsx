import { useState, useEffect } from 'react'

export function Login({ handleAuthorize }) {
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
    handleAuthorize({ email, password })
  }

  return (
    <div className="login">
      <div className="auth__container">
        <h2 className="auth__title">Вход</h2>
        <form className="auth__form" onSubmit={handleSubmit}>
          <input
            className="auth__input"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
            value={values.email}
            onChange={handleChange}
          />
          <input
            className="auth__input"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
            value={values.password}
            onChange={handleChange}
            autoComplete="off"
          />
          <button className="auth__submit-btn">Войти</button>
        </form>
      </div>
    </div>
  )
}
