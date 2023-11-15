import React, { useRef } from 'react'
import { withRouter } from 'react-router';
import { FRONTEND_NAME } from '../configuration/constants';
import useOutsideClick from '../hooks/useOutsideClick';
import freeChatIcon from '../images/freeChatIcon.png';
import freeCallIcon from '../images/freeCallIcon.png';
import crossIcon from '../images/crossIcon.png';
import '../styles/freeChatPopup.css';
const FreeChatPopup=(props)=> {
    const ref = useRef();

    useOutsideClick(ref, () => {
        console.log('You clicked outside');
       props.toggleFreeChatPopup();
      });

      const handleChat = ()=>{
        props.history.push({
            pathname: FRONTEND_NAME + "/chatList",
            state: { typeOfService: "Chat",
         freeSession: true}
          }) 
      }

      const handleCall = ()=>{
      props.history.push({
        pathname: FRONTEND_NAME + "/talk",
        state: { typeOfService: "Call",
        freeSession: true }
      }) 
    }

    return (
        <div className="modal" style={{display:"block"}}>
       
        <div className="freeSession-modal-content"  ref={ref}>
        <div className="crossIcon" onClick={()=>props.toggleFreeChatPopup()}><img src={crossIcon} alt='X'></img></div>
            <p className="freeSessionHeading mb42">{props.heading}</p>
            <div className="freeSession">
                <div onClick={handleChat}  className="mt30">
                <img src={freeChatIcon} alt='chat'/>
                <p className="freeText">{props.option1}</p>
                </div>  
                <div onClick={handleCall}  className="mt30">
                <img src={freeCallIcon} alt='call'/>
                <p className="freeText">{props.option2}</p>
                </div>  
            </div>
        </div>
    </div>
    )
}
export default withRouter(FreeChatPopup)