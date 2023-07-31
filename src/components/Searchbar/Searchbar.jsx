import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';

export default class SearchBar extends Component {
  state = {
    imageName: '',
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.imageName.trim() === '') {
      toast.error('Where is the money Lebowski');
      return;
    }
    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: '' });
  };

  handleNameChange = event => {
    this.setState({ imageName: event.currentTarget.value.toLowerCase() });
  };

  render() {
    return (
      <header className={css.searchBar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchFormButton}>
            <span className={css.searchForm_button_label}>Search</span>
          </button>

          <input
            className={css.searchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            name="imageName"
            placeholder="Search images and photos"
            value={this.state.imageName}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  // Add any other prop types, if required
};
