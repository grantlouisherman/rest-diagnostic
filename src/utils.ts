import yaml from 'js-yaml'

interface ConstrcutedFetchRequest {
  status: number;
  responseBody: Object;
  callId: number;
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
  callId: number): Promise<ConstrcutedFetchRequest> => {

  const body: string = method === 'POST' ? JSON.stringify({ query }) : null
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

export const DiagnoseCalls = (calls: Object): Promise<any> => {
  const callStack = []
  const callStackKeys: Array<any> = Object.keys(calls).map(callKey => calls[callKey])
  callStackKeys.forEach( callStackKey => {
    const { method, headers, body, url, id } = callStackKey
    callStack.push(shouldConstructFetchRequest(method, headers, body, url, id))
  })
  return Promise.all(callStack)
  .then(calls => calls )
  .catch(console.error)
}

export const loadYaml = (file: string): File => yaml.load(file)
