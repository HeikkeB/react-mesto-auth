import PopupWithForm from './PopupWithForm'
import React from 'react'
import { currentUserContext } from '../contexts/CurrentUserContext'

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  const currentUser = React.useContext(currentUserContext)

  React.useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [isOpen])

  function handleChangeName(evt) {
    setName(evt.target.value)
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateUser({
      name,
      about: description,
    })
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="add"
      container="popup__container"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <section className="popup__section" aria-label="строка ввода">
        <input
          type="text"
          id="username"
          className="popup__input popup__input_name"
          name="user"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
          onChange={handleChangeName}
          value={name || ''}
        />
        <span className="popup__input-error" id="username-error"></span>
      </section>
      <section className="popup__section" aria-label="строка ввода">
        <input
          type="text"
          id="userinfo"
          className="popup__input popup__input_profession"
          name="profession"
          placeholder="Занятие"
          minLength="2"
          maxLength="200"
          required
          onChange={handleChangeDescription}
          value={description || ''}
        />
        <span className="popup__input-error" id="userinfo-error"></span>
      </section>
    </PopupWithForm>
  )
}

export default EditProfilePopup
