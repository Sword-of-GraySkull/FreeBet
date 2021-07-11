import React, { useState, useEffect } from 'react'
import { getUserName, getWagerData, getWalletData } from '../Helpers/service'
import { Modal, Button } from 'react-bootstrap';

import Navbar from '../Navbar/Navbar'
import './GiftBox.css'
import Alienware from './alienware.png';
import IPhone12 from './iphone12.png';
import HeadPhones from './headPhones.png';
import SmartWatch from './smartWatches.png';
import Tshirt from './tshirt.jpg';

function GiftBox() {
    const [wallet, setWallet] = useState(0.000)
    const [wager, setWager] = useState(0.000)
    const [username, setUserName] = useState('')
    const [imgSrc, setImgSrc] = useState('')
    const [giftProduct, setGiftProduct] = useState('')

    const [showModal, setShow] = useState(false);
    const handleOpen = () => setShow(true)
    const handleClose = () => setShow(false)

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
        // console.log(value)
        handleOpen();
    }

    useEffect(() => {
        handleSetWallet()
        handleSetWager()

        if(localStorage.getItem('userId')) {
            getUserName(localStorage.getItem('userId')).then(res => {
                setUserName(res.data.username);
            })
        }
    }, [])

    return (
        <div>
            <Navbar wallet={wallet}/>
            <Modal show={showModal} onHide={handleClose} >
                <Modal.Header closeButton>
                <Modal.Title>Fill in the Details</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <div className="p-3">
                        <div className="text-center">
                            <img src={imgSrc} width="150" height="100" alt="Gift"></img><br></br>
                            <label className="h5">{giftProduct}</label>
                            <br></br>
                        </div>
                        <label className="h5 p-1">Username</label>
                        <label className="h5 border p-1 rounded" style={{"marginLeft":"65px"}}>{username}</label><br></br>
                        <label className='h5 p-1'>Password</label>
                        <input className="border rounded" style={{"marginLeft":"70px"}}></input><br></br>
                        <label className="h5 p-1">Delivery Address</label>
                        <input className=" border" style={{"marginLeft":"5px"}}></input>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                 <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Claim
                </Button> 
                </Modal.Footer> 
            </Modal>

            <h1 className="text-center text-white text-shadow my-4">Win Amazing and Exciting Gifts Here</h1>
            <h3 className="text-center text-white text-shadow mb-4">Your Total Wager</h3>
            <div className="text-center">
                <span className="border p-3 text-white text-shadow h5">${wager}</span>
            </div>
            <br></br>
            <div className="card card-body w-50 my-4 mx-auto bg-gradient-blue" style={{"border":"none"}}>
                <div className="">
                    <img src={Alienware} alt="Alienware Gaming Laptop" width="300" height="250"></img>
                    <h1 className="text-white text-shadow ml-2">Alienware Gaming Laptop</h1>
                    <p className="text-white text-shadow">* Wager Required : {wager > 15000 ? <span className="text-green">$15000</span>:<span className="text-danger">$15000</span>}</p>
                </div>
                <div>
                    {wager > 15000 
                    ? 
                    <button className="btn btn-info btn-lg float-right" value="Alienware Gaming Laptop" onClick={() => {handleClaim("Alienware Gaming Laptop"); setImgSrc(Alienware);setGiftProduct('Alienware Gaming Laptop')}}>Claim</button>
                    :
                    <button className="btn btn-info btn-lg float-right" disabled>Claim</button>
                    }
                </div>
            </div>
            <div className="card card-body w-50 my-4 mx-auto bg-gradient-gold" style={{"border":"none"}}>                
                <div>
                    <img src={IPhone12} alt="Iphone X" width="300" height="250"></img>
                    <h1 className="text-white text-shadow ml-2">Iphone X</h1>
                    <p className="text-white text-shadow">* Wager Required : {wager > 8000 ? <span className="text-green">$8000</span>:<span className="text-danger">$8000</span>}</p>
                </div>
                <div>
                    {wager > 8000 
                    ? 
                    <button className="btn btn-info btn-lg float-right" value="IphoneX" onClick={() => handleClaim("IphoneX")}>Claim</button>
                    :
                    <button className="btn btn-info btn-lg float-right" disabled>Claim</button>
                    }
                </div>
            </div>
            <div className="card card-body w-50 my-4 mx-auto bg-gradient-silver" style={{"border":"none"}}>
                <div>
                    <img src={HeadPhones} alt="BoAt RockerZ 2000" width="250" height="250"></img>
                    <h1 className="text-white text-shadow ml-2">BoAt RockerZ 2000</h1>
                    <p className="text-white text-shadow">* Wager Required : {wager > 1000 ? <span className="text-green">$1000</span>:<span className="text-danger">$1000</span>}</p>
                </div>
                <div>
                    {wager > 1000 
                    ? 
                    <button className="btn btn-info btn-lg float-right" value="BoAt RockerZ 2000" onClick={() => handleClaim("BoAt RockerZ 2000")}>Claim</button>
                    :
                    <button className="btn btn-info btn-lg float-right" disabled>Claim</button>
                    }
                </div>
            </div>
            <div className="card card-body w-50 my-4 mx-auto bg-gradient-silver" style={{"border":"none"}}>
                <div>
                    <img src={SmartWatch} alt="Apple Smart watch" width="240" height="160"></img>
                    <h1 className="text-white text-shadow ml-2">Apple Smart Watch</h1>
                    <p className="text-white text-shadow">* Wager Required : {wager > 200 ? <span className="text-green">$200</span>:<span className="text-danger">$200</span>}</p>
                </div>
                <div>
                    {wager > 200 
                    ? 
                    <button className="btn btn-info btn-lg float-right" value="Apple Smart Watch" onClick={() => handleClaim("Apple Smart Watch")}>Claim</button>
                    :
                    <button className="btn btn-info btn-lg float-right" disabled>Claim</button>
                    }
                </div>
            </div>
            <div className="card card-body w-50 my-4 mx-auto bg-gradient-bronze" style={{"border":"none"}}>
                <div>
                    <img src={Tshirt} alt="tshirt" width="200" height="200"></img>
                    <h1 className="text-white text-shadow ml-2">Casual T shirt</h1>
                    <p className="text-white text-shadow">* Wager Required : {wager > 100 ? <span className="text-green">$100</span>:<span className="text-danger">$100</span>}</p>
                </div>
                <div>
                    {wager > 100 
                    ? 
                    <button className="btn btn-info btn-lg float-right" value="Casual T shirt" onClick={() => handleClaim("Casual T shirt")}>Claim</button>
                    :
                    <button className="btn btn-info btn-lg float-right" disabled>Claim</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default GiftBox
