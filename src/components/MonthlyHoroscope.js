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

 
class MonthlyHoroscope extends React.Component {
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
    this.props.history.push(FRONTEND_NAME +'/horoscopes/monthly-horoscope/'+ flag)
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
        keywords={"Monthly Horoscope 2023"}
        title={"Monthly Horoscope 2023 Predictions | astroking"}
        description={"Unveil what the year holds for you with the Monthly Horoscope 2023. Get accurate predictions and guidance from astroking for a successful Month ahead"}
      />
      <Header2
          IsActive_header_Or_not="chat_and_talk_header-"
          openLoginPopup={this.openLoginPopup}
          openSignupPopup={this.openSignupPopup}
          isLogin={loginSelected}
          countryCode={this.state.countryCode}
          changeIsHeaderOpen={this.changeIsHeaderOpen}
      />
      <PageBanner Banner={AboutBanner} title={"Monthly Horoscope"} broadcom={"home/ monthly-horoscope"} />

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
                title={t("Monthly Horoscope")} 
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
                        <span className="horoscope">{('Monthly ')}</span>
                        <span className="daily">{(' Horoscope?')} </span>
                    </p>
                </div>

                <div className="weekly_top_body">
                    <div className="weekly_top_card">
                        <p> Looking for your Monthly Horoscope? astroking, can help you put an end to your search. On astroking, the astrologers, on a regular basis, caters horoscopes, including weekly horoscopes, that are prepared after considering the movement of the planets in Vedic astrology. This movement of the Vedic planets can be both positive and negative for the native, and the work of the horoscopes for the week ahead is to highlight their influences, their effect, and the associated remedies that one can adopt to ensure that you are safeguarded from the negative effect of the planets.</p>

                        <p> The weekly horoscope, besides a dose of insights into the good and bad of the week, also brings you tips and tricks that you can consider to make your life happening. These tips, yet again, are suggested by expert astrologers and practising them, in some way or the other, will help you in making the best use of your week. With the weekly horoscope, we make sure you are well aware of what's going to come for you in the future so that you are well prepared for the uncertainties and can take actions that only better your life.</p>

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
                    {/* In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document */}
                    </p>
                      <div className="astro_horoscope_tab_container">
                        <div className="astro_horoscope_tab_warrper">
                        <div className="horoscope_Outer">
                                {this.state.sunSignList.slice(0, 12).map((data, index) => (
                                  <div className="Horoscope_Inner">
                                    <div className="Horoscope_Img">
                                      <img
                                      alt="img"
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

export default withCombine(MonthlyHoroscope);
