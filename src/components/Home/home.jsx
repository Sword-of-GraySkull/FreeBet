// Version 1.0.3    user loggedin state added

import React, { useState, useEffect } from 'react'
import { useToasts } from 'react-toast-notifications';

import './home.css';
import transaction from './24-money.gif';
import Navbar from '../Navbar/Navbar';
import { roll, getWalletData, setWalletData, pushRollHistory } from '../Helpers/service';
// import { Modal } from "react-bootstrap";

function Home() {
    const { addToast } = useToasts()
    const [faucet, setFaucet] = useState(10000);
    const [disable, setDisable] = useState(false);
    //User logged in state
    // const initialWallet = '0.0';
    const [userId, setUserId] = useState()
    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')
    const [takeaway, setTakeAway] = useState(0.00)
    const [win, setWin] = useState(false)
    const [wallet, setWallet] = useState('0.00')
    const [history, setHistory] = useState(false)
    // const [rollData, setRollData] = useState([])

    // const registerData = {
    //     username : username,
    //     password: password, 
    //     wallet: initialWallet
    // }
    // const loginData = {
    //     username: username,
    //     password: password
    // }
    const rollHistory = {
        rollValue: faucet,
        win: win ? 'Win' : 'Lose',
        takeaway: takeaway,
        date: new Date().toLocaleDateString(),
        wallet: wallet
    }
    // const [showModal, setShow] = useState(false);
    // const [register, setRegister] = useState(false);

    // console.log(wallet+1.0)

    const handleRoll = () => {
        roll()
        .then(x => {
            setFaucet(x);
        });        
        handleDisable()
    }

    const handleDisable = () => {
        var time = new Date().getMinutes()
        var hr = new Date().getHours()
        let stopHr;
        let stopTime;
        if(localStorage.getItem("stopTime")) {
            stopTime = localStorage.getItem("stopTime")
        } else {
            stopTime = time + 1;
            stopHr = hr;
            if(stopTime >= 60) stopTime = stopTime - 60
            localStorage.setItem("stopTime", stopTime)
            localStorage.setItem("stopHr", stopHr)
        }
        let currTime;
        let currHr;
        let a = setInterval(() => {
            setDisable(true)
            currTime = new Date().getMinutes()
            currHr = new Date().getHours()
            // console.log(currHr, Number(stopHr))
            if(currHr > Number(stopHr) && currTime === Number(stopTime)) {
                setDisable(false)
                localStorage.removeItem("stopHr")
                localStorage.removeItem("stopTime")
                clearInterval(a)
            }
            else if(currTime === Number(stopTime)) {
                // console.log(currTime, stopTime)
                setDisable(false)
                localStorage.removeItem("stopTime")
                localStorage.removeItem("stopHr")
                clearInterval(a)
            }
        }, 1000)
    }

    const handleTakeaway = () => {
        if (faucet <= 9999 && faucet >= 9800) {
            let w = Number(wallet) + 0.90
            setWalletData(userId, w.toFixed(2))
            setWallet(w.toFixed(2))
            setHistory(!history)
            setTakeAway(0.90)
            // setWallet(Number(wallet) + 0.90)
            setWin(true)
            // addToast('You Won', {
            //     appearance: 'success',
            //     autoDismiss: true
            // })
        } else if (faucet < 9800 && faucet >= 9500) {
            let w = Number(wallet) + 0.09
            setWalletData(userId, w.toFixed(2))
            setWallet(w.toFixed(2))
            setTakeAway(0.09)
            setHistory(!history)
            // setWallet(Number(wallet) + 0.09)
            setWin(true)
            addToast(`Woohoo, You Won Free money out of Nothing`, {
                appearance: 'success',
                autoDismiss: true
            })
        } else if (faucet < 8000 && faucet >= 0) {
            let w = Number(wallet) + 0.01
            setWalletData(userId, w.toFixed(2))
            setWallet(w.toFixed(2))
            setTakeAway(0.01)
            setHistory(!history)
            // console.log(getWalletData(userId).then(res => {
            //     return res.data.wallet
            //     // console.log(res.data.wallet)
            // }))
            // setWallet(Number(wallet) + 0.01)
            setWin(true)
            addToast(`Woohoo, You Won Free money out of Nothing`, {
                appearance: 'success',
                autoDismiss: true
            })
        } else {
            if(faucet !== 10000) {
                setWin(false)
                setHistory(!history)
                setTakeAway(0.00)
                addToast('Oh bugger, lack of luck it seems. You get Nothing', {
                    appearance: 'warning',
                    autoDismiss: true
            })
            }
        }
    }

    const handleSetWallet = () => {
        if(localStorage.getItem("userId")) {
            getWalletData(localStorage.getItem("userId")).then(res => {
                // console.log(res.data.wallet)
                setWallet((res.data.wallet))
            })
        } 
    }

    const handleSetRollHistory = () => {
        if(faucet !== 10000) {
            // console.log('rollValue', faucet)
            // console.log("takeaway", takeaway)
            // console.log('win/lose', win)
            // console.log('wallet', wallet)
            // console.log(new Date().toLocaleDateString())
            pushRollHistory(userId, rollHistory)
        }
    }

    const handleGetRollHistory = () => {
        // getRollHistory(userId)
        // .then(res => {
        //     const { data } = res;
        //     // console.log(data.[0].rollHistory.[0].rollValue)
        //     setRollData(data.[0].rollHistory)
        // })
    }

    // const handleOpen = () => setShow(true)

    // const handleClose = () => setShow(false)

    useEffect(() => {
        const loggedInUser = localStorage.getItem("userId");
        if (loggedInUser) {
        // const foundUser = JSON.parse(loggedInUser);
        setUserId(loggedInUser);
        }

        // freebet
        if(localStorage.getItem("stopTime")) {
            setDisable(true)
            handleDisable()
        }
    }, [])

    useEffect(() => {
        handleSetWallet()
    })

    // console.log('takeaway', takeaway)

    useEffect(() => {
        handleTakeaway()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [faucet])

    useEffect(() => {
        handleSetRollHistory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history])
    
    return (
        <div>
            <Navbar wallet={wallet}/>
            <div className="row p-4">
                <div className="col-6 p-4 text-center"><img src={transaction} width="300" height="300" alt="transaction"/></div>
                <div className="col-6">
                    <span className="display-3">Make your transactions in a snap</span>
                    <div className="row py-3 my-4">
                        <div className="col-6 text-center">
                            <button className="btn btn-info btn-lg mx-3">Deposit</button>
                            <button className="btn btn-info btn-lg mx-3">Withdraw</button>
                        </div>
                        <div className="col-6 text-center">
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-3 bg-gray text-center text-white">
                <span className="display-4">Get Free Money For Every 45 Minutes</span>
            </div>
            <div className="my-4 px-4 w-100">
                <table className="table table-bordered m-auto w-50">
                    <thead>
                        <tr>
                            <th scope="col">Roll</th>
                            <th scope="col">Prize</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">9999-9800</th>
                            <td>1.0000</td>
                        </tr>
                        <tr>
                            <th scope="row">9800-9500</th>
                            <td>0.0090</td>
                        </tr>
                        <tr>
                            <th scope="row">9500-0</th>
                            <td>0.0009</td>
                        </tr>
                    </tbody>
                </table>
                <div className="w-100 text-center bg-gray p-4 my-4">
                    <div className="text-center my-4"><span className="border m-auto display-4 p-3 text-white">{faucet}</span></div><br></br>
                    {disable ?
                        <button 
                        className="btn btn-primary btn-lg m-2 disabled" 
                        onClick={() => {
                            if(userId) {
                                // handleRoll()
                                // handleTakeaway()
                            }
                            else {
                                window.history.pushState('', 'login', 'FreeBet/#/login')
                                window.location.reload(false)
                                /*setRegister(false)
                                setUsername('')
                                setPassword('')
                                handleOpen()*/
                            }
                        }}
                        disabled
                        >ROLL</button>
                    :
                    <button 
                        className="btn btn-primary btn-lg m-2" 
                        onClick={() => {
                            if(userId) {
                                handleRoll()
                                // handleGetRollHistory()
                                // console.log(rollData)
                                // handleTakeaway()
                            }
                            else {
                                window.history.pushState('', 'login', 'FreeBet/#/login')
                                window.location.reload(false)
                                // setRegister(false)
                                // setUsername('')
                                // setPassword('')
                                // handleOpen()
                            }
                        }}
                    >ROLL</button>}  
                    {/* {win
                    ?
                        <h1 className=".animated .fadeIn">You Won</h1>
                    :
                    <></>
                    }   */}
                </div>
                
                {/* {faucet !== 10000 
                ? 
                <>
                <button className="btn btn-primary btn-lg mb-3" onClick={() => handleGetRollHistory()}>Refresh Roll History</button>
                <table className="table table-bordered m-auto text-center">
                    <thead>
                        <th>SNO</th>
                        <th>RollValue</th>
                        <th>Win/Lose</th>
                        <th>Roll Takeaway</th>
                        <th>Wallet</th>
                    </thead>
                    {rollData.map((item, index) => {
                    return (
                    <tbody>
                        <th>{index}</th>
                        <td>{item.rollValue}</td>
                        {item.win === 'Win' ?
                            <td className="text-darkGreen">{item.win}</td>
                        :
                            <td className="text-danger">{item.win}</td>
                        }
                        <td>{item.takeaway}</td>
                        <td>{item.wallet}</td>
                    </tbody>)})}
                </table> 
                </>
                :
                <>
                </>
                } */}
            </div>
        </div>
        
    )
}

export default Home


// Version 1.0.2    Roll works perfectly
// data-toggle="tooltip" data-placement="top" title="Tooltip on top"

// import React, { useState } from 'react'

// import './home.css';
// import transaction from './24-money.gif';
// import Navbar from '../Navbar/Navbar';
// import { roll } from '../Helpers/service';

// function Home() {
//     const [faucet, setFaucet] = useState(10000);

//     const handleRoll = () => {
//         roll()
//         .then(x => {
//             setFaucet(x);
//         });
//     }

//     return (
//         <div>
//             {/* <nav className="nav-bar">
//                 <span className="fs-4 nav-item">FREE MONEY</span>
//                 <span className="float-right nav-item">
//                     <div class="pos-f-t">
//                     <div class="collapse" id="navbarToggleExternalContent">
//                         <div class="bg-dark p-4">
//                         <h4 class="text-white">Collapsed content</h4>
//                         <span class="text-muted">Toggleable via the navbar brand.</span>
//                         </div>
//                     </div>
//                     <nav class="navbar navbar-dark bg-dark">
//                         <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
//                         <span class="navbar-toggler-icon"></span>
//                         </button>
//                     </nav>
//                     </div>
//                 </span>
//                 <span className="float-right nav-item">$0.000000000</span>
//             </nav> */}
//             <Navbar />
//             <div className="row p-4">
//                 <div className="col-6 p-4 text-center"><img src={transaction} width="300" height="300" alt="transaction"/></div>
//                 <div className="col-6">
//                     <span className="display-3">Make your transactions in a snap</span>
//                     <div className="row py-3 my-4">
//                         <div className="col-6 text-center">
//                             <button className="btn btn-info btn-lg mx-3">Deposit</button>
//                             <button className="btn btn-info btn-lg mx-3">Withdraw</button>
//                         </div>
//                         <div className="col-6 text-center">
//                             {/* <button className="btn btn-info btn-lg m-auto">Withdraw</button> */}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="p-3 bg-gray text-center text-white">
//                 <span className="display-4">Get Free Money For Every 45 Minutes</span>
//             </div>
//             <div className="my-4 px-4 w-100">
//                 <table class="table table-bordered m-auto w-50">
//                     <thead>
//                         <tr>
//                             <th scope="col">Roll</th>
//                             <th scope="col">Prize</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <th scope="row">10000</th>
//                             <td>1.0000</td>
//                         </tr>
//                         <tr>
//                             <th scope="row">9999-9800</th>
//                             <td>0.0090</td>
//                         </tr>
//                         <tr>
//                             <th scope="row">9800-1000</th>
//                             <td>0.0009</td>
//                         </tr>
//                     </tbody>
//                 </table>
//                 <div className="w-100 text-center bg-gray p-4 my-4">
//                     <div className="text-center my-4"><span className="border m-auto display-4 p-3 text-white">{faucet}</span></div><br></br>
//                     <button className="btn btn-primary btn-lg m-2" onClick={() => handleRoll()}>ROLL</button>    
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Home



// Version 1.0.1


// import React, { useState } from 'react'
// import ReCAPTCHA from 'react-google-recaptcha';

// import './home.css';
// import transaction from './24-money.gif';
// import { roll } from '../Helpers/service';

// function Home() {
//     const [isNavCollapsed, setIsNavCollapsed] = useState(true);
//     const [faucet, setFaucet] = useState(10000);
//     const reCaptchaRef = React.createRef();

//     const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

//     const handleRoll = () => {
//         console.log("its working")
//         roll()
//         .then(x => {
//             // console.log(x);
//             setFaucet(x);
//         });
//     }

//     function onSubmit () {
//         const recaptchaValue = reCaptchaRef.current.getValue();
//         this.props.onSubmit(recaptchaValue);
//     }

//     function onChange (value) {
//         console.log("CAPTCHA value : ", value)
//     }

//     return (
//         <div>
//             <nav class="navbar navbar-expand-lg navbar-light bg-light rounded">
//                 <a class="navbar-brand text-info font-weight-bolder" href="/">
//                     {/* <img src={Logo} alt="Logo" width="36" height="36" className="vertical-align-middle" /> */}
//                     <span className="">FREE MONEY</span>
//                 </a>
//                 <button class="custom-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded={!isNavCollapsed ? "true" : "false"} aria-label="Toggle navigation" onClick={handleNavCollapse}>
//                     <span class="navbar-toggler-icon"></span>
//                 </button>

//                 <div class={`${isNavCollapsed ? 'collapse' : 'collapse'} navbar-collapse`} id="navbarsExample09">
//                 {/* <div class="navbar-collapse" id="navbarsExample09"> */}
//                     <a className="nav-link text-info" href="/contact">Free bet</a>
//                     <a className="nav-link text-info" href="/login">Multiply bet</a>
//                     <a href="/request-demo" className="nav-link text-info" >Lottery</a>
//                     <a href="/wallet" className="nav-link text-info">$0.000000001</a>
//                 </div>
//             </nav>
//             {/* <nav className="nav-bar">
//                 <span className="fs-4 nav-item">FREE MONEY</span>
//                 <span className="float-right nav-item">
//                     <div class="pos-f-t">
//                     <div class="collapse" id="navbarToggleExternalContent">
//                         <div class="bg-dark p-4">
//                         <h4 class="text-white">Collapsed content</h4>
//                         <span class="text-muted">Toggleable via the navbar brand.</span>
//                         </div>
//                     </div>
//                     <nav class="navbar navbar-dark bg-dark">
//                         <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
//                         <span class="navbar-toggler-icon"></span>
//                         </button>
//                     </nav>
//                     </div>
//                 </span>
//                 <span className="float-right nav-item">$0.000000000</span>
//             </nav> */}
//             <div className="row p-4">
//                 <div className="col-6 p-4 text-center"><img src={transaction} width="300" height="300" alt="transaction"/></div>
//                 <div className="col-6">
//                     <span className="display-3">Make your transactions in a snap</span>
//                     <div className="row py-3 my-4">
//                         <div className="col-6 text-center">
//                             <button className="btn btn-info btn-lg mx-3">Deposit</button>
//                             <button className="btn btn-info btn-lg mx-3">Withdraw</button>
//                         </div>
//                         <div className="col-6 text-center">
//                             {/* <button className="btn btn-info btn-lg m-auto">Withdraw</button> */}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="p-3 bg-gray text-center text-white">
//                 <span className="display-4">Get Free Money For Every 45 Minutes</span>
//             </div>
//             <div className="my-4 px-4 w-100">
//                 <table class="table table-bordered m-auto w-50">
//                     <thead>
//                         <tr>
//                         <th scope="col">Roll</th>
//                         <th scope="col">Prize</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <th scope="row">10000</th>
//                             <td>1.0000</td>
//                         </tr>
//                         <tr>
//                             <th scope="row">9999-9800</th>
//                             <td>0.0090</td>
//                         </tr>
//                         <tr>
//                             <th scope="row">9800-1000</th>
//                             <td>0.0009</td>
//                         </tr>
//                     </tbody>
//                 </table>
//                 <div className="w-100 text-center bg-gray p-4 my-4">
//                     <div className="text-center my-4"><span className="border m-auto display-4 p-3 text-white">{faucet}</span></div><br></br>
//                     <form onSubmit={onSubmit} className="text-center">
//                     <ReCAPTCHA
                        
//                         ref={reCaptchaRef}
//                         sitekey="6Lc__qsaAAAAANZ2FqwF3PCF45gwhSPP-uGLisD8"
//                         onChange={onChange}
//                     />
//                     <button className="btn btn-primary btn-lg m-2" onClick={() => handleRoll()}>ROLL</button>
//                     </form>
//                  </div>
//             </div>
//         </div>
//     )
// }

// export default Home
