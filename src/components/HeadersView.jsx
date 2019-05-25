import React from 'react'

const HeadersView = headers => {
    return (
        <table>
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
        <tr>
        {
            headers ? headers.map(header => {
                <label></label>
                <input></input>
            }) : null
        }
        </tr>
        </table>
       
    )
}

export default HeadersView