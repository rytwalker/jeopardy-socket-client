import React, { useCallback, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { useStateValue } from 'react-conflux';
import { UserContext } from './store/contexts/contexts';
import {
  ADD_USER,
  CONNECT_USER,
  DISCONNECT_USER,
  LOGIN_USER,
  REMOVE_MESSAGE,
  SET_CURRENT_USER,
  SET_MESSAGE,
  SET_SCOREBOARD,
  SET_SELECTED_USER,
  UPDATE_SCORE
} from './store/constants';
import './App.css';
import Buzzer from './components/Buzzer';
import Login from './components/Login';
import Scoreboard from './components/Scoreboard';

const endpoint = 'http://127.0.0.1:5000';
const socket = socketIOClient(endpoint);

function App() {
  const [userState, userDispatch] = useStateValue(UserContext);
  const { connected, loggedIn } = userState;

  const addParticipantsMessage = useCallback(
    data => {
      userDispatch({
        type: SET_MESSAGE,
        payload: `${data.newUser.username} joined the game.`
      });
      setTimeout(() => userDispatch({ type: REMOVE_MESSAGE }), 3000);
    },
    [userDispatch]
  );

  useEffect(() => {
    if (!connected) {
      if (window.innerWidth >= 500) {
        userDispatch({ type: SET_SCOREBOARD });
      }
      userDispatch({ type: CONNECT_USER });
    }
    return () => {
      if (connected && loggedIn) {
        console.log('leaving room');
        socket.on('disconnect', () => {
          userDispatch({ type: DISCONNECT_USER });
          console.log('User disconnected');
        });
      }
    };
  }, [connected, loggedIn, userDispatch]);

  useEffect(() => {
    socket.on('user joined', data => {
      console.log(data.newUser.username + ' joined');
      console.log(data);
      userDispatch({ type: ADD_USER, payload: data.newUser });
      addParticipantsMessage(data);
    });
  }, [addParticipantsMessage, userDispatch]);

  useEffect(() => {
    socket.on('score updated', id => {
      userDispatch({ type: UPDATE_SCORE, payload: id });
    });
  }, [userDispatch]);

  useEffect(() => {
    socket.on('login', data => {
      userDispatch({ type: SET_CURRENT_USER, payload: data.newUser });
    });
  }, [userDispatch]);

  useEffect(() => {
    socket.on('selected user', id => {
      userDispatch({ type: SET_SELECTED_USER, payload: id });
    });
  }, [userDispatch]);

  const handleLogin = name => {
    socket.emit('add user', name);
    userDispatch({ type: LOGIN_USER });
  };

  const handleScoreUpdate = user => {
    socket.emit('update score', user);
  };

  const handleSelect = user => {
    socket.emit('select user', user);
  };

  return (
    <div className="App">
      {userState.message.length ? userState.message : null}
      {userState.scoreboard ? (
        <Scoreboard users={userState.users} />
      ) : userState.loggedIn ? (
        <Buzzer
          handleScoreUpdate={handleScoreUpdate}
          handleSelect={handleSelect}
        />
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
