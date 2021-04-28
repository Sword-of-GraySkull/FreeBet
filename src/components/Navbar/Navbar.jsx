import React, { useState } from 'react'

function Navbar() {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

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
                    <a className="nav-link text-info" href="/freebet">Free bet</a>
                    <a className="nav-link text-info" href="/FreeBet/#/multiplybet">Multiply bet</a>
                    <a href="/lottery" className="nav-link text-info" >Lottery</a>
                    <a href="/wallet" className="nav-link text-info">$0.000000001</a>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
