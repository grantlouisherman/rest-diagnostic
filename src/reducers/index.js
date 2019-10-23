import { combineReducers } from 'redux'
import { createStore } from 'redux'

import diagnostic from './diagnostic'

const reducers = combineReducers({
    diagnostic
})

export default createStore(reducers)