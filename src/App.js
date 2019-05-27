import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import './App.css';
import Buzzer from './components/Buzzer';
import Login from './components/Login';
import Scoreboard from './components/Scoreboard';

const endpoint = 'http://127.0.0.1:5000';
const socket = socketIOClient(endpoint);

function App() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [connected, setConnected] = useState(false);
  const [isScoreboard, setIsScoreboard] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  // let socket;

  useEffect(() => {
    socket.on('update users', data => {
      console.log(data);
      setUsers([...data.users]);
    });
  }, [users]);

  useEffect(() => {
    if (loggedIn) {
      socket.on('user joined', data => {
        console.log(data);
        console.log(data.username + ' joined');
        setUsers([...data.users]);
        console.log(users);
        // addParticipantsMessage(data);
      });
    }
  }, [loggedIn, users]);

  useEffect(() => {
    console.log(socket);
    if (!connected) {
      if (window.innerWidth >= 500) {
        setIsScoreboard(true);
      }
      setConnected(true);
    }
    return () => {
      if (connected) {
        console.log('leaving room');
        socket.on('disconnect', () => console.log('User disconnected'));
      }
    };
  }, [connected]);

  socket.on('user joined', data => {
    console.log(data.username + ' joined');
    console.log(data);
    setUsers([...data.users]);
    addParticipantsMessage(data);
  });

  const handleLogin = name => {
    setLoggedIn(true);
    setUsername(name);
    socket.emit('add user', name);
  };

  socket.on('login', data => {
    console.log(data);
    addParticipantsMessage(data);
  });

  const addParticipantsMessage = data => {
    setMessage(`${data.username} joined the game.`);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleScoreUpdate = user => {
    socket.emit('update score', user);
  };

  socket.on('score updated', data => {
    setUsers([...data.users]);
  });

  const handleSelected = () => {
    setIsSelected(true);
    // setTimeout(() => setIsSelected(false), 3000);
  };

  return (
    <div className="App">
      {username.length ? message : null}
      {isScoreboard ? (
        <Scoreboard users={users} isSelected={isSelected} />
      ) : loggedIn ? (
        <Buzzer
          username={username}
          handleScoreUpdate={handleScoreUpdate}
          handleSelected={handleSelected}
        />
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
