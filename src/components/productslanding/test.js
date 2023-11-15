import React from 'react';
import { FRONTEND_NAME } from '../../configuration/constants';
import * as Constant from "../../configuration/constants";
import { getCommonHeaders } from "../../configuration/commonFunctions";
import {postApi} from "../../configuration/apis";
import * as ErrorConstant from "../../configuration/errorConstants";
import close from "../../images/close.svg";
import pandit from "../../images/pandit.png";
import bottom from "../../images/bottom.svg";
import PhoneInput from 'react-phone-input-2'
import '../../styles/otpFlow.css';
import { withTranslation } from 'react-i18next';
import { compose } from 'redux'
import OtpInput from 'react-otp-input';


class Test extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showPopUp:false,
        timer:0,
        seconds: 120,
        time: {},
        phone: '',
        otpSent: false,
        otpValue: '',
        isValidated: false,
      }
      this.timer = 0;
    this.startTimer = this.startTimer.bind(props.reference);
    this.countDown = this.countDown.bind(props.reference);
}
    

    closePopUp = () => {
        this.setState({
            ...this.state,
          showPopUp: false,
        });
    };

    handleOtpChange = (otpValue) => {
        this.setState({ otpValue: otpValue });
        if (otpValue.length == 4)
          this.validateOTP(otpValue);
    }


    checkUserProfileStatus = () => {
        
        var url = Constant.ASTRO_URL + Constant.CHECK_USER_PROFILE_STATUS;
        localStorage['msisdn'] = this.state.phone.slice(2,12);
        // alert(url);
        const headers = getCommonHeaders();
        headers.msisdn = localStorage['msisdn'];
        const body = {
            mode:'mobile',
            value:this.state.phone
        }
        postApi(url,headers,body)
        .then((response) => response.data)
        .then((res) => {
            if(res.code === ErrorConstant.SUCCESS_CODE){
                this.SendOtp();
            }else if(res.code === '4010'){
                alert(res.msg)
            }else console.log(res);
           
        })
        .catch((err) => { console.log(err);});
      }

      startTimer = () => {
        if (this.timer == 0 && this.state.seconds > 0) {
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


    

    SendOtp = () => {
        if (
            this.state.phone == null ||
            this.state.phone == undefined ||
            this.state.phone.length == 0
        ) {
          alert(this.props.t('Please_enter_a_valid_mobile_number'));
          return;
        }
        console.log('inside registerotp ' +  this.state.phone);
        localStorage["msisdn"] = this.state.phone.slice(2,12);
        var requestBody = {
          msisdn:  this.state.phone,
        };
        var headers = getCommonHeaders();
        headers.msisdn = localStorage["msisdn"];
    
        var url = Constant.ASTRO_URL + Constant.SEND_OTP_REGISTER;
        postApi(url, headers, requestBody)
        .then((response) => response.data)
        .then((res) => {
            if (res && res.code == ErrorConstant.SUCCESS_CODE) {
            console.log("data ", res.data);
            try {
                console.log("response sendOTP ", res);
                // this.setState({ otpSent: true });
                // this.showPopUp(data.msg, true);
                this.setState({
                    seconds: 120,
                    otpSent: true,
                }, ()=> {
                    this.startTimer();
                    let timeLeftVar = this.secondsToTime(this.state.seconds);
                    this.setState({time: timeLeftVar });
                });
                
            } catch (error) {
                console.log("exception occured" + error);
                //this.toggleShowMsg("Something went wrong");
                // this.setState({ enableLoader: false });
            }
            } else {
            alert(res.msg);
            }
        });

      };

      validateOTP = (otpVal) => {
        if (otpVal.length !== 4) {
          alert(this.props.t('Please_enter_valid_OTP'));
          return;
        }
    
        console.log('inside validateotp ' + this.state.phone);
    
        localStorage["msisdn"] = this.state.phone.slice(2,12);
      
          var url = Constant.ASTRO_URL + Constant.VALIDATE_OTP_REGISTER;
          var requestBody = {
            msisdn:  this.state.phone,
            otp: otpVal,
          };
        const headers = getCommonHeaders();
        headers.msisdn = this.state.phone;
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
      componentWillUnmount() {
        clearInterval(this.timer);
      }

      render(){
        const {t} = this.props;
        const {time,otpSent,isValidated} = this.state;
        return (<>
            <div className="modal modal-m" role="dialog" style={{ display: "block" }}>
                <div className="modal-dialog modal-dialog-m" role="document">
                  <div className="modal-content modal-content-m">
                    <div class="modal-header">
                        <img src={close} className="close-img close" data-dismiss="modal" aria-label="Close" alt='img' />
                    </div>
                    <div className="modal-body modal-body-m">
                      <div className={"modal-body-left-s"}
                        style={{ textAlign: "center" }}
                      > 
                        <img src={ pandit } className={"pandit-img"} alt='pandit'></img>
                        <img src={bottom} className={"bottom-img"} alt='img'></img>
                      </div>
                      <div className="modal-body d-flex align-items-center">
                          
                            {!otpSent ? <div>
                              <p className="">{`Verify OTP with${this.state.phone}`}</p>
                              <div className="otp_outter d-flex -align-items-center justify-content-center"> 
                            <OtpInput
                                value={this.state.otpValue}
                                onChange={this.handleOtpChange}
                                numInputs={4}
                                placeholder={'0'}
                                className="otp_container"
                                separator={<span></span>}
                                inputStyle="form-control otp-field"
                                // isDisabled={isValidated ? true : false}
                              />
                                <button className='btn vrifyoTPbtn'> Verify OTP </button>
                              </div></div> :<div className="loginSignup_modal_container">
                                <p className="">{t('Login to Astroking')}</p>
                                <div className="phone_container">
                                  <PhoneInput
                                    country={'in'}
                                    className="phoneInput"
                                    name='phone'
                                    placeholder='phone'
                                    value={this.state.phone}
                                    onChange={(phone => this.setState({...this.state,phone:phone}))}
                                  />
                                </div>
                                
                                <div className="log-in-btn">
                                  <button onClick={()=> this.checkUserProfileStatus()}>
                                    {t('Submit')}
                                  </button>
                                </div>
                                <div className="valid-box">
                                    <span>{t('OTP is valid for')}:</span>
                                    <span>
                                        {time.m}:{time.s}
                                    </span>
                                </div>
                                <p className="tnc">
                                  {t('By_signing_up,you_agree_to_our')}
                                  <span onClick={() =>
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
                              </div>}
                          </div>
                        
                      </div>
                    </div>
                  </div>
                </div >
                
            </>);
    }
}

const withCombine = compose(
// withRouter,
withTranslation()
)
export default withCombine(Test);
        
        
