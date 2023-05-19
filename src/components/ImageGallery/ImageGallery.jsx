// підключення бібліотек
import PropTypes from 'prop-types';

// стилізація нашого контейнера в якому  вставляємо результати наших картинок
import { Ul } from './ImageGallery.styled';

// підключення компонента ImageGalleryItem
import ImageGalleryItem from '../ImageGalleryItem';

// наш компонент галереї
const ImageGallery = ({ imagesArray, setImageLink, togleModal }) => {
  return (
    <Ul>
      {imagesArray.map(image => (
        <ImageGalleryItem
          image={image}
          key={image.id}
          togleModal={togleModal}
          setImageLink={setImageLink}
        />
      ))}
    </Ul>
  );
};

// перевірка PropTypes
ImageGallery.propTypes = {
  imagesArray: PropTypes.array.isRequired,
  togleModal: PropTypes.func.isRequired,
  setImageLink: PropTypes.func.isRequired,
};

export default ImageGallery;
