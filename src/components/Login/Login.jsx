import React, { useState } from 'react'
import { useToasts } from 'react-toast-notifications';

import {registerUser, loginUser } from '../Helpers/service'

function Login() {
    const { addToast } = useToasts()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [register, setRegister] = useState(false);
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
    
    const registerData = {
        username : username,
        password: password,
        wallet: '0.00'
    }
    const loginData = {
        username: username,
        password: password
    }

    function handleScroll ( divId ) {
        const test = document.getElementById(`${divId}`);
        test.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });  
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light rounded">
                <a className="navbar-brand text-info font-weight-bolder" href="/FreeBet">
                    {/* <img src={Logo} alt="Logo" width="36" height="36" className="vertical-align-middle" /> */}
                    <span className="">FREE MONEY</span>
                </a>
                <button className="custom-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded={!isNavCollapsed ? "true" : "false"} aria-label="Toggle navigation" onClick={handleNavCollapse}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`${isNavCollapsed ? 'collapse' : 'collapse'} navbar-collapse`} id="navbarsExample09">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className="nav-link text-info" style={{"cursor": "pointer"}} onClick={() => handleScroll('nav2')}>nav2</a>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className="nav-link text-info" style={{"cursor": "pointer"}} onClick={() => handleScroll('nav3')}>nav3</a>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className="nav-link text-info" style={{"cursor": "pointer"}} onClick={() => handleScroll('nav4')}>nav4</a>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className="nav-link text-info" style={{"cursor": "pointer"}} onClick={() => setRegister(false)}>Login</a>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className="nav-link text-info" style={{"cursor": "pointer"}} onClick={() => setRegister(true)}>Sign up</a>
                </div>
            </nav>
            <div className="row">
                <div className="col-6">

                </div>
                <div className="col-6">
                <div className="bg-gray p-3 text-white">
                    {register ? 
                    <h1 className="text-center">Create a New Account</h1>
                    :
                    <h1 className="text-center">Sign In to your Account</h1>}
                        <label className="h5">Username</label><br></br>
                        <input 
                            className="my-2 rounded borderless"
                            value={username}
                            onChange={event => setUsername(event.target.value)}></input><br></br>
                        <label className='h5'>Password</label><br></br>
                        <input 
                            className="my-2 rounded borderless"
                            value={password}
                            onChange={event => setPassword(event.target.value)}></input><br></br>
                        <div className="text-center pt-3">
                            {register 
                            ? 
                            <button 
                                className="btn btn-lg btn-info m-auto mb-2"
                                onClick={() => {
                                    registerUser(registerData).then(res => {
                                        // alert(res)
                                        addToast(res, {
                                            appearance: 'info',
                                            autoDismiss: true
                                        })
                                    });
                                    setRegister(false);
                                    
                                }}
                                 >Register</button>
                            : 
                            <button 
                                className="btn btn-lg btn-info m-auto mb-2"
                                onClick={() => {
                                    loginUser(loginData).then(res => {
                                        // console.log(res)
                                        // alert(res.data.data);
                                        addToast(res.data.data, {
                                            appearance: 'info',
                                            autoDismiss: true
                                        })
                                        if(res.data.data === "Logged in Successfully") {
                                            // setUserId(res.data.users[0]._id)
                                            localStorage.setItem('userId', res.data.users[0]._id)
                                            // handleClose()
                                            window.history.replaceState('', 'loggedIn', '/')
                                            window.location.reload(false);
                                        }
                                    });
                                    }}
                                >Login</button>}
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a className="text-info nav-link " style={{"cursor": "pointer"}} onClick={() => setRegister(true)}>Create New Account</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card my-4" id="nav2">
                <div className="card-body">
                    <h1>nav2</h1>
                    <p>Mauris placerat dolor massa, sed porttitor massa volutpat sed. Donec ac eros quam. Vestibulum non massa eu diam pulvinar sagittis suscipit at purus. In rhoncus velit sed neque vulputate, quis sollicitudin arcu egestas. Pellentesque dignissim, quam vehicula auctor lobortis, elit sapien consequat metus, ac faucibus sapien augue non neque. Vivamus sapien dolor, suscipit sed sem sed, ultrices finibus nibh. Maecenas aliquet elit id est mattis, eget eleifend ex tristique. Vivamus ac purus dignissim metus gravida ornare. Sed magna lacus, tincidunt a facilisis at, condimentum a neque. Vestibulum ornare eget sem vitae vehicula. Nam non diam a quam feugiat iaculis. Aenean luctus, lacus at iaculis laoreet, risus diam egestas mauris, at iaculis tellus mi efficitur diam. Etiam imperdiet consequat nulla. Integer molestie ipsum quis porttitor efficitur. Nulla pretium commodo massa, eu aliquam felis bibendum ac. Cras in accumsan mi, sed egestas augue.</p>
                </div>
            </div>
            <div className="card my-4" id="nav3">
                <div className="card-body">
                    <h1>nav3</h1>
                    <p>Mauris placerat dolor massa, sed porttitor massa volutpat sed. Donec ac eros quam. Vestibulum non massa eu diam pulvinar sagittis suscipit at purus. In rhoncus velit sed neque vulputate, quis sollicitudin arcu egestas. Pellentesque dignissim, quam vehicula auctor lobortis, elit sapien consequat metus, ac faucibus sapien augue non neque. Vivamus sapien dolor, suscipit sed sem sed, ultrices finibus nibh. Maecenas aliquet elit id est mattis, eget eleifend ex tristique. Vivamus ac purus dignissim metus gravida ornare. Sed magna lacus, tincidunt a facilisis at, condimentum a neque. Vestibulum ornare eget sem vitae vehicula. Nam non diam a quam feugiat iaculis. Aenean luctus, lacus at iaculis laoreet, risus diam egestas mauris, at iaculis tellus mi efficitur diam. Etiam imperdiet consequat nulla. Integer molestie ipsum quis porttitor efficitur. Nulla pretium commodo massa, eu aliquam felis bibendum ac. Cras in accumsan mi, sed egestas augue.</p>
                </div>
            </div>
            <div className="card my-4" id="nav4">
                <div className="card-body">
                    <h1>nav4</h1>
                    <p>Mauris placerat dolor massa, sed porttitor massa volutpat sed. Donec ac eros quam. Vestibulum non massa eu diam pulvinar sagittis suscipit at purus. In rhoncus velit sed neque vulputate, quis sollicitudin arcu egestas. Pellentesque dignissim, quam vehicula auctor lobortis, elit sapien consequat metus, ac faucibus sapien augue non neque. Vivamus sapien dolor, suscipit sed sem sed, ultrices finibus nibh. Maecenas aliquet elit id est mattis, eget eleifend ex tristique. Vivamus ac purus dignissim metus gravida ornare. Sed magna lacus, tincidunt a facilisis at, condimentum a neque. Vestibulum ornare eget sem vitae vehicula. Nam non diam a quam feugiat iaculis. Aenean luctus, lacus at iaculis laoreet, risus diam egestas mauris, at iaculis tellus mi efficitur diam. Etiam imperdiet consequat nulla. Integer molestie ipsum quis porttitor efficitur. Nulla pretium commodo massa, eu aliquam felis bibendum ac. Cras in accumsan mi, sed egestas augue.</p>
                </div>
            </div>

        </div>
    )
}

export default Login
