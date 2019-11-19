import { loadYaml } from '../utils.js'
import { DiagnoseCalls } from '../utils.js'

/* Actions */
const UPLOAD_FILE = 'UPLOAD_FILE'
const UPDATE_DIAGNOSTIC_BODY = 'UPDATE_DIAGNOSTIC_BODY'
const DIAGNOSE_CALLS = 'DIAGNOSE_CALLS'
const ERROR = 'ERROR'

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

const diagnosCalls = (diagnosedCalls ) => {
    return {
        type: DIAGNOSE_CALLS,
        payload: diagnosedCalls
    }
}

const problemWithDiagnosingCalls = (err) => {
    return {
        type: ERROR,
        payload: {
            error:true,
            data: err
        }
    }
}

export const diagnosticHandler = (callsArray) => {
    return (dispatch) => {
        DiagnoseCalls(callsArray)
            .then(finishedCalls => dispatch(diagnosCalls(finishedCalls)))
            .catch(err => dispatch(problemWithDiagnosingCalls(err)))
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


        case DIAGNOSE_CALLS:
            let callsUpdatedWithResponseInformation = state
            Object.keys(action.payload).forEach( callId => {
                let currentCall = callsUpdatedWithResponseInformation[callId]
                const { status, responseBody} = action.payload[callId]
                currentCall.status = status
            })
            return Object.assign({}, state, callsUpdatedWithResponseInformation)

            return state
        case ERROR:
            const { error, data } = action.payload
            return Object.assign({}, state, {error, data})
        default:
            return state
    }
}

export default diagnosticReducer
