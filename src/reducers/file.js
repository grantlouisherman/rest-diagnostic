import { loadYaml } from '../utils.js'

const UPLOAD_FILE = 'UPLOAD_FILE'
const UPDATE_DIAGNOSTIC_BODY = 'UPDATE_DIAGNOSTIC_BODY'

/*  Action Creators    */
export const uploadFiled = (readFileContent) => {
    return {
        type: UPLOAD_FILE,
        payload: readFileContent
    }
}

export const updateFetchBody = (itemKey, value, objectKey, mapObject) => {
    return {
        type: UPDATE_DIAGNOSTIC_BODY,
        payload: {
            itemKey,
            value,
            objectKey,
            mapObject
        }
    }
}


const fileReducer = (state={}, action) => {
    switch(action.type){
        case UPLOAD_FILE:
            try{ 
            const file = action.payload.result
            const apisCalls = loadYaml(file).calls
            const API_CALLS = {}
            for(let apiIndex in apisCalls){
                const currentCall = apisCalls[apiIndex]
                currentCall.id = apiIndex
                API_CALLS[apiIndex] = currentCall
            }
                return Object.assign({}, state, API_CALLS)
            } catch(err){
                return Object.assign({}, state, {error: true})
            }
        
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

export default fileReducer