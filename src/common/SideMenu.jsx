import React from "react";
import OrderHistory from "../images/OrderHistory.svg";
import WalletTransactions from "../images/WalletTransactions.svg";
import UGetDetailedReportser from "../images/GetDetailedReport.svg";
import ChatwithAstrology from "../images/ChatwithAstrology.svg";
import TalkWithAstrology from "../images/TalkWithAstrology.svg";
import AstroMall from "../images/AstroMall.svg";
import CustomerSupport from "../images/CustomerSupport.svg";
import Mylanguages from "../images/Mylanguages.svg";
import VoucherIcon from '../images/New-images/voucher-icon.png';
import CoinIcon from '../images/New-images/coins.png';

import Logout from "../images/Logout.svg";
import sidemenuOpenIcon from "../images/sidemenu-open-icon.png";

import Language from "../components/Language";

import apis from "../configuration/apis";
import { APP_NAME, FRONTEND_NAME } from "../configuration/constants";
import { getCommonHeaders, getStaticValues } from "../configuration/commonFunctions";
import { withRouter } from "react-router-dom";
import Popup from "../components/popupChat"
import apiUrls from "../configuration/apiUrls";
import { withTranslation } from 'react-i18next';
import { compose } from 'redux'
import Signup from "../components/signup";

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMyLanguages: false,
      languageRef: null,
      showPopUp: false,
      msg: "",
      isSuccess: false,
      isChatActive: false,
      HeaderData: {
        isUserLoggedIn: localStorage["msisdn"] ? true : false,
        isChatActive: false,
        displaySignupPopUp: false,
        loginSelected:true,
      },
      countryCode: []
    };
  }

  componentDidMount()
  {
    this.fetchcountryCode()
    if (localStorage["isUserLoggedIn"]) {
      this.fetchPanditForChat();
    }

  }
  
  fetchPanditForChat = () => {
    let url = apiUrls.getLivePanditForUser;
    url = url.replace("<appName>", APP_NAME.replace(/['"]+/g, ""));
    url = url.replace("<userMsisdn>", Number(localStorage["msisdn"]));

    return apis.getLivePanditForUser(url).then((response) => {
      var data = response.data;

      if (data.code == "2000") {
        let chatClients = data.data;


        if (chatClients && chatClients.length > 0) {
          let panditMsisdn = chatClients[0].msisdn;
          this.setState({
            isChatActive: true,
            panditMsisdn: panditMsisdn
          });


        }
        else { }
      }
      else {
        console.log(data.msg);
      }

    });
  };
  handleMenuClick = (item) => {
    // alert(item)
    if (!localStorage["isUserLoggedIn"] && (item === "wt" || item === "orderHistory")) {
      // this.showPopUp("Please login to continue.", false);
      this.setState({
        HeaderData: {
          ...this.state.HeaderData,
          displaySignupPopUp: true
        }
      }) 
    }
    else {
      if (item === "languages")
        this.openMyLanuages();
      else if(item === "chatList")
      this.openChatList();
      else
        this.props.history.push(FRONTEND_NAME + "/" + item);
    }
  }

  openChatList = () => {

    let isChatActive = this.state.isChatActive;
    if (isChatActive) {
      this.props.history.push({
        pathname: FRONTEND_NAME + "/chat",
        state: { panditMsisdn: this.state.panditMsisdn }
      });
    }
    else {
      this.props.history.push({
        pathname: FRONTEND_NAME + "/chatList",
        state: { typeOfService: "Chat" },
      });
    }
  }

  fetchcountryCode = () => {
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
              

            this.setState({
              countryCode: dataToPush
            });
        } 
      })
      .catch((error) => {
        console.log(error);
      });

  }

  openLangPopUp = () => {
    console.log("inside function");
    return <Language />;
  };

  logoutUser = () => {
    /* console.log('logout user');
     
         var headers = getCommonHeaders();
        
       var requestBody = {
         "msisdn":"1111111111"
       };
       apis.logoutApi(requestBody, headers)
           .then(response => response.data)
           .then(data => {
               console.log("resp data", data);
               if (data.code == "2000") {
                   ////debugger;
                   {console.log('logoutApi'+data.msg)}
                   this.props.history.push({pathname:FRONTEND_NAME+"/home"})
                  
               }
               else {
                   console.log(data.msg);
                   
                   //props.showPopUpFunc(data.msg);
               }
           })
           .catch(error => {
               console.log(error);
     
           })*/
    localStorage.clear();
    sessionStorage.clear();
    this.props.history.push({ pathname: FRONTEND_NAME + "/home" });
    // alert('hello')

  };

  openMyLanuages = () => {
    this.setState({
      displayMyLanguages: true,
    });
  };
  closeLanguagePopup = () => {
    this.setState({
      displayMyLanguages: false,
    });
  };
  showPopUp(msg, isSuccess) {
    this.setState({
      showPopUp: true,
      msg: msg,
      isSuccess: isSuccess,
    });
  }
  closePopUp = () => {
    this.setState({
      showPopUp: false,
      loginSelected: true,
    });
  };

  openNav = () => {
    document.getElementById("mySidenav").style.width = "243px";
  }

  closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  }
  
  openLoginPopup = () => {
    this.setState({
      HeaderData : {
      ...this.setState.HeaderData,
      displaySignupPopUp: true,
      loginSelected: true,
    }})
    
  }

  shouldOpenLoginPopup = () => {
    this.setState({
      HeaderData : {
      ...this.setState.HeaderData,
      displaySignupPopUp: true,
      loginSelected: true,
    }});
  };

