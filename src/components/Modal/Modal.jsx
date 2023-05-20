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
    // обробник слухача якщо натиснута кнопка Escape - демонтуємо модалку
    const hanleKeyDown = event => {
      if (event.code === 'Escape') {
        setShowModal(false);
      }
    };

    // коли монтується модалка, чіпляємо слухача на натискання кнопок із обробником hanleKeyDown
    document.addEventListener('keydown', hanleKeyDown);

    return () => {
      // коли демонтується модалка, чіпляємо очистку слухача на натискання кнопок із обробником hanleKeyDown
      document.removeEventListener('keydown', hanleKeyDown);
    };
  }, [setShowModal]);

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

// перевірка PropTypes
Modal.propTypes = {
  imageLink: PropTypes.string.isRequired,
  setShowModal: PropTypes.func.isRequired,
};
