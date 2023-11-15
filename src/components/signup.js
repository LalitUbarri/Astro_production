import React from "react";
import { withRouter } from "react-router-dom";
//import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "jquery/dist/jquery.min";
import "../styles/login.css";
import 'react-phone-input-2/lib/style.css'
import { FRONTEND_NAME } from "../configuration/constants";
import Popup from "../components/popup";
import * as Constant from "../configuration/constants";
import { getCommonHeaders } from "../configuration/commonFunctions";
import { getApi, postApi } from "../configuration/apis";
import apis from "../configuration/apis";
import * as ErrorConstant from "../configuration/errorConstants";

import { withTranslation } from 'react-i18next';
import { compose } from 'redux'

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            otpValue: '',
            seconds: 120,
            time: {},
            userName: "",
            password: "",
            showPopUp: false,
            msg: "",
            button: "OK",
            response: "",
            heading: "Astrology",
            otpValidated: false,
            isSuccess: false,
            registerPassword: "",
            repassword: "",
            seePass: false,
            seconds: 120,
            otpSent: false,
            time: {},
            firstName: "",
            lastName: "",
            isValidated: false,
            phone: '',
            passwordType: '',
            typeLogin: '',
            otpValidated: false,
            selectedCountryCode: this.props.countryCode !== undefined ? this.props.countryCode[0] : localStorage['selectedCountryCode'] !== undefined ? localStorage['selectedCountryCode'] : '+91',
            countryCode: this.props.countryCode !== undefined ? this.props.countryCode : []
        };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(props.reference);
        this.countDown = this.countDown.bind(props.reference);

    }

    componentDidMount() {

        if (this.state.countryCode.length === 0) {
            this.fetchcountryCode();
        }
        if (this.state.userName !== '') {

            this.getUserProfileDetails1();
        }

    }

    fetchCurrency = () => {
        let header = getCommonHeaders();

        console.log("HomeHeader", header)
        const countryCode = localStorage["selectedCountryCode"] ? localStorage["selectedCountryCode"] : '91';
        apis.getCurrencyData(header, countryCode)
            .then(data => data.data)
            .then(data => {
                console.log("Cerrency ", data.data)
                console.log("Cerrency ", data.data.currencyLogo)
                localStorage['currency'] = data.data.currencyLogo
            })
            .catch(er => {
                console.log("Error - ", er)
            })
    }


    getUserProfileDetails1 = () => {
        var url = Constant.ASTRO_URL + Constant.GET_USER_PROFILE_DETAILS;
        const headers = getCommonHeaders();
        headers.msisdn = + this.state.userName;
        getApi(url, headers)
            .then((response) => response.data)
            .then((data) => {
                console.log(data);
                if (data && data.code == ErrorConstant.SUCCESS_CODE) {
                    // alert(JSON.stringify(data.data));
                    localStorage["profileData"] = JSON.stringify(
                        data.data.profileDataList
                    );
                    localStorage["isUserLoggedIn"] = true;
                }
            })
            .catch((error) => {
                console.error("error", error);
            });

    };

    getUserBalance = () => {
        return apis
            .getBalance({})
            .then((response) => response.data)
            .then((data) => {
                if (data.code == "2000") {
                    //debugger;
                    console.log("response getBalance", data);
                    if (data.data) {
                        let balanceData = data.data.myPoint;
                        let balance = balanceData.point;
                        localStorage["userBalance"] = balance;
                    }
                } else {
                    console.log(data.msg);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    fetchcountryCode = () => {
        var headers = getCommonHeaders();
        let dataToPush = [];
        apis
            .getCountryCode(headers)
            .then((response) => response.data)
            .then((data) => {
                if (data.code === '2000') {

                    data.data.forEach(d => {
                        dataToPush.push(d.countryCode);

                    });
                    // this.state;
                    this.setState({
                        ...this.state,
                        countryCode: dataToPush
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }


    startTimer = () => {
        if (this.timer == 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    };

    closePopUp = () => {
        this.setState({
            showPopUp: false,
        });
    };

    countDown = () => {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });


        // Check if we're at zero.
        if (seconds == 0) {
            clearInterval(this.timer);
            this.timer = 0;
        }
    };

    secondsToTime = (secs) => {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            h: hours,
            m: minutes,
            s: seconds,
        };
        return obj;
    };

    login = () => {
        var dd = parseInt(this.state.selectedCountryCode);
        if (
            this.state.userName == null ||
            this.state.userName == undefined ||
            this.state.userName.length == 0
        ) {
            this.showPopUp(this.props.t('Please_enter_a_valid_mobile_number'), false);
            return;
        }
        this.setState({
            ...this.state,
            typeLogin: 'Login'
        })
        // console.log('inside registerotp ' + this.state.userName);
        // localStorage["msisdn"] = this.state.userName;
        var requestBody = {
            source: "role_client",
            userName: dd + this.state.userName,
        };

        localStorage['msisdn'] = this.state.userName;
        var headers = getCommonHeaders();
        headers.msisdn = dd + localStorage['msisdn'];

        var url = Constant.ASTRO_URL + Constant.POST_LOGIN_WITH_OTP;
       
        postApi(url, headers, requestBody)
            .then((response) => response.data)
            .then((data) => {
                // console.log("data1 ", data);
                // alert(JSON.stringify(requestBody));
                if (data && data.code == ErrorConstant.SUCCESS_CODE) {
                    // console.log("data1 ", data.data);
                    try {
                        // console.log("response sendOTP ", data);
                        this.setState({ otpSent: true });
                        // this.showPopUp(data.msg, true);
                        this.setState(
                            {
                                seconds: 120,
                            },
                            () => {
                                this.startTimer();
                                let timeLeftVar = this.secondsToTime(this.state.seconds);
                                this.setState({ time: timeLeftVar });
                            }
                        );
                    } catch (error) {
                        // console.log("exception occured" + error);
                        //this.toggleShowMsg("Something went wrong");
                        this.setState({ enableLoader: false });
                    }
                } else {
                    this.showPopUp(data.msg, false);
                }
            });
    }

    registerOtp = () => {

        if (
            this.state.userName == null ||
            this.state.userName == undefined ||
            this.state.userName.length == 0
        ) {
            this.showPopUp(this.props.t('Please_enter_a_valid_mobile_number'), false);
            return;
        }
        console.log('inside registerotp ' + this.state.userName);
        // localStorage["msisdn"] = this.state.userName;

        this.setState({
            ...this.state,
            typeLogin: 'register'
        })
        var requestBody = {
            msisdn: this.state.selectedCountryCode + this.state.userName,
            source: "role_client"
        };

        localStorage['msisdn'] = this.state.userName;
        var headers = getCommonHeaders();
        headers.msisdn = this.state.selectedCountryCode + localStorage['msisdn'];

        var url = Constant.ASTRO_URL + Constant.SEND_OTP_REGISTER;

        postApi(url, headers, requestBody)
            .then((response) => response.data)
            .then((data) => {
                if (data && data.code == ErrorConstant.SUCCESS_CODE) {
                    console.log("data ", data.data);
                    try {
                        console.log("response sendOTP ", data);
                        this.setState({ otpSent: true });
                        // this.showPopUp(data.msg, true);
                        this.setState(
                            {
                                seconds: 120,
                            },
                            () => {
                                this.startTimer();
                                let timeLeftVar = this.secondsToTime(this.state.seconds);
                                this.setState({ time: timeLeftVar });
                            }
                        );
                    } catch (error) {
                        console.log("exception occured" + error);
                        //this.toggleShowMsg("Something went wrong");
                        this.setState({ enableLoader: false });
                    }
                } else {
                    this.showPopUp(data.msg, false);
                }
            });

    };
    handleOtpChange = (otpValue) => {
        this.setState({ otpValue: otpValue })
    }

    validateOTP = (otpVal) => {
        // console.log(this.state.otpValue);
        if (otpVal.length !== 4) {
            this.showPopUp(this.props.t('Please_enter_valid_OTP'), false);
            return;
        } else {
            var url = Constant.ASTRO_URL + Constant.VALIDATE_OTP_REGISTER;
            var requestBody = {
                msisdn: localStorage["selectedCountryCode"] + this.state.userName,
                otp: otpVal,
            };
        }

        const headers = getCommonHeaders();
        headers.msisdn = localStorage["selectedCountryCode"] + this.state.userName;
        postApi(url, headers, requestBody)
            .then((response) => response.data)
            .then((data) => {
                // console.log("data ", data);
                if (data && data.code == ErrorConstant.SUCCESS_CODE) {
                    this.setState({ isSuccess: true, isValidated: true });
                    clearInterval(this.timer);
                    this.timer = 0;

                    localStorage.setItem("userProfile", JSON.stringify(data.data));
                    localStorage["isUserLoggedIn"] = true;
                    this.getUserBalance();
                    if (this.state.typeLogin !== 'Login') {
                        this.saveProfile(this.state.userName);
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000)
                    } else {
                        this.getUserProfileDetails1();
                        window.location.reload();
                    }

                    localStorage["msisdn"] = this.state.userName;
                    this.props.closePopUp();
                } else {
                    this.setState({ showInvalidOTPMsg: true, otpSent: true, otpValue: "" });
                    this.showPopUp(data.msg, false);
                    clearInterval(this.timer);
                    this.timer = 0;
                }
            }).catch(err => console.log(err));
    };

    saveProfile = (msisdn) => {
        if (msisdn == null || msisdn == undefined || msisdn.length == 0) {
            this.showPopUp(this.props.t('Please_enter_a_valid_mobile_number'), false);
            return;
        }
        localStorage["msisdn"] = msisdn;

        var requestBody = {
            data: [
                {
                    displayTitle: "Mobile No.",
                    isMandatory: 1,
                    isEditable: 1,
                    controlType: "TEXT",
                    fieldValue: localStorage["selectedCountryCode"] + msisdn,
                    fieldColumnName: "msisdn",
                    dataValues: null,
                    sequence: 1,
                    mode: "API",
                    minLength: 10,
                    maxLength: 12,
                },
                {
                    displayTitle: "Username",
                    isMandatory: 1,
                    isEditable: 1,
                    controlType: "TEXT",
                    fieldValue: localStorage["selectedCountryCode"] + msisdn,
                    fieldColumnName: "username",
                    dataValues: null,
                    sequence: 2,
                    mode: "API",
                    minLength: 1,
                    maxLength: 50,
                },
                {
                    displayTitle: "Password",
                    isMandatory: 1,
                    isEditable: 1,
                    controlType: "TEXT",
                    fieldValue: '12345678',
                    fieldColumnName: "password",
                    dataValues: null,
                    sequence: 3,
                    mode: "API",
                    minLength: 5,
                    maxLength: 50,
                },
                {
                    displayTitle: "User Category",
                    isMandatory: 1,
                    isEditable: 1,
                    controlType: "TEXT",
                    fieldValue: "ROLE_CLIENT",
                    fieldColumnName: "user_category",
                    dataValues: null,
                    sequence: 4,
                    mode: "API",
                    minLength: 5,
                    maxLength: 20,
                },
                {
                    displayTitle: "First Name",
                    isMandatory: 0,
                    isEditable: 1,
                    controlType: "TEXT",
                    fieldValue: null,
                    fieldColumnName: "first_name",
                    dataValues: null,
                    sequence: 5,
                    mode: "API",
                    minLength: 1,
                    maxLength: 50,
                },
                {
                    displayTitle: "Last Name",
                    isMandatory: 0,
                    isEditable: 1,
                    controlType: "TEXT",
                    fieldValue: null,
                    fieldColumnName: "last_name",
                    dataValues: null,
                    sequence: 6,
                    mode: "API",
                    minLength: 0,
                    maxLength: 50,
                },
                {
                    displayTitle: "Status",
                    isMandatory: 1,
                    isEditable: 1,
                    controlType: "TEXT",
                    fieldValue: "ACTIVE",
                    fieldColumnName: "status",
                    dataValues: null,
                    sequence: 7,
                    mode: "API",
                    minLength: 0,
                    maxLength: 50,
                },
            ],
        };
        var url = Constant.ASTRO_URL + Constant.GET_USER_PROFILE_DETAILS;
        const headers = getCommonHeaders();
        headers.msisdn = localStorage["selectedCountryCode"] + localStorage["msisdn"];
        // console.log("saveReport requestBody", requestBody);
        postApi(url, headers, requestBody)
            .then((response) => response.data)
            .then((data) => {
                console.log("dataaaa", data)
                if (data && data.code == ErrorConstant.SUCCESS_CODE) {
                    console.log("data ", data.data);
                    try {
                        console.log("response of register ", data);
                        this.props.closeOnLogin();
                        window.location.reload();
                    } catch (error) {
                        console.log("exception occured" + error);
                        //this.toggleShowMsg("Something went wrong");
                        this.setState({ enableLoader: false });
                    }
                } else {
                    // console.log("error response editProfile ", data.msg);
                    this.showPopUp(data.msg, false);
                }
            });
    };

    getUserProfileDetails(e) {
        e.preventDefault()
        localStorage['msisdn'] = this.state.userName;
        var dd = parseInt(this.state.selectedCountryCode);
        localStorage.setItem("selectedCountryCode", dd);
        var url = Constant.ASTRO_URL + Constant.CHECK_USER_PROFILE_STATUS;
        var headers = getCommonHeaders();
        headers.msisdn = dd + localStorage['msisdn'];
        var requestBody = {
            mode: "Mobile", value: dd + this.state.userName,
        };
        
        postApi(url, headers, requestBody)
            .then((response) => response.data)
            .then((data) => {
                console.log("data ", data);
                if (data && data.code === ErrorConstant.SUCCESS_CODE) {
                    console.log("data ", data.data);
                    this.login();
                } else if (data && data.code === '4010') {
                    this.showPopUp(data.msg, false);
                } else {
                    this.registerOtp();
                }
            }).catch(error => {
                console.log("exception occured" + error);
                //this.toggleShowMsg("Something went wrong");
                this.setState({ enableLoader: false });
            })
        // console.log(headers);
        // console.log(this.state.selectedCountryCode + this.state.userName);
        
        // console.log(dd);

    }

    showPopUp(msg, isSuccess) {
        this.setState({
            showPopUp: true,
            msg: msg,
            isSuccess: isSuccess,
        });
    }

    handleChange = (event) => {
        let name = event.target.name;

        if (name === "userName")
            event.target.value = event.target.value.replace(/[^0-9]/g, "");

        this.setState({
            ...this.state,
            userName: event.target.value,
        });
    };

    closePopUp = () => {
        this.setState({
            showPopUp: false,
        });
    };

    setLoginDetails = (username, password) => {
        this.setState({
            userName: username,
            password: password,
        });
    };


    setOtpValidated = () => {
        this.setState({
            otpValidated: true,
        });
    };


    handleCountryCodeChange = (e) => {
        this.setState({ selectedCountryCode: e.target.value });
    }

    IsOtpValidate = (e) => {
        this.setState({
            otpValidated: e
        })
    }

    handleOnPasteOtp(e) {
        const inputs = document.querySelector('.otp-field input');
        const data = e.clipboardData.getData("text");
        const value = data.split("");

        if (value.length === inputs.length) {
            inputs.forEach((input, index) => (input.value = value[index]));
            this.setState({
                ...this.state,
                otpValue: value
            })
            alert(value);
        }
    }

    render() {
        const { t } = this.props;
        const {
            seconds,
            time,
            otpValue,
            isValidated,
            otpSent,
        } = this.state;
        return (
            <>
                {this.state.showPopUp ? (
                    <Popup
                        heading={this.state.heading}
                        msg={this.state.msg}
                        button={this.state.button}
                        closePopUp={this.closePopUp}
                    />
                ) : null}


                <div className="modal modal-m" role="dialog" style={{ display: "block" }}>
                    <div className="modal-dialog modal-dialog-m" role="document">
                        <div className="modal-content modal-content-m">
                            <div class="modal-header">
                                <h5 class="modal-title text-center text-white"> {otpSent ? "Verify Phone" : "Continue with Phone"}</h5>
                                <button type="button" onClick={this.props.closePopUp} class="close text-white closebtn_login" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body modal-body-m">
                                <div className="modal-body-ryt">
                                    <div className="loginSignup_modal_container">

                                        {otpSent ?
                                            <>
                                                <span className="text-center d-flex align-items-center justify-content-center wd-100 ">
                                                    <p className="log-in">{otpSent ? <span>OTP sent to <strong>{this.state.userName}</strong></span> : t('Please enter your mobile number to Login/Sign Up on astroking')}</p></span>
                                                <div className="input-input otp-text-p">
                                                    {/* <span className="enter-6">{t('Enter 4 digit OTP')}</span> */}
                                                    <div id="divOuter">
                                                        <div id="divInner">
                                                            <input id="partitioned" maxlength="4" pattern="[0-9]*" autocomplete="off" onChange={(e) => this.setState({ ...this.state, otpValue: e.target.value })} value={this.state.otpValue} />
                                                        </div>
                                                    </div>

                                                   
                                                </div>
                                            </> : <>
                                                <span className="text-center d-flex align-items-center justify-content-center wd-100 ">
                                                    <p className="log-in">{t('Please enter your mobile number to Login/Sign Up on astroking')}</p></span>
                                                <div className="form-input-login fil mb-4">
                                                    
                                                    <select className="country_bg" value={this.state.selectedCountryCode} onChange={(e) => this.handleCountryCodeChange(e)}>
                                                        {this.props.countryCode !== undefined ? this.props.countryCode.map(code => <option key={code} value={code}>{`+${code}`}</option>) : <option key={1} value={this.state.selectedCountryCode}>{`+${this.state.selectedCountryCode}`}</option>}
                                                    </select>
                                                    <input
                                                        name="msisdn"
                                                        type="tel"
                                                        maxLength="10"
                                                        minLength="10"
                                                        placeholder={t("Mobile Number")}
                                                        value={this.state.msisdn}
                                                        onChange={this.handleChange}
                                                        required="true"
                                                    ></input>
                                                </div>
                                            </>}


                                        {!isValidated ? <>
                                            <div className="loginSignup_modal_container1">
                                                {!isValidated ? (
                                                    <>
                                                        {!otpSent ? (
                                                            <div className="button_group log-in-btn"><button className="fil-btn-otp" onClick={(e) => this.getUserProfileDetails(e)}>
                                                                {t('Get OTP')}
                                                            </button></div>
                                                        ) : (
                                                            <div className="button_group log-in-btn mb-3"><button className="fil-btn-otp" onClick={() => this.validateOTP(otpValue)}>{t('Login')}</button></div>
                                                        )}
                                                    </>
                                                ) : (
                                                    <button className="fil-btn-verified mt-3">{t('Verified')} &#9989;</button>
                                                )
                                                }
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between">
                                                {
                                                    otpSent ? <><div className="valid-box">
                                                        <span>{t('OTP is valid for')}:</span>
                                                        <span>
                                                            {time.m}:{time.s}
                                                        </span>
                                                    </div>
                                                        {seconds === 0 && !isValidated ? (
                                                            <span className="input-input-r mt-3" style={{ fontSize: '10px !important' }} onClick={this.reSendOTP}>
                                                                {t('Resend_OTP')}
                                                            </span>
                                                        ) : (
                                                            <span className="input-input-r mt-3" style={{ fontSize: '10px !important' }}>{t('Resend_OTP')}</span>
                                                        )}
                                                    </> : null
                                                }


                                            </div>


                                        </> : null}
                                        <p className="tnc">
                                            {t('By_signing_up,you_agree_to_our')} {""}
                                            <span
                                                onClick={() =>
                                                    this.props.history.push(FRONTEND_NAME + "/terms")
                                                }
                                            >
                                                {t('Terms_of_Use')}
                                            </span>{" "}
                                            {t('and')}
                                            <span
                                                onClick={() =>
                                                    this.props.history.push(
                                                        FRONTEND_NAME + "/privacyPolicy"
                                                    )
                                                }
                                            >
                                                {" "}
                                                {t('Privacy_Policy')}
                                            </span>
                                            .
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            </>
        );
    }
}

const withCombine = compose(
    withRouter,
    withTranslation()
)

export default withCombine(Signup);
