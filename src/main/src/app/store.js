import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import thunkMiddleware from 'redux-thunk'
import { reducersByDomain } from './reducers';

export default function configureStore(initialState) {
  const middlewares = [thunkMiddleware];
  const store = createStore(reducersByDomain, initialState, composeWithDevTools(applyMiddleware(...middlewares)));
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(reducersByDomain))
  }
  return store;
}
