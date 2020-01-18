import React from 'react'

const Icon = ({ responseStaus}) => {
    if( responseStaus >= 200 &&  responseStaus < 400) {
        return <i className="check icon">{`Response Code: ${responseStaus}`}</i>
    }

    if(responseStaus >= 400){
        return <i className="exclamation circle icon">{`Response Code: ${responseStaus}`}</i>
    }
    return <i className="question circle icon"></i>
}

export default Icon;
