import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div>
      <Link to="/scoreboard">Scoreboard</Link>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Landing;