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
    <div className="space-internal">
      <label for='url' className="ui horizontal label"> url </label>
      <div class="ui input">
        <input
          onChange={onChangeFetchBody}
          id={`url-${props.index}`}
          value={currentItem && currentItem.url ? currentItem.url : ""}
          />
      </div>
    </div>
    <div className="space-internal">
      <label for='headers' className="ui horizontal label"> headers </label>
      <textarea 
        className="styled-text-area"
        id={`headers-${props.index}`} 
        disabled={true}
        value={ currentItem && currentItem.headers ? JSON.stringify(currentItem.headers) : '' }
      />
      {/* <HeadersView {...currentItem.headers} /> */}
    </div>
    <div className="space-internal">
      <label for='method' className="ui horizontal label"> method </label>
      <MethodSelectTag 
        method={currentItem && currentItem.method} 
        index={props.index}
        onChangeFetchBody={onChangeFetchBody}
        />
    </div>
    <div className="space-internal">
      <label for='body' className="ui horizontal label"> body </label>
      <div class="ui input">
      <input
        onChange={onChangeFetchBody}
        id={`body-${props.index}`}
        value={currentItem && currentItem.body ? currentItem.body : ""}
        />
      </div>
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
