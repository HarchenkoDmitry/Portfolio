import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import store from './redux/redux-store'

let render = () => {
  ReactDOM.render(
    <App state={store.getState()}/>,
    document.getElementById('root')
  );
};

store.subscribe(render);

render();
