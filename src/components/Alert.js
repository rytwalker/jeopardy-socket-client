import React from 'react';
import styled from 'styled-components';

const Alert = ({ children }) => {
  return <AlertContainer>{children}</AlertContainer>;
};

const AlertContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 100%;
  background: rgba(98, 146, 158, 0.7);
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  color: #fdfdff;
`;

export default Alert;
