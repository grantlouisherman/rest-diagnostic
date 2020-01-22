import React from 'react'

const Button = ({ onClickMethod, buttonText}) => {
    return (
        <button onClick={onClickMethod} className="ui primary button">
          { buttonText }
        </button>
    )
}
 


export default Button