import React from "react";
// import { withRouter } from "react-router-dom";
//import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "jquery/dist/jquery.min";
import "../styles/login.css";
// import { FRONTEND_NAME } from "../configuration/constants";
// import lock from "../images/lock.svg";
import Popup from "../components/popup";
import { postApi } from "../configuration/apis";
import * as Constant from "../configuration/constants";
import * as ErrorConstant from "../configuration/errorConstants";
import { getCommonHeaders } from "../configuration/commonFunctions";
// import VisibilityIcon from '@material-ui/icons/Visibility';
// import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Otp from "./otp";
import { withTranslation } from 'react-i18next';
const crypto = require('crypto');


class SetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msisdn: "",
            setPassword: "",
            button: "Ok",
            password: "",
            heading: "Astrology",
            repassword: "",
            seePass: false,
            seeConfirmPass: false,
            showPopUp: false,
            msg: "",
            isSuccess: false,
            otpValidated: false
        }
    }

    componentDidMount() {



    }
    handleChange = (event) => {
        let name = event.target.name;

        //   event.target.value = event.target.value.replace(/[^0-9]/g, '');

        this.setState({
            [name]: event.target.value
        });

    }
    encryptPswd = (password) => {
        var cipher = crypto.createCipher('aes-128-ecb', Constant.ENCRYPTION_SECRET_KEY);
        return cipher.update(password, 'utf8', 'base64') + cipher.final('base64');
    }
    toggleSeePwd = () => {
        this.setState({
            seePass: !(this.state.seePass)
        })
    }
    toggleSeeConfirmPwd = () => {
        this.setState({
            seeConfirmPass: !(this.state.seeConfirmPass)
        })
    }
    changePassword = (selectedCountryCode, msisdn, password, repassword) => {
        if (msisdn == null || msisdn == undefined || msisdn.length == 0) {
            this.showPopUp("Please enter a valid mobile number", false);
            return;
        }

        if (password != repassword) {
            this.showPopUp("Password didn't match.", false);
            return;
        }

        localStorage["msisdn"] = msisdn;

        let encryptedPswd = this.encryptPswd(password);
        var requestBody = {
            "data": [
                {
                    "displayTitle": "Mobile No.",
                    "isMandatory": 1,
                    "isEditable": 1,
                    "controlType": "TEXT",
                    "fieldValue": selectedCountryCode + msisdn,
                    "fieldColumnName": "msisdn",
                    "dataValues": null,
                    "sequence": 1,
                    "mode": "API",
                    "minLength": 10,
                    "maxLength": 10
                },
                {
                    "displayTitle": "Username",
                    "isMandatory": 1,
                    "isEditable": 1,
                    "controlType": "TEXT",
                    "fieldValue": selectedCountryCode + msisdn,
                    "fieldColumnName": "username",
                    "dataValues": null,
                    "sequence": 1,
                    "mode": "API",
                    "minLength": 10,
                    "maxLength": 10
                },
                {
                    "displayTitle": "User Category",
                    "isMandatory": 1,
                    "isEditable": 1,
                    "controlType": "TEXT",
                    "fieldValue": "ROLE_CLIENT",
                    "fieldColumnName": "user_category",
                    "dataValues": null,
                    "sequence": 4,
                    "mode": "API",
                    "minLength": 5,
                    "maxLength": 20
                },
                {
                    "displayTitle": "Password",
                    "isMandatory": 1,
                    "isEditable": 1,
                    "controlType": "TEXT",
                    "fieldValue": encryptedPswd,
                    "fieldColumnName": "password",
                    "dataValues": null,
                    "sequence": 7,
                    "mode": "API",
                    "minLength": 0,
                    "maxLength": 50
                }
            ]
        };
        var url = Constant.ASTRO_URL + Constant.GET_USER_PROFILE_DETAILS;
        const headers = getCommonHeaders();
        headers.msisdn = localStorage['msisdn'];
        postApi(url, headers, requestBody)
            .then((response) => response.data)
            .then((data) => {
                if (data && data.code == ErrorConstant.SUCCESS_CODE) {
                    console.log("data ", data.data);
                    try {
                        console.log("response changePassword ", data);
                        this.props.setLoginDetails(this.state.msisdn, password);
                        this.showPopUp("Password changed succesfully", true);
                    } catch (error) {
                        console.log("exception occured" + error);
                        //this.toggleShowMsg("Something went wrong");
                        this.setState({ enableLoader: false });
                    }
                } else {
                    this.showPopUp(data.msg, false);
                }
            });
    }
    closePopUp = () => {
        this.setState({
            showPopUp: false,
        });
        if (this.state.isSuccess)
            this.props.closeLoginPopup();
    };

    showPopUp(msg, isSuccess) {
        this.setState({
            showPopUp: true,
            msg: msg,
            isSuccess: isSuccess,
        });
    }

    setMsisdn = () => {
        this.setState({
            msisdn: localStorage['msisdn']
        });
    }

    setOtpValidated = () => {
        this.setState({
            otpValidated: true
        });
    }
    render() {
        const { t } = this.props;
        const { showPopUp } = this.state;
        return (
            <div className="loginSignup_modal_container">
                {showPopUp && (
                    <Popup
                        heading={this.state.heading}
                        msg={this.state.msg}
                        button={this.state.button}
                        closePopUp={this.closePopUp}
                    />
                )}
                <p className="log-in">{t('Forget Password?')}</p>
                <Otp reference={this} otptype={this.props.type} setMsisdn={this.setMsisdn} confirmFn={this.changePassword} buttonName={t('Confirm')} countryCode={this.props.countryCode} />
                {/* {otpValidated ?
                    <div>
                        <div className="form-input-login">
                            <span style={{ padding: "10px 14.5px" }}>
                                <img
                                    src={envelope}
                                    style={{ width: "15px", height: "20px" }}
                                ></img>
                            </span>
                            <input name='msisdn' type="tel"
                                maxLength="13"
                                minLength="10"
                                placeholder="Mobile Number" value={this.state.msisdn}
                                onChange={this.handleChange} placeholder="Please enter Mobile Number" required='true'></input>
                        </div>
                        <div className="form-input-login">
                            <span style={{ padding: "10px 14.5px" }}>
                                <img
                                    src={lock}
                                    style={{ width: "15px", height: "20px" }}
                                ></img>
                            </span>
                            <input
                                name="registerPassword"
                                type={seePass ? "text" : "password"}
                                placeholder="Enter Password"
                                value={this.state.registerPassword}
                                onChange={this.handleChange}
                                required="true"
                            ></input>
                        </div>
                        <div>
                            <div className="form-input-login">
                                <span style={{ padding: "10px 14.5px" }}>
                                    <img
                                        src={lock}
                                        style={{ width: "15px", height: "20px" }}
                                    ></img>
                                </span>
                                <input
                                    type={seePass ? "text" : "password"}
                                    name="repassword"
                                    placeholder="Re-enter Password"
                                    value={this.state.repassword}
                                    onChange={this.handleChange}
                                    required="true"
                                ></input>
                            </div>
                        </div>
                        <div className="log-in-btn">
                            <button
                                onClick={() =>
                                    this.changePassword()
                                }
                            >
                                Confirm
                          </button>
                        </div>
                    </div>
                    : <Otp reference={this} otptype='forgetPwdOtp' setMsisdn={this.setMsisdn} otpValidated={this.setOtpValidated} />
                } */}
                <p className="tnc">
                    {t('By_signing_up,you_agree_to_our')} <span>{t('Terms_of_Use')}</span>{" "}
                    {t('and')}
                    <span> {t('Privacy_Policy')}</span>.
                </p>
            </div>
        );
    }
}
export default withTranslation()(SetPassword);