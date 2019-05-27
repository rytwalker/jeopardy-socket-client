import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <Link to="/scoreboard">Scoreboard</Link>
      <Link to="/buzzer">Buzzer</Link>
    </nav>
  );
};

export default Navigation;
