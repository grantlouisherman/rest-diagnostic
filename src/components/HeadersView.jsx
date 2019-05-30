import React from 'react'

import HeaderValues from './HeaderValues'

const HeadersView = headers => {
    let headerKeys
    if(headers){
      headerKeys = Object.keys(headers)
    }
    console.log( headers , headerKeys )
    return (
        <table>
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
        <tr>
            {
              headerKeys && headerKeys.length > 0 ? 
              headerKeys.map(headerKey => <HeaderValues key={headerKey} value={headerKey} />)
              : null
            }
        </tr>
          <tr>
          {
            headerKeys && headerKeys.length > 0 ? 
            headerKeys.map(headerKey => <HeaderValues key={headerKey} value={headers} />)
            : null
            }
          </tr>
        </table>    
    )
}

export default HeadersView