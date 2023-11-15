import React from "react";
import { withRouter } from "react-router-dom";
import Signup from "./signup";
//import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "jquery/dist/jquery.min";
import "../styles/login.css";
import astro from "../images/astro.svg";
import close from "../images/close.svg";
import envelope from "../images/envelope.svg";
import lock from "../images/lock.svg";
import Popup from "../components/popup";
import * as Constant from "../configuration/constants";
import {
  FRONTEND_NAME,
  ENCRYPTION_SECRET_KEY,
} from "../configuration/constants";
import { getApi, postApi } from "../configuration/apis";
import queryString from "query-string";
import { getCommonHeaders } from "../configuration/commonFunctions";
import * as ErrorConstant from "../configuration/errorConstants";
import { withTranslation } from 'react-i18next';
import { compose } from 'redux'
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      showPopUp: false,
      msg: "",
      button: "Ok",
      response: "",
      heading: "Astrology",
    };
  }

  componentDidMount() {
    /*
    const values = queryString.parse(this.props.location.search);
    let err = values.err;

    if (err == "1") {

      this.setState({
        showPopUp: true,
        msg: 'Session logout ! Please login again. ',
        button: 'Ok'
      });
    }
    */
  }

  forgotPassword = (otptype) => {
    this.props.history.push({
      pathname: FRONTEND_NAME + "/forgotPassword",
      state: { otptype: otptype },
    });
  };

  getUserProfileDetails = (username) => {
    console.log("inside getUserProfileDetails method");

    var url = Constant.ASTRO_URL + Constant.GET_USER_PROFILE_DETAILS;
    const headers = getCommonHeaders();
    getApi(url, headers)
      .then((response) => response.data)
      .then((data) => {
        if (data && data.code == ErrorConstant.SUCCESS_CODE) {
          console.log("data ", data.data);
          try {
            this.setState({ enableLoader: true });
            localStorage["msisdn"] = username;
          } catch (error) {
            console.log("exception occured");
            this.toggleShowMsg("Something went wrong");
            this.setState({ enableLoader: false });
          }
        } else {
          console.log(
            "Error code from login API : ",
            data.code,
            "with msg : ",
            data.msg
          );
          this.setState({
            showPopUp: true,
            msg: data.msg,
            button: "Ok",
          });
          this.setState({ enableLoader: false });
          return;
        }
      })
      .catch((error) => {
        console.log();
        console.error("error", error);
        this.setState({ enableLoader: false });
      });
  };

  login = (username, password) => {
    this.getUserProfileDetails(username);
    console.log("inside login method");

    const crypto = require("crypto");

    var encrypt = function (data, key) {
      var cipher = crypto.createCipher("aes-128-ecb", key);
      return cipher.update(data, "utf8", "base64") + cipher.final("base64");
    };
    console.log("encrypted password", encrypt(password, ENCRYPTION_SECRET_KEY));

    var url = Constant.ASTRO_URL + Constant.POST_LOGIN;
    const body = {
      userName: username,
      password: encrypt(password, ENCRYPTION_SECRET_KEY),
      mode: "password",
      source: Constant.ROLE_CLIENT,
    };
    const headers = getCommonHeaders();
    // console.log("body", body);
    postApi(url, headers, body)
      .then((response) => response.data)
      .then((data) => {
        if (data && data.code == ErrorConstant.SUCCESS_CODE) {
          // console.log("data ", data.data);
          try {
            sessionStorage["userProfile"] = JSON.stringify(data.data);
            var data2 = JSON.parse(sessionStorage.getItem("userProfile"));
            sessionStorage.setItem('msisdn', localStorage['selectedCountryCode'] + localStorage['msisdn']);
            // console.log(data2.accessToken);
            this.props.history.push(FRONTEND_NAME + "/home");
            window.location.reload();
            this.setState({ enableLoader: true });
          } catch (error) {
            // console.log("exception occured");
            this.toggleShowMsg("Something went wrong");
            this.setState({ enableLoader: false });
          }
        } else {
          // console.log(
          //   "Error code from login API : ",
          //   data.code,
          //   "with msg : ",
          //   data.msg
          // );
          this.setState({
            showPopUp: true,
            msg: data.msg,
            button: "Ok",
          });
          this.setState({ enableLoader: false });
          return;
        }
      })
      .catch((error) => {
        // console.log();
        // console.error("error", error);
        this.setState({ enableLoader: false });
      });
  };

  onUserNameChange(value) {
    this.setState({
      userName: value,
    });
  }

  onPasswordChange(value) {
    this.setState({
      password: value,
    });
  }

  handleChange = (event) => {
    let name = event.target.name;

    event.target.value = event.target.value.replace(/[^0-9]/g, "");

    this.setState({
      [name]: event.target.value,
    });
  };

  closePopUp = () => {
    this.setState({
      showPopUp: false,
    });
  };

  signup = () => {
    //  this.props.history.push(FRONTEND_NAME+"/signup");
    <Signup />;
  };
  render() {
    const {t}= this.props;
    return (
      <div className="modal modal-m" role="dialog" style={{ display: "block" }}>
        {this.state.showPopUp ? (
          <Popup
            heading={this.state.heading}
            msg={this.state.msg}
            button={this.state.button}
            closePopUp={this.closePopUp}
          />
        ) : null}
        <div className="modal-dialog modal-dialog-m" role="document">
          <div className="modal-content modal-content-m">
            <div className="modal-body modal-body-m">
              <div className="modal-body-left">
                <p className="astro-head">{t('Astrology')}</p>
                <p className="astro-dtls">
                  The standard chunk of Lorem Ipsum used since the 1500s is
                  reproduced below for those interested. Sections 1.10.32 and
                  1.10.33 from “de Finibus Bonorum et Malorum” by Cicero are
                  also reproduced in their exact original form.
                </p>
                <img src={astro} className="astro-img" alt="img"></img>
              </div>
              <div className="modal-body-ryt">
                <img src={close} className="close-img" alt="img"></img>
                <nav class="navbar navbar-expand-lg navbar-light navbar-m">
                  <div class="collapse navbar-collapse d-block" id="navbarNav">
                    <ul class="navbar-nav">
                      <li
                        class="nav-item active mg-ryt"
                        style={{ cursor: "pointer" }}
                      >
                        <a class="nav-link l-text pd-0" href="#">
                          {t('Login')}
                          {/* <span class="sr-only">(current)</span> */}
                        </a>
                      </li>
                      <li
                        class="nav-item"
                        onClick={this.signup}
                        style={{ cursor: "pointer" }}
                      >
                        <a class="nav-link l-text pd-0" href="#">
                          {t('Signup')}
                        </a>
                      </li>
                    </ul>
                  </div>
                </nav>
                <p className="log-in">Log in to Astrotalk</p>
                <div className="form-input-login">
                  <span>
                    <img src={envelope} alt="mail"></img>
                  </span>
                  <input
                    name="userName"
                    type="tel"
                    maxLength="10"
                    minLength="10"
                    placeholder={t('Mobile_Number')}
                    value={this.state.userName}
                    onChange={this.handleChange}
                    required="true"
                  ></input>
                </div>
                <div className="form-input-login">
                  <span style={{ padding: "10px 14.5px" }}>
                    <img
                    alt="img"
                      src={lock}
                      style={{ width: "15px", height: "20px" }}
                    ></img>
                  </span>
                  <input
                    name="password"
                    type="password"
                    placeholder={t('Password')}
                    value={this.state.password}
                    onChange={this.handleChange}
                    required="true"
                  ></input>
                </div>
                <div className="log-in-btn">
                  <button
                    onClick={() =>
                      this.login(this.state.userName, this.state.password)
                    }
                  >
                    {t('Login')}
                  </button>
                </div>
                <p className="tnc">
                  {t('By_signing_up,you_agree_to_our')} <span>{t('Terms_of_Use')}</span> {t('and')}
                  <span>{t('Privacy_Policy')}</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(withRouter,withTranslation)(Login);
