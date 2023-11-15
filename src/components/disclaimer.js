import React from "react";
import { withRouter } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "jquery/dist/jquery.min";
// import about from "../images/about.png";
import "../styles/about.css";
import Header from "../common/Header2";
// import HeaderMenu from "../common/HeaderMenu";
import Footer from "../common/Footer";

// import PageHeader from "../common/PageHeader";
import * as Constant from '../configuration/constants';
import { postApi } from "../configuration/apis";
import { getCommonHeaders } from '../configuration/commonFunctions';
import * as ErrorConstant from '../configuration/errorConstants';
import { FRONTEND_NAME } from "../configuration/constants";
import Signup from "./signup";
import PageBanner from "../common/pageBanner";
// import BottomHeader from "../common/BottomHeader";
import BannerImg from '../images/readmorebanner.png';
import { withTranslation } from 'react-i18next';
import { compose } from 'redux'

class Disclaimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: null,
      isloggedin: localStorage["isUserLoggedIn"] ? true : false,
      displaySignupPopUp: false,
      loginSelected: true
    }
  }
  componentDidMount() {
    this.getaboutUs();

  }
  getaboutUs = () => {
    console.log("inside getaboutUs method");
    var url = Constant.ASTRO_URL + Constant.GET_LOYALTY_PROGRAMME_INFO;
    const body = {
      "category": "MALL",
      "subCategory": ""
    }
    const headers = getCommonHeaders();
    console.log("body", body);
    postApi(url, headers, body)
      .then(response => response.data)
      .then((data) => {
        if (data && data.code == ErrorConstant.SUCCESS_CODE) {
          console.log("data ", data.data.productDetails);
          try {
            this.setState({
              aboutUsList: data.data.aboutProgramData,
              enableLoader: true
            });
          }
          catch (error) {
            console.log("exception occured")
            // this.toggleShowMsg("Something went wrong");
            this.setState({ enableLoader: false });
          }
        }
        else {
          console.log("Error code from getProductcatalog API : ", data.code, "with msg : ", data.msg);
          this.setState({ enableLoader: false });
        }
      })
      .catch(error => {
        console.log();
        console.error('error', error);
        this.setState({ enableLoader: false });
      });
  }
  openSubCategory = (subCategory) => {
    // window.open(FRONTEND_NAME + "/astrologyStore");
    sessionStorage["productcatalogItem"] = subCategory;
    this.props.history.push(FRONTEND_NAME + "/astrologyStore");
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

  closePopupOnLogin = () => {
    this.setState({
      displaySignupPopUp: false,
      isUserLoggedIn: true,
    });
    localStorage["isUserLoggedIn"] = true;
  };


  render() {
    const { displaySignupPopUp, loginSelected } = this.state;

    return (
      <>
        <Header
          openLoginPopup={this.openLoginPopup}
          openSignupPopup={this.openSignupPopup}
          isLogin={this.state.loginSelected}
        />
        {/* <BottomHeader /> */}
        <PageBanner title={this.props.t('Disclaimer')} Banner={''} />
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
          {/* <PageHeader name={{ firstname: "", lastname: "" }} /> */}
          <div className="row page-body">
            {
              /*
                this.state.imgUrl!=null ?

                <div className="col-md-12 col-lg-12 col-sm-12 mg-top-42 padd-0">
                <div className="col-sm-4 col-md-4 col-lg-4 float-left pd-left">
                  <img src={about} className="about-img"></img>
                </div>
                <div className="col-sm-8 col-md-8 col-lg-8 float-right padd-0 text-left ">
                  <p className="about-header">
                    20M+ satisfied customers, 500+ astrologers and lots of love
                  </p>
                  <p>
                    “On the other hand, we denounce with righteous indignation and
                    dislike men who are so beguiled and demoralized by the charms
                    of pleasure of the moment, so blinded by desire, that they
                    cannot foresee the pain and trouble that are bound to ensue;
                    and equal blame belongs to those who fail in their duty
                    through weakness of will, which is the same as saying through
                    shrinking from toil and pain. These cases are perfectly simple
                    and easy to distinguish. In a free hour, when our power of
                    choice is untrammelled and when nothing prevents our being
                    able to do what we like best, every pleasure is to be welcomed
                    and every pain avoided. But in certain circumstances and owing
                    to the claims of duty or the obligations of business it will
                    frequently occur that pleasures have to be repudiated and
                    annoyances accepted. The wise man therefore always holds in
                    these matters to this principle of selection: he rejects
                    pleasures to secure other greater pleasures, or else he
                    endures pains to avoid worse pains.”
                  </p>
                  <p>
                    “On the other hand, we denounce with righteous indignation and
                    dislike men who are so beguiled and demoralized by the charms
                    of pleasure of the moment, so blinded by desire, that they
                    cannot foresee the pain and trouble that are bound to ensue;
                    and equal blame belongs to those who fail in their duty
                    through weakness of will, which is the same as saying through
                    shrinking from toil and pain. These cases are perfectly simple
                    and easy to distinguish. In a free hour, when our power of
                    choice is untrammelled and when nothing prevents our being
                    able to do what we like best, every pleasure is to be welcomed
                    and every pain avoided. But in certain circumstances and owing
                    to the claims of duty or the obligations of business it will
                    frequently occur that pleasures have to be repudiated and
                    annoyances accepted. The wise man therefore always holds in
                    these matters to this principle of selection: he rejects
                    pleasures to secure other greater pleasures, or else he
                    endures pains to avoid worse pains.”
                  </p>
                </div>
              </div>
                :

                */

              <div className="col-sm-12 col-md-12 col-lg-12 float-left padd-0 text-left ">
                <p className="about-header mt-5">
                  {this.props.t('astroking Terms of Service ("Terms")')}
                </p>
                <p>
                  {this.props.t('Last updated: May 19, 2021')}
                </p>
                <p>
                  {this.props.t('Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the http://www.astroking.com website (the "Service") operated by astroking ("us", "we", or "our").')}
                </p>
                <p>
                  {this.props.t('Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.')}
                </p>
                <p>
                  {this.props.t('By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.')}
                </p>
                <p className="about-header">
                  {this.props.t('Accounts')}
                </p>
                <p>
                  {this.props.t('When you create an account with us, you must provide us information that is accurate, complete and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.')}
                </p>
                <p>
                  {this.props.t('You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.')}
                </p>
                <p>
                  {this.props.t('You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.')}
                </p>
                <p className="about-header">
                  {this.props.t('Links to Other Web Sites')}
                </p>
                <p>
                  {this.props.t('Our Service may contain links to third-party web sites or services that are not owned or controlled by astroking.')}
                </p>
                <p>
                  {this.props.t('astroking has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that astroking shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.')}
                </p>
                <p>
                  {this.props.t('We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.')}
                </p>
                <p className="about-header">
                  {this.props.t('Termination')}
                </p>
                <p>
                  {this.props.t('We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.')}
                </p>
                <p>
                  {this.props.t('All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.')}
                </p>
                <p>
                  {this.props.t('We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.')}
                </p>
                <p>
                  {this.props.t('Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.')}
                </p>
                <p>
                  {this.props.t('All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.')}
                </p>
                <p className="about-header">
                  {this.props.t('Governing Law')}
                </p>
                <p>
                  {this.props.t('These Terms shall be governed and construed in accordance with the laws of Delhi, India, without regard to its conflict of law provisions.')}
                </p>
                <p>
                  {this.props.t('Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.')}
                </p>
                <p className="about-header">
                  {this.props.t('Changes')}
                </p>
                <p>
                  {this.props.t('We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 60 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.')}
                </p>
                <p>
                  {this.props.t('By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.')}
                </p>
                <p>{this.props.t('Contact Us')}</p>
                <p><b>A-130, Sector 63, Noida, Gautam Budh Nagar, Uttar Pradesh, 201301, India</b></p>
                <p>{this.props.t('If you have any questions about these Terms, please contact us.')}</p>
              </div>

            }

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

export default withCombine(Disclaimer);
