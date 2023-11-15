import React from "react";
import { withRouter } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "jquery/dist/jquery.min";
import about from "../images/about.png";
import "../styles/about.css";
import Header from "../common/Header2";
import HeaderUser from "../common/HeaderUser";
import HeaderMenu from "../common/HeaderMenu";
import Footer from "../common/Footer";

import PageHeader from "../common/PageHeader";
import * as Constant from '../configuration/constants';
import { getApi, postApi } from "../configuration/apis";
import { getCommonHeaders } from '../configuration/commonFunctions';
import * as ErrorConstant from '../configuration/errorConstants';
import { FRONTEND_NAME } from "../configuration/constants";
import Signup from "./signup";
import BottomHeader from '../common/BottomHeader';
import PageBanner from '../common/pageBanner';
import BannerImg from '../images/readmorebanner.png';
import { withTranslation } from 'react-i18next';
import { compose } from 'redux'


class RefundPolicy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: null,
      isloggedin: localStorage['isUserLoggedIn'] ? true : false,
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
            this.toggleShowMsg("Something went wrong");
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
    this.setState({
      displaySignupPopUp: true,
      loginSelected: true
    })
  }

  openSignupPopup = () => {
    this.setState({
      displaySignupPopUp: true,
      loginSelected: false
    });
  }
  closeSignUpPopup = () => {
    this.setState({
      displaySignupPopUp: false
    });
  }


  closePopupOnLogin = () => {
    this.setState({
      displaySignupPopUp: false,
      isUserLoggedIn: true
    });
    localStorage['isUserLoggedIn'] = true;
  }
  render() {
    const { displaySignupPopUp, loginSelected } = this.state;
    const { aboutUsList } = this.state;
    const { t } = this.props;
    return (
      <>
        <Header
          openLoginPopup={this.openLoginPopup}
          openSignupPopup={this.openSignupPopup}
          isLogin={this.state.loginSelected}
        />
        {/* <BottomHeader /> */}
        <PageBanner title={t('Refund Policy')} Banner={''} />
        <div className="container">

          {displaySignupPopUp && <Signup openLoginPopup={this.openLoginPopup} openSignupPopup={this.openSignupPopup} closePopUp={this.closeSignUpPopup} closeOnLogin={this.closePopupOnLogin} isLogin={loginSelected} />}

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

              <div className="col-sm-12 col-md-12 col-lg-12 float-left padd-0 text-left mt-5">
                <p className="about-header mb-3">
                  <strong>{t('Cancellation and refund policy')}</strong>
                </p>
                <p>
                  {t('astroking Cancellation policy is liberal and it is defined considering its customers fever in mind. Here is the cancellation policy:')}
                </p>
                <ul>
                  <li>
                    {t('Cancellations will be considered only if the request is made within 72 hours of placing an order. However, the cancellation request will not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.')}
                  </li>
                  <li>
                    {t('There is no cancellation of orders placed under the Same Day Delivery category.')}
                  </li>
                  <li>
                    {t('No cancellations are entertained for those products that the Accurate Astrologers marketing team has obtained on special occasions like Durga Puja, Dipabali, New Year etc. These are limited occasion offers and therefore cancellations are not possible.')}
                  </li>
                  <li>
                    {t('Astrology consultancy services are provided over email and will not be cancelled or refunded. Only products like gemstones, etc which are shipped to the user are eligible for cancellation.')}
                  </li>
                  <li>
                    {t('In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within 24 hours of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision.')}
                  </li>
                </ul>
                <p className="about-header">
                  {t('astroking Refund Policy')}
                </p>
                <p>
                  {t(`When you buy our products/services, your purchase is covered by our refund policy a 30-day money-back guarantee. We provide astrology services and have thousands of satisfied customers worldwide, and our support is second to none. Astrology consultancy services which are provided over email can not be refunded. Goods sent through courier have a limited refund policy. The charges of the courier would not be refunded and product's cost would be refunded on receiving the good in its original form from you. Refunds are not being provided for services delivered in full such as installation service and knowledge-based services. Refunds are processed within 30 days period.`)}

                </p>


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

export default withCombine(RefundPolicy);
