import React from "react";
import { withRouter } from "react-router-dom";
import Header2 from "../common/Header2";
import Footer from "../common/Footer";
import { getCommonHeaders, SEO,weeklyHoroscopeData,yearlyHoroscopeData } from "../configuration/commonFunctions";
import apis from "../configuration/apis";
// import User from "../images/user.svg";
import "../styles/dailyHoroscope.css";
import Loading from "./loader";
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

 
class HoroscopeSingle extends React.Component {
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
    this.fetchBannerAndSunSign(true);
    this.fetchSignData(typeof this.props.match.params.title === 'undefined' ? t('Aries') : this.props.match.params.title);
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
    this.props.history.push(FRONTEND_NAME +'/horoscopes/'+ this.props.match.params.cat + "/" + flag)

    // this.setState({ enableLoader: false });
    // this.setState({ signName: flag });
    // var headers = getCommonHeaders();
    // var requestBody = {
    //   category: "Horoscope",
    //   subCategory: flag
    // };
    // apis
    //   .fetchSunSignData(requestBody, headers)
    //   .then((response) => response.data)
    //   .then((data) => {
    //     console.log("resp data", data);
    //     if (data.code == "2000") {
    //       ////debugger;
    //       {
    //         console.log("fetchSunSignData" + data.data);
    //       }

    //       this.setState({
    //         signData: data.data.productDetails,
    //       });

    //       this.setState({ enableLoader: true });
    //     } else if (data.code == "2009") {
    //       //this.fetchSignData(false);
    //     } else {
    //       console.log(data.msg);
    //       this.setState({ enableLoader: false });
    //       //props.showPopUpFunc(data.msg);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     this.setState({ enableLoader: false });
    //   });
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
    var pageTitle = this.props.match.params.cat
        pageTitle = pageTitle.replace('-', ' ');
console.log(this.props.match.params);
    return (
      <>
      <SEO 
        keywords={"Yearly Horoscope 2023"}
        title={"Yearly Horoscope 2023 Predictions | astroking"}
        description={"Unveil what the year holds for you with the Yearly Horoscope 2023. Get accurate predictions and guidance from astroking for a successful year ahead"}
      />
      <Header2
          IsActive_header_Or_not="chat_and_talk_header-"
          openLoginPopup={this.openLoginPopup}
          openSignupPopup={this.openSignupPopup}
          isLogin={loginSelected}
          countryCode={this.state.countryCode}
          changeIsHeaderOpen={this.changeIsHeaderOpen}
      />
        <PageBanner Banner={AboutBanner} title={this.props.match.params.title + " " + pageTitle } broadcom={"home/" + this.props.match.params.cat+"/" +this.props.match.params.title} />
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
                title={ this.props.match.params.cat + " " + this.props.match.params.title} 
                />
                <div className="desk_top">
                <BottomTab data={this.props} />
                </div>
        <div className="container">
          {this.state.enableLoader ? null : <Loading />}
            <div className="astro_horoscope_container">
                {/* <div className="astro_horoscope_tab_container">
                <div className="astro_horoscope_tab_container">
                        <div className="astro_horoscope_tab_warrper">
                          <div className="astro_tab_link_container">
                            <ul class="nav nav-tabs ul_tab" id="myTab" role="tablist">
                              <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Lucky Colour</button>
                              </li>
                              <li class="nav-item" role="presentation">
                                <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Lucky  Number</button>
                              </li>
                              <li class="nav-item" role="presentation">
                                <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Love Life</button>
                              </li>
                              <li class="nav-item" role="presentation">
                                <button class="nav-link" id="Yearly-tab" data-bs-toggle="tab" data-bs-target="#Yearly" type="button" role="tab" aria-controls="contact" aria-selected="false">Business</button>
                              </li>
                              <li class="nav-item" role="presentation">
                                <button class="nav-link" id="Career-tab" data-bs-toggle="tab" data-bs-target="#Career" type="button" role="tab" aria-controls="contact" aria-selected="false">Career</button>
                              </li>
                              <li class="nav-item" role="presentation">
                                <button class="nav-link" id="Health-tab" data-bs-toggle="tab" data-bs-target="#Health" type="button" role="tab" aria-controls="contact" aria-selected="false">Health</button>
                              </li>
                            </ul>
                          </div>
                          <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                              <div className="horoscope_Outer"> </div>
                            </div>

                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab"> 
                            <div className="horoscope_Outer"></div>
                            </div>

                            <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                            <div className="horoscope_Outer"></div>
                            </div>

                            <div class="tab-pane fade" id="Yearly" role="tabpanel" aria-labelledby="contact-tab">
                            <div className="horoscope_Outer"></div>
                            </div>

                            <div class="tab-pane fade" id="Career" role="tabpanel" aria-labelledby="contact-tab">
                            <div className="horoscope_Outer"></div>
                            </div>

                            <div class="tab-pane fade" id="Health" role="tabpanel" aria-labelledby="contact-tab">
                            <div className="horoscope_Outer"></div>
                            </div>

                          </div>
                        </div>
                      </div>
                </div> */}

                <div className="horoscope_cat_container mt-4">
                    <div className="horoscope_cat text-left">
                        <div className="horoscope_cat_head">
                            <h5> Select zodiac Signs </h5>
                        </div>
                        <div className="Select_cat">
                            <select onChange={(e) => this.fetchSignData(e.target.value)}> 
                                <option>{this.props.match.params.title} </option>
                                {this.state.sunSignList.slice(0, 12).map((data, index) => (
                                    <option vlaue={data.featureName} key={index}> {data.featureName} </option>
                                ))}
                            </select>
                        </div>
                        <div className="Choose_other_cat">
                            <ul>
                                <li>Today Horoscope </li>
                                <li> Tomorrow's Horoscope</li>
                                <li> Yesterday's Horoscope</li>
                                <li> Monthly Horoscope </li>
                                <li> Yearly Horoscope</li>
                            </ul>
                        </div>
                    </div>
                    <div className="horoscope_cat_details text-justify">
                        <div className="horoscope_cat_head mb-3">
                            <p className="daily-horoscope-header text-left">
                                <span className="daily">{this.props.match.params.title} </span>
                                <span className="horoscope">{pageTitle}</span>
                            </p>
                        </div>
                        <div className="">

                          {this.props.match.params.cat === 'weekly-horoscope' ? weeklyHoroscopeData && weeklyHoroscopeData.map(item => {
                                if(this.props.match.params.title === item.title){
                                  return <p>{item.disc}</p>
                                }
                                
                            }): this.props.match.params.cat === 'yearly-horoscope' ? yearlyHoroscopeData && yearlyHoroscopeData.map(item => {
                              if(this.props.match.params.title === item.title){
                                return <p>{item.disc}</p>
                              }
                              
                          }):null}
                          
                        </div>
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

export default withCombine(HoroscopeSingle);
