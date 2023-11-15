import React from "react";
import { MyImage } from '../common/lazy_loadimg'
import { withRouter } from "react-router-dom";
import { compose } from 'redux';
import * as Notification from "./pushNotification";
import { APP_NAME, FRONTEND_NAME } from "../configuration/constants";
import { BlogData, getCommonHeaders, getStaticValues, UpComingEventData } from "../configuration/commonFunctions";
import { postApi } from "../configuration/apis";
import * as Constant from "../configuration/constants";
import apis from "../configuration/apis";
import Path2442 from "../images/New-images/Group-151.png";
import Path2443 from "../images/New-images/Group150.png";
import "../styles/home.css";
import apiUrls from "../configuration/apiUrls";
import { withTranslation } from 'react-i18next';
import { ScrollTop, SEO } from '../configuration/commonFunctions'
import $ from 'jquery'
import { lazy } from "react";
import VideoRoom from '../components/newComponents/VideoRoom';

const OwlCarousel = lazy(() => import('react-owl-carousel'));
const Footer = lazy(() => import('../common/Footer'));
const ReactPlayer = lazy(() => import('react-player'));
const Signup = lazy(() => import('./signup'));
const Loading = lazy(() => import('./loader'));
const Popup = lazy(() => import('./popupChat'));
const RightHeader = lazy(() => import('../common/RightHeader'));
const BootomPopup = lazy(() => import('../common/BottomPopup'));
const MandatoryFields = lazy(() => import('../common/MandatoryfieldsPopup'));
const FreeChatPopup = lazy(() => import('../common/FreeChatPopup'));
const Header2 = lazy(() => import('../common/Header2'));
const BottomTab = lazy(() => import('../common/BottomTab'));
const Our_Astrologer = lazy(() => import('./hpmepage_components/our_astrologer'));
const HowToConsult = lazy(() => import('./hpmepage_components/howToConsult'));
const UpComingEvent = lazy(() => import('../components/hpmepage_components/upComingEvent'));
const Counter = lazy(() => import('./hpmepage_components/Counter'));
const AstrologicalRemedies = lazy(() => import('./hpmepage_components/AstrologicalRemedies'));
const FAQS = lazy(() => import('./hpmepage_components/FAQs'));
const Testimonial = lazy(() => import('./hpmepage_components/testimonial'));


const options = {
  // margin: 30,
  responsiveClass: true,
  nav: false,
  dots: true,
  autoplay: false,
  smartSpeed: 1000,
  responsive: {
    0: {
      items: 1,
    },
    400: {
      items: 1,
    },
    600: {
      items: 2,
    },
    700: {
      items: 2,
    },
    1000: {
      items: 2,

    }
  },
};

