import React, { Component } from 'react'
import '../App.css';
import ItemToDiagnose from '../components/ItemToDiagnose'
import { debounceFuncWrapper } from '../utils.js'

class ItemsToDiagnoseContainer extends Component {
  render(){
    const apiCallKeys = Object.keys(this.props.apiCalls)
    return (
      <div>
      {
        apiCallKeys ? apiCallKeys.map((apiCallKey, idx) => (
          <ItemToDiagnose
            key={idx}
            index={idx}
            data={this.props.apiCalls[apiCallKey]}
            addUrlPath={debounceFuncWrapper(this.props.addUrlPath)}
            updateFetchBody={debounceFuncWrapper(this.props.updateFetchBody)}
            addHeader={debounceFuncWrapper(this.props.addHeader)}
            />
        )) : null
      }
      <button onClick={this.props.runCallDiagnostic}>Diagnose Calls</button>
      </div>
    )
  }
}

export default ItemsToDiagnoseContainer
