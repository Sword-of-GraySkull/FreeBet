import React, { useState } from 'react'
import { getUserName } from '../Helpers/service';

function LoggedUser() {
    const [userName, setUserName] = useState() 
    
    
    const requireAuth = () => {
        const loggedInUser = localStorage.getItem('userId');

        if(loggedInUser) {
            getUserName(localStorage.getItem("userId")).then(res => {
                setUserName(res.data.username)
            })
            return true
        }
        else {
            return false
        }
    }

    return (
        requireAuth() 
        ?
        <div className="text-right p-2 bg-gray text-white text-shadow">
            Logged in as {userName}
        </div>
        :
        <>
        </>
    )
}

export default LoggedUser
