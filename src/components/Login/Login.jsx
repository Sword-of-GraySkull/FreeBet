import React, { useState } from 'react'
import { useToasts } from 'react-toast-notifications';

import {registerUser, loginUser } from '../Helpers/service'
import Spinner from './spinner2.gif';
import Logo from './bee.png';

const pointGen = (pattern, num) => {
    return Array.apply(null, Array(num)).map(() => pattern).join("");
};

function Login() {
    const [loginPass, setLoginPass] = useState('')

    const { addToast } = useToasts()
    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [register, setRegister] = useState(false);
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const [unmaskedPassword, setUnmaskedPassword] = React.useState('');
    const [unmaskedConfirmPassword, setunmaskedConfirmPassword] = React.useState('');


    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
    
    const registerData = {
        username : username,
        password: unmaskedPassword,
        email: email,
        wallet: '0.000',
        wager: '0.000',
        lottery: 0
    }
    const loginData = {
        email: email,
        password: loginPass
    }

    function handleScroll ( divId ) {
        const test = document.getElementById(`${divId}`);
        test.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });  
    }

    function handleValidation() {
        if(register) {
            if(!username) {
                // console.log("hehe1")
                addToast('Username cannot be empty!!', {
                    appearance: 'error',
                    autoDismiss: true
                })
                return false;
            }
            if(typeof username !== "undefined") {
                if(!username.match(/^[a-zA-Z0-9]+$/)) {
                    // console.log("hehe2")
                    addToast('Username should contain only letters and numbers', {
                        appearance: 'error', 
                        autoDismiss: true
                    })
                    return false;
                }
            }
            if(!email) {
                // console.log("hehe3")
                addToast('Email cannot be empty', {
                    appearance: 'error',
                    autoDismiss: true
                })
                return false;
            }
            if(typeof email !== "undefined") {
                let lastAtPos = email.lastIndexOf('@');
                let lastDotPos = email.lastIndexOf('.');
    
                if(!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
                    addToast('Email is not valid', {
                        appearance: 'error',
                        autoDismiss: true
                    })
                    return false;
                }
            }
            if(!password) {
                addToast('Password cannot be empty!!', {
                    appearance: 'error',
                    autoDismiss: true
                })
                return false
            }
            // if(typeof password !== "undefined") {
            //     if(!password.match(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/)) {
            //         addToast("Password should contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character!!", {
            //             appearance: 'error',
            //             autoDismiss: true
            //         })
            //         return false
            //     }
            // }
            if(unmaskedPassword !== unmaskedConfirmPassword) {
                addToast("Password and Confirm Password don't seem to match", {
                    appearance: 'error',
                    autoDismiss: true
                })
                return false
            }
    
            return true;
        }
        else {
            if(!email) {
                // console.log("hehe3")
                addToast('Email cannot be empty', {
                    appearance: 'error',
                    autoDismiss: true
                })
                return false;
            }
            if(!loginPass) {
                addToast('Password cannot be empty!!', {
                    appearance: 'error',
                    autoDismiss: true
                })
                return false
            }
            return true
        }
    }

    const handlePasswordChange = (e) => {
        var index = e.target.selectionStart;
        var inputText = e.target.value;
        var addedTextLength = inputText.length - unmaskedPassword.length;
        if (addedTextLength > 0) {
            const newStr = inputText.slice(index - addedTextLength, index);
            setUnmaskedPassword(unmaskedPassword.slice(0, index - addedTextLength) + newStr + unmaskedPassword.slice(index - addedTextLength));
            // delete text
        } else if (addedTextLength < 0) {
            setUnmaskedPassword(unmaskedPassword.slice(0, index) + unmaskedPassword.slice(index - addedTextLength));
        }
        if (inputText.length === 0) {
            setPassword('');
        } else {
            setPassword(pointGen('●', inputText.length - 1) + inputText.charAt(inputText.length - 1));
        }
    }

    const handleConfirmPasswordChange = (e) => {
        var index = e.target.selectionStart;
        var inputText = e.target.value;
        var addedTextLength = inputText.length - unmaskedConfirmPassword.length;
        if (addedTextLength > 0) {
            const newStr = inputText.slice(index - addedTextLength, index);
            setunmaskedConfirmPassword(unmaskedConfirmPassword.slice(0, index - addedTextLength) + newStr + unmaskedConfirmPassword.slice(index - addedTextLength));
            // delete text
        } else if (addedTextLength < 0) {
            setunmaskedConfirmPassword(unmaskedConfirmPassword.slice(0, index) + unmaskedConfirmPassword.slice(index - addedTextLength));
        }
        if (inputText.length === 0) {
            setConfirmPassword('');
        } else {
            setConfirmPassword(pointGen('●', inputText.length - 1) + inputText.charAt(inputText.length - 1));
        }
    }

    // console.log(loginPass);
    // console.log(unmaskedPassword);
    // console.log(unmaskedConfirmPassword);

    React.useEffect(() => {
        const timer = window.setTimeout(() => {
          setPassword(pointGen('●', password.length));
        }, 800);
        return () => window.clearTimeout(timer);
      }, [password]);

    React.useEffect(() => {
        const timer = window.setTimeout(() => {
            setConfirmPassword(pointGen('●', confirmPassword.length));
        }, 800);
        return () => window.clearTimeout(timer);
    }, [confirmPassword]);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light rounded frostedGlass">
                <a className="navbar-brand text-info font-weight-bolder" href="/FreeBet">
                    {/* <img src={Logo} alt="Logo" width="36" height="36" className="vertical-align-middle" /> */}
                    <span className=""><img src={Logo} alt="Logo" width="50" height="50" className="vertical-align-middle" /></span>
                </a>
                <button className="custom-toggler navbar-toggler" style={{"backgroundColor": "whitesmoke"}} type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded={!isNavCollapsed ? "true" : "false"} aria-label="Toggle navigation" onClick={handleNavCollapse}>
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
                    <a 
                        className="nav-link text-info" style={{"cursor": "pointer"}} 
                        onClick={() => { 
                            setRegister(false);
                            setEmail('');
                            setPassword('');
                            setUsername('');
                            setConfirmPassword('');
                            setLoginPass('');
                            setIsLoading(false)}}
                        >Login</a>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a 
                        className="nav-link text-info" style={{"cursor": "pointer"}} 
                        onClick={() => {
                            setRegister(true);
                            setEmail('');
                            setPassword('');
                            setUsername('');
                            setConfirmPassword('');
                            setLoginPass('');
                            setIsLoading(false)}}
                        >Sign up</a>
                </div>
            </nav>
            <div className="row">
                <div className="w-50 mx-auto p-2">
                <div className="bg-gray p-3 text-white text-shadow">
                    {register ? 
                    <>
                        <h1 className="text-center">Create a New Account</h1>                        
                        <label className="h5">Email</label><br></br>
                        <input 
                            className="my-2 rounded borderless"
                            value={email}
                            onChange={event => setEmail(event.target.value)}></input><br></br>
                        <label className='h5'>Password</label><br></br>
                        <input 
                            className="my-2 rounded borderless"
                            type=""
                            value={password}                    
                            // onChange={event => setPassword(event.target.value)}
                            onChange={event => {
                                handlePasswordChange(event);
                            }}
                            ></input><br></br>
                        <label className='h5'>Confirm Password</label><br></br>
                        <input 
                            className="my-2 rounded borderless"
                            value={confirmPassword}
                            // onChange={event => setConfirmPassword(event.target.value)}
                            onChange={handleConfirmPasswordChange}
                            ></input><br></br>
                        <label className="h5">Username</label><br></br>
                        <input 
                            className="my-2 rounded borderless"
                            value={username}
                            onChange={event => setUsername(event.target.value)}></input><br></br>
                        <div className="text-center pt-3">
                            <button 
                                className="btn btn-lg btn-info m-auto mb-2"
                                onClick={() => {
                                    if(handleValidation()) {
                                        setIsLoading(true)
                                        registerUser(registerData).then(res => {
                                            // alert(res)
                                            setTimeout(() => {
                                                if(res) {
                                                setIsLoading(false)
                                                addToast(res, {
                                                appearance: 'info',
                                                autoDismiss: true
                                                })
                                                // console.log(res);
                                                if(res === "Account Created Successfully") {
                                                    setRegister(false);
                                                    setUsername('')
                                                    setEmail('')
                                                    setPassword('')
                                                    setLoginPass('')
                                                }
                                            }
                                            },3000)
                                        });
                                    }                                    
                                }}
                                >
                                {isLoading?<img src={Spinner} width="25" height="25" alt="loading" className="mr-2"></img>: <></>}
                                Register</button>
                        </div>
                    </>
                    :
                    <>
                        <h1 className="text-center">Sign In to your Account</h1>
                        <label className="h5">Email</label><br></br>
                        <input 
                            className="my-2 rounded borderless"
                            value={email}
                            onChange={event => setEmail(event.target.value)}></input><br></br>
                        <label className='h5'>Password</label><br></br>
                        <input 
                            className="my-2 rounded borderless"
                            value={loginPass}
                            type="password"
                            onChange={event => setLoginPass(event.target.value)}></input><br></br>
                        <div className="text-center pt-3">                        
                            <button 
                                className="btn btn-lg btn-info m-auto mb-2"
                                onClick={() => {                                    
                                    if(handleValidation()) {
                                        setIsLoading(true)
                                        loginUser(loginData).then(res => {
                                            // console.log(res)
                                            // alert(res.data.data);
                                            setTimeout(()=> {
                                                if(res) {
                                                setIsLoading(false)
                                            
                                            addToast(res.data.data, {
                                                appearance: 'info',
                                                autoDismiss: true
                                            })
                                            if(res.data.data === "Logged in Successfully") {
                                                // setUserId(res.data.users[0]._id)
                                                localStorage.setItem('userId', res.data.users[0]._id)
                                                // handleClose()
                                                window.history.replaceState('', 'loggedIn', '/FreeBet/')
                                                window.location.reload(false);
                                            }}
                                            }, 3000)
                                        });
                                    }
                                    }}
                                >
                                {isLoading?<img src={Spinner} width="25" height="25" alt="loading" className="mr-2"></img>: <></>}
                                  Login</button>
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a className="text-info nav-link " style={{"cursor": "pointer"}} onClick={() => {
                                setRegister(true);
                                setUsername('')
                                setEmail('')
                                setPassword('')
                                setConfirmPassword('')
                            }}>Create New Account</a>
                        </div>
                    </>
                    }
                        {/* <label className="h5">Username</label><br></br>
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
                                    if(handleValidation()) {
                                        registerUser(registerData).then(res => {
                                            // alert(res)
                                            addToast(res, {
                                                appearance: 'info',
                                                autoDismiss: true
                                            })
                                        });
                                        setRegister(false);
                                    }                                    
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
                                            window.history.replaceState('', 'loggedIn', '/FreeBet/')
                                            window.location.reload(false);
                                        }
                                    });
                                    }}
                                >Login</button>}
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            {/* <a className="text-info nav-link " style={{"cursor": "pointer"}} onClick={() => setRegister(true)}>Create New Account</a>
                        </div>  */}
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
