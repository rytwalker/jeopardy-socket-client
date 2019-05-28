import React, { useEffect } from 'react';
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

  // useEffect(() => {
  //   socket.on('update users', data => {
  //     console.log(data);
  //     setUsers([...data.users]);
  //   });
  // }, [users]);

  // useEffect(() => {
  //   if (loggedIn) {
  //     socket.on('user joined', data => {
  //       console.log(data);
  //       console.log(data.username + ' joined');
  //       setUsers([...data.users]);
  //       console.log(users);
  //       // addParticipantsMessage(data);
  //     });
  //   }
  // }, [loggedIn, users]);

  useEffect(() => {
    const { connected, loggedIn } = userState;
    console.log(socket);
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
  }, [userDispatch, userState]);

  socket.on('user joined', data => {
    console.log(data.newUser.username + ' joined');
    console.log(data);
    userDispatch({ type: ADD_USER, payload: data.newUser });
    // setUsers([...data.users]);
    addParticipantsMessage(data);
  });

  const handleLogin = name => {
    userDispatch({ type: LOGIN_USER });

    socket.emit('add user', name);
  };

  socket.on('login', data => {
    userDispatch({ type: SET_CURRENT_USER, payload: data.newUser });
  });

  const addParticipantsMessage = data => {
    userDispatch({
      type: SET_MESSAGE,
      payload: `${data.newUser.username} joined the game.`
    });
    setTimeout(() => userDispatch({ type: REMOVE_MESSAGE }), 3000);
  };

  const handleScoreUpdate = user => {
    socket.emit('update score', user);
  };

  socket.on('score updated', id => {
    userDispatch({ type: UPDATE_SCORE, payload: id });
  });

  // const handleSelected = () => {
  //   setIsSelected(true);
  //   // setTimeout(() => setIsSelected(false), 3000);
  // };

  return (
    <div className="App">
      {userState.message.length ? userState.message : null}
      {userState.scoreboard ? (
        <Scoreboard users={userState.users} />
      ) : userState.loggedIn ? (
        <Buzzer
          handleScoreUpdate={handleScoreUpdate}
          // handleSelected={handleSelected}
        />
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
