import React, { useEffect, useState } from "react";
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
import * as Constant from "../configuration/constants";
import { postApi } from "../configuration/apis";
import { getCommonHeaders, SEO } from "../configuration/commonFunctions";
import * as ErrorConstant from "../configuration/errorConstants";
import { FRONTEND_NAME } from "../configuration/constants";
import parse from 'html-react-parser';
// import Signup from "./signup";
// import BottomHeader from "../common/BottomHeader";
import AboutBanner from '../images/readmorebanner.png'
import PageBanner from "../common/pageBanner";
import Support from "../components/Support";
import { withTranslation } from 'react-i18next';
import { compose } from 'redux'
import $ from 'jquery';
import Chat_Talk_Header from "../common/Chat&Talk_Header";
// import { faL } from "@fortawesome/free-solid-svg-icons";

var IsShow = false;

function About(props) {
  const [state, setState] = useState({
    aboutUsList: null,
    isloggedin: localStorage["isUserLoggedIn"] ? true : false,
    displaySignupPopUp: false,
    loginSelected: true,
    showSupport: IsShow,
    isSuccess: false,
    showPopUp: false,
    msg: ""
  })



  useEffect(() => {
    getaboutUs();
  }, [state.showSupport]);

  useEffect(() => {
    $('.contactBtn').click(function () {
      setState({
        ...state,
        showSupport: true
      })
    })
  })


  const openTab = (pageName) => {
    if (pageName == "support") {
      setState({
        ...state,
        showSupport: true
      })
    }
    else
      props.history.push(FRONTEND_NAME + pageName);
  }


  const closeSupport = (key) => {

    if (key == "success") {
      setState({
        isSuccess: true,
        msg: "Support form has been succesfully submitted.",
        showPopUp: true
      })
    } else if (key == "fail") {
      setState({
        isSuccess: false,
        msg: "Some error ocurred in submitting the form.",
        showPopUp: true
      })
    }
    else if (key == "error") {
      setState({
        isSuccess: false,
        msg: this.props.t('Please_enter_a_valid_mobile_number'),
        showPopUp: true
      })
    }
    setState({
      showSupport: false
    })
  }


  const getaboutUs = () => {
    console.log("inside getaboutUs method");
    var url = Constant.ASTRO_URL + Constant.GET_LOYALTY_PROGRAMME_INFO;
    const body = {
      category: "MALL",
      subCategory: "",
    };
    const headers = getCommonHeaders();
    console.log("body", body);
    postApi(url, headers, body)
      .then((response) => response.data)
      .then((data) => {
        if (data && data.code == ErrorConstant.SUCCESS_CODE) {
          console.log("data ", data.data.aboutProgramData);
          try {
            setState({
              ...state,
              aboutUsList: data.data.aboutProgramData,
              enableLoader: true,
            });
          } catch (error) {
            console.log("exception occured");
            setState({ enableLoader: false });
          }
        } else {
          console.log(
            "Error code from getProductcatalog API : ",
            data.code,
            "with msg : ",
            data.msg
          );
          setState({ enableLoader: false });
        }
      })
      .catch((error) => {
        console.log();
        console.error("error", error);
        setState({ enableLoader: false });
      });
  };


  const { t } = props;
  const { aboutUsList } = state;


  return (
    <>
      <SEO
        title="About astroking - Your Trusted Source for Astrology Readings"
        description="Learn more about astroking, your trusted source for accurate astrology readings. Discover our team of experienced astrologers and our commitment to providing insightful guidance for your personal and professional life."
      />
      <Chat_Talk_Header
        IsNavIconTrue={false}
        IsSearchTrue={false}
        IsFilterTrue={false}
        // editSearchTerm={this.editSearchTerm}
        // editSortTerm={this.editSortTerm}
        // IsMob_Side_Nave={this.IsMob_Side_Nave}
        propsData={props}
        CustomClass={true}
        IsTitleTrue={true}
        title={t('About_us')}
      />
      <Header
        IsActive_header_Or_not="chat_and_talk_header-"
      />
      <PageBanner Banner={''} title={t('About_us')} />
      {state.showSupport ? <Support closeSupport={closeSupport} /> : ""}
      <div className="container">
        <div className="row page-body" style={{ marginBottom: "50px" }}>
          <div className="col-md-12 col-lg-12 col-sm-12 mg-top-42 padd-0 mg-tpp">

            <div
              className="float-right padd-0 text-left widd-100 pdd-img about_container">
              {aboutUsList ?
                <>
                  <p className="about-header">{aboutUsList.programTitle}</p>
                  {parse(("" + aboutUsList.programText))}
                </> :
                <div className="col">
                  <p className="text-center pdb25" >{t('No_Data_Found')}</p>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
      <Footer history={props} />
    </>
  );

}


const withCombine = compose(
  withRouter,
  withTranslation()
)

export default withCombine(About);
