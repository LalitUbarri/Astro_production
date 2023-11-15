import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShieldVirus, faPerson, faPersonCircleQuestion, faUser } from '@fortawesome/free-solid-svg-icons';
// import Logo from '../images/newImages/WhatsApp-Image-2021-08-02-a.png';
import { useHistory } from 'react-router-dom'
import Signup from "../components/signup";
import Support from '../components/Support'
import Popup from "../components/popupChat"
import { FRONTEND_NAME } from "../configuration/constants";
import apis from "../configuration/apis";
// import ChatwithAstrology from "../images/ChatwithAstrology.svg";
import WalletTransactions from "../images/WalletTransactions.svg";
// import TalkWithAstrology from "../images/TalkWithAstrology.svg";
// import Dashboard from "../images/newImg/728992_control_dashboard_speed_configuration_setting_icon.svg";
import AccountSetting from "../images/newImg/settings.png";
import AboutIcon from "../images/newImg/information-button.png";
import SupportIcon from "../images/newImg/customer-support.png";
import AstroMall from "../images/AstroMall.svg";
import Logout from "../images/Logout.svg";
// import LoginIcon from "../images/newImg/user.png";
import OrderHistory from "../images/OrderHistory.svg";
import { withTranslation } from 'react-i18next';
import { compose } from 'redux';
import astrology from '../images/newImages/astrology-min.png';
import astrology1 from '../images/newImages/book-min.png';
import astrology2 from '../images/newImages/parchment-min.png';
import astrology3 from '../images/newImages/plus-min.png';

const style = {
  color: '#ff9c05',
  fontSize: '30px'
}
function MobHeader(props) {
  // console.log(props.history1)
  const history = useHistory();
  const [showPopUp, setShowPopUp] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [msg, setMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [HeaderData, setHeaderData] = useState({
    isUserLoggedIn: localStorage["msisdn"] ? true : false,
    isChatActive: false,
    displaySignupPopUp: false,
    loginSelected: true,
  })

  const { t } = props;

  const openChatList = (item, TypeItem) => {
    if (TypeItem !== '') {
      history.push({
        pathname: FRONTEND_NAME + item,
        state: { typeOfService: TypeItem },
      });
      props.closeMobNavehundle(false)
    } else {
      history.push({ pathname: FRONTEND_NAME + item });
      props.closeMobNavehundle(false)
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

  };

  const openTab = (pageName) => {
    if (pageName == "support") {
      setShowSupport(true);
    }
    else
      history.push(FRONTEND_NAME + pageName);
  }

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
          props.closeMobNavehundle(false)
          history.push(FRONTEND_NAME + "/home");
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


  return <>
    {HeaderData.displaySignupPopUp && (
      <Signup
        openLoginPopup={openLoginPopup}
        openSignupPopup={openSignupPopup}
        closePopUp={closeSignUpPopup}
        closeOnLogin={closePopupOnLogin}
        isLogin={HeaderData.loginSelected}
      />
    )}
    {showSupport ? <Support closeSupport={closeSupport} /> : ""}
    {showPopUp && (
      <Popup msg={msg} isSuccess={isSuccess} closePopUp={closePopUp} />
    )}
    <div className="MobMenu">
      {
        HeaderData.isUserLoggedIn ? <div className="moblogo">
          {!props.avatar ? <FontAwesomeIcon icon={faUser} color="#fff" fontSize="40px" /> : <img src={props.avatar} className="logo_mob" alt="logo" width="70px" />}

          {props.userName ? <div className="userDetails">
            <p className="text-white"><strong>{props.userName === "null null" ? <>{t('user_hi')}</> : props.userName}</strong></p>
            <p className="misDin">{localStorage["msisdn"]}</p>
          </div> : null}
        </div> : <div className="moblogo">
          {/* <img src={props.avatar} className="logo_astro" alt="logo" width="70px" /> */}
          <p className="text-white pd-10" onClick={openLoginPopup}> <strong>{t('Login')}</strong></p>
        </div>
      }


      {HeaderData.isUserLoggedIn ? <ul className="mob_nav">

        <li class="" onClick={() => {
          if (HeaderData.isUserLoggedIn) {
            history.push(FRONTEND_NAME + "/profile")
          } else {
            openLoginPopup();
          }

        }}
        ><img className="menu-icon" src={AccountSetting} width="25px" alt='setting' />
          {t('Account_Settings')}

        </li>

        <li>
          <div  className='dropdown-toggle'
           
          >
            <img className="menu-icon" src={astrology} alt='wallet'/>
            {t('Astrology')}
          </div>

            <ul className="nav_container">
                <li className="nav_link_card" onClick={() =>
                  // !userLoggedIn ? shouldOpenLoginPopup() :
                  history.push({
                    pathname: FRONTEND_NAME + "/planetry-transit-2023"
                  })
                }> Planetary transit 2023 </li>

                <li className="nav_link_card" onClick={() =>
                  // !userLoggedIn ? shouldOpenLoginPopup() :
                  history.push({
                    pathname: FRONTEND_NAME + "/marriage-astrologer-in-India"
                  })
                }> Marriage Astrology </li>
                <li className="nav_link_card"
                  onClick={() =>
                    // !userLoggedIn ? shouldOpenLoginPopup() :
                    history.push({
                      pathname: FRONTEND_NAME + "/business-astrology-in-india"
                    })
                  }
                > Business Astrology</li>
                {/* <li className="nav_link_card" onMouseOver={() => HoverImgChange('Monthly Horoscope')}> Monthly Horoscope</li> */}
                <li className="nav_link_card"
                  onClick={() =>
                    // !userLoggedIn ? shouldOpenLoginPopup() :
                    history.push({
                      pathname: FRONTEND_NAME + "/career-astrology-in-india"
                    })
                  }
                > Career Astrology</li>

                <li className="nav_link_card"
                  onClick={() =>
                    // !userLoggedIn ? shouldOpenLoginPopup() :
                    history.push({
                      pathname: FRONTEND_NAME + "/court-case-astrology"
                    })
                  }
                >Court Legal Issues</li>

                <li className="nav_link_card"
                  onClick={() =>
                    // !userLoggedIn ? shouldOpenLoginPopup() :
                    history.push({
                      pathname: FRONTEND_NAME + "/marriage-problems-astrology"
                    })
                  }
                > Delay in marriage</li>

                <li className="nav_link_card"
                  onClick={() =>
                    // !userLoggedIn ? shouldOpenLoginPopup() :
                    history.push({
                      pathname: FRONTEND_NAME + "/face-reading-astrology"
                    })
                  }
                > Face Reading</li>

                <li className="nav_link_card"
                  onClick={() =>
                    // !userLoggedIn ? shouldOpenLoginPopup() :
                    history.push({
                      pathname: FRONTEND_NAME + "/palm-reading-astrology"
                    })
                  }
                > Palm Reading</li>
            </ul>
        </li>

        <li>
          <div  className='dropdown-toggle'
          >
            <img className="menu-icon" src={astrology1} alt='wallet' />
            {t('Horoscope')}
          </div>
          <ul className="nav_container">
                <li className="nav_link_card"  onClick={() =>
                  // !userLoggedIn ? shouldOpenLoginPopup() :
                  history.push({
                    pathname: FRONTEND_NAME + "/horoscope/Daily-Horoscope/Aries"
                  })
                }> Daily Horoscope</li>
                <li className="nav_link_card"
                  onClick={() =>
                    // !userLoggedIn ? shouldOpenLoginPopup() :
                    history.push({
                      pathname: FRONTEND_NAME + "/horoscope/Weekly-Horoscope"
                    })
                  }
                > Weekly Horoscope</li>
                <li className="nav_link_card"
                  onClick={() =>
                    // !userLoggedIn ? shouldOpenLoginPopup() :
                    history.push({
                      pathname: FRONTEND_NAME + "/horoscope/Yearly-Horoscope"
                    })
                  }
                > Yearly Horoscope</li>
              </ul>
        </li>

        <li>
          <div  className='dropdown-toggle'
          >
            <img className="menu-icon" src={astrology2} alt='wallet'/>
            {t('Festivals')}
          </div>
          <ul className="nav_container">
                <li className="nav_link_card" onClick={() =>
                  // !userLoggedIn ? shouldOpenLoginPopup() :
                  history.push({
                    pathname: FRONTEND_NAME + "/festival-calender-astrology"
                  })
                }> Festival Calender 2023 </li>

                <li className="nav_link_card" onClick={() =>
                  history.push({
                    pathname: FRONTEND_NAME + "/"
                  })
                }>  Vrat Calender 2023 </li>

              </ul>
            
        </li>

        <li>
          <div  className='dropdown-toggle' 
          >
            <img className="menu-icon" src={astrology3} alt='wallet' />
            {t('More')}
          </div>
          <ul className="nav_container">
                <li className="nav_link_card" onClick={() =>
                  history.push({
                    pathname: FRONTEND_NAME + "/tarot-cards"
                  })
                }> Tarot cards </li>

                <li className="nav_link_card" onClick={() =>
                  // !userLoggedIn ? shouldOpenLoginPopup() :
                  history.push({
                    pathname: FRONTEND_NAME + "/upcoming-festivals-vatpurnima"
                  })
                }>  Festivals vat purnima </li>

                <li className="nav_link_card" onClick={() =>
                  // !userLoggedIn ? shouldOpenLoginPopup() :
                  history.push({
                    pathname: FRONTEND_NAME + "/mangalik-dosh"
                  })
                }>  Mangal Dosh</li>

                <li className="nav_link_card" onClick={() =>
                  // !userLoggedIn ? shouldOpenLoginPopup() :
                  history.push({
                    pathname: FRONTEND_NAME + "/kaalsharp-dosha"
                  })
                }>  {t('kalsharp_dosh')}</li>

              </ul>
            
        </li>

        <li>
          <a
            onClick={() => {
              if (HeaderData.isUserLoggedIn) {
                openChatList("/wt")
              } else {
                openLoginPopup();
              }
            }}
          >
            <img className="menu-icon" src={WalletTransactions} alt='wallet'/>
            {t('Wallet_Transactions')}
          </a>
        </li>

        <li>
          <a
            onClick={() => {
              if (HeaderData.isUserLoggedIn) {
                openChatList("/orderHistory", "")
              } else {
                openLoginPopup();
              }
            }

            }
          >
            <img className="menu-icon" src={OrderHistory} alt='orders'/>
            {t('Order_History')}
          </a>
        </li>
        {/* <li
  onClick={() => openChatList("/talk", "Call")}
><img className="menu-icon" src={TalkWithAstrology} /> Talk to Astrologer</li> */}

        <li onClick={() => openChatList("/astromall")}> <img className="menu-icon" src={AstroMall} alt='mall' /> {t('AstroMall')}</li>
        <li onClick={() => openChatList("/about")}> <img className="menu-icon" src={AboutIcon} width="20px" alt='about' /> {t('About_us')}</li>
        <li onClick={() => history.push(FRONTEND_NAME + "/article")}><img className="menu-icon" src={AboutIcon} width="20px" alt='article' />{t('Blog')} </li>
        <li onClick={() => openTab("support")}><img className="menu-icon" src={SupportIcon} width="20px" alt='support' /> {t('Customer_Support')} </li>
        <li onClick={() => history.push(FRONTEND_NAME + "/terms")}><FontAwesomeIcon className="menu-icon" icon={faPersonCircleQuestion} color={style.color} fontSize={style.fontSize} /> {t('Terms_of_Use')} </li>
        <li onClick={() => history.push(FRONTEND_NAME + "/privacyPolicy")}> <FontAwesomeIcon className="menu-icon" icon={faShieldVirus} color={style.color} fontSize={style.fontSize} /> {t('Policy')} </li>
        <li onClick={() => history.push(FRONTEND_NAME + "/refundpolicy")}> <FontAwesomeIcon className="menu-icon" icon={faShieldVirus} color={style.color} fontSize={style.fontSize} /> {t('Refund_Policy')} </li>

        {localStorage["isJioUser"] === "true" ? null : <>
          {
            HeaderData.isUserLoggedIn ? <li className="logoutbtn11" onClick={logoutUser}> <img className="menu-icon" src={Logout} alt='logout'/> {t('Logout')}</li> : null
          }
        </>}



      </ul> : <ul className="mob_nav">
        
      <li>
          <div  className='dropdown-toggle'
           
          >
            <img className="menu-icon" src={WalletTransactions} alt='img' />
            {t('Astrology')}
          </div>

            <ul className="nav_container">
                <li className="nav_link_card" onClick={() =>
                  // !userLoggedIn ? shouldOpenLoginPopup() :
                  history.push({
                    pathname: FRONTEND_NAME + "/planetry-transit-2023"
                  })
                }> Planetary transit 2023 </li>

                <li className="nav_link_card" onClick={() =>
                  // !userLoggedIn ? shouldOpenLoginPopup() :
                  history.push({
                    pathname: FRONTEND_NAME + "/marriage-astrologer-in-India"
                  })
                }> Marriage Astrology </li>
                <li className="nav_link_card"
                  onClick={() =>
                    // !userLoggedIn ? shouldOpenLoginPopup() :
                    history.push({
                      pathname: FRONTEND_NAME + "/business-astrology-in-india"
                    })
                  }
                > Business Astrology</li>
                {/* <li className="nav_link_card" onMouseOver={() => HoverImgChange('Monthly Horoscope')}> Monthly Horoscope</li> */}
                <li className="nav_link_card"
                  onClick={() =>
                    // !userLoggedIn ? shouldOpenLoginPopup() :
                    history.push({
                      pathname: FRONTEND_NAME + "/career-astrology-in-india"
                    })
                  }
                > Career Astrology</li>

                <li className="nav_link_card"
                  onClick={() =>
                    // !userLoggedIn ? shouldOpenLoginPopup() :
                    history.push({
                      pathname: FRONTEND_NAME + "/court-case-astrology"
                    })
                  }
                >Court Legal Issues</li>

                <li className="nav_link_card"
                  onClick={() =>
                    // !userLoggedIn ? shouldOpenLoginPopup() :
                    history.push({
                      pathname: FRONTEND_NAME + "/marriage-problems-astrology"
                    })
                  }
                > Delay in marriage</li>

                <li className="nav_link_card"
                  onClick={() =>
                    // !userLoggedIn ? shouldOpenLoginPopup() :
                    history.push({
                      pathname: FRONTEND_NAME + "/face-reading-astrology"
                    })
                  }
                > Face Reading</li>

                <li className="nav_link_card"
                  onClick={() =>
                    // !userLoggedIn ? shouldOpenLoginPopup() :
                    history.push({
                      pathname: FRONTEND_NAME + "/hand-reading-astrology"
                    })
                  }
                > Palm Reading</li>
            </ul>
        </li>

        <li>
          <div  className='dropdown-toggle'
          >
            <img className="menu-icon" src={WalletTransactions} alt='Horoscope'/>
            {t('Horoscope')}
          </div>
          <ul className="nav_container">
                <li className="nav_link_card" onClick={() =>
                  // !userLoggedIn ? shouldOpenLoginPopup() :
                  history.push({
                    pathname: FRONTEND_NAME + "/horoscope/Daily-Horoscope/Aries"
                  })
                }> Daily Horoscope</li>
                <li className="nav_link_card"
                  onClick={() =>
                    // !userLoggedIn ? shouldOpenLoginPopup() :
                    history.push({
                      pathname: FRONTEND_NAME + "/horoscope/Weekly-Horoscope"
                    })
                  }
                > Weekly Horoscope</li>
                {/* <li className="nav_link_card" onMouseOver={() => HoverImgChange('Monthly Horoscope')}> Monthly Horoscope</li> */}
                <li className="nav_link_card"
                  onClick={() =>
                    // !userLoggedIn ? shouldOpenLoginPopup() :
                    history.push({
                      pathname: FRONTEND_NAME + "/horoscope/Yearly-Horoscope"
                    })
                  }
                > Yearly Horoscope</li>
              </ul>
            
        </li>

        <li>
          <div  className='dropdown-toggle'
          >
            <img className="menu-icon" src={WalletTransactions} alt='img'/>
            {t('Festivals')}
          </div>
          <ul className="nav_container">
                <li className="nav_link_card" onClick={() =>
                  // !userLoggedIn ? shouldOpenLoginPopup() :
                  history.push({
                    pathname: FRONTEND_NAME + "/festival-calender-astrology"
                  })
                }> Festival Calender 2023 </li>

                <li className="nav_link_card" onClick={() =>
                  history.push({
                    pathname: FRONTEND_NAME + "/"
                  })
                }>  Vrat Calender 2023 </li>

              </ul>
            
        </li>

        <li>
          <div  className='dropdown-toggle' 
          >
            <img className="menu-icon" src={WalletTransactions} alt='img' />
            {t('More')}
          </div>
          <ul className="nav_container">
                <li className="nav_link_card" onClick={() =>
                  history.push({
                    pathname: FRONTEND_NAME + "/tarot-cards"
                  })
                }> Tarot cards </li>

                <li className="nav_link_card" onClick={() =>
                  // !userLoggedIn ? shouldOpenLoginPopup() :
                  history.push({
                    pathname: FRONTEND_NAME + "/upcoming-festivals-vatpurnima"
                  })
                }>  Festivals vat purnima </li>

                <li className="nav_link_card" onClick={() =>
                  // !userLoggedIn ? shouldOpenLoginPopup() :
                  history.push({
                    pathname: FRONTEND_NAME + "/mangalik-dosh"
                  })
                }>  Mangal Dosh</li>

                <li className="nav_link_card" onClick={() =>
                  // !userLoggedIn ? shouldOpenLoginPopup() :
                  history.push({
                    pathname: FRONTEND_NAME + "/kalshap-dosh"
                  })
                }>  Kalshap Dosh</li>

              </ul>
            
        </li>
        <li onClick={() => openChatList("/about")}> <img className="menu-icon" src={AboutIcon} width="20px" alt='img' /> {t('About_us')}</li>
        <li onClick={() => history.push(FRONTEND_NAME + "/article")}><img className="menu-icon" src={AboutIcon} width="20px" alt='img'/>{t('Blog')} </li>
        <li onClick={() => openTab("support")}><img className="menu-icon" src={SupportIcon} width="20px" alt='img' />{t('Customer_Support')} </li>
        <li onClick={() => history.push(FRONTEND_NAME + "/terms")}><FontAwesomeIcon className="menu-icon" icon={faPersonCircleQuestion} color={style.color} fontSize={style.fontSize} />{t('Terms_of_Use')} </li>
        <li onClick={() => history.push(FRONTEND_NAME + "/privacyPolicy")}> <FontAwesomeIcon className="menu-icon" icon={faShieldVirus} color={style.color} fontSize={style.fontSize} /> {t('Policy')} </li>
        <li onClick={() => history.push(FRONTEND_NAME + "/refundpolicy")}> <FontAwesomeIcon className="menu-icon" icon={faShieldVirus} color={style.color} fontSize={style.fontSize} /> {t('Refund_Policy')} </li>

      </ul>}
      {/* {

HeaderData.isUserLoggedIn ? null : <li className="logoutbtn" onClick={openLoginPopup}>
  <img className="menu-icon" src={LoginIcon} width="20px" />
  Login
</li>
} */}
    </div>
    <div className="mobOverlay"
      onClick={props.OnClickHundle}
    ></div>
  </>


}

const withCombine = compose(
  withTranslation()
)

export default withCombine(MobHeader);