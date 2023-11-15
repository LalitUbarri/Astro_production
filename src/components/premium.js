import React from "react";
import { withRouter } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "jquery/dist/jquery.min";
import user from "../images/user.png";
import star from "../images/grey.svg";
import bell from "../images/bell.svg";
import tick from "../images/tick.svg";
import "../styles/about.css";
import "../styles/talk.css";
// import HeaderUser from "../common/HeaderUser";
import PageHeader from "../common/PageHeader";
import Footer from "../common/Footer";
import SideMenu from "../common/SideMenu";
import { getCommonHeaders } from "../configuration/commonFunctions";
import apis from "../configuration/apis";
import { getApi } from "../configuration/apis";
import StarRatings from "react-star-ratings";
import { FRONTEND_NAME, HTTP1 } from "../configuration/constants";
import { SUCCESS_CODE } from "../configuration/errorConstants";
import Popup from "./popupChat";
import Loading from "./loader";
// import Header from "../common/Header";
import apiUrls from "../configuration/apiUrls";
// import BottomHeader from "../common/BottomHeader";
import * as Constant from '../configuration/constants'
// import axios from "axios";
import { postApi } from "../configuration/apis";
// import { jssPreset } from "@material-ui/styles";
import Signup from "../components/signup";
import { withTranslation } from 'react-i18next';
import { compose } from 'redux'
// import moment from 'moment'
import Header2 from "../common/Header2";
import Chat_Talk_Header from "../common/Chat&Talk_Header";

var slotBB;

