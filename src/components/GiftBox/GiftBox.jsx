import React, { useState, useEffect } from 'react'
import { getWagerData, getWalletData } from '../Helpers/service'
import Navbar from '../Navbar/Navbar'

import './GiftBox.css'
import Alienware from './alienware.png';
import IPhone12 from './iphone12.png';
import HeadPhones from './headPhones.png';
import SmartWatch from './smartWatches.png';
import Tshirt from './tshirt.jpg';

function GiftBox() {
    const [wallet, setWallet] = useState(0.000)
    const [wager, setWager] = useState(0)

    const handleSetWallet = () => {
        if(localStorage.getItem("userId")) {
            getWalletData(localStorage.getItem("userId"))
            .then(res => {
                setWallet(res.data.wallet)
            })
        }
    }

    const handleSetWager = () => {
        if(localStorage.getItem("userId")) {
            getWagerData(localStorage.getItem("userId"))
            .then(res => {
                setWager(res.data.wager)
            })
        }
    }

    const handleClaim = (value) => {
        console.log(value)
    }

    useEffect(() => {
        handleSetWallet()
        handleSetWager()
    })

    return (
        <div>
            <Navbar wallet={wallet}/>
            <h1 className="text-center text-white text-shadow my-4">Win Amazing and Exciting Gifts Here</h1>
            <h3 className="text-center text-white text-shadow mb-4">Your Total Wager</h3>
            <div className="text-center">
                <span className="border p-3 text-white text-shadow h5">${wager}</span>
            </div>
            <br></br>
            <div className="card card-body w-50 my-4 mx-auto bg-gradient-blue" style={{"border":"none"}}>
                <div className="">
                    <img src={Alienware} alt="tshirt" width="300" height="250"></img>
                    <h1 className="text-white text-shadow ml-2">Alienware Gaming Laptop</h1>
                    <p className="text-white text-shadow">* Wager Required : {wallet > 15000 ? <span className="text-green">$15000</span>:<span className="text-danger">$15000</span>}</p>
                </div>
                <div>
                    {wallet > 15000 
                    ? 
                    <button className="btn btn-info btn-lg float-right" value="Casual T shirt" onClick={handleClaim("Casual T shirt")}>Claim</button>
                    :
                    <button className="btn btn-info btn-lg float-right" disabled>Claim</button>
                    }
                </div>
            </div>
            <div className="card card-body w-50 my-4 mx-auto bg-gradient-gold" style={{"border":"none"}}>                
                <div>
                    <img src={IPhone12} alt="tshirt" width="300" height="250"></img>
                    <h1 className="text-white text-shadow ml-2">Iphone X</h1>
                    <p className="text-white text-shadow">* Wager Required : {wallet > 8000 ? <span className="text-green">$8000</span>:<span className="text-danger">$8000</span>}</p>
                </div>
                <div>
                    {wallet > 8000 
                    ? 
                    <button className="btn btn-info btn-lg float-right" value="Casual T shirt" onClick={handleClaim("Casual T shirt")}>Claim</button>
                    :
                    <button className="btn btn-info btn-lg float-right" disabled>Claim</button>
                    }
                </div>
            </div>
            <div className="card card-body w-50 my-4 mx-auto bg-gradient-silver" style={{"border":"none"}}>
                <div>
                    <img src={HeadPhones} alt="tshirt" width="250" height="250"></img>
                    <h1 className="text-white text-shadow ml-2">BoAt RockerZ 2000</h1>
                    <p className="text-white text-shadow">* Wager Required : {wallet > 1000 ? <span className="text-green">$1000</span>:<span className="text-danger">$1000</span>}</p>
                </div>
                <div>
                    {wallet > 1000 
                    ? 
                    <button className="btn btn-info btn-lg float-right" value="Casual T shirt" onClick={handleClaim("Casual T shirt")}>Claim</button>
                    :
                    <button className="btn btn-info btn-lg float-right" disabled>Claim</button>
                    }
                </div>
            </div>
            <div className="card card-body w-50 my-4 mx-auto bg-gradient-silver" style={{"border":"none"}}>
                <div>
                    <img src={SmartWatch} alt="tshirt" width="240" height="160"></img>
                    <h1 className="text-white text-shadow ml-2">Apple Smart Watch</h1>
                    <p className="text-white text-shadow">* Wager Required : {wallet > 200 ? <span className="text-green">$200</span>:<span className="text-danger">$200</span>}</p>
                </div>
                <div>
                    {wallet > 200 
                    ? 
                    <button className="btn btn-info btn-lg float-right" value="Casual T shirt" onClick={handleClaim("Casual T shirt")}>Claim</button>
                    :
                    <button className="btn btn-info btn-lg float-right" disabled>Claim</button>
                    }
                </div>
            </div>
            <div className="card card-body w-50 my-4 mx-auto bg-gradient-bronze" style={{"border":"none"}}>
                <div>
                    <img src={Tshirt} alt="tshirt" width="200" height="200"></img>
                    <h1 className="text-white text-shadow ml-2">Casual T shirt</h1>
                    <p className="text-white text-shadow">* Wager Required : {wallet > 100 ? <span className="text-green">$100</span>:<span className="text-danger">$100</span>}</p>
                </div>
                <div>
                    {wallet > 100 
                    ? 
                    <button className="btn btn-info btn-lg float-right" value="Casual T shirt" onClick={handleClaim("Casual T shirt")}>Claim</button>
                    :
                    <button className="btn btn-info btn-lg float-right" disabled>Claim</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default GiftBox
