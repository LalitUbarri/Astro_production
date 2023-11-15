import React from "react";
import { withRouter } from "react-router-dom";
import '../styles/talk.css'
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "jquery/dist/jquery.min";
import user from "../images/user.svg";
import star from "../images/grey.svg";
// import bell from "../images/bell.svg";
import tick from "../images/tick.svg";
import "../styles/about.css";
// import HeaderUser from "../common/HeaderUser";
// import HeaderMenu from "../common/HeaderMenu";
import PageHeader from "../common/PageHeader";
import Footer from "../common/Footer";
import SideMenu from "../common/SideMenu";
import { getCommonHeaders } from "../configuration/commonFunctions";
import apis, { postApi } from "../configuration/apis";
import StarRatings from "react-star-ratings";
import { FRONTEND_NAME } from "../configuration/constants";
import Popup from "./popupChat";
import Loading from "./loader";
import Header from "../common/Header2";
// import BottomHeader from "../common/BottomHeader";
import { withTranslation } from 'react-i18next';
import { compose } from 'redux'
import Signup from "../components/signup";
import Chat_Talk_Header from "../common/Chat&Talk_Header";
import apiUrls from "../configuration/apiUrls";
import InfiniteScroll from "react-infinite-scroll-component";

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typeOfService: "Report",
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
      userProfile: localStorage["userProfile"]
        ? JSON.parse(localStorage["userProfile"])
        : {},
      enableLoader: false,
      currencyLogo: '',
      isUserLoggedIn: localStorage["msisdn"] ? true : false,
      countryCode: [],
      displaySignupPopUp: false
    };
  }
  componentDidUpdate() { }
  componentDidMount() {
    this.fetchPanditList();
    //this.fetchBusyPandits();
    this.getUserCurrency();
    this.fetchcountryCode();
  }

  fetchPanditList = () => {
    var headers = getCommonHeaders();
    // headers.msisdn = this.state.userProfile.getItem("msisdn");
    console.log("user Profile>>>>>>>>" + this.state.userProfile);
    // headers.accessToken = this.state.userProfile.accessToken;
    headers.msisdn = localStorage['selectedCountryCode'] + localStorage["msisdn"];
    console.log("msisdn>>>>>>" + headers.msisdn);
    console.log("accessToken>>>>>>" + headers.accessToken);

    var requestBody = {
      redeemCategory: this.state.typeOfService,
      redemptionType: "WHITE",
    };
    apis
      .panditJilist(requestBody, headers)
      .then((response) => response.data)
      .then((data) => {
        console.log("resp data", data);
        if (data.code == "2000") {
          let panditList = data.data;
          let orderedPanditList = panditList.sort((a, b) =>
            Number(a.sequence) > Number(b.sequence) ? -1 : 1
          );
          this.setState({
            panditJiList: orderedPanditList,
            filteredpanditJiList: orderedPanditList,
            enableLoader: true,
          });
          this.sorPanditji(data.data);
        } else if (data.code == "2009") {
          localStorage.clear();
          sessionStorage.clear();
          this.setState({ enableLoader: false });
          this.setState({
            showPopUp: true,
            msg: "Session logout ! Please login again. ",
            button: "Ok",
          });
          //this.props.history.push({pathname:FRONTEND_NAME+"/home"})
        } else {
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
    console.log("inside sort");
    var list = panditList;
    console.log("list>>>>>>" + panditList);
    var topList = [];
    var bottomList = [];
    var myLan = this.state.myLanguages ? this.state.myLanguages.split(",") : "";
    console.log("languages>>" + myLan);
    var i = 0;
    var j = 0;
    if (myLan != null) {
      list.map((data) => {
        var lang = data.goodsLanguage ? data.goodsLanguage.split(",") : "";
        console.log("lang" + lang);
        for (i = 0; i < lang.length; i++) {
          console.log("lang>>>>>>" + lang[i]);
          for (j = 0; j < myLan.length; j++) {
            console.log("myLan lower case>>" + myLan[j].toLowerCase());
            console.log("lan lower case>>" + lang[i].toLowerCase());
            if (lang[i].toLowerCase() == myLan[j].toLowerCase()) {
              console.log("matched");
              topList.push(data);
              console.log("toplist>>>>" + topList);
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
        console.log("toplist>>>>" + topList);
        console.log("bottomList>>>>" + bottomList);
      });
      this.setState({ panditJiList: topList.concat(bottomList) });
    }
  };

  fetchBusyPandits = () => {
    var headers = getCommonHeaders();
    console.log("user Profile>>>>>>>>" + this.state.userProfile);
    headers.accessToken = this.state.userProfile["accessToken"];
    headers.msisdn = localStorage['selectedCountryCode'] + localStorage["msisdn"];
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
        } else if (data.code == "2009") {
          localStorage.clear();
          sessionStorage.clear();
          this.setState({ enableLoader: false });
          this.setState({
            showPopUp: true,
            msg: "Session logout ! Please login again. ",
            button: "Ok",
          });
        } else {
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
    const panditName = panditData.goodsName
    this.props.history.push({
      pathname: FRONTEND_NAME + "/panditProfile",
      state: { panditMsisdn: panditMsisdn, panditExp: panditExp, panditName: panditName, data: panditData },
    });
  };

  subscribeToPanditJi = (productId) => {
    var headers = getCommonHeaders();
    console.log("user Profile>>>>>>>>" + this.state.userProfile);
    headers.accessToken = this.state.userProfile["accessToken"];
    headers.msisdn = localStorage['selectedCountryCode'] + localStorage["msisdn"];
    var requestBody = {
      notificationText: "",
      notificationTitle: "",
      productId: productId,
      productType: "Report",
    };
    apis
      .subscribeToPanditJi(requestBody, headers)
      .then((response) => response.data)
      .then((data) => {
        console.log("resp data", data);
        if (data.code == "2000") {
          ////debugger;
          {
            console.log("subscribeToPanditJi" + data.data);
          }

          this.setState({ enableLoader: true });
          this.showPopUp(data.msg, true);
        } else if (data.code == "2009") {
          localStorage.clear();
          sessionStorage.clear();
          this.setState({ enableLoader: false });
          this.setState({
            showPopUp: true,
            msg: "Session logout ! Please login again. ",
            button: "Ok",
          });
        } else {
          console.log(data.msg);
          this.setState({ enableLoader: false });
          this.showPopUp(data.msg, true);
          //props.showPopUpFunc(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ enableLoader: false });
      });
  };

  checkPendingReport = (orderData) => {
    // var url = apiUrls.productBillingDetails;
    // var headers = getCommonHeaders();
    // headers.msisdn = localStorage['selectedCountryCode'] + localStorage["msisdn"];
    // var body = {
    //   searchKey: 'Report'
    // }
    // postApi(url, body, headers).then(res => {
    //   console.log(res.data.code);
    //   if (res.data.code !== 5000) {
    //     console.log(res);

    //   } else {
    //     this.showPopUp("you already have a report in the queue, so can't request a new report. please try again once the previous request is completed.", true);
    //   }
    // }).catch(err => {
    //   console.log(err);
    // })

    var requestBody = {
      redeemCategory: "Report",
      redemptionType: localStorage['selectedCountryCode'] + this.state.userMsisdn,
    };
    return apis
      .pendingReport(requestBody)
      .then((response) => response.data)
      .then((data) => {
        console.log("response checkPendingReport", data);
        if (data.code == "2000") {
          if (data.data.length > 0) {
            // let reportList = data.data;
            // let pendingreport = reportList.filter(
            //   (item) =>
            //     item.redeemMode == orderData.goodsId &&
            //     item.redemptionStatus == "PENDING"
            // );
            // if (pendingreport.length > 0) {
              this.setState({
                showPopUp: true,
                msg:
                  "You already hava a request in the queue. Please try again once previous request is completed.",
                button: "Ok",
              });
              return;
            } 
            // else {
            //   this.initiateRequest(orderData);
            // }
          // }
        } else {
          console.log(data.msg);
          this.initiateRequest(orderData);
          //   this.showPopUp(data.msg,false,true);
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
  initiateRequest = (data) => {
    let status = data.goodsSale;

    console.log("status>>>" + data.goodsId);

    if (localStorage["userBalance"] < data.goodsPrice) {
      this.setState({
        ...this.state,
        Isnavigate: true
      })
      this.showPopUp(
        //"Minimum balance of ₹" +
        this.props.t('Minimum_balance_5_mins_report1') +
        data.goodsPrice +
        this.props.t('Minimum_balance_5_mins_report2'),
        //" is required to request report from astrologer.",
        false
      );
      return;
    }
    this.props.history.push({
      pathname: FRONTEND_NAME + "/reportForm",
      state: {
        typeOfService: this.state.typeOfService,
        panditMsisdn: data.goodsId,
        orderDetail: data,
      },
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

  render() {
    const { t } = this.props;
    let inputStyle = {
      backgroundColor: "#9A9A9A",
      disabled: true,
    };

    let inputStyle2 = {
      background: "var(--gradient_color)",
      // disabled:false
    };
    // change code below this line

    var titleKey = `${t('Get_Detailed_Report')}`


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
        <Header
          IsActive_header_Or_not="chat_and_talk_header-"
        />
        {/* <BottomHeader /> */}
        <div className="container">
          {/* <HeaderMenu /> */}
          <PageHeader
            Mob_HeaderIsTrue={'not_show_mob_header1'}
            name={{ firstname: "Get Detailed", lastname: "Report" }}
            editSearchTerm={this.editSearchTerm}
            editSortTerm={this.editSortTerm}
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
              IsiconType={""}
            />
          ) : null}
          {this.state.enableLoader ? null : <Loading />}
          <div className="page-body">

            <div className="row">
              <div className="col-12 col-md-3 mobsidemenu">
                <SideMenu />
              </div>

              <div className="astrologer_list_container">
              <InfiniteScroll
                dataLength={this.state.sliceLength}
                next={this.fetchMoreAstrologers}
                hasMore={this.state.filteredpanditJiList.length < this.state.sliceLength ? false:true}
                loader={<h4>Loading...</h4>}>

                <div className="astrologer_list_inner_container d-flex justify-content-between">
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
                              </div>
                            </div>

                            <div className="notification_btn">
                              {/* <img
                                src={bell}
                                className="bell_img"
                                onClick={() =>
                                  this.subscribeToPanditJi(data.goodsId)
                                }
                              /> */}
                              <span>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            </div>
                          </div>
                          <div className="astrologer_list_action_group d-flex align-items-center justify-content-between">
                            <div className="astrologer_user_count">
                              <span>
                                <img src={star} alt="*" width="10px" ></img>
                              </span>
                              <span className="total">
                                {data.goodsTotalRating != null
                                  ? data.goodsTotalRating
                                  : 0}{" "}
                                {t('Total')}
                              </span>
                            </div>

                            <div className="astrologer_rate_card">
                              <p>{`${this.state.currencyLogo}${data.goodsPrice}`}/{t('Report')}</p>
                            </div>

                            <div className="Action_btn_group">
                              <button
                                className="call_btn"
                                onClick={this.state.isUserLoggedIn
                                  ? () => this.checkPendingReport(data)
                                  : () => this.openLoginPopup()
                                }
                                style={inputStyle2}
                              >
                                {t(this.state.typeOfService)}
                              </button>

                              {/* <button className="busy_btn">
                                {
                                  this.state.busypanditList.some(
                                    (item) => data.goodsId === item) ?
                                    t("Busy") : data.goodsSale == 0 ? t("Offline")
                                      : t("Online")
                                }
                              </button> */}
                            </div>

                          </div>
                        </div>
                      })}
                </div>
              </InfiniteScroll>
                
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
          </div>
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
export default withCombine(Report);
