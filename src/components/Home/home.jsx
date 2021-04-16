import React, { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha';

import './home.css';
import transaction from './24-money.gif';
import { roll } from '../Helpers/service';

function Home() {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const [faucet, setFaucet] = useState(10000);
    const reCaptchaRef = React.createRef();

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    const handleRoll = () => {
        console.log("its working")
        roll()
        .then(x => {
            // console.log(x);
            setFaucet(x);
        });
    }

    function onSubmit () {
        const recaptchaValue = reCaptchaRef.current.getValue();
        this.props.onSubmit(recaptchaValue);
    }

    function onChange (value) {
        console.log("CAPTCHA value : ", value)
    }

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
                            <button className="btn btn-info btn-lg mx-3">Deposit</button>
                            <button className="btn btn-info btn-lg mx-3">Withdraw</button>
                        </div>
                        <div className="col-6 text-center">
                            {/* <button className="btn btn-info btn-lg m-auto">Withdraw</button> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-3 bg-gray text-center text-white">
                <span className="display-4">Get Free Money For Every 45 Minutes</span>
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
                <div className="w-100 text-center bg-gray p-4 my-4">
                    <div className="text-center my-4"><span className="border m-auto display-4 p-3 text-white">{faucet}</span></div><br></br>
                    <form onSubmit={onSubmit} className="text-center">
                    <ReCAPTCHA
                        
                        ref={reCaptchaRef}
                        sitekey="6Lc__qsaAAAAANZ2FqwF3PCF45gwhSPP-uGLisD8"
                        onChange={onChange}
                    />
                    <button className="btn btn-primary btn-lg m-2" onClick={() => handleRoll()}>ROLL</button>
                    </form>
                 </div>
            </div>
        </div>
    )
}

export default Home
