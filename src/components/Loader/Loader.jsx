// підключаємо бібліотеку Loader
import { Rings } from 'react-loader-spinner';

// підключаємо ф-ію роботи з порталами в реакт домі
import { createPortal } from 'react-dom';

// стидізація лоадера
import { LoaderContainer } from './Loader.styled';

//створюємо новий елемент який буде порталом для модадки
const loaderRoot = document.querySelector('#loader-root');

const Loader = () => {
  return createPortal(
    <LoaderContainer>
      <Rings
        height="160"
        width="160"
        color="#f7ac3b"
        radius="6"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="rings-loading"
      />
    </LoaderContainer>,
    loaderRoot
  );
};

export default Loader;
