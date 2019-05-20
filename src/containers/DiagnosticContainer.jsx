import React, {Component} from 'react'
import ItemsToDiagnoseContainer from './ItemsToDiagnoseContainer'

class DiagnosticContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      API_CALLS: []
    }
  }
  render() {
    return (<ItemsToDiagnoseContainer/>)
  }
}

export default DiagnosticContainer
