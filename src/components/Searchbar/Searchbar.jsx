// підключення бібліотек
import PropTypes from 'prop-types';
import React, { Component } from 'react';

// стилі компоненту Searchbar
import { Header, Form, Button, Input } from './Searchbar.styled';

// наш класовий компонент. В пропсах отримує метод onSubmit=>onSubmitSearchBtn, який буде
// перезаписувати загальний стейт слово для пошуку
class Searchbar extends Component {
  // наш локальний стейт для контролю інпута
  state = {
    query: '',
  };

  //при зміні значення інпута перезаписуємо внутрішній стейт
  handleChangeInput = event => {
    this.setState({ query: event.currentTarget.value });
  };

  // при сабміті форми перевіряєм чи не порожній рядок в стейт
  // і відправляємо запит у загальний стейт в Арр і очищаємо форму
  onSubmitForm = event => {
    event.preventDefault();
    if (this.state.query.trim() === '') {
      this.clearForm();
      return;
    }
    this.props.onSubmit(this.state.query.trim());
    this.clearForm();
  };

  // очистка форми
  clearForm = () => {
    this.setState({ query: '' });
  };

  // рендеринг форми
  render() {
    return (
      <Header>
        <Form onSubmit={this.onSubmitForm}>
          <Button type="submit">
            <span>Search</span>
          </Button>

          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleChangeInput}
          />
        </Form>
      </Header>
    );
  }
}

export default Searchbar;

// перевірка propTypes
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
