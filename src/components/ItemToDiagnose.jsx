import React from 'react'
import { connect } from 'react-redux'

import MethodSelectTag from './MethodSelectTag'
import HeadersView  from './HeadersView'
import { updateFetchBody } from '../reducers/diagnostic'

const ItemToDiagnose = (props) => {
  const currentItem = props.diagnosticItems[props.id]
  console.log(props)
  console.log(currentItem)
  return (
    <div className='fetchItem'>
    <div>
      <label for='url'> url </label>
      <input
        onChange={event => ( props.addUrlPath(props.id, event.target.value))}
        id={`url-${props.index}`}
        value={currentItem.url ? currentItem.url : ""}
        />
    </div>
    <div>
      <label for='headers'> headers </label>
      <textarea value={ JSON.stringify(currentItem.headers) }/>
      {/* <HeadersView {...currentItem.headers} /> */}
    </div>
    <div>
      <label for='method'> method </label>
      <MethodSelectTag method={currentItem.method} index={props.index}/>
    </div>
    <div>
      <label for='body'> body </label>
      <input
        onChange={event => ( props.updateFetchBody(props.index, event.target.value))}
        id={`body-${props.index}`}
        value={currentItem.body ? currentItem.body : ""}
        />
    </div>
  </div>
  )  
}

const mapStateToProps = state => {
  const { diagnostic } = state
  console.log(state)
  return {
    diagnosticItems: diagnostic
  }
}
export default connect(mapStateToProps, { updateFetchBody })(ItemToDiagnose)
