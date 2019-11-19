import React, { useState } from 'react'
import { connect } from 'react-redux'
import { uploadFiled, updateFetchBody, diagnosticHandler } from '../reducers/diagnostic'

import ItemToDiagnose from '../components/ItemToDiagnose'

const DiagnosticContainer = props => {
  const [isDiagnosedCallView, setDiagnosedCallView] = useState(false)
  const [diagnosedCalls, setDiagnosedCalls] = useState({})
  const [isDiagnosticContentLoaded, setDiagnosticContentLoaded] = useState(false)

  const runCallDiagnostic = async () => {
    await props.diagnosticHandler(props.diagnosticContent)
    setDiagnosedCallView(true)
    setDiagnosedCalls({ ...diagnosedCalls })
  }

  const fileUpload = (event) => {
    const fileReader = new FileReader()
    fileReader.onloadend = (evt) => ( props.uploadFiled(fileReader) )
    fileReader.readAsText(event.target.files[0])
    setDiagnosticContentLoaded(true)
  }

  const showFileUpload = e => {
    setDiagnosedCallView(false)
    setDiagnosticContentLoaded(false)
  }

    return (

      <div>
      {
        isDiagnosticContentLoaded ?
        Object.keys(props.diagnosticContent).map((apiCallKey, idx) => (
          <div className="ui grid">
            <ItemToDiagnose
              key={`idx-${setDiagnosedCallView}`}
              index={apiCallKey}
              isDiagnosedCallView={isDiagnosedCallView}
            />
          </div>
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
      { isDiagnosticContentLoaded ?
      <div className="btn-container">
      <button
        onClick={runCallDiagnostic}
        className="ui primary button">
          Diagnose Calls
          </button>
        <button 
          onClick={showFileUpload}
          className="ui primary button">
            Reset
          </button>
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
export default connect(mapStateToProps, { uploadFiled, updateFetchBody, diagnosticHandler })(DiagnosticContainer)
