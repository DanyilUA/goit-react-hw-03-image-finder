import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';


export default class Modal extends Component {
  componentDidMount() {
        document.body.style.overflow = 'hidden';;
    window.addEventListener('keydown', this.handleKeyDown);
  }

    componentWillUnmount() {
          document.body.style.overflow = ''; 
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL } = this.props;

    return (
      <div className={css.overlay} onClick={this.handleBackDropClick}>
        <div className={css.modal}>
          <img src={largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};