// <i className="plus icon circle"></i>
// <i className="exclamation circle icon"></i>
// <i className="question circle icon"></i>
import React from 'react'

const Icon = ({ responseStaus}) => {
    if(responseStaus === 200) {
        return <i className="plus icon circle"></i>
    }

    if(responseStaus == 500){
        return <i className="exclamation circle icon"></i>
    }
    return <i className="question circle icon"></i>
}

export default Icon;
