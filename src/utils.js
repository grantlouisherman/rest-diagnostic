export const shouldConstructFetchRequest = (method, headers, body, url) => (
  fetch(url, {
    method,
    mode: 'cors',
    headers,
    body: JSON.stringify(body)
  })
  .then(response => response.json())
)

export const createCallAPIStrucutre = () => ({
  id: 0,
  headers: {},
  url: '',
  body: ''
})
