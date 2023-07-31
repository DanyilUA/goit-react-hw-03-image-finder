import { Component } from "react";
import SearchBar from "./Searchbar/Searchbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from "./ImageGallery/ImageGallery";




export class App extends Component {

  state = {
    imageName: '',
    loading: false,
    currentPageNumber: 1,

  };


  handleFormSubmit = imageName => {
    this.setState({ imageName, currentPageNumber: 1 });
  };

  render() {
    return (
      <div>
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGallery imageName={this.state.imageName} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }

};
