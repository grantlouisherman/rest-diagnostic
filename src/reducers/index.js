import { combineReducers } from 'redux'
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import diagnostic from './diagnostic'

const reducers = combineReducers({
    diagnostic
})

export default createStore(reducers, composeWithDevTools())