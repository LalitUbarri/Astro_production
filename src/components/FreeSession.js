import React from "react";
import { withRouter } from "react-router-dom";
import '../styles/talk.css';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "jquery/dist/jquery.min";
import user from "../images/user.png";
import star from "../images/grey.svg";
import bell from "../images/bell.svg";
import tick from "../images/tick.svg";
import "../styles/about.css";
// import HeaderUser from "../common/HeaderUser";
import PageHeader from "../common/PageHeader";
import Footer from "../common/Footer";
import SideMenu from "../common/SideMenu";
import { getCommonHeaders } from "../configuration/commonFunctions";
import apis from "../configuration/apis";
import StarRatings from "react-star-ratings";
import { FRONTEND_NAME } from "../configuration/constants";
import Popup from "../components/popup";
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
import BottomHeader from "../common/BottomHeader";
import Banner from '../images/newImages/Consult.png';
import InfiniteScroll from "react-infinite-scroll-component";

class FreeSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typeOfService: (props.location.state && props.location.state.selectedPage === "premiumCall") ? "Call" : "Call",
      userMsisdn: localStorage["msisdn"],
      panditJiList: [],
      filteredpanditJiList: [],
      busypanditList:[],
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
      userMsisdn: localStorage['msisdn'] && localStorage["msisdn"].length === 10 ? `91${localStorage["msisdn"]}` : localStorage["msisdn"],
      enableLoader: false,
      isUserLoggedIn: localStorage["msisdn"] ? true : false,
      isChatActive: false,
      IspanditBusy: false,
      displaySignupPopUp: false,
      loginSelected: true,
      selectedSection: (props.location.state && props.location.state.selectedPage === "premiumCall") ? "Call" : "Call"
    };
  }

  
  // componentWillUpdate(){
  //   this.fetchSubsidisedChatList('Call')
  //   this.fetchBusyPandits();
  // }
  componentDidMount() {
    window.scrollTo(0, 0);
    //this.fetchPanditList(this.props.location.state && this.props.location.state.selectedPage ? this.props.location.state.selectedPage : "premiumChat");
    this.fetchSubsidisedChatList('Call')
    this.fetchBusyPandits();
    //  this.fetchBookingSlot();
    const headers = getCommonHeaders();
    var Url = Constant.ASTRO_URL + "/FlexPlatform/getServiceVal";
    const requestBody = {
      service_type: "callchat"
    }
    // console.log("lalit11" + JSON.stringify(requestBody));
    postApi(Url, headers, requestBody)
      .then((response) => response.data)
      .then((data) => {
        // console.log("getServiceVal :" + JSON.stringify(data.data[0].service_val));
        this.setState({
          service_Val: data.data[0].service_val
        })
      }).catch(err => {
        console.log(err);
      })
  }
  
  closePopUp = () => {
    this.setState({
      showPopUp: false,
    });
    
    // this.props.history.push({pathname:FRONTEND_NAME+"/home"});
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
    let serviceType= "call";
    let url = apiUrls.getSubsidizeAstrologerList;
    url = url.replace("<msisdn>", Number(localStorage['selectedCountryCode'] + this.state.userMsisdn));
    url = url.replace("<serviceType>", Type.replace(/['"]+/g, ""));
    apis.getSubsidizeAstrologerList(url, {}, headers)
      .then((response) => response.data)
      .then((data) => {
        this.setState({ enableLoader: true });
        // console.log(data.data);
        if (data.code === 2000) {

          let panditList = data.data;
          let afterOps = [
            ...panditList.filter(
            ({goodsId, goodsSale}) => {
              // console.log('Checking for ', goodsId, ' in ', this.state.busypanditList);
              return !this.state.busypanditList.includes(goodsId) && goodsSale === 1
            }
            ),
            ...panditList.filter(({goodsId}) => this.state.busypanditList.includes(goodsId)),
            ...panditList.filter(({goodsSale, goodsId}) => goodsSale === 0 && !this.state.busypanditList.includes(goodsId))
          ]

          this.setState({
            panditJiList: afterOps,
            filteredpanditJiList: afterOps,
            enableLoader: true,
          });

          // this.setState({
          //   panditJiList: orderedPanditList,
          //   filteredpanditJiList: orderedPanditList,
          //   //enableLoader: true,
          // });
          this.sorPanditji(data.data);
          this.fetchBusyPandits();
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

  


  editSearchTerm = (searchTerm) => {
    let currentList = this.state.panditJiList;
    // console.log("currentList", currentList);

    // console.log("search Term", searchTerm);
    let filteredList = currentList.filter(
      (item) =>
        item.goodsName.toLowerCase().includes(searchTerm.toLowerCase()) || //Name
        item.goodsLanguage.toLowerCase().includes(searchTerm.toLowerCase()) || //Language
        item.goodsShortDescription
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) //Skill
    );
    // console.log("filteredList", filteredList);
    if (filteredList && filteredList.length > 0) {
      this.setState({
        filteredpanditJiList: filteredList,
      });
    }
  };

  editSortTerm = (sortTerm) => {
    // console.log("sort by", sortTerm);
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

      // console.log(data)

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
    setTimeout(() => {
      var incrementBy = this.state.incrementBy;
      var sliceLength1 = this.state.sliceLength;
      this.setState({ sliceLength: incrementBy + sliceLength1 });
        }, 1000);
  };

  fetchPanditProfile = (panditData) => {
    let panditMsisdn = panditData.goodsId;
    let panditExp = panditData.goodsAttribute;
    this.props.history.push({
      pathname: FRONTEND_NAME + "/panditProfile",
      state: { panditMsisdn: panditMsisdn, panditExp: panditExp, data: panditData },
    });
  };

   fetchBusyPandits = () => {
    var headers = getCommonHeaders();

    apis
      .fetchBusyPandits(headers)
      .then((response) => response.data)
      .then((data) => {
        // console.log("resp data", data);
        if (data.code == "2000") {
          //debugger;
          {
            // console.log("busypanditList" + data.data);
          }

          this.setState({
            busypanditList: data.data,
          });
          this.setState({ enableLoader: true });
        } else {
          /* else if(data.code == "2009")
         {
           localStorage.clear();
           sessionStorage.clear();
           this.setState({
             showPopUp: true,
             msg: 'Session logout ! Please login again. ',
             button: 'Ok'
           });
           this.setState({enableLoader : false});
         }*/
          // console.log(data.msg);
          this.setState({ enableLoader: true });
          //props.showPopUpFunc(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ enableLoader: true });
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
          this.setState({ ...this.state, IspanditBusy: true })
          this.setState({ enableLoader: true });
          this.showPopUp(data.msg, true);
        } else {
          // console.log(data.msg);
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
    let busyPandits = this.state.busypanditList;

    if (
      busyPandits &&
      busyPandits.includes(data.goodsId)
    ) {
      this.setState({ ...this.state, IspanditBusy: true });
      this.showPopUp("Astrologer is busy right now. Please click bell icon for notification.", false);
      return;
    }


    this.checkBusyPandit(data.goodsId).then(response => {
      let busyStatus = response;
      if (busyStatus.busy) {
        this.setState({ ...this.state, IspanditBusy: true })
        this.showPopUp("Astrologer is busy right now. Please click bell icon for notification.");
        return;
      }
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
    // console.log(campaignId);
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

  render() {
    const { t } = this.props;
    // let inputStyle = {
    //   backgroundColor: "#9A9A9A",
    //   disabled: true,
    // };

    let inputStyle3 = {
      backgroundColor: "red",
      disabled: true,
      top: "388px",
      left: "573px",
      width: "55px",
      height: "23px",
      borderRadius: "12px",
      opacity: "1",
      color: '#fff',
      fontSize: '10px'

    };

    // let inputStyle2 = {

    //   background: "#418F21 0% 0% no-repeat padding-box",

    //   // paddingRight: "5px",
    //   // paddingLeft: "5px",
    // };

    // let inputStyleBusybtn = {
    //   top: "388px",
    //   left: "573px",
    //   width: "57px",
    //   height: "23px",
    //   backgroundColor: "red",
    //   borderRadius: "12px",
    //   opacity: "1",
    //   color: '#fff',
    //   disabled: false,
    // };
    let inputStyle = {
      backgroundColor: "#9A9A9A",
      disabled: true,
    };

    let inputStyle2 = {
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

    return (
      <>
        {/* <Chat_Talk_Header
          IsNavIconTrue={false}
          IsSearchTrue={false}
          IsFilterTrue={false}
          // editSearchTerm={this.editSearchTerm}
          // editSortTerm={this.editSortTerm}
          // IsMob_Side_Nave={this.IsMob_Side_Nave}
          propsData={this.props}
          IsTitleTrue={true}
          title={"Freesession"}
        /> */}
        <Header2 />
        <div className="container">

          <PageHeader
            // Mob_HeaderIsTrue={'not_show_mob_header1'}
            name={{ firstname: this.state.selectedSection === "Chat" ? t('Chat with Astrologer') : t('Call with Astrologer'), lastname: "" }}
            editSearchTerm={this.editSearchTerm}
            editSortTerm={this.editSortTerm}
            showSortOptions={true}
            selectedSection={this.state.selectedSection}
            fetchPanditList={this.fetchSubsidisedChatList}
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
              Isicon={true}
              alert_panditMsg={this.state.IspanditBusy ? "pandit busy" : ''}
            />
          ) : null}
          {this.state.enableLoader ? null : <Loading />}
          <>

            <div className="page-body" style={{ marginBottom: "50px" }}>
              <div className="row">
                <div className={this.state.mobSideNaveTrue ? "col-md-3 mobsidemenu mob_Side_Nave" : 'col-md-3 mobsidemenu'}>
                  <SideMenu />
                </div>

                <div className="freesession_astrologer_list_contailer">
                  <div className="astrologer_list_container11">
                    
                      <InfiniteScroll
                      dataLength={this.state.sliceLength}
                      next={this.fetchMoreAstrologers}
                      hasMore={this.state.filteredpanditJiList.length < this.state.sliceLength ? false:true}
                      loader={<h4>Loading...</h4>}>
                        <div className="astrologer_list_inner_container d-flex">
                      <div className="freesession_banner_container mb-3 desk_top">
                        <img src={Banner} alt="banner" width="100%" />
                      </div>
                        {this.state.filteredpanditJiList &&
                        this.state.filteredpanditJiList.length > 0 &&
                        this.state.filteredpanditJiList
                          .slice(0, this.state.sliceLength)
                          .map((data, index) => {
                            return <div className="astrologer_list_card freesession_card pd-10">
                              <div className="astrologer_list_personal_details d-flex justify-content-between">
                                <div className="astrologer_list_img"
                                  onClick={() => this.fetchPanditProfile(data)}
                                >
                                  <div className="astrologer_avater">
                                    <div className="astrologer_avater_wrapper">
                                      <img src={data.goodsImage ? data.goodsImage : user} alt="pandit" width="100%" />
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
                                  </div>
                                </div>

                                <div className="notification_btn">
                                  <img
                                  alt="notify"
                                    src={bell}
                                    className="bell_img"
                                    onClick={() =>
                                      this.subscribeToPanditJi(data.goodsId)
                                    }
                                  />
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

                                {/* <div className="astrologer_rate_card">
                                  <p>{`${this.state.currencyLogo}${data.goodsPrice}`}/{t('mins')}</p>
                                </div> */}

                                <div className="Action_btn_group">
                                  {/* {this.statebusypanditList.some((item) => data.goodsId === item) ?
                                    <button
                                      className="call_btn"
                                      disabled={data.goodsSale === 1 ? false : true}
                                      onClick={this.state.isUserLoggedIn
                                        ? () => this.initiateRequest(data)
                                        : () => this.openLoginPopup()
                                      }
                                      style={data.goodsSale === 1 ? inputStyle2 : inputStyle}
                                    // disabled={data.goodsId === 0}
                                    >
                                      {t(this.state.selectedSection === "Call" ? "Call" : "Chat")}
                                    </button> :

                                    <button
                                      onClick={() => this.initiateRequest(data)}
                                      style={data.goodsSale !== 1 ? inputStyleBusybtn : inputStyle3}
                                      className="busy_btn"
                                    // disabled={true}
                                    >
                                      {t("Busy")}
                                    </button>
                                  } */}

                                  <button
                                  className="call_btn"
                                  onClick={this.state.isUserLoggedIn
                                    ? () => this.initiateRequest(data)
                                    : () => this.openLoginPopup()
                                  }
                                  style={
                                    this.state.busypanditList.some(
                                      (item) => data.goodsId === item) ?
                                      inputStyleBusybtn : data.goodsSale === 0 ? inputStyle
                                        : inputStyle2
                                  }
                                  disabled={data.goodsSale === 0}
                                >
                                   {t(this.state.selectedSection === "Call" ? "Call" : "Chat")}
                                </button>

                                <button className="busy_btn"
                                  style={
                                    this.state.busypanditList.some(
                                      (item) => data.goodsId === item) ?
                                      inputStyleBusy : data.goodsSale === 0 ? inputStyleOfline
                                        : inputStyleOnline2
                                  }
                                >
                                  {
                                    this.state.busypanditList.some(
                                      (item) => data.goodsId === item) ?
                                      t("Busy") : data.goodsSale == 0 ? t("Offline")
                                        : t("Online")
                                  }
                                </button>
                                </div>
                              </div>
                            </div>
                          })}
                          </div>
                    </InfiniteScroll>
                      
                    </div>
                  </div>
                  {this.state.enableLoader && (
                    !this.state.filteredpanditJiList ||
                    this.state.filteredpanditJiList.length === 0) &&
                    <div className="No_astrologer_found">{t('No Astrologer Found')}!!</div>
                  }
                    {/* <div className="View_more_astrologer_list d-flex align-items-center justify-content-center mb-5">
                  {this.state.filteredpanditJiList &&
                    this.state.filteredpanditJiList.length > 12 &&
                    <button
                      className="loadMore"
                      onClick={() => this.fetchMoreAstrologers()}
                    >
                      {t('View_More')}
                    </button>
                  }
                </div> */}
                </div>
              

                <div>
                </div>
              </div>
            
            <div className="col-md-12 desk_top">
              <div className="premiumSection mb-5">
                <button className={this.state.selectedSection === "Call" ? "premiumButton mr-2 isActive" : "premiumButton mr-2"} onClick={() => this.fetchSubsidisedChatList("Call", true)}>{t('Call')}</button>
                <button className={this.state.selectedSection === "Chat" ? "premiumButton mr-2 isActive" : "premiumButton mr-2"} onClick={() => this.fetchSubsidisedChatList("Chat", true)}>{t('Chat')}</button>
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

export default withCombine(FreeSession);