openSignupPopup = () => {
  this.setState({
    HeaderData : {
    ...this.setState.HeaderData,
      displaySignupPopUp: true,
      loginSelected: false,
  }});
  };

 closeSignUpPopup = () => {
  this.setState({
    HeaderData : {
     ...this.setState.HeaderData,
      displaySignupPopUp: false,
      loginSelected: true,
  }});
  };

closePopupOnLogin = () => {
    localStorage["isUserLoggedIn"] = true;
    this.setState({
      HeaderData : {
      ...this.setState.HeaderData,
      displaySignupPopUp: false,
      isUserLoggedIn: true,
    }});
    this.props.history.push(FRONTEND_NAME + "/home");
  };

  // const closePopUp = () => {
  //   setShowPopUp(false);
  // }

  render(){
    const {t}= this.props;
    const { showPopUp, msg, isSuccess, isChatActive } = this.state;
    return (
      <>
          {/* <a class="nav-link m-d-none header-menu-name active col-wyt sideBarIcon" onClick={this.openNav}>
            <img className="sidemenu-open" src={sidemenuOpenIcon}></img>
          </a> */}
        <div className="col side-menu ">
          {this.state.displayMyLanguages && (
            <Language closePopup={() => this.closeLanguagePopup()} />
          )}
          {showPopUp && (
            <Popup
              msg={msg}
              isSuccess={isSuccess}
              closePopUp={this.closePopUp}
            />
          )}
          {this.state.HeaderData.displaySignupPopUp && (
            <Signup
              openLoginPopup={this.openLoginPopup}
              openSignupPopup={this.openSignupPopup}
              closePopUp={this.closeSignUpPopup}
              closeOnLogin={this.closePopupOnLogin}
              isLogin={this.state.HeaderData.loginSelected}
              countryCode={this.state.countryCode}
            />
          )}
          <div className="vertical-menu">
            <span>
              <a
                className="menu-item"
                onClick={() =>
                  this.handleMenuClick("orderHistory")
                }
              >
                <img className="menu-icon" src={OrderHistory} alt="orders" />
             {t('Order_History')}
            </a>
            </span>

            <span>
              <a
                className="menu-item"
                onClick={() =>
                  this.handleMenuClick("wt")
                }
              >
                <img className="menu-icon" src={WalletTransactions} alt="wallet" />
              {t('Wallet_Transactions')}
            </a>
            </span>

            <span>
              <a
                className="menu-item"
                onClick={() =>
                  this.handleMenuClick("report")
                }
              >
                <img className="menu-icon" src={UGetDetailedReportser} alt="repot" />
              {t('Get_Detailed_Report')}
            </a>
            </span>

            <span>
              <a
                className={"menu-item "+ (isChatActive ? "activeGreen" : "")}
                onClick={() =>
                  this.handleMenuClick("chatList")
                }
              >
                <img className="menu-icon" src={ChatwithAstrology} alt="chat"/>
              {t('Chat_with_Astrologer')}
            </a>
            </span>

            <span>
              <a
                className="menu-item"
                onClick={() =>
                  this.handleMenuClick("talk")
                }
              >
                <img className="menu-icon" src={TalkWithAstrology} alt="talk"/>
              {t('Talk_to_Astrologer')}
            </a>
            </span>

            <span>
              <a
                className="menu-item"
                onClick={() =>
                  this.handleMenuClick("astromall")
                }
              >
                <img className="menu-icon" src={AstroMall} alt="mall" />
              {t('AstroMall')}
            </a>
            </span>

            {/* <span><a className="menu-item" onClick={() => this.props.history.push({ pathname: FRONTEND_NAME + "/customerSupport" })}><img className="menu-icon" src={CustomerSupport} />Customer Support</a></span> */}
            {/* <span><a className="menu-item" onClick={this.props.displayMyLanguages}><img className="menu-icon" src={Mylanguages} />My languages</a></span> */}
            <span>
              <a className="menu-item" onClick={this.state.HeaderData.isUserLoggedIn? () => this.handleMenuClick("languages") : () => this.openLoginPopup()}>
                <img className="menu-icon" src={Mylanguages}  alt="language"/>
              {t('My_Languages')}
            </a>
            </span>

            <span>
                <a
                  className="menu-item"
                  onClick={() =>
                    this.handleMenuClick("e-vouchers")
                  }
                >
                  <img className="menu-icon" src={VoucherIcon} alt="mall" />
                  {t('E-Vouchers')}
                </a>
              </span>

              <span>
                <a
                  className="menu-item"
                  onClick={() =>
                    this.handleMenuClick("loyalty-points-astrology")
                  }
                >
                  <img className="menu-icon" src={CoinIcon} alt="mall" />
                  {t('Loyalty Points')}
                </a>
              </span>

            <span>
              <a className="menu-item" onClick={() => this.logoutUser()}>
                <img className="menu-icon" src={Logout} alt="logout"/>
              {t('Logout')}
            </a>
            </span>

          </div>
        </div>
        {/* <div id="mySidenav" class="sidenav">
          <a class="closebtn" onClick={this.closeNav}>&times;</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Clients</a>
          <a href="#">Contact</a>
        </div> */}
        <div id="mySidenav" className="sidenav">
          <a className="closebtn" onClick={this.closeNav}>&times;</a>
          <div className="col side-menu">
            {this.state.displayMyLanguages && (
              <Language closePopup={() => this.closeLanguagePopup()} />
            )}
            {showPopUp && (
              <Popup
                msg={msg}
                isSuccess={isSuccess}
                closePopUp={this.closePopUp}
              />
            )}
            <div className="vertical-menu">
              <span>
                <a
                  className="menu-item"
                  onClick={() =>
                    this.handleMenuClick("orderHistory")
                  }
                >
                  <img className="menu-icon" src={OrderHistory} alt="orders"/>
              {t('Order_History')} 
            </a>
              </span>
              <span>
                <a
                  className="menu-item"
                  onClick={() =>
                    this.handleMenuClick("wt")
                  }
                >
                  <img className="menu-icon" src={WalletTransactions} alt="wallet"/>
              {t('Wallet_Transactions')}
            </a>
              </span>
              <span>
                <a
                  className="menu-item"
                  onClick={() =>
                    this.handleMenuClick("report")
                  }
                >
                  <img className="menu-icon" src={UGetDetailedReportser} alt="report"/>
              {t('Get_Detailed_Report')}
            </a>
              </span>
              <span>
                <a
                  className="menu-item"
                  onClick={() =>
                    this.handleMenuClick("chatList")
                  }
                >
                  <img className="menu-icon" src={ChatwithAstrology} alt="chat" />
              {t('Chat_with_Astrologer')}
            </a>
              </span>
              <span>
                <a
                  className="menu-item"
                  onClick={() =>
                    this.handleMenuClick("talk")
                  }
                >
                  <img className="menu-icon" src={TalkWithAstrology} alt="talk" />
              {t('Talk_to_Astrologer')}
            </a>
              </span>
              <span>
                <a
                  className="menu-item"
                  onClick={() =>
                    this.handleMenuClick("astromall")
                  }
                >
                  <img className="menu-icon" src={AstroMall} alt="mall" />
              {t('AstroMall')}
            </a>
              </span>
             
              {/* <span><a className="menu-item" onClick={() => this.props.history.push({ pathname: FRONTEND_NAME + "/customerSupport" })}><img className="menu-icon" src={CustomerSupport} />Customer Support</a></span> */}
              {/* <span><a className="menu-item" onClick={this.props.displayMyLanguages}><img className="menu-icon" src={Mylanguages} />My languages</a></span> */}
              <span>
                <a className="menu-item" onClick={this.state.HeaderData.isUserLoggedIn? () => this.handleMenuClick("languages") : () => this.openLoginPopup()}>
                  <img className="menu-icon" src={Mylanguages} alt="language" />
                {t('My_Languages')}
                </a>
              </span>
              <span>
                <a className="menu-item" onClick={() => this.logoutUser()}>
                  <img className="menu-icon" src={Logout} alt="logout" />
              {t('Logout')}
            </a>
              </span>
            </div>
          </div>
        </div>
      </>

    );
  }
}
const withCombine=compose(
  withRouter,
  withTranslation()
) 
export default withCombine(SideMenu);
