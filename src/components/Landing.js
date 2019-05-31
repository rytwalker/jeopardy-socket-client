import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Landing = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}
    >
      <Container>
        <Link to="/scoreboard">Scoreboard</Link>
        <Link to="/login">Login</Link>
      </Container>
    </div>
  );
};

const Container = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 40px 20px;
  @media (max-width: 600px) {
    box-shadow: none;
  }
  a {
    color: #fdfdff;
    cursor: pointer;
    padding: 10px;
    border: 1px solid transparent;
    background: #2660a4;
    border-radius: 4px;
    font-size: 18px;
    text-transform: uppercase;
    transition: all 0.2s;
    width: 75%;
    margin: 0 auto;
    text-decoration: none;
    &:not(:last-child) {
      margin-bottom: 20px;
    }
    &:hover {
      background: #3e8be4;
    }
  }
`;

export default Landing;
