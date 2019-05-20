import debounce from 'lodash/debounce'
export const shouldConstructFetchRequest = (method, headers, body, url) => (
  fetch(url, {
    method,
    mode: 'cors',
    headers,
    body: JSON.stringify(body)
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
