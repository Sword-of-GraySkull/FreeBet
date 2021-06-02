import React, { useState, useEffect } from 'react'

import Navbar from '../Navbar/Navbar'
import { getLotteryTickets, getWalletData, writeLottery, calcLotteryWinner, setWalletData } from '../Helpers/service';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useToasts } from 'react-toast-notifications';
import LoggedUser from '../LoggedUser/LoggedUser';

function Lottery() {
    const { addToast } = useToasts(); 
    const [wallet, setWallet] = useState('0.00')
    const [tickets, setTickets] = useState(0)
    const [userTickets, setUserTickets] = useState(0)
    const [totalTickets, setTotalTickets] = useState(0)
    const [tempWinners, setTempWinners] = useState([])
    const [a, setA] = useState()

    const pricePerTicket = 0.01;
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

    const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
    const endTime = stratTime + 60; // use UNIX timestamp in seconds

    const remainingTime = endTime - stratTime;
    const days = Math.ceil(remainingTime / daySeconds);
    const daysDuration = days * daySeconds;

    const handleSetWallet = () => {
        if(localStorage.getItem("userId")) {
            getWalletData(localStorage.getItem("userId")).then(res => {
                // console.log(res.data.wallet)
                setWallet((res.data.wallet))
            })
        } 
    }

    const handleBuyTickets = () => {
        console.log(Math.ceil(Number(tickets)))
        if(Math.ceil(Number(tickets)) <= 0) {
            addToast("Number of Tickets can't be Zero", {
                appearance: 'info',
                autoDismiss: true
            })
        }
        else if(Math.ceil(Number(tickets)) * pricePerTicket > wallet) {
            addToast("You don't enough money to buy the lottery tickets", {
                appearance: 'info',
                autoDismiss: true
            })
        }
        else if(isNaN(Math.ceil(Number(tickets)))) {
            addToast("Number of Tickets should be a Number. Makes sense right?", {
                appearance: 'info',
                autoDismiss: true
            })
        } 
        else {
            setWalletData(localStorage.getItem("userId"), (wallet - tickets*pricePerTicket).toFixed(2))
            writeLottery(Math.ceil(Number(tickets)), localStorage.getItem("userId"))
        }
        setTickets(0)
    }

    const handleGetLotteryTickets = () => {
        if(localStorage.getItem("userId")) {
            getLotteryTickets(localStorage.getItem("userId"))
            .then(res => {
                setUserTickets(res.data.userTickets)
                setTotalTickets(res.data.totalTickets)
            })
        }
    }
    
    useEffect(() => {
        handleSetWallet();
        handleGetLotteryTickets();
    })

    useEffect(() => {
        calcLotteryWinner()
        .then(res => {
            if(res) {
                setTempWinners(res.data.winners)
            }
        })
        let interval = setInterval(() => {
            console.log("kio")
            setA(interval)
            calcLotteryWinner()
            .then(res => {
                if(res) {
                    setTempWinners(res.data.winners)
                }
            })
        }, 60000)
        
        return () => {
            console.log("koi")
            clearInterval(a)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <div className="w-100">
            <Navbar wallet={wallet} />
            <LoggedUser />
            <div className="w-100">
                <div className="display-4 my-4 text-center">Check Your Chance Of Winning The Lottery </div>
                {/* Count Down Timer */}
                <div className="">
                    <h1 className="bg-gray py-2 pr-5 text-white text-center">Lottery Ends in:</h1>
                    <div className="row">
                        <div className="col-4"></div>
                        <div className="col-4 d-flex">
                            <CountdownCircleTimer
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
                            </CountdownCircleTimer>
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
                        <div className="col-4"></div>
                    </div>
                </div>
                {/* Buy Tickets */}
                <div className="w-50 card card-body mx-auto my-4 pt-5 pl-5 pr-5 pb-3 bg-gray text-white">
                    <h2 className="text-center mb-4">Buy Your Tickets Here</h2>
                    <div>
                        <label className="h5 mb-3">Win Probability</label>
                        <label className="float-right mr-4 h5"><span className="text-gold">{((userTickets/totalTickets)*100).toFixed(2)}%</span></label><br></br>
                        <label className="h5 mb-3">Your Tickets</label>
                        <button className="btn btn-info float-right" style={{"margin": "-5px 0 0 5px"}} onClick={() => {handleGetLotteryTickets()}}>&#x21bb;</button>
                        <label className="float-right mr-4 h5">{userTickets}</label><br></br>
                        <label className="h5 mb-3">Price Per Ticket</label>
                        <label className="float-right mr-4 h5">{pricePerTicket}</label><br></br>
                        <label className="h5 mb-3">Buy Tickets (No.)</label>
                        <input className="rounded borderless float-right" value={tickets} onChange={event => {setTickets(event.target.value)}}></input><br></br>
                        <div className="text-center mt-3"><button className="btn btn-lg btn-info" onClick={() => {handleBuyTickets();}}>Buy</button></div>
                    </div>
                </div>
                {/* Temporary Winners */}
                <h1 className="text-center"> Winners List </h1>
                <div className="text-center">* Updates Every 5 Minutes</div>
                <table className="table table-bordered w-50 my-4 mx-auto">
                    <thead>
                        <td className="text-center" style={{"width":"20%"}}>Win Position</td>
                        <td className="text-center" style={{"width":"60%"}}>Winners</td>
                        <td className="text-center" style={{"width":"20%"}}>Prize money</td>
                    </thead>
                    
                    {tempWinners.length === 0
                    ?
                    <tbody>
                        <td colSpan="3" className="p-4"><h1>Winner List Not Available</h1></td>
                    </tbody>
                    :
                    tempWinners.map((item, index) => {
                        return(
                            <tbody className="text-center">
                                <td>{index+1}</td>
                                <td>{item}</td>
                                <td></td>
                            </tbody>
                        )})   
                    }
                </table>
                {/*Previous Lottery Winners */}
                
            </div>
        </div>
    )
}

export default Lottery
