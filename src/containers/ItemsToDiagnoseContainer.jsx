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
        apiCallKeys ? apiCallKeys.map(apiCallKey => (
          <ItemToDiagnose
            key={this.props.apiCalls[apiCallKey].id}
            id={this.props.apiCalls[apiCallKey].id}
            addUrlPath={debounceFuncWrapper(this.props.addUrlPath)}
            />
        )) : null
      }
      <button onClick={this.props.addNewApiCall}>Add API CALL</button>
      </div>
    )
  }
}

export default ItemsToDiagnoseContainer
