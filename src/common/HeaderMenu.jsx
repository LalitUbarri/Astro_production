import React, { useState } from "react";
import { FRONTEND_NAME } from "../configuration/constants";
import { withRouter } from 'react-router-dom'
import Popup from "../components/popupChat"
import Support from "../components/Support";
import Signup from "../components/signup";
import {useHistory} from 'react-router-dom'
import { useTranslation } from "react-i18next";
import PhoneIcon from '../images/PhoneIcon.svg'
import EmailIcon from '../images/EmailIcon.svg'


const HeaderMenu = (props) => {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(props.isUserLoggedIn)
  const [showPopUp, setShowPopUp] = useState(false);
  const [showSupport,setShowSupport]= useState(false);
  const [msg, setMsg] = useState("");
  const [isSuccess,setIsSuccess] = useState(false);
  const [ HeaderData, setHeaderData] = useState({
    isUserLoggedIn: localStorage["msisdn"] ? true : false,
    isChatActive: false,
    displaySignupPopUp: false,
    loginSelected: true,
  })



  const openChatList = () => {

    let isChatActive = HeaderData.isChatActive;
    if (isChatActive) {
      history.push({
        pathname: FRONTEND_NAME + "/chat",
        state: { panditMsisdn: HeaderData.panditMsisdn }
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
    setHeaderData({
      ...HeaderData,
      displaySignupPopUp: true,
      loginSelected: true,
    });
  };

const openSignupPopup = () => {
  setHeaderData({
    ...HeaderData,
      displaySignupPopUp: true,
      loginSelected: false,
    });
  };

 const closeSignUpPopup = () => {
  setHeaderData({
    ...HeaderData,
      displaySignupPopUp: false,
    });
  };

const closePopupOnLogin = () => {
    localStorage["isUserLoggedIn"] = true;
    setHeaderData({
      ...HeaderData,
      displaySignupPopUp: false,
      isUserLoggedIn: true,
    });
    history.push(FRONTEND_NAME + "/home");

  };



  const openTab = (pageName) => {
    if(pageName == "support"){
    setShowSupport(true);
  }
    else
    props.history.push(FRONTEND_NAME + pageName);
  }
  const closePopUp = () => {
    setShowPopUp(false);
  }

  const closeSupport =(key)=>{
    
    if(key == "success"){
    setIsSuccess(true);
    setMsg("Support form has been succesfully submitted.");
    setShowPopUp(true);
   
    }
    else if(key == "fail")
    {
      setIsSuccess(false);
      setMsg("Some error ocurred in submitting the form.");
      setShowPopUp(true);
    }
    else if(key == "error")
    {
      setIsSuccess(false);
      setMsg("Mobile number must be 10 digit.");
      setShowPopUp(true);
    }
    setShowSupport(false);
  }
  const openNav = ()=> {
    debugger;
    document.getElementById("mySidenav").style.width = "243px";
  }
  return (
    <>
      {HeaderData.displaySignupPopUp && (
        <Signup
          openLoginPopup={openLoginPopup}
          openSignupPopup={openSignupPopup}
          closePopUp={closeSignUpPopup}
          closeOnLogin={closePopupOnLogin}
          isLogin={HeaderData.loginSelected}
        />
      )}
    {showSupport ? <Support closeSupport={closeSupport} />:""}
    <div className="row header-menu">
      {showPopUp && (
        <Popup msg={msg} isSuccess={isSuccess} closePopUp={closePopUp} />
      )}
      
      <div className="col">
        {/* <a href="#" className="header-menu-name">Astro Mall</a>
                    <a href="#" className="header-menu-name">Astro Mall</a>
                    <a href="#" className="header-menu-name">Astro Mall</a> */}
        <ul class="nav">
          {/* <li class="nav-item">
            <a class="nav-link header-menu-name active col-wyt" 
            onClick={() => openChatList()}>
             {t('Chat_with_Astrologer')}
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link header-menu-name active col-wyt"
            onClick={
              () =>
                history.push({
                  pathname: FRONTEND_NAME + "/talk",
                  state: { typeOfService: "Call" },
                }) 
            }>
              {t('Talk_to_Astrologer')} 
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link header-menu-name active col-wyt"
              onClick={() => openTab("/astromall")}
            >
              {t('AstroMall')}
                </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link header-menu-name col-wyt"
              onClick={() => openTab("/about")}
            >
              {t('About_us')}
                </a>
          </li>
          
          <li className="nav-item">
            <a className="nav-link header-menu-name col-wyt" onClick={() => openTab("support")}>{t('Customer_Support')}</a>
          </li> */}

          <li className="nav-item mr-3">
            <div className="header-menu-name d-flex">
              <img className="menu-contact-img" src={PhoneIcon} alt="mob"/>
              <div className="menu-content-text">
                    <span className="d-block">
                      {t('Contact Us')}
                    </span>
                    <span  style={{fontSize: '10px', color: '#4E4E4E', opacity: '0.6'}}>
                      +1 123-456-7890
                    </span>
              </div>
            </div>
          </li>
          
          <li className="nav-item ml-3">
            <div className="header-menu-name d-flex">
              <img  className="menu-contact-img" src={EmailIcon} alt="mail" /> 
              <div className="menu-content-text">
                <span className="d-block">{t('Email US')}</span>
                <span  style={{fontSize: '10px', color: '#4E4E4E', opacity: '0.6'}}>+1 123-456-7890</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    </>
  );
}
export default withRouter(HeaderMenu);