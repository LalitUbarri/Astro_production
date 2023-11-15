import React, { Component } from 'react'
import chaticon from "../images/chat-icon.svg";
import Callicon from "../images/call-icon.svg";
// import newsicon from "../images/news-icon.svg";
import contecticon from "../images/contect-icon.svg";
import google from "../images/google.png";
import apple from "../images/apple.png";
import { useHistory } from 'react-router-dom'
import { FRONTEND_NAME } from "../configuration/constants";
import Signup from "../components/signup";
import '../styles/home.css'
import { useTranslation } from 'react-i18next';
import apiUrls from "../configuration/apiUrls";
import apis from "../configuration/apis";
import { postApi } from "../configuration/apis";
import { getCommonHeaders } from "../configuration/commonFunctions";
import * as Constant from "../configuration/constants";
import Popup from '../components/popupChat';
import Loading from '../components/loader';
import { data } from 'jquery';
import { Alert } from 'bootstrap';


export default class BottomHeaderProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
          typeOfService: "",
          // userMsisdn: localStorage["msisdn"],
          panditJiList: [],
          filteredpanditJiList: [],
          busypanditList: [],
          sliceLength: 12,
          incrementBy: 12,
          myLanguages: sessionStorage.getItem("myLanguages"),
          showPopUp: false,
          Isnavigate: false,
          msg: "",
          button: "Ok",
          service_Val: '',
          userProfile: localStorage["userProfile"]
            ? JSON.parse(localStorage["userProfile"])
            : {},
          userMsisdn: localStorage['msisdn'] && localStorage["msisdn"].length === 10 ? `91${localStorage["msisdn"]}` : localStorage["msisdn"],
          enableLoader: false,
          isUserLoggedIn: localStorage["msisdn"] ? true : false,
          isChatActive: false,
          displaySignupPopUp: false,
          loginSelected: true,
       
          currencyLogo: '',
          countryCode: [],
          mobSideNaveTrue: false,
          mobPage_headerTrue: false,
        };
      }
    
  openLoginPopup = () => {
    this.setState({
      displaySignupPopUp: true,
      loginSelected: true,
    });
  };


  openSignupPopup = () => {
    this.setState({
      displaySignupPopUp: true,
      loginSelected: false,
    });
  };

  closeSignUpPopup = () => {
    this.setState({
      displaySignupPopUp: false,
    });
  };

  closePopupOnLogin = () => {
    localStorage["isUserLoggedIn"] = true;
    this.setState({
      displaySignupPopUp: false,
      isUserLoggedIn: true,
    });
    this.props.history.push(FRONTEND_NAME + "/home");
  };

  showPopUp = (msg, isSuccess) => {
    this.setState({
      showPopUp: true,
      isSuccess: isSuccess,
      msg: this.props.t(msg),
    });
  };
  checkBusyPandit = (panditMsisdn) => {
    let url = apiUrls.checkBusyPandit;
    url = url.replace("<panditMsisdn>", Number(panditMsisdn));

    return apis.checkBusyPandit(url).then((response) => {
      var data = response.data;

      if (data.code == "2000") {
        let busyData = data.data;
        return busyData;

      }
      else {
        console.log("ERROR", data.msg);
        return new Error("error");
      }
    });
  }
  
  initiateRequestChat = (data) => {
    // alert(JSON.stringify(data))
    let status = data.goodsSale;
    console.log("status>>>" + JSON.stringify(status));
    let busyPandits = this.state.busypanditList;

    // alert(status))
    // if(data.goodsSale=='0'){}
    if (
      busyPandits &&
      busyPandits.length > 0 &&
      busyPandits.some((ele) => data.goodsId == ele)
    ) {
      this.showPopUp("Astrologer is busy right now. Please click bell icon for notification.", false);
      return;
    }


    this.checkBusyPandit(data.goodsId).then(response => {
      let busyStatus = response;
     

      if (busyStatus.busy) {
        this.showPopUp("Astrologer is busy right now. Please click bell icon for notification.");
        return;
      }


      if (status == 1) {
        console.log("status>>>" + status);
        if (localStorage["userBalance"] < data.goodsPrice * 5) {
          this.setState({
            ...this.state,
            Isnavigate: true
          })
          this.showPopUp(
            // "Minimum balance of 5 minutes( ₹" +
            this.props.t("Minimum_balance_5_mins_chat1") +
            data.goodsPrice * 5 +
            this.props.t("Minimum_balance_5_mins_chat2"),
            // " for 5 mins) is required to chat with astrologer.",
            false
          );
          return;
        }
        if (sessionStorage["chatId"]) {

            // alert("HI")
          this.props.history.push({
            pathname: FRONTEND_NAME + "/chat",
            state: {
              panditMsisdn: data.goodsId,
            },
          });
        } else {
          this.props.history.push({
            pathname: FRONTEND_NAME + "/form",
            state: {
              typeOfService: this.state.typeOfService,
              panditMsisdn: data.goodsId,
              orderDetail: data,
            },
          });
        }
      }
    });
  };
 
  initiateRequest = (data) => {
   


    let busyPandits = this.state.busypanditList;
    if (
      busyPandits &&
      busyPandits.length > 0 &&
      busyPandits.some((ele) => data.goodsId == ele)
    ) {
      this.showPopUp(this.props.t('Astrologer_is_currently_busy._Please_try_after_some_time.'), false);
      return;
    }

    // debugger;
    this.checkBusyPandit(data.goodsId).then(response => {
      let busyStatus = response;
      if (busyStatus.busy) {
        this.showPopUp(this.props.t('Astrologer_is_currently_busy._Please_try_after_some_time.'));
        return;
      }
      let status = data.goodsSale;
      console.log("status>>>" + status);
      // alert(data.goodsPrice)
      if (status == 1) {
        if (localStorage["userBalance"] < data.goodsPrice * this.state.service_Val) {
          this.setState({
            ...this.state,
            Isnavigate: true
          })
          this.showPopUp(
            //"Minimum balance of 5 minutes( ₹" +
            this.props.t('Minimum_balance_5_mins_call1') +
            data.goodsPrice * 5 +
            this.props.t('Minimum_balance_5_mins_call2'),
            //" for 5 mins) is required to talk with astrologer.",
            false
          );
          return;
        }
        console.log("status>>>" + status);

        this.requestCall(data);
        //  this.props.history.push({pathname:FRONTEND_NAME+"/form",state:{typeOfService:this.state.typeOfService}})
      }
    });
  };

  requestCall = (data) => {
    let campaignId = data.subsidizedCampaignId ? data.subsidizedCampaignId : null;
    var requestBody = {
      no2dial: data.goodsId,
      ratePerMinute: data.goodsPrice,
      userBalance: localStorage["userBalance"],
      userNumber: this.state.userMsisdn,
      subsidizedCampaignId: campaignId,
      isPremium: false
    };
    return apis
      .requestCall(requestBody)
      .then((response) => response.data)
      .then((data) => {
        console.log("response requestCall", data);
        if (data.code == "2000") {
          this.setState({
            showPopUp: true,
            msg: this.props.t('Call_Req_Submitted'),
            button: "Ok",
          });
        } else {
          this.setState({
            showPopUp: true,
            msg: this.props.t(data.msg),
            button: "Ok",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };








   
    render() {
        const { t } = this.props;

        return (
            <>
                {/* {BottomHeaderData.displaySignupPopUp && (
                    <Signup
                        openLoginPopup={this.openLoginPopup()}
                        openSignupPopup={this.openSignupPopup()}
                        closePopUp={this.closePopUp()}
                        closeOnLogin={this.closePopupOnLogin()}
                        isLogin={this.isLogin()}
                    />
                )} */}

                {this.state.displaySignupPopUp && (
            <Signup
              openLoginPopup={this.openLoginPopup}
              openSignupPopup={this.openSignupPopup}
              closePopUp={this.closeSignUpPopup}
              closeOnLogin={this.closePopupOnLogin}
              isLogin={this.state.loginSelected}
              countryCode={this.state.countryCode}
            />
          )}
          {this.state.showPopUp ? (
            <Popup
              heading={this.state.heading}
              msg={this.state.msg}
              button={this.state.button}
              closePopUp={this.closePopUp}
            />
          ) : null}
          {/* {this.state.enableLoader ? null : <Loading />} */}
                <div className="p-0 carousel-menu">
                    <div
                        className="row-cols-1"  
                        onClick={this.state.isUserLoggedIn
                            ? () => this.initiateRequest(this.props.data)
                            : () => this.openLoginPopup()}
                    >
                        <img src={chaticon} alt="chat" width="50px" />
                         {/* <p className="d-none1">{t('Chat_with_Astrologer')}</p> */}
                        {/* <p className="">{alert(data.goodsPrice)}</p>  */}
                        
                    </div>
                    <div className="row-cols-1"
                        onClick={this.state.isUserLoggedIn
                            ? () => this.initiateRequestChat(this.props.data)
                            : () => this.openLoginPopup()}
                                >
        <img src={Callicon} alt="call" width="50px" />
        {/* <p>{alert(JSON.stringify(this.props))}/{('mins')}</p> */}
        {/* <p className="d-none1">{t('Talk_to_Astrologer')}</p>
        <p className="mob_D-none">{t('Talk_to_Astrologer')}</p> */}
      </div>
                {/* <div
                className="row-cols-1"
                onClick={
                  BottomHeaderData.isUserLoggedIn
                    ? () =>
                      history.push({
                        pathname: FRONTEND_NAME + "/report",
                        state: { typeOfService: "Report" },
                      })
                    : () => openLoginPopup()
                  
                }
              >
                <img src={contecticon} alt="/"></img>
                <p className="d-none1">{t('Get_Detailed_Report')}</p>
                <p className="mob_D-none">{t('Get_Detailed_Report')}</p>
              </div> */}
                {/* <div className="row-cols-1 appdown">
        {/* <p className="doa">Download Our App</p> *
      <div className="new-store">
        <img onClick={downloadApp} src={google} alt="/"></img>
        <img src={apple} alt="appleStore"></img>
      </div>
    </div> */}
            </div>
      </>
    )
    }
}
