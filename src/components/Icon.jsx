import React from 'react'

const Icon = ({ responseStaus}) => {
    if(responseStaus === 200) {
        return <i className="check icon"></i>
    }

    if(responseStaus == 500){
        return <i className="exclamation circle icon"></i>
    }
    return <i className="question circle icon"></i>
}

export default Icon;
