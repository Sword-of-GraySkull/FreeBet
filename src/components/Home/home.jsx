// Version 1.0.4    Aesthetic Look 

import React, { useState, useEffect } from 'react'
import { useToasts } from 'react-toast-notifications';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import './home.scss';
import transaction from './24-money.gif';
import Navbar from '../Navbar/Navbar';
import { roll, getWalletData, setWalletData, pushRollHistory, getClientSeed } from '../Helpers/service';
import LoggedUser from '../LoggedUser/LoggedUser';
// import { Modal } from "react-bootstrap";

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
    isPlaying: true,
    size: 90,
    strokeWidth: 6
  };
const renderTime = (dimension, time) => {
    return (
        <div className="time-wrapper">
        <div className="time">{time}</div>
        <div>{dimension}</div>
        </div>
    );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

function Home() {
    const { addToast } = useToasts()
    const [faucet, setFaucet] = useState(10000);
    const [disable, setDisable] = useState(false);
    const [counter, setCounter] = useState(false);
    //User logged in state
    // const initialWallet = '0.0';
    const [userId, setUserId] = useState()
    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')
    const [takeaway, setTakeAway] = useState(0.00)
    const [win, setWin] = useState(false)
    const [wallet, setWallet] = useState('0.00')
    const [history, setHistory] = useState(false)
    const [clientSeed, setClientSeed] = useState()
    const [prevServerSeed, setPrevServerSeed] = useState()
    const [prevClientSeed, setPrevClientSeed] = useState()
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
    const remainingTime = localStorage.getItem('endTime') - localStorage.getItem('startTime');
    const days = Math.ceil(remainingTime / daySeconds);
    const daysDuration = days * daySeconds;

    const handleRoll = () => {
        roll(clientSeed)
        .then(x => {
            setCounter(false)
            setFaucet(x.data);
            setPrevClientSeed(x.clientSeed)
            setPrevServerSeed(x.serverSeed)
        });
               
        handleDisable()
    }

    const handleDisable = () => {
        // var time = new Date().getMinutes()
        // var hr = new Date().getHours()
        var time = Date.now()
        let stopHr;
        let stopTime;
        if(localStorage.getItem("stopTime")) {
            stopTime = localStorage.getItem("stopTime")
        } else {
            stopTime = time + 60;
            // stopHr = hr;
            // if(stopTime >= 60) stopTime = stopTime - 60
            localStorage.setItem("stopTime", stopTime)
            // localStorage.setItem("stopHr", stopHr)
        }
        let currTime;
        let currHr;
        console.log(Date.now() / 1000)

        const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
        const endTime = stratTime + 60; // use UNIX timestamp in seconds
        if(localStorage.getItem("startTime")) {
        
        } else {
            localStorage.setItem("startTime", stratTime)
            localStorage.setItem("endTime", endTime)
        }
        
        // const endTime = stratTime + 243248; // use UNIX timestamp in seconds

        let a = setInterval(() => {
            setDisable(true)
            localStorage.setItem("startTime", Date.now()/1000)
            // currTime = new Date().getMinutes()
            currTime = Date.now()
            // currHr = new Date().getHours()
            // console.log(currHr, Number(stopHr))
            // if(currHr > Number(stopHr) && currTime === Number(stopTime)) {
            // console.log( Math.round(localStorage.getItem("startTime")), Math.round(localStorage.getItem("endTime")) )
            if( Math.round(localStorage.getItem("startTime")) === Math.round(localStorage.getItem("endTime")) || Math.round(localStorage.getItem("startTime")) > Math.round(localStorage.getItem("endTime"))) {
                setDisable(false)
                // localStorage.removeItem("stopHr")
                localStorage.removeItem("stopTime")
                localStorage.removeItem("startTime")
                localStorage.removeItem("endTime")
                clearInterval(a)
            }
            // else if(currTime > Number(stopTime) || currTime === Number(stopTime)) {
            //     // console.log(currTime, stopTime)
            //     setDisable(false)
            //     localStorage.removeItem("stopTime")
            //     localStorage.removeItem("stopHr")
            //     clearInterval(a)
            // }
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

        if(localStorage.getItem("userId")) {
            getClientSeed().then(res => {
                // console.log(res)
                setClientSeed(res.data.data)
            })
        }
    }, [])

    useEffect(() => {
        handleSetWallet()
    })

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
            <LoggedUser />
            <div className="row p-4">
                <div className="col-6 p-4 text-center money"><img src={transaction} width="300" height="300" alt="transaction"/></div>
                <div className="col-6 money">
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
            <div className="mb-3 p-3 bg-gray text-center text-white">
                <span className="display-4">Get Free Money Upto $10 Every 45 Minutes</span>
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
            <div class="hexagon des">
                <div class="text">
                    <h1>Crest</h1>
                    &
                    <h1>Trough</h1>
                </div>
            </div>
            <div className="desc">
                <p className="mx-3 text-white">Mauris placerat dolor massa, sed porttitor massa volutpat sed. Donec ac eros quam. Vestibulum non massa eu diam pulvinar sagittis suscipit at purus. In rhoncus velit sed neque vulputate, quis sollicitudin arcu egestas. Pellentesque dignissim, quam vehicula auctor lobortis, elit sapien consequat metus, ac faucibus sapien augue non neque. Vivamus sapien dolor, suscipit sed sem sed, ultrices finibus nibh. Maecenas aliquet elit id est mattis, eget eleifend ex tristique. Vivamus ac purus dignissim metus gravida ornare. Sed magna lacus, tincidunt a facilisis at, condimentum a neque. Vestibulum ornare eget sem vitae vehicula. Nam non diam a quam feugiat iaculis. Aenean luctus, lacus at iaculis laoreet, risus diam egestas mauris, at iaculis tellus mi efficitur diam. Etiam imperdiet consequat nulla. Integer molestie looodeodk dejis opoe</p>
            </div>
            <div className="desc-right ">
                <p className="ml-3 text-white" style={{"margin-right": "130px"}}>Mauris placerat dolor massa, sed porttitor massa volutpat sed. Donec ac eros quam. Vestibulum non massa eu diam pulvinar sagittis suscipit at purus. In rhoncus velit sed neque vulputate, quis sollicitudin arcu egestas. Pellentesque dignissim, quam vehicula auctor lobortis, elit sapien consequat metus, ac faucibus sapien augue non neque. Vivamus sapien dolor, suscipit sed sem sed, ultrices finibus nibh. Maecenas aliquet elit id est mattis, eget eleifend ex tristique. Vivamus ac purus dignissim metus gravida ornare. Sed magna lacus, tincidunt a facilisis at, condimentum a neque. Vestibulum ornare eget sem vitae vehicula. Nam non diam a quam feugiat iaculis. Aenean luctus, lacus at iaculis laoreet, risus diam egestas mauris, at iaculis tellus mi efficitur diam. Etiam imperdiet consequat nulla. Integer molestie looodeodk dejis opoe</p>
            </div>
            <div class="hexagon des-right float-right">
                <div class="text">
                    <br></br>
                    <h1>Lottery</h1>
                </div>
            </div>
            <div class="hexagon des">
                <div class="text">
                    <br></br>
                    <h1>Fake Door</h1>
                </div>
            </div>
            <div className="desc">
                <p className="mx-3 text-white">Mauris placerat dolor massa, sed porttitor massa volutpat sed. Donec ac eros quam. Vestibulum non massa eu diam pulvinar sagittis suscipit at purus. In rhoncus velit sed neque vulputate, quis sollicitudin arcu egestas. Pellentesque dignissim, quam vehicula auctor lobortis, elit sapien consequat metus, ac faucibus sapien augue non neque. Vivamus sapien dolor, suscipit sed sem sed, ultrices finibus nibh. Maecenas aliquet elit id est mattis, eget eleifend ex tristique. Vivamus ac purus dignissim metus gravida ornare. Sed magna lacus, tincidunt a facilisis at, condimentum a neque. Vestibulum ornare eget sem vitae vehicula. Nam non diam a quam feugiat iaculis. Aenean luctus, lacus at iaculis laoreet, risus diam egestas mauris, at iaculis tellus mi efficitur diam. Etiam imperdiet consequat nulla. Integer molestie looodeodk dejis opoe</p>
            </div>
            <div className="desc-right ">
                <p className="ml-3 text-white" style={{"margin-right": "130px"}}>Mauris placerat dolor massa, sed porttitor massa volutpat sed. Donec ac eros quam. Vestibulum non massa eu diam pulvinar sagittis suscipit at purus. In rhoncus velit sed neque vulputate, quis sollicitudin arcu egestas. Pellentesque dignissim, quam vehicula auctor lobortis, elit sapien consequat metus, ac faucibus sapien augue non neque. Vivamus sapien dolor, suscipit sed sem sed, ultrices finibus nibh. Maecenas aliquet elit id est mattis, eget eleifend ex tristique. Vivamus ac purus dignissim metus gravida ornare. Sed magna lacus, tincidunt a facilisis at, condimentum a neque. Vestibulum ornare eget sem vitae vehicula. Nam non diam a quam feugiat iaculis. Aenean luctus, lacus at iaculis laoreet, risus diam egestas mauris, at iaculis tellus mi efficitur diam. Etiam imperdiet consequat nulla. Integer molestie looodeodk dejis opoe</p>
            </div>
            <div class="hexagon des-right float-right">
                <div class="text">
                    <br></br>
                    <h1>Gift Box</h1>
                </div>
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
                
                {disable 
                ?
                <>
                <h3 className="mt-3 text-center">Next Roll Available in: </h3><br></br>
                <div className="row">
                    {/* <CountdownCircleTimer
                        {...timerProps}
                        colors={[["#7E2E84"]]}
                        duration={daysDuration}
                        initialRemainingTime={remainingTime}
                    >
                        {({ elapsedTime }) =>
                        renderTime("days", getTimeDays(daysDuration - elapsedTime))
                        }
                    </CountdownCircleTimer>
                    <CountdownCircleTimer
                        {...timerProps}
                        colors={[["#D14081"]]}
                        duration={daySeconds}
                        initialRemainingTime={remainingTime % daySeconds}
                        onComplete={(totalElapsedTime) => [
                        remainingTime - totalElapsedTime > hourSeconds
                        ]}
                    >
                        {({ elapsedTime }) =>
                        renderTime("hours", getTimeHours(daySeconds - elapsedTime))
                        }
                    </CountdownCircleTimer> */}
                    <div className="col-5"></div>
                    <div className="col-2 d-flex">
                    <CountdownCircleTimer
                        {...timerProps}
                        colors={[["#EF798A"]]}
                        duration={hourSeconds}
                        initialRemainingTime={remainingTime % hourSeconds}
                        onComplete={(totalElapsedTime) => [
                        remainingTime - totalElapsedTime > minuteSeconds
                        ]}
                    >
                        {({ elapsedTime }) =>
                        renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))
                        }
                    </CountdownCircleTimer>
                    <CountdownCircleTimer
                        {...timerProps}
                        colors={[["#218380"]]}
                        duration={minuteSeconds}
                        initialRemainingTime={remainingTime % minuteSeconds}
                        onComplete={(totalElapsedTime) => [
                        remainingTime - totalElapsedTime > 0
                        ]}
                    >
                        {({ elapsedTime }) =>
                        renderTime("seconds", getTimeSeconds(elapsedTime))
                        }
                    </CountdownCircleTimer>
                    </div>
                    <div className="col-5"></div>
                </div>
                </>
                :
                <></>
                }                
                <div className="rounded p-4 bg-gray w-50 mx-auto my-4 text-white text-center">
                    <h3>Previous Roll</h3>
                    <h5>Server Seed Hash</h5> 
                    <input 
                        className="rounded mobile borderless" 
                        value={prevServerSeed}
                        disabled
                    ></input>
                    <h5>Client Seed</h5>
                    <input 
                        className="rounded mobile borderless mb-2"
                        value={prevClientSeed}
                        disabled
                    />
                    <br></br>
                    <a className="" href={`/FreeBet/#/VerifyRoll/${prevServerSeed}/${prevClientSeed}`}>VerifyRoll</a>
                </div>
                <div className="rounded p-4 bg-gray w-50 mx-auto my-4 text-white text-center">
                    <h5>Edit Client Seed</h5> 
                    <input 
                        className="rounded mobile borderless" 
                        value={clientSeed}
                        onChange={event => {
                        setClientSeed(event.target.value)
                        }}
                    ></input>
                </div>
                <div className="w-100 text-center bg-gray p-4 my-4">
                    {counter
                    ?
                    <>
                    <div className="text-center my-4"><span className="border counter m-auto display-4 p-3 text-white"></span></div><br></br>
                    </>
                    :
                    <>
                    <div className="text-center my-4"><span className="border m-auto display-4 p-3 text-white">{faucet}</span></div><br></br>
                    </>
                    }
                    {disable ?
                        <button 
                        className="btn btn-primary btn-lg m-2 disabled" 
                        onClick={() => {
                            if(userId) {
                                // handleRoll()
                                // handleTakeaway()
                            }
                            else {
                                // window.history.replaceState({}, 'login', '#/login')
                                window.location.pathname('/login')
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
                                setCounter(true)
                                handleRoll()
                                // handleGetRollHistory()
                                // console.log(rollData)
                                // handleTakeaway()
                            }
                            else {
                                // window.history.replaceState({}, 'login', '#/login')
                                window.location.pathname('/login')
                                window.location.reload(false)
                                // setRegister(false)
                                // setUsername('')
                                // setPassword('')
                                // handleOpen()
                            }
                        }}
                    >ROLL</button>} 
                </div>
                </div>
        </div>
        
    )
}

export default Home




// // Version 1.0.3    user loggedin state added, bug fix #1

// import React, { useState, useEffect } from 'react'
// import { useToasts } from 'react-toast-notifications';
// import { CountdownCircleTimer } from 'react-countdown-circle-timer';

// import './home.scss';
// import transaction from './24-money.gif';
// import Navbar from '../Navbar/Navbar';
// import { roll, getWalletData, setWalletData, pushRollHistory } from '../Helpers/service';
// import LoggedUser from '../LoggedUser/LoggedUser';
// // import { Modal } from "react-bootstrap";

// const minuteSeconds = 60;
// const hourSeconds = 3600;
// const daySeconds = 86400;

// const timerProps = {
//     isPlaying: true,
//     size: 90,
//     strokeWidth: 6
//   };
// const renderTime = (dimension, time) => {
//     return (
//         <div className="time-wrapper">
//         <div className="time">{time}</div>
//         <div>{dimension}</div>
//         </div>
//     );
// };

// const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
// const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
// const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
// const getTimeDays = (time) => (time / daySeconds) | 0;

// function Home() {
//     const { addToast } = useToasts()
//     const [faucet, setFaucet] = useState(10000);
//     const [disable, setDisable] = useState(false);
//     const [counter, setCounter] = useState(false);
//     //User logged in state
//     // const initialWallet = '0.0';
//     const [userId, setUserId] = useState()
//     // const [username, setUsername] = useState('')
//     // const [password, setPassword] = useState('')
//     const [takeaway, setTakeAway] = useState(0.00)
//     const [win, setWin] = useState(false)
//     const [wallet, setWallet] = useState('0.00')
//     const [history, setHistory] = useState(false)
//     // const [rollData, setRollData] = useState([])

