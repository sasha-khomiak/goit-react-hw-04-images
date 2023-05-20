// підключення бібліотек
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

// стилізація компонентів модалки
import { Overlay, ModalContainer, Img } from './Modal.styled';

// підключаємо ф-ію роботи з порталами в реакт домі
import { createPortal } from 'react-dom';

//створюємо новий елемент який буде порталом для модадки
const modalRoot = document.querySelector('#modal-root');

// компонент нашої модалки
const Modal = ({ imageLink, setShowModal }) => {
  useEffect(() => {
    // коли монтується модалка, чіпляємо слухача на натискання кнопок із обробником hanleKeyDown
    window.addEventListener('keydown', hanleKeyDown);

    return () => {
      // коли демонтується модалка, чіпляємо очистку слухача на натискання кнопок із обробником hanleKeyDown
      window.removeEventListener('keydown', hanleKeyDown);
    };
  }, []);

  // обробник слухача якщо натиснута кнопка Escape - демонтуємо модалку
  const hanleKeyDown = event => {
    if (event.code === 'Escape') {
    }
    setShowModal(false);
  };

  // Якшо клік події відбувся по Overlay (збіглися target і currentTarget) то закриваємо модалку
  const handleOverlayClick = event => {
    const { currentTarget, target } = event;
    if (currentTarget === target) {
      setShowModal(false);
    }
  };

  return createPortal(
    <div>
      <Overlay onClick={handleOverlayClick}>
        <ModalContainer>
          <Img src={imageLink} alt="" />
        </ModalContainer>
      </Overlay>
    </div>,
    modalRoot
  );
};

export default Modal;

////////////////////////
// export default class Modal extends Component {
// коли монтується модалка, чіпляємо слухача на натискання кнопок із обробником hanleKeyDown
// componentDidMount() {
//   // console.log('монтуємо модалку');
//   window.addEventListener('keydown', this.hanleKeyDown);
// }

// // коли демонтується модалка, чіпляємо очистку слухача на натискання кнопок із обробником hanleKeyDown
// componentWillUnmount() {
//   // console.log('розмонтовуємо модалку');
//   window.removeEventListener('keydown', this.hanleKeyDown);
// }

// // обробник слухача якщо натиснута кнопка Escape - демонтуємо модалку, тобто перемикаємо тогл
// hanleKeyDown = event => {
//   const { setShowModal } = this.props;
//   if (event.code === 'Escape') {
//   }
//   setShowModal(false);
// };

// // Якшо клік події відбувся по Overlay (збіглися target і currentTarget) то закриваємо модалку
// handleOverlayClick = event => {
//   const { setShowModal } = this.props;
//   const { currentTarget, target } = event;
//   if (currentTarget === target) {
//     setShowModal(false);
//   }
// };

// рендер компонента в новий портал (використовуємо createPortal), другий параметр назва порталу
// render() {
//   const { imageLink } = this.props;
//   return createPortal(
//     <div>
//       <Overlay onClick={this.handleOverlayClick}>
//         <ModalContainer>
//           <Img src={imageLink} alt="" />
//         </ModalContainer>
//       </Overlay>
//     </div>,
//     modalRoot
//   );
// }
// }

// перевірка PropTypes
Modal.propTypes = {
  imageLink: PropTypes.string.isRequired,
  setShowModal: PropTypes.func.isRequired,
};
