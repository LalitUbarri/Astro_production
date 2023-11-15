import React, { useEffect, useState } from 'react'
import Homeicon from '../images/newImages/Group 22456.svg';
import MatchingIcon from '../images/newImages/Group 16.svg';
import Kundaliicon from '../images/newImages/Group 30.svg';
import Dailyicon from '../images/newImages/Group 24.svg';
import Homeicon1 from '../images/newImages/Group 22452.svg';
import MatchingIcon1 from '../images/newImages/Group 22460.svg';
import Kundaliicon1 from '../images/newImages/Group 22546.svg';
import Dailyicon1 from '../images/newImages/Group 22454.svg';
import { FRONTEND_NAME, HTTP1 } from "../configuration/constants";
import { getCommonHeaders } from '../configuration/commonFunctions'
import apis from '../configuration/apis';
// import Popup from "../components/popupChat"
// import Signup from "../components/signup";
import { useTranslation } from 'react-i18next';
import { withRouter } from "react-router-dom";

const Popup = React.lazy(() => import('../components/popupChat'))
const Signup = React.lazy(() => import('../components/signup'))

function BottomTab(props) {
    // console.log(props);
    const [t, i18n] = useTranslation();

    const [isSuccess, setIsSuccess] = useState(false);
    const [msg, setMsg] = useState("");
    const [showPopUp, setShowPopUp] = useState(false);
    const [showSupport, setShowSupport] = useState(false);
    const [countryCode, setCountryCode] = useState();
    const [HeaderData, setHeaderData] = React.useState({
        isUserLoggedIn: localStorage["msisdn"] ? true : false,
        isChatActive: false,
        displaySignupPopUp: false,
        loginSelected: true,
    })
    let userLoggedIn = localStorage["msisdn"] ? true : false;

    const shouldOpenLoginPopup = () => {
        setHeaderData({
            ...HeaderData,
            displaySignupPopUp: true,
            loginSelected: true,
        });
    };
    const openLoginPopup = () => {
        setHeaderData({
            ...HeaderData,
            displaySignupPopUp: true,
            loginSelected: true,
        })
    }
    const openSignupPopup = () => {
        setHeaderData({
            ...HeaderData,
            displaySignupPopUp: true,
            loginSelected: false,
        });
        // props.history.push(FRONTEND_NAME + "/home/#Signup")
    };

    const closeSignUpPopup = () => {
        setHeaderData({
            ...HeaderData,
            displaySignupPopUp: false,
        });
    };

    const closePopupOnLogin = () => {
        localStorage["isUserLoggedIn"] = true;
        setHeaderData({
            ...HeaderData,
            displaySignupPopUp: false,
            isUserLoggedIn: true,
        });
        this.props.history.push(FRONTEND_NAME + "/home");
    };

    const fetchcountryCode = () => {
        var headers = getCommonHeaders();
        let dataToPush = [];

        apis
            .getCountryCode(headers)
            .then((response) => response.data)
            .then((data) => {
                if (data.code == '2000') {
                    // alert(JSON.stringify(data.data))
                    data.data.forEach(d => {
                        dataToPush.push(d.countryCode);
                    });

                    setCountryCode(dataToPush)
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }
    useEffect(() => {
        fetchcountryCode();
    }, [])

    const closePopUp = () => {
        setShowPopUp(false);
    }

    // console.log(window.location.href);
    return (
        <>
            {HeaderData.displaySignupPopUp && (
                <Signup
                    openLoginPopup={openLoginPopup}
                    openSignupPopup={openSignupPopup}
                    closePopUp={closeSignUpPopup}
                    closeOnLogin={closePopupOnLogin}
                    isLogin={HeaderData.loginSelected}
                    countryCode={countryCode}
                />
            )}
            {showPopUp && (
                <Popup msg={msg} isSuccess={isSuccess} closePopUp={closePopUp} />
            )}
            <div className="bottomTab_container">
                <div className="bottom_inner_container">
                    <div className="tab_container d-flex align-items-center justify-content-between">
                        <div className="tab_card" onClick={() => props.data.history.push({ pathname: FRONTEND_NAME + "/home" })}>
                            <div className="imgtab mb-1">
                                <img src={
                                    window.location.href === (HTTP1 + FRONTEND_NAME + "/") ||
                                        window.location.href === (HTTP1 + FRONTEND_NAME + "/home") ? Homeicon1 : Homeicon
                                } alt="home" width="20px" />
                            </div>
                            <p style={
                                window.location.href === HTTP1 + FRONTEND_NAME + "/" ||
                                    window.location.href === HTTP1 + FRONTEND_NAME + "/home" ? { color: "#fd9940" } : null
                            }> {t('Home')} </p>
                        </div>

                        <div className="tab_card" onClick={() =>
                            !userLoggedIn ? shouldOpenLoginPopup() :
                                props.data.history.push({
                                    pathname: FRONTEND_NAME + "/kundali"
                                })}>
                            <div className="imgtab mb-1">
                                <img src={
                                    window.location.href === (HTTP1 + FRONTEND_NAME + "/kundali") ? Kundaliicon1 : Kundaliicon
                                } alt="home" width="20px" />
                            </div>
                            <p style={
                                window.location.href === (HTTP1 + FRONTEND_NAME + "/kundali") ? { color: "#fd9940" } : null
                            }> {t('Free Kundali')} </p>
                        </div>

                        <div className="tab_card" onClick={() => props.data.history.push({ pathname: FRONTEND_NAME + '/horoscope/Daily-Horoscope/'+t('Aries_') })}>
                            <div className="imgtab mb-1">
                                <img src={
                                    window.location.href === (HTTP1 + FRONTEND_NAME + "/horoscope/Daily-Horoscope/"+t('Aries_')) ? Dailyicon1 : Dailyicon
                                } alt="home" width="30px" />
                            </div>
                            <p style={
                                window.location.href === (HTTP1 + FRONTEND_NAME + "/horoscope/Daily-Horoscope/"+t('Aries_')) ? { color: "#fd9940" } : null
                            }> {t('Daily Horoscope')} </p>
                        </div>

                        <div className="tab_card" onClick={() =>
                            !userLoggedIn ? shouldOpenLoginPopup() :
                                props.data.history.push({
                                    pathname: FRONTEND_NAME + "/matching"
                                })}>
                            <div className="imgtab mb-1">
                                <img src={
                                    window.location.href === (HTTP1 + FRONTEND_NAME + "/matching") ? MatchingIcon1 : MatchingIcon
                                } alt="home" width="18px" />
                            </div>
                            <p style={
                                window.location.href === (HTTP1 + FRONTEND_NAME + "/matching") ? { color: "#fd9940" } : null
                            }> {t('Free Matching')} </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(React.memo(BottomTab));