import { combineReducers, applyMiddleware, compose } from 'redux'
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';

import diagnostic from './diagnostic'
import file from './file'

const reducers = combineReducers({
    diagnostic,
    file
})

export default createStore(reducers, composeWithDevTools( applyMiddleware(thunk)))
