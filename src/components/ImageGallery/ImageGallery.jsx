import { Component } from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import css from './ImageGallery.module.css';
import { Item } from 'components/ImageGalleryItem/ImageGalleryItem';
import { toast } from 'react-toastify';
import Modal from 'components/Modal/Modal';
import { isDisabled } from '@testing-library/user-event/dist/utils';

export class ImageGallery extends Component {
  state = {
    images: [],
    loading: false,
    currentPage: 1,
    showModal: false,
    largeImageURL: '',
    totalHits: 0,
    hitsPerPage: 12,
  };

  imageFetchRequest() {
    this.setState({ loading: true });
    fetch(
      `https://pixabay.com/api/?q=${this.props.imageName}&page=${this.state.currentPage}&key=37452121-a108d404886ded7cf81df8024&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json())
      .then(data => {
        if (data.hits.length === 0) {
          toast.error('thats a great plan Walter that a genius plan');
          this.setState({
            images: [],
            pageNumber: 1,
          });
        } else {
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            loading: false,
            totalHits: data.totalHits,
          }));
        }
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.imageName !== this.props.imageName) {
      this.setState({ images: [], currentPage: 1 }, this.imageFetchRequest);
    }
  }

  buttonLoadMore = () => {
    this.setState(
      prevState => ({
        currentPage: prevState.currentPage + 1,
        // loading: false,
      }),
      () => {
        this.imageFetchRequest();
      }
    );
  };

  handlerImgClick = largeImageURL => {
    this.setState({
      largeImageURL,
      showModal: true,
    });
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  handleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      this.toggleModal();
    }
  };

  render() {
    const { images, loading, showModal, largeImageURL, currentPage } = this.state;
    const lastPage = Math.ceil(this.state.totalHits / this.state.hitsPerPage);
    const showLoadMoreButton =
      currentPage < lastPage && !loading && images.length > 0;

    return (
      <div className={css.container}>
        <ul className={css.imageGallery}>
          {loading && <Loader />}
          {images.length > 0 &&
            images.map(image => (
              <Item
                image={image}
                key={image.id}
                handlerImgClick={() =>
                  this.handlerImgClick(image.largeImageURL)
                }
              />
            ))}
        </ul>
        {showLoadMoreButton && <Button onClick={this.buttonLoadMore} />}

        {showModal && (
          <Modal onClose={this.toggleModal} largeImageURL={largeImageURL} />
        )}
      </div>
    );
  }
}

ImageGallery.propTypes = {
  imageName: PropTypes.string.isRequired,
};