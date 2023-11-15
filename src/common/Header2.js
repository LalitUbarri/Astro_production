import React, { useEffect, useState } from "react";
import { FRONTEND_NAME } from "../configuration/constants";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLanguage, faWallet } from '@fortawesome/free-solid-svg-icons';
import User from "../images/user.svg";
import apis from "../configuration/apis";
import { withRouter } from "react-router-dom";
import { getCommonHeaders } from "../configuration/commonFunctions";
import { postApi } from "../configuration/apis";
// import * as Constant from "../configuration/constants";
import Logo from '../images/AstroIcon.svg';
import MobLogo from '../images/newImages/LOGO-jio.png';
// import MobHeader from "./MobHeader";
// import MainMenu from './HeaderMenu'
// import Popup from "../components/popupChat"
// import Support from "../components/Support";
// import Signup from "../components/signup";
import { useTranslation } from 'react-i18next';
import '../styles/headers.css';
// import walletTT from '../images/Group-363.png';
import PhoneIcon from '../images/PhoneIcon.svg'
import EmailIcon from '../images/EmailIcon.svg'
// import axios from "axios";
import apiUrls from "../configuration/apiUrls";
import dailyHoroscope from '../images/daily_horoscope_7-sixteen_nine.jpg'
import Weekly from '../images/IMAGE_1674359387.jpg'
import Monthly from '../images/monthly_horoscope_2021.jpg'
import Yearly from '../images/yearly-horoscope.jpg'

const MobHeader = React.lazy(() => import('./MobHeader'))
const Support = React.lazy(() => import('../components/Support'))
const Signup = React.lazy(() => import('../components/signup'))
const Popup = React.lazy(() => import('../components/popupChat'))



