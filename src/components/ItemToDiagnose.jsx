import React from 'react'

const ItemToDiagnose = (props) => (
  <div className='fetchItem'>
    <div>
      <label for='url'> url </label>
      <input
        onChange={event => ( props.addUrlPath(props.id, event.target.value))}
        id='url'
        value={props.data.url ? props.data.url : null}
        />
    </div>
    <div>
      <label for='headers'> headers </label>
      <textarea placeholder="{}" onChange={event => ( props.addHeader(props.id, event.target.value))} />
    </div>
    <div>
      <label for='method'> method </label>
      <select id='method'>
        <option id='GET'>GET</option>
        <option id='POST'>POST</option>
        <option id='PUT'>PUT</option>
      </select>
    </div>
    <div>
      <label for='body'> body </label>
      <input
        onChange={event => ( props.updateFetchBody(props.id, event.target.value))}
        id='body'
        value={props.data.body ? props.data.body : null}
        />
    </div>
  </div>
)

export default ItemToDiagnose
