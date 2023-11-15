import React, { useEffect,useState } from "react";
import { FRONTEND_NAME } from "../configuration/constants";
import User from "../images/user.svg";
import apis from "../configuration/apis";
import { withRouter } from "react-router-dom";
import { getCommonHeaders } from "../configuration/commonFunctions";
import { getApi, postApi } from "../configuration/apis";
import * as Constant from "../configuration/constants";
import Logo from '../images/AstroIcon.svg';
import MobHeader from "./MobHeader";
import MainMenu from './HeaderMenu'
import Popup from "../components/popupChat"
import Support from "../components/Support";
import Signup from "../components/signup";
import { useTranslation } from 'react-i18next';

import PhoneIcon from '../images/PhoneIcon.svg'
import EmailIcon from '../images/EmailIcon.svg'
import axios from "axios";

// var userName;
const Header = (props) => {
  let isLogin = props.isLogin;
  // console.log(props.history);
  const [IsTrue, setIsTrue] = React.useState(false);
  const [IsTrue1, setIsTrue1] = React.useState(false);
  const [userName, setUserName] = useState('')

  let userLoggedIn = localStorage["msisdn"] ? true : false;
  let dialer = "+1 123-456-7890";
  let openmail = "astrologytell@gmail.com";
  var userProfile = localStorage["userProfile"]
    ? JSON.parse(localStorage.getItem("userProfile"))
    : "";
  const profileImage = localStorage["profileData"]
    ? JSON.parse(localStorage["profileData"]).find(
      (item) => item.fieldColumnName == "profile_pic_url"
    ).fieldValue
    : "";
    const [isSuccess,setIsSuccess] = useState(false);
    const [msg, setMsg] = useState("");
    const [showPopUp, setShowPopUp] = useState(false);
    const [showSupport,setShowSupport]= useState(false);
    const[countryCode, setCountryCode] = useState([]);
    const [ HeaderData, setHeaderData] = useState({
      isUserLoggedIn: localStorage["msisdn"] ? true : false,
      isChatActive: false,
      displaySignupPopUp: false,
      loginSelected:true,
    })

    const [selectedLanguage, setSelectedLanguage] = useState(localStorage['selectedLanguage'] ? localStorage['selectedLanguage'] : "en");

    const [t, i18n]=useTranslation();
  
  useEffect(() => {
    if (localStorage["userProfile"]) {
      getCartTotalCount();
    }
    fetchcountryCode()
  }, []);

  useEffect(() =>{
    if(userLoggedIn){
      var Api_url = `${Constant.ASTRO_URL}/FlexPlatform/getUserInfo`;
      const headers = getCommonHeaders();
      headers.msisdn = localStorage["msisdn"];
      postApi(Api_url, headers)
        .then((response) => response.data)
        .then((data) => {
          if(data.data){
          if(data.data[0].firstName === null || data.data[0].firstName === ''){
            setUserName(data.data[0].firstName 
              ? data.data[0].firstName.substring(0,8)
              : null 
            )
          }else {
            setUserName(data.data[0].firstName 
              ? data.data[0].firstName.substring(0,8)
              : null 
            )
          }
        }
        
        })
    }
    
    
  })

  const getCartTotalCount = () => {

    const headers = getCommonHeaders();

    apis
      .getCartItemCount(headers)
      .then((response) => response.data)
      .then((data) => {
        console.log("resp data", data);
        if (data.code == "2000") {
          if (data.data) {
            let cartCountData = data.data;
            sessionStorage["cartCount"] = cartCountData.quantity;
          }

        } else {
          console.log(data.msg);

        }
      })
      .catch((error) => {
        console.log(error);

      });
  };
  const logoutUser = () => {
    var requestBody = {
      msisdn: localStorage["selectedCountryCode"] + localStorage["msisdn"],
    };
    apis
      .logoutApi(requestBody)
      .then((response) => response.data)
      .then((data) => {
        //debugger;
        console.log("resp data", data);
        if (data.code == "2000") {
          localStorage.clear();
          sessionStorage.clear();
          props.history.push(FRONTEND_NAME + "/home");
          window.location.reload();
        } else {
          console.log(data.msg);

          //props.showPopUpFunc(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

 
    
  const OnClickHundle = () =>{
      setIsTrue(!IsTrue)
      setIsTrue1(!IsTrue1)
      props.changeIsHeaderOpen(!IsTrue)
  }

 const closeMobNavehundle = (Isshow) => {
    setIsTrue1(Isshow);
    setIsTrue(Isshow);
  }

  useEffect(() => {
    getUserBalance()
  });

  const getUserBalance = () => {

    return apis
      .getBalance({})
      .then((response) => response.data)
      .then((data) => {
        if (data.code == "2000") {
          //debugger;
          console.log("response getBalance", data);
          if (data.data) {
            let balanceData = data.data.myPoint;
            let balance = balanceData.point;
            localStorage["userBalance"] = balance;
          }
        } else {
          console.log(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

 const recharge = () => {
    if (userLoggedIn) {
      props.history.push({ pathname: FRONTEND_NAME + "/recharge" });
    }
  };

  const openLoginPopup = () => {
    setHeaderData({
      ...HeaderData,
      displaySignupPopUp: true,
      loginSelected: true,
    });
    alert(this.props.history.push(FRONTEND_NAME + "/home/#login"))
    
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
    this.props.history.push(FRONTEND_NAME + "/home");
  };

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

  const changeLanguage = (lang) => {
    localStorage.setItem('selectedLanguage', lang)
    setSelectedLanguage(lang)
    i18n.changeLanguage(lang)
    window.location.reload()
  }

  const fetchcountryCode = () => {
    var headers = getCommonHeaders();
    let dataToPush = [];
    apis
      .getCountryCode(headers)
      .then((response) => response.data)
      .then((data) => {
        if (data.code == '2000') {
            
            data.data.forEach(d => {
              dataToPush.push(d.countryCode);
            });
              
            setCountryCode(dataToPush)
        } 
      })
      .catch((error) => {
        console.log(error);
      });

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
          countryCode={countryCode}
        />
      )}
      
      {showSupport ? <Support closeSupport={closeSupport} />:""}
      
      {showPopUp && (
            <Popup msg={msg} isSuccess={isSuccess} closePopUp={closePopUp} />
      )}

      {IsTrue1 &&
        <MobHeader 
          OnClickHundle = {OnClickHundle}
          closeMobNavehundle = {closeMobNavehundle}
          userName = {userProfile ? userProfile.userDetails.firstName + " " + userProfile.userDetails.lastName:'Hi User'}
        />
      } 

      <header>
        <nav className="astro-navbar">
          <div className="astro-icon">
            <img
              onClick={() => props.history.push(FRONTEND_NAME + "/home")} 
              src={Logo} 
              alt="logo" 
              width="100px" 
            />
          </div>

          <div className="astro-contactus">
            <div className="astro-contactus-menu">
              <img className="menu-contact-img" src={PhoneIcon} alt="PhoneIcon" />
              <div className="menu-content-text">
                    <span className="d-block">
                      {t('Contact Us')}
                    </span>
                    <a href={"tel:" + dialer} className="phone" style={{fontSize: '10px !important', color: '#4E4E4E', opacity: '0.6'}}>
                      {dialer}
                    </a>
              </div>
            </div>

            <div className="astro-contactus-menu">
              <img  className="menu-contact-img" src={EmailIcon} alt="EmailIcon" /> 
              <div className="menu-content-text">
                <span className="d-block">{t('Email Us')}</span>
                <a href={"mailto:" + openmail}  className="phone" style={{fontSize: '10px !important', color: '#4E4E4E', opacity: '0.6'}}>{openmail}</a>
              </div>
            </div>
          </div>

          {userLoggedIn ?
            <div className="astro-userinfo">
              <div className="astro-userinfo-notification">
                <button
                  type="button"
                  class="btn notification"
                  onClick={() => props.history.push(FRONTEND_NAME + "/cartOrder")}
                >
                  <i class="bi bi-cart-fill"></i>
                  <span class="badge"> {sessionStorage["cartCount"] ? sessionStorage["cartCount"] : 0}</span>
                </button>
              </div>

              <div className="">
                <button
                  type="button"
                  class="btn notification"
                  onClick={() =>
                    props.history.push(FRONTEND_NAME + "/notification")
                  }
                >
                  <i class="bi bi-bell-fill"></i>
                </button>
              </div>

              <div className="">
                <div class="dropdown show">
                  <a
                    class="btn dropdown-toggle"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {userName}
                  </a>
                  <div
                    class="dropdown-menu dropdown-menu-right"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <a
                      class="dropdown-item clickptr"
                      onClick={() => props.history.push(FRONTEND_NAME + "/home")}
                    >
                      {t('Dashboard')}
                    </a>
                    <a
                      class="dropdown-item clickptr"
                      onClick={() =>
                        props.history.push(FRONTEND_NAME + "/profile")
                      }
                    >
                      {t('Account_Settings')}
                    </a>
                    <a class="dropdown-item logout clickptr" onClick={logoutUser}>
                      {t('Logout')}
                    </a>
                  </div>
                </div>
              </div>

              <div className="astro-userpic">
                <img
                  className="user"
                  alt="user"
                  src={profileImage ? profileImage : User}
                />
              </div>

              
              <div className="astro-lang">
                <div class="dropdown show">
                    <a
                        class="btn dropdown-toggle"
                        href="#"
                        role="button"
                        id="dropdownMenuLink"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        style={{lineHeight: '0.5rem', marginLeft: '5px'}}
                    >
                        <i 
                          class="bi bi-globe2"
                          style={{marginRight: '3px'}}
                        ></i>
                        {t('Language')}
                      </a>
                      <div
                        class="dropdown-menu dropdown-menu-right"
                        aria-labelledby="dropdownMenuLink"
                      >
                        <a
                          class="dropdown-item clickptr"
                          onClick={() => 
                            changeLanguage('en')
                          }
                          style={{
                            color: selectedLanguage === 'en' ? '#FF9C05' : 'black'
                          }}
                        >
                          {t('English')}
                        </a>
                        <a
                          class="dropdown-item clickptr"
                          onClick={() => 
                            changeLanguage('hi')
                          }
                          style={{
                            color: selectedLanguage === 'hi' ? '#FF9C05' : 'black'
                          }}
                        >
                          {t('Hindi')}
                        </a>
                    </div>
                </div>
              </div>

            </div> :
            <div className="astro-login">
              <button
                type="button"
                className={
                  "btn header-login-btn mr-1 " +
                  (isLogin ? "header-btnClr" : "header-btnClr")
                  // (isLogin ? "header-btnClr" : "header-btnNotClr")
                }
                onClick={openLoginPopup}
              >
                {t('Login').toUpperCase()}
              </button>
              <button
                type="button"
                className={
                  "btn header-signup-btn " +
                  (isLogin ? "header-btnNotClr" : "header-btnNotClr")
                }
                onClick={props.openSignupPopup}
              >
                {t('Signup').toUpperCase()}
              </button>
              <div className="astro-lang">
                <div class="dropdown show">
                    <a
                        class="btn dropdown-toggle"
                        href="#"
                        role="button"
                        id="dropdownMenuLink"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        style={{lineHeight: '0.5rem', marginLeft: '5px'}}
                    >
                        <i 
                          class="bi bi-globe2"
                          style={{marginRight: '3px'}}
                        ></i>
                        {t('Language')}
                      </a>
                      <div
                        class="dropdown-menu dropdown-menu-right"
                        aria-labelledby="dropdownMenuLink"
                      >
                        <a
                          class="dropdown-item clickptr"
                          onClick={() => 
                            changeLanguage('en')
                          }
                          style={{
                            color: selectedLanguage === 'en' ? '#FF9C05' : 'black'
                          }}
                        >
                          {t('English')}
                        </a>
                        <a
                          class="dropdown-item clickptr"
                          onClick={() => 
                            changeLanguage('hi')
                          }
                          style={{
                            color: selectedLanguage === 'hi' ? '#FF9C05' : 'black'
                          }}
                        >
                          {t('Hindi')}
                        </a>
                    </div>
                </div>
              </div>
            </div>             
          }

          <div className= {
            IsTrue ? "MobheaderOuter container1 change" : 
                   "MobheaderOuter container1" } 
            onClick={OnClickHundle}
          >
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
          </div>
        </nav>
        <div className="topNav">
          <div
            onClick={
              () => props.history.push({
                pathname:  FRONTEND_NAME + "/home"
              })
             } className="bottom-menu-link">
            {t('Home')}
          </div>
          <div
            onClick={
              () => props.history.push({
                pathname:  FRONTEND_NAME + "/kundali"
              })
            }
           className="bottom-menu-link">
            {t('Free Kundali')}
          </div>
          <div 
            onClick={() => props.history.push({
              pathname: FRONTEND_NAME + "/dailyHoroscope",
              state: { signName: 'Pisces' }
            })}
            className="bottom-menu-link">
            {t('Daily Horoscope')}
          </div>
          <div 
            onClick={
              () => props.history.push({
                pathname:  FRONTEND_NAME + "/matching"
              })
            }
            className="bottom-menu-link">
            {t('Free Matching')}
          </div>
        </div>
      </header>
    </>
  );
};
export default withRouter(React.memo(Header));
