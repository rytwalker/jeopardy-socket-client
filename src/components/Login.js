import React, { useState } from 'react';

const Login = ({ handleLogin }) => {
  const [username, setUserName] = useState('');
  const handleUserNameSubmit = () => {
    handleLogin(username);
  };
  return (
    <div>
      <div>
        <label htmlFor="userName">Username:</label>
        <input
          type="text"
          value={username}
          onChange={e => setUserName(e.target.value)}
        />
        <button onClick={handleUserNameSubmit}>Add user</button>
      </div>
    </div>
  );
};

export default Login;
