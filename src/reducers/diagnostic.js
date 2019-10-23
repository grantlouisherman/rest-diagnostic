import { loadYaml } from '../utils.js'

/* Actions */
const UPLOAD_FILE = 'UPLOAD_FILE'
const UPDATE_DIAGNOSTIC_BODY = 'UPDATE_DIAGNOSTIC_BODY'

/*  Action Creators    */
export const uploadFiled = (readFileContent) => {
    return {
        type: UPLOAD_FILE,
        payload: readFileContent
    }
}

export const updateFetchBody = (key, value) => {
    return {
        type: UPDATE_DIAGNOSTIC_BODY,
        payload: {
            key,
            value
        }
    }
}

const diagnosticReducer = (state={}, action) => {
    switch(action.type){
        case UPLOAD_FILE:
            const file = action.payload.result
            const apisCalls = loadYaml(file).calls
            const API_CALLS = {}
            apisCalls.forEach((call, idx) => {
                call.id = idx
                API_CALLS[idx] = call
              })
              return Object.assign({}, state, API_CALLS)

        case UPDATE_DIAGNOSTIC_BODY:
            const { key, value } = action.payload
            const itemWithUpdatedFetchBody = state[key]
            itemWithUpdatedFetchBody.body = value
            return Object.assign({}, state, itemWithUpdatedFetchBody)
            
        default:
            return state
    }
}

export default diagnosticReducer