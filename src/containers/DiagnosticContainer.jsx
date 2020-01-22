import React, { useState } from 'react'
import { connect } from 'react-redux'
import { diagnosticHandler } from '../reducers/diagnostic'
import { uploadFiled } from '../reducers/file'

import ButtonWrapper from '../containers/ButtonWrapper'
import ItemToDiagnose from '../components/ItemToDiagnose'
import FileUploadButton from '../components/FileUploadButton'
import Button from '../components/Button'
const DiagnosticContainer = props => {
  const [isDiagnosedCallView, setDiagnosedCallView] = useState(false)
  const [diagnosedCalls, setDiagnosedCalls] = useState({})
  const [isDiagnosticContentLoaded, setDiagnosticContentLoaded] = useState(false)

  console.log(props.diagnosticContent)
  const runCallDiagnostic = async () => {
    await props.diagnosticHandler(props.fileContent)
    setDiagnosedCallView(true)
    setDiagnosedCalls({ ...props.diagnosticContent })
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

  if(props.diagnosticContent.error){
    throw new Error('You tried to upload a bad file!');
  }

    return (
 
      <div>
      {
        isDiagnosticContentLoaded ?
        Object.keys(props.fileContent).map((apiCallKey, idx) => (
          <div className="ui grid">
            <ItemToDiagnose
              key={`idx-${apiCallKey}`}
              index={apiCallKey}
              isDiagnosedCallView={isDiagnosedCallView}
            />
          </div>
        ))
        :
        <FileUploadButton fileUpload={fileUpload} />
      }
      { isDiagnosticContentLoaded ?
      <div className="btn-container">
        <Button 
          onClickMethod={runCallDiagnostic}  
          buttonText={"Diagnose Calls"}
          />
        <Button 
          onClickMethod={showFileUpload}  
          buttonText={"Reset"}
          />
      </div>
        : null }
      </div>
    )
  }


const mapStateToProps = state => {
  const { diagnostic, file } = state
  return {
    diagnosticContent: diagnostic,
    fileContent: file
  }
}
export default connect(mapStateToProps, { uploadFiled, diagnosticHandler })(DiagnosticContainer)
