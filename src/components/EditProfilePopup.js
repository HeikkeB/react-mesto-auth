import PopupWithForm from './PopupWithForm'
import { useState, useEffect, useContext } from 'react'
import { currentUserContext } from '../contexts/CurrentUserContext'

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [values, setValues] = useState('')

  const currentUser = useContext(currentUserContext)

  useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [isOpen])

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    const { name, description } = values
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
          name="name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
          onChange={handleChange}
          value={values.name || ''}
        />
        <span className="popup__input-error" id="username-error"></span>
      </section>
      <section className="popup__section" aria-label="строка ввода">
        <input
          type="text"
          id="userinfo"
          className="popup__input popup__input_profession"
          name="description"
          placeholder="Занятие"
          minLength="2"
          maxLength="200"
          required
          onChange={handleChange}
          value={values.description || ''}
        />
        <span className="popup__input-error" id="userinfo-error"></span>
      </section>
    </PopupWithForm>
  )
}

export default EditProfilePopup
