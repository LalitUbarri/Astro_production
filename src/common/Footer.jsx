import React from "react";
// import AppStore from "../images/app-store.png";
import google from "../images/google.png";
// import apple from "../images/apple.png";
import { withTranslation } from 'react-i18next';
import { compose } from 'redux'
import * as constent from '../configuration/constants';
import { getCommonHeaders, ScrollTop } from "../configuration/commonFunctions";
// import apis from "../configuration/apis";
import { FRONTEND_NAME } from "../configuration/constants";
// import {withRouter} from "react-router/withRouter";
import facebook from '../images/New-images/Mask-group.png'
import insta from '../images/New-images/Mask-group-2.png'
import youtube from '../images/New-images/Mask-group-1.png'
import medium from '../images/New-images/medium.png'
import BottomHeader from "./BottomHeader";
 
class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutUsTitle: "",
      aboutUsDescription: "",
      userProfile: localStorage["userProfile"],
    };
  }
  downloadApp = () => {
    window.open("https://play.google.com/store/apps/details?id=com.astroking","_blank")
  }

  componentDidMount() {
    var headers = getCommonHeaders();
    this.fetchAboutUs(headers);
  }

  fetchAboutUs = (headers) => {
    /*var requestBody = {
    "programId":"1"
  };
  apis.aboutUs(requestBody, headers)
      .then(response => response.data)
      .then(data => {
          console.log("resp data", data);
          if (data.code == "2000") {
              ////debugger;
              {console.log('aboutUsData'+data.data.aboutProgramData)}
             
              this.setState({
                aboutUsTitle : data.data.aboutProgramData.programTitle,
               aboutUsDescription : data.data.aboutProgramData.programText
              })
              
          }
          else if(data.code == "2009")
          {
            headers.accessToken = null;
            this.fetchAboutUs(headers);
          }
          else {
              console.log(data.msg);
              
              //props.showPopUpFunc(data.msg);
          }
      })
      .catch(error => {
          console.log(error);

      })

  */
    this.setState({
      aboutUsTitle: localStorage["aboutUsTitle"],
      aboutUsDescription: localStorage["aboutUsDesc"],
    });
  };

  redirectPageAbout = (e) => {
    this.props.history.history.push({ pathname: FRONTEND_NAME + "/about" });
    ScrollTop(0)
  };

  redirectPage = (flag) => {
    this.props.history.history.push({ pathname: FRONTEND_NAME + "/"+flag });
    ScrollTop(0)
  }
  redirectPageRefund = () => {
    //localStorage["footerTitle1"]='Refund';
    //localStorage["footerTitle2"]='Policy';
    //localStorage["footerDesc"]='Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one'
    this.props.history.history.push({ pathname: FRONTEND_NAME + "/refundPolicy" });
    ScrollTop(0)
  };
  redirectPageDisclamer = (e) => {
    // localStorage["footerTitle1"]='Disclaimer';
    //localStorage["footerTitle2"]='';
    //localStorage["footerDesc"]='Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one'

    this.props.history.history.push({ pathname: FRONTEND_NAME + "/disclaimer" });
    ScrollTop(0)
  };
  redirectPageTC = () => {
    // var headers = getCommonHeaders();
    //this.fetchTC(headers);
    this.props.history.history.push({ pathname: FRONTEND_NAME + "/terms" });
    ScrollTop(0)
  };
  redirectPagePrivacy = () => {
    //var headers = getCommonHeaders();
    //this.fetchPrivacyPolicy(headers);
// alert(JSON.stringify(this.props.history.history))
    this.props.history.history.push(FRONTEND_NAME + "/privacyPolicy");
    ScrollTop(0)
  };
  redirectPagePricing = (e) => {
    // localStorage["footerTitle1"]='Pricing';
    //localStorage["footerTitle2"]='Policy';
    //localStorage["footerDesc"]='Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one'

    this.props.history.history.push({ pathname: FRONTEND_NAME + "/pricingPolicy" });
    ScrollTop(0)
  };
  redirectPageLogin = (e) => {
    this.props.history.history.push({
      pathname: FRONTEND_NAME + "/home",
      state: {
        title: "Refund & Cancellation Policy",
        description: "",
        imageUrl: "",
      },
    });
    ScrollTop(0)
  };
  redirectPageRegister = (e) => {
    this.props.history.history.push({
      pathname: FRONTEND_NAME + "/home",
      state: {
        title: "Refund & Cancellation Policy",
        description: "",
        imageUrl: "",
      },
    });
    ScrollTop(0)
  };

  render() {
    const {t}=this.props;
    var url = window.location.href
    // console.log();
    // console.log(constent.HTTP1+'/productlandingpage');
    return (
      <>
      <BottomHeader />
      <div className="container mb-480">
          <div className="page-footer footer_container">
            <div className="col-12 col-md-12 footer-about-astrology_card">
              <p className="footer-about-astrology text-center">{t('About_Astrology')}</p>
              <p className="footer-about-astrology-content text-justify">
                {t('About_Home_Content')}
              </p>
            </div>

            <div className="col-12 col-md-12 footer-about-astrology_card">
              <div className="row">
                  <div className="col-6 col-md-6">
                    <div className="footer-about-astrology_card_head text-left">
                      <p className="footer-download text-left">{t('quick_links')}</p>
                    </div>
                    <ul>
                      <li onClick={() => this.redirectPageAbout()}>{t('About_us')} </li>
                      <li onClick={() => this.redirectPageRefund()}> {t('Refund_Cancellation_Policy')} </li>
                      <li onClick={() => this.redirectPageDisclamer()}>{t('Disclaimer')} </li>
                      <li onClick={() => this.props.history.history.push({ pathname: FRONTEND_NAME + "/talk" })}>{t('Talk_to_Astrologer')} </li>
                      <li onClick={() => this.props.history.history.push({ 
                        pathname: FRONTEND_NAME + "/chatList",
                        state: { typeOfService: "Chat"}})}>{t('Chat_with_Astrologer')} </li>

                      <li onClick={() => this.props.history.history.push({ 
                    pathname: FRONTEND_NAME + "/astromall",})}> {t('Shop at Astromall')} </li>
                      <li onClick={() => this.redirectPageTC()}>{t('Terms_Conditions')} </li>
                      <li onClick={() => this.redirectPagePrivacy()}>{t('Privacy_Policy')}</li>

                      <li onClick={() => this.redirectPage('upcoming-festivals-vatpurnima')}>{t('Vrat')}</li>
                      <li onClick={() => this.redirectPage('festival-calender-astrology')}>{t('festiva_calendar')}</li>
                      <li onClick={() => this.redirectPage('mangalik-dosh')}>{t('mangal_dosh')}</li>
                      <li onClick={() => this.redirectPage('kalshap-dosh')}>{t('kalsharp_dosh')}</li>
                      <li onClick={() => this.redirectPage('planetry-transit-2023')}>{t('Planetary_transit')}</li>
                      <li onClick={() => this.redirectPage('marriage-astrologer-in-India')}>{t('Marriage_Astrology')}</li>
                      <li onClick={() => this.redirectPage('business-astrology-in-india')}>{t('Business_Astrology')}</li>
                      <li onClick={() => this.redirectPage('court-case-astrology')}>{t('Court_Legal')}</li>
                      <li onClick={() => this.redirectPage('career-astrology-in-india')}>{t('Career_Astrology')}</li>
                      <li onClick={() => this.redirectPage('marriage-problems-astrology')}>{t('Delay_marriage')}</li>
                      <li onClick={() => this.redirectPage('face-reading-astrology')}>{t('Face_Reading')}</li>
                      <li onClick={() => this.redirectPage('hand-reading-astrology')}>{t('Palm_Reading')}</li>
                    </ul>
                  </div>

                  <div className="col-6 col-md-6">
                    <div className="footer-about-astrology_card_head text-left">
                      <p className="footer-download text-left">{t('Download_our_App')}</p>
                    </div>
                    <ul className="Download_our_App"> 
                      <li> <img className="mt-1 app-store" src={google} onClick={this.downloadApp} alt="google"/> </li>
                      <li> 
                          <a href="https://www.facebook.com/astroking-110841057760085" target="_blank">
                            <img className="mt-1 app-store" src={facebook} alt="facebook"/> 
                          </a>
                        </li>
                      <li> <a href="https://www.instagram.com/astroking.in/" target="_blank">
                              <img className="mt-1 app-store" src={insta} alt="intsagram"/>
                            </a>
                        </li>
                      <li> <a href="https://www.youtube.com/@astroking-talktoastrologer5827" target="_blank">
                            <img className="mt-1 app-store" src={youtube} alt="youtube"/> 
                            </a>
                        </li>
                        <li> <a href="https://medium.com/@astroking" target="_blank">
                            <img className="mt-1 app-store" src={medium} alt="medium" /> 
                            </a>
                        </li>
                    </ul>
                  </div>
              </div>
            </div>
      </div>
    </div>
      <div className="footer_bottom_line mb-480" style={{ padding: '20px' }}>
          Copyright {new Date().getFullYear()} <a href="https://astroking.net/home" target="_blank"> Astroking.net</a> All Rights Reserved
        </div>
      </>
    );
  }
}
const withCombine=compose(
  // withRouter,
  withTranslation()
) 
export default withCombine(Footer);
