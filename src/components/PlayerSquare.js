import React from 'react';
import styled from 'styled-components';

const PlayerSquare = ({ user }) => {
  return (
    <Square selected={false}>
      <h1>{user.username}</h1>
      <Score>{user.score}</Score>
      <TimerBar />
    </Square>
  );
};

const Square = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 4px;
  background: ${props => (props.selected ? '#3e8be4' : '#2660a4')};
  color: #c6c5b9;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.2s;
`;

const Score = styled.div`
  font-size: 96px;
  padding-bottom: 25px;
`;

const TimerBar = styled.div`
  height: 25px;
  overflow: hidden;
  background: #1d4e86;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

export default PlayerSquare;
