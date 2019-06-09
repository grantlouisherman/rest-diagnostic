import React, { useEffect } from 'react'

const MethodSelectTag = props => {
  useEffect(() => {
    document.getElementById(`${props.method}-${props.index}` || `GET-${props.index}`).selected = true
  });
    return (
    <select id='method'>
      <option id={`GET-${props.index}`}>GET</option>
      <option id={`POST-${props.index}`}>POST</option>
      <option id={`PUT-${props.index}`}>PUT</option>
    </select>
    )
}

export default MethodSelectTag