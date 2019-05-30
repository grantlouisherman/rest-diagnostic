import React, {Component} from 'react'
import ItemsToDiagnoseContainer from './ItemsToDiagnoseContainer'
import {createCallAPIStrucutre, DiagnoseCalls} from '../utils.js'

class DiagnosticContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      API_CALLS: {},
      idCounter: 0,
      fileReader : new FileReader(),
      uploadedFile: false,
      diagnosedCalls: {},
      showDiagnosedCallsView: false
    }
  }

  addNewApiCall = () => {
    const { API_CALLS, idCounter } = this.state
    API_CALLS[idCounter] = createCallAPIStrucutre(idCounter)
    let newIdCount = idCounter + 1
    this.setState({API_CALLS:API_CALLS, idCounter:newIdCount})
  }

  addUrlPath = (key, value ) => {
    const { API_CALLS } = this.state
    API_CALLS[key].url = value
    this.setState({API_CALLS})
  }

  updateFetchBody = (key, value ) => {
    const { API_CALLS } = this.state
    API_CALLS[key].body = value
    this.setState({API_CALLS})
  }

  addHeader = (key, headerBody) => {
    const { API_CALLS } = this.state
    console.log(key, headerBody)
    const stringifiedBody = JSON.stringify(headerBody)
    API_CALLS[key].headers = stringifiedBody
    this.setState({API_CALLS})
  }

  runCallDiagnostic = () => {
   DiagnoseCalls(this.state.API_CALLS)
   .then( diagnosedCalls => {
    let diagnosedCallsObject = {}
    diagnosedCalls.forEach((call, idx) => {
      diagnosedCallsObject[idx] = call
     })     
    this.setState({
      diagnosedCalls: diagnosedCallsObject, 
      showDiagnosedCallsView: true 
    })
   })
  }

  handleFileLoad = e => {
    const content = this.state.fileReader.result
    const parsedJSON = JSON.parse(content)
    const { API_CALLS } = this.state
    let { idCounter } = this.state
    parsedJSON.calls.forEach(call => {
      call.id = idCounter
      API_CALLS[idCounter] = call
      idCounter++
    })
    this.setState({API_CALLS:API_CALLS, idCounter:idCounter, uploadedFile: true})
  }
  fileUpload = (event) => {
    this.state.fileReader.onloadend = this.handleFileLoad
    this.state.fileReader.readAsText(event.target.files[0])
  }

  render() {
    if(this.state.showDiagnosedCallsView){
      return(
        <textarea name="" value={JSON.stringify(this.state.diagnosedCalls,undefined, 4)} cols="30" rows="10"/>
      )
    }
    return (
      <div>
      {
        this.state.uploadedFile ?
        <ItemsToDiagnoseContainer
          apiCalls={this.state.API_CALLS}
          addNewApiCall={this.addNewApiCall}
          addUrlPath={this.addUrlPath}
          updateFetchBody={this.updateFetchBody}
          addHeader={this.addHeader}
          runCallDiagnostic={this.runCallDiagnostic}
        /> :
        <input id="the-file-input" type="file" onChange={this.fileUpload}/>
      }
      </div>
    )
  }
}

export default DiagnosticContainer
