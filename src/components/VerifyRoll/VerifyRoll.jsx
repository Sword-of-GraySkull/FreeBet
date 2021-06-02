import React from 'react'
import { useParams } from 'react-router-dom'

function VerifyRoll() {
    let params = useParams()

    console.log(params.serverSeed, "hi")
    return (
        <div>
            
        </div>
    )
}

export default VerifyRoll
