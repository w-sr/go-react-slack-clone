import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger'
import { ChatReducer } from '../reducers/user.reducer';
import { rootSaga } from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();
const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  ChatReducer,
  composeEnhancer(applyMiddleware(sagaMiddleware, logger))
);

sagaMiddleware.run(rootSaga);
