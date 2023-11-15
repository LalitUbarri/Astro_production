import React from 'react'
import { FRONTEND_NAME } from '../configuration/constants';

import './chat.css'

export default function Loginuser(props) {
    const [userMsisdn, setUserMsisdn] = React.useState("");

    const handleMsisdnChange = (event) => {
        setUserMsisdn(event.target.value);
    };
    const loginUser=()=>{
        sessionStorage["chatUserMsisdn"]= userMsisdn;

        props.history.push(FRONTEND_NAME+ "/userList");
    }
 

  

    return (
        <div className="home-container">
        <input
          type="text"
          placeholder="Enter msisdn"
          value={userMsisdn}
          onChange={handleMsisdnChange}
          className="text-input-field"
        />
        <button onClick={loginUser} className="enter-room-button">
         Login
        </button>
      </div>
    )
}
