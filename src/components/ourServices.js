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

// import PageHeader from "../common/PageHeader";
// import * as Constant from "../configuration/constants";
// import { getApi, postApi } from "../configuration/apis";
// import { getCommonHeaders } from "../configuration/commonFunctions";
// import * as ErrorConstant from "../configuration/errorConstants";
// import { FRONTEND_NAME } from "../configuration/constants";
import Signup from "./signup";
// import BottomHeader from "../common/BottomHeader";
import PageBanner from "../common/pageBanner";
import ServicesBanner from '../images/readmorebanner.png'

class OurServices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ourServices: this.props.location.state.ourServices,
      isloggedin: localStorage["isUserLoggedIn"] ? true : false,
      displaySignupPopUp: false,
      loginSelected: true,
    };
  }

  componentDidMount() {}
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
    const { aboutUsList } = this.state;
    return (
      <>
      <Header
            openLoginPopup={this.openLoginPopup}
            openSignupPopup={this.openSignupPopup}
            isLogin={this.state.loginSelected}
          />
          {/* <BottomHeader /> */}
          <PageBanner title="Our Services " Banner = {ServicesBanner} />
          
        <div className="container mt-5">
          
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
          {/* <PageHeader name={{ firstname: "", lastname: "Services" }} /> */}
          <div className="row page-body" style={{ marginBottom: "50px" }}>
            {this.state.ourServices.bannerPath != null ? (
              <div className="col-md-12 col-lg-12 col-sm-12 mg-top-42 padd-0">
                <div className="col-sm-4 col-md-4 col-lg-4 float-left pd-left">
                  <img
                  alt="services"
                    src={this.state.ourServices.bannerPath}
                    className="about-img"
                  ></img>
                </div>
                <div className="col-sm-8 col-md-8 col-lg-8 float-right padd-0 text-left ">
                  <p className="about-header">{this.state.ourServices.title}</p>
                  <p>“{this.state.ourServices.longDescription}”</p>
                </div>
              </div>
            ) : (
              <div className="col-sm-12 col-md-12 col-lg-12 float-left padd-0 text-left  ">
                <p className="about-header">{this.state.ourServices.title}</p>
                <p>“{this.state.ourServices.longDescription}”</p>
              </div>
            )}
          </div>
        </div>
        <div>
          <Footer history={this.props}/>
        </div>
      </>
    );
  }
}

export default withRouter(OurServices);
