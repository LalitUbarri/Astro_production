import React, { Component } from "react";
// import Header from "../common/Header2";
// import HeaderMenu from "../common/HeaderMenu";
import PageHeader from "../common/PageHeader";
import { getCommonHeaders, ScrollTop } from "../configuration/commonFunctions";
import apis from "../configuration/apis";
import SideMenu from "../common/SideMenu";
import Footer from "../common/Footer";
import { FRONTEND_NAME } from "../configuration/constants";
import "../styles/apply-voucher-code.css";
// import apply from "../images/apply.svg";
import gray from "../images/gray.svg";
import voucher from "../images/voucher.svg";
// import { useState, useEffect } from "react";
import Popup from "../components/popup";
import Loading from "./loader";
// import { render } from "react-dom";
import { withRouter } from "react-router-dom";
import ApplyVoucherPopup from "../components/applyVoucherPopup";
import Moment from "moment";
import $ from "jquery";
// import BottomHeader from "../common/BottomHeader";
import { withTranslation } from 'react-i18next';
import { compose } from 'redux'
import Header2 from "../common/Header2";
import PaymentInfo from "../components/paymentInfo";
import Chat_Talk_Header from "../common/Chat&Talk_Header";

class ApplyingVoucherCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: localStorage["userProfile"]
        ? JSON.parse(localStorage["userProfile"])
        : {},
      enableLoader: false,
      offerList: [],
      showPopUp: false,
      msg: "",
      button: "Ok",
      pageCount: 1,
      activePage: 0,
      pageSize: 40,
      heading: "Astrology",
      enableLoader: false,
      amount: "",
      isError: false,
      showAmtPopup: false,
      activeItem: 0,
      voucherData: localStorage["voucherData"]
        ? JSON.parse(localStorage["voucherData"])
        : {},
      invalidmsg: this.props.t("Please enter valid amount before proceeding"),
      successPopup: false,
      failurePopup: false,
      failuremsg: this.props.t("Unable to process Recharge request. Please try again"),
      amountMsg: this.props.t("Please enter amount in multiple of 50"),
      amountPopup: false,
      card: null,
      voucherApplied: false,
      RechargeCondition: [],
      IsRecharge: false,
      voucherDataVal: localStorage["voucherData"]
        ? JSON.parse(localStorage["voucherData"])
        : null,
      mobSideNaveTrue: false,
      astrolgerList: [],
      busypanditList: []
    };
  }

  setVoucherApplied(val) {
    this.setState({ voucherApplied: val })
  }

  setVoucherDataVal(data) {
    // debugger;
    this.setState({ voucherDataVal: data })
  }

  fetchBusyPandits = () => {
    var headers = getCommonHeaders();

    apis
      .fetchBusyPandits(headers)
      .then((response) => response.data)
      .then((data) => {
        console.log("resp data", data);
        if (data.code == "2000") {
          //debugger;
          {
            console.log("busypanditList" + JSON.stringify(data));
          }

          this.setState({
            busypanditList: data.data,
          });
          this.setState({ enableLoader: true });
        } else {
          console.log(data.msg);
          this.setState({ enableLoader: true });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ enableLoader: true });
      });
  };

  componentDidMount() {
    ScrollTop(10);
    this.fetchTopAstrologer();
    this.getRechargeCondition();
    const url = window.location.href;
    if (url.includes("status=failure")) {
      //alert('failure');
      this.setState({ failurePopup: true });
    }
    this.fetchOfferList();
    console.log("history...." + this.props.history.action);

    if (
      localStorage["voucherThere"] != null &&
      localStorage["voucherThere"] == "true"
    ) {
      console.log("it came back.........");
      this.removePromo();
      localStorage.removeItem("voucherData");
      localStorage.removeItem("voucherThere");
    }
  }

  fetchTopAstrologer = () => {
    const headers = getCommonHeaders()
    const body = {
      "redeemCategory": "Chat",
      "redemptionType": "white"
    }

    apis
      .getTopAstrologerList(body, headers)
      .then(response => response.data)
      .then(data => {
        console.log(data)
        if (data.code === 2000 && data.data) {
          this.setState({
            astrolgerList: data.data.length > 4 ? data.data.slice(0, 4) : data.data
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  getRechargeCondition = () => {

    var headers = getCommonHeaders();
    // headers = localStorage['selectedCountryCode'] + localStorage['msisdn'];
    apis.getRechargeCondition(headers)
      .then(response => response.data)
      .then(res => {

        this.setState({
          ...this.state,
          RechargeCondition: res.data
        })
        console.log(res.data);
      })
      .catch(err => console.log(err));

  }

  removePromo = () => {
    this.setState({
      enableLoader: false,
    });

    var headers = getCommonHeaders();

    var voucher_transaction_id = null;

    var requestBody = {
      voucherTransactionId: this.state.voucherData.voucher_transaction_id,
      promocode: this.state.voucherData.promocode,
    };

    apis
      .removePromo(requestBody, headers)
      .then((response) => response.data)
      .then((data) => {
        console.log("resp data", data);
        if (data.code == "2000") {
          //////debugger;

          this.setState({
            enableLoader: true,
          });
          this.setState({
            showVoucher: false,
          });

          localStorage.removeItem("voucherData");
        } else {
          /* else if(data.code == "2009")
    {
      localStorage.clear();
      sessionStorage.clear();
      this.setState({
        showPopUp: true,
        msg: 'Session logout ! Please login again. ',
        button: 'Ok',
       
      });
      this.setState({
        enableLoader : true
      });
    }*/
          console.log(data.msg);
          this.setState({
            enableLoader: false,
          });
          //props.showPopUpFunc(data.msg);
        }
      })
      .catch((error) => {
        //console.log(error);
        this.setState({
          enableLoader: true,
        });
      });
  };
  proceedToPay = () => {
    //this.setState({amount : document.getElementById('amountInput').value});
    const textPatt = /^[0-9]+$/g;
    var amount = this.state.amount;
    if (
      amount == null ||
      textPatt.test(amount) === false ||
      Number(amount) == 0
    ) {
      console.log("i am hererrrrrrrrrrrrrrr");
      $("html, body").animate({ scrollTop: 0 }, "fast");

      this.setState({ successPopup: true });
    } else if (Number(amount) % 50 != 0) {
      this.setState({ amountPopup: true });
    } else
      this.props.history.push({
        pathname: FRONTEND_NAME + "/paymentInfo",
        state: { amount: amount },
      });
  };

  validateAmount = (e, id) => {
    localStorage.setItem('itemId', id);
    if (e.target !== undefined) {
      this.state.RechargeCondition.map(item => {
        if (item.status === 'OFF') {
          this.setState({
            ...this.state,
            amount: e.target.value,
            IsRecharge: false
          });
        } else if (item.status === 'ON') {
          if (e.target.value % 50 === 0) {
            this.setState({
              ...this.state,
              amount: e.target.value,
              IsRecharge: false,
            });
          } else {
            this.setState({
              ...this.state,
              amount: e.target.value,
              IsRecharge: true,
              msg: item.message
            });
          }
        }
      })
    } else {
      this.state.RechargeCondition.map(item => {
        if (item.status === 'OFF') {
          this.setState({
            ...this.state,
            amount: e,
            IsRecharge: false
          });
        } else if (item.status === 'ON') {
          if (e % 50 === 0) {
            this.setState({
              ...this.state,
              amount: e,
              IsRecharge: false,
            });
          } else {
            this.setState({
              ...this.state,
              amount: e,
              IsRecharge: true,
              msg: item.message
            });
          }
        }
      })
    }

  };

  onBlurHandle = (e) => {
    if (e.target.value % 50 === 0) {
      console.log("true");
    } else {
      this.state.RechargeCondition.map(item => {
        // if (item)
      })
    }
  }
  fetchOfferList = () => {
    var headers = getCommonHeaders();

    apis
      .fetchOfferList(headers)
      .then((response) => response.data)
      .then((data) => {
        console.log("resp data", data);
        if (data.code == "2000") {
          //////debugger;
          {
            console.log("fetchOfferList" + data.data);
          }
          this.setState({ enableLoader: true, offerList: data.data });
        } else if (data.code == "2002") {
          /*  else if(data.code == "2009")
      {
        localStorage.clear();
        sessionStorage.clear();
        this.setState({enableLoader : false,
          showPopUp : true,
          msg : 'Session logout ! Please login again. '
        })
       
      }*/
          this.setState({ enableLoader: true });
        } else {
          console.log(data.msg);
          this.setState({ enableLoader: false });
          //props.showPopUpFunc(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ enableLoader: false });
      });
  };
  closePopUp = () => {
    this.setState({ showPopUp: false });
    this.props.history.push({ pathname: FRONTEND_NAME + "/home" });
  };

  closeSuccessPopUp = () => {
    this.setState({ successPopup: false });

    //props.history.push(FRONTEND_NAME + "/recharge");
    //return <Redirect to="/home" />
  };
  setAmount = (amount) => {
    this.setState({ amount: amount });
  };
  closeAmtPopUp = () => {
    this.setState({ showAmtPopup: false });
  };

  setAmtPop = () => {
    this.setState({ showAmtPopup: true });
  };
  closefailurePopUp = () => {
    this.setState({ failurePopup: false });
  };
  closeAmountPopUp = () => {
    this.setState({ amountPopup: false });
  };

  IsMob_Side_Nave = (e) => {
    this.setState({
      ...this.state,
      mobSideNaveTrue: e
    })
  }

  fetchPanditProfile = (panditData) => {
    const panditMsisdn = panditData.goodsId;
    const panditExp = panditData.goodsAttribute;
    const panditName = panditData.goodsName;
    this.props.history.push({
      pathname: FRONTEND_NAME + "/panditProfile",
      state: { panditMsisdn: panditMsisdn, panditExp: panditExp, panditName: panditName, data: panditData },
    })
  }

  // IsActiveItem = (e) => {

  //   // var header = document.getElementById("recharge");
  //   // var btns = header.getElementsByClassName("rechargeBtn");
  //   // console.log(btns.length);
  //   // for (var i = 0; i < btns.length; i++) {
  //   //   btns[i].addEventListener("click", function () {
  //   //     var current = document.getElementsByClassName("rate-card-selected");
  //   //     console.log(btns[i]);
  //   //     current[0].className = current[0].className.replace("rate-card-selected", "");
  //   //     this.className += "rate-card-selected";
  //   //   });
  //   // }

  //   var header = document.getElementById("myDIV");
  //   var btns = header.getElementsByClassName("btn");
  //   for (var i = 0; i < btns.length; i++) {
  //     btns[i].addEventListener("click", function () {
  //       var current = document.getElementsByClassName("active");
  //       current[0].className = current[0].className.replace(" active", "");
  //       this.className += " active";
  //     });
  //   }
  // }

  componentDidUpdate() {
    var selector = '.a-border';
    $(selector).on('click', function () {
      $(selector).removeClass('activeRecharge');
      $(this).addClass('activeRecharge');
    });
  }

  render() {
    const { t } = this.props;
    const { astrolgerList, IsClicked } = this.state;
    console.log(this.state);
    return (
      <>
        <Chat_Talk_Header
          IsNavIconTrue={false}
          IsSearchTrue={false}
          IsFilterTrue={false}
          // editSearchTerm={this.editSearchTerm}
          // editSortTerm={this.editSortTerm}
          // IsMob_Side_Nave={this.IsMob_Side_Nave}
          propsData={this.props}
          IsTitleTrue={true}
          title={t("ADD_MONEY_TO_WALLET")}
          CustomClass={true}
        />
        {/* {alert(this.state.msg)}; */}
        <div className="mob_480">
          <Header2
            IsActive_header_Or_not="chat_and_talk_header-"
          />
        </div>

        {/* <BottomHeader /> */}
        <div className="container">

          {/* <HeaderMenu /> */}
          <div className="">
            <PageHeader

              name={{ firstname: "ADD", lastname: "MONEY TO WALLET" }}
            />
          </div>

          {this.state.showPopUp ? (
            <Popup
              heading={this.state.heading}
              msg={this.state.msg}
              button={this.state.button}
              closePopUp={() => this.closePopUp()}
            />
          ) : null}
          {this.state.enableLoader ? null : <Loading />}
          {this.state.successPopup ? (
            <Popup
              heading={this.state.heading}
              msg={this.state.invalidmsg}
              button="Ok"
              closePopUp={() => this.closeSuccessPopUp()}
            />
          ) : null}
          {this.state.failurePopup ? (
            <Popup
              heading={this.state.heading}
              msg={this.state.failuremsg}
              button="Ok"
              closePopUp={() => this.closefailurePopUp()}
            />
          ) : null}
          {this.state.amountPopup ? (
            <Popup
              heading={this.state.heading}
              msg={this.state.amountMsg}
              button="Ok"
              closePopUp={() => this.closeAmountPopUp()}
            />
          ) : null}
          <div className="row page-body" style={{ marginBottom: "50px" }}>

            <div className={this.state.mobSideNaveTrue ? "col-md-3 mobsidemenu mob_Side_Nave" : 'col-md-3 mobsidemenu'}>
              <SideMenu />
            </div>
            <div >
              <div className="container desk_top" id="recharge_page">
                <div className={"mt-3"}>
                  <p className="our_head">{t('Our Astrologer')}</p>
                </div>
                <ul className="cards">
                  {astrolgerList.map(data => (
                    <div className={
                      this.state.busypanditList.some(
                        (item) => data.goodsId === item) ?
                        "card2 astro-card text-right cardd_busy" : data.goodsSale === 0 ? "card2 astro-card text-right cardd_ofline"
                          : "card2 astro-card text-right cardd_online"} onClick={this.fetchPanditProfile.bind(this, data)}>
                      {this.state.busypanditList.some(
                        (item) => data.goodsId === item) ?
                        null : data.goodsSale === 0 ? null
                          : <div className="text-right online wd-100"><span className="blinking-green">&nbsp;</span></div>}

                      <div className="astrology_profile pd-10">
                        <div className={
                          this.state.busypanditList.some(
                            (item) => data.goodsId === item) ?
                            "Astro-img cardd_busy_border" : data.goodsSale === 0 ? "Astro-img"
                              : "Astro-img border_color_green"}>
                          <img className="" src={data.goodsImage} alt={data.goodsName} />
                        </div>
                      </div>
                      <div className="goods_name" style={{ textAlign: 'center' }}>
                        <span className="b">{this.state.language === 'hi' ? data.goods_name_hindi : data.goodsName}</span>
                      </div>
                      <p className="astro-sub-text mb-480" style={{ textAlign: 'center', marginLeft: '0px' }}>
                        {this.state.language === 'hi' ? data.goodsShortDescriptionHindi : data.goodsShortDescription}
                      </p>
                    </div>
                  ))}
                </ul>
              </div>

            </div>
            <div className="head_mob mb-2 desk_top">
              <span> Recharge and talk to Astrologers </span>
            </div>


            <div className="col pd-0">
              <div className="col pd-0">
                <div className="row page-body p-0">
                  <div className="col-12 col-md-12 p-0">
                    <div className="row" id="myDIV">
                      {this.state.offerList.map((data, i) => (
                        <div
                          id="recharge1"
                          className="col-lg-4 col-md-6 col-xs-6 float-left mb-3 btn "
                          onClick={(event) => {
                            this.setAmount(data.cardAmount)
                            this.setState({ ...this.state, card: data.id, IsClicked: true })
                            this.validateAmount(data.cardAmount, data.id)
                          }}

                        >
                          <div className={this.state.activeItem === i ? "row-cols-12 a-border rate-card " : "row-cols-12 a-border rate-card"}>
                            <div className="float-left off">
                              {data.discountPercent}%
                              {t('OFF')}
                            </div>
                            <div className=" float-left text-left pl-1 ">
                              <p className="a-amt">&#43; {localStorage['currency'] ? localStorage['currency'] : '₹'} {data.cardAmount}</p>
                              <p className="a-date">
                                {t('Expire Date')}:{" "}
                                {Moment(data.endDate).format("DD-MM-yyyy")}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>


                    <div
                      className="row">
                      <div className="col-12 mb-1 col-md-6">
                        <div className="voucher-input text-left">
                          <input
                            placeholder={t('Please_enter_amount')}
                            className={this.state.IsRecharge ? "border-danger input-vo" : "input-vo"}
                            id="amountInput"
                            value={this.state.amount}
                            onChange={(e) => this.validateAmount(e)}
                            onBlur={(e) => this.onBlurHandle(e)}
                          />
                          {this.state.isError ? <b>{t("Invalid Amount")}</b> : null}
                          {this.state.IsRecharge ? <span className="text-danger err_msg"> {this.state.msg}</span> : null}
                        </div>
                      </div>

                      <div className="col-12 col-md-6">
                        <div
                          className="voucher-apply"
                          data-toggle="modal"
                          data-target="#exampleModalCenter"
                        >
                          <span style={{ float: "left" }}>
                            <img src={voucher}></img>
                          </span>
                          <span style={{ float: "left", marginLeft: "20px" }}>
                            {t('Apply_Voucher_Code')}
                          </span>
                          <span className="right_arrow" style={{ float: "right" }}>
                            <img src={gray}></img>
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <div className="row btnnn">
                    <div className="col-12 col-md-12">
                      <button onClick={() => this.proceedToPay()}>{t('Proceed')}</button>

                    </div>
                  </div> */}
                  </div>
                </div>
              </div>
              {<PaymentInfo setVoucherApplied={this.setVoucherApplied.bind(this)} setVoucherDataVal={this.setVoucherDataVal.bind(this)}
                voucherApplied={this.state.voucherApplied} voucherDataVal={this.state.voucherDataVal} amount={this.state.amount} IsClicked={IsClicked} />}
            </div>
          </div>
        </div>
        <ApplyVoucherPopup voucherApplied={this.state.voucherApplied} setVoucherApplied={this.setVoucherApplied.bind(this)} setVoucherDataVal={this.setVoucherDataVal.bind(this)} amount={{ value: this.state.amount }} />




        <Footer history={this.props} />
      </>
    );
  }
}

const withCombine = compose(
  withRouter,
  withTranslation()
)


export default withCombine(ApplyingVoucherCode);
