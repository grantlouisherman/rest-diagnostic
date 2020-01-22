import React from 'react'

const FileUploadButton = ({ fileUpload }) => {
    return (
        <div className="ui placeholder segment">
        <div className="ui icon header">
            <i className="file outline icon"></i>
                Please Upload Instructions
        </div>
        <div className="ui primary button">
            <input id="the-file-input" type="file" onChange={fileUpload}/>
         </div>
</div>
    )
}



export default FileUploadButton