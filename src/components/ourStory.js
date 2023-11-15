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
// import * as Constant from "../configuration/constants";
// import { getApi, postApi } from "../configuration/apis";
import { getCommonHeaders } from "../configuration/commonFunctions";
// import * as ErrorConstant from "../configuration/errorConstants";
// import { FRONTEND_NAME } from "../configuration/constants";
import Loading from "./loader";
import Signup from "./signup";
// import BottomHeader from "../common/BottomHeader";
import PageBanner from "../common/pageBanner";
import BannerImg from '../images/readmorebanner.png';
import { withTranslation } from 'react-i18next';
import { compose } from 'redux'

class OurStory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ourStoryData: [],
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
    this.fetchOurStoryData(true);
  }
  fetchOurStoryData = (flag) => {
    var headers = getCommonHeaders();
    /* if(flag)
   {
     headers.accessToken = this.state.userProfile.accessToken;
   }
   else{
     headers.accessToken = null;
   }*/
    var requestBody = {
      category: "Home",
      subCategory: "story",
    };
    apis
      .ourStory(requestBody, headers)
      .then((response) => response.data)
      .then((data) => {
        console.log("resp data", data);
        if (data.code == "2000") {
          ////debugger;
          {
            console.log("ourStoryData" + data.data.productDetails);
          }

          this.setState({
            ourStoryData: data.data.productDetails[0],
            enableLoader: true,
          });
        } else {
          /*else if(data.code == "2009")
          {
            this.fetchOurStoryData(false);
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
    const { t } = this.props;
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
        <PageBanner title={t('Our_Story')} Banner={BannerImg} />
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
          {this.state.enableLoader ? null : <Loading />}
          <div className="row mt-5 mb-5">
            <div className="col-md-6">
              <img src={this.state.ourStoryData.productImage} width="100%" alt="product" />
            </div>
            <div className="col-md-6 d-flex_A">
              <h4> {this.state.ourStoryData.programTitle}</h4>
              <p>“{this.state.ourStoryData.productDescription}” </p>
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

export default withCombine(OurStory);
