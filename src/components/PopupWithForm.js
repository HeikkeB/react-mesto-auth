function PopupWithForm({
  name,
  isOpen,
  onClose,
  title,
  onSubmit,
  children,
  buttonText,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button
          className="popup__closed"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form className={`popup__form popup__form_${name}`} onSubmit={onSubmit}>
          {children}
          <button className="popup__submit-btn" type="submit">
            {buttonText || 'Сохранить'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm
