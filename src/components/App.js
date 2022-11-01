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
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Register } from './Register'
import { Login } from './Login'
import { InfoTooltip } from './InfoTooltip'
import { ProtectedRoute } from './ProtectedRoute'
import * as auth from '../utils/auth'

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState('')
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState('')
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState('')
  const [selectedCard, setSelectedCard] = React.useState('')
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [currentEmail, setCurrentEmail] = React.useState([])
  const [infoTooltip, setInfoTooltip] = React.useState('')
  const [successfulReg, setSuccesfulReg] = React.useState(false)
  const history = useNavigate()
  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  function handleLoggedIn() {
    setLoggedIn(true)
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
    setEditAvatarPopupOpen('')
    setEditProfilePopupOpen('')
    setAddPlacePopupOpen('')
    setSelectedCard('')
    setInfoTooltip('')
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
    setLoggedIn(false)
  }

  function handleRegister(password, email) {
    auth
      .register(password, email)
      .then((res) => {
        if (res.statusCode !== 400) {
          setSuccesfulReg(true)
          history('/sign-in')
        }
      })
      .catch((err) => {
        setSuccesfulReg(false)
        return console.log(err)
      })
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
                      onCardDelete={handleCardDelete}
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
              <Route path="/sign-in" element={<Login />} />
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
            <InfoTooltip onClose={closeAllPopups} />
          </div>
        </div>
      </LoggedContext.Provider>
    </currentUserContext.Provider>
  )
}

export default App
