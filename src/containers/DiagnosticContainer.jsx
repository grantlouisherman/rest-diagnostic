import React, {Component} from 'react'
import { connect } from 'react-redux'
import { uploadFiled, updateFetchBody } from '../reducers/diagnostic'

import ItemToDiagnose from '../components/ItemToDiagnose'
import { createCallAPIStrucutre, DiagnoseCalls, debounceFuncWrapper } from '../utils.js'

class DiagnosticContainer extends Component {
  state = {
    API_CALLS: {},
    idCounter: 0,
    fileReader : new FileReader(),
    uploadedFile: false,
    diagnosedCalls: {},
    showDiagnosedCallsView: false
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

  addHeader = (key, headerBody) => {
    const { API_CALLS } = this.state
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

  fileUpload = (event) => {
    this.state.fileReader.onloadend = (evt) => ( this.props.uploadFiled(this.state.fileReader) )
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
    console.log(this.props.diagnosticContent)
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
        Object.keys(this.props.diagnosticContent).length ?
        Object.keys(this.props.diagnosticContent).map((apiCallKey, idx) => (
          <ItemToDiagnose
            key={idx}
            index={apiCallKey}
            addUrlPath={debounceFuncWrapper(this.addUrlPath)}
            addHeader={debounceFuncWrapper(this.addHeader)}
          />
        ))     
        :
        <input id="the-file-input" type="file" onChange={this.fileUpload}/>
      }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { diagnostic } = state
  return {
    diagnosticContent: diagnostic
  }
}
export default connect(mapStateToProps, { uploadFiled, updateFetchBody })(DiagnosticContainer)
