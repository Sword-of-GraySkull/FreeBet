import React, { useState } from 'react'
import { useToasts } from 'react-toast-notifications'

// import { Modal } from 'react-bootstrap';
// import { registerUser, loginUser } from '../Helpers/service';

function Navbar({wallet}) {
    const { addToast } = useToasts()
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    // var wallet = wallet
    // console.log("wallet", wallet)

    // eslint-disable-next-line no-unused-vars
    const [userId, setUserId] = useState()
    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')
    // const [wallet, setWallet] = useState()
    // const registerData = {
    //     username : username,
    //     password: password,
    //     wallet: '0.00'
    // }
    // const loginData = {
    //     username: username,
    //     password: password
    // }
    // const [showModal, setShow] = useState(false);
    // const [register, setRegister] = useState(false);

    // const handleOpen = () => setShow(true)

    // const handleClose = () => setShow(false)

    const handleLogout = () => {
        setUserId();
        // setUsername("");
        // setPassword("");
        localStorage.removeItem("userId");
      };

    const requireAuth = () => {
        const loggedInUser = localStorage.getItem('userId');

        if(loggedInUser) {
            return true
        }
        else {
            return false
        }
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
                    {requireAuth()
                    ?
                    <a className="nav-link text-info" href="/FreeBet/#/multiplybet">Crest & Trough</a>
                    :
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a className="nav-link text-info" href="/FreeBet/#/login">Crest & Trough</a>
                    // style={{"cursor": "pointer"}} onClick={() =>{
                    //     setRegister(false)
                    //     setUsername('')
                    //     setPassword('')
                    //     handleOpen()}}
                    }
                    {requireAuth()
                    ?
                    <a href="/FreeBet/#/lottery" className="nav-link text-info">Lottery</a>
                    :
                    <a className="nav-link text-info" href="/FreeBet/#/login">Lottery</a>
                        /*style={{"cursor": "pointer"}} onClick={() =>{
                        setRegister(false)
                        setUsername('')
                        setPassword('')
                        handleOpen()}}*/
                        
                    }
                    {requireAuth()
                    ?
                    <a href="/FreeBet/#/fakedoor" className="nav-link text-info">Fake Door</a>
                    :
                    <a className="nav-link text-info" href="/FreeBet/#/login">Fake Door</a>
                    }
                    {requireAuth()
                    ? <a className="nav-link text-info" href="/FreeBet/#/rollHistory">Roll History</a>
                    : <a className="nav-link text-info" href="/FreeBet/#/login">Roll History</a>}                    
                    {requireAuth()
                    ?
                    <a href="/FreeBet/#/profile" className="nav-link text-info">Profile</a>
                    :
                    <a href="/FreeBet/#/profile" className="nav-link text-info">Profile</a>
                    }
                    <a href="/FreeBet/#/about" className="nav-link text-info">About Us</a>
                    {requireAuth() 
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    ? <a className="nav-link text-info" style={{"cursor": "pointer"}} onClick={()=> {
                        handleLogout();
                        // alert("Logged out Successfully!!")
                        // window.location.reload(false);
                        window.history.replaceState('','loggedOut','/')
                        addToast('Logged Out Successfully!!', {
                            appearance: 'info',
                            autoDismiss: true
                        })
                        }}>Logout</a>
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    : <a className="nav-link text-info" href="/FreeBet/#/login">Login</a>
                        /* style={{"cursor": "pointer"}} onClick={() =>{
                        setRegister(false)
                        setUsername('')
                        setPassword('')
                        handleOpen()}} */
                    }
                    {requireAuth()
                    ?
                    <a href="/FreeBet/#/wallet" className="nav-link text-info" style={{"pointerEvents": "none"}}>${wallet}</a>
                    :
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a className="nav-link text-info" href="/FreeBet/#/login">$0.00</a> 
                        /*style={{"cursor": "pointer"}} onClick={() =>{
                        setRegister(false)
                        setUsername('')
                        setPassword('')
                        handleOpen()}}*/
                    }
                </div>
            </nav>
        </div>
    )
}

export default Navbar


// Perfectly working navbar

// import React, { useState } from 'react'
// import { useToasts } from 'react-toast-notifications'

// // import { Modal } from 'react-bootstrap';
// // import { registerUser, loginUser } from '../Helpers/service';

// function Navbar({wallet}) {
//     const { addToast } = useToasts()
//     const [isNavCollapsed, setIsNavCollapsed] = useState(true);

//     const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

//     // var wallet = wallet
//     // console.log("wallet", wallet)

