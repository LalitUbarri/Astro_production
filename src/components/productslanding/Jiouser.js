import React, { Component } from 'react';
import { withRouter } from "react-router";
import { withTranslation } from 'react-i18next';
import { compose } from 'redux'
import parse from 'html-react-parser';
import { getCommonHeaders } from "../../configuration/commonFunctions";
import apis from "../../configuration/apis";
import { getApi } from "../../configuration/apis";
import { FRONTEND_NAME } from '../../configuration/constants';
import * as ErrorConstant from "../../configuration/errorConstants";
import * as Constant from '../../configuration/constants';
import $ from 'jquery';
import axios from 'axios'
import apiUrls from '../../configuration/apiUrls';
import Loading from '../loader';
import Popup from "../popupChat";
import Spinner from 'react-bootstrap/Spinner';
import Logo from '../../images/newImages/login.svg'


// const msisdn = '8447727148';
var msisdn;
// const logo = 'http://14.99.239.244:8080/AstroApi/images/login.svg'


class Jiouser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      policyData: {},
      policyData1: {},
      Terms: '',
      Privacy: 'I agree with Privacy Policy',
      IsTrue: false,
      Isdata: false,
      Isloader: false,
      showPopUp: false,
      IsJiouserRepet: false

    }

  }


  fetchPrivacyPolicy = () => {
    var headers = getCommonHeaders();
    apis
      .fetchPrivacyPolicy(headers)
      .then((response) => response.data)
      .then((data) => {
        if (data.code == "2000") {
          ////debugger
          this.setState({
            policyData: data.data.privacyPolicyData[1],
            policyData1: data.data.privacyPolicyData[0],
          });
        } else {
          console.log(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onchangeHandle = (e) => {
    const { name, value } = e.target;
    console.log(value);
    this.setState({
      ...this.state,
      [name]: value,
      Ischecked:e.target.checked
    })
  }

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

  // fetchCurrency = () => {
  //   let header = getCommonHeaders();

  //   const countryCode = localStorage["selectedCountryCode"] ? localStorage["selectedCountryCode"] : '91';
  //   apis.getCurrencyData(header, countryCode)
  //     .then(data => data.data)
  //     .then(data => {
  //       // console.log("Cerrency ", data.data)
  //       // console.log("Cerrency ", data.data.currencyLogo)
  //       localStorage['currency'] = data.data.currencyLogo
  //     })
  //     .catch(er => {
  //       console.log("Error - ", er)
  //     })
  // }

  fetchStaticData = () => {
    const headers = getCommonHeaders();
    headers.msisdn = this.props.match.params.msisdn
    apis
      .getStaticData(headers)
      .then((response) => response.data)
      .then((data) => {
        // console.log("static ddddata", data.data);
        // var session = data.data.filter(d => d.titleKey === "freeChatAndCallSession").length > 0 ? true : false;
        // if (session) {
        //   alert('true')
        // } else {
        //   alert('false')
        // }
        this.setState({
          isFreeSession: data.data.filter(d => d.titleKey === "freeChatAndCallSession").length > 0 ? true : false
        }); 
        localStorage.setItem('freeSession',data.data.filter(d => d.titleKey === "freeChatAndCallSession").length > 0 ? true : false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getUserProfileDetails = () => {
    // var url = Constant.ASTRO_URL + Constant.GET_USER_PROFILE_DETAILS + "/91" + this.state.userName;
    var url = Constant.ASTRO_URL + Constant.GET_USER_PROFILE_DETAILS;
    const headers = getCommonHeaders();
    headers.msisdn = this.props.match.params.msisdn;
    // alert(JSON.stringify(headers));
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

  componentDidMount() {
    localStorage.setItem("selectedCountryCode", 91);
    console.log(this.props.match.params.msisdn);
    var dd = parseInt(localStorage['userBalance']);
    var msisdn_clear = localStorage['selectedCountryCode'] + localStorage['msisdn'];
    if (localStorage['msisdn'] && this.props.match.params.msisdn !== msisdn_clear) {
      localStorage.clear();
      window.location = window.location.href
    } else {
      // alert(this.props.match.params.msisdn.slice(2, 12))
      var msisdn = typeof this.props.match.params.msisdn === undefined ? localStorage['selectedCountryCode'] + localStorage['msisdn'] : this.props.match.params.msisdn;

      var url = apiUrls.getUserStatusAstroking;
      url = url.replace("<msisdn>", this.props.match.params.msisdn);
      axios.post(url)
        .then(response => response.data)
        .then(res => {
          console.log(res.DATA.userStatus);
          
          if (res.DATA.userStatus === 'true') {
            this.setState({
              ...this.state,
              IsJiouserRepet: true
            })
            localStorage.setItem("isJioUser", true)
            var url = apiUrls.jioUserCheck;
            url = url.replace('<msisdn>', this.props.match.params.msisdn);
            var header = getCommonHeaders();
            header.msisdn = this.props.match.params.msisdn;
            axios.post(url, header)
              .then(response => response.data)
              .then(res => {
                console.log(res.data);
                 //debugger
                localStorage['msisdn'] = this.props.match.params.msisdn.slice(2, 12);
                localStorage.setItem("userProfile", JSON.stringify(res.data));
                localStorage["isUserLoggedIn"] = true;
                this.setState({
                  ...this.state,
                  Isloader: false
                })
               apis
                .getStaticData(header)
                .then((response) => response.data)
                .then((data) => {
                  this.setState({
                    isFreeSession: data.data.filter(d => d.titleKey === "freeChatAndCallSession").length > 0 ? true : false
                  }); 
                  localStorage.setItem('freeSession',data.data.filter(d => d.titleKey === "freeChatAndCallSession").length > 0 ? true : false);

                  if ((data.data.filter(d => d.titleKey === "freeChatAndCallSession").length > 0 ? true : false)) {
                   // alert("ff");
                    localStorage.setItem('freeSession', data.data.filter(d => d.titleKey === "freeChatAndCallSession").length > 0 ? true : false);
                   
                    // (data.data.filter(d => d.titleKey === "freeChatAndCallSession").length > 0 ? true : false) ? window.location.assign(FRONTEND_NAME + '/freesession') : this.props.history.push(FRONTEND_NAME + '/recharge')
                    (data.data.filter(d => d.titleKey === "freeChatAndCallSession").length > 0 ? true : false) ? window.location.assign(FRONTEND_NAME + '/freesession') : this.props.history.push(FRONTEND_NAME + '/talk')

                   
                  } else {
                   // alert("ee");
                    apis
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
                          // balance > 50 ? this.props.history.push(FRONTEND_NAME + '/talk') : this.props.history.push(FRONTEND_NAME + '/recharge')
                          balance > 50 ? this.props.history.push(FRONTEND_NAME + '/talk') : this.props.history.push(FRONTEND_NAME + '/talk')

                        }
                      } else {
                        console.log(data.msg);
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                     
                      
                    
                  }
                })
                .catch((error) => {
                  console.log(error);
                }); 
              })
              .catch(err => console.log(err));
          }else{
            this.setState({
            ...this.state,
            IsJiouserRepet: false
          })
          this.fetchStaticData();
          this.getUserBalance();
          }

        })
        .catch(err => console.log(err));
    }
    this.fetchPrivacyPolicy(true);
  }

  OnSubmitHandle = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      Isloader: true
    })
    if (this.state.Terms === '' || this.state.Privacy === '' || this.state.Terms === "not agree") {
      this.setState({
        ...this.state,
        showPopUp: true,
        Isloader: false,
        msg: 'Please indicate that you have read and agree to the Terms and Conditions, and Privacy Policy',
        isSuccess: false
      })
    }
    else if (this.state.Terms === 'I agree with Terms & Conditions' && this.state.Privacy === 'I agree with Privacy Policy') {
      var url = apiUrls.jioServiceAccepance;

      const Body = {
        msisdn: this.props.match.params.msisdn,
        agrrement: "tncpnc",
        service: 'Astroking'
      }
      axios.post(url, Body)
        .then(response => response.data)
        .then(res => {
          console.log(res);
          // debugger
          var url = apiUrls.jioUserCheck;
          url = url.replace('<msisdn>', this.props.match.params.msisdn)
          var header = getCommonHeaders();
          header.msisdn = this.props.match.params.msisdn;
          console.log( this.props.match.params.msisdn);
          // debugger
          axios.post(url, header)
            .then(response => response.data)
            .then(res => {
              console.log(res.data);
              localStorage['msisdn'] = this.props.match.params.msisdn.slice(2, 12);
              localStorage.setItem("isJioUser", true)
              localStorage.setItem("userProfile", JSON.stringify(res.data));
              localStorage["isUserLoggedIn"] = true;
              this.getUserProfileDetails();
              this.setState({
                ...this.state,
                Isloader: false
              })
              // setTimeout(() => {
              //   window.location = FRONTEND_NAME + '/freesession'
              // }, 1000);

              var url = apiUrls.jioUserCheck;
              url = url.replace('<msisdn>', this.props.match.params.msisdn);
              var header = getCommonHeaders();
              header.msisdn = this.props.match.params.msisdn;
              axios.post(url, header)
                .then(response => response.data)
                .then(res => {
                  console.log(res.data);
                   //debugger
                  localStorage['msisdn'] = this.props.match.params.msisdn.slice(2, 12);
                  localStorage.setItem("userProfile", JSON.stringify(res.data));
                  localStorage["isUserLoggedIn"] = true;
                  this.setState({
                    ...this.state,
                    Isloader: false
                  })
                 apis
                  .getStaticData(header)
                  .then((response) => response.data)
                  .then((data) => {
                    this.setState({
                      isFreeSession: data.data.filter(d => d.titleKey === "freeChatAndCallSession").length > 0 ? true : false
                    }); 
                    localStorage.setItem('freeSession',data.data.filter(d => d.titleKey === "freeChatAndCallSession").length > 0 ? true : false);
  
                    if ((data.data.filter(d => d.titleKey === "freeChatAndCallSession").length > 0 ? true : false)) {
                     // alert("ff");
                      localStorage.setItem('freeSession', data.data.filter(d => d.titleKey === "freeChatAndCallSession").length > 0 ? true : false);
                     
                      // (data.data.filter(d => d.titleKey === "freeChatAndCallSession").length > 0 ? true : false) ? window.location.assign(FRONTEND_NAME + '/freesession') : this.props.history.push(FRONTEND_NAME + '/recharge')
                      (data.data.filter(d => d.titleKey === "freeChatAndCallSession").length > 0 ? true : false) ? window.location.assign(FRONTEND_NAME + '/freesession') : this.props.history.push(FRONTEND_NAME + '/talk')

                     
                    } else {
                     // alert("ee");
                      apis
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
                            // balance > 50 ? this.props.history.push(FRONTEND_NAME + '/talk') : this.props.history.push(FRONTEND_NAME + '/recharge')
                            balance > 50 ? this.props.history.push(FRONTEND_NAME + '/talk') : this.props.history.push(FRONTEND_NAME + '/talk')

                          }
                        } else {
                          console.log(data.msg);
                        }
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                       
                        
                      
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  }); 
                })
                .catch(err => console.log(err));

            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err))


    }
  }
  closePopUp = () => {
    this.props.history.push(FRONTEND_NAME + `/jiouser/${this.props.match.params.msisdn}`)
    this.setState({
      showPopUp: false,
    });
  };
  // 9213765654
  render() {
    const { IsJiouserRepet } = this.state;

    return (
      <>
        {this.state.showPopUp && (
          <Popup
            msg={this.state.msg}
            isSuccess={this.state.isSuccess}
            closePopUp={this.closePopUp}
            type={'jiouser'}
            widthSize={'jiouser_modal_content'}
          />
        )}

        {IsJiouserRepet ? <div className={"splash_screen_container align-items-center"}>
          <div className="logo_container">
            <img src={Logo} className="logo_img" alt="logo" width={200} />
            <p className="mt-5 text-white">Loading...</p>
          </div>
        </div> : <>
          {Object.keys(this.state.policyData).length !== 0 ? <>

            <div className={"splash_screen_container align-items-end"}>
              <div className="logo_container">
                <img src={Logo} className="logo_img" alt="logo" width={200} />
              </div>
              <div className='term_container'>
                <form onSubmit={(e) => this.OnSubmitHandle(e)}>
                  <div className='row page-body align-items-center mt-3'>
                    <input type="checkbox" name="Terms" id="terms" onChange={(e) => this.onchangeHandle(e)} className='check_agree' value={!this.state.Ischecked ? "I agree with Terms & Conditions":'not agree'} />
                    <label htmlFor='terms' className='m-0 label_jio'> I agree with  <span onClick={() => this.props.history.push(FRONTEND_NAME + "/terms", {
                      state: {
                        msisdn: this.props.match.params.msisdn,
                        user: 'jiouser'
                      }
                    })}>Terms & Conditions</span> and <span onClick={() => this.props.history.push(FRONTEND_NAME + "/privacyPolicy", {
                      state: {
                        msisdn: this.props.match.params.msisdn,
                        user: 'jiouser'
                      }
                    })}>Privacy Policy </span> </label>
                  </div>
                  {/* <div className='row page-body align-items-center mt-3'>
                    <input type="checkbox" name="Privacy" id="Privacy" onChange={(e) => this.onchangeHandle(e)} className='check_agree' value="I agree with Privacy Policy" />
                    <label htmlFor='Privacy' className='m-0'> I agree with  </label>
                  </div> */}
                  <div className="row page-body align-items-center mt-3">
                    <button className="btn log-in-btn btn_bg_white pd-10" type="submit" disabled={this.state.Isloader}> {this.state.Isloader ? <Spinner animation="border" variant="warning" /> : 'signup'} </button>
                  </div>
                </form>
              </div>
            </div>
          </> : <Loading />
          }
        </>}

      </>
    );
  };

}

const withCombine = compose(
  withRouter,
  withTranslation()
)

export default withCombine(Jiouser);
