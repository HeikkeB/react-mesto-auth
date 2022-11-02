import React from 'react'

export function PopupWithConfirm({ onClose }) {
  return (
    <div className="popup">
      <div className="popup__container">
        <button className="popup__closed" onClick={onClose}></button>
        <h2 className="popup__title">Вы уверены?</h2>
        <button className="popup__submit-btn">Да</button>
      </div>
    </div>
  )
}
