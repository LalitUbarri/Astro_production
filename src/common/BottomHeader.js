import React, { useState } from 'react';
import chaticon from "../images/chat-icon.svg";
import callicon from "../images/call-icon.svg";
// import newsicon from "../images/news-icon.svg";
import contecticon from "../images/contect-icon.svg";
import google from "../images/google.png";
import apple from "../images/apple.png";
import { useHistory } from 'react-router-dom'
import { FRONTEND_NAME } from "../configuration/constants";
import Signup from "../components/signup";
import '../styles/home.css'
import { useTranslation } from 'react-i18next';
// import $ from 'jquery';

// const isUserLoggedIn1 = localStorage.getItem('msisdn')
export default function BottomHeader(props) {

  const history = useHistory();
  const [BottomHeaderData, setBottomHeaderData] = useState({
    isUserLoggedIn: localStorage["msisdn"] ? true : false,
    isChatActive: false,
    displaySignupPopUp: false,
    loginSelected: true,
  })

  const [t] = useTranslation();

  // useEffect(()=>{
  //   $()
  // },[])


  const openChatList = () => {

    let isChatActive = BottomHeaderData.isChatActive;
    if (isChatActive) {
      history.push({
        pathname: FRONTEND_NAME + "/chat",
        state: { panditMsisdn: BottomHeaderData.panditMsisdn }
      });
    }
    else {

      history.push({
        pathname: FRONTEND_NAME + "/chatList",
        state: { typeOfService: "Chat" },
      });
    }
  }

  const openLoginPopup = () => {
    setBottomHeaderData({
      ...BottomHeaderData,
      displaySignupPopUp: true,
      loginSelected: true,
    });
  };

  const openSignupPopup = () => {
    setBottomHeaderData({
      ...BottomHeaderData,
      displaySignupPopUp: true,
      loginSelected: false,
    });
  };

  const closeSignUpPopup = () => {
    setBottomHeaderData({
      ...BottomHeaderData,
      displaySignupPopUp: false,
    });
  };

  const closePopupOnLogin = () => {
    localStorage["isUserLoggedIn"] = true;
    setBottomHeaderData({
      ...BottomHeaderData,
      displaySignupPopUp: false,
      isUserLoggedIn: true,
    });
    history.push(FRONTEND_NAME + "/home");

  };

  const downloadApp = () => {
    window.open("https://play.google.com/store/apps/details?id=com.astroking", "_blank")
  }
  return <>

    {BottomHeaderData.displaySignupPopUp && (
      <Signup
        openLoginPopup={openLoginPopup}
        openSignupPopup={openSignupPopup}
        closePopUp={closeSignUpPopup}
        closeOnLogin={closePopupOnLogin}
        isLogin={BottomHeaderData.loginSelected}
      />
    )}
    <div className='container'>
      <div className="button_group_container">
        <div className='button_content_container'>
          <div className='button_header'>
            <p>Connect with an Astrologer on Call or Chat for more personalised detailed predictions.</p>
          </div> 
          <div className='button_group'>
            <button onClick={() => history.push({
              pathname: FRONTEND_NAME + "/talk",
              state: { typeOfService: "Call" },
            })

        }>  <img src={callicon} alt="call" width="43px" /> {t('Talk_to_Astrologer')} </button>

            <button onClick={() => openChatList()}>  <img src={chaticon} alt="chat" width="50px" /> {t('Chat_with_Astrologer')}</button>
          </div>
        </div>
      </div>
      </div>

    {/* <div className="p-0 carousel-menu">
      <div
        className={"row-cols-1" + " " + (BottomHeaderData.isChatActive ? "activeGreen" : "")}
        onClick={() => openChatList()}
      >
        <img src={chaticon} alt="chat" width="50px" />
        {/* <p className="d-none1">{t('Chat_with_Astrologer')}</p>
        <p className="mob"></p>
      </div>
      <div
        className="row-cols-1"
        onClick={
          () =>
            history.push({
              pathname: FRONTEND_NAME + "/talk",
              state: { typeOfService: "Call" },
            })

        }
      >
        <img src={callicon} alt="call" width="50px" />
        <p className="d-none1">{t('Talk_to_Astrologer')}</p>
        <p className="mob_D-none">{t('Talk_to_Astrologer')}</p>
      </div>
    </div> */}

  </>
}