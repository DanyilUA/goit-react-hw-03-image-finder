import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import { Item } from 'components/ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  render() {
    return (
      <div className={css.container}>
        <ul className={css.imageGallery}>
          {this.props.images.map(image => (
            <Item
              image={image}
              key={image.id}
              handlerImgClick={() =>
                this.props.handlerImgClick(image.largeImageURL)
              }
            />
          ))}
        </ul>
      </div>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  handlerImgClick: PropTypes.func.isRequired,
};