var countryCode;
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      astrolgerList: [],
      totalAstrologer: "",
      totalCarousel: "",
      currentCarouselValue: 0,
      ourStoryData: [],
      videoUrl: "",
      arrayOfArrays: [],
      aboutUsTitle: "",
      aboutUsDescription: "",
      busypanditList: [],
      bannerList: [],
      sunSignList: [],
      isUserLoggedIn: localStorage["userProfile"] ? true : false,
      displaySignupPopUp: false,
      loginSelected: true,
      ourStoryDataText: {},
      ourServicesData: [],
      ourStaticData: [],
      enableLoader: false,
      isChatActive: false,
      userName: '',
      IsPopup: true,
      freeChat: "",
      showFreeChatPopup: false,
      countryCode: [],
      showFreeChatPopup: false,
      astroVideos: [],
      isHeaderOpen: false,
      language: localStorage['selectedLanguage'],
      joined: false
    };
  }
  componentWillMount() {
    if (this.state.isUserLoggedIn) {
      this.getUserInfo();
    }
  }
  componentDidMount() {
    countryCode = localStorage['selectedCountryCode'];
    if (this.state.isUserLoggedIn) {
      this.getUserInfo();

    }
    let requestUrl = window.location.href;
    let homeUrl = new URL(requestUrl);
    if (requestUrl.includes("?")) {
      let err = homeUrl.searchParams.get("err");
      if (err == "1") {
        // localStorage.clear();
        localStorage.removeItem('msisdn');
        localStorage.removeItem('userProfile');
        localStorage.removeItem('isUserLoggedIn');
        localStorage.removeItem('profileData');
        localStorage.removeItem('currency');
        localStorage.removeItem('userBalance');
        sessionStorage.clear();
        this.setState({
          showPopUp: true,
          msg: "Session logout ! Please login again. ",
          button: "Ok",
          isSuccess: false,
          enableLoader: false,
          isFreeSession: false
        });
      }
    }

    // this.getCampaignList(); //refer
    this.fetchStaticData();
    this.fetchOurStory(true);
    this.fetchAboutUs(true);
    this.fetchBannerAndSunSign(true);
    this.fetchOurStoryData(true);
    this.fetchTopAstrologer()
    this.fetchAstrologyVideo()
    this.fetchBusyPandits()
    this.fetchPanditForChat()




    if (this.state.isUserLoggedIn) {
      this.fetchOurServices();
      this.fetchPanditForChat();

      const staticData = getStaticValues().then((response) => {

        // console.log("free Chat response", response);

        this.setState({
          freeChat: response
        })
      })
        .catch((err) => console.log(err));


    }

    this.fetchcountryCode();


    const notificationToken = Notification.askForPermissioToReceiveNotifications().then(
      function (response) {
        // console.log(
        //   "====>> Token response from  User to know if registered: ",
        //   notificationToken
        // );
      }
    );

    if (this.state.isUserLoggedIn) {
      var Api_url = `${Constant.ASTRO_URL}/FlexPlatform/getUserInfo`;
      const headers = getCommonHeaders();
      headers.msisdn = localStorage["msisdn"];
      postApi(Api_url, headers)
        .then((response) => response.data)
        .then((data) => {
          // alert(data.data)
          if (data.data === null) {
            this.setState({
              userName: ''
            })

          } else {
            this.setState({
              userName: data.data[0].firstName
            })
            // console.log(data.data[0].firstName);
          }

        })
    }

  }

  getUserInfo = () => {
    var url = apiUrls.getUserInfoStatus;

    const headers = getCommonHeaders();

    postApi(url, headers)
      .then(responce => responce.data)
      .then(res => {
        // console.log("*****************************" + JSON.stringify(res.data[0].flag));
        if (res.data[0].flag === false) {
          var url = apiUrls.userPopupEvent;
          url = url.replace("<msisdn>", localStorage['selectedCountryCode'] + localStorage['msisdn']);
          postApi(url, headers)
        }
        this.setState({
          ...this.state,
          IsPopup: res.data[0].flag
        })
      })
      .catch(err => console.log(err));
  }

  fetchStaticData = () => {
    const headers = getCommonHeaders();
    apis
      .getStaticData(headers)
      .then((response) => response.data)
      .then((data) => {
        // console.log("static ddddata", data.data);


        this.setState({
          ourStaticData: data.data,
          isFreeSession: data.data.filter(d => d.titleKey === "freeChatAndCallSession").length > 0 ? true : false
        });
        localStorage.setItem('freeSession', this.state.isFreeSession);
      })
      .catch((error) => {
        console.log(error);
        this.setState({ enableLoader: false });
      });
  }

  fetchOurServices = () => {
    var headers = getCommonHeaders();
    apis
      .getOurServices(headers)
      .then((response) => response.data)
      .then((data) => {
        // console.log("resp data", data);
        if (data.code == "2000") {
          //debugger;
          {
            // console.log("ourServicesData", data.data);
          }

          this.setState({
            ourServicesData: data.data,
            enableLoader: true,
          });
        } else {
          /* else if (data.code == "2009") {
           localStorage.clear();
           sessionStorage.clear();
           this.setState({
             showPopUp: true,
             msg: 'Session logout ! Please login again. ',
             button: 'Ok',
             enableLoader: false
           });
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
  fetchOurStory = (flag) => {
    var headers = getCommonHeaders();

    /*  if (!flag) {
        headers.accessToken = null;
      }
      else {
        headers.accessToken = localStorage["userProfile"] ? localStorage["userProfile"].accessToken : null;
      }*/
    var requestBody = {
      category: "Home",
      subCategory: "video",
    };
    apis
      .ourStory(requestBody, headers)
      .then((response) => response.data)
      .then((data) => {
        // console.log("resp data", data);
        if (data.code == "2000") {
          //debugger;
          {
            // console.log("ourStoryData" + data.data.productDetails);
          }

          this.setState({
            ourStoryData: data.data.productDetails,
          });
          this.setState({ enableLoader: true });
        } else {
          /* else if (data.code == "2009") {
 
           //this.fetchOurStory(false);
 
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
  fetchOurStoryData = (flag) => {
    var headers = getCommonHeaders();

    /*if (!flag) {
      headers.accessToken = null;
    }
    else {
      headers.accessToken = localStorage["userProfile"] ? localStorage["userProfile"].accessToken : null;
    }*/

    var requestBody = {
      category: "Home",
      subCategory: "story",
    };
    apis
      .ourStory(requestBody, headers)
      .then((response) => response.data)
      .then((data) => {
        // console.log("resp data", data);
        if (data.code == "2000") {
          //debugger;
          {
            // console.log("ourStoryData" + data.data.productDetails);
          }

          this.setState({
            ourStoryDataText: data.data.productDetails ? data.data.productDetails[0] : "",
          });
          this.setState({ enableLoader: true });
        } else {
          /* else if (data.code == "2009") {
           //this.fetchOurStoryData(false);
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
  fetchAboutUs = (flag) => {
    var headers = getCommonHeaders();
    /* if (!flag) {
       headers.accessToken = null;
     }
     else {
       headers.accessToken = localStorage["userProfile"] ? localStorage["userProfile"].accessToken : null;
     }*/

    var requestBody = {
      programId: "1",
    };
    apis
      .aboutUs(requestBody, headers)
      .then((response) => response.data)
      .then((data) => {
        // console.log("resp data", data);
        if (data.code == "2000") {
          //debugger;
          {
            // console.log("aboutUsData" + data.data.productDetails);
          }

          this.setState({
            aboutUsTitle: data.data.aboutProgramData.programTitle,
            aboutUsDescription: data.data.aboutProgramData.programText,
          });
          this.setState({ enableLoader: true });
          localStorage["aboutUsTitle"] =
            data.data.aboutProgramData.programTitle;
          localStorage["aboutUsDesc"] = data.data.aboutProgramData.programText;
        } else {
          /* else if (data.code == "2009") {
          // this.fetchAboutUs(false);
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

  fetchBannerAndSunSign = (flag) => {
    var headers = getCommonHeaders();
    /*if (!flag) {
      headers.accessToken = null;
    }
    else {
      headers.accessToken = localStorage["userProfile"] ? localStorage["userProfile"].accessToken : null;
    }*/

    apis
      .bannerAndSunSign(headers)
      .then((response) => response.data)
      .then((data) => {
        // console.log("resp data", data);
        if (data.code == "2000") {
          //debugger;
          {
            // console.log("fetchBannerAndSunSign" + data.data);
          }

          this.setState({
            bannerList: data.data.bannerList,
            sunSignList: data.data.featureList,
          });
          this.setState({ enableLoader: true });
        } else {
          /*else if (data.code == "2009") {
         // this.fetchBannerAndSunSign(false);
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


  fetchPanditForChat = () => {
    let url = apiUrls.getLivePanditForUser;
    url = url.replace("<appName>", "astrology");
    url = url.replace("<userMsisdn>", Number(localStorage['selectedCountryCode'] + localStorage["msisdn"]));

    return apis.getLivePanditForUser(url).then((response) => {
      var data = response.data;

      if (data.code == "2000") {
        let chatClients = data.data;


        if (chatClients && chatClients.length > 0) {
          let panditMsisdn = chatClients[0].msisdn;
          this.setState({
            ...this.state,
            isChatActive: true
          })
        }
      }
      else {
        console.log(data.msg);
      }

    });
  };



  fetchTopAstrologer = () => {
    const headers = getCommonHeaders()
    const body = {
      "redeemCategory": "Chat",
      "redemptionType": "white"
    }

    apis
      .getTopAstrologerList(body, headers)
      .then(response => response.data)
      .then(data => {
        // console.log(data)
        if (data.code === 2000 && data.data) {
          this.setState({
            astrolgerList: data.data.length > 4 ? data.data.slice(0, 4) : data.data
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  fetchAstrologyVideo = () => {
    const headers = getCommonHeaders()
    const body = {
    }

    apis
      .getLearningVideo(body, headers)
      .then(response => response.data)
      .then(data => {
        // console.log("video" + JSON.stringify(data))
        if (data.code === 2000 && data.data) {
          // console.log(data)
          this.setState({
            astroVideos: data.data.length > 4 ? data.data : data.data
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
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

  openTab = (pageName) => {
    this.props.history.push(FRONTEND_NAME + pageName);
    ScrollTop(0);
  }

  gotoServices = (data) => {
    console.log("data.." + data);
    //alert('data..'+data);
    this.props.history.push({
      pathname: FRONTEND_NAME + "/ourServices",
      state: { ourServices: data },
    });
  };
  fetchReadMore = () => {
    this.props.history.push({ pathname: FRONTEND_NAME + "/ourStory" });
  };
  openHoroscope = (cat, signName) => {
    if (cat === 'daily') {
      this.props.history.push({
        pathname: FRONTEND_NAME + "/horoscope/daily-horoscope/" + signName
      });
      ScrollTop(100)
    } else if (cat === 'weekly') {
      this.props.history.push({
        pathname: FRONTEND_NAME + "/horoscopes/weekly-horoscope/" + signName
      });
      ScrollTop(100)
    } else if (cat === 'yearly') {
      this.props.history.push({
        pathname: FRONTEND_NAME + "/horoscopes/yearly-horoscope/" + signName
      });
      ScrollTop(100)
    }

  };

  closePopUp = () => {
    window.location.href = FRONTEND_NAME + "/home"
    this.setState({
      showPopUp: false,
    });
  };

  fetchPanditProfile = (panditData) => {
    const panditMsisdn = panditData.goodsId;
    const panditExp = panditData.goodsAttribute;
    const panditName = panditData.goodsName;
    this.props.history.push({
      pathname: FRONTEND_NAME + "/panditProfile",
      state: { panditMsisdn: panditMsisdn, panditExp: panditExp, panditName: panditName, data: panditData },
    })
  }

  handleBannerClick = (item) => {
    switch (item.redirectURL) {
      case "Recharge":
        this.props.history.push(FRONTEND_NAME + "/recharge");
        break;
      case "Chat":
        this.props.history.push({
          pathname: FRONTEND_NAME + "/chatList",
          state: { typeOfService: "Chat" },
        });

        break;
      case "Talk":
        this.props.history.push({
          pathname: FRONTEND_NAME + "/talk",
          state: { typeOfService: "Call" },
        });
        break;
      case "Report":
        this.props.history.push(FRONTEND_NAME + "/report");
        break;
      case "Mall":
        this.props.history.push(FRONTEND_NAME + "/astrologyStore");
        break;
      default:
        break;
    }
  }

  toggleFreeChatPopup = () => {
    this.setState({
      showFreeChatPopup: !(this.state.showFreeChatPopup)
    });
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

  changeIsHeaderOpen = (headerOpen) => {
    this.setState({
      isHeaderOpen: headerOpen
    })
  }


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
            // console.log("busypanditList" + JSON.stringify(data));
          }

          this.setState({
            busypanditList: data.data,
          });
          this.setState({ enableLoader: true });
        } else {
          console.log(data.msg);
          this.setState({ enableLoader: true });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ enableLoader: true });
      });
  };
  bannerClicked = (item) => {
    this.state.isUserLoggedIn ? this.handleBannerClick(item) : this.openLoginPopup()
  }
  componentDidUpdate() {
    $('.carousel').carousel({
      interval: 3000
    })

  }

  render() {
    const { t } = this.props;
    const {
      displaySignupPopUp,
      loginSelected,
      bannerList,
      msg,
      isSuccess,
      showFreeChatPopup,
      astrolgerList
    } = this.state;
    // console.log(this.state.astroVideos)

    return (
      <>
        <SEO
          title='astroking - Leading Best Astrologer in India'
          description='Get accurate predictions and guidance from astroking, the leading Best astrologer in India. Explore our astrology services today!'
          keywords='Best Astrologer in India'
        // type='article'
        />


        <BootomPopup />
        {/* {this.state.isUserLoggedIn ? <SpinTheWheelPopup />:null} */}
        {this.state.isUserLoggedIn ? !this.state.IsPopup ? <MandatoryFields IsCloseBtn={true} /> : null : null}
        {showFreeChatPopup && <FreeChatPopup heading={t('Select_Session')} option1={t('Chat')} option2={t("Call")} toggleFreeChatPopup={this.toggleFreeChatPopup} />}

        <Header2
          openLoginPopup={this.openLoginPopup}
          openSignupPopup={this.openSignupPopup}
          isLogin={loginSelected}
          countryCode={this.state.countryCode}
          changeIsHeaderOpen={this.changeIsHeaderOpen}
        />
        <div className="desk_top">
          <BottomTab data={this.props} />
        </div>

        {displaySignupPopUp && (
          <Signup
            countryCode={this.state.countryCode}
            openLoginPopup={this.openLoginPopup}
            openSignupPopup={this.openSignupPopup}
            closePopUp={this.closeSignUpPopup}
            closeOnLogin={this.closePopupOnLogin}
            isLogin={loginSelected}

          />
        )}

        {/* <HeaderMenu isUserLoggedIn={isUserLoggedIn} /> */}
        {this.state.enableLoader ? null : <Loading />}
        {this.state.showPopUp && (
          <Popup
            msg={msg}
            isSuccess={isSuccess}
            closePopUp={this.closePopUp}
          />
        )}

        {Object.keys(bannerList).length === 0 ? <Loading /> : <div className="container">
          <div className="">
            <div className="col p-0 overflow_Hidden">
              <div className="home-c">
                <div className="asrto-carousel_container">
                  <div className="asrto-carousel asrto-carousel_warrper">
                    <div
                      id="carouselExampleIndicators"
                      className="carousel slide"
                      data-ride="carousel"
                    >
                      <ol className="carousel-indicators">
                        {bannerList.map((item, index) =>
                          <li data-target="#carouselExampleIndicators" data-slide-to={index} className={index == 0 ? "active" : ""}></li>
                        )}
                      </ol>
                      <div className="carousel-inner">
                        {bannerList.map((item, index) => {
                          var images = {
                            alt: 'banner',
                            height: '',
                            src: item.bannerURL,
                            width: '',
                            caption: '',
                          }

                          return (<div className={"carousel-item " + (index == 0 ? "active" : "")}>
                            <div className={"CarouselImg" + (index + 1)}>
                              <div className="sliderImg" onClick={() => this.bannerClicked(item)}>
                                {MyImage(images)}
                              </div>
                            </div>
                          </div>)
                        }
                        )
                        }

                      </div>

                      

                    </div>
                  </div>
                  
                  <div className="asrto-Buttons_container">
                    <div className="header-right1">
                      {!this.state.isHeaderOpen && <RightHeader ourStaticData={this.state.ourStaticData} isFreeSession={this.state.isFreeSession} countryCode={this.state.countryCode} />}
                    </div>
                  </div>
                </div>
              </div>

              <div className="our_astrologers_container">
                <div className="card-parent1 d-flex">
                  <div className={this.state.isFreeSession === true ? "Our_Astrologer mt-2" : "Our_Astrologer freewidth"}>
                    {/* <p>{t('Our_Astrologers')}</p> */}
                    <p className="daily-horoscope-header">
                    <span className="horoscope">{t('Our_')} </span>
                    <span className="daily">{t('Astrologers')} </span>
                  </p>
                  </div>
                  {this.state.isFreeSession && this.state.ourStaticData.map(item => {
                    var images = {
                      alt: item.title,
                      height: '',
                      src: item.imageUrl,
                      width: '50px',
                      caption: '',
                      onclick: ''
                    }
                    if (item.titleKey === "freeChatAndCallSession") {
                      return (
                        <div className="freesession d-flex align-items-center justify-content-around" onClick={
                          () => {
                            !this.state.isUserLoggedIn ?
                              this.openLoginPopup() :
                              this.props.history.push(FRONTEND_NAME + "/freesession")
                          }
                        }>
                          <div className="freesession_content text-left">
                            <p className="text_color"><strong>{item.title}</strong></p>
                            <p> {item.description}</p>
                          </div>
                          <div className="freesession_img">
                            {MyImage(images)}
                            {/* <img src={item.imageUrl} loading="asyncComponent" alt="free session" width="50px" /> */}
                          </div>
                        </div>
                      )
                    } return null;
                  })}

                </div>

                <p> Get a live future reading from our best astrologers today </p>
              </div>

              {/* {!this.state.joined && (
                        <button onClick={() => this.setState({joined:true})}>Join Video</button>
                      )}
                      {this.state.joined && (
                        <VideoRoom />
                      )
                      } */}
              <Our_Astrologer
                astrolgerList={astrolgerList}
                fetchPanditProfile={this.fetchPanditProfile}
              />

              <HowToConsult Istrue={true} />

              <div className="astro_services_container">
                <div className="astro_services_head">
                  <p className="daily-horoscope-header">
                    <span className="horoscope">{(' A One-Stop Shop for All ')}</span>
                    <span className="daily">{('of Your Astrological Needs')} </span>
                  </p>
                  <p>  Welcome to our comprehensive astrology services section, where you can explore a range of offerings tailored to meet your astrological needs. Our dedicated team of experts provides personalized guidance, insightful reports, high-quality products, and auspicious puja services. Discover the world of astrology through our four distinct services </p>
                </div>
                <div className="card-parent card-parent_serves mb-481">
                  <div
                    onClick={
                      () => this.props.history.push({
                        pathname: FRONTEND_NAME + "/premium"
                      })
                    }
                    className="cardd astrology_profile1 ">
                    <div>
                      {this.state.ourStaticData.filter(a => a.titleKey === 'premiumAstrologer').map(a => <img src={a.imageUrl} loading="asyncComponent" alt="premiumAstrologer" width="60px" />)}
                      <div style={{ textAlign: 'center' }}>
                        {t('Premium Astrologer')}
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={
                      () => {
                        this.props.history.push({
                          pathname: FRONTEND_NAME + "/report",
                          state: { typeOfService: "Report" },
                        })
                      }
                    }
                    className="cardd astrology_profile1">
                    <div>
                      {this.state.ourStaticData.filter(a => a.titleKey === 'getDetailedReport').map(a => <img src={a.imageUrl} loading="asyncComponent" alt="getDetailedReport" width="30px" className="report_icon1" />)}
                      <div style={{ textAlign: 'center' }}>
                        {t('Detailed Report')}
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => this.openTab("/astromall")}
                    className="cardd astrology_profile1">
                    <div>
                      {this.state.ourStaticData.filter(a => a.titleKey === 'shopAtAstroMall').map(a => <img src={a.imageUrl} loading="asyncComponent" alt="shopAtAstroMall" width="35px" />)}
                      <div style={{ textAlign: 'center' }}>
                        {t('Shop at Astromall')}
                      </div>
                    </div>
                  </div>

                  <div className="cardd astrology_profile1"
                    onClick={this.state.isUserLoggedIn
                      ? () => this.props.history.push(FRONTEND_NAME + "/pooja") : () => this.openLoginPopup()} >
                    <div>
                      {this.state.ourStaticData.filter(a => a.titleKey === 'astroPooja').map(a => <img src={a.imageUrl} loading="asyncComponent" alt="astroPooja" width="30px" />)}
                      <div style={{ textAlign: 'center' }}>
                        {t('Astro Pooja')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <UpComingEvent
                blackTitle={'Up Coming '}
                whiteTitle={'Festivals  Vrats & Puja'}
                data={UpComingEventData}
              />


              <div className="daily-horoscope">
                <p className="daily-horoscope-header">
                  <span className="daily">{t('Daily')} </span>
                  <span className="horoscope">{t('Horoscope')}</span>
                </p>
                <p className="daily-horoscope-detail">
                  {t('free_daily_sign')}
                </p>
                <div className="astro_horoscope_tab_container">
                  <div className="astro_horoscope_tab_warrper">
                    <div className="astro_tab_link_container">
                      <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                          <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Daily</button>
                        </li>
                        <li class="nav-item" role="presentation">
                          <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Weekly</button>
                        </li>
                        <li class="nav-item" role="presentation">
                          <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Monthly</button>
                        </li>
                        <li class="nav-item" role="presentation">
                          <button class="nav-link" id="Yearly-tab" data-bs-toggle="tab" data-bs-target="#Yearly" type="button" role="tab" aria-controls="contact" aria-selected="false">Yearly</button>
                        </li>
                      </ul>
                    </div>
                    <div class="tab-content" id="myTabContent">
                      <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div className="horoscope_Outer">
                          {this.state.sunSignList.slice(0, 12).map((data, index) => (
                            <div className="Horoscope_Inner">
                              <div className="Horoscope_Img">
                                <img
                                  alt="loading"
                                  height="80px"
                                  width="80px"
                                  src={data.featureIcon}
                                  loading="asyncComponent"
                                  onClick={() => this.openHoroscope('daily', data.featureName)}
                                ></img>
                              </div>
                              <div className="Horoscope_Details">
                                <p className="horoscope-name">{data.featureName}</p>{" "}
                                <p className="horoscope-date">{data.layout}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <div className="horoscope_Outer">
                          {this.state.sunSignList.slice(0, 12).map((data, index) => (
                            <div className="Horoscope_Inner">
                              <div className="Horoscope_Img">
                                <img
                                  alt="loading"
                                  height="80px"
                                  width="80px"
                                  src={data.featureIcon}
                                  loading="asyncComponent"
                                  onClick={() => this.openHoroscope('weekly', data.featureName)}
                                ></img>
                              </div>
                              <div className="Horoscope_Details">
                                <p className="horoscope-name">{data.featureName}</p>{" "}
                                <p className="horoscope-date">{data.layout}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">

                        <div className="horoscope_Outer">
                          {this.state.sunSignList.slice(0, 12).map((data, index) => (
                            <div className="Horoscope_Inner">
                              <div className="Horoscope_Img">
                                <img
                                  alt="horoscope"
                                  height="80px"
                                  width="80px"
                                  src={data.featureIcon}
                                  loading="asyncComponent"
                                  onClick={() => this.openHoroscope(data.featureName)}
                                ></img>
                              </div>
                              <div className="Horoscope_Details">
                                <p className="horoscope-name">{data.featureName}</p>{" "}
                                <p className="horoscope-date">{data.layout}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div class="tab-pane fade" id="Yearly" role="tabpanel" aria-labelledby="contact-tab">
                        <div className="horoscope_Outer">
                          {this.state.sunSignList.slice(0, 12).map((data, index) => (
                            <div className="Horoscope_Inner">
                              <div className="Horoscope_Img">
                                <img
                                  alt="loading"
                                  height="80px"
                                  width="80px"
                                  src={data.featureIcon}
                                  loading="asyncComponent"
                                  onClick={() => this.openHoroscope('yearly', data.featureName)}
                                ></img>
                              </div>
                              <div className="Horoscope_Details">
                                <p className="horoscope-name">{data.featureName}</p>{" "}
                                <p className="horoscope-date">{data.layout}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              <Counter />
              <AstrologicalRemedies />

              <div className=" bg_img">
                <div className="mb-4801 Astro_Insights">
                  <p className="daily-horoscope-header">
                    <span className="horoscope">{('Enlighten Yourself with  ')}</span>
                    <span className="daily">{('Astro Insights and Vastu Gyan')} </span>
                  </p>
                  <p>  Explore our Astro Insights and Vastu Gyan section to deepen your understanding of astrology, discover the significance of puja rituals, and delve into the principles of Vastu Shastra. astroking offers a wealth of knowledge and valuable insights, allowing you to harness the power of celestial events and create harmonious living spaces.</p>
                </div>
                <div className="news_vastugyan_contaniner mb-4801">
                  {this.state.ourStaticData && this.state.ourStaticData.filter(a => a.titleKey === 'astroInsights').map(a =>
                    <div className="astrology_news_container" onClick={() => this.props.history.push(FRONTEND_NAME + "/astrologynews")}>
                      <div className="astrology-news">
                        <div className="newsicon">
                          <img src={Path2442} loading="asyncComponent" alt={a.title} ></img>
                        </div>
                        <div className="astrology-news-content">
                          <p style={{ color: '#3C3C46' }}>{a.title}</p>
                          <p style={{ color: '#414853' }}>{a.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                  }
                  {this.state.ourStaticData && this.state.ourStaticData.filter(a => a.titleKey === 'vastuGyan').map(a =>
                    <div className="vastuGyan_container" onClick={() => this.props.history.push(FRONTEND_NAME + "/vastu")}>
                      <div className="astrology-news flex-direction">
                        <div className="newsicon">
                          <img src={Path2443} loading="asyncComponent" alt="Vastu Gyan"></img>
                        </div>
                        <div className="astrology-news-content ">
                          <p style={{ color: '#3C3C46' }}>{a.title}</p>
                          <p style={{ color: '#414853' }}>{a.description}</p>
                        </div>

                      </div>
                    </div>
                  )
                  }
                </div>
              </div>
            </div>


            <FAQS />

            <UpComingEvent
              blackTitle={'Our latest '}
              whiteTitle={' Blogs'}
              data={BlogData}
              Isblog={true}

            />
            <Testimonial />

            {
              <div className="our-story" style={{ maxWidth: '1003px', margin: '0px auto' }}>
                <div className="col">
                  <p className="daily-horoscope-header">
                    <span className="horoscope">{'Our Best '}</span>
                    <span className="daily">{'Astrologers Videos'} </span>
                  </p>
                  {/* <p> At astroking, we provide the best Vastu tips for your happier and more beautiful dream house or apartment. A person can learn Vastu <br/> Shastra from our top-notch Vastu Industry expert. </p> */}

                  <div className="row" style={{ marginBottom: "50px" }}>
                    <OwlCarousel
                      className='owl-theme mt-4'
                      {...options}
                    >
                      {this.state.astroVideos.map(data => (
                        <div class='item video_item'>
                          <ReactPlayer
                            url={data.videourl}
                            controls={true}
                            className="react-player"
                            playing
                            width="100%"
                            height="100%"
                            light={true}
                            config={{
                              youtube: {
                                playerVars: { showinfo: 1 }
                              }
                            }}
                          />
                        </div>
                      ))}

                    </OwlCarousel>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>}
        <Footer history={this.props} />
      </>
    );
  }
}

const withCombine = compose(
  withRouter,
  withTranslation()
)
// const HomePage = withTranslation()(Home)

export default withCombine(Home);
