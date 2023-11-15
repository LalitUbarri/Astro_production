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
import Header2 from "../common/Header2";
// import HeaderMenu from "../common/HeaderMenu";
import PageHeader from "../common/PageHeader";
import Footer from "../common/Footer";
import SideMenu from "../common/SideMenu";
import { getCommonHeaders } from "../configuration/commonFunctions";
import apis from "../configuration/apis";
import StarRatings from "react-star-ratings";
import { FRONTEND_NAME } from "../configuration/constants";
import Popup from "../components/popup";
import Loading from "./loader";
import apiUrls from "../configuration/apiUrls";
// import BottomHeader from "../common/BottomHeader";
import { withTranslation } from 'react-i18next';
import { compose } from 'redux'
import Signup from "../components/signup";
import Chat_Talk_Header from "../common/Chat&Talk_Header";
import BottomHeader from "../common/BottomHeader";

import InfiniteScroll from "react-infinite-scroll-component";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: Array.from({ length: 20 }),
      typeOfService: "Chat",
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
      userProfile: localStorage["userProfile"]
        ? JSON.parse(localStorage["userProfile"])
        : {},
      userMsisdn: localStorage["msisdn"] ? localStorage["msisdn"] : "",
      enableLoader: false,
      isFreeSession: this.props.location.state.freeSession ? this.props.location.state.freeSession : false,
      currencyLogo: '',
      isUserLoggedIn: localStorage["msisdn"] ? true : false,
      countryCode: [],
      displaySignupPopUp: false,
      mobSideNaveTrue: false,
      
    };
  }

  componentDidMount() {
    // alert(this.state.items)
    if (this.state.isFreeSession)

      this.fetchSubsidisedChatList();
    else
      this.fetchPanditList();

    this.fetchBusyPandits();
    this.getUserCurrency();
    this.fetchcountryCode();
  }

  fetchSubsidisedChatList = () => {
    var headers = getCommonHeaders();
    this.setState({ enableLoader: false });

    let serviceType = "Chat";
    let url = apiUrls.getSubsidizeAstrologerList;
    url = url.replace("<msisdn>", Number(this.state.userMsisdn));
    url = url.replace("<serviceType>", serviceType.replace(/['"]+/g, ""));
    apis.getSubsidizeAstrologerList(url, {}, headers)
      .then((response) => response.data)
      .then((data) => {
        this.setState({ enableLoader: true });
        console.log("resp data", data);
        if (data.code == "2000") {

          let panditList = data.data;


          //  ones with sequence no lower & non zero have a higher priority 
          let orderedPanditList = panditList.sort((a, b) =>
            Number(a.sequence) && Number(b.sequence) && Number(a.sequence) < Number(b.sequence) ? -1 : 1
          );

          //goodsSale= 1 for online/busy users,so they are placed first 
          orderedPanditList = orderedPanditList.sort((a, b) =>
            Number(a.goodsSale) > Number(b.goodsSale) ? -1 : 1
          );
          let afterOps = [
            ...panditList.filter(
            ({goodsId, goodsSale}) => {
              console.log('Checking for ', goodsId, ' in ', this.state.busypanditList);
              return !this.state.busypanditList.includes(goodsId) && goodsSale === 1
            }
            ),
            ...panditList.filter(({goodsId}) => this.state.busypanditList.includes(goodsId)),
            ...panditList.filter(({goodsSale, goodsId}) => goodsSale === 0 && !this.state.busypanditList.includes(goodsId))
          ]

          this.setState({
            panditJiList: afterOps,
            filteredpanditJiList: afterOps
          });
          this.sorPanditji(data.data);
        }
        else {
          console.log(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ enableLoader: true });
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


  fetchPanditList = () => {
    var headers = getCommonHeaders();
    // headers.msisdn = this.state.userProfile.getItem("msisdn");

    var requestBody = {
      redeemCategory: this.state.typeOfService,
      redemptionType: "WHITE",
    };
    apis
      .panditJilist(requestBody, headers)
      .then((response) => response.data)
      .then((data) => {
        // console.log("resp data", data);
        if (data.code == "2000") {
          // debugger;
          {
            // console.log("fetchPanditList" + data.data);
          }

          let panditList = data.data;


          //  ones with sequence no lower & non zero have a higher priority 
          let orderedPanditList = panditList.sort((a, b) =>
            Number(a.sequence) && Number(b.sequence) && Number(a.sequence) < Number(b.sequence) ? -1 : 1
          );

          //goodsSale= 1 for online/busy users,so they are placed first 
          orderedPanditList = orderedPanditList.sort((a, b) =>
            Number(a.goodsSale) > Number(b.goodsSale) ? -1 : 1
          );

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
          //   filteredpanditJiList: orderedPanditList
          // });
          this.setState({ enableLoader: true });
          this.sorPanditji(data.data);
        } else {
          /*else if(data.code == "2009")
          {
            localStorage.clear();
            sessionStorage.clear();
            this.setState({enableLoader:false});
            this.setState({
              showPopUp: true,
              msg: 'Session logout ! Please login again. ',
              button: 'Ok'
            });
            
            //this.props.history.push({pathname:FRONTEND_NAME+"/home"})
          }*/
          console.log(data.msg);
          this.setState({ enableLoader: false });
          //props.showPopUpFunc(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ enableLoader: false });
      });
  };

  showPopUp = (msg, isSuccess) => {
    this.setState({
      showPopUp: true,
      isSuccess: isSuccess,
      msg: msg,
    });
  };
  closePopUp = () => {
    if (this.state.Isnavigate) {
      this.props.history.push({ pathname: FRONTEND_NAME + "/recharge" });
      this.setState({
        showPopUp: false,
      });
    } else {
      this.setState({
        showPopUp: false,
      });
    }



  };

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
    // console.log("sort by", sortTerm);
    // debugger;
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

    // console.log("languages>>" + myLan);
    var i = 0;
    var j = 0;
    if (this.state.myLanguages != null) {
      var myLan = this.state.myLanguages.split(",");
      list.map((data) => {
        var lang = data.goodsLanguage.split(",");
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
      this.setState({
        panditJiList: topList.concat(bottomList),
        filteredpanditJiList: topList.concat(bottomList),
      });
    }
  };

  editFilterastrologer = (value) => {
    let currentList = this.state.panditJiList;
    let filteredList = currentList.filter(
      (item) =>  item.goodsShortDescription.toLowerCase().includes(value.toLowerCase())
    );
    // console.log("filteredList", filteredList);
    if (filteredList && filteredList.length > 0) {
      this.setState({
        filteredpanditJiList: filteredList,
      });
    }
  }

  fetchBusyPandits = () => {
    var headers = getCommonHeaders();

    apis
      .fetchBusyPandits(headers)
      .then((response) => response.data)
      .then((data) => {
        // console.log("resp data", data);
        if (data.code == "2000") {
          // debugger;
          {
            // console.log("busypanditList" + data.data);
          }

          this.setState({
            busypanditList: data.data,
          });
          this.setState({ enableLoader: true });
        } else {
          /*else if(data.code == "2009")
          {
            localStorage.clear();
            sessionStorage.clear();
            this.setState({enableLoader:false});
            this.setState({
              showPopUp: true,
              msg: 'Session logout ! Please login again. ',
              button: 'Ok'
            });
          }*/
          console.log(data.msg);
          this.setState({ enableLoader: true });
          //props.showPopUpFunc(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ enableLoader: true });
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
    const panditName = panditData.goodsName;
    this.props.history.push({
      pathname: FRONTEND_NAME + "/panditProfile",
      state: { panditMsisdn: panditMsisdn, panditExp: panditExp, panditName: panditName, data: panditData },
    });
  };

  subscribeToPanditJi = (productId) => {
    var headers = getCommonHeaders();

    var requestBody = {
      notificationText: "",
      notificationTitle: "",
      productId: productId,
      productType: "Chat",
    };
    apis
      .subscribeToPanditJi(requestBody, headers)
      .then((response) => response.data)
      .then((data) => {
        // console.log("resp data", data);
        if (data.code == "2000") {
          //debugger;
          {
            // console.log("subscribeToPanditJi" + data.data);
          }
          this.setState({ enableLoader: true });
          this.showPopUp(data.msg, true);
        } else {
          /* else if(data.code == "2009")
            {
              localStorage.clear();
            sessionStorage.clear();
            this.setState({enableLoader:false});
            this.setState({
              showPopUp: true,
              msg: 'Session logout ! Please login again. ',
              button: 'Ok'
            });
            }*/
          console.log(data.msg);
          this.setState({ enableLoader: false });
          this.showPopUp(data.msg, false);
          //props.showPopUpFunc(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ enableLoader: false });
      });
  };

  initiateRequest = (data) => {
    let status = data.goodsSale;
    // console.log("status>>>" + status);
    let busyPandits = this.state.busypanditList;

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
        // console.log("status>>>" + status);
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
          this.props.history.push({
            pathname: FRONTEND_NAME + "/chat",
            state: {
              panditMsisdn: data.goodsId,

            },
          });

          // alert(JSON.stringify(this.props))
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

  IsMob_Side_Nave = (e) => {
    this.setState({
      ...this.state,
      mobSideNaveTrue: e
    })
  }

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

  // fetchMoreData = () => {
  //   // a fake async api call like which sends
  //   // 20 more records in 1.5 secs
  //   setTimeout(() => {
      
  //   }, 1500);
  // };

  
  render() {
    const { t } = this.props;
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

    // console.log("panditJilist set", this.state.panditJilist);
    var titleKey = `${t('Chat_')} ${t('Astrologer_')}`
    return (
      <>
        <Chat_Talk_Header
          IsNavIconTrue={false}
          IsSearchTrue={true}
          IsFilterTrue={true}
          editSearchTerm={this.editSearchTerm}
          editSortTerm={this.editSortTerm}
          IsMob_Side_Nave={this.IsMob_Side_Nave}
          propsData={this.props}
          IsTitleTrue={true}
          title={titleKey}


        />
        <Header2
          IsActive_header_Or_not="chat_and_talk_header-"
        />
        {/* <div className="desk_top">
          <BottomHeader />
        </div> */}
        {/* <BottomHeader /> */}
        {Object.keys(this.state.filteredpanditJiList).length !== 0 ? <div className="container">
          <PageHeader
            Mob_HeaderIsTrue={'not_show_mob_header1'}
            // name={{ firstname: "Chat with", lastname: "Astrology" }}
            name={{ firstname: t('Chat_'), lastname: t('Astrologer') }}
            editSearchTerm={this.editSearchTerm}
            editSortTerm={this.editSortTerm}
            editFilterastrologer = {this.editFilterastrologer}
            showSortOptions={true}
          />

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


          


          {this.state.enableLoader ? null : <Loading />}
          <div className="page-body">


            <div className="row">

              {/* <div className="mt-05 pd-10 mob_head_nav">
                <span>
                  <span className="span">{t('Chat_')} </span>
                  {t('Astrologer_')} </span>
              </div> */}

              <div className={this.state.mobSideNaveTrue ? "col-md-3 mobsidemenu mob_Side_Nave" : 'col-md-3 mobsidemenu'}>
                <SideMenu />
              </div>
              
              
              <div className="astrologer_list_container">
                <InfiniteScroll
                dataLength={this.state.sliceLength}
                next={this.fetchMoreAstrologers}
                hasMore={this.state.filteredpanditJiList.length < this.state.sliceLength ? false:true}
                loader={<h4>Loading...</h4>}
              >
                
                  <div className="astrologer_list_inner_container d-flex justify-content-start">
              {this.state.filteredpanditJiList
                .slice(0, this.state.sliceLength)
                .map((data, index) => {
               return (
                <div className="astrologer_list_card pd-10">
                <div className="astrologer_list_personal_details d-flex justify-content-between">
                  <div className="astrologer_list_img"
                    onClick={() => this.fetchPanditProfile(data)}
                  >
                    <div className="astrologer_avater">
                      <div className="astrologer_avater_wrapper">
                        <img src={data.goodsImage ? data.goodsImage : user} width="100%" />
                      </div>
                      <img src={tick} className="verified_tik" alt="verified"></img>
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

                  {
                    this.state.busypanditList.some(
                      (item) => data.goodsId === item) ?
                      <div className="notification_btn">
                        <img
                          src={bell}
                          alt="notify"
                          className="bell_img"
                          onClick={() =>
                            this.subscribeToPanditJi(data.goodsId)
                          }
                        />
                      </div> : data.goodsSale == 0 ? <div className="notification_btn">
                        <img
                          src={bell}
                          className="bell_img"
                          alt="notify"
                          onClick={() =>
                            this.subscribeToPanditJi(data.goodsId)
                          }
                        />
                      </div>
                        : <div className="notification_btn"></div>
                  }
                </div>
                <div className="astrologer_list_action_group d-flex align-items-center justify-content-between">
                  <div className="astrologer_user_count">
                    <span>
                      <img src={star} alt="img" width="10px"></img>
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
                      {t(this.state.typeOfService)}
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
              )})}
              </div>
              
            </InfiniteScroll>
            </div>
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
          </div>
        </div> : <Loading />}

        <Footer history={this.props} />
      </>
    );
  }
}

const withCombine = compose(
  withRouter,
  withTranslation()
)
export default withCombine(Chat);
