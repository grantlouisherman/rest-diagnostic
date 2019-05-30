import debounce from 'lodash/debounce'

const deconstructResponseArray = responseArr => {
  let deconstructedResponseArray = {}
  responseArr.forEach(responseObj => {
    deconstructedResponseArray = Object.assign({}, deconstructedResponseArray, responseObj )
  })
  return deconstructedResponseArray
}

export const shouldConstructFetchRequest = (method, headers, fetchBody, url) => {
  // const body = method === 'POST' ? fetchBody : null
  return (
      fetch(url, {
      method,
      mode: 'cors',
      headers,
    })
    .then(response => response.json()
    .then(data => ({
      status: response.status,
      responseBody: deconstructResponseArray(data)
    })))
  )
}

export const createCallAPIStrucutre = id => ({
  id,
  headers: {},
  url: '',
  body: '',
  method: 'GET'
})

export const debounceFuncWrapper = fn => debounce(fn, 1000)

export const DiagnoseCalls = calls => {
  const callStack = []
  const callStackKeys = Object.keys(calls).map(callKey => calls[callKey])
  callStackKeys.forEach( callStackKey => {
    const { method, headers, body, url } = callStackKey
    callStack.push(shouldConstructFetchRequest(method, headers, body, url))
  })
  return Promise.all(callStack)
  .then(calls => calls )
}
