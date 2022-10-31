import React from 'react'
import logo from '../images/logo.svg'
import { Link, useLocation } from 'react-router-dom'
import { LoggedContext } from '../contexts/LoggedContext'

function Header({ currentEmail, signOut }) {
  const loggedIn = React.useContext(LoggedContext)
  const location = useLocation()
  const titleText = location.pathname === '/sign-up' ? 'Войти' : 'Регистрация'
  const linkLocation =
    location.pathname === '/sign-up' ? '/sign-in' : '/sign-up'
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место" />
      <div>
        {loggedIn ? (
          <>
            <Link to="/" className="header__link">
              {currentEmail}
            </Link>
            <Link to="/sign-in" className="header__link" onClick={signOut}>
              Выйти
            </Link>
          </>
        ) : (
          <Link to={linkLocation} className="header__link">
            {titleText}
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header