class Premium extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typeOfService: (props.location.state && props.location.state.selectedPage === "premiumCall") ? "Call" : "Call",
      userMsisdn: localStorage["msisdn"],
      panditJiList: [],
      filteredpanditJiList: [],
      busypanditList: [],
      sliceLength: 12,
      incrementBy: 12,
      myLanguages: sessionStorage.getItem("myLanguages"),
      showPopUp: false,
      msg: "",
      button: "Ok",
      service_Val: '',
      userProfile: localStorage["userProfile"]
        ? JSON.parse(localStorage["userProfile"])
        : {},
      userMsisdn: localStorage["msisdn"] ? localStorage["msisdn"] : "",
      enableLoader: false,
      isUserLoggedIn: localStorage["msisdn"] ? true : false,
      isChatActive: false,
      displaySignupPopUp: false,
      loginSelected: true,
      enableCallNowIds: new Set(),
      selectedSection: (props.location.state && props.location.state.selectedPage === "premiumCall") ? "Call" : "Call",
      currencyLogo: '',
      bookedPandit: new Set(),
      Isbooked: false
    };
  }
  componentWillMount() {
    slotBB = localStorage['slotBooked'];
  }
  componentDidMount() {
    slotBB = localStorage['slotBooked'];
    // const finalTime = 1643891880000;
    // const currentTime = new Date().valueOf();
    // if (finalTime > currentTime) this.timeOutForEnablingBookNow(1, finalTime - currentTime)
    // // this.timeOutForEnablingBookNow(2, 10000)
    // this.timeOutForEnablingBookNow(3, 30000)

    window.scrollTo(0, 0);
    this.fetchPanditList(this.props.location.state && this.props.location.state.selectedPage ? this.props.location.state.selectedPage : "premiumChat");
    this.getUserCurrency();
    this.fetchBookingSlot();
    const headers = getCommonHeaders();
    var Url = Constant.ASTRO_URL + "/FlexPlatform/getServiceVal";
    const requestBody = {
      service_type: "callchat"
    }
    // console.log("lalit11" + JSON.stringify(requestBody));
    postApi(Url, headers, requestBody)
      .then((response) => response.data)
      .then((data) => {
        console.log("getServiceVal :" + JSON.stringify(data.data[0].service_val));
        this.setState({
          service_Val: data.data[0].service_val
        })
      }).catch(err => {
        console.log(err);
      })

    this.getUserProfileDetails()
    // this.state.filteredpanditJiList.map(data => {
    //   alert(data.sale_end_time);
    // })
  }

  timeOutForEnablingBookNow(slotid, time) {
    setTimeout(() => {
      if (!this.state.enableCallNowIds.has(slotid)) {
        this.setState({
          enableCallNowIds: new Set(this.state.enableCallNowIds).add(slotid.toString())
        })
        window.location.reload()
      }
    }, time);

  }

  timeOutForEnablingBookedPandit(slotid, time) {
    setTimeout(() => {
      if (this.state.bookedPandit.has(slotid)) {
        this.setState(({ bookedPandit }) => {
          const newBookedPandit = new Set(bookedPandit);
          localStorage['slotBooked'] = false
          newBookedPandit.delete(slotid);
          return { bookedPandit: newBookedPandit };
        });
        ///window.location.reload()
      }
    }, time);

  }

  timeOutForDisableBookNow(time) {
    setTimeout(() => {
      window.location.reload()
    }, time);
  }

  fetchPanditList = (premiumType, isSectionChanged = false) => {
    // alert(premiumType);
    if (premiumType === "premiumChat") {
      this.setState({
        selectedSection: "Chat",
        enableLoader: false
      });
    }
    else {
      this.setState({
        selectedSection: "Call",
        enableLoader: false
      });
    }
    var headers = getCommonHeaders();
    // headers.msisdn = this.state.userProfile.getItem("msisdn");

    var requestBody = {
      //redeemCategory: this.state.typeOfService,
      redeemCategory: premiumType,
      // redeemCategory: "premiumChat",
      redemptionType: "white",
    };

    apis
      .premiumPanditJilist(requestBody, headers)
      //.panditJilist(requestBody, headers)
      .then((response) => response.data)
      .then((data) => {
        // console.log("resp data", data);

        console.log("astro resp data", data);
        if (data.code == "2000") {
          //debugger;
          this.fetchBookingSlot();
          let panditList = data.data;
          //   console.log("astro resp data", data);
          
          //  ones with sequence no lower & non zero have a higher priority 
          let orderedPanditList = panditList.sort((a, b) =>
            Number(a.sequence) && Number(b.sequence) && Number(a.sequence) < Number(b.sequence) ? -1 : 1
          );

          //goodsSale = 1 for online/busy users,so they are placed first 
          orderedPanditList = orderedPanditList.sort((a, b) =>
            Number(a.goodsSale) > Number(b.goodsSale) ? -1 : 1
          );

          this.setState({
            panditJiList: orderedPanditList,
            filteredpanditJiList: orderedPanditList,
            enableLoader: true,
          });
          this.sorPanditji(data.data);
        } else {
          console.log(data.msg);
          if (isSectionChanged) {
            this.setState({
              panditJiList: [],
              filteredpanditJiList: []
            });
          }
          this.setState({ enableLoader: true });
          //props.showPopUpFunc(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ enableLoader: true });
      });
  };

  closePopUp = () => {
    this.setState({
      showPopUp: false,
    });
    if (this.state.msg === "You do not have sufficient balance in your wallet") {
      this.props.history.push({ pathname: FRONTEND_NAME + "/recharge" });
    }

  };

  fetchBookingSlot = () => {
    var headers = getCommonHeaders();
    const selectedDate = new Date().valueOf()

    const query = "?date=" + selectedDate //+ "000";
    this.setState({
      enableCallNowIds: new Set()
    })
    apis
      .fetchUserTimeSlot(headers, query)
      .then((response) => response.data)
      .then((data) => {
        if (data.code == "2000") {
          console.log("dataaaaa", data);
          // this.setState({
          //   bookedPandit: new Set(data.data.map(a => a.panditNumber.toString()))
          // }) 
          data.data.forEach(d => {

            var startTime = new Date(d.startTime);
            var endTime = new Date(d.endTime);
            // alert(startTime);
            const currentTime = new Date().valueOf();
            if (startTime.valueOf() > currentTime && endTime.valueOf() > currentTime) {
              this.setState({
                Isbooked: true
              })
              localStorage.setItem('slotBooked', this.state.Isbooked)

              this.setState({ bookedPandit: new Set(this.state.bookedPandit).add(d.panditNumber.toString()) })
              this.timeOutForEnablingBookedPandit(d.panditNumber.toString(), startTime.valueOf() - currentTime)
            }
            if (startTime.valueOf() > currentTime) {
              this.timeOutForEnablingBookNow(d.panditNumber.toString(), startTime.valueOf() - currentTime)

            }
            else {
              // alert(d.productType + " === " + this.state.selectedSection)
              setTimeout(() => {
                if (endTime.valueOf() > currentTime) {
                  this.setState({
                    Isbooked: false
                  })
                  localStorage.setItem('slotBooked', this.state.Isbooked)
                }
              }, endTime.valueOf() - currentTime)

              if (endTime.valueOf() > currentTime && d.productType === (this.state.selectedSection === "Chat" ? "premiumChat" : "premiumCall")) {
                // alert('how')
                this.setState({
                  enableCallNowIds: new Set(this.state.enableCallNowIds).add(d.panditNumber.toString())
                })
              }
            }

            if (endTime.valueOf() > currentTime) this.timeOutForDisableBookNow(endTime.valueOf() - currentTime)
          })
          // setFetchedSlot(dataToPush)

        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  editSearchTerm = (searchTerm) => {
    let currentList = this.state.panditJiList;
    console.log("currentList", currentList);

    console.log("search Term", searchTerm);
    let filteredList = currentList.filter(
      (item) =>
        item.goodsName.toLowerCase().includes(searchTerm.toLowerCase()) || //Name
        item.goodsLanguage.toLowerCase().includes(searchTerm.toLowerCase()) || //Language
        item.goodsShortDescription
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) //Skill
    );
    console.log("filteredList", filteredList);
    if (filteredList && filteredList.length > 0) {
      this.setState({
        filteredpanditJiList: filteredList,
      });
    }
  };
  editSortTerm = (sortTerm) => {
    console.log("sort by", sortTerm);
    debugger;
    let currentList = this.state.panditJiList;
    let filteredList = [];
    switch (sortTerm) {
      case "expHL":
        filteredList = currentList.sort((a, b) =>
          a.goodsAttribute > b.goodsAttribute ? -1 : 1
        );
        break;
      case "expLH":
        filteredList = currentList.sort((a, b) =>
          a.goodsAttribute > b.goodsAttribute ? 1 : -1
        );
        break;
      case "orderHL":
        filteredList = currentList.sort((a, b) =>
          a.goodsTotalRating > b.goodsTotalRating ? -1 : 1
        );
        break;
      case "orderLH":
        filteredList = currentList.sort((a, b) =>
          a.goodsTotalRating > b.goodsTotalRating ? 1 : -1
        );
        break;
      case "priceHL":
        filteredList = currentList.sort((a, b) =>
          a.goodsPrice > b.goodsPrice ? -1 : 1
        );
        break;
      case "priceLH":
        filteredList = currentList.sort((a, b) =>
          a.goodsPrice > b.goodsPrice ? 1 : -1
        );
        break;
      default:
        filteredList = currentList;
    }
    if (filteredList && filteredList.length > 0) {
      this.setState({
        filteredpanditJiList: filteredList,
      });
    }
  };

  sorPanditji = (panditList) => {
    // console.log("inside sort");
    var list = panditList;
    // console.log("list>>>>>>" + panditList);
    var topList = [];
    var bottomList = [];
    var myLan = this.state.myLanguages ? this.state.myLanguages.split(",") : "";
    // console.log("languages>>" + myLan);
    var i = 0;
    var j = 0;
    if (myLan != null) {
      list.map((data) => {
        var lang = data.goodsLanguage ? data.goodsLanguage.split(",") : "";
        // console.log("lang" + lang);
        for (i = 0; i < lang.length; i++) {
          // console.log("lang>>>>>>" + lang[i]);
          for (j = 0; j < myLan.length; j++) {
            // console.log("myLan lower case>>" + myLan[j].toLowerCase());
            // console.log("lan lower case>>" + lang[i].toLowerCase());
            if (lang[i].toLowerCase() == myLan[j].toLowerCase()) {
              // console.log("matched");
              topList.push(data);
              // console.log("toplist>>>>" + topList);
              break;
            }
          }
          if (j == myLan.length) {
            continue;
          } else {
            break;
          }
        }
        if (i == lang.length) {
          bottomList.push(data);
        }
        // console.log("toplist>>>>" + topList);
        // console.log("bottomList>>>>" + bottomList);
      });
      this.setState({ panditJiList: topList.concat(bottomList) });
    }
  };


  checkBusyPandit = (panditMsisdn) => {
    let url = apiUrls.checkBusyPandit;
    url = url.replace("<panditMsisdn>", Number(panditMsisdn));

    return apis.checkBusyPandit(url).then((response) => {
      var data = response.data;

      console.log(data)

      if (data.code == "2000") {
        let busyData = data.data;
        return busyData;

      }
      else {
        console.log("ERROR", data.msg);
        return new Error("error");
      }
    })
      .catch(er => {
        console.log(er)
        alert(er.toString())
      });
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

  fetchMoreAstrologers = () => {
    var incrementBy = this.state.incrementBy;
    var sliceLength1 = this.state.sliceLength;
    this.setState({ sliceLength: incrementBy + sliceLength1 });
  };

  fetchPanditProfile = (panditData) => {
    let panditMsisdn = panditData.goodsId;
    let panditExp = panditData.goodsAttribute;
    this.props.history.push({
      pathname: FRONTEND_NAME + "/panditProfile",
      state: { panditMsisdn: panditMsisdn, panditExp: panditExp, data: panditData },
    });
  };

  subscribeToPanditJi = (productId) => {
    var headers = getCommonHeaders();

    var requestBody = {
      notificationText: "",
      notificationTitle: "",
      productId: productId,
      productType: "Call",
    };
    apis
      .subscribeToPanditJi(requestBody, headers)
      .then((response) => response.data)
      .then((data) => {
        // console.log("resp data", data);
        if (data.code == "2000") {
          ////debugger;
          {
            // console.log("subscribeToPanditJi" + data.data);
          }
          this.setState({ enableLoader: true });
          this.showPopUp(data.msg, true);
        } else {
          console.log(data.msg);
          this.setState({ enableLoader: false });
          this.showPopUp(data.msg, false);
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ enableLoader: false });
      });
  };

  navigateToBookSlot = (data) => {
    if (!data.sale_end_time || !data.sale_start_time) return;
    this.props.history.push({
      pathname: FRONTEND_NAME + "/bookslot",
      state: {
        panditData: data,
        slotType: this.state.selectedSection === "Chat" ? 'premiumChat' : 'premiumCall'
      }
    })
  }

  initiateRequest = (data) => {
    let status = data.goodsSale;
    console.log("status>>>" + status);
    let busyPandits = this.state.busypanditList;

    if (
      busyPandits &&
      busyPandits.length > 0 &&
      busyPandits.some((ele) => data.goodsId == ele)
    ) {
      // alert("Inside id")
      this.showPopUp(this.props.t("Astrologer is busy right now. Please click bell icon for notification."), false);
      return;
    }


    this.checkBusyPandit(data.goodsId).then(response => {
      let busyStatus = response;
      if (busyStatus.busy) {
        this.showPopUp(this.props.t("Astrologer is busy right now. Please click bell icon for notification."));
        return;
      }

      // if (busyStatus.status == "SUCCESS") {
      //   console.log("status>>>" + status);
      if (this.state.selectedSection === "Chat") {
        if (sessionStorage["chatId"]) {
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
              typeOfService: this.state.selectedSection,
              panditMsisdn: data.goodsId,
              orderDetail: data,
              isPremium: true
            },
          });
        }
      }
      else {
        this.requestCall(data)
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
      subsidizedCampaignId: campaignId
    };
    return apis
      .requestCall(requestBody)
      .then((response) => response.data)
      .then((data) => {
        // console.log("response requestCall", data);
        if (data.code == "2000") {
          this.setState({
            showPopUp: true,
            msg: this.props.t('Call_Req_Submitted'),
            button: "Ok",
          });
        } else {
          this.setState({
            showPopUp: true,
            msg: data.msg,
            button: "Ok",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  showPopUp = (msg, isSuccess) => {
    this.setState({
      showPopUp: true,
      isSuccess: isSuccess,
      msg: msg,
    });
  };

  getUserCurrency = () => {
    var headers = getCommonHeaders();
    headers.msisdn = localStorage['selectedCountryCode'] + localStorage['msisdn'];
    const countryCode = localStorage["selectedCountryCode"] ? localStorage["selectedCountryCode"] : '91';
    apis
      .getCurrency(headers, countryCode)
      .then((response) => response.data)
      .then((data) => {
        if (data.code == '2000') {
          const currencyLogo = data.data.currencyLogo ? data.data.currencyLogo : '₹';
          this.setState({
            currencyLogo: currencyLogo
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  fetchSubsidisedChatList = (Type, isSectionChanged = false) => {

    if (Type === "Chat") {
      this.setState({
        selectedSection: "Chat",
        enableLoader: false
      });
    }
    else {
      this.setState({
        selectedSection: "Call",
        enableLoader: false
      });
    }
    const headers = getCommonHeaders();
    this.setState({ enableLoader: false });
    //let serviceType= "Chat";
    let url = apiUrls.getSubsidizeAstrologerList;
    url = url.replace("<msisdn>", Number(localStorage['selectedCountryCode'] + this.state.userMsisdn));
    url = url.replace("<serviceType>", Type.replace(/['"]+/g, ""));
    apis.getSubsidizeAstrologerList(url, {}, headers)
      .then((response) => response.data)
      .then((data) => {
        this.setState({ enableLoader: true });
        console.log("resp data", data);
        if (data.code === 2000) {

          let panditList = data.data;

          //  ones with sequence no lower & non zero have a higher priority 
          let orderedPanditList = panditList.sort((a, b) =>
            Number(a.sequence) && Number(b.sequence) && Number(a.sequence) < Number(b.sequence) ? -1 : 1
          );

          //goodsSale= 1 for online/busy users,so they are placed first 
          orderedPanditList = orderedPanditList.sort((a, b) =>
            Number(a.goodsSale) > Number(b.goodsSale) ? -1 : 1
          );

          this.setState({
            panditJiList: orderedPanditList,
            filteredpanditJiList: orderedPanditList,
            //enableLoader: true,
          });
          this.fetchBusyPandits()
          this.sorPanditji(data.data);
        }
        else {
          if (isSectionChanged) {
            this.setState({
              panditJiList: [],
              filteredpanditJiList: []
            });
          }
          this.setState({ enableLoader: true });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ enableLoader: true });
      });

  }

  getUserProfileDetails = () => {
    // var url = Constant.ASTRO_URL + Constant.GET_USER_PROFILE_DETAILS + "/91" + this.state.userName;
    var url = Constant.ASTRO_URL + Constant.GET_USER_PROFILE_DETAILS;
    const headers = getCommonHeaders();
    headers.msisdn = localStorage['selectedCountryCode'] + localStorage['msisdn'];
    // alert(JSON.stringify(headers));
    getApi(url, headers)
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        if (data && data.code == SUCCESS_CODE) {
          // alert(JSON.stringify(data.data));
          localStorage["profileData"] = JSON.stringify(
            data.data.profileDataList
          );
        }
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  doNothing = () => { };
  render() {

    const { t } = this.props;
    const { busypanditList } = this.state;

    let inputStyle = {
      backgroundColor: "#9A9A9A",
      disabled: true,
    };

    let inputStyle2 = {
      top: "388px",
      left: "573px",
      width: "72px",
      height: "23px",
      background: "#418F21 0% 0% no-repeat padding-box",
      borderRadius: "12px",
      opacity: "1",
      paddingRight: "5px",
      paddingLeft: "5px",
    };

    let inputStyle3 = {
      top: "388px",
      left: "573px",
      width: "84px",
      height: "23px",
      background: "lightgray",
      borderRadius: "12px",
      opacity: "1",
      paddingRight: "5px",
      paddingLeft: "5px",
    };

    let inputStyle4 = {
      backgroundColor: "green",
      disabled: false,
    };

    let inputStyleOfline = {
      color: "#9A9A9A",
      disabled: true,
    };

    let inputStyleOnline2 = {
      color: "green",
      disabled: false,
    };

    let inputStyleBusybtn = {
      backgroundColor: "red",
      color: '#fff',
      disabled: false,
    };

    let inputStyleBusy = {
      color: "red",
      disabled: false,
    };

    // change code below this line
    const char = 15;

    // console.log("Call Now ", this.state.enableCallNowIds);
    // console.log("bookedPandit", this.state.bookedPandit)
    var titleKey = this.state.selectedSection === "Chat" ? `${t('Chat_')} ${t('Astrologer_')}` : `${t('Call_')} ${t('Astrologer_')}`
    return (
      <>
        <Header2
          IsActive_header_Or_not="chat_and_talk_header-"
          countryCode={[]} />
        <Chat_Talk_Header
          IsNavIconTrue={false}
          IsSearchTrue={true}
          IsFilterTrue={true}
          editSearchTerm={this.editSearchTerm}
          editSortTerm={this.editSortTerm}
          IsMob_Side_Nave={this.IsMob_Side_Nave}
          propsData={this.props}
          IsTitleTrue={true}
          CustomClass={false}
          title={titleKey}

        />
        {/* <BottomHeader /> */}
        <div className="container">
          {/* <div className="row"></div> */}
          {/* <HeaderMenu /> */}
          <PageHeader
            Mob_HeaderIsTrue={'not_show_mob_header1'}
            name={{ firstname: this.state.selectedSection === "Chat" ? t('Chat with Astrologer') : t('Call with Astrologer'), lastname: "" }}
            editSearchTerm={this.editSearchTerm}
            editSortTerm={this.editSortTerm}
            showSortOptions={true}
            selectedSection={this.state.selectedSection}
            fetchPanditList={this.fetchPanditList}

          />

          {this.state.displaySignupPopUp && (
            <Signup
              openLoginPopup={this.openLoginPopup}
              openSignupPopup={this.openSignupPopup}
              closePopUp={this.closeSignUpPopup}
              closeOnLogin={this.closePopupOnLogin}
              isLogin={this.state.loginSelected}
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
          {this.state.enableLoader ? null : <Loading />}
          <>

            <div className="page-body" style={{ marginBottom: "50px" }}>
              <div className="row">
                <div className="col-md-3 mobsidemenu">
                  <SideMenu />
                </div>

                <div className="astrologer_list_container">
                  <div className="astrologer_list_inner_container d-flex justify-content-start">
                    {this.state.filteredpanditJiList &&
                      this.state.filteredpanditJiList.length > 0 &&
                      this.state.filteredpanditJiList
                        .slice(0, this.state.sliceLength)
                        .map((data, index) => {
                          return <div className="astrologer_list_card pd-10">
                            <div className="astrologer_list_personal_details d-flex justify-content-between">
                              <div className="astrologer_list_img"
                                onClick={() => this.fetchPanditProfile(data)}
                              >
                                <div className="astrologer_avater">
                                  <div className="astrologer_avater_wrapper">
                                    <img src={data.goodsImage ? data.goodsImage : user} width="100%" alt="img" />
                                  </div>
                                  <img src={tick} className="verified_tik" alt="img"></img>
                                </div>
                                <div className="astrology_rating mt-2">
                                  <StarRatings
                                    rating={Number(data.goodsAvgRating) != null
                                      ? Number(data.goodsAvgRating)
                                      : 0
                                    }
                                    starRatedColor="#FF9C05"
                                    starEmptyColor="#707070"
                                    starDimension="10px"
                                    starSpacing="1px"
                                    name="rating"
                                  />
                                </div>
                              </div>

                              <div className="astrologer_personal_details"
                                onClick={() => this.fetchPanditProfile(data)}
                              >
                                <div className="astrologer_heading">
                                  <h6> {localStorage['selectedLanguage'] === 'hi' ? data.goods_name_hindi : data.goodsName}</h6>
                                </div>
                                <div className="astrologer_desc">
                                  <p className="desc">
                                    {
                                      localStorage['selectedLanguage'] === 'hi' ?
                                        data.goodsShortDescriptionHindi :
                                        data.goodsShortDescription
                                    }
                                  </p>
                                </div>
                                <div className="astrologer_language">
                                  <p className="eng">
                                    {data.goodsLanguage}
                                  </p>
                                </div>
                                <div className="astrologer_exp">
                                  <p className="exp">
                                    {t('Exp')} <span>{data.goodsAttribute} {t('Years')}</span>
                                  </p>
                                  {

                                    <>

                                      {data.sale_end_time && data.sale_start_time ? this.state.Isbooked ? <p className="slot_card"><span>{'slot is booked'}</span></p> : null : null}
                                    </>
                                  }
                                </div>
                              </div>

                              <div className="notification_btn">
                                {!(this.state.enableCallNowIds.has(data.goodsId)) &&
                                  <>
                                    <img
                                    alt="notify"
                                      src={bell}
                                      className="bell_img"
                                      onClick={() =>
                                        this.subscribeToPanditJi(data.goodsId)
                                      }
                                    />
                                  </>
                                }

                              </div>

                            </div>
                            <div className="astrologer_list_action_group d-flex align-items-center justify-content-between">
                              <div className="astrologer_user_count">
                                <span>
                                  <img src={star} alt="*" width="10px"></img>
                                </span>
                                <span className="total">
                                  {data.goodsTotalRating != null
                                    ? data.goodsTotalRating
                                    : 0}{" "}
                                  {t('Total')}
                                </span>
                              </div>

                              <div className="astrologer_rate_card">
                                <p>{`${this.state.currencyLogo}${data.goodsPrice}`}/{t('mins')}</p>
                              </div>

                              <div className="Action_btn_group">
                                <div className="time1">
                                  {(this.state.enableCallNowIds.has(data.goodsId)) &&
                                    <>
                                      <button
                                        className="call"
                                        onClick={this.state.isUserLoggedIn
                                          //? () => this.navigateToBookSlot(data)
                                          ? () => this.initiateRequest(data)
                                          : () => this.openLoginPopup()
                                        }
                                        style={
                                          inputStyle2
                                        }
                                        disabled={data.goodsSale === 0}
                                      >
                                        {t(this.state.selectedSection === "Call" ? "Call" : "Chat") + t(" now")}
                                      </button>
                                    </>
                                  }
                                  {(!this.state.enableCallNowIds.has(data.goodsId)) &&
                                    <button
                                      className={data.sale_end_time && data.sale_start_time ? "call" : "no-slot"}
                                      onClick={this.state.isUserLoggedIn
                                        ? () => {
                                          if (localStorage["userBalance"] < (data.goodsPrice * 15)) {
                                            this.showPopUp("You do not have sufficient balance in your wallet", false)
                                          } else this.navigateToBookSlot(data)
                                        }
                                        //? () => this.initiateRequest(data)
                                        : () => this.openLoginPopup()
                                      }
                                      style={
                                        data.sale_end_time && data.sale_start_time ? inputStyle2 : inputStyle3
                                      }
                                      disabled={data.goodsSale === 0}
                                    >
                                      {data.sale_end_time && data.sale_start_time ? t("Book_Slot_") : t("No Slot For ")} {" " + t(this.state.selectedSection === "Call" ? "Call" : "Chat")}
                                    </button>
                                  }

                                </div>
                              </div>

                            </div>
                          </div>
                        })}
                  </div>
                  <div className="View_more_astrologer_list d-flex align-items-center justify-content-center">
                    {this.state.filteredpanditJiList &&
                      this.state.filteredpanditJiList.length > 12 &&
                      <button
                        className="loadMore"
                        onClick={() => this.fetchMoreAstrologers()}
                      >
                        {t('View_More')}
                      </button>
                    }
                  </div>

                </div>
                {/* <div className="col-md-9 mobChatlist">
                  <div className="row">
                    <div className="col-md-12 col-lg-12 col-sm-12 padd-0 clickptr">
                      {this.state.enableLoader && (
                        !this.state.filteredpanditJiList ||
                        this.state.filteredpanditJiList.length === 0) &&
                        <div style={{ marginBottom: '-24px' }}>{t('No Astrologer Found')}!!</div>
                      }
                      {this.state.filteredpanditJiList &&
                        this.state.filteredpanditJiList.length > 0 &&
                        this.state.filteredpanditJiList
                          .slice(0, this.state.sliceLength)
                          .map((data, index) => (
                            <div className="col-sm-4 col-md-6 col-lg-4 float-left border-t">
                              <div className="col-sm-4 col-md-4 col-lg-4 float-left padd-0 user-div"
                                onClick={() => this.fetchPanditProfile(data)}
                              >
                                <img src={data.goodsImage ? data.goodsImage : user} className="user-img" />
                                <br />
                                <img src={tick} className="tick-img"></img>
                                <p className="star-p">
                                  <StarRatings
                                    rating={Number(data.goodsAvgRating) != null
                                      ? Number(data.goodsAvgRating)
                                      : 0
                                    }
                                    starRatedColor="#FF9C05"
                                    starEmptyColor="#707070"
                                    starDimension="10px"
                                    starSpacing="1px"
                                    name="rating"
                                  />
                                </p>
                                <p>
                                  <span>
                                    <img src={star} alt="/" width="9px"></img>
                                  </span>
                                  <span className="total">
                                    {data.goodsTotalRating != null
                                      ? data.goodsTotalRating
                                      : 0}{" "}
                                    {t('Total')}
                                  </span>
                                </p>
                              </div>

                              <div className="col-sm-8 col-md-8 col-lg-8 float-right padd-0 wdd">
                                <div className="row-n">
                                  <div
                                    className="float-left padd-0 chat-name"
                                    style={{ float: "left" }}
                                    onClick={() => this.fetchPanditProfile(data)}
                                  >
                                    {data.goodsName}
                                  </div>
                                  <div className="float-right padd-0 text-ryt">
                                    <img
                                      src={bell}
                                      className="bell-img"

                                      onClick={() =>
                                        this.subscribeToPanditJi(data.goodsId)
                                      }
                                    ></img>
                                  </div>
                                </div>
                                {this.state.bookedPandit.has(data.goodsId) && <p
                                  className="vedic"
                                  style={{ color: '#FF9C05' }}
                                >
                                  Your slot is booked for astrologer.
                                </p>}
                                <p
                                  className="vedic"
                                  onClick={() => this.fetchPanditProfile(data)}
                                >
                                  {data.goodsShortDescription}
                                </p>
                                <p
                                  className="eng"
                                  onClick={() => this.fetchPanditProfile(data)}
                                >
                                  {data.goodsLanguage}
                                </p>
                                <p
                                  className="exp"
                                  onClick={() => this.fetchPanditProfile(data)}
                                >
                                  {t('Exp')} <span>{data.goodsAttribute} {t('Years')}</span>
                                </p>
                                <div className="row-nn">
                                  <div className="time">
                                    <span style={{ marginRight: '5px' }}>{`${this.state.currencyLogo}${data.goodsPrice}`}/{t('mins')} </span>
                                    {(this.state.enableCallNowIds.has(data.goodsId)) &&
                                      <>
                                        <button
                                          className="call"
                                          onClick={this.state.isUserLoggedIn
                                            //? () => this.navigateToBookSlot(data)
                                            ? () => this.initiateRequest(data)
                                            : () => this.openLoginPopup()
                                          }
                                          style={
                                            inputStyle2
                                          }
                                          disabled={data.goodsSale === 0}
                                        >
                                          {t(this.state.selectedSection === "Call" ? "Call" : "Chat") + t(" now")}
                                        </button>
                                      </>
                                    }
                                    {(!this.state.enableCallNowIds.has(data.goodsId)) &&
                                      <button
                                        className={data.sale_end_time && data.sale_start_time ? "call" : "no-slot"}
                                        onClick={this.state.isUserLoggedIn
                                          ? () => this.navigateToBookSlot(data)
                                          //? () => this.initiateRequest(data)
                                          : () => this.openLoginPopup()
                                        }
                                        style={
                                          data.sale_end_time && data.sale_start_time ? inputStyle2 : inputStyle3
                                        }
                                        disabled={data.goodsSale === 0}
                                      >
                                        {data.sale_end_time && data.sale_start_time ? t("Book_Slot_") : t("No Slot For ")} {" " + t(this.state.selectedSection === "Call" ? "Call" : "Chat")}
                                      </button>
                                    }
                                    {/* <button
                                      className="call"
                                      onClick={this.state.isUserLoggedIn 
                                        ? () => this.navigateToBookSlot(data)
                                        //? () => this.initiateRequest(data)
                                        : () => this.openLoginPopup()
                                      }
                                      style={
                                          inputStyle2
                                      }
                                      disabled={data.goodsSale === 0}
                                    >
                                      { t("Book_Slot_") } {" " + t(this.state.selectedSection === "Call" ? "Call" : "Chat")}
                                    </button> *
                                    <br />
                                    {console.log(
                                      this.state.busypanditList.some(
                                        (item) => data.goodsId === item
                                      )
                                    )}
                                    {console.log(
                                      "panditilist>>>>>>>" +
                                      this.state.busypanditList
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                    </div>
                  </div>
                  {this.state.filteredpanditJiList &&
                    this.state.filteredpanditJiList.length > 12 &&
                    <div className="row">
                      <div className="col-md-12">
                        <div style={{ margin: "0px auto" }}>
                          <button
                            className="loadMore"
                            onClick={() => this.fetchMoreAstrologers()}
                          >
                            {t('View_More')}
                          </button>
                        </div>
                      </div>
                    </div>
                  }
                  <div className="roww">
                    <div className="col-md-12">
                      
                    </div>
                  </div>
                </div> */}

                <div className="col-md-12 desk_top">
                  {/* <div className="premiumSection mb-5">
                    <button className={this.state.selectedSection === "Call" ? "premiumButton mr-2 isActive" : "premiumButton mr-2"} onClick={this.fetchSubsidisedChatList.bind(this, "Call", true)}>{t('Call')}</button>
                    <button className={this.state.selectedSection === "Chat" ? "premiumButton mr-2 isActive" : "premiumButton mr-2"} onClick={this.fetchSubsidisedChatList.bind(this, "Chat", true)}>{t('Chat')}</button>
                  </div> */}

                  <div className="premiumSection">
                    <button className={this.state.selectedSection === "Chat" ? "premiumButton mr-2 isActive" : "premiumButton mr-2"} onClick={() => this.fetchPanditList(window.location.href === (HTTP1 + FRONTEND_NAME + '/premium') ? "premiumChat" : 'Chat')}>{t('Chat')}</button>
                    <button className={this.state.selectedSection === "Call" ? "premiumButton mr-2 isActive" : "premiumButton mr-2"} onClick={() => this.fetchPanditList(window.location.href === (HTTP1 + FRONTEND_NAME + '/premium') ? "premiumCall" : 'Call')}>{t('Call')}</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
        <Footer history={this.props} />
      </>
    );
  }
}

const withCombine = compose(
  withRouter,
  withTranslation()
)

export default withCombine(Premium);
