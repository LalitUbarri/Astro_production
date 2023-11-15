import React, { Component } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import OtpInput from 'react-otp-input';
import Popup from "../../components/popup";
import { withRouter } from "react-router-dom";
import { withTranslation } from 'react-i18next';
import { compose } from 'redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Constant from "../../configuration/constants";
import { getCommonHeaders } from "../../configuration/commonFunctions";
import { postApi } from "../../configuration/apis";
import * as ErrorConstant from "../../configuration/errorConstants";
import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons';

class MyVerticallyCenteredModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            otpValue: '',
            seconds: 10,
            time: {},
            isValidated: false,
            showPopUp: false,
            otpSent: false,
            err: false,
            msg: '',
            isSuccess: '',
            heading: "Astrology",
            button: "Ok",

        }

        this.timer = 0;
        this.startTimer = this.startTimer.bind(props.reference);
        this.countDown = this.countDown.bind(props.reference);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    startTimer = () => {
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
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



    handleChange = (event) => {
        console.log(event.length);
        this.setState({
            ...this.state,
            phone: event,
            err: event.length > 12 ? true : false
        })
    }

    handleOtpChange = (otpValue) => {
        this.setState({
            ...this.state,
            otpValue: otpValue
        });
        if (otpValue.length == 4)
            this.validateOTP(otpValue);
    }

    showPopUp(msg, isSuccess) {
        this.setState({
            ...this.state,
            showPopUp: true,
            msg: msg,
            isSuccess: isSuccess,
        });
    }

    closePopUp = () => {
        this.setState({
            ...this.state,
            showPopUp: false,
        });
    };

    onsubmithandle = (e) => {
        e.preventDefault();
        if (this.state.phone === '') {
            this.showPopUp(this.props.t('Please_enter_a_valid_mobile_number', false));
        } else if (this.state.phone.length < 12) {
            this.setState({
                ...this.state,
                err: true
            })
        } else {
            // console.log(this.state);
            this.registerOtp(this.state.phone);
        }

    }

    registerOtp = (msisdn) => {
        // localStorage["msisdn"] = msisdn;
        var requestBody = { msisdn: msisdn };
        var headers = getCommonHeaders();
        headers.msisdn = msisdn;
        var url = Constant.ASTRO_URL + Constant.SEND_OTP_REGISTER;
        postApi(url, headers, requestBody)
            .then((response) => response.data)
            .then((data) => {
                if (data && data.code == ErrorConstant.SUCCESS_CODE) {
                    try {
                        // console.log("response sendOTP ", data);
                        this.setState({ ...this.state, otpSent: true });
                        this.showPopUp(data.msg, true);
                        this.setState(
                            {
                                ...this.state,
                                seconds: 120,
                            },
                            () => {
                                this.startTimer();
                                let timeLeftVar = this.secondsToTime(this.state.seconds);
                                this.setState({ ...this.state, time: timeLeftVar });
                            }
                        );
                    } catch (error) {
                        console.log("exception occured" + error);
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
        // localStorage["msisdn"] = this.state.phone;
        var url = Constant.ASTRO_URL + Constant.VALIDATE_OTP_REGISTER;
        var requestBody = {
            msisdn: this.state.phone,
            otp: otpVal,
        };
        const headers = getCommonHeaders();
        headers.msisdn = this.state.phone;
        postApi(url, headers, requestBody)
            .then((response) => response.data)
            .then((data) => {
                if (data && data.code === ErrorConstant.SUCCESS_CODE) {
                    try {
                        this.setState({ ...this.state, isSuccess: true, isValidated: true });
                        clearInterval(this.timer);
                        this.timer = 0;
                        window.$('#staticBackdrop').modal('hide');
                        setTimeout(() => {
                            this.props.navigateurl(this.state.phone);
                        }, 1000)
                    } catch (error) {
                        console.log("exception occured" + error);
                        this.showPopUp("Something went wrong" + error, false);
                    }
                } else {
                    this.setState({ showInvalidOTPMsg: true, otpSent: true, otpValue: "" });
                    this.showPopUp(data.msg, false);
                    clearInterval(this.timer);
                    this.timer = 0;
                }
            });
    };


    render() {
        const { t } = this.props;
        const { otpSent, time } = this.state;
        return (
            <>
                {this.state.showPopUp ? (
                    <Popup
                        heading={t(this.state.heading)}
                        msg={t(this.state.msg)}
                        button={this.state.button}
                        closePopUp={this.closePopUp}
                    />
                ) : null}
                <div>
                    {/* <!-- Modal --> */}
                    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title fs-5" id="staticBackdropLabel"> {!this.state.otpSent ? 'Verify Mobile number' : 'Verify OTP'}</h5>
                                    <button type="button" class="btn-close btn" data-bs-dismiss="modal" aria-label="Close">
                                        <FontAwesomeIcon icon={faClose} />
                                    </button>
                                </div>
                                <div class="modal-body otp_container_">
                                    {!this.state.otpSent ?
                                        <form onSubmit={this.onsubmithandle}>
                                            <div className="form-group d-flex align-items-center justify-content-between">
                                                <div className="" style={{ width: '70%' }}>
                                                    <PhoneInput
                                                        country={'in'}
                                                        className="phone_count"
                                                        countryCodeEditable={false}
                                                        onlyCountries={['in', 'us']}
                                                        copyNumbersOnly={true}
                                                        autocompleteSearch={true}
                                                        inputProps={{
                                                            required: true,
                                                            autoFocus: false,
                                                        }}
                                                        name={'msisdn'}
                                                        value={this.state.phone}
                                                        isValid={(value, country) => {
                                                            if (value.match(/12345/)) {
                                                                return 'Invalid value: ' + value + ', ' + country.name;
                                                            } else if (value.match(/1234/)) {
                                                                return false;
                                                            } else {
                                                                return true;
                                                            }
                                                        }}
                                                        onChange={this.handleChange}
                                                    />
                                                    {this.state.err ?
                                                        <span className="text-danger fs-12"> phone length should be 10 digits!</span> : null}
                                                </div>
                                                <button type="submit" className="fil-btn-otp">Send OTP</button>
                                            </div>
                                        </form> : <div className="form-group d-flex align-items-center justify-content-between">
                                            <div className="" style={{ width: '60%' }}>
                                                <OtpInput
                                                    value={this.state.otpValue}
                                                    onChange={this.handleOtpChange}
                                                    numInputs={4}
                                                    separator={<span></span>}
                                                    inputStyle="form-control otpInput"
                                                    isDisabled={this.state.isValidated ? true : false}
                                                />



                                                {time.m > 0 || time.s > 0 ?
                                                    otpSent ? (
                                                        <div className="valid-box mt-3">
                                                            <span>{t('OTP is valid for')}:</span>
                                                            <span>
                                                                {time.m}:{time.s}
                                                            </span>
                                                        </div>
                                                    ) : null : <>
                                                        {this.state.seconds === 0 && !this.state.isValidated ? (
                                                            <span className="input-input-r mt-4" style={{ fontSize: '10px !important', cursor: 'pointer' }}
                                                                onClick={this.onsubmithandle}
                                                            >
                                                                {t('Resend_OTP')}
                                                            </span>
                                                        ) : (
                                                            <span className="input-input-r mt-4" style={{ fontSize: '10px !important' }}>{t('Resend_OTP')}</span>
                                                        )}
                                                    </>
                                                }

                                            </div>
                                            <button type="submit" className={this.state.isValidated ? "bg_green fil-btn-otp" : "fil-btn-otp"}
                                            >{this.state.isValidated ? <> Verify &nbsp;&nbsp;<FontAwesomeIcon icon={faCheck} /> </> : 'Verify OTP'}</button>
                                        </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const withCombine = compose(
    withRouter,
    withTranslation()
)

export default withCombine(MyVerticallyCenteredModal);