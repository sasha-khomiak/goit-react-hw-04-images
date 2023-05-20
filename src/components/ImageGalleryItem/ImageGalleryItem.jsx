// імпорт бібліотек
import PropTypes from 'prop-types';
import React from 'react';

// стилізація нашого компонента
import { Li, Thumb, Img } from './ImageGalleryItem.styled';

// // компонент одного елемента галереї в пропсах отримує:
// // обʼєкт image - містить інформацію про картинку
// // togleModal - метод перемикач модалки (в даному разі на її показ),
// // setImageLink - передача в стейт картинки для модалки
const ImageGalleryItem = ({ setImageLink, setShowModal, image }) => {
  //
  // обробник кліку на на фотографію, передає в стейт App лінк фотографії
  // і показує модалку всередині із тою фотографією
  const onClickShowPhoto = () => {
    setImageLink(image.largeImageURL);
    setShowModal(true);
  };

  return (
    <Li>
      <Thumb onClick={onClickShowPhoto}>
        <Img src={image.webformatURL} alt={image.tags} loading="lazy" />
      </Thumb>
    </Li>
  );
};

export default ImageGalleryItem;

// перевірка PropTypes
ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  setImageLink: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
};
