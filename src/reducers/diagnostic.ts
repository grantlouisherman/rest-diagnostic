

import { 
    DiagnoseCalls, 
    loadYaml, 
    ConstructedFetchRequest, 
    Call, 
    Action,
    DiagnosticState,
    DiagnosticPayload,
    APICall,
    YAML
} from '../utils'

/* Actions */
const UPLOAD_FILE: string = 'UPLOAD_FILE'
const UPDATE_DIAGNOSTIC_BODY: string = 'UPDATE_DIAGNOSTIC_BODY'
const DIAGNOSE_CALLS: string = 'DIAGNOSE_CALLS'
const ERROR: string = 'ERROR'



/*  Action Creators    */
export const uploadFiled = (readFileContent: Object): Action => {
    return {
        type: UPLOAD_FILE,
        payload: readFileContent
    }
}

export const updateFetchBody = 
(
    itemKey: string, 
    value: string, 
    objectKey: string): Action => {
    return {
        type: UPDATE_DIAGNOSTIC_BODY,
        payload: {
            itemKey,
            value,
            objectKey
        }
    }
}

const diagnosCalls = (diagnosedCalls: Array<ConstructedFetchRequest> ):Action => {
    return {
        type: DIAGNOSE_CALLS,
        payload: diagnosedCalls
    }
}

const problemWithDiagnosingCalls = (err: Error): Action => {
    return {
        type: ERROR,
        payload: {
            error:true,
            data: err
        }
    }
}

export const diagnosticHandler = (callsArray: Array<ConstructedFetchRequest> ): Object => {
    return (dispatch:any) => {
        DiagnoseCalls(callsArray)
            .then(finishedCalls => dispatch(diagnosCalls(finishedCalls)))
            .catch(err => dispatch(problemWithDiagnosingCalls(err)))
    }
}

const diagnosticReducer = (state: DiagnosticState | any={diagnostic:{}}, action: Action | any) => {
    switch(action.type){
        case UPLOAD_FILE:
            const file: string = action.payload.result 
            const apisCalls: any = loadYaml(file)
            const apiArray : Array<Call> = apisCalls.calls
            const API_CALLS: APICall = {}
            apiArray.forEach((call: Call, idx:number) => {
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
