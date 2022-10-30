import React from 'react'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef()

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    })
  }

  React.useEffect(() => {
    avatarRef.current.value = ''
  }, [isOpen])

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      container="popup__container"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <section className="popup__section-avatar" aria-label="строка ввода">
        <input
          id="avatar"
          type="url"
          className="popup__input popup__input_link"
          name="avatar"
          placeholder="Ссылка на картинку"
          required
          ref={avatarRef}
        />
        <span className="popup__input-error" id="avatar-error"></span>
      </section>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
