import React, { useState } from 'react'

import './home.css';
import transaction from './24-money.gif';

function Home() {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light rounded">
                <a class="navbar-brand text-info font-weight-bolder" href="/">
                    {/* <img src={Logo} alt="Logo" width="36" height="36" className="vertical-align-middle" /> */}
                    <span className="">FREE MONEY</span>
                </a>
                <button class="custom-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded={!isNavCollapsed ? "true" : "false"} aria-label="Toggle navigation" onClick={handleNavCollapse}>
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class={`${isNavCollapsed ? 'collapse' : 'collapse'} navbar-collapse`} id="navbarsExample09">
                {/* <div class="navbar-collapse" id="navbarsExample09"> */}
                    <a className="nav-link text-info" href="/contact">Free bet</a>
                    <a className="nav-link text-info" href="/login">Multiply bet</a>
                    <a href="/request-demo" className="nav-link text-info" >Lottery</a>
                    <a href="/wallet" className="nav-link text-info">$0.000000001</a>
                </div>
            </nav>
            {/* <nav className="nav-bar">
                <span className="fs-4 nav-item">FREE MONEY</span>
                <span className="float-right nav-item">
                    <div class="pos-f-t">
                    <div class="collapse" id="navbarToggleExternalContent">
                        <div class="bg-dark p-4">
                        <h4 class="text-white">Collapsed content</h4>
                        <span class="text-muted">Toggleable via the navbar brand.</span>
                        </div>
                    </div>
                    <nav class="navbar navbar-dark bg-dark">
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                        </button>
                    </nav>
                    </div>
                </span>
                <span className="float-right nav-item">$0.000000000</span>
            </nav> */}
            <div className="row p-4">
                <div className="col-6 p-4 text-center"><img src={transaction} width="300" height="300" alt="transaction"/></div>
                <div className="col-6">
                    <span className="display-3">Make your transactions in a snap</span>
                    <div className="row py-3 my-4">
                        <div className="col-6 text-center">
                            <button className="btn btn-info btn-lg m-auto">Deposit</button>
                        </div>
                        <div className="col-6 text-center">
                            <button className="btn btn-info btn-lg m-auto">Withdraw</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card card-body bg-gray">
                <div className="row">
                    <div className="col-8">
                        <h1 className="text-white">High Rollers</h1>
                        <div className="text-center my-4"><span className="border m-auto display-4 p-3 text-white">10000</span></div>
                        <div className="row py-3">
                            <div className="col-6 text-center">
                                <button className="btn btn-info btn-lg m-auto">ROLL HI</button>
                            </div>
                            <div className="col-6 text-center">
                                <button className="btn btn-info btn-lg m-auto">ROLL LO</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card card-body">
                            <h3>How fair the game is</h3>
                            <ol>
                                <li>Let me explain how fair we are.</li>
                                <li>Explanory text</li>
                                <li>and this is how its done</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-4 px-4 w-100">
                <table class="table table-bordered m-auto w-50">
                    <thead>
                        <tr>
                        <th scope="col">Roll</th>
                        <th scope="col">Prize</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">10000</th>
                            <td>1.0000</td>
                        </tr>
                        <tr>
                            <th scope="row">9999-9800</th>
                            <td>0.0090</td>
                        </tr>
                        <tr>
                            <th scope="row">9800-1000</th>
                            <td>0.0009</td>
                        </tr>
                    </tbody>
                </table>
                <div className="w-100 text-center">
                <span className="my-3">Captcha goes here</span><br></br>
                <button className="btn btn-primary btn-lg m-2">ROLL</button>
                </div>
            </div>
        </div>
    )
}

export default Home