//     // const registerData = {
//     //     username : username,
//     //     password: password, 
//     //     wallet: initialWallet
//     // }
//     // const loginData = {
//     //     username: username,
//     //     password: password
//     // }
//     const rollHistory = {
//         rollValue: faucet,
//         win: win ? 'Win' : 'Lose',
//         takeaway: takeaway,
//         date: new Date().toLocaleDateString(),
//         wallet: wallet
//     }
//     // const [showModal, setShow] = useState(false);
//     // const [register, setRegister] = useState(false);
//     const remainingTime = localStorage.getItem('endTime') - localStorage.getItem('startTime');
//     const days = Math.ceil(remainingTime / daySeconds);
//     const daysDuration = days * daySeconds;

//     const handleRoll = () => {
//         roll()
//         .then(x => {
//             setCounter(false)
//             setFaucet(x);
//         });
               
//         handleDisable()
//     }

//     const handleDisable = () => {
//         // var time = new Date().getMinutes()
//         // var hr = new Date().getHours()
//         var time = Date.now()
//         let stopHr;
//         let stopTime;
//         if(localStorage.getItem("stopTime")) {
//             stopTime = localStorage.getItem("stopTime")
//         } else {
//             stopTime = time + 60;
//             // stopHr = hr;
//             // if(stopTime >= 60) stopTime = stopTime - 60
//             localStorage.setItem("stopTime", stopTime)
//             // localStorage.setItem("stopHr", stopHr)
//         }
//         let currTime;
//         let currHr;
//         console.log(Date.now() / 1000)

