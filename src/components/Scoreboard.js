import React from 'react';
import styled from 'styled-components';
import PlayerSqure from './PlayerSquare';

const Scoreboard = ({ users }) => {
  return (
    <div style={{ margin: '0 auto' }}>
      <h1>Scoreboard</h1>
      <Container>
        {users && users.map(user => <PlayerSqure user={user} />)}
      </Container>
    </div>
  );
};

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  margin: 0 auto;
`;

export default Scoreboard;
