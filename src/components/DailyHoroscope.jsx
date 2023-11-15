import React from "react";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
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



const Mobresponsive = {
  options:{
    loop: true,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:3,
            nav:false
        },
        600:{
            items:3,
            nav:false
        },
        1000:{
            items:7,
            nav:true
        }
    }
}
  };

 
class DailyHoroscope extends React.Component {
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
    // alert(JSON.stringify(this.props.match.params.title))
    this.fetchcountryCode()
    this.fetchSignData(typeof this.props.match.params.title === 'undefined' ? t('Aries') : this.props.match.params.title);
    // if(this.state.signName) this.fetchSignData(this.props.t(this.state.signName));
    this.fetchBannerAndSunSign(true);
  }

  fetchBannerAndSunSign = (flag) => {
    var headers = getCommonHeaders();
    /* if(flag)
   {
    headers.accessToken = this.state.userProfile.accessToken;
   }
   else{
       headers.accessToken = null;
   }*/
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
          console.log(data.data);

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
    this.props.history.push(FRONTEND_NAME +'/horoscope/daily-horoscope/'+ flag)
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
            console.log(data.data);
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

  openLoginPopup = () => {
    this.setState({ displaySignupPopUp: true, loginSelected: true });
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
  changeIsHeaderOpen = (headerOpen) => {
    this.setState({
      isHeaderOpen: headerOpen
    })
  }

  closePopupOnLogin = () => {
    this.setState({
      displaySignupPopUp: false,
      isUserLoggedIn: true,
    });
    localStorage["isUserLoggedIn"] = true;
  };

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
    return (
      <>
      <SEO 
        keywords={'Daily Horoscope astrology'}
        title={'Accurate Daily Horoscope Predictions | astroking'}
        description={'Get your daily horoscope predictions for accurate insights and guidance. Trust astroking for reliable and personalized horoscope readings.'}
      />
      <Header2
          IsActive_header_Or_not="chat_and_talk_header-"
          openLoginPopup={this.openLoginPopup}
          openSignupPopup={this.openSignupPopup}
          isLogin={loginSelected}
          countryCode={this.state.countryCode}
          changeIsHeaderOpen={this.changeIsHeaderOpen}
      />
      <PageBanner Banner={AboutBanner} title={"Daily horoscope"} broadcom={"home/ daily-horoscope/" + this.props.match.params.title} />

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
                title={t("Daily_Horoscope")} 
                />
                <div className="desk_top">
                <BottomTab data={this.props} />
                </div>
          {/* <BottomHeader /> */}
        <div className="container">
          

          {displaySignupPopUp && (
            <Signup
              openLoginPopup={this.openLoginPopup}
              openSignupPopup={this.openSignupPopup}
              closePopUp={this.closeSignUpPopup}
              closeOnLogin={this.closePopupOnLogin}
              isLogin={loginSelected}
            />
          )}
          {/* <HeaderMenu /> */}
          
          {this.state.enableLoader ? null : <Loading />}
          <div className="page-body mb-mt-20 mt-5">
            <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-10">
            <OwlCarousel 
            className='owl-theme dailyHoroscape'
            {...Mobresponsive.options}
            >
            {this.state.sunSignList &&
              this.state.sunSignList.length > 0 &&
              this.state.sunSignList
                .slice(0, 12)
                .map((data, index) => (
                  <div className="item" onClick={() =>
                    this.fetchSignData(data.featureName)
                  }>
                    <div className={this.props.match.params.title === data.featureName ? "activeHoro horoscopeIcon":"horoscopeIcon"}>
                      <img className="horoscopeimg" src={data.featureIcon} alt="horoscope" />
                    </div>
                    <div className="horoscopeTitle">
                      <p>{data.featureName}</p>
                      <p className="date">{data.layout}</p>
                    </div>
                  </div>
              ))}
        </OwlCarousel>
        </div>
        <div className="col-md-1"></div>


              <div className="row-cols-1 daily-horoscope-carousel">
                {/* <!--Carousel Wrapper--> */}
                <div id="demo" className="carousel slide" data-ride="carousel">
                  <div className="container carousel-inner no-padding">
                    <div
                      className="carousel-item active"
                    >
                    </div>
                    
                  </div>
                  {/* <!-- Left and right controls --> */}
                </div>
              </div>
              <div className="row_daily">
              {this.state.signData &&
                this.state.signData.length > 0 &&
                this.state.signData.map((data) => (
                    <div className="col-lg-12">
                      <div className="daily-horoscope-box">
                        <p className="name">{data.productTitle}</p>
                        <p className="details">{data.productDescription}</p>
                      </div>
                    </div>
                 
                ))}

                    {/* <div className="col-lg-12">
                      <div className="daily-horoscope-box">
                        <p className="details text-justify">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo corrupti, voluptas sed quia alias consequuntur qui doloremque odio pariatur cupiditate voluptate temporibus animi consectetur laudantium beatae eius ipsum facere quae?</p>
                      </div>
                    </div> */}
                 </div>
            </div>
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

export default withCombine(DailyHoroscope);
