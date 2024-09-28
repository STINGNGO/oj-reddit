// store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import postsReducer from './reducers'; // Import the reducer

const rootReducer = combineReducers({
  posts: postsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
