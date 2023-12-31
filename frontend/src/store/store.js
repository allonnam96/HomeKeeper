import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import errors from './errors'
import contractorsReducer from './contractors';
import reviewsReducer from './reviews';
import categoriesReducer from './category';
import appointmentsReducer from './appointment';

const rootReducer = combineReducers({
  session,
  errors,
  contractors : contractorsReducer,
  reviews: reviewsReducer,
  categories : categoriesReducer,
  appointments : appointmentsReducer
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