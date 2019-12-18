import yaml from 'js-yaml'

export interface ConstructedFetchRequest {
  status: number;
  responseBody: Object;
  callId: number;
}

export interface APICall {
  [key: number]: Call
}

export interface DiagnosticPayload {
  itemKey: string,
  value: string,
  objectKey: string,
  result: string
}

export interface Call {
  id: number | any,
  headers: Object | any,
  url: string | any,
  body: string | any,
  method: string | any
}

export interface Action {
  type: string,
  payload: Object | DiagnosticPayload
}

export interface YAML {
  calls: any
}

export interface DiagnosticState {
  diagnostic:  Object | Array<ConstructedFetchRequest>
}

const deconstructResponse = (fetchResponse: Response): Object => {
  if(!Array.isArray(fetchResponse)){
    return fetchResponse
  }
  let deconstructedResponseArray: Object = {}
  fetchResponse.forEach(responseObj => {
    deconstructedResponseArray = Object.assign({}, deconstructedResponseArray, responseObj )
  })
  return deconstructedResponseArray
}

export const shouldConstructFetchRequest = async (
  method: string, 
  headers: Object, 
  query: Object, 
  url: string, 
  callId: number): Promise<ConstructedFetchRequest> => {

  const body: string | null = method === 'POST' ? JSON.stringify({ query }) : null
  const options: Object = {
    method,
    mode: 'cors',
    headers,
    body
  }
  const fetchRequest: Response = await fetch(url, options)
  const fetchRequestJson: Response = await fetchRequest.json()
  const responseBody: Object = deconstructResponse(fetchRequestJson)
  return {
      status: fetchRequest.status,
      responseBody,
      callId
    }

}

export const DiagnoseCalls = (calls: any): Promise<any> => {
  const callStack: Array<any> = []
  const callStackKeys: Array<any> = Object.keys(calls).map((callKey:string)=> calls[callKey])
  callStackKeys.forEach( callStackKey => {
    const { method, headers, body, url, id } = callStackKey
    callStack.push(shouldConstructFetchRequest(method, headers, body, url, id))
  })
  return Promise.all(callStack)
  .then(calls => calls )
  .catch(console.error)
}

export const loadYaml = (file: string): Object => yaml.load(file)
