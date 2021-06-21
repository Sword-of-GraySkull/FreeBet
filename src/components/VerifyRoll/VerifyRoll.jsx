import React, {useState} from 'react'
import { useParams } from 'react-router-dom'

import { verifyRoll } from '../Helpers/service';
import spinner from './spinner2.gif';

function VerifyRoll() {
    let params = useParams()

    const [verifiedRoll, setVerifiedRoll] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const serverSeed = params.serverSeed;
    const clientSeed = params.clientSeed;
    const rollValue = params.rollValue;

    // console.log(rollValue, verifiedRoll)

    return (
        <div className="text-white text-shadow text-center">
            <h1 className=" text-center text-white text-shadow mb-4">Verify Your Roll Here</h1>
            <div className="row text-center mt-4">
                <div className="col-6">
                    <h5 className="h5">Server Seed Hash</h5>
                    <input className="border-bottom text-white" value={serverSeed} disabled></input>
                </div>
                <div className="col-6">
                    <h5 className="h5">Client Seed</h5>
                    <input className="border-bottom text-white" value={clientSeed} disabled></input>
                </div>
            </div>
            <div className="text-center mt-4">
                <h5 className="">Roll Value</h5>
                <input className="border-bottom text-white text-center" value={rollValue} disabled></input>
            </div>
            <button 
                className="btn btn-info mt-4"
                onClick={() => {
                    if(serverSeed !== undefined && clientSeed !== undefined && rollValue !== '00000') {
                        setIsLoading(true);
                        verifyRoll(serverSeed, clientSeed).then(res => {
                            // console.log(res);
                            setTimeout(()=>{
                                if(res) {
                                    setIsLoading(false);
                                    setVerifiedRoll(res.data.data);
                                }
                            }, 2000)
                        })
                    }
                }}>
                {isLoading ? <img src={spinner} width="25" height="25" alt="loading..." className="mr-2"></img>: <></>}Verify</button>
            {Number(verifiedRoll) === Number(rollValue) ?
            <div className="mt-4">
                <h5>{verifiedRoll}</h5>
                <span className="text-green">Hash Matches</span><br></br>
                {/* <a href="/" className="bg-gray text-center text-shadow" >I have Known BeeFreeMoney.com is Legit, Lets get back home</a> */}
            </div>
            :
            <></>}    
        </div>
    )
}

export default VerifyRoll
