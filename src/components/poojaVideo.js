import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../common/Header2";
import Loading from "./loader";
import { FRONTEND_NAME } from "../configuration/constants";
import ReactPlayer from "react-player";

const PoojaVideo = (props) => {
  const [t] = useTranslation();
  const [loading, setLoading] = useState(true);
  const [enableLoader, setEnableLoader] = useState(false);

  const [displaySignupPopUp, setDisplaySignupPopUp] = useState(false);
  const [loginSelected, setLoginSelected] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    localStorage["userProfile"] ? true : false
  );


  useEffect(() => {
    console.log(props.location.state)
    if (typeof props.location.state !== 'undefined') {
      if (!checkJoinNow(props.location.state.poojaVideoUrl, props.location.state.bestStartTime, props.location.state.bestEndTime)) {
        props.history.push({
          pathname: FRONTEND_NAME + "/pooja"
        })
      }
    }
    else setLoading(false);
  }, []);

  const checkJoinNow = (videoUrl, bestStartTime, bestEndTime) => {
    if ((!bestStartTime || !bestEndTime || !videoUrl)) return false;
    let startTime = new Date(bestStartTime).getTime();
    let endTime = new Date(bestEndTime).getTime();
    let currentTime = new Date().getTime();

    if (currentTime < startTime || currentTime > endTime) {
      return false;
    }

    return true;
  }

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

  return (
    <>
      <Header
        openLoginPopup={openLoginPopup}
        openSignupPopup={openSignupPopup}
        isLogin={loginSelected}
      />
      {typeof props.location.state === 'undefined' ? <div className="poojaNotFound"><h2> Pooja not found.</h2></div> : <>
        {loading ?
          <Loading />
          :
          <div className="mt-4">
            <video width="95%" controls>
              <source src={props.location.state.poojaVideoUrl} type="video/mp4" />
            </video>
          </div>
        }
      </>}
    </>
  );
};

export default withRouter(PoojaVideo);
