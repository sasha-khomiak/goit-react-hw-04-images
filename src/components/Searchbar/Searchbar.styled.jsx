import styled from 'styled-components';

export const Header = styled.header`
  max-width: 380px;
  margin-left: auto;
  margin-right: auto;

  //для планшету 768-1279
  @media screen and (min-width: 805px) {
    max-width: 768px;
  }

  //для десктопа від 1280
  @media screen and (min-width: 1280px) {
    min-width: 100%;
  }
`;

export const Form = styled.form`
  display: flex;
  margin-left: 15px;
  margin-right: 15px;
`;

export const Button = styled.button`
  background-color: #f7ac3b;
  border-radius: 5px;
  border: none;
  width: 153px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 700;
  font-size: 16px;
  line-height: 15px;

  cursor: pointer;

  color: #ffffff;

  &:hover {
    background-color: #d68d1f;
  }
`;

export const Input = styled.input`
  /* white */

  background: #ffffff;
  border-radius: 5px;
  border: none;

  width: 100%;
  height: 50px;
  /* padding: 10px; */
  padding-left: 20px;
  margin-left: 20px;
`;
