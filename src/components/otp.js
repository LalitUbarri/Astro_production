import React from "react";
// import apis from "../configuration/apis";
import "../styles/style.css";
import { withRouter } from "react-router-dom";
import $ from "jquery";
import Popup from "../components/popup";
import envelope from "../images/envelope.svg";
import "../styles/style.css";
import lock from "../images/lock.svg";
// import { FRONTEND_NAME } from "../configuration/constants";
import * as Constant from "../configuration/constants";
import { getCommonHeaders } from "../configuration/commonFunctions";
import { getApi, postApi } from "../configuration/apis";
import * as ErrorConstant from "../configuration/errorConstants";
import OtpInput from 'react-otp-input';
import { withTranslation } from 'react-i18next';
import { compose } from 'redux'
// import swl from 'sweetalert'

class Otp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            otpValue: '',
            seconds: 120,
            time: {},
            heading: "Astrology",
            button: "Ok",
            showPopUp: false,
            msg: "",
            isSuccess: false,
            otpSent: false,
            msisdn: "",
            isValidated: false,
            registerPassword: "",
            repassword: "",
            showInvalidOTPMsg: false,
            selectedCountryCode: this.props.countryCode !== undefined ? this.props.countryCode[0] : '91',
        };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(props.reference);
        this.countDown = this.countDown.bind(props.reference);
    }
    componentDidMount() {

    }

    handleOtpChange = (otpValue) => {
        this.setState({ otpValue: otpValue });
        if (otpValue.length == 4)
            this.validateOTP(otpValue);
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

    showPopUp(msg, isSuccess) {
        this.setState({
            showPopUp: true,
            msg: msg,
            isSuccess: isSuccess,
        });
    }

    reSendOTP = () => {
        // this.sendOTP();
        let timeLeftVar = this.secondsToTime(0);
        this.setState({ time: timeLeftVar });
    };

    goToForgotPswd = () => {
        this.props.history.goBack();
    };


    registerOtp = () => {

        if (
            this.state.msisdn == null ||
            this.state.msisdn == undefined ||
            this.state.msisdn.length == 0
        ) {
            this.showPopUp(this.props.t('Please_enter_a_valid_mobile_number'), false);
            return;
        }
        console.log('inside registerotp ' + this.state.msisdn);
        // localStorage["msisdn"] = this.state.msisdn;
        var requestBody = {
            msisdn: this.state.selectedCountryCode + this.state.msisdn,
        };
        var headers = getCommonHeaders();
        headers.msisdn = this.state.selectedCountryCode + this.state.msisdn;

        var url = Constant.ASTRO_URL + Constant.SEND_OTP_REGISTER;
        postApi(url, headers, requestBody)
            .then((response) => response.data)
            .then((data) => {
                if (data && data.code == ErrorConstant.SUCCESS_CODE) {
                    console.log("data ", data.data);
                    try {
                        console.log("response sendOTP ", data);
                        this.setState({ otpSent: true });
                        this.showPopUp(data.msg, true);
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


    validateOTP = (otpVal) => {

        if (otpVal.length !== 4) {
            this.showPopUp(this.props.t('Please_enter_valid_OTP'), false);
            return;
        }

        console.log('inside validateotp ' + this.state.msisdn);

        localStorage["msisdn"] = this.state.msisdn;

        console.log("otpVal", otpVal);
        if (this.props.otptype === "forgotPassword") {
            var url = Constant.ASTRO_URL + Constant.VALIDATE_OTP_FORGOT_PWD;
            var requestBody = {
                mode: "mobile",
                otp: otpVal,
                userName: localStorage["selectedCountryCode"] + this.state.msisdn,
            };
        } else if (this.props.otptype === "registerOtp") {
            var url = Constant.ASTRO_URL + Constant.VALIDATE_OTP_REGISTER;
            var requestBody = {
                msisdn: localStorage["selectedCountryCode"] + this.state.msisdn,
                otp: otpVal,
            };
        }

        const headers = getCommonHeaders();
        headers.msisdn = localStorage["selectedCountryCode"] + localStorage["msisdn"];
        postApi(url, headers, requestBody)
            .then((response) => response.data)
            .then((data) => {
                if (data && data.code == ErrorConstant.SUCCESS_CODE) {
                    console.log("data ", data.data);
                    try {
                        console.log("response validateOTP ", data);
                        // this.props.IsOtpValidate(true)
                        this.setState({ isSuccess: true, isValidated: true });
                        clearInterval(this.timer);
                        this.timer = 0;
                        this.props.setMsisdn();
                    } catch (error) {
                        console.log("exception occured" + error);
                        alert("Something went wrong" + error)
                        // this.toggleShowMsg("Something went wrong");
                        this.setState({ enableLoader: false });
                    }
                } else {
                    this.setState({ showInvalidOTPMsg: true, otpSent: false, otpValue: "" });
                    this.showPopUp(data.msg, false);
                    clearInterval(this.timer);
                    this.timer = 0;
                }
            });
    };

    handleChange = (event) => {
        let name = event.target.name;
        if (name === "msisdn")
            event.target.value = event.target.value.replace(/[^0-9]/g, "");
        this.setState({
            [name]: event.target.value,
        });
    };

    handleCountryCodeChange = (e) => {
        // console.log(e.target.value);
        this.setState({ selectedCountryCode: e.target.value });
        localStorage["selectedCountryCode"] = e.target.value;
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        const { t } = this.props;
        const {
            otpSent,
            seconds,
            msisdn,
            registerPassword,
            repassword,
            showInvalidOTPMsg,
            time,
            isValidated,
            selectedCountryCode,
        } = this.state;
        // console.log(msisdn);
        // alert(this.props.countryCode)
        return (
            <div className="otp-flow">
                {this.state.showPopUp ? (
                    <Popup
                        heading={t(this.state.heading)}
                        msg={t(this.state.msg)}
                        button={this.state.button}
                        closePopUp={this.closePopUp}
                    />
                ) : null}

                {/*<p className="fo-pass">Forget Password?</p>*/}

                {otpSent ?
                    <>
                        <span className="text-center d-flex align-items-center justify-content-center wd-100 ">
                            <p className="log-in">{t('You will receive a 4 digit code for verification')}</p></span>
                        <div className="input-input otp-text-p">
                            <span className="enter-6">{t('Enter 4 digit OTP')}</span>
                            <p
                                className="flex_input d-flex flex-row "
                                data-group-name="digits"
                                // data-autosubmit="false"
                                autocomplete="off"
                                style={{ marginTop: "-19px" }}
                            >

                                <OtpInput
                                    value={this.state.otpValue}
                                    onChange={this.handleOtpChange}
                                    numInputs={4}
                                    separator={<span></span>}
                                    inputStyle="form-control otp-field"
                                    isDisabled={isValidated ? true : false}
                                />
                            </p>

                            {seconds === 0 && !isValidated ? (
                                <span className="input-input-r mt-3" style={{ fontSize: '10px !important' }} onClick={this.reSendOTP}>
                                    {t('Resend_OTP')}
                                </span>
                            ) : (
                                <span className="input-input-r mt-3" style={{ fontSize: '10px !important' }}>{t('Resend_OTP')}</span>
                            )}

                            {
                                otpSent ? (
                                    <div className="valid-box">
                                        <span>{t('OTP is valid for')}:</span>
                                        <span>
                                            {time.m}:{time.s}
                                        </span>
                                    </div>
                                ) : null
                            }
                        </div>
                    </> : <>
                        <span className="text-center d-flex align-items-center justify-content-center wd-100 ">
                            <p className="log-in">{t('You will receive a 4 digit code for verification')}</p></span>
                        <div className="form-input-login fil mb-4">
                            <span style={{ padding: "10px 14.5px" }}>
                                <img
                                alt="mail"
                                    src={envelope}
                                    style={{ width: "15px", height: "20px" }}
                                ></img>
                            </span>
                            <select value={this.state.selectedCountryCode} onChange={(e) => this.handleCountryCodeChange(e)}>
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
                                    <div className="button_group log-in-btn"><button className="fil-btn-otp" onClick={() => this.registerOtp()}>
                                        {t('Get OTP')}
                                    </button></div>
                                ) : (
                                    <div className="button_group"><button className="fil-btn-otp">{t('Get OTP')}</button></div>
                                )}
                            </>
                        ) : (
                            <button className="fil-btn-verified mt-3">{t('Verified')} &#9989;</button>
                        )
                        }
                    </div>


                </> : null}

                {/* {showInvalidOTPMsg ?
                    <p className="otp-status-check">
                        <span></span>
                        <span className="otp-correct">
                            The OTP You entered is Invalid. Please enter the
                            correct OTP. Yo have 2 attempts left.
                        </span>
                    </p> : null
                } */}

                {
                    isValidated ? (
                        <>
                            <div className="form-input-login">
                                <span style={{ padding: "10px 14.5px" }}>
                                    <img src={lock} style={{ width: "15px", height: "20px" }} alt="img"></img>
                                </span>
                                <input
                                    name="registerPassword"
                                    type="password"
                                    placeholder={t("Enter_Password")}
                                    value={this.state.registerPassword}
                                    onChange={this.handleChange}
                                    required="true"
                                />
                            </div>
                            <div>
                                <div className="form-input-login">
                                    <span style={{ padding: "10px 14.5px" }}>
                                        <img
                                        alt="img"
                                            src={lock}
                                            style={{ width: "15px", height: "20px" }}
                                        ></img>
                                    </span>
                                    <input
                                        type="password"
                                        name="repassword"
                                        placeholder={t("Re-enter Password")}
                                        value={this.state.repassword}
                                        onChange={this.handleChange}
                                        required="true"
                                    ></input>
                                </div>
                            </div>
                            <div className="log-in-btn">
                                <button
                                    onClick={
                                        this.props.otptype === "forgotPassword"
                                            ? () => {
                                                registerPassword && registerPassword.length >= 8 ?
                                                    this.props.confirmFn(selectedCountryCode, msisdn, registerPassword, repassword) :
                                                    this.showPopUp(this.props.t('Please enter password of length greater than 8 characters'), false);
                                            }
                                            : () =>
                                                this.props.confirmFn(
                                                    "signup",
                                                    selectedCountryCode,
                                                    msisdn,
                                                    registerPassword,
                                                    repassword
                                                )
                                    }
                                >
                                    {this.props.buttonName}
                                </button>
                            </div>
                        </>
                    ) : null
                }
            </div >
        );
    }
}

const withCombine = compose(
    withRouter,
    withTranslation()
)

export default withCombine(Otp);

