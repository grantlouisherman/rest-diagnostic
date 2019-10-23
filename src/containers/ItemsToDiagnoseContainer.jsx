import React, { Component } from 'react'
import '../App.css';
import ItemToDiagnose from '../components/ItemToDiagnose'
import { debounceFuncWrapper } from '../utils.js'

class ItemsToDiagnoseContainer extends Component {
  render(){
    const apiCallKeys = Object.keys(this.props.apiCalls)
    console.log(this.props.apiCalls)
    return (
      <div>
      {
        apiCallKeys ? apiCallKeys.map((apiCallKey, idx) => (
          <ItemToDiagnose
            key={idx}
            index={idx}
            id={this.props.apiCalls[apiCallKey].id}
            addUrlPath={debounceFuncWrapper(this.props.addUrlPath)}
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
