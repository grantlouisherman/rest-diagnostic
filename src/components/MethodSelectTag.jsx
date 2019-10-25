import React, { useEffect } from 'react'

const MethodSelectTag = props => {
  useEffect(() => {
    const selectedFetchMethod = `method-${props.index}-${props.method}` || `method-${props.index}-GET`
    document.querySelector(`#${selectedFetchMethod}`).selected = true
  },[props.method, props.index]);

    return (
    <select id='method'>
      <option id={`method-${props.index}-GET`}>GET</option>
      <option id={`method-${props.index}-POST`}>POST</option>
      <option id={`method-${props.index}-PUT`}>PUT</option>
    </select>
    )
}

export default MethodSelectTag