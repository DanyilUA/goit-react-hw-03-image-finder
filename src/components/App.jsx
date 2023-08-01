import { imageFetch } from 'utilities/fetch';

import { Component } from 'react';
import SearchBar from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { toast } from 'react-toastify';
import Modal from 'components/Modal/Modal';

export class App extends Component {
  state = {
    inputValue: '',
    loading: false,
    images: [],
    currentPage: 1,
    showModal: false,
    largeImageURL: '',
    totalHits: 0,
    hitsPerPage: 12,
  };

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');

    let shouldWeFetch = prevState.inputValue !== this.state.inputValue ||
      prevState.currentPage !== this.state.currentPage;
    console.log(this.state.currentPage);
    
    if (shouldWeFetch) {
      console.log(prevState.inputValue);
      console.log(this.state.inputValue);


        imageFetch(this.state.inputValue, this.state.currentPage)
          .then(data => {
            if (data.hits.length === 0) {
              toast.error('thats a great plan Walter that a genius plan');
              this.setState({
                totalHits: 0,
                loading: false,
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
            this.setState({ loading: false });
          });
      
    }
  }

  handleFormSubmit = inputValue => {
    this.setState({ inputValue, currentPage: 1, images: [] });
  };

  buttonLoadMore = () => {
    this.setState(
      prevState => ({
        currentPage: prevState.currentPage + 1,
        loading: true
      })
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

  render() {
    const { images, loading, showModal, largeImageURL, currentPage } =
      this.state;
    const lastPage = Math.ceil(this.state.totalHits / this.state.hitsPerPage);
    const showLoadMoreButton =
      currentPage < lastPage && !loading && images.length > 0;

    return (
      <div>
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          images={images}
          onClick={this.handlerImgClick}
          handlerImgClick={this.handlerImgClick}
        />
        {showLoadMoreButton && <Button onClick={this.buttonLoadMore} />}
        {showModal && (
          <Modal onClose={this.toggleModal} largeImageURL={largeImageURL} />
        )}
        {loading && <Loader />}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
