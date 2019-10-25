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

export const shouldConstructFetchRequest = async (method, headers, query, url) => {
  const body = method === 'POST' ? JSON.stringify({ query }) : null
  const options = {
    method,
    mode: 'cors',
    headers,
    body
  }
  const fetchRequest = await fetch(url, options)
  const fetchRequestJson = await fetchRequest.json()
  const responseBody = deconstructResponse(fetchRequestJson)
  return {
      status: fetchRequest.status,
      responseBody
    }

}

export const createCallAPIStrucutre = id => ({
  id,
  headers: {},
  url: '',
  body: '',
  method: 'GET'
})

export const DiagnoseCalls = calls => {
  const callStack = []
  const callStackKeys = Object.keys(calls).map(callKey => calls[callKey])
  callStackKeys.forEach( callStackKey => {
    const { method, headers, body, url } = callStackKey
    callStack.push(shouldConstructFetchRequest(method, headers, body, url))
  })
  return Promise.all(callStack)
  .then(calls => calls )
  .catch(console.error)
}

export const loadYaml = file => yaml.load(file)
