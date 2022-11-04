import PopupWithForm from './PopupWithForm'
import { useState, useEffect } from 'react'

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState('')
  const [link, setLink] = useState('')
  const [values, setValues] = useState('')

  useEffect(() => {
    setName('')
    setLink('')
  }, [isOpen])

  const handleChange = (evt) => {
    const { name, value } = evt.target
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    const { name, link } = values
    onAddPlace({
      name,
      link,
    })
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      container="popup__container"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <section className="popup__section" aria-label="строка ввода">
        <input
          type="text"
          id="name"
          className="popup__input popup__input_place"
          name="name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          onChange={handleChange}
          value={values.name || ''}
        />
        <span className="popup__input-error" id="name-error"></span>
      </section>
      <section className="popup__section" aria-label="строка ввода">
        <input
          id="link"
          type="url"
          className="popup__input popup__input_link"
          name="link"
          placeholder="Ссылка на картинку"
          required
          onChange={handleChange}
          value={values.link || ''}
        />
        <span className="popup__input-error" id="link-error"></span>
      </section>
    </PopupWithForm>
  )
}

export default AddPlacePopup
