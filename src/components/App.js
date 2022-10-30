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

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState('')
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState('')
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState('')
  const [selectedCard, setSelectedCard] = React.useState('')
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])

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

  return (
    <currentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header />
          <Main
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
          />

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
        </div>
      </div>
    </currentUserContext.Provider>
  )
}

export default App
