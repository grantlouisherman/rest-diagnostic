import React from 'react'

const ItemToDiagnose = () => (
  <div className='fetchItem'>
    <div>
      <label for='url'> url </label>
      <input id='url '/>
    </div>
    <div>
      <label for='headers'> headers </label>
      <input id='headers '/>
    </div>
    <div>
      <label for='method'> method </label>
      <select id='method'>
        <option id='GET'>GET</option>
        <option id='POST'>POST</option>
        <option id='PUT'>PUT</option>
      </select>
    </div>
    <div>
      <label for='body'> body </label>
      <input id='body '/>
    </div>
  </div>
)

export default ItemToDiagnose
