import React, { useState } from 'react'
import Header2 from '../common/Header2';
import { useHistory } from 'react-router-dom';
import { FRONTEND_NAME } from '../configuration/constants';
// import Signup from './signup';
import apis from '../configuration/apis';
import paySuccess from '../images/newImg/wallet_success.png';
import { getCommonHeaders } from '../configuration/commonFunctions';

export default function Login_page() {
    const navigate = useHistory();

    const [userData, setUserData] = useState({
        displaySignupPopUp: false,
        loginSelected: false,
        countryCode: []
    });



    const openLoginPopup = () => {
        setUserData({
            ...userData,
            displaySignupPopUp: true,
            loginSelected: true,
        });
    };
    const openSignupPopup = () => {
        setUserData({
            ...userData,
            displaySignupPopUp: true,
            loginSelected: false,
        });
    };
    const closeSignUpPopup = () => {
        setUserData({
            ...userData,
            displaySignupPopUp: false,
        });

    };

    const closePopupOnLogin = () => {
        localStorage["isUserLoggedIn"] = true;
        setUserData({
            ...userData,
            displaySignupPopUp: false,
            loginSelected: true,
        });
        navigate(FRONTEND_NAME + "/home");

    };



    const fetchcountryCode = () => {
        var headers = getCommonHeaders();
        let dataToPush = [];
        apis
            .getCountryCode(headers)
            .then((response) => response.data)
            .then((data) => {
                if (data.code == '2000') {

                    data.data.forEach(d => {
                        dataToPush.push(d.countryCode);
                    });


                    this.setState({
                        countryCode: dataToPush
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }
    return (
        <>
            <Header2 />
            {/* <Signup
                countryCode={userData.countryCode}
                openLoginPopup={openLoginPopup}
                openSignupPopup={openSignupPopup}
                closePopUp={closeSignUpPopup}
                closeOnLogin={closePopupOnLogin}
                isLogin={userData.loginSelected}

            /> */}

            <div className="payment_success_container d-flex justify-content-center">
                <div className="payment_success_inner_container mt-5">
                    <div className="payment_success_image mt-5">
                        <img src={paySuccess} alt="Payment success" width="100%" />
                    </div>
                    <div className="payment_success_content mt-5">
                        <h5> Thanks for recharging your wallet with </h5>
                        <button className="btn backbtn"> Back to Home </button>
                    </div>
                </div>
            </div>
        </>
    )
}
