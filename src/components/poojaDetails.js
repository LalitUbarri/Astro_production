import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Header from "../common/Header2";
// import HeaderMenu from "../common/HeaderMenu";
import PageHeader from "../common/PageHeader";
import SideMenu from "../common/SideMenu";
import Footer from "../common/Footer";
// import PoojaVideo from './poojaVideo';
// import previous from "../images/previous.svg";
// import next from "../images/next.svg";
// import store from "../images/store.png";
// import comment from "../images/comment.svg";
import apis from "../configuration/apis";
// import * as Constant from "../configuration/constants";
// import { getApi, postApi } from "../configuration/apis";
// import { getCommonHeaders } from "../configuration/commonFunctions";
// import * as ErrorConstant from "../configuration/errorConstants";
import { FRONTEND_NAME } from "../configuration/constants";
// import $ from "jquery";
// import PropTypes from "prop-types";
// import ReactPaginate from "react-paginate";
import Loading from "./loader";
import Signup from "./signup";
// import BottomHeader from "../common/BottomHeader";
import { useTranslation } from "react-i18next";
import moment from 'moment';

const PoojaDetails = (props) => {
  const [redemptionItem, setRedemptionItem] = useState();

  const [pooja, setPooja] = useState(props.location.state && props.location.state.kundaliFormData ? props.location.state.kundaliFormData : null);

  const [enableLoader, setEnableLoader] = useState(false);

  const [displaySignupPopUp, setDisplaySignupPopUp] = useState(false);
  const [loginSelected, setLoginSelected] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    localStorage["userProfile"] ? true : false
  );
  // const [showPlayer, setShowPlayer] = useState(true)

  const [t] = useTranslation();

  useEffect(() => {
    if (!(props.location.state && props.location.state.kundaliFormData)) {
      props.history.push({
        pathname: FRONTEND_NAME + "/pooja"
      })
    }
    getProductBilling();
  }, []);

  //console.log("props", props.location.state.kundaliFormData)

  const getProductBilling = () => {
    var requestBody = {
      value: pooja
    };

    apis.getPoojaOrderDetails(requestBody).then((response) => {
      var data = response.data;
      console.log("getPoojaOrderDetails", data.data);
      if (data.code == 2000) {
        // setRedemptionList(data.data)
        setRedemptionItem(data.data);
        // checkJoinNow();
        setEnableLoader(true);
      } else {
        console.log("ERROR", data.msg);
      }
    });
  };


  const openLoginPopup = () => {
    setDisplaySignupPopUp(true);
    setLoginSelected(true);
  };

  const openSignupPopup = () => {
    setDisplaySignupPopUp(true);
    setLoginSelected(false);
  };
  const closeSignUpPopup = () => {
    setDisplaySignupPopUp(false);
  };

  const closePopupOnLogin = () => {
    setDisplaySignupPopUp(false);
    setIsUserLoggedIn(true);

    localStorage["isUserLoggedIn"] = true;
  };

  const joinNow = () => {
    if (!checkJoinNow()) return;
    else {
      if (redemptionItem.isOffline === 0 && redemptionItem.poojaVideoUrl) {
        window.open(redemptionItem.poojaVideoUrl, "_blank")
      }
      else {
        props.history.push({
          pathname: FRONTEND_NAME + "/playpooja",
          state: {
            bestStartTime: redemptionItem.bestStartTime,
            bestEndTime: redemptionItem.bestEndTime,
            poojaVideoUrl: redemptionItem.poojaVideoUrl
          }
        })
        //window.open(redemptionItem.poojaVideoUrl, "_blank")
      }


    }
  }

  const checkJoinNow = () => {
    if ((!redemptionItem.bestStartTime || !redemptionItem.bestEndTime || !redemptionItem.poojaVideoUrl)) return false;

    let startTime = new Date(redemptionItem.bestStartTime).getTime();
    let endTime = new Date(redemptionItem.bestEndTime).getTime();
    let currentTime = new Date().getTime();

    if (currentTime < startTime || currentTime > endTime) {
      return false;
    }

    return true;
  }


  return (
    <>
      <Header
        openLoginPopup={openLoginPopup}
        openSignupPopup={openSignupPopup}
        isLogin={loginSelected}
      />
      {/* <BottomHeader /> */}
      <div className="container">

        {displaySignupPopUp && (
          <Signup
            openLoginPopup={openLoginPopup}
            openSignupPopup={openSignupPopup}
            closePopUp={closeSignUpPopup}
            closeOnLogin={closePopupOnLogin}
            isLogin={loginSelected}
          />
        )}
        {/* <HeaderMenu /> */}
        <PageHeader
          name={{ firstname: "ASTRO", lastname: "POOJA" }}
        />
        {enableLoader ?
          <div className="page-body">
            <div className="row">
              <div className="col-12 col-md-3 mobsidemenu">
                <SideMenu />
              </div>
              <div className="col-md-9 mobChatlist">

                <div
                  className="loadMore mb-3" style={{ cursor: 'pointer' }}
                  onClick={() => {
                    sessionStorage["productcatalogItem"] = "OnlinePuja";
                    sessionStorage["productcatalogItemTitle"] = t("Online Puja");
                    props.history.push({
                      pathname: FRONTEND_NAME + "/astrologyStore"
                    })
                  }}
                >
                  {t('BUY MORE PUJA')}
                </div>
                {/* {JSON.stringify(redemptionItem)} */}
                <div className="row">
                  <div className="col-md-4 pooja-box">
                    <div className="pooja-title">
                      {t('Order ID')}
                    </div>
                    <div className="desc">
                      {redemptionItem.id}
                    </div>
                  </div>
                  <div className="col-md-4 pooja-box">
                    <div className="pooja-title">
                      {t('Panditji Name')}
                    </div>
                    <div className="desc">
                      {redemptionItem.panditName && redemptionItem.panditName.length > 0 ? redemptionItem.panditName : t("N/A")}
                    </div>
                  </div>

                  <div className="col-md-4 pooja-box">
                    <div className="pooja-title">
                      {t('Participants')}
                    </div>
                    <div className="desc">
                      {redemptionItem.participants && redemptionItem.participants.length > 0 ? redemptionItem.participants : t("N/A")}
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-4 pooja-box">
                    <div className="pooja-title">
                      {t('Start time')}
                    </div>
                    <div className="desc">
                      {redemptionItem.bestStartTime && redemptionItem.bestStartTime.length > 0 ? moment(redemptionItem.bestStartTime).format('hh:mm A ,Do MMMM YYYY ') : t("N/A")}
                    </div>
                  </div>

                  <div className="col-md-4 pooja-box">
                    <div className="pooja-title">
                      {t('End time')}
                    </div>
                    <div className="desc">
                      {redemptionItem.bestEndTime && redemptionItem.bestEndTime.length > 0 ? moment(redemptionItem.bestEndTime).format('hh:mm A ,Do MMMM YYYY ') : t("N/A")}
                    </div>
                  </div>

                  <div className="col-md-4 pooja-box">
                    <div className="pooja-title">
                      {t('Best Time')}
                    </div>
                    <div className="desc">
                      {redemptionItem.bestTime && redemptionItem.bestTime.length > 0 ? redemptionItem.bestTime : t("N/A")}
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12 pooja-box">
                    <div className="pooja-title">
                      {t('Pooja Description')}
                    </div>
                    <div className="desc">
                      {redemptionItem.goodsDescription && redemptionItem.goodsDescription.length > 0 ? redemptionItem.goodsDescription : t("N/A")}
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12 pooja-box">
                    <div className="pooja-title">
                      {t('Preparation and Ingredients')}
                    </div>
                    <div className="desc">
                      <div dangerouslySetInnerHTML={{ __html: redemptionItem.preparationAndIntegration && redemptionItem.preparationAndIntegration.length > 0 ? redemptionItem.preparationAndIntegration : t("N/A") }} ></div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4"></div>
                  <div className="col-md-4 mb-5 mt-5">
                    <button className={checkJoinNow() ? "loadMore btn-green" : "loadMore btn-gray"}
                      onClick={joinNow}
                    >
                      {t('Join Now')}
                    </button>
                  </div>
                  <div className="col-md-4"></div>
                </div>
              </div>
            </div>
          </div>
          : <Loading />}
      </div>
      <Footer history={props} />
    </>
  );
};

export default withRouter(PoojaDetails);
