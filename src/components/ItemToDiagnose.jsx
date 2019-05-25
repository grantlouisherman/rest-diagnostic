import React from 'react'

import MethodSelectTag from './MethodSelectTag'

const ItemToDiagnose = (props) => (
  <div className='fetchItem'>
    <div>
      <label for='url'> url </label>
      <input
        onChange={event => ( props.addUrlPath(props.id, event.target.value))}
        id='url'
        value={props.data.url ? props.data.url : ""}
        />
    </div>
    <div>
      <label for='headers'> headers </label>
      <textarea value={props.data.headers ? JSON.stringify(props.data.headers) : "{}"}/>
    </div>
    <div>
      <label for='method'> method </label>
      <MethodSelectTag data={props.data.method} />
    </div>
    <div>
      <label for='body'> body </label>
      <input
        onChange={event => ( props.updateFetchBody(props.id, event.target.value))}
        id='body'
        value={props.data.body ? props.data.body : ""}
        />
    </div>
  </div>
)

export default ItemToDiagnose
