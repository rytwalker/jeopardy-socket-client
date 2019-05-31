import React, { useCallback, useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import { useStateValue } from 'react-conflux';
import { UserContext } from './store/contexts/contexts';
import {
  ADD_USER,
  CONNECT_USER,
  DISCONNECT_USER,
  LOGIN_USER,
  REMOVE_MESSAGE,
  REMOVE_SELECTED_USER,
  SET_CURRENT_USER,
  SET_MESSAGE,
  SET_SELECTED_USER,
  UPDATE_SCORE
} from './store/constants';
import './App.css';
import Buzzer from './components/Buzzer';
import Login from './components/Login';
import Landing from './components/Landing';
import Scoreboard from './components/Scoreboard';

const endpoint = 'http://127.0.0.1:5000';
const socket = socketIOClient(endpoint);

function App(props) {
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
      userDispatch({ type: REMOVE_SELECTED_USER });
    });
  }, [userDispatch]);

  useEffect(() => {
    socket.on('login', data => {
      userDispatch({ type: SET_CURRENT_USER, payload: data.newUser });
      props.history.push('/buzzer');
    });
  }, [userDispatch, props]);

  useEffect(() => {
    socket.on('selected user', id => {
      userDispatch({ type: SET_SELECTED_USER, payload: id });
    });
    // remove selected
    setTimeout(() => socket.emit('deselect user'), 3000);
  }, [userDispatch]);

  useEffect(() => {
    socket.on('deselected user', () => {
      userDispatch({ type: REMOVE_SELECTED_USER });
    });
  }, [userDispatch]);

  const handleLogin = name => {
    socket.emit('add user', name);
    userDispatch({ type: LOGIN_USER });
  };

  const handleScoreUpdate = user => {
    socket.emit('update score', user);
  };

  const handleDeselect = () => socket.emit('deselect user');

  const handleSelect = user => {
    socket.emit('select user', user);
  };

  return (
    <div className="App">
      {userState.message.length ? userState.message : null}
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route
          exact
          path="/scoreboard"
          render={props => <Scoreboard {...props} users={userState.users} />}
        />
        <Route
          exact
          path="/login"
          render={props => <Login {...props} handleLogin={handleLogin} />}
        />
        <Route
          exact
          path="/buzzer"
          render={props => (
            <Buzzer
              {...props}
              handleScoreUpdate={handleScoreUpdate}
              handleSelect={handleSelect}
              handleDeselect={handleDeselect}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default withRouter(App);