// var userName;
const Header2 = (props) => {
  let isLogin = props.isLogin;
  // console.log(props);
  const [IsTrue, setIsTrue] = React.useState(false);
  const [IsTrue1, setIsTrue1] = React.useState(false);
  const [userName, setUserName] = useState('')

  let userLoggedIn = localStorage["msisdn"] ? true : false;
  //let dialer = "+1 123-456-7890";
  let dialer = "";
  let openmail = "astrologytell@gmail.com";

  var fname = localStorage["profileData"]
    ? JSON.parse(localStorage["profileData"]).find(
      (item) => item.fieldColumnName == "first_name"
    ).fieldValue
    : "Hi";

  var lname = localStorage["profileData"]
    ? JSON.parse(localStorage["profileData"]).find(
      (item) => item.fieldColumnName == "last_name"
    ).fieldValue
    : "User";
  // var userProfile = localStorage["userProfile"]
  //   ? JSON.parse(localStorage.getItem("userProfile"))
  //   : "";
  // alert(userProfile)
  const profileImage = localStorage["profileData"]
    ? JSON.parse(localStorage["profileData"]).find(
      (item) => item.fieldColumnName == "profile_pic_url"
    ).fieldValue
    : "";
  const [isSuccess, setIsSuccess] = useState(false);
  const [msg, setMsg] = useState("");
  const [showPopUp, setShowPopUp] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [countryCode, setCountryCode] = useState([]);
  const [HeaderData, setHeaderData] = useState({
    isUserLoggedIn: localStorage["msisdn"] ? true : false,
    isChatActive: false,
    displaySignupPopUp: false,
    loginSelected: true,
    hoverString: ''
  })

  const [selectedLanguage, setSelectedLanguage] = useState(localStorage['selectedLanguage'] ? localStorage['selectedLanguage'] : "en");

  const [t, i18n] = useTranslation();

  useEffect(() => {
    if (localStorage["userProfile"]) {
      getCartTotalCount();
    }
    fetchcountryCode();
  }, []);

  useEffect(() => {
    if (userLoggedIn) {
      var Api_url = apiUrls.getUserInfo;
      const headers = getCommonHeaders();
      headers.msisdn = localStorage["msisdn"];
      postApi(Api_url, headers)
        .then((response) => response.data)
        .then((data) => {
          // alert(JSON.stringify(data.data))
          if (data.data === null) {
            setUserName('')
          } else {
            if (data.data[0].firstName === null || data.data[0].firstName === '') {
              setUserName(data.data[0].firstName !== null
                ? data.data[0].firstName.substring(0, 8)
                : 'Hi user'
              )
              // alert(data.data[0].firstName)
            } else {
              setUserName(data.data[0].firstName
                ? data.data[0].firstName.substring(0, 8)
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
        // console.log("resp data", data);
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
        // console.log("resp data", data);
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



  const OnClickHundle = () => {
    setIsTrue(!IsTrue)
    setIsTrue1(!IsTrue1)
    // props.changeIsHeaderOpen(!IsTrue)
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
          // console.log("response getBalance", data);
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

  const shouldOpenLoginPopup = () => {
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
    // props.history.push(FRONTEND_NAME + "/home/#Signup")
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

  const closeSupport = (key) => {

    if (key == "success") {
      setIsSuccess(true);
      setMsg("Support form has been succesfully submitted.");
      setShowPopUp(true);

    }
    else if (key == "fail") {
      setIsSuccess(false);
      setMsg("Some error ocurred in submitting the form.");
      setShowPopUp(true);
    }
    else if (key == "error") {
      setIsSuccess(false);
      setMsg("Mobile number must be 10 digit.");
      setShowPopUp(true);
    }
    setShowSupport(false);
  }

  const openNav = () => {
    debugger;
    document.getElementById("mySidenav").style.width = "243px";
  }

  const changeLanguage = (lang) => {
    localStorage.setItem('selectedLanguage', lang)
    setSelectedLanguage(lang)
    i18n.changeLanguage(lang)
    props.history.push(FRONTEND_NAME + "/")
    window.location.reload()
  }

  const openLoginPopup = () => {
    setHeaderData({
      ...HeaderData,
      displaySignupPopUp: true,
      loginSelected: true,
    })
    // props.history.push(FRONTEND_NAME + "/home/#login")

  }

  const fetchcountryCode = () => {
    var headers = getCommonHeaders();
    let dataToPush = [];

    apis
      .getCountryCode(headers)
      .then((response) => response.data)
      .then((data) => {
        if (data.code == '2000') {
          // alert(JSON.stringify(data.data))
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

  const HoverImgChange = (data) => {
    setHeaderData({ ...HeaderData, hoverString: data })
  }

  var image;

  useEffect(() => {

    if (HeaderData.hoverString === 'Daily Horoscope') {
      image = <img src={dailyHoroscope} alt="dailyhoroscop" width="150" loading="lazy" />
    } else if (HeaderData.hoverString === 'Weekly Horoscope') {
      image = Weekly
    } else if (HeaderData.hoverString === 'Monthly Horoscope') {
      image = Monthly
    } else if (HeaderData.hoverString === 'Yearly Horoscope') {
      image = Yearly
    }
    // console.log(image);
  })

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

      {showSupport ? <Support closeSupport={closeSupport} /> : ""}

      {showPopUp && (
        <Popup msg={msg} isSuccess={isSuccess} closePopUp={closePopUp} />
      )}

      {IsTrue1 &&
        <MobHeader
          OnClickHundle={OnClickHundle}
          closeMobNavehundle={closeMobNavehundle}
          userName={localStorage['profileData'] ? fname + " " + lname : t('user_hi')}
          avatar={profileImage}
        />
      }
      <div className="">
        <header className={props.IsActive_header_Or_not}>
          <div className="container">
            <nav className="astro-navbar mob_head_container">
              <div className="astro-icon d-flex justify-content-between">
                <img
                  onClick={() => props.history.push(FRONTEND_NAME + "/home")}
                  src={Logo}
                  alt="logo"
                  className="logoDesk"
                  width="100px"
                />
                <div className={
                  IsTrue ? "MobheaderOuter container1 change" :
                    "MobheaderOuter container1"}
                  onClick={OnClickHundle}
                >
                  <div className="bar1"></div>
                  <div className="bar2"></div>
                  <div className="bar3"></div>
                </div>
                <div >
                  <img
                    onClick={() => props.history.push(FRONTEND_NAME + "/home")}
                    src={MobLogo}
                    className="logoMob"
                    alt="logo"
                    width="100px"
                  />
                </div>
              </div>

              <div className="astro-contactus">
                <div className="astro-contactus-menu align-items-center" onClick={() => setShowSupport(true)}>
                  {/* <img className="menu-contact-img" src={PhoneIcon} alt="PhoneIcon" /> */}
                  <i class="bi bi-telephone menu-contact-img"></i>
                  <div className="menu-content-text">
                    <span className="d-block">
                      {t('Contact Us')}
                    </span>
                    <a href={"tel:" + dialer} className="phone" style={{ fontSize: '10px !important', color: '#4E4E4E', opacity: '0.6' }}>
                      {dialer}
                    </a>
                  </div>
                </div>

                <div className="astro-contactus-menu">

                  {/* <img className="menu-contact-img" src={EmailIcon} alt="EmailIcon" /> */}
                  <i class="bi bi-envelope menu-contact-img"></i>
                  <div className="menu-content-text d-flex align-items-center">
                    <div>
                      <span className="d-block">{t('Email Us')}</span>
                      <a href={"mailto:" + openmail} className="phone" style={{ fontSize: '10px !important', color: '#4E4E4E', opacity: '0.6' }}>{openmail}</a>
                    </div>
                  </div>
                </div>
              </div>
              {userLoggedIn ? null : <>
                <div className="astro-lang">
                  <div className="dropdown1 show">
                    <a
                      className="btn"
                      href="#"
                      role="button"
                      id="dropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      style={{ lineHeight: '0.5rem', marginLeft: '5px' }}
                    >

                      <div className="astro-contactus-menu">
                        <i className="bi bi-globe menu-contact-img"></i>
                        <div className="menu-content-text d-flex align-items-center">
                            <span className="d-block mob_480">{t('Language')}</span>
                        </div>
                      </div>
                    </a>
                    <div
                      className="dropdown-menu dropdown-menu-right"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <a
                        className="dropdown-item clickptr"
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
                        className="dropdown-item clickptr"
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
                <div className="">
                  <button
                    type="button"
                    className={"btn consult-btn mr-1 "}
                    onClick={() => props.history.push(FRONTEND_NAME + "/talk")}
                  >
                    {t('Consult Now').toUpperCase()}
                  </button>
                </div>
              </>}




              {userLoggedIn ?
                <div className="astro-userinfo">
                  <div className="astro-userinfo-notification logoDesk">
                    <button
                      type="button"
                      className="btn notification"
                      onClick={() => props.history.push(FRONTEND_NAME + "/cartOrder")}
                    >
                      <i className="bi bi-cart-fill"></i>
                      <span className="badge"> {sessionStorage["cartCount"] ? sessionStorage["cartCount"] : 0}</span>
                    </button>
                  </div>

                  <div className="">
                    <div className="astro-lang1 d-inline-block logoMob">
                      <div className="dropdown show">
                        <a
                          className="btn dropdown-toggle text-white"
                          href="#"
                          role="button"
                          id="dropdownMenuLink"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <FontAwesomeIcon icon={faLanguage} />
                        </a>
                        <div
                          className="dropdown-menu dropdown-menu-right"
                          aria-labelledby="dropdownMenuLink"
                        >
                          <a
                            className="dropdown-item clickptr"
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
                            className="dropdown-item clickptr"
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

                    <button
                      type="button"
                      className="btn notification logoMob"
                      onClick={() =>
                        props.history.push(FRONTEND_NAME + "/recharge")
                      }
                    >
                      {/* <i class="bi bi-wallet-fill"></i> */}
                      <FontAwesomeIcon icon={faWallet} />&nbsp;
                      {/* <img src={walletTT} alt="" width={'20px'} /> &nbsp; */}
                      {'₹' + localStorage['userBalance']}
                    </button>

                    {/* <button
                    type="button"
                    className="btn notification logoMob"
                    onClick={() => setShowSupport(true)}
                  >
                    {/* <i class="bi bi-customar-fill"></i>
                    <FontAwesomeIcon icon={faHeadset} />
                  </button> */}

                    {/* <button
                    type="button"
                    className="btn notification"
                    onClick={() =>
                      props.history.push(FRONTEND_NAME + "/notification")
                    }
                  >
                    <i className="bi bi-bell-fill"></i>
                  </button> */}

                  </div>

                  <div className="logoDesk">
                    <div className="dropdown show">
                      <a
                        className="btn dropdown-toggle"
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
                        className="dropdown-menu dropdown-menu-right"
                        aria-labelledby="dropdownMenuLink"
                      >
                        <a
                          className="dropdown-item clickptr"
                          onClick={() => props.history.push(FRONTEND_NAME + "/home")}
                        >
                          {t('Dashboard')}
                        </a>
                        <a
                          className="dropdown-item clickptr"
                          onClick={() =>
                            props.history.push(FRONTEND_NAME + "/profile")
                          }
                        >
                          {t('Account_Settings')}
                        </a>
                        <a className="dropdown-item logout clickptr" onClick={logoutUser}>
                          {t('Logout')}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="astro-userpic logoDesk">
                    <img
                      className="user"
                      alt="user"
                      src={profileImage ? profileImage : User}
                    />
                  </div>


                  <div className="astro-lang mob_480">
                    <div className="dropdown show">
                      <a
                        className="btn dropdown-toggle"
                        href="#"
                        role="button"
                        id="dropdownMenuLink"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        style={{ lineHeight: '0.5rem', marginLeft: '5px' }}
                      >
                        <i
                          className="bi bi-globe2"
                          style={{ marginRight: '3px' }}
                        ></i>
                        {t('Language')}
                      </a>
                      <div
                        className="dropdown-menu dropdown-menu-right"
                        aria-labelledby="dropdownMenuLink"
                      >
                        <a
                          className="dropdown-item clickptr"
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
                          className="dropdown-item clickptr"
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
                    }
                    onClick={openLoginPopup}
                  >
                    {t('Login').toUpperCase()}
                  </button>
                  {/* <button
                type="button"
                className={
                  "btn header-signup-btn " +
                  (isLogin ? "header-btnNotClr" : "header-btnNotClr")
                }
                onClick={openSignupPopup}
              >
                {t('Signup').toUpperCase()}
              </button> */}

                </div>
              }

            </nav>
            <div className="topNav">
              <div className="d-flex column-gap-30">
                <div
                  onClick={
                    () => props.history.push({
                      pathname: FRONTEND_NAME + "/home"
                    })
                  } className="bottom-menu-link">
                  {t('Home')}
                </div>
                <div
                  onClick={
                    () =>
                      !userLoggedIn ? shouldOpenLoginPopup() :
                        props.history.push({
                          pathname: FRONTEND_NAME + "/kundali"
                        })
                  }
                  className="bottom-menu-link">
                  {t('Free Kundali')}
                </div>
                <div

                  className="bottom-menu-link dropdown_horoscope dropdown-toggle">
                  {t('Horoscope')}

                  <ul className="nav_container">
                    <li className="nav_link_card" onClick={() =>
                      // !userLoggedIn ? shouldOpenLoginPopup() :
                      props.history.push({
                        pathname: FRONTEND_NAME + "/horoscope/Daily-Horoscope/" + t('Aries_')
                      })
                    }> {t('Daily_Horoscope')}</li>
                    <li className="nav_link_card"
                      onClick={() =>
                        // !userLoggedIn ? shouldOpenLoginPopup() :
                        props.history.push({
                          pathname: FRONTEND_NAME + "/horoscope/Weekly-Horoscope"
                        })
                      }
                    > {t('Weekly_Horoscope')}</li>
                    {/* <li className="nav_link_card" onMouseOver={() => HoverImgChange('Monthly Horoscope')}> Monthly Horoscope</li> */}
                    <li className="nav_link_card"
                      onClick={() =>
                        // !userLoggedIn ? shouldOpenLoginPopup() :
                        props.history.push({
                          pathname: FRONTEND_NAME + "/horoscope/Monthly-Horoscope"
                        })
                      }
                    > {t('Monthly_Horoscope')}</li>

                    <li className="nav_link_card"
                      onClick={() =>
                        // !userLoggedIn ? shouldOpenLoginPopup() :
                        props.history.push({
                          pathname: FRONTEND_NAME + "/horoscope/Yearly-Horoscope"
                        })
                      }
                    > {t('Yearly_Horoscope')}</li>
                  </ul>
                </div>

                <div
                  className="bottom-menu-link dropdown_horoscope dropdown-toggle">
                  {t('Astrology')}
                  <ul className="nav_container">
                    <li className="nav_link_card" onClick={() =>
                      // !userLoggedIn ? shouldOpenLoginPopup() :
                      props.history.push({
                        pathname: FRONTEND_NAME + "/planetry-transit-2023"
                      })
                    }> {t('Planetary_transit')}</li>

                    <li className="nav_link_card" onClick={() =>
                      // !userLoggedIn ? shouldOpenLoginPopup() :
                      props.history.push({
                        pathname: FRONTEND_NAME + "/marriage-astrologer-in-India"
                      })
                    }> {t('Marriage_Astrology')} </li>
                    <li className="nav_link_card"
                      onClick={() =>
                        // !userLoggedIn ? shouldOpenLoginPopup() :
                        props.history.push({
                          pathname: FRONTEND_NAME + "/business-astrology-in-india"
                        })
                      }
                    > {t('Business_Astrology')}</li>
                    {/* <li className="nav_link_card" onMouseOver={() => HoverImgChange('Monthly Horoscope')}> Monthly Horoscope</li> */}
                    <li className="nav_link_card"
                      onClick={() =>
                        // !userLoggedIn ? shouldOpenLoginPopup() :
                        props.history.push({
                          pathname: FRONTEND_NAME + "/career-astrology-in-india"
                        })
                      }
                    > {t('Career_Astrology')}</li>

                    <li className="nav_link_card"
                      onClick={() =>
                        // !userLoggedIn ? shouldOpenLoginPopup() :
                        props.history.push({
                          pathname: FRONTEND_NAME + "/court-case-astrology"
                        })
                      }
                    >{t('Court_Legal')}</li>

                    <li className="nav_link_card"
                      onClick={() =>
                        // !userLoggedIn ? shouldOpenLoginPopup() :
                        props.history.push({
                          pathname: FRONTEND_NAME + "/marriage-problems-astrology"
                        })
                      }
                    > {t('Delay_marriage')}</li>

                    <li className="nav_link_card"
                      onClick={() =>
                        // !userLoggedIn ? shouldOpenLoginPopup() :
                        props.history.push({
                          pathname: FRONTEND_NAME + "/face-reading-astrology"
                        })
                      }
                    > {t('Face_Reading')}</li>

                    <li className="nav_link_card"
                      onClick={() =>
                        // !userLoggedIn ? shouldOpenLoginPopup() :
                        props.history.push({
                          pathname: FRONTEND_NAME + "/palm-reading-astrology"
                        })
                      }
                    > {t('Palm_Reading')}</li>
                  </ul>
                </div>

                <div
                  className="bottom-menu-link dropdown_horoscope dropdown-toggle">
                  {t('Festivals')}
                  <ul className="nav_container">
                    <li className="nav_link_card" onClick={() =>
                      props.history.push({
                        pathname: FRONTEND_NAME + "/festival-calender-astrology"
                      })
                    }>{t('festiva_calendar')} </li>
                    <li className="nav_link_card" onClick={() =>
                      props.history.push({
                        pathname: FRONTEND_NAME + "/upcoming-festivals-vatpurnima"
                      })
                    }>  {t('Festivals_vat_purnima')} </li>
                    <li className="nav_link_card" onClick={() =>
                      props.history.push({
                        pathname: FRONTEND_NAME + "/vrat-calender-astrology"
                      })
                    }>  Vrat Calender 2023 </li>

                  </ul>
                </div>

                <div
                  onClick={
                    () =>
                      !userLoggedIn ? shouldOpenLoginPopup() :
                        props.history.push({
                          pathname: FRONTEND_NAME + "/matching"
                        })
                  }
                  className="bottom-menu-link">
                  {t('Match_Making')}
                </div>

                <div
                  onClick={
                    () => props.history.push({
                      pathname: FRONTEND_NAME + "/article"
                    })
                  }
                  className="bottom-menu-link">
                  {t('blogs')}
                </div>

                <div className="bottom-menu-link dropdown_horoscope dropdown-toggle">
                  {t('More')}

                  <ul className="nav_container">
                    <li className="nav_link_card" onClick={() =>
                      props.history.push({
                        pathname: FRONTEND_NAME + "/tarot-cards"
                      })
                    }> {t('tarot_cards')} </li>

                    <li className="nav_link_card" onClick={() =>
                      // !userLoggedIn ? shouldOpenLoginPopup() :
                      props.history.push({
                        pathname: FRONTEND_NAME + "/mangalik-dosh"
                      })
                    }> {t('mangal_dosh')}</li>

                    <li className="nav_link_card" onClick={() =>
                      // !userLoggedIn ? shouldOpenLoginPopup() :
                      props.history.push({
                        pathname: FRONTEND_NAME + "/kaalsharp-dosha"
                      })
                    }>  {t('kalsharp_dosh')}</li>

                    <li className="nav_link_card" onClick={() =>
                      props.history.push({
                        pathname: FRONTEND_NAME + "/birthday-forecast-astrology"
                      })
                    }>  {t('Birthday forecast')}</li>
                    <li className="nav_link_card" onClick={() =>
                      props.history.push({
                        pathname: FRONTEND_NAME + "/aura-reading-astrology"
                      })
                    }>  {t('Aura reading')}</li>
                    <li className="nav_link_card" onClick={() =>
                      props.history.push({
                        pathname: FRONTEND_NAME + "/loyalty-points-astrology"
                      })
                    }>  {t('Loyalty Points')}</li>

                    <li className="nav_link_card" onClick={() =>
                      props.history.push({
                        pathname: FRONTEND_NAME + "/free-remedy-astrology"
                      })
                    }>  {t('Free Remedy')}</li>

                    <li className="nav_link_card" onClick={() =>
                      props.history.push({
                        pathname: FRONTEND_NAME + "/psychologist-panel-astrology"
                      })
                    }>  {t('Psychologist Panel')}</li>
                    <li className="nav_link_card" onClick={() =>
                      props.history.push({
                        pathname: FRONTEND_NAME + "/brihat-horoscope-astrology"
                      })
                    }>  {t('Brihat Horoscope')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </header>
      </div>
    </>
  );
};
export default withRouter(React.memo(Header2));
