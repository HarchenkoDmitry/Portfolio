import React from 'react';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import './index.css';
import Header from './components/Header';
import Profile from './components/Profile';
import Resume from './components/Resume';
import Contacts from './components/Contacts/container';
import Portfolio from './components/Portfolio/container';
import {Provider} from 'react-redux';
import store from './redux/redux-store';
import Project from './components/Project/container';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className={'App'}>
          <Header/>
          <Switch>
            <Route exact path="/" component={Profile}/>
            <Route exact path="/resume" component={Resume}/>
            <Route exact path="/contacts" component={Contacts}/>
            <Route exact path="/portfolio" component={Portfolio}/>
            <Route exact path="/portfolio/:id" component={Project}/>
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
