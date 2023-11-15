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
import Signup from "./signup";
import PageHeader from "../common/PageHeader";
import * as Constant from '../configuration/constants';
import { getApi, postApi } from "../configuration/apis";
import { getCommonHeaders } from '../configuration/commonFunctions';
import * as ErrorConstant from '../configuration/errorConstants';
import { FRONTEND_NAME } from "../configuration/constants";
import BottomHeader from "../common/BottomHeader";
import PageBanner from "../common/pageBanner";
import BannerImg from '../images/readmorebanner.png';


class PricingPolicy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: null,
      isloggedin: localStorage['isUserLoggedIn'] ? true : false,
      displaySignupPopUp: false,
      loginSelected: true
    }
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

    return (
      <>
        <Header
          openLoginPopup={this.openLoginPopup}
          openSignupPopup={this.openSignupPopup}
          isLogin={this.state.loginSelected}
        />
        {/* <BottomHeader /> */}
        <PageBanner title='Pricing Policy' Banner={BannerImg} />
        <div className="container mt-5">
          {displaySignupPopUp && <Signup openLoginPopup={this.openLoginPopup} openSignupPopup={this.openSignupPopup} closePopUp={this.closeSignUpPopup} closeOnLogin={this.closePopupOnLogin} isLogin={loginSelected} />}

          {/* <HeaderMenu /> */}
          {/* <PageHeader name={{ firstname: "Pricing", lastname: "Policy" }} /> */}
          <div className="row page-body">
            {
              this.state.imgUrl != null ?

                <div className="col-md-12 col-lg-12 col-sm-12 mg-top-42 padd-0">
                  <div className="col-sm-4 col-md-4 col-lg-4 float-left pd-left">
                    <img src={about} className="about-img" alt="about"></img>
                  </div>
                  <div className="col-sm-8 col-md-8 col-lg-8 float-right padd-0 text-left">
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


                <div className="col-sm-12 col-md-12 col-lg-12 float-left padd-0 text-left ">
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

            }

          </div>
        </div>
        <Footer history={this.props} />
      </>
    );
  }
}

export default withRouter(PricingPolicy);
