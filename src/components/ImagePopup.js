function ImagePopup(props) {
  return (
    <div
      className={`popup popup_gallery-background popup_type_image-gallery ${
        props.card ? 'popup_opened' : ''
      }`}
    >
      <div className="popup__gallery">
        <button
          className="popup__closed popup__closed_gallery"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__gallery-img"
          src={`${props.card.link}`}
          alt={`$props.card.name`}
        />
        <p className="popup__gallery-description">{props.card.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup
