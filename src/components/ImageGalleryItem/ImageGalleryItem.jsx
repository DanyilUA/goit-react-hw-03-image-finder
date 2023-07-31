import css from './ImageGalleryItem.module.css';


export function Item({ image, handlerImgClick }) {
  return (
    <li
      key={image.id}
      className={css.imageGalleryItem }
      onClick={() => handlerImgClick(image.largeImageURL)}
    >
      <img
        src={image.webformatURL}
        alt=""
        className={css.imageGalleryItem__image}
      />
    </li>
  );
}
