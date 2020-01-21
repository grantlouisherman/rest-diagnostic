import React, { useLayoutEffect } from 'react'

const MethodSelectTag = props => {
    return (
    <select
      id='method'
      onChange={props.onChangeFetchBody}
      className="ui selection dropdown" >
      <option id={`method-${props.index}-GET`}>GET</option>
      <option id={`method-${props.index}-POST`}>POST</option>
      <option id={`method-${props.index}-PUT`}>PUT</option>
    </select>
    )
}

export default MethodSelectTag
