import React, { useState, useEffect } from 'react'
// import ReactDOM from 'react-dom'
import logo from '../../logo.svg';

import { getWalletData, setWalletData, pushFakeDoorHistory, setWagerData, getWagerData } from '../Helpers/service'
import Navbar from '../Navbar/Navbar'
import './FakeDoor.scss'
import { useToasts } from 'react-toast-notifications'
import LoggedUser from '../LoggedUser/LoggedUser'

function FakeDoor() {
    const { addToast } = useToasts()
    const [wallet, setWallet] = useState(0.000)
    const [betAmount, setBetAmount] = useState(0.001)
    const [diffLvl, setDiffLvl] = useState(3) 
    const [result, setResult] = useState([0,0,0]) 
    const [index, setIndex] = useState()
    const [className, setClassName] = useState("door") 
    const [win, setWin] = useState(false)   
    const [takeaway, setTakeaway] = useState(0)
    const [wager, setWager] = useState(0)
    const [history, setHistory] = useState(false)
    // const [prizeIndex, setPrizeIndex] = useState()
    // const [margin, setmargin] = useState(0)

    const arr3 = ['001', '010', '100']
    const arr4 = ['0001', '0010', '0100', '1000']
    const arr5 = ['00001', '00010', '00100', '01000', '10000']
    const arr6 = ['000001', '000010', '000100', '001000', '010000', '100000']

    const FakeDoorHistory = {
        betAmount: betAmount,
        win: win ? 'Win' : 'Lose',
        takeaway: takeaway,
        date: new Date().toLocaleDateString("en-IN"),
        time: new Date().toLocaleTimeString(),
        wallet: wallet
    }



    const handleSetWallet = () => {
        if(localStorage.getItem("userId")) {
            getWalletData(localStorage.getItem("userId")).then(res => {
                // console.log(res.data.wallet)
                setWallet((res.data.wallet))
            })
        }
    }

    const handleFakeDoor = (ind) => {
        // console.log(document.getElementById(index).textContent)
        if(className !== "door doorOpen") {
            setIndex(ind)
            if(diffLvl === 3) {
                let index = Math.floor(Math.random() * 3)
                let list = arr3[index].split('')
                // console.log(list)
                setResult(list)
            }
            else if(diffLvl === 4) {
                let index = Math.floor(Math.random() * 4)
                let list = arr4[index].split('')
                // console.log(list)
                setResult(list)
            }
            else if(diffLvl === 5) {
                let index = Math.floor(Math.random() * 5)
                let list = arr5[index].split('')
                // console.log(list)
                setResult(list)
            }
            else if(diffLvl === 6) {
                let index = Math.floor(Math.random() * 6)
                let list = arr6[index].split('')
                // console.log(list)
                setResult(list)
            }
        }
    }

    const handleValidation = () => {
        if(!betAmount) {
            addToast("You need to place a Bet Amount first !", {
                appearance: 'info',
                autoDismiss: true
            })
            return false
        }
        if(betAmount > 20) {
            addToast("BetAmount can't be greater than 20", {
                appearance: 'info',
                autoDismiss: true
            })
            return false
        }
        if(betAmount < 0.001) {
            addToast("Minimum BetAmount is 0.001", {
                appearance: 'info',
                autoDismiss: true
            })
            return false
        }
        if(wallet < (betAmount * diffLvl)) {
            addToast("You don't have enough money to place the bet", {
                appearance: 'info',
                autoDismiss: true
            })
            return false
        }
        return true
    }

    const handleHistory = () => {
        if(result.join('') !== [0, 0, 0].join('') && result.join('') !== [0, 0, 0, 0].join('') && result.join('') !== [0, 0, 0, 0, 0].join('') && result.join('') !== [0, 0, 0, 0, 0, 0].join('')) {
            let userId = localStorage.getItem('userId');
            pushFakeDoorHistory( userId, FakeDoorHistory)
        }
    }

    const handleSetWager = () => {
        if(localStorage.getItem("userId")) {
            getWagerData(localStorage.getItem("userId"))
            .then(res => {
                console.log("res", res);
                setWager(res.data.wager)
            })
        }
    }

    useEffect(() => {
        handleSetWallet()
        // handleSetWager()
    })

    useEffect(() => {
        // console.log(result[index], result, index)
        // console.log(result[index] === '1')
        // console.log(result, [0, 0, 0, 0, 0] , result.join('') === [0, 0, 0, 0, 0].join(''))
    
        if(result[index] === '1') {
            // setPrizeIndex(index)
            addToast(`You have Found the Real Door!! +${diffLvl * betAmount} added to wallet`, {
                appearance: 'success',
                autoDismiss: true
            })
            // console.log((Number(wallet) + Number(0.01*diffLvl)).toFixed(2))
            let tk = Number(betAmount*diffLvl)
            setWalletData(localStorage.getItem("userId"),(Number(wallet) + Number(betAmount*diffLvl)).toFixed(3))
            let w = Number(wallet) + Number(betAmount*diffLvl)
            setWallet(w.toFixed(3))
            setTakeaway(tk)
            setHistory(!history)
            setWin(true)
        }
        else {
            if(result.join('') !== [0, 0, 0].join('') && result.join('') !== [0, 0, 0, 0].join('') && result.join('') !== [0, 0, 0, 0, 0].join('') && result.join('') !== [0, 0, 0, 0, 0, 0].join('')) {
                addToast(`Uh Oh, You have opened the fake door!! -${diffLvl * betAmount} reduced from wallet`, {
                    appearance: 'error',
                    autoDismiss: true
                })
                // console.log((wallet + (0.01*diffLvl)))
                let tk = -Number(betAmount*diffLvl)
                setWalletData(localStorage.getItem("userId"),(Number(wallet) - Number(betAmount*diffLvl)).toFixed(3))
                let w = Number(wallet) - Number(betAmount*diffLvl)
                setWallet(w.toFixed(3))
                setTakeaway(tk)
                setHistory(!history)
                setWin(false)
            }    
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result, index])

    useEffect(() => {
        if(localStorage.getItem('userId')) {
            handleHistory()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history])

    useEffect(() => {
        handleSetWager();
        // console.log("hi")
    }, [wager])

    function toggleDoor() {
        // console.log("ji")
        // let list = document.getElementsByClassName("door");
        // ReactDOM.findDOMNode(list).classList.toggle("doorOpen");
        // console.log("hi")
        if(className === "door") {
            // console.log("ji")
            setClassName("door doorOpen")
        }
        else {
            // console.log("ki")
            setClassName("door")
        }
    }

    return (
        <div className="text-white">
            <Navbar wallet={wallet}/>
            <LoggedUser />
            <div className="display-4 text-center text-shadow my-4">Welcome to Fake Door</div>
            <h1 className="text-center text-shadow mb-4 pb-5">Everything you see around here is not <div className="text-danger text-center"><span className="real"></span></div></h1>
            <div className="row">
                {result.map((li, index) => {
                    return(
                        <div className="col-4 text-center my-4">
                            {/* <div className="lid"></div> */}
                            {/* <div className="p-3 border" id={index} onClick={() => {handleFakeDoor(index);toggleDoor()}}>{li}</div> */}
                            <div class="backDoor">
                                <div className={className} id={index} onClick={() => {
                                    if(handleValidation()) {
                                        if(className !== "door doorOpen") {
                                            console.log(wager, betAmount)
                                            let w = Number(wager) + Number(betAmount);
                                            setWager(w.toFixed(3))                              //////////// Wager Implementation
                                            setWagerData(localStorage.getItem("userId"), w.toFixed(3))
                                        }
                                        handleFakeDoor(index);
                                        toggleDoor();
                                    }
                                    }}>
                                </div>
                                {/* {console.log(li)} */}
                                {li === '1'
                                ? 
                                <>
                                    <img src={logo} alt="prize" />
                                </>
                                : 
                                <></>}
                            </div>
                        </div>
                    )
                })}
            </div>
            <h3 className="text-center text-shadow mt-4 mb-2">Difficulty Level</h3>
            <div className="d-inline-block text-center mb-4 w-100">
                <button className="btn btn-info mx-2" onClick={() => {setDiffLvl(3);setResult([0,0,0])}}>3</button>
                <button className="btn btn-info mx-2" onClick={() => {setDiffLvl(4);setResult([0,0,0,0])}}>4</button>
                <button className="btn btn-info mx-2" onClick={() => {setDiffLvl(5);setResult([0,0,0,0,0])}}>5</button>
                <button className="btn btn-info mx-2" onClick={() => {setDiffLvl(6);setResult([0,0,0,0,0,0])}}>6</button>
            </div>
            <div className="text-center text-shadow my-4">
                <label className="h5">Bet Amount</label>
                <input 
                    className="rounded borderless mx-3"
                    value={betAmount}
                    onChange={event => setBetAmount(event.target.value)}></input>
            </div>
            <h3 className="text-center text-shadow mb-3">Higher the Difficulty Level, Higher the Profit You Earn</h3>
         {/* <div className="text-center m-auto">
<div class="hexagon one">
<div class="text">
<h1>89%</h1>
<p>My Overall Score</p>
</div>
</div>
<div class="hexagon two">
<div class="text">
<h1>89%</h1>
<p>My Overall Score</p>
</div>
</div>
<div class="hexagon three">
<div class="text">
<h1>89%</h1>
<p>My Overall Score</p>
</div>
</div><br></br>
<div class="hexagon four">
<div class="text">
<h1>89%</h1>
<p>My Overall Score</p>
</div>
</div>
<div class="hexagon five">
<div class="text">
<h1>89%</h1>
<p>My Overall Score</p>
</div>
</div>
<div class="hexagon six">
<div class="text">
<h1>89%</h1>
<p>My Overall Score</p>
</div>
</div>
</div>    */}
        </div>
    )
}

export default FakeDoor