import React from "react";
import { withRouter } from "react-router-dom";
import Header2 from "../common/Header2";
import PageHeader from "../common/PageHeader";
import Footer from "../common/Footer";
import { getCommonHeaders, SEO } from "../configuration/commonFunctions";
import apis from "../configuration/apis";
// import User from "../images/user.svg";
import "../styles/dailyHoroscope.css";
import Loading from "./loader";
import Signup from "./signup";
import AboutBanner from '../images/New-images/Screenshot11.png'
// import BottomHeader from "../common/BottomHeader";
import { withTranslation } from 'react-i18next';
import { compose } from 'redux'
import Chat_Talk_Header from "../common/Chat&Talk_Header";
import BottomTab from "../common/BottomTab";
import $ from 'jquery'
import {FRONTEND_NAME} from '../configuration/constants'
import { t } from "i18next";
import PageBanner from "../common/pageBanner";
import weeklyImg from '../images/New-images/Rectangle-70.png'
import Youcanalsocheck from "./horocsopes_components/YouCanAsloCheck";

 
class WeeklyHoroscope extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signName:'Aries',
      profession: {},
      luck: {},
      emotion: {},
      love: {},
      health: {},
      travel: {},
      sunSignList: [],
      signData: [],
      userProfile: localStorage["userProfile"]
        ? JSON.parse(localStorage["userProfile"])
        : {},
      enableLoader: false,
      isUserLoggedIn: localStorage["userProfile"] ? true : false,
      displaySignupPopUp: false,
      loginSelected: true,
      countryCode: [],
    };
  }
  componentDidMount() {
    this.fetchcountryCode()
    // this.fetchSignData();
    // if(this.state.signName) this.fetchSignData(this.props.t(this.state.signName));
    this.fetchBannerAndSunSign(true);
  }

  fetchBannerAndSunSign = (flag) => {
    var headers = getCommonHeaders();
    apis
      .bannerAndSunSign(headers)
      .then((response) => response.data)
      .then((data) => {
        console.log("resp data", data);
        if (data.code == "2000") {
          ////debugger;
          {
            console.log("fetchBannerAndSunSign" + data.data);
          }

          this.setState({
            bannerList: data.data.bannerList,
            sunSignList: data.data.featureList,
          });
          this.setState({ enableLoader: true });
        } else if (data.code == "2009") {
          //this.fetchBannerAndSunSign(false);
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

  fetchHoroscope = (name) => {
    this.setState({ signName: name });
    this.fetchSignData(true);
  };



  fetchSignData = (flag) => {
    this.props.history.push(FRONTEND_NAME +'/horoscopes/weekly-horoscope/'+ flag)
    this.setState({ enableLoader: false });
    this.setState({ signName: flag });
    var headers = getCommonHeaders();
    var requestBody = {
      category: "Horoscope",
      subCategory: flag
    };
    apis
      .fetchSunSignData(requestBody, headers)
      .then((response) => response.data)
      .then((data) => {
        console.log("resp data", data);
        if (data.code == "2000") {
          ////debugger;
          {
            console.log("fetchSunSignData" + data.data);
          }

          this.setState({
            signData: data.data.productDetails,
          });

          this.setState({ enableLoader: true });
        } else if (data.code == "2009") {
          //this.fetchSignData(false);
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

  componentDidUpdate() {
    var selector = '.horoscopeIcon';
    $(selector).on('click', function () {
      $(selector).removeClass('activeHoro');
      $(this).addClass('activeHoro');
    });
  }
  
  render() {
    const {t}= this.props;
    const { displaySignupPopUp, loginSelected } = this.state;
    var pageTitle = this.props.match.params.title
    return (
      <>
      <SEO 
        keywords={"Weekly Horoscope astrology"}
        title={"Weekly Horoscope Predictions | astroking"}
        description={"Stay ahead with weekly horoscope predictions from astroking. Get valuable astrological guidance and insights for the week ahead based on your zodiac sign"}
      />
      <Header2
          IsActive_header_Or_not="chat_and_talk_header-"
          openLoginPopup={this.openLoginPopup}
          openSignupPopup={this.openSignupPopup}
          isLogin={loginSelected}
          countryCode={this.state.countryCode}
          changeIsHeaderOpen={this.changeIsHeaderOpen}
      />
      <PageBanner Banner={AboutBanner} title={"Weekly Horoscope "} broadcom={"home/ weekly-horoscope"} />

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
                title={t("Weekly Horoscope")} 
                />
                <div className="desk_top">
                <BottomTab data={this.props} />
                </div>
        <div className="container">


          {this.state.enableLoader ? null : <Loading />}
          <div className="page-body">
            <div className="weekly_top_container">
                <div className="weekly_top_head text-left">
                    <p className="daily-horoscope-header text-left">
                        <span className="horoscope">{('Weekly  ')}</span>
                        <span className="daily">{(' Horoscope?')} </span>
                    </p>
                </div>

                <div className="weekly_top_body">
                    <div className="weekly_top_card">
                        <p> Welcome to our weekly horoscope, where we unveil the celestial predictions that await each zodiac sign. The cosmos is abuzz with exciting possibilities, as love, career, and personal growth take center stage.</p>

                        <p> With lucky numbers and colors in tow, discover what the stars have in store for you this week. Brace yourself for a cosmic journey filled with potential and watch as your horizons expand in ways you never imagined. Let's dive into the astrological insights and unlock the secrets of your destiny.</p>

                    </div>
                    <div className="weekly_top_card_img">
                        <img src={weeklyImg} alt="card images" width={'100%'} />
                    </div>
                </div>
            </div>

            <div className="daily-horoscope weekandYearly_horoscope_container">
                    <p className="daily-horoscope-header">
                      <span className="daily">{t('Select')} </span>
                      <span className="horoscope">{t('Your Sign')}</span>
                    </p>
                    <p className="daily-horoscope-detail">
                      {/* Weekly Horoscope Reveals Exciting Opportunities for All Zodiac Signs */}
                    </p>
                      <div className="astro_horoscope_tab_container">
                        <div className="astro_horoscope_tab_warrper">
                        <div className="horoscope_Outer">
                                {this.state.sunSignList.slice(0, 12).map((data, index) => (
                                  <div className="Horoscope_Inner">
                                    <div className="Horoscope_Img">
                                      <img
                                      alt="horocope"
                                        height="80px"
                                        width="80px"
                                        src={data.featureIcon}
                                        loading="lazy"
                                        onClick={() => this.fetchSignData(data.featureName)}
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
                
                <Youcanalsocheck />

                </div>
            </div>
           
        
        <Footer history={this.props} />
      </>
    );
  }
}

const withCombine=compose(
  withRouter,
  withTranslation()
) 

export default withCombine(WeeklyHoroscope);
