import React from 'react'

import MethodSelectTag from './MethodSelectTag'
import HeadersView  from './HeadersView'

const ItemToDiagnose = (props) => (
  <div className='fetchItem'>
    <div>
      <label for='url'> url </label>
      <input
        onChange={event => ( props.addUrlPath(props.id, event.target.value))}
        id={`url-${props.index}`}
        value={props.data.url ? props.data.url : ""}
        />
    </div>
    <div>
      <label for='headers'> headers </label>
      <textarea value={ JSON.stringify(props.data.headers) }/>
      {/* <HeadersView {...props.data.headers} /> */}
    </div>
    <div>
      <label for='method'> method </label>
      <MethodSelectTag method={props.data.method} index={props.index}/>
    </div>
    <div>
      <label for='body'> body </label>
      <input
        onChange={event => ( props.updateFetchBody(props.id, event.target.value))}
        id={`body-${props.index}`}
        value={props.data.body ? props.data.body : ""}
        />
    </div>
  </div>
)

export default ItemToDiagnose