//         const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
//         const endTime = stratTime + 60; // use UNIX timestamp in seconds
//         if(localStorage.getItem("startTime")) {
        
//         } else {
//             localStorage.setItem("startTime", stratTime)
//             localStorage.setItem("endTime", endTime)
//         }
        
//         // const endTime = stratTime + 243248; // use UNIX timestamp in seconds

//         let a = setInterval(() => {
//             setDisable(true)
//             localStorage.setItem("startTime", Date.now()/1000)
//             // currTime = new Date().getMinutes()
//             currTime = Date.now()
//             // currHr = new Date().getHours()
//             // console.log(currHr, Number(stopHr))
//             // if(currHr > Number(stopHr) && currTime === Number(stopTime)) {
//             // console.log( Math.round(localStorage.getItem("startTime")), Math.round(localStorage.getItem("endTime")) )
//             if( Math.round(localStorage.getItem("startTime")) === Math.round(localStorage.getItem("endTime")) || Math.round(localStorage.getItem("startTime")) > Math.round(localStorage.getItem("endTime"))) {
//                 setDisable(false)
//                 // localStorage.removeItem("stopHr")
//                 localStorage.removeItem("stopTime")
//                 localStorage.removeItem("startTime")
//                 localStorage.removeItem("endTime")
//                 clearInterval(a)
//             }
//             // else if(currTime > Number(stopTime) || currTime === Number(stopTime)) {
//             //     // console.log(currTime, stopTime)
//             //     setDisable(false)
//             //     localStorage.removeItem("stopTime")
//             //     localStorage.removeItem("stopHr")
//             //     clearInterval(a)
//             // }
//         }, 1000)
//     }

//     const handleTakeaway = () => {
//         if (faucet <= 9999 && faucet >= 9800) {
//             let w = Number(wallet) + 0.90
//             setWalletData(userId, w.toFixed(2))
//             setWallet(w.toFixed(2))
//             setHistory(!history)
//             setTakeAway(0.90)
//             // setWallet(Number(wallet) + 0.90)
//             setWin(true)
//             // addToast('You Won', {
//             //     appearance: 'success',
//             //     autoDismiss: true
//             // })
//         } else if (faucet < 9800 && faucet >= 9500) {
//             let w = Number(wallet) + 0.09
//             setWalletData(userId, w.toFixed(2))
//             setWallet(w.toFixed(2))
//             setTakeAway(0.09)
//             setHistory(!history)
//             // setWallet(Number(wallet) + 0.09)
//             setWin(true)
//             addToast(`Woohoo, You Won Free money out of Nothing`, {
//                 appearance: 'success',
//                 autoDismiss: true
//             })
//         } else if (faucet < 8000 && faucet >= 0) {
//             let w = Number(wallet) + 0.01
//             setWalletData(userId, w.toFixed(2))
//             setWallet(w.toFixed(2))
//             setTakeAway(0.01)
//             setHistory(!history)
//             // console.log(getWalletData(userId).then(res => {
//             //     return res.data.wallet
//             //     // console.log(res.data.wallet)
//             // }))
//             // setWallet(Number(wallet) + 0.01)
//             setWin(true)
//             addToast(`Woohoo, You Won Free money out of Nothing`, {
//                 appearance: 'success',
//                 autoDismiss: true
//             })
//         } else {
//             if(faucet !== 10000) {
//                 setWin(false)
//                 setHistory(!history)
//                 setTakeAway(0.00)
//                 addToast('Oh bugger, lack of luck it seems. You get Nothing', {
//                     appearance: 'warning',
//                     autoDismiss: true
//             })
//             }
//         }
//     }

//     const handleSetWallet = () => {
//         if(localStorage.getItem("userId")) {
//             getWalletData(localStorage.getItem("userId")).then(res => {
//                 // console.log(res.data.wallet)
//                 setWallet((res.data.wallet))
//             })
//         } 
//     }

//     const handleSetRollHistory = () => {
//         if(faucet !== 10000) {
//             // console.log('rollValue', faucet)
//             // console.log("takeaway", takeaway)
//             // console.log('win/lose', win)
//             // console.log('wallet', wallet)
//             // console.log(new Date().toLocaleDateString())
//             pushRollHistory(userId, rollHistory)
//         }
//     }

//     const handleGetRollHistory = () => {
//         // getRollHistory(userId)
//         // .then(res => {
//         //     const { data } = res;
//         //     // console.log(data.[0].rollHistory.[0].rollValue)
//         //     setRollData(data.[0].rollHistory)
//         // })
//     }

//     // const handleOpen = () => setShow(true)

//     // const handleClose = () => setShow(false)

//     useEffect(() => {
//         const loggedInUser = localStorage.getItem("userId");
//         if (loggedInUser) {
//         // const foundUser = JSON.parse(loggedInUser);
//         setUserId(loggedInUser);
//         }

//         // freebet
//         if(localStorage.getItem("stopTime")) {
//             setDisable(true)
//             handleDisable()
//         }
//     }, [])

//     useEffect(() => {
//         handleSetWallet()
//     })

//     useEffect(() => {
//         handleTakeaway()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [faucet])

//     useEffect(() => {
//         handleSetRollHistory()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [history])
    
//     return (
//         <div>
//             <Navbar wallet={wallet}/>
//             <LoggedUser />
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
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="p-3 bg-gray text-center text-white">
//                 <span className="display-4">Get Free Money For Every 45 Minutes</span>
//             </div>
//             <div className="my-4 px-4 w-100">
//                 <table className="table table-bordered m-auto w-50">
//                     <thead>
//                         <tr>
//                             <th scope="col">Roll</th>
//                             <th scope="col">Prize</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <th scope="row">9999-9800</th>
//                             <td>1.0000</td>
//                         </tr>
//                         <tr>
//                             <th scope="row">9800-9500</th>
//                             <td>0.0090</td>
//                         </tr>
//                         <tr>
//                             <th scope="row">9500-0</th>
//                             <td>0.0009</td>
//                         </tr>
//                     </tbody>
//                 </table>
                
