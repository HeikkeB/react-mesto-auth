import React from 'react'
import Card from './Card'
import { currentUserContext } from '../contexts/CurrentUserContext'

function Main({
  cards,
  onCardLike,
  onCardDelete,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
}) {
  const currentUser = React.useContext(currentUserContext)

  return (
    <main className="content">
      <section className="profile">
        <button className="profile__edit-avatar" onClick={onEditAvatar}>
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="аватар"
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__username">{currentUser.name}</h1>
          <button
            onClick={onEditProfile}
            className="profile__btn-edit"
            type="button"
            aria-label="Редактирование"
          ></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          onClick={onAddPlace}
          className="profile__btn-add"
          type="button"
          aria-label="Добавить фото"
        ></button>
      </section>

      <section className="elements" aria-label="Фотографии">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Main
