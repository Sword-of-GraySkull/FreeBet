import React, { useEffect, useState } from 'react'
import { useToasts } from 'react-toast-notifications';

import './MultiplyBet.css';
import Navbar from './../Navbar/Navbar';
import { roll, getWalletData, setWalletData, pushMultiplyBetRollHistory } from '../Helpers/service';

// eslint-disable-next-line no-lone-blocks
{/* <ul class="nav nav-tabs">
  <li class="nav-item">
    <a class="nav-link active" href="#">Active</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link disabled" href="#">Disabled</a>
  </li>
</ul> */}

function MultiplyBet() {

    // ###################################      manual bet options  ###################################################
    const [rollValue, setRollValue] = useState(10000);
    const [betmode, setBetmode] = useState('manual');
    const [betAmount, setBetAmount] = useState(0.1);
    const [betOdds, setBetOdds] = useState('2');
    const [winChance, setWinChance] = useState('47.5');
    const [winHigh, setWinHigh] = useState('5250');
    const [winLow, setWinLow] = useState('4750');
    const [winProfit, setWinProfit] = useState(0.2);
    const [takeAwayAmount, setTakeAwayAmount] = useState(0);
    const [win, setWin] = useState('');

    // ####################################     auto bet options    ###################################################
    const [isAutoBetActive, setIsAutoBetActive] = useState(false)
    const [isHi, setIsHi] = useState(1); 
    const [noOfRolls, setNoOfRolls] = useState('1000');
    const [max_bet, setMax_Bet] = useState('stopbet');              // On hitting max bet
    const [rollmode, setrollmode] = useState('hi');
    const [onWin, setOnWin] = useState(true);
    const [profit, setProfit] = useState(0.0);
    const [loss, setLoss] = useState(0.0);
    const [stopProfit, setStopProfit] = useState('100')
    const [stopLoss, setStopLoss] = useState('100')
    const [increaseBetWin, setIncreaseBetWin] = useState(0.0);
    const [increaseBetLose, setIncreaseBetLose] = useState(0.0);
    const [changeBetOddWin, setChangeBetOddWin] = useState(betOdds);
    const [changeBetOddLose, setChangeBetOddLose] = useState(betOdds);
    const [basebet, setBaseBet] = useState('-')
    
    const [a, setA] = useState();

    const MaxBet = 20;

    // ####################### Roll History ##########################
    const { addToast } = useToasts()
    const [userId, setUserId] = useState()
    const [wallet, setWallet] = useState('0.0')
    const [history, setHistory] = useState(false)
    const rollHistory = {
        rollValue: rollValue,
        win: win ? 'Win' : 'Lose',
        rollOption: isHi ? 'Hi' : 'Lo',
        takeaway: takeAwayAmount,
        winProfit: win ? winProfit : '-',
        multiplier: betOdds,
        betmode: betmode,
        date: new Date().toLocaleDateString(),
        wallet: wallet
    }

    // ####################################  Handle Functions   ###########################################################

    function handletakeAwayAmount(value) {
        if(betmode === "manual") {
            if(value === 'win') {
                setProfit(profit+Number(winProfit))
                // console.log(Number(takeAwayAmount.toFixed(2)), '+', Number(winProfit))
                let tk = Math.abs(Number(winProfit));
                setWallet((Number(wallet) + tk).toFixed(2))
                setTakeAwayAmount(tk)
                // console.log(Number(wallet) + takeAwayAmount)
                setWin(true)
            }
            else if(value === 'lose') {
                setLoss(loss+Number(winProfit))
                // console.log(Number(takeAwayAmount.toFixed(2)), '-', Number(winProfit))
                // setTakeAwayAmount(-Number(winProfit).toFixed(2))
                // console.log(Number(wallet) + takeAwayAmount)
                // setWallet(Number(wallet) + takeAwayAmount)
                let tk = -Number(winProfit);
                setWallet((Number(wallet) + tk).toFixed(2))
                setTakeAwayAmount(tk)
                setWin(false)
            }
        }
        else if(betmode === "auto") {
            if(value === 'win') {
                // setWin(true)
                setProfit(profit + Number(winProfit))
                setBetAmount(Number(betAmount)+Number(increaseBetWin))
                setBetOdds(changeBetOddWin)
                // setIncreasedWinProfit(((betAmount)*betOdds)-(betAmount))
                // console.log(Number(takeAwayAmount.toFixed(2)), '+', Number(winProfit))
                // if(Number(takeAwayAmount.toFixed(2)) + Number(winProfit) === 0) 
                //     setTakeAwayAmount(Number(winProfit))
                // else 
                //     setTakeAwayAmount(Number(takeAwayAmount.toFixed(2)) + Number(winProfit))  //############################# !!!!!!!!!!!!!!!!
                console.log(Number(winProfit));
                let tk = Math.abs(Number(winProfit));
                console.log("hey", tk);
                setWallet((Number(wallet) + Number(tk)).toFixed(2));
                setTakeAwayAmount(tk);
                setWin(true);
            }
            else if(value === 'lose') {
                // setWin(false)
                setLoss(loss+Number(winProfit))
                setBetAmount(Number(betAmount)+Number(increaseBetLose))
                setBetOdds(changeBetOddLose)
                // setIncreasedWinProfit(((betAmount)*betOdds)-(betAmount))
                // console.log('increasedWinProfit',increasedWinProfit)
                // console.log(Number(takeAwayAmount.toFixed(2)), '-', Number(winProfit))
                // setTakeAwayAmount(Number(takeAwayAmount.toFixed(2)) - Number(winProfit))
                console.log(Number(winProfit));
                let tk = -Number(winProfit);
                console.log("hey", tk);
                setWallet((Number(wallet) + Number(tk)).toFixed(2));
                setTakeAwayAmount(tk);
                setWin(false);
            }
        }
    }

    function handleWin() {            // #################### Function that handles Win conditions , triggered when Roll Value Changes  #################
        if(betmode === 'auto') {
            if(rollmode === 'hi') setIsHi(1)
            else if(rollmode === 'lo') setIsHi(0)
            else if(rollmode === 'alternate') setIsHi(!isHi)
        }
        if(rollValue !== 10000)
            if(isHi) {
                if(rollValue > winHigh) {
                    // console.log("info: win hi");
                    addToast(`Bravo, You Win!! Roll Option: ${isHi ? 'Hi': 'Lo'}`, {
                        appearance: 'success',
                        autoDismiss: true
                    })
                    handletakeAwayAmount('win')
                    // let x = win + 1;
                    // setWin(x);
                }
                else {
                    // console.log("info: lose hi")
                    addToast(`oopsie, You Lose!! Roll Option: ${isHi ? 'Hi': 'Lo'}`, {
                        appearance: 'error',
                        autoDismiss: true
                    })
                    handletakeAwayAmount('lose')
                    // let x = lose + 1
                    // setLose(x);
                }
            }
            else {
                if(rollValue < winLow) {
                    // console.log("info: win lo")
                    addToast(`Bravo, You Win!! Roll Option: ${isHi ? 'Hi': 'Lo'}`, {
                        appearance: 'success',
                        autoDismiss: true
                    })
                    handletakeAwayAmount('win')
                    // setWin(win+1)
                 }
                else {
                    // console.log("info: lose lo")
                    addToast(`oopsie, You Lose!! Roll Option: ${isHi ? 'Hi': 'Lo'}`, {
                        appearance: 'error',
                        autoDismiss: true
                    })
                    handletakeAwayAmount('lose')
                    // setLose(lose+1)
                 }
            }
        // console.log("win ", win, " lose ", lose );    
    }

    const handleHitMax = () => {
        // console.log('max_bet',max_bet, 'betAmount', betAmount, "rollValue", rollValue)
        if(max_bet === 'stopbet' && betAmount >= MaxBet) {
            // console.log("info: Stopped Betting because MaxBet value is reached [from - On Hitting MaxBet - chosen Stop Betting]")
            addToast("Stopped Betting because MaxBet value is reached", {
                appearance: 'info',
                autoDismiss: true
            })
            setIsAutoBetActive(false)
            clearInterval(a);
            setTimeout(() => setRollValue(10000), 2000)
        }
        else if(max_bet === 'basebet' && betAmount >= MaxBet) {
            // console.log('info: Changed betamount to base bet [from - On Hitting MaxBet - chosen Return to BaseBet')
            addToast("Changed betamount to Base bet", {
                appearance: 'info',
                autoDismiss: true
            })
            setBetAmount(basebet);
        }
    }

    const handleStopBetAfter = () => {
        // console.log('profit', profit, 'loss', loss);
        if(profit >= stopProfit) {   
            addToast("Stopped Betting because Profit Threshold Reached", {
                appearance: 'info',
                autoDismiss: true
            })
            setIsAutoBetActive(false) 
            clearInterval(a);
            setTimeout(() => setRollValue(10000), 2000)
            // console.log("Profit Reached Threshold [from Stop Betting After - Profit >=")
        }
        if(loss >= stopLoss) {
            addToast("Stopped Betting because Loss Threshold Reached", {
                appearance: 'info',
                autoDismiss: true
            })
            setIsAutoBetActive(false)
            clearInterval(a);
            setTimeout(() => setRollValue(10000), 2000)
        //    console.log("Loss Reached Threshold [from Stop Betting")
        }
    }

    function handleRoll() {                     //#################### Function that gets the RollValue from the Server ####################
        roll()
        .then(x => {
            setRollValue(x)
        });
    }

    const handleRadio = (e) => {               //##################### Function that handles Radio Button changes ##########################
        const {name, value} = e.target;
        console.log("name", name, "value", value)
        if(name === "max_bet") {
            setMax_Bet(value);
        }
        else if(name === "rollmode") {
            setrollmode(value);
        }
    }

    const handleValidation = () => {
        if(betmode === 'manual') {
            if(betAmount === 0) {
                addToast("BetAmount can't be zero. Why don't you try Free Bet ?", {
                    appearance: 'info',
                    autoDismiss: true
                })
                return false;
            }
            else if(betAmount < 0.01) {
                addToast("BetAmount should be greater than 0.01", {
                    appearance: 'info',
                    autoDismiss: true
                })
                return false;
            }
            else if(betAmount > 20) {
                addToast("BetAmount can't be greater than 20", {
                    appearance: 'info',
                    autoDismiss: true
                })
                return false;
            }
            else if(betAmount > wallet) {
                addToast("You don't have enough money to place the bet. Deposit some money or you can always earn money from Free bet", {
                    appearance: 'info',
                    autoDismiss: true
                })
                return false;
            }
            else return true;
        }
        if(betmode === 'auto') {
            if(betAmount === 0) {
                addToast("BetAmount can't be zero. Why don't you try Free Bet ?", {
                    appearance: 'info',
                    autoDismiss: true
                })
                return false;
            }
            else if(betAmount < 0.01) {
                addToast("BetAmount should be greater than 0.01", {
                    appearance: 'info',
                    autoDismiss: true
                })
                return false;
            }
            else if(betAmount > 20) {
                addToast("BetAmount can't be greater than 20.", {
                    appearance: 'info',
                    autoDismiss: true
                })
                return false;
            }
            else if(betAmount > wallet) {
                // console.log("hey")
                addToast("You don't have enough money to place the bet. Deposit some money or you can always earn money from Free bet", {
                    appearance: 'info',
                    autoDismiss: true
                }) 
                return false
            }
            else if(betAmount > 20) {
                // console.log("info: betAmount greater than max bet")
                addToast("BetAmount can't be greater than 20.", {
                    appearance: 'info',
                    autoDismiss: true
                })
                return false;
            }
            else return true
        }
    }

    const handleAutoBet = () => {              //#################### Function that handles Start Auto Bet Button ###########################
        var x = 1;
        const id = setInterval(() => {
                if((x.toString() === noOfRolls)) {
                    setIsAutoBetActive(false)
                    clearInterval(id)
                    setTimeout(() => setRollValue(10000), 2000)
                }
                setA(id);
                handleRoll()
                x++;
            }, 3000);
        
    }

    const handleBetOdds = () => {             //#################### Function that handles input Values on the Left pane #####################
        if(betOdds) {
            if(betOdds > 4750) 
                setBetOdds(4750);
            else if(betOdds < 1) 
                setBetOdds(1);
            var x = 95.00 / betOdds;
            // console.log("betodds", betOdds);
            var y = ((((betOdds*100)/100)*betAmount)-betAmount);
            // console.log("y",y);
            setWinChance(x.toFixed(2));
            setWinLow(Math.floor(x*100));
            setWinHigh(Math.floor(10000-winLow));
            setWinProfit(y.toFixed(2));
            // setChangeBetOddWin(betOdds);
            // setChangeBetOddLose(betOdds);
            // setTakeAwayAmount(0);
        }
        else {
            setWinChance('NaN');
            setWinHigh('NaN');
            setWinLow('NaN');
            setWinProfit(0);
        }
    }

    const handleResultDisplay = () => {
        if(win && rollValue !== 10000) {
            return true
        }
        else if(!win && rollValue !== 10000) {
            return false
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

    // #####################   Life Cycle Functions   ########################
        
    useEffect(() => {
        handleBetOdds();
    });

    useEffect(() => {
        const loggedInUser = localStorage.getItem('userId')
        if(loggedInUser) {
            setUserId(loggedInUser)
        }
        handleSetWallet();
    }, [])

    useEffect(() => {
        handleWin()
        handleHitMax()
        handleStopBetAfter()
        // if(betmode === "auto") {
        //     if(!handleValidation()) {
        //         clearInterval(a);
        //         setRollValue(10000)
        //         setIsAutoBetActive(false);
        //     } 
        // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rollValue])

    useEffect(() => {
        // console.log('takeAwayAmount',takeAwayAmount);
        // let w = Number(wallet) + Number(takeAwayAmount)
        // setWallet(w.toFixed(2))
        let w = Number(wallet);
        // console.log("hey", wallet, w);
        console.log(w.toFixed(2))
        if(betmode === "auto") {
            if(!handleValidation()) {
                clearInterval(a);
                setTimeout(() => setRollValue(10000), 2000)
                setIsAutoBetActive(false);
            } 
        }
        setWalletData(userId, w.toFixed(2));
        setHistory(!history);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wallet])

    useEffect(() => {
        if(betmode === 'manual' && rollValue !== 10000)
            pushMultiplyBetRollHistory(userId, rollHistory)    
        if(betmode === 'auto' && rollValue !== 10000) {
            // console.log(rollHistory)
            pushMultiplyBetRollHistory(userId, rollHistory)
        }
        // console.log('rollHistory',rollHistory)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history])

    return (
        <div>
            <Navbar wallet={wallet} />
            <div className="card card-body bg-gray text-white">
                <h1 className="text-white text-center py-4">Multiply your Bet here</h1>
                <div className="text-center mb-3">
                    <button className="btn btn-lg btn-primary mr-3" onClick={() => {
                        setBetmode('manual')
                        setRollValue(10000)
                        }}>Manual</button>
                    <button className="btn btn-lg btn-primary" onClick={() => {
                        setBetmode('auto')
                        setRollValue(10000)
                    }}>Auto</button>
                </div>
                <div className="row" style={{"fontWeight": 'lighter'}}>
                    <div className="col-4">
                        {betmode === "manual"
                        ?
                        <>    {/*#####################################  manual bet  ######################## */}
                            <label className="mb-3 h5">Max Bet</label>
                            <label className="float-right mr-4"><span className="text-gold h5">{MaxBet}</span></label><br></br>
                            <label className="mb-3 h5">Bet Amount</label>
                            <input 
                                className="float-right rounded borderless"
                                value={betAmount} 
                                onChange={event => {
                                    // if(event.target.value <= 20 && event.target.value > 0) 
                                    //     setBetAmount(event.target.value);
                                    // // else if(event.target.value <= 0) 
                                    // //     setBetAmount(0.1)
                                    // else
                                    //     setBetAmount(20);
                                    setBetAmount(event.target.value); 
                                    }}
                            ></input><br></br>
                            <label className="mb-3 h5">Bet Odds</label>
                            <input 
                                className="float-right rounded borderless"  
                                onChange={event => {setBetOdds(event.target.value);}}
                                value={betOdds}
                            ></input><br></br>
                            <label className="mb-3 h5">Win Profit</label>
                            <label className="float-right mr-4"><span className="text-gold h5">{winProfit}</span></label><br></br>
                            <label className="mb-4 h5">Win Probability</label>
                            <label className="float-right mr-4"><span className="text-gold h5">{winChance}%</span></label><br></br>
                        </>
                        :
                        <div className="disabled">  {/*######################################  auto bet  ######################## */}
                            <label className="mb-3 h5">Max Bet</label>
                            <label className="float-right mr-4"><span className="text-gold h5">{MaxBet}</span></label><br></br>
                            <label className="mb-3 h5">Base Bet</label>
                            <label className="float-right mr-4"><span className="text-gold h5">{basebet}</span></label><br></br>
                            <label className="mb-3 h5">Bet Amount</label>
                            <input 
                                className="float-right rounded borderless disabled"
                                value={betAmount} 
                                onChange={event => {
                                    // if(event.target.value <= 20) 
                                    //     setBetAmount(event.target.value);
                                    // // else if(event.target.value < 0) 
                                    // //     setBetAmount(0.01)
                                    // else
                                    //     setBetAmount(20); 
                                    setBetAmount(event.target.value);
                                    }}
                            ></input><br></br>
                            <label className="mb-3 h5">Bet Odds</label>
                            <input 
                                className="float-right rounded borderless disabled"  
                                onChange={event => {setBetOdds(event.target.value);}}
                                value={betOdds}
                            ></input><br></br>
                            <label className="mb-3 h5">Win Profit</label>
                            <label className="float-right mr-4"><span className="text-gold h5">{winProfit}</span></label><br></br>
                            <label className="mb-4 h5">Win Probability</label>
                            <label className="float-right mr-4"><span className="text-gold h5">{winChance}%</span></label><br></br>
                            <h5 className="bg-dark p-2 text-center rounded">On Hitting Max Bet</h5>
                            <div className="bg-darkgray p-2">
                                <input type="radio" value="basebet" name="max_bet" onChange={event => handleRadio(event)}></input>
                                <label className="h5 mx-2">Return to BaseBet</label><br></br>
                                <input type="radio" value="stopbet" name="max_bet" onChange={event => handleRadio(event)} defaultChecked></input>
                                <label className="h5 mx-2">Stop Betting</label>
                            </div>
                        </div>}
                    </div>
                    <div className="col-4 border-right border-left">
                        {betmode === "manual" 
                        ?
                        <>  {/*###########################################  manual bet  ######################## */}
                            <div className="text-center my-4"><span className="border m-auto display-4 p-3 text-white">{rollValue}</span></div>
                            <div className="row py-4">
                                <div className="col-6 text-center">
                                    <button 
                                        className="btn btn-info btn-lg m-auto" 
                                        value="high" 
                                        onClick={() => {
                                            if(handleValidation()) {
                                                setIsHi(1);
                                                setTakeAwayAmount(0);
                                                handleRoll();
                                            }
                                        }}>ROLL HI</button>
                                </div>
                                <div className="col-6 text-center">
                                    <button 
                                        className="btn btn-info btn-lg m-auto" 
                                        value="low" 
                                        onClick={() => {
                                            if(handleValidation()) {
                                                setIsHi(0);
                                                setTakeAwayAmount(0);
                                                handleRoll()
                                            }
                                        }}>ROLL LO</button>
                                </div>
                            </div>
                            <p>The roll should be greater than <span className="text-green">{winHigh}</span> if you roll High and less than <span className="text-green">{winLow}</span> if you roll low.</p>
                            {/* {rollValue !== 10000
                            ? 
                                handleResultDisplay()
                                ?
                                <>
                                <h1 className="text-green text-center">You Won !!</h1>
                                </>
                                :
                                <h1 className="text-danger text-center">You Lose !!</h1>
                            :
                            <></>
                            } */}
                        </>
                        :
                        <>  {/*##########################################  auto bet  ######################## */}
                            <div className="text-center my-4"><span className="border m-auto display-4 p-3 text-white">{rollValue}</span></div>
                            <label className="h5 mt-3">Bet On</label>
                            <div className="float-right mt-3">
                                <input type="radio" name="rollmode" value="hi" onChange={event => {setIsHi(1); handleRadio(event)}} defaultChecked></input><label className="mx-2">Hi</label>
                                <input type="radio" name="rollmode" value="lo" onChange={event => {setIsHi(0); handleRadio(event)}}></input><label className="mx-2">Lo</label>
                                <input type="radio" name="rollmode" value="alternate" onChange={event => {setIsHi(1); handleRadio(event)}}></input><label className="mx-2">Alternate</label>
                            </div><br></br>
                            <div className="w-100 text-center py-4">
                                {isAutoBetActive ? 
                                <button 
                                    className="btn btn-danger btn-lg m-auto"
                                    onClick={() => {
                                        clearInterval(a);
                                        setTimeout(() => setRollValue(10000), 2000)
                                        setIsAutoBetActive(false);
                                    }}
                                >Stop Auto Bet</button>
                                :
                                <button 
                                    className="btn btn-info btn-lg m-auto" 
                                    onClick={() => {
                                        setTakeAwayAmount(0);
                                        setProfit(0);
                                        setLoss(0);
                                        if(handleValidation()) {
                                            handleAutoBet();
                                            setIsAutoBetActive(true);
                                        }
                                        setBaseBet(betAmount);
                                    }}>Start Auto Bet</button>
                                }
                            </div>
                            <p>The roll should be greater than <span className="text-green">{winHigh}</span> if you roll High and less than <span className="text-green">{winLow}</span> if you roll low.</p>
                            {rollValue !== 10000
                            ? 
                                handleResultDisplay()
                                ?
                                <>
                                <h1 className="text-green text-center">You Won !!</h1>
                                </>
                                :
                                <h1 className="text-danger text-center">You Lose !!</h1>
                            :
                            <></>
                            }
                        </>}
                    </div>
                    <div className="col-4">
                        {betmode === "auto"
                        ?
                        <>  {/*#########################################  auto bet  ######################## */}
                            <label className="h5 mb-3">Number of rolls</label>
                            <input 
                                className="float-right rounded borderless"
                                value={noOfRolls}
                                onChange={event => {setNoOfRolls(event.target.value)}}></input><br></br>
                            <h5 className="text-center bg-dark p-2 rounded">Stop Betting After</h5>
                            <div className="bg-darkgray p-2 mb-2">
                                <label className="h5 mb-3">Profit {'>='}</label>
                                <input className="float-right rounded borderless" value={stopProfit} onChange={event => setStopProfit(event.target.value)} required></input><br></br>                            
                                <label className="h5 mb-3">Loss {'>='}</label>
                                <input className="float-right rounded borderless" value={stopLoss} onChange={event => setStopLoss(event.target.value)} required></input>
                            </div>
                            <nav className="nav nav-fill">
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a className="nav-item nav-link p-2 bg-dark borderless text-white" onClick={() => setOnWin(true)}>On Win</a>
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a className="nav-item nav-link p-2 bg-dark borderless text-white" onClick={() => setOnWin(false)}>On Lose</a>
                            </nav>
                            <div className="bg-darkgray p-2">
                            {onWin 
                                ? <> {/*#############################  On win ################################# */}
                                <p>Changes to make on every win</p>
                                {/* <input type="checkbox"></input><label className="mx-2 mb-3 h5">Return to BaseBet</label><br></br> */}
                                <label className="h5 mb-3">Increase bet by</label>
                                <input 
                                    className="float-right rounded borderless"
                                    value={increaseBetWin}
                                    onChange={event => setIncreaseBetWin(event.target.value)}
                                    ></input><br></br>
                                <label className="h5 mb-3">Change Bet Odds to</label>
                                <input  
                                    className="float-right rounded borderless"
                                    value={changeBetOddWin}
                                    onChange={event => setChangeBetOddWin(event.target.value)}></input>
                                </>
                                : <> {/*############################# On Lose  ################################ */}
                                <p>Changes to make on every lose</p>
                                {/* <input type="checkbox"></input><label className="mx-2 mb-3 h5">Return to BaseBet</label><br></br> */}
                                <label className="h5 mb-3">Increase bet by</label>
                                <input 
                                    className="float-right rounded borderless"
                                    value={increaseBetLose}
                                    onChange={event => setIncreaseBetLose(event.target.value)}
                                    ></input><br></br>
                                <label className="h5 mb-3">Change Bet Odds to</label>
                                <input  
                                    className="float-right rounded borderless"
                                    value={changeBetOddLose}
                                    onChange={event => setChangeBetOddLose(event.target.value)}></input>
                                </>
                            }
                            </div>
                        </>
                        :
                        <> {/*######################################### manual bet ######################################## */}
                        </>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MultiplyBet

// function HighRollers() {
//     return (
//         <div>
//             <div className="card card-body bg-gray">
//                 <div className="row">
//                     <div className="col-8">
//                         <h1 className="text-white">High Rollers</h1>
//                         <div className="text-center my-4"><span className="border m-auto display-4 p-3 text-white">10000</span></div>
//                         <div className="row py-3">
//                             <div className="col-6 text-center">
//                                 <button className="btn btn-info btn-lg m-auto">ROLL HI</button>
//                             </div>
//                             <div className="col-6 text-center">
//                                 <button className="btn btn-info btn-lg m-auto">ROLL LO</button>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-4">
//                         <div className="card card-body">
//                             <h3>How fair the game is</h3>
//                             <ol>
//                                 <li>Let me explain how fair we are.</li>
//                                 <li>Explanory text</li>
//                                 <li>and this is how its done</li>
//                             </ol>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default HighRollers
