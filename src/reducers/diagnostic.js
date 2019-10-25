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

export const updateFetchBody = (itemKey, value, objectKey) => {
    return {
        type: UPDATE_DIAGNOSTIC_BODY,
        payload: {
            itemKey,
            value,
            objectKey
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
            const { itemKey, value, objectKey } = action.payload
            const itemWithUpdatedFetchBody = state[itemKey]
            itemWithUpdatedFetchBody[objectKey] = value
            const newStateWithUpdatedData = state
            newStateWithUpdatedData[itemKey] = itemWithUpdatedFetchBody
            return Object.assign({}, state, newStateWithUpdatedData)
            
        default:
            return state
    }
}

export default diagnosticReducer