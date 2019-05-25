import React, { useEffect } from 'react'

const MethodSelectTag = (data) => {
  useEffect(() => {
    document.getElementById(data.data || 'GET').selected = true
  });
    return (
    <select id='method'>
      <option id='GET'>GET</option>
      <option id='POST'>POST</option>
      <option id='PUT'>PUT</option>
    </select>
    )
}

export default MethodSelectTag