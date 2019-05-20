import React, {Component} from 'react'
import ItemsToDiagnoseContainer from './ItemsToDiagnoseContainer'
import {createCallAPIStrucutre} from '../utils.js'

class DiagnosticContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      API_CALLS: {
        0: createCallAPIStrucutre(0)
      },
      idCounter: 1
    }
  }

  addNewApiCall = () => {
    const { API_CALLS, idCounter } = this.state
    API_CALLS[idCounter] = createCallAPIStrucutre(idCounter)
    let newIdCount = idCounter + 1
    this.setState({API_CALLS:API_CALLS, idCounter:newIdCount})
  }

  addUrlPath = (key, value, props) => {
    const { API_CALLS } = this.state
    console.log(API_CALLS)

    API_CALLS[key].url = value
    this.setState({API_CALLS})
  }

  render() {
    return (
      <ItemsToDiagnoseContainer
        apiCalls={this.state.API_CALLS}
        addNewApiCall={this.addNewApiCall}
        addUrlPath={this.addUrlPath}
      />)
  }
}

export default DiagnosticContainer
