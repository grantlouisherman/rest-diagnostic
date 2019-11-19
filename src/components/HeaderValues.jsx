import React from 'react'

const HeaderValues = (key, value) => {
    return (
        <td key={key}>
            {JSON.stringify(value)}
        </td>
    )
}



export default HeaderValues