import React from 'react'
import successfulOk from '../images/successfulNot.png'

export function InfoTooltip() {
  return (
    <div className={`popup_opened toolTip`}>
      <div className="popup__container toolTip__container">
        <button className="popup__closed"></button>
        <img className="toolTip__img" src={successfulOk} />
        <h2 className="popup__title toolTip__title">
          Что-то пошло не так! Попробуйте ещё раз.
        </h2>
      </div>
    </div>
  )
}
