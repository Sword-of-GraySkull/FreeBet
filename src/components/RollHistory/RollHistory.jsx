import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'

import { getRollHistory , getWalletData, getMultiplyBetRollHistory} from '../Helpers/service';
import Navbar from '../Navbar/Navbar';
import './RollHistory.css'

function RollHistory() {
    const [rollData, setRollData] = useState([])
    const [multiplierRollData, setmultiplierRollData] = useState([])
    const [wallet, setWallet] = useState('0.0')
    const [offset, setOffset] = useState(0)
    const [multiplierOffset, setmultiplierOffset] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [multiplierCurrentPage, setmultiplierCurrentPage] = useState(0)
    const [perPage, setPerPage] = useState(5)
    const [multiplierPerPage, setmultiplierPerPage] = useState(5)
    const [pageCount, setPageCount] = useState(0)
    const [multiplierPageCount, setmultiplierPageCount] = useState(0)
    const [pageData, setPageData] = useState([])
    const [multiplierPageData, setmultiplierPageData] = useState([])

    // ##########################  handle functions #################################

    const handleGetRollHistory = () => {
        const userId = localStorage.getItem('userId')
        getRollHistory(userId)
        .then(res => {
            const { data } = res;
            // console.log(data.[0].rollHistory.[0].rollValue)
            var slice = data.[0].rollHistory.slice(offset, offset+perPage)
            setRollData(data.[0].rollHistory)
            setPageCount(Math.ceil(data.[0].rollHistory.length/perPage))
            setPageData(slice)
        })
    }

    const handleGetmultiplierRollHistory = () => {
        const userId = localStorage.getItem('userId')
        getMultiplyBetRollHistory(userId)
        .then(res => {
            const { data } = res;
            // console.log(data.[0].MultiplyBetRollHistory)
            var slice = data.[0].MultiplyBetRollHistory.slice(multiplierOffset, multiplierOffset+multiplierPerPage)
            setmultiplierRollData(data.[0].MultiplyBetRollHistory)
            setmultiplierPageCount(Math.ceil(data.[0].MultiplyBetRollHistory.length/multiplierPerPage))
            setmultiplierPageData(slice)
        })
    }

    function loadMoreData(){
        var data = rollData;
        var slice = data.slice(offset, offset + perPage)
        setPageCount(Math.ceil(data.length / perPage))
        setPageData(slice)
    }

    function loadMoreMultiplyBetData(){
        var data = multiplierRollData;
        var slice = data.slice(multiplierOffset, multiplierOffset + multiplierPerPage)
        setmultiplierPageCount(Math.ceil(data.length / multiplierPerPage))
        setmultiplierPageData(slice)
    }

    const handleSetWallet = () => {
        if(localStorage.getItem("userId")) {
            getWalletData(localStorage.getItem("userId")).then(res => {
                // console.log(res.data.wallet)
                setWallet((res.data.wallet))
            })
        } 
    }

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * perPage;
        setCurrentPage(selectedPage)
        setOffset(offset)
        loadMoreData()
    }

    const handlemultiplierPageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * multiplierPerPage;
        setmultiplierCurrentPage(selectedPage)
        setmultiplierOffset(offset)
        loadMoreMultiplyBetData()
    }


    useEffect(() => {
        handleSetWallet()
        handleGetRollHistory()
        handleGetmultiplierRollHistory()
    }, [])

    return (
        <div>
            <Navbar wallet={wallet}/>
            <p className="display-4 text-center p-4">Check Out your Roll History here</p>
            <div className="card card-body bg-gray text-white mb-4">
                <h1 className="text-white">FreeBet</h1>
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

            {/* betmode: "auto"
date: "5/12/2021"
multiplier: "2"
rollOption: "Hi"
rollValue: 7363
takeaway: 0.1
wallet: "0.35"
win: "Win"
winProfit: "0.10" */}
            <div className="card card-body bg-gray text-white">
                <h1 className="text-white">Multiply Bet</h1>
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
