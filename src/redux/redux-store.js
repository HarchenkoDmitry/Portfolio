import {createStore, combineReducers, applyMiddleware} from 'redux';
import feedbackReducer from './feedback-reducer';
import profileReducer from './profile-reducer';
import contactsReducer from './contacts-reducer';
import portfolioReducer from './portfolio-reducer';
import projectReducer from './project-reducer';
import thunk from 'redux-thunk';

let reducers = combineReducers({
  profile: profileReducer,
  feedback: feedbackReducer,
  contacts: contactsReducer,
  portfolio: portfolioReducer,
  project: projectReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

export default store;
