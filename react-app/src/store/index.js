import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';
import session from './session'
import jobs from './jobs'
import locations from './locations'
import bookings from './bookings'
import manager from './manager'
import job from './job'
import jobDetails from './jobDetails';
import booking from './booking'
import locationDetails from './locationDetails'
import worker from './worker'
import chart from './chart'

const rootReducer = combineReducers({
  session,
  jobs,
  bookings,
  locations,
  manager,
  job,
  jobDetails,
  booking,
  locationDetails,
  worker,
  chart
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
