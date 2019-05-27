import React, { useState } from 'react';
import styled from 'styled-components';

const Buzzer = ({ handleScoreUpdate, handleSelected, username }) => {
  const [toggle, setToggle] = useState(false);

  const handleBuzzerPress = () => {
    handleSelected(true);
    setToggle(!toggle);
  };

  return (
    <BuzzerContainer>
      <h1>{username}</h1>
      <BuzzerButton onClick={handleBuzzerPress}>{username[0]}</BuzzerButton>
      <p>Third thing</p>
      {toggle && (
        <Modal>
          <button
            onClick={() => handleScoreUpdate(username)}
            className="correct-btn btn"
          >
            Correct
          </button>
          <button className="wrong-btn btn">Wrong!</button>
        </Modal>
      )}
    </BuzzerContainer>
  );
};

const BuzzerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
  position: relative;
`;

const BuzzerButton = styled.button`
  height: 300px;
  background: #df2935;
  border: 1px solid transparent;
  border-radius: 4px;
  color: #fdfdff;
  font-size: 48px;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    background: #ee3d49;
  }
  &:focus {
    outline: none;
  }
`;

const Modal = styled.div`
  position: absolute;
  top: 39%;
  background: #fdfdff;
  display: flex;
  flex-direction: column;
  width: 90%;
  padding: 40px 20px;
  margin: auto;
  left: 5%;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  .btn {
    color: #fdfdff;
    cursor: pointer;
    padding: 10px;
    border: 1px solid transparent;
    background: #c4c4c4;
    border-radius: 4px;
    font-size: 18px;
    text-transform: uppercase;
    transition: all 0.2s;
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }

  .correct-btn {
    background: #2660a4;
    &:hover {
      background: #3e8be4;
    }
  }

  .wrong-btn {
    background: #df2935;
    &:hover {
      background: #ee3d49;
    }
  }
`;

export default Buzzer;
