import { combineReducers } from 'redux';
import errorMessageReducer from './errorMessageSlice';

export const rootReducer = combineReducers({
  errorMessage: errorMessageReducer,
});
