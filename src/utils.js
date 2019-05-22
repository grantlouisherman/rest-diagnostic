import debounce from 'lodash/debounce'
export const shouldConstructFetchRequest = (method, headers, body, url) => (
  fetch(url, {
    method,
    mode: 'cors',
    headers
  })
  .then(response => response.json())
)

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
  .then(calls => {
    console.log(calls)
  })
}
