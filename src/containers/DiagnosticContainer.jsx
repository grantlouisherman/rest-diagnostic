import React, {Component} from 'react'
import ItemsToDiagnoseContainer from './ItemsToDiagnoseContainer'
import {createCallAPIStrucutre, DiagnoseCalls, loadYaml } from '../utils.js'

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

  runCallDiagnostic = async () => {
   const diagnosedCalls = await DiagnoseCalls(this.state.API_CALLS)
   this.setState({
    diagnosedCalls: { ...diagnosedCalls }, 
    showDiagnosedCallsView: true 
  })
  }

  handleFileLoad = e => {
    const content = this.state.fileReader.result
    const parsedJSON = loadYaml(content)
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

  showFileUpload = e => {
    this.setState({
      showDiagnosedCallsView: false,
      uploadedFile: false,
      diagnosedCalls: {},
      API_CALLS: {}
    })
  }

  render() {
    if(this.state.showDiagnosedCallsView){
      return(
        <div>
        <textarea value={JSON.stringify(this.state.diagnosedCalls,undefined, 4)} cols="50" rows="25" />
        <button onClick={this.showFileUpload}>Reset</button>
        </div>

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
