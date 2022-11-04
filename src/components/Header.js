import React from 'react'
import logo from '../images/logo.svg'
import { Link, Route, Routes } from 'react-router-dom'

function Header({ currentEmail, signOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место" />
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Link to="/" className="header__link">
                  {currentEmail}
                </Link>
                <Link to="/sign-in" className="header__link" onClick={signOut}>
                  Выйти
                </Link>
              </>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="header__link">
                Войти
              </Link>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="header__link">
                Регистрация
              </Link>
            }
          />
        </Routes>
      </div>
    </header>
  )
}

export default Header
