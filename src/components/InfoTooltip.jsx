import React from 'react'
import successfulOk from '../images/successfulOk.png'
import successfulNot from '../images/successfulNot.png'

export function InfoTooltip({ onClose, regStatus, isOpen }) {
  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button
          className="popup__closed"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <img
          className="toolTip__img"
          src={regStatus ? successfulOk : successfulNot}
          alt={regStatus ? 'Успешно' : 'Ошибка'}
        />
        <h2 className="popup__title toolTip__title">
          {regStatus
            ? 'Вы успешно зарегистрировались!'
            : ' Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
      </div>
    </div>
  )
}
