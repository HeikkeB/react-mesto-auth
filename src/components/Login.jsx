import React from 'react'

export function Login({ handleAuthorize }) {
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

  function handleSubmit() {
    //evt.preventDefault()
    handleAuthorize(email, password)
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
            value={email}
            onChange={changeEmail}
          />
          <input
            className="auth__input"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={changePassword}
          />
          <button className="auth__submit-btn">Войти</button>
        </form>
      </div>
    </div>
  )
}
