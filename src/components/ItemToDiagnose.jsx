import React from 'react'
import { connect } from 'react-redux'

import MethodSelectTag from './MethodSelectTag'
import { updateFetchBody } from '../reducers/diagnostic'

const ItemToDiagnose = (props) => {
  const currentItem = props.diagnosticItems[props.index]
  const { updateFetchBody } = props
  const onChangeFetchBody = event => {
    const keyToUpdate = event.target.id.split('-')[0]
    updateFetchBody(props.index, event.target.value, keyToUpdate)
  }
  return (
    <div className='fetchItem'>
    <div>
      <label for='url'> url </label>
      <input
        onChange={onChangeFetchBody}
        id={`url-${props.index}`}
        value={currentItem && currentItem.url ? currentItem.url : ""}
        />
    </div>
    <div>
      <label for='headers'> headers </label>
      <textarea value={ currentItem && currentItem.header ? JSON.stringify(currentItem.headers) : '' }/>
      {/* <HeadersView {...currentItem.headers} /> */}
    </div>
    <div>
      <label for='method'> method </label>
      <MethodSelectTag method={currentItem && currentItem.method} index={props.index}/>
    </div>
    <div>
      <label for='body'> body </label>
      <input
        onChange={onChangeFetchBody}
        id={`body-${props.index}`}
        value={currentItem && currentItem.body ? currentItem.body : ""}
        />
    </div>
  </div>
  )  
}

const mapStateToProps = state => {
  const { diagnostic } = state
  return {
    diagnosticItems: diagnostic
  }
}
export default connect(mapStateToProps, { updateFetchBody })(ItemToDiagnose)
