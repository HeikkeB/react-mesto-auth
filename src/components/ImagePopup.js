function ImagePopup({ card, onClose }) {
  if (card !== null) {
    return (
      <div
        className={`popup popup_gallery-background popup_type_image-gallery popup_opened`}
      >
        <div className="popup__gallery">
          <button
            className="popup__closed popup__closed_gallery"
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
          ></button>
          <img
            className="popup__gallery-img"
            src={`${card.link}`}
            alt={`${card.name}`}
          />
          <p className="popup__gallery-description">{card.name}</p>
        </div>
      </div>
    )
  }
}

export default ImagePopup
