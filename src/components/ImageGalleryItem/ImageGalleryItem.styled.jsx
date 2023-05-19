import styled from 'styled-components';

export const Li = styled.li`
  list-style: none;
  padding: 0;
`;

export const Thumb = styled.div`
  height: 250px;
  width: 380px;
  border-radius: 20px;
  margin-bottom: 10px;
  overflow: hidden;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 4px 4px rgba(0, 0, 0, 0.06),
    1px 4px 6px rgba(0, 0, 0, 0.16);
  cursor: pointer;
`;

export const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  transition: scale 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  display: block;

  &:hover {
    scale: 1.1;
  }
`;
