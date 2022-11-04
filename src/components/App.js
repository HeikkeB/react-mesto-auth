import React from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import EditAvatarPopup from './EditAvatarPopup'
import EditProfilePopup from './EditProfilePopup'
import AddPlacePopup from './AddPlacePopup'
import ImagePopup from './ImagePopup'
import api from '../utils/Api'
import { currentUserContext } from '../contexts/CurrentUserContext'
import { LoggedContext } from '../contexts/LoggedContext'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { Register } from './Register'
import { Login } from './Login'
import { InfoTooltip } from './InfoTooltip'
import { ProtectedRoute } from './ProtectedRoute'
import * as auth from '../utils/auth'
import { PopupWithConfirm } from './PopupWithConfirm'

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [currentEmail, setCurrentEmail] = React.useState([])
  const [infoTooltip, setInfoTooltip] = React.useState(false)
  const [successfulReg, setSuccesfulReg] = React.useState(false)
  const [withConfirm, setWithConfirm] = React.useState({})
  const [deleteConfirm, setDeleteConfirm] = React.useState(false)
  const history = useNavigate()

  React.useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token) {
      handleToken()
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([data, card]) => {
          setCurrentUser(data)
          setCards(card)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [loggedIn])

  function handleDeleteConfirm(card) {
    setWithConfirm(card)
    setDeleteConfirm(true)
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false)
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setSelectedCard(null)
    setInfoTooltip(false)
    setDeleteConfirm(false)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleUpdateUser(newData) {
    api
      .setUserInfo(newData)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleUpdateAvatar(newData) {
    api
      .updateAvatar(newData)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id)

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        )
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((c) => (c._id === card._id ? false : true))
        )
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleAddPlaceSubmit(newData) {
    api
      .addNewCard(newData)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleSignOut() {
    localStorage.removeItem('jwt')
    setLoggedIn(false)
  }

  function handleRegister({ email, password }) {
    auth
      .register(email, password)
      .then((res) => {
        if (res.statusCode !== 400) {
          setSuccesfulReg(true)
          history('/sign-in')
          setCurrentEmail(email)
        }
      })
      .catch((err) => {
        setSuccesfulReg(false)

        return console.log(err)
      })
      .finally(() => {
        setInfoTooltip(true)
      })
  }

  function handleAuthorize({ email, password }) {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token)
          setCurrentEmail(email)
          setLoggedIn(true)
          history('/')
        }
      })
      .catch((err) => {
        setSuccesfulReg(false)
        setInfoTooltip(true)
        console.log(err)
      })
  }

  function handleToken() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt')
      auth
        .validateJWT(jwt)
        .then((res) => {
          if (res) {
            setCurrentEmail(res.data.email)
            setLoggedIn(true)
            history('/')
          }
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <currentUserContext.Provider value={currentUser}>
      <LoggedContext.Provider value={loggedIn}>
        <div className="body">
          <div className="page">
            <Header currentEmail={currentEmail} signOut={handleSignOut} />
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <ProtectedRoute>
                    <Main
                      cards={cards}
                      onCardLike={handleCardLike}
                      onCardDelete={handleDeleteConfirm}
                      onEditAvatar={handleEditAvatarClick}
                      onEditProfile={handleEditProfileClick}
                      onAddPlace={handleAddPlaceClick}
                      onCardClick={handleCardClick}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sign-up"
                element={<Register handleRegister={handleRegister} />}
              />
              <Route
                path="/sign-in"
                element={<Login handleAuthorize={handleAuthorize} />}
              />
              <Route
                path="*"
                element={
                  loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
                }
              />
            </Routes>

            <Footer />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />

            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            <InfoTooltip
              onClose={closeAllPopups}
              regStatus={successfulReg}
              isOpen={infoTooltip}
            />
            <PopupWithConfirm
              onClose={closeAllPopups}
              isOpen={deleteConfirm}
              confirm={handleCardDelete}
              card={withConfirm}
            />
          </div>
        </div>
      </LoggedContext.Provider>
    </currentUserContext.Provider>
  )
}

export default App
