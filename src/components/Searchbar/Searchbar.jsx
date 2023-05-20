// підключення бібліотек
import PropTypes from 'prop-types';
import React, { useState } from 'react';

// стилі компоненту Searchbar
import { Header, Form, Button, Input } from './Searchbar.styled';

// наш функціональний компонент. В пропсах отримує метод onSubmit=>onSubmitSearchBtn, який буде
// перезаписувати загальний стейт слово для пошуку
const Searchbar = ({ onSubmit }) => {
  //
  // стейт для контролю інпута
  const [query, setQuery] = useState('');

  //при зміні значення інпута перезаписуємо внутрішній стейт
  const handleChangeInput = event => {
    setQuery(event.currentTarget.value);
  };

  // при сабміті форми перевіряєм чи не порожній рядок в стейт
  // і відправляємо запит у загальний стейт в Арр і очищаємо форму
  const onSubmitForm = event => {
    event.preventDefault();
    if (query.trim() === '') {
      setQuery('');
      return;
    }
    onSubmit(query.trim());
    setQuery('');
  };

  // верстка форми
  return (
    <Header>
      <Form onSubmit={onSubmitForm}>
        <Button type="submit">
          <span>Search</span>
        </Button>

        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChangeInput}
        />
      </Form>
    </Header>
  );
};

export default Searchbar;

// перевірка propTypes
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
