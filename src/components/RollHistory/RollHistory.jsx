// Version 0.1.1 Perfectly working Pagination , bug fixes

import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'

import { getRollHistory , getWalletData, getMultiplyBetRollHistory} from '../Helpers/service';
import LoggedUser from '../LoggedUser/LoggedUser';
import Navbar from '../Navbar/Navbar';
import './RollHistory.css'

const PER_PAGE = 5;

function RollHistory() {
    const [rollData, setRollData] = useState([])
    const [multiplierRollData, setmultiplierRollData] = useState([])
    const [wallet, setWallet] = useState('0.0')
    const [currentPage, setCurrentPage] = useState(0)
    const [multiplierCurrentPage, setmultiplierCurrentPage] = useState(0)

    // ##########################  handle functions #################################

    const handleGetRollHistory = () => {
        const userId = localStorage.getItem('userId')
        getRollHistory(userId)
        .then(res => {
            const { data } = res;
            setRollData(data.[0].rollHistory);
        })
    }

    const handleGetmultiplierRollHistory = () => {
        const userId = localStorage.getItem('userId')
        getMultiplyBetRollHistory(userId)
        .then(res => {
            const { data } = res;
            setmultiplierRollData(data.[0].MultiplyBetRollHistory)
        })
    }

    const handleSetWallet = () => {
        if(localStorage.getItem("userId")) {
            getWalletData(localStorage.getItem("userId")).then(res => {
                // console.log(res.data.wallet)
                setWallet((res.data.wallet))
            })
        } 
    }

    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    }

    const handlemultiplierPageClick = ({ selected: selectedPage }) => {
        setmultiplierCurrentPage(selectedPage)
    }

    // ###################################  LIFE CYCLE FUNCTIONS ##################################
    useEffect(() => {
        handleSetWallet()
        handleGetRollHistory()
        handleGetmultiplierRollHistory()
    }, [])

    const offset = currentPage * PER_PAGE;
    const multiplierOffset = multiplierCurrentPage * PER_PAGE;

    const pageData = rollData.slice(offset, offset + PER_PAGE);
    const multiplierPageData = multiplierRollData.slice(multiplierOffset, multiplierOffset + PER_PAGE);

    const pageCount = Math.ceil(rollData.length / PER_PAGE);
    const multiplierPageCount = Math.ceil(multiplierRollData.length / PER_PAGE)

    return (
        <div>
            <Navbar wallet={wallet}/>
            <LoggedUser />
            <p className="display-4 text-center p-4">Check Out your Roll History here</p>
            <div className="mb-4">
                <h1 className="">FreeBet</h1>
                <table className="table table-bordered m-auto text-center">
                    <thead>
                        <th>SNO</th>
                        <th>RollValue</th>
                        <th>Win/Lose</th>
                        <th>Roll Takeaway</th>
                        <th>Date</th>
                        <th>Wallet</th>
                    </thead>
                    {pageData.map((item, index) => {
                    return (
                    <tbody>
                        <th>{index+1}</th>
                        <td>{item.rollValue}</td>
                        {item.win === 'Win' ?
                            <td className="text-green">{item.win}</td>
                        :
                            <td className="text-danger">{item.win}</td>
                        }
                        <td>{item.takeaway}</td>
                        <td>{item.date}</td>
                        <td>{item.wallet}</td>
                    </tbody>)})}
                </table> 
                <ReactPaginate previousLabel={"prev"} 
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed ={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pages pagination"}
                    activeClassName={"active"}
                />
            </div>

            <div className="">
                <h1 className="">Multiply Bet</h1>
                <table className="table table-bordered m-auto text-center">
                    <thead>
                        <th>SNO</th>
                        <th>RollValue</th>
                        <th>Betmode</th>
                        <th>Multiplier</th>
                        <th>Roll Option</th>
                        <th>Win/Lose</th>
                        <th>Win Profit</th>
                        <th>Roll Takeaway</th>
                        <th>Date</th>
                        <th>Wallet</th>
                    </thead>
                    {multiplierPageData.map((item, index) => {
                    return (
                    <tbody>
                        <th>{index+1}</th>
                        <td>{item.rollValue}</td>
                        <td>{item.betmode}</td>
                        <td>{item.multiplier}</td>
                        <td>{item.rollOption}</td>
                        {item.win === 'Win' ?
                            <td className="text-green">{item.win}</td>
                        :
                            <td className="text-danger">{item.win}</td>
                        }
                        <td>{item.winProfit}</td>
                        <td>{item.takeaway}</td>
                        <td>{item.date}</td>
                        <td>{item.wallet}</td>
                    </tbody>)})}
                </table> 
                <ReactPaginate previousLabel={"prev"} 
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={multiplierPageCount}
                    marginPagesDisplayed ={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlemultiplierPageClick}
                    containerClassName={"pages pagination"}
                    activeClassName={"active"}
                />
            </div>
        </div>
    )
}

export default RollHistory
