import React, { useState } from 'react';
import styled from 'styled-components';

const Login = ({ handleLogin }) => {
  const [username, setUserName] = useState('');

  const handleUserNameSubmit = () => {
    handleLogin(username);
  };

  return (
    <Container>
      <FormGroup>
        <FormLabel htmlFor="userName">Enter a username:</FormLabel>
        <FormInput
          type="text"
          value={username}
          onChange={e => setUserName(e.target.value)}
        />
        <FormButton onClick={handleUserNameSubmit}>Join Game</FormButton>
      </FormGroup>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
  max-width: 600px;
  padding: 40px 20px;
`;

const FormLabel = styled.label`
  margin-bottom: 5px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
`;

const FormInput = styled.input`
  font-size: 18px;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  border: 1px solid #c4c4c4;
`;

const FormButton = styled.button`
  color: #fdfdff;
  cursor: pointer;
  padding: 10px;
  border: 1px solid transparent;
  background: #2660a4;
  border-radius: 4px;
  font-size: 18px;
  text-transform: uppercase;
  transition: all 0.2s;
  &:hover {
    background: #3e8be4;
  }
`;

export default Login;
