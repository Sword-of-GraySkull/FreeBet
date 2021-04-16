import React from 'react'

function highRollers() {
    return (
        <div>
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
        </div>
    )
}

export default highRollers
