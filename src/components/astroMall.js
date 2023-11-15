import React from "react";
import { withRouter } from "react-router-dom";
// import about from "../images/about.png";
import "../styles/about.css";
import '../styles/astroMall.css';
import Header from "../common/Header2";
// import HeaderMenu from "../common/HeaderMenu";
import Footer from "../common/Footer";
import PageHeader from "../common/PageHeader";
import SideMenu from "../common/SideMenu";
import { postApi } from "../configuration/apis";
import * as Constant from '../configuration/constants';
import * as ErrorConstant from '../configuration/errorConstants';
import { getCommonHeaders, ScrollTop } from '../configuration/commonFunctions';
import User from "../images/user.svg";
import { FRONTEND_NAME } from "../configuration/constants";
import Signup from "./signup";
import Chat_Talk_Header from "../common/Chat&Talk_Header";
import { withTranslation } from 'react-i18next';
import { compose } from 'redux'
// import BottomHeader from "../common/BottomHeader";


class AstroMall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productcatalogList: [],
      displayMyLanguages: false,
      isloggedin: localStorage["isUserLoggedIn"] ? true : false,
      displaySignupPopUp: false,
      loginSelected: true
    }
  }
  componentDidMount() {
    this.getProductcatalog();
    //this.fetchcountryCode();

  }
  getProductcatalog = () => {
    console.log("inside getProductcatalog method");
    var url = Constant.ASTRO_URL + Constant.GET_PRODUCT_CATALOG;
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
              productcatalogList: data.data.productDetails,
              enableLoader: true
            });
          }
          catch (error) {
            console.log("exception occured")
            //this.toggleShowMsg("Something went wrong");
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
  openSubCategory = (subCategory, title) => {
    // window.open(FRONTEND_NAME + "/astrologyStore");
    sessionStorage["productcatalogItem"] = subCategory;
    sessionStorage["productcatalogItemTitle"] = title;
    this.props.history.push(FRONTEND_NAME + "/astrologyStore");
    ScrollTop(0);
  }

  openMyLanuages = () => {
    this.setState({
      displayMyLanguages: true
    })
  }
  closeLanguagePopup = () => {
    this.setState({
      displayMyLanguages: false
    })
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
    const { t } = this.props;
    const { productcatalogList, displaySignupPopUp, loginSelected } = this.state;
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
          title={t('ONLINE_ASTROLOGY_STORE')}
        />
        <Header
          IsActive_header_Or_not="chat_and_talk_header-"
          openLoginPopup={this.openLoginPopup}
          openSignupPopup={this.openSignupPopup}
          isLogin={this.state.loginSelected}
        />
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
          {/* {displayMyLanguages && <Language closePopup={() => this.closeLanguagePopup()} />} */}
          {/* <HeaderMenu /> */}
          <PageHeader Mob_HeaderIsTrue={'not_show_mob_header1'} name={{ firstname: "ONLINE", lastname: "ASTROLOGY STORE" }} />
          <div className="row">
            <div className="col-md-3 astro_mob">
              <SideMenu displayMyLanguages={this.openMyLanuages} />
            </div>
            <div className="astroMall_container">
              <div className="astroMall_inner_container mt-5">
                {productcatalogList && productcatalogList.length > 0 &&
                  productcatalogList.map((item, index) => (
                    <div className="astroMall_card"
                      onClick={() => this.openSubCategory(item.productTitleKey, item.productTitle)}
                    >
                      <div className="astroMall_img">
                        <img src={item.productImage ? item.productImage : User} alt="img"/>
                      </div>
                      <p className="astroMall_heading">{item.productTitle}</p>
                    </div>
                  ))}
              </div>
            </div>


            <div>
              {/* <div className="col-md-9">
              <div className="row page-body">
                <div className="col-md-12 col-lg-12 col-sm-12 mall-item-div">
                  {productcatalogList && productcatalogList.length > 0 &&
                    productcatalogList.map((item, index) => (
                      <div className="col-sm-4 col-md-4 col-lg-4 float-left mobAstromall">
                        <div className="mall-item" onClick={() => this.openSubCategory(item.productTitleKey, item.productTitle)}>
                          <div className="mall-item-img">
                            <img src={item.productImage ? item.productImage : User} />
                          </div>
                          <p className="mall-item-p">{item.productTitle}</p>
                        </div>
                      </div>
                    ))
                  }
                  {/* <div className="col-sm-4 col-md-4 col-lg-4 float-left">
                    <div className="mall-item">
                      <div className="mall-item-img"></div>
                      <p className="mall-item-p">Online Puja</p>
                    </div>
                  </div>
                  <div className="col-sm-4 col-md-4 col-lg-4 float-left">
                    <div className="mall-item">
                      <div className="mall-item-img"></div>
                      <p className="mall-item-p">Online Puja</p>
                    </div>
                  </div>
                  <div className="col-sm-4 col-md-4 col-lg-4 float-left">
                    <div className="mall-item">
                      <div className="mall-item-img"></div>
                      <p className="mall-item-p">Online Puja</p>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
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

export default withCombine(AstroMall);
