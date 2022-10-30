import PopupWithForm from './PopupWithForm'
import React from 'react'

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState('')
  const [link, setLink] = React.useState('')

  React.useEffect(() => {
    setName('')
    setLink('')
  }, [isOpen])

  function handleChangePlace(evt) {
    setName(evt.target.value)
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault()
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
          onChange={handleChangePlace}
          value={name || ''}
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
          onChange={handleChangeLink}
          value={link || ''}
        />
        <span className="popup__input-error" id="link-error"></span>
      </section>
    </PopupWithForm>
  )
}

export default AddPlacePopup
