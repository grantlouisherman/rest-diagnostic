import yaml from 'js-yaml'

const deconstructResponse = fetchResponse => {
  if(!Array.isArray(fetchResponse)){
    return fetchResponse
  }
  let deconstructedResponseArray = {}
  fetchResponse.forEach(responseObj => {
    deconstructedResponseArray = Object.assign({}, deconstructedResponseArray, responseObj )
  })
  return deconstructedResponseArray
}

export const shouldConstructFetchRequest = async (method, headers, query, url, callId) => {
  const body = method === 'POST' ? JSON.stringify({ query }) : null
  const options = {
    method,
    mode: 'cors',
    headers,
    body
  }
  let fetchRequest;
  let fetchRequestJson;
  try {
    fetchRequest = await fetch(url, options)
    fetchRequestJson = await fetchRequest.json()
  }catch(err){
    throw new Error("Fetch Call failed", err)
  }
  
  const responseBody = deconstructResponse(fetchRequestJson)
  return {
      status: fetchRequest.status,
      responseBody,
      callId
    }

}

export const DiagnoseCalls = calls => {
  
  const callStack = []
  for(let callKey in calls){
    const { method, headers, body, url, id } = calls[callKey]
    callStack.push(shouldConstructFetchRequest(method, headers, body, url, id))
  }
  
  return Promise.all(callStack)
  .then(calls => calls )
  .catch(console.error)
}

export const loadYaml = file => yaml.load(file)
