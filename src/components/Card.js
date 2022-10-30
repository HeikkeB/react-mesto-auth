import { currentUserContext } from '../contexts/CurrentUserContext'
import React from 'react'

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card)
  }

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleDeleteCard() {
    props.onCardDelete(props.card)
  }

  const currentUser = React.useContext(currentUserContext)

  const isOwn = props.card.owner._id === currentUser._id
  const cardDeleteButtonClassName = `element__btn-delete ${
    isOwn ? 'element__btn-delete_visible' : 'element__btn-delete_hidden'
  }`

  const isLiked = props.card.likes.some((i) => i._id === currentUser._id)

  const cardLikeButtonClassName = `element__btn-like ${
    isLiked ? 'element__btn-like_active' : ' '
  }`

  return (
    <li className="element">
      <img
        className="element__img"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="element__description">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Нравится"
            onClick={handleLikeClick}
          ></button>
          <p className="element__like-counter">{props.card.likes.length}</p>
        </div>

        <button
          className={cardDeleteButtonClassName}
          type="button"
          aria-label="Удалить"
          onClick={handleDeleteCard}
        ></button>
      </div>
    </li>
  )
}

export default Card
