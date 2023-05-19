import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1;
`;

export const ModalContainer = styled.div`
  position: absolute;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  display: flex;
  align-items: center;
  justify-content: center;

  /* width: 90%; */
  /* height: 90%; */
  /* padding: 40px; */
`;

export const Img = styled.img`
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
`;
