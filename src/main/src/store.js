import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import thunkMiddleware from 'redux-thunk'
import { reducer as appReducer } from './app/reducer';

const rootReducer = combineReducers({
  app: appReducer
});

export default function configureStore(initialState) {
  const middlewares = [thunkMiddleware];
  const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)));
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  }
  return store;
}
