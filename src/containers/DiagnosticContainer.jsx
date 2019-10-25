import React, { useState } from 'react'
import { connect } from 'react-redux'
import { uploadFiled, updateFetchBody } from '../reducers/diagnostic'

import ItemToDiagnose from '../components/ItemToDiagnose'
import { DiagnoseCalls } from '../utils.js'

const DiagnosticContainer = props => {
  const [isDiagnosedCallView, setDiagnosedCallView] = useState(false)
  const [diagnosedCalls, setDiagnosedCalls] = useState({})
  
  const runCallDiagnostic = async () => {
    const diagnosedCalls = await DiagnoseCalls(props.diagnosticContent)
    setDiagnosedCallView(true)
    setDiagnosedCalls({ ...diagnosedCalls })
  }

  const fileUpload = (event) => {
    const fileReader = new FileReader()
    fileReader.onloadend = (evt) => ( props.uploadFiled(fileReader) )
    fileReader.readAsText(event.target.files[0])
  }

  const showFileUpload = e => {
    setDiagnosedCallView(false)
  }

    if(isDiagnosedCallView){
      return(
        <div className="ui placeholder segment">
        <textarea value={JSON.stringify(diagnosedCalls,undefined, 4)} cols="50" rows="25" />
        <button onClick={showFileUpload}>Reset</button>
        </div>

      )
    }
    return (
      
      <div>
      {
        Object.keys(props.diagnosticContent).length ?
        Object.keys(props.diagnosticContent).map((apiCallKey, idx) => (
          <ItemToDiagnose
            key={idx}
            index={apiCallKey}
          />
        ))     
        :
        <div className="ui placeholder segment">
            <div class="ui icon header">
              <i class="file outline icon"></i>
                Please Upload Instructions
              </div>
              <div className="ui primary button">
              <input id="the-file-input" type="file" onChange={fileUpload}/>
              </div>
        </div>
      }
      { Object.keys(props.diagnosticContent).length ? 
      <div>
      <button onClick={runCallDiagnostic} className="ui primary button">
        Diagnose Calls</button> 
        <button onClick={showFileUpload}>Reset</button>
      </div>
        : null }
      </div>
    )
  }
  

const mapStateToProps = state => {
  const { diagnostic } = state
  return {
    diagnosticContent: diagnostic
  }
}
export default connect(mapStateToProps, { uploadFiled, updateFetchBody })(DiagnosticContainer)