//     // eslint-disable-next-line no-unused-vars
//     const [userId, setUserId] = useState()
//     // const [username, setUsername] = useState('')
//     // const [password, setPassword] = useState('')
//     // const [wallet, setWallet] = useState()
//     // const registerData = {
//     //     username : username,
//     //     password: password,
//     //     wallet: '0.00'
//     // }
//     // const loginData = {
//     //     username: username,
//     //     password: password
//     // }
//     // const [showModal, setShow] = useState(false);
//     // const [register, setRegister] = useState(false);

//     // const handleOpen = () => setShow(true)

//     // const handleClose = () => setShow(false)

//     const handleLogout = () => {
//         setUserId();
//         // setUsername("");
//         // setPassword("");
//         localStorage.removeItem("userId");
//       };

//     const requireAuth = () => {
//         const loggedInUser = localStorage.getItem('userId');

//         if(loggedInUser) {
//             return true
//         }
//         else {
//             return false
//         }
//     }

//     return (
//         <div>
//             <nav className="navbar navbar-expand-lg navbar-light bg-light rounded">
//                 <a className="navbar-brand text-info font-weight-bolder" href="/FreeBet">
//                     {/* <img src={Logo} alt="Logo" width="36" height="36" className="vertical-align-middle" /> */}
//                     <span className="">FREE MONEY</span>
//                 </a>
//                 <button className="custom-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded={!isNavCollapsed ? "true" : "false"} aria-label="Toggle navigation" onClick={handleNavCollapse}>
//                     <span className="navbar-toggler-icon"></span>
//                 </button>

//                 <div className={`${isNavCollapsed ? 'collapse' : 'collapse'} navbar-collapse`} id="navbarsExample09">
//                     {requireAuth()
//                     ?
//                     <a className="nav-link text-info" href="/FreeBet/#/multiplybet">Multiply bet</a>
//                     :
//                     // eslint-disable-next-line jsx-a11y/anchor-is-valid
//                     <a className="nav-link text-info" href="/FreeBet/#/login">Multiply bet</a>
//                     // style={{"cursor": "pointer"}} onClick={() =>{
//                     //     setRegister(false)
//                     //     setUsername('')
//                     //     setPassword('')
//                     //     handleOpen()}}
//                     }
//                     {requireAuth()
//                     ?
//                     <a href="/FreeBet/#/lottery" className="nav-link text-info">Lottery</a>
//                     :
//                     <a className="nav-link text-info" href="/FreeBet/#/login">Lottery</a>
//                         /*style={{"cursor": "pointer"}} onClick={() =>{
//                         setRegister(false)
//                         setUsername('')
//                         setPassword('')
//                         handleOpen()}}*/
                        
//                     }
//                     {requireAuth()
//                     ?
//                     <a href="/FreeBet/#/fakedoor" className="nav-link text-info">Fake Door</a>
//                     :
//                     <a className="nav-link text-info" href="/FreeBet/#/login">Fake Door</a>
//                     }
//                     {requireAuth()
//                     ? <a className="nav-link text-info" href="/FreeBet/#/rollHistory">Roll History</a>
//                     : <a className="nav-link text-info" href="/FreeBet/#/login">Roll History</a>}
//                     {requireAuth() 
//                     // eslint-disable-next-line jsx-a11y/anchor-is-valid
//                     ? <a className="nav-link text-info" style={{"cursor": "pointer"}} onClick={()=> {
//                         handleLogout();
//                         // alert("Logged out Successfully!!")
//                         // window.location.reload(false);
//                         window.history.replaceState('','loggedOut','/')
//                         addToast('Logged Out Successfully!!', {
//                             appearance: 'info',
//                             autoDismiss: true
//                         })
//                         }}>Logout</a>
//                     // eslint-disable-next-line jsx-a11y/anchor-is-valid
//                     : <a className="nav-link text-info" href="/FreeBet/#/login">Login</a>
//                         /* style={{"cursor": "pointer"}} onClick={() =>{
//                         setRegister(false)
//                         setUsername('')
//                         setPassword('')
//                         handleOpen()}} */
//                     }
//                     {requireAuth()
//                     ?
//                     <a href="/FreeBet/#/wallet" className="nav-link text-info" style={{"pointerEvents": "none"}}>${wallet}</a>
//                     :
//                     // eslint-disable-next-line jsx-a11y/anchor-is-valid
//                     <a className="nav-link text-info" href="/FreeBet/#/login">$0.00</a> 
//                         /*style={{"cursor": "pointer"}} onClick={() =>{
//                         setRegister(false)
//                         setUsername('')
//                         setPassword('')
//                         handleOpen()}}*/
//                     }
//                 </div>
//             </nav>
//         </div>
//     )
// }

// export default Navbar
