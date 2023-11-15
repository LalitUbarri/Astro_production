import React from "react";
// import Header from "../common/Header";
// import HeaderMenu from "../common/HeaderMenu";
import PageHeader from "../common/PageHeader";
import SideMenu from "../common/SideMenu";
import Footer from "../common/Footer";
import { withRouter } from "react-router-dom";
import "../styles/profile.css";
import User from "../images/user.svg";
import Header2 from "../common/Header2";
import Popup from "../components/popup";
import Group3068 from "../images/Group 3068.svg";
// import Path8508 from "../images/Path 8508.svg";
import usericon from "../images/user-icon.svg";
import Group2842 from "../images/Group 2842.svg";
import Group2843 from "../images/Group 2843.svg";
import Group2844 from "../images/Group 2844.svg";
// import Path8512 from "../images/Path 8512.svg";
import apiUrls from "../configuration/apiUrls";
import apis from "../configuration/apis";
import StarRatingComponent from "react-star-rating-component";
import Moment from "react-moment";
// import BottomHeader from '../common/BottomHeader'
import { withTranslation } from 'react-i18next';
import { compose } from 'redux'
import { getCommonHeaders } from "../configuration/commonFunctions";
// import { FRONTEND_NAME } from "../configuration/constants";
import Loading from "./loader";
import Chat_Talk_Header from "../common/Chat&Talk_Header";
import BottomHeader from "../common/BottomHeader";
import BottomHeaderProfile from "../common/BottomHeaderProfile";
import {FRONTEND_NAME} from '../configuration/constants'
class PanditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typeOfService: "Chat",
      redeemCategory: this.props.location.state
        ? this.props.location.state.panditMsisdn
        : "",
      panditExp: this.props.location.state
        ? this.props.location.state.panditExp
        : "",
      busypanditList:[],
      basicChat: {},
      showPopUp:false,
      basicReport: {},
      basicCall: {},
      goodsShortDescArr: [],
      panditProfile:[],
      name: "",
      msg: "",
      button: "Ok",
      totalCall: 0,
      totalChat: 0,
      totalReport: 0,
      reviewRatingArr: [],
      totalReviews: "",
      avgRating: 0,
      rating5: 0,
      rating4: 0,
      rating3: 0,
      rating2: 0,
      rating1: 0,
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 0,
      countryCode: [],
      chatRate: '',
      callRate: '',
      IspanditBusy: false,
      reportRate: '',
      premiumCallRate: '',
      premiumChatRate: '',
      displaySignupPopUp: false,
      loginSelected: true,
      isHeaderOpen: false
    };
  }

  async componentDidMount() {
    this.getBasicDetails();
    this.getTotalReportDetails();
    this.getAstrologerReviewRating();
    this.fetchcountryCode();
    this.fetchBusyPandits();
    // alert(JSON.stringify(this.props.location.state.data.goodsSale))
  }

  getAstrologerReviewRating() {
    let url = apiUrls.astrologerReviewRating;
    let body = {
      value: this.state.redeemCategory,
    };

    return apis.astrologerReviewRating(url, body)
    .then((response) => {
      var data = response.data;

      if (data.code == 2000) {
        this.setState({
          reviewRatingArr: data.data,
          totalReviews: data.data.length,
        });
      } else {
        console.log("ERROR", data.msg);
      }
      this.calcAvgRating(this.state.reviewRatingArr, this.state.totalReviews);
      this.separateRating(this.state.reviewRatingArr, this.state.totalReviews);
    });
  }
  separateRating = (arr, total) => {
    let five = 0;
    let four = 0;
    let three = 0;
    let two = 0;
    let one = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].rating === 5) {
        five += 1;
      } else if (arr[i].rating === 4) {
        four += 1;
      } else if (arr[i].rating === 3) {
        three += 1;
      } else if (arr[i].rating === 2) {
        two += 1;
      } else if (arr[i].rating === 1) {
        one += 1;
      }
    }
    this.setState({
      rating5: (five / total) * 100,
      rating4: (four / total) * 100,
      rating3: (three / total) * 100,
      rating2: (two / total) * 100,
      rating1: (one / total) * 100,
      five,
      four,
      three,
      two,
      one,
    });
  };
  getTotalReportDetails = () => {
    let url = apiUrls.totalReportDetails;
    let body = { titleKey: this.state.redeemCategory, titleType: "WHITE" };

    return apis.totalReportDetails(url, body).then((response) => {
      var data = response.data;

      if (data.code === 2000) {
        for (let i = 0; i < data.data.length; i++) {
          if (data.data[i].category.toLowerCase() === "chat") {
            this.setState({
              totalChat: data.data[i].total,
            });
          } else if (data.data[i].category.toLowerCase() === "call") {
            this.setState({
              totalCall: data.data[i].total,
            });
          } else if (data.data[i].category.toLowerCase() === "report") {
            this.setState({
              totalReport: data.data[i].total,
            });
          }
        }
      } else {
        console.log("ERROR", data.msg);
      }
    });
  };
  getBasicDetails = () => {
    let url = apiUrls.basicAstrologerDetails;

    let body = {
      redeemCategory: this.state.redeemCategory,
      redemptionType: "WHITE",
    };
    return apis.basicAstrologerDetails(url, body).then((response) => {
      var data = response.data;
      

      if (data.code == 2000) {
          this.setState({
            ...this.state,
            panditProfile:data
          });
        for (let i = 0; i < data.data.length; i++) {
          if (data.data[i].goodsCategory.toLowerCase() === "chat") {
            // alert(JSON.stringify(data.data[i]))
            this.setState({
              basicChat: data.data[i],
              chatRate: localStorage["selectedCountryCode"] && localStorage["selectedCountryCode"] !== '91' ? data.data[i].goodsPriceUSD : data.data[i].goodsPrice
            });
          } else if (data.data[i].goodsCategory.toLowerCase() === "call") {
            this.setState({
              basicCall: data.data[i],
              callRate: localStorage["selectedCountryCode"] && localStorage["selectedCountryCode"] !== '91' ? data.data[i].goodsPriceUSD : data.data[i].goodsPrice
            });
          } else if (data.data[i].goodsCategory.toLowerCase() === "report") {
            this.setState({
              basicReport: data.data[i],
              reportRate: localStorage["selectedCountryCode"] && localStorage["selectedCountryCode"] !== '91' ? data.data[i].goodsPriceUSD : data.data[i].goodsPrice
            });
          }
        }

        this.setState({
          goodsShortDescArr: localStorage['selectedLanguage'] === 'hi' ? data.data[0].goodsShortDescriptionhindi.split(",") :data.data[0].goodsShortDescription.split(","),
          name: localStorage['selectedLanguage'] === 'hi' ?data.data[0].goodsNameHindi : data.data[0].goodsBrief.split("$$")[0],
        });
      } else {
        console.log("ERROR", data.msg);
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

  changeIsHeaderOpen = (headerOpen) => {
    this.setState({
      isHeaderOpen: headerOpen
    })
  }

  openLoginPopup = () => {
    this.setState({
      displaySignupPopUp: true,
      loginSelected: true,
    });
  };


  calcAvgRating = (reviewRatingArr, totalReviews) => {
    let sum = 0;
    for (let i = 0; i < reviewRatingArr.length; i++) {
      sum += reviewRatingArr[i].rating;
    }
    let avg = sum / totalReviews;
    this.setState({
      avgRating: avg,
    });
  };

  fetchBusyPandits = () => {
    var headers = getCommonHeaders();

    apis
      .fetchBusyPandits(headers)
      .then((response) => response.data)
      .then((data) => {
        console.log("resp data", data);
        if (data.code == "2000") {
          //debugger;
          {
            console.log("busypanditList" + data.data);
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


  initiateRequest = (data, btnType) => {
  
    let busyPandits = this.state.busypanditList;
    if (
      busyPandits &&
      busyPandits.length > 0 &&
      busyPandits.some((ele) => data.goodsId == ele)
    ) {
      this.setState({ ...this.state, IspanditBusy: true })
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
        }else if(btnType === 'chat'){
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
                typeOfService: this.state.typeOfService,
                panditMsisdn: data.goodsId,
                orderDetail: data,
              },
            });
          }
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
      userNumber: localStorage['selectedCountryCode']+localStorage["msisdn"],
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
  
  showPopUp = (msg, isSuccess) => {
    this.setState({
      showPopUp: true,
      isSuccess: isSuccess,
      msg: this.props.t(msg),
    });
  };
  
  render() {
    const {t}= this.props;
    const {
      redeemCategory,
      basicChat,
      basicReport,
      basicCall,
      goodsShortDescArr,
      name,
      totalCall,
      totalChat,
      totalReport,
      reviewRatingArr,
      totalReviews,
      avgRating,
    } = this.state;
    var titleKey = `${name + " " +t('Profile_')}`
    const { busypanditList } = this.state;
    let inputStyle = {
      backgroundColor: "#9A9A9A",
      disabled: true,
    };

    let inputStyle2 = {
      backgroundColor: "green",
      color:'#fff',
      disabled: false,
    };

    let inputStyleBusybtn = {
      backgroundColor: "red",
      color: '#fff',
      disabled: false,
    };
    
   
    return (
      <>
      <Chat_Talk_Header
        IsNavIconTrue={false}
        IsSearchTrue={false}
        IsFilterTrue={false}
        // editSearchTerm={this.editSearchTerm}
        // editSortTerm={this.editSortTerm}
        // IsMob_Side_Nave={this.IsMob_Side_Nave}
        propsData={this.props}
        CustomClass={true}
        IsTitleTrue={true}
        title={titleKey}
      />
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
        <Header2
        IsActive_header_Or_not="chat_and_talk_header-"
          openLoginPopup={this.openLoginPopup}
          openSignupPopup={this.openSignupPopup}
          isLogin={this.state.loginSelected}
          countryCode={this.state.countryCode}
          changeIsHeaderOpen={this.changeIsHeaderOpen}
        />
          {/* <BottomHeaderProfile data={this.state.panditProfile} /> */}

        {/* <BottomHeader /> */}
        {/* <div className="container">
          
          </div> */}
          {Object.keys(this.state.panditProfile).length === 0 ? <Loading />: <div className="pandit_profile_container1 container contect-icon-row">
          
          {/* <HeaderMenu /> */}
          <PageHeader Mob_HeaderIsTrue={'not_show_mob_header1'} name={{ firstname: this.props.location.state.panditName, lastname: ``}} />
          
          <div className="page-body">
            <div className="d-flex">
              <div className="col-md-3 mobsidemenu">
                  <SideMenu />
              </div>
              <div className="pandit_profile_container">
                <div className="pandit_profile_inner_container d-flex">
                  <div className="pandit_profile_image">
                    <div className="profile_container_img">
                      <div className="user_image">
                        <img width="100%" src={basicChat.goodsImage ? basicChat.goodsImage : User} alt="img"/>
                      </div>
                      <img className="vrified_pandit" src={Group3068} alt="img"/>
                    </div>
                    <div className="pandit_rating mt-4">
                      <StarRatingComponent
                        name="rate"
                        value={avgRating}
                        starCount="5"
                        className="star-rating"
                        starColor="#FF9C05"
                        emptyStarColor="#828282"
                      />
                    </div>
                    <div className="user_count">
                        <span>
                          <img src={usericon} alt="user" /> &nbsp; {totalReviews} {t('Total')}
                        </span>
                    </div>
                  </div>
                  <div className="pandit_profile_details">
                    <div className="pandit_profile_personal_details text-left">
                        <div className="pandit_profile_headeing">
                          <h3 className="username"> {name} </h3>
                        </div>
                        <div className="pandit_profile_descroption">
                          {goodsShortDescArr &&
                            goodsShortDescArr.map((item, index) => (
                          <p className="short_desc" key={index}>
                              {item},
                          </p>
                          ))}
                        </div>
                        <div className="pandit_prifile_language">
                          <p className="language">{basicChat.language}</p>
                        </div>
                        <div className="pandit_profile_exp">
                          <p className="language">
                            Exp:{" "}{this.state.panditExp} Years
                          </p>
                        </div>
                    </div>
                    <div className="pandit_profile_chat_and_talk_and_report_card d-flex align-items-center mt-5">
                    {this.state.chatRate !== '' ? <div className="call_card d-flex align-items-center">
                        <div className="call_img_card">
                          <img className="contect-icon" src={Group2844} alt="call"/>
                        </div>
                        <div className="call_details_cart">
                          <p className="contect-p1">
                            <span className="contect-p1-count">
                              {totalChat}
                            </span>{" "}
                            {t('mins')}
                          </p>
                          <p className="contect-p2">
                            {localStorage["currency"]}  
                            {this.state.chatRate}/{t('mins')}
                          </p>
                        </div>
                      </div> : null }

                      {this.state.callRate !== '' ? <div className="call_card d-flex align-items-center">
                        <div className="call_img_card">
                          <img className="contect-icon" src={Group2843} alt="call"/>
                        </div>
                        <div className="call_details_cart">
                          <p className="contect-p1">
                            <span className="contect-p1-count">
                              {totalCall}
                            </span>{" "}
                            {t('mins')}
                          </p>
                          <p className="contect-p2">
                            {localStorage["currency"]}  
                            {this.state.callRate}/{t('mins')}
                          </p>
                        </div>
                      </div>:null }

                      {this.state.reportRate !== '' ? <div className="call_card d-flex align-items-center">
                        <div className="call_img_card">
                          <img className="contect-icon" src={Group2842} alt="call" />
                        </div>
                        <div className="call_details_cart">
                          <p className="contect-p1">
                            <span className="contect-p1-count">
                              {totalReport}
                            </span>{" "}
                            {t('report')}
                          </p>
                          <p className="contect-p2">
                            {localStorage["currency"]}  
                            {this.state.reportRate}/{t('report')}
                          </p>
                        </div>
                      </div> :null }
                    </div>
                  </div>

                  <div className="pandit_profile_about_section text-left mt-5">
                  <div className="AboutUser">
                    <h3 className="about-us-title">{t('About_us')}</h3>
                    <p className="about-us-details">
                    {localStorage['selectedLanguage'] === 'hi' ? basicChat.goodsDescriptionhindi : basicChat.goodsDescription}
                    </p>
                  </div>
                </div>
                </div>

                
                <div className="pandit_profile_review text-left mt-5">
                <div className="ReviewHead text-left">
                      <h3 className="about-us-title">{t('Review')}</h3>
                    </div>
                    <div className="userReview text-left">
                    {reviewRatingArr.length > 0 &&
                    reviewRatingArr.map((item, index) => (
                      <div className="row rating-date-row" key={index}>
                          <div className="col-12 col-md-12 d-flex_J">
                            <div className="h-iconq userIcon d-flex align-items-center">
                              <div className="Icon_U">
                                {item.reviewerName[0]}
                              </div>
                              <div className="Rating_U">
                              <strong className="reviewer_name">{(item.reviewerName)}</strong>
                                <StarRatingComponent
                                  name="rate"
                                  value={item.rating}
                                  starCount="5"
                                  className="star-rating"
                                  starColor="#FF9C05"
                                  emptyStarColor="#828282"
                                />
                              </div>
                            </div>
                            <div className="reviewDate">
                                <span className="date">
                                <Moment format="DD MMM YYYY">
                                  {item.updateTimestamp}
                                </Moment>
                              </span>
                            </div>
                          </div>
                          <div className="col-md-12 mt-3 reviewD">
                            <p className="details">{item.review}</p>
                          </div>
                        
                      </div>
                    ))}
                    </div>          
                </div>

              </div>
              {/* <div className="col-md-9 mobChatlist">
                <div className="row">
                  <div className="col-md-2 col-5 mob_profile">
                    <div className="pic">
                      <img
                        className="user-profile-pic"
                        src={basicChat.goodsImage ? basicChat.goodsImage : User}
                      />
                      <img className="right-tik" src={Group3068}></img>
                    </div>
                    <div className="profile-rating">
                      <StarRatingComponent
                        name="rate"
                        value={avgRating}
                        starCount="5"
                        className="star-rating"
                        starColor="#FF9C05"
                        emptyStarColor="#828282"
                      />
                    </div>
                    <div className="user11">
                      <p className="total">
                        <span>
                          <img src={usericon} /> &nbsp;
                        </span>
                        {totalReviews} {t('Total')}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-10 text-left mob_profile1">
                    <div className="profileUser">
                        <p className="username">{name}</p>

                        {goodsShortDescArr &&
                        goodsShortDescArr.map((item, index) => (
                          <p className="" key={index}>
                            <a href="#" className="btn">
                              {item}
                            </a>
                          </p>
                        ))}
                      <p className="language">{basicChat.language}</p>
                      <p className="language">
                        Exp:{" "}
                        <span className="exp">
                          {this.state.panditExp} Years
                        </span>
                      </p>
                    </div>
                    <div className="row mt-4">
                    {this.state.chatRate !== '' ? <div className="icons_Details col-sm-4">
                          <img className="contect-icon" src={Group2844} />
                          <div className="userCharges">
                              <p className="contect-p1">
                                <span className="contect-p1-count">
                                  {totalChat}
                                </span>{" "}
                                {t('mins')}
                              </p>
                               <p className="contect-p2">{localStorage["currency"]}  {this.state.chatRate}/{t('mins')}</p>
                          </div>
                      </div> : <></>
                      }
                      {this.state.callRate !== '' ? <div className="icons_Details col-sm-4">
                        <img className="contect-icon" src={Group2843} />
                          <div className="userCharges">
                            <p className="contect-p1">
                              <span className="contect-p1-count">
                                {totalCall}
                              </span>{" "}
                              {t('mins')}
                            </p>
                            <p className="contect-p2">{localStorage["currency"]} { this.state.callRate }/{t('mins')}</p>
                          </div>
                      </div> : <></>
                      } 
                      {this.state.reportRate !== '' ? <div className="icons_Details col-sm-4">
                        <img className="contect-icon" src={Group2842} />
                          <div className="userCharges">
                            <p className="contect-p1">
                              <span className="contect-p1-count">
                                {totalReport}
                              </span>{" "}
                                {t('reports')}
                            </p>
                            <p className="contect-p2">{localStorage["currency"]}  { this.state.reportRate}/{t('report')}</p>
                          </div> 
                      </div> : <></>
                     }
                    </div>
                  </div>
                  <div className="col-md-12 text-left mt-5">
                    <div className="AboutUser">
                      <h3 className="about-us-title">{t('About_us')}</h3>
                      <p className="about-us-details">
                      {localStorage['selectedLanguage'] === 'hi' ? basicChat.goodsDescriptionhindi : basicChat.goodsDescription}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="ReviewHead text-left">
                      <h3 className="about-us-title">{t('Review')}</h3>
                    </div>
                    <div className="userReview text-left">
                    {reviewRatingArr.length > 0 &&
                    reviewRatingArr.map((item, index) => (
                      <div className="row rating-date-row" key={index}>
                          <div className="col-12 col-md-12 d-flex_J">
                            <div className="h-iconq userIcon d-flex_A">
                              <div className="Icon_U">
                                {item.reviewerName[0]}
                              </div>
                              <div className="Rating_U">
                                <StarRatingComponent
                                  name="rate"
                                  value={item.rating}
                                  starCount="5"
                                  className="star-rating"
                                  starColor="#FF9C05"
                                  emptyStarColor="#828282"
                                />
                              </div>
                            </div>
                            <div className="reviewDate">
                                <span className="date">
                                <Moment format="DD MMM YYYY">
                                  {item.updateTimestamp}
                                </Moment>
                              </span>
                            </div>
                          </div>
                          <div className="col-md-12 mt-3 reviewD">
                            <p className="details">{item.review}</p>
                          </div>
                        
                      </div>
                    ))}
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            
            {/* <div className="col profile-body">
              <div className="row profile-details-border">
                <div className="col profile-pic">
                  
                  
                  
                </div>
                <div className="col profile-details">
                  <div className="row">
                    
                    <div className="col-12">
                      <div className="row contect-icon-row">
                        <div className="col">
                          <div className="row">
                            <div className="col contect p-0">
                              
                            </div>
                            
                          </div>
                        </div>

                        <div className="col">
                          <div className="row">
                            <div className="col contect p-0">
                              
                            </div>
                            <div className="col">
                              
                            </div>
                          </div>
                        </div>

                        <div className="col">
                          <div className="row">
                            <div className="col contect p-0">
                              
                            </div>
                            <div className="col">
                              
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row profile-details-border">
                <div className="col">
                  
                  
                </div>
              </div>
              {/*
              <div className="row profile-details-border">
                <div className="col">
                  <p className="about-us-title">Reviews</p>
                  <div className="row">
                    <div className="col reviews-left">
                      <p className="rating-count">{avgRating}</p>
                      <div className="profile-rating">
                        <StarRatingComponent
                          name="rate"
                          value={avgRating}
                          starCount="5"
                          className="star-rating"
                          starColor="#FF9C05"
                          emptyStarColor="#828282"
                        />
                      </div>
                      <p className="total">
                        <span>
                          <img src={usericon} />
                        </span>
                        {totalReviews} total
                      </p>
                    </div>
                    <div className="col reviews-right">
                      <div className="row">
                        <div className="col-1 p-0 text-center">5</div>
                        <div className="col-10 p-1 text-center">
                          <div className="progress">
                            <div
                              className="progress-bar progress-bar-1"
                              id="progress5"
                              style={{ width: `${this.state.rating5}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="col-1 p-0 text-center">
                          {this.state.five}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-1 p-0 text-center">4</div>
                        <div className="col-10 p-1 text-center">
                          <div className="progress">
                            <div
                              className="progress-bar"
                              id="progress4"
                              style={{ width: `${this.state.rating4}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="col-1 p-0 text-center">
                          {this.state.four}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-1 p-0 text-center">3</div>
                        <div className="col-10 p-1 text-center">
                          <div className="progress">
                            <div
                              className="progress-bar"
                              id="progress3"
                              style={{ width: `${this.state.rating3}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="col-1 p-0 text-center">
                          {this.state.three}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-1 p-0 text-center">2</div>
                        <div className="col-10 p-1 text-center">
                          <div className="progress">
                            <div
                              className="progress-bar"
                              id="progress2"
                              style={{ width: `${this.state.rating4}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="col-1 p-0 text-center">
                          {this.state.two}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-1 p-0 text-center">1</div>
                        <div className="col-10 p-1 text-center">
                          <div className="progress">
                            <div
                              className="progress-bar"
                              id="progress1"
                              style={{ width: `${this.state.rating1}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="col-1 p-0 text-center">
                          {this.state.one}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rating-date">
                
                  
                
              </div>
            </div> */}

                <div className="col-12 col-md-12 Review_head desk_top">
                  <div className="premiumSection">
                    <button className={"premiumButton mr-2"}
                      style={
                        this.state.busypanditList.some(
                          (item) => this.props.location.state.data.goodsId === item) ?
                          inputStyleBusybtn : this.props.location.state.data.goodsSale === 0 ? inputStyle
                            : inputStyle2
                      }
                    onClick={() => this.initiateRequest(this.props.location.state.data,'call')}>
                      {
                        this.state.busypanditList.some(
                          (item) => this.props.location.state.data.goodsId === item) ?
                          t("Busy") : this.props.location.state.data.goodsSale === 0 ? t("Offline")
                            : t("Call")
                      }
                      
                      </button>
                    <button className={"premiumButton mr-2"}
                    style={
                      this.state.busypanditList.some(
                        (item) => this.props.location.state.data.goodsId === item) ?
                        inputStyleBusybtn : this.props.location.state.data.goodsSale === 0 ? inputStyle
                          : inputStyle2
                    }
                    onClick={() => this.initiateRequest(this.props.location.state.data,'chat')}>
                      {
                        this.state.busypanditList.some(
                          (item) => this.props.location.state.data.goodsId === item) ?
                          t("Busy") : this.props.location.state.data.goodsSale === 0 ? t("Offline")
                            : t("Chat")
                      }
                      </button>
                  </div>
                </div>
          </div>
        </div>}
        
        <div style={{ position: "absolute", left: "0px", right: "0px" }}>
          <Footer history={this.props}/>
        </div>
      </>
    );
  }
}

const withCombine=compose(
  withRouter,
  withTranslation()
) 

export default withCombine(PanditProfile);
