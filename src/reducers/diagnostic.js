
import { DiagnoseCalls } from '../utils.js'

/* Actions */
const DIAGNOSE_CALLS = 'DIAGNOSE_CALLS'
const ERROR = 'ERROR'

/*  Action Creators    */

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

        case DIAGNOSE_CALLS:
            let callsUpdatedWithResponseInformation = {}
            for(let callId in action.payload){
                let currentCall = action.payload[callId]
                const { status, responseBody} = currentCall
                callsUpdatedWithResponseInformation[callId] = {
                    status,
                    responseBody
                }
            }
            
            return Object.assign({}, state, callsUpdatedWithResponseInformation)

            
        case ERROR:
            const { error, data } = action.payload
            return Object.assign({}, state, {error, data})

        default:
            return state
    }
}

export default diagnosticReducer
