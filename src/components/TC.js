import React from "react";
import { withRouter } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "jquery/dist/jquery.min";
// import about from "../images/about.png";
import "../styles/about.css";
import Header from "../common/Header2";
// import HeaderUser from "../common/HeaderUser";
// import HeaderMenu from "../common/HeaderMenu";
import Footer from "../common/Footer";
import apis from "../configuration/apis";
// import PageHeader from "../common/PageHeader";
// import { getApi, postApi } from "../configuration/apis";
import { getCommonHeaders } from "../configuration/commonFunctions";
// import * as ErrorConstant from "../configuration/errorConstants";
// import { FRONTEND_NAME } from "../configuration/constants";
import Loading from "./loader";
import Signup from "./signup";
import parse from 'html-react-parser';
// import BottomHeader from "../common/BottomHeader";
import PageBanner from "../common/pageBanner";
import TcBanner from '../images/readmorebanner.png'

import { withTranslation } from 'react-i18next';
import { compose } from 'redux'
import Chat_Talk_Header from "../common/Chat&Talk_Header";

class TC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: null,
      policyData: {},
      userProfile: localStorage["userProfile"]
        ? JSON.parse(localStorage["userProfile"])
        : {},
      enableLoader: false,
      isloggedin: localStorage["isUserLoggedIn"] ? true : false,
      displaySignupPopUp: false,
      loginSelected: true,
    };
  }

  componentDidMount() {
    this.fetchPrivacyPolicy(true);
  }
  fetchPrivacyPolicy = (flag) => {
    console.log("inside fetchPrivacyPolicy method");

    var headers = getCommonHeaders();
    /* if(flag)
    {
      headers.accessToken = this.state.userProfile.accessToken;
    }
    else{
      headers.accessToken = null;
    }*/
    //headers.accessToken = null;
    console.log("headers>>>>>>>" + headers.accessToken);

    apis
      .fetchPrivacyPolicy(headers)
      .then((response) => response.data)
      .then((data) => {
        console.log("resp data", data);
        if (data.code == "2000") {
          ////debugger;
          {
            console.log("fetchPrivacyPolicy" + data.data.privacyPolicyData[0]);
          }

          this.setState({
            policyData: data.data.privacyPolicyData[1],
            enableLoader: true,
          });
        } else {
          /*  else if(data.code == "2009")
        {
          this.setState({enableLoader:false});
          this.fetchPrivacyPolicy(false);
          
          //this.props.history.push({pathname:FRONTEND_NAME+"/home"})
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
    console.log(this.props.location.state);
    console.log(this.props);
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
          title={this.props.t('Terms & Conditions')}
          redirection={this.props.location.state === undefined ? '' : this.props.location.state.state.user}
        />
        <Header
          IsActive_header_Or_not="chat_and_talk_header-"
          openLoginPopup={this.openLoginPopup}
          openSignupPopup={this.openSignupPopup}
          isLogin={this.state.loginSelected}
        />
        {/* <BottomHeader /> */}
        <PageBanner Banner={''} title={this.props.t('Terms & Conditions')} />
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
          {/* <PageHeader name={{ firstname: "Terms &", lastname: "Conditions" }} /> */}
          {this.state.enableLoader ? null : <Loading />}
          <div className="row page-body">
            {/*
            {this.state.imgUrl != null ? (
              <div className="col-md-12 col-lg-12 col-sm-12 mg-top-42 padd-0">
                <div className="col-sm-4 col-md-4 col-lg-4 float-left pd-left">
                  <img src={about} className="about-img"></img>
                </div>
                <div className="col-sm-8 col-md-8 col-lg-8 float-right padd-0 text-left ">
                  <p className="about-header">
                    {this.state.policyData.policyTitle}
                  </p>
                  <p>“{this.state.policyData.policyDescription}”</p>
                </div>
              </div>
            ) : 
            */}

            <div className="col-sm-12 col-md-12 col-lg-12 float-left padd-0 text-left">
              <strong><p className="about-header mt-5">
                {this.props.t(this.state.policyData.policyTitle)}
              </p></strong>
              <div className="termsouter">
                {parse("" + (this.state.policyData.policyDescription))}
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

export default withCombine(TC);
