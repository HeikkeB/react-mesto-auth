import React from 'react'

export function PopupWithConfirm({ onClose, isOpen, card, confirm }) {
  function handleSubmit(evt) {
    evt.preventDefault()
    confirm(card)
  }

  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button className="popup__closed" onClick={onClose}></button>
        <h2 className="popup__title">Вы уверены?</h2>
        <button className="popup__submit-btn" onClick={handleSubmit}>
          Да
        </button>
      </div>
    </div>
  )
}