//                 {disable 
//                 ?
//                 <>
//                 <h3 className="mt-3 text-center">Next Roll Available in: </h3><br></br>
//                 <div className="row">
//                     {/* <CountdownCircleTimer
//                         {...timerProps}
//                         colors={[["#7E2E84"]]}
//                         duration={daysDuration}
//                         initialRemainingTime={remainingTime}
//                     >
//                         {({ elapsedTime }) =>
//                         renderTime("days", getTimeDays(daysDuration - elapsedTime))
//                         }
//                     </CountdownCircleTimer>
//                     <CountdownCircleTimer
//                         {...timerProps}
//                         colors={[["#D14081"]]}
//                         duration={daySeconds}
//                         initialRemainingTime={remainingTime % daySeconds}
//                         onComplete={(totalElapsedTime) => [
//                         remainingTime - totalElapsedTime > hourSeconds
//                         ]}
//                     >
//                         {({ elapsedTime }) =>
//                         renderTime("hours", getTimeHours(daySeconds - elapsedTime))
//                         }
//                     </CountdownCircleTimer> */}
//                     <div className="col-5"></div>
//                     <div className="col-2 d-flex">
//                     <CountdownCircleTimer
//                         {...timerProps}
//                         colors={[["#EF798A"]]}
//                         duration={hourSeconds}
//                         initialRemainingTime={remainingTime % hourSeconds}
//                         onComplete={(totalElapsedTime) => [
//                         remainingTime - totalElapsedTime > minuteSeconds
//                         ]}
//                     >
//                         {({ elapsedTime }) =>
//                         renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))
//                         }
//                     </CountdownCircleTimer>
//                     <CountdownCircleTimer
//                         {...timerProps}
//                         colors={[["#218380"]]}
//                         duration={minuteSeconds}
//                         initialRemainingTime={remainingTime % minuteSeconds}
//                         onComplete={(totalElapsedTime) => [
//                         remainingTime - totalElapsedTime > 0
//                         ]}
//                     >
//                         {({ elapsedTime }) =>
//                         renderTime("seconds", getTimeSeconds(elapsedTime))
//                         }
//                     </CountdownCircleTimer>
//                     </div>
//                     <div className="col-5"></div>
//                 </div>
//                 </>
//                 :
//                 <></>
//                 }
//                 <div className="w-100 text-center bg-gray p-4 my-4">
//                     {counter
//                     ?
//                     <>
//                     <div className="text-center my-4"><span className="border counter m-auto display-4 p-3 text-white"></span></div><br></br>
//                     </>
//                     :
//                     <>
//                     <div className="text-center my-4"><span className="border m-auto display-4 p-3 text-white">{faucet}</span></div><br></br>
//                     </>
//                     }
//                     {disable ?
//                         <button 
//                         className="btn btn-primary btn-lg m-2 disabled" 
//                         onClick={() => {
//                             if(userId) {
//                                 // handleRoll()
//                                 // handleTakeaway()
//                             }
//                             else {
//                                 window.history.pushState('', 'login', '/#/login')
//                                 window.location.reload(false)
//                                 /*setRegister(false)
//                                 setUsername('')
//                                 setPassword('')
//                                 handleOpen()*/
//                             }
//                         }}
//                         disabled
//                         >ROLL</button>
//                     :
//                         <button 
//                         className="btn btn-primary btn-lg m-2" 
//                         onClick={() => {
//                             if(userId) {
//                                 setCounter(true)
//                                 handleRoll()
//                                 // handleGetRollHistory()
//                                 // console.log(rollData)
//                                 // handleTakeaway()
//                             }
//                             else {
//                                 window.history.pushState('', 'login', '/#/login')
//                                 window.location.reload(false)
//                                 // setRegister(false)
//                                 // setUsername('')
//                                 // setPassword('')
//                                 // handleOpen()
//                             }
//                         }}
//                     >ROLL</button>} 
//                 </div> 


                  
//                 {/* {faucet !== 10000 
//                 ? 
//                 <>
//                 <button className="btn btn-primary btn-lg mb-3" onClick={() => handleGetRollHistory()}>Refresh Roll History</button>
//                 <table className="table table-bordered m-auto text-center">
//                     <thead>
//                         <th>SNO</th>
//                         <th>RollValue</th>
//                         <th>Win/Lose</th>
//                         <th>Roll Takeaway</th>
//                         <th>Wallet</th>
//                     </thead>
//                     {rollData.map((item, index) => {
//                     return (
//                     <tbody>
//                         <th>{index}</th>
//                         <td>{item.rollValue}</td>
//                         {item.win === 'Win' ?
//                             <td className="text-darkGreen">{item.win}</td>
//                         :
//                             <td className="text-danger">{item.win}</td>
//                         }
//                         <td>{item.takeaway}</td>
//                         <td>{item.wallet}</td>
//                     </tbody>)})}
//                 </table> 
//                 </>
//                 :
//                 <>
//                 </>
//                 } */}
//             </div>
//             {/* <div class="hexagon hexagon1">
//                 <div class="hexagon-in1">
//                     <div class="hexagon-in2">
//                     Fake Door
//                     </div>
//                 </div>
//             </div> */}

//         </div>
        
//     )
// }

// export default Home


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
