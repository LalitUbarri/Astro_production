import React from "react";
import { withRouter } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "jquery/dist/jquery.min";
// import about from "../images/about.png";
import "../styles/about.css";
// import Header from "../common/Header";
import * as Constant from "../configuration/constants";
// import { getApi, postApi } from "../configuration/apis";

import { getCommonHeaders } from "../configuration/commonFunctions";
// import * as ErrorConstant from "../configuration/errorConstants";
import { FRONTEND_NAME } from "../configuration/constants";
import apis from "../configuration/apis";
import apiUrls from "../configuration/apiUrls";
// import Moment from "moment";
import Popup from "../components/popup";
// import Loading from "./loader";
import "../styles/popup.css";
// import $, { event } from "jquery";
// import BottomHeader from "../common/BottomHeader";
import { withTranslation } from 'react-i18next';
import { compose } from 'redux'
// import Header2 from "../common/Header2";

//import { Beforeunload } from 'react-beforeunload';
class PaymentInfo extends React.Component {
  onUnload = (e) => {
    //e.preventDefault();
    console.log("HELLO WORLD");
  };

  constructor(props) {
    super(props);
    this.state = {
      showPopUp: false,
      msg: "",
      button: "Ok",
      heading: "Astrology",
      enableLoader: false,
      userProfile: localStorage["userProfile"]
        ? JSON.parse(localStorage["userProfile"])
        : {},
      amount: this.props.amount,
      payInfo: {},
      voucherData: this.props.voucherData,

      percentCashBack: localStorage["voucherData"]
        ? JSON.parse(localStorage["voucherData"]).promocodeFigure
        : 0,
      showVoucher: true,
      voucherApplied: this.props.voucherApplied
    };
  }
  componentDidMount() {
    this.fetchPaymentSummary();
    //window.history.pushState(null, null, window.location.pathname);
    //window.addEventListener('popstate', this.onBackButtonEvent());
    /*$(window).on('popstate', function(event) {
      alert("pop");
     }); */

    if (this.state.voucherData) {
      localStorage["voucherThere"] = "true";
      console.log("Hihi", this.state.voucherData)
    }
  }
  // componentWillReceiveProps(nextProps) {
  //   this.setState({ amount: nextProps.amount });  
  //   this.fetchPaymentSummary();
  // }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.amount !== prevState.amount) {
      return { amount: nextProps.amount };
    }
    else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    // debugger;
    console.log(this.props.IsClicked);

    if (prevProps.amount !== this.props.amount) {
      //Perform some operation here
      this.setState({
        amount: this.props.amount,
        voucherData: this.props.voucherDataVal,
        voucherApplied: this.props.voucherApplied
        //  percentCashBack: localStorage["voucherData"]? JSON.parse(localStorage["voucherData"]).promocodeFigure: 0,
      });

      this.fetchPaymentSummary();
    }

    if (prevProps.voucherApplied != this.props.voucherApplied || (prevState.voucherData?.productCostWithoutTaxes != this.props.voucherDataVal?.productCostWithoutTaxes)) {
      this.setState({
        voucherData: this.props.voucherDataVal,
        voucherApplied: this.props.voucherApplied
        //  percentCashBack: localStorage["voucherData"]? JSON.parse(localStorage["voucherData"]).promocodeFigure: 0,
      });
    }

    if (this.props.IsClicked) {
      // alert(this.props.amount)
      setTimeout(() => {
        this.initiateRazorPay();
      }, 500);
    }
  }

  componentWillUnmount() {

    if (this.state.voucherData) {
      localStorage["voucherThere"] = "true";
    }

    localStorage.removeItem("voucherThere");
    localStorage.removeItem("voucherData");
    this.setState({
      voucherApplied: false,
      voucherData: {}
    })
    this.props.setVoucherApplied(false);
    this.props.setVoucherDataVal({});
  }

  onBackButtonEvent = () => {
    // e.preventDefault();
    console.log("back pressed>>>>>>>>>>");
  };

  fetchPaymentSummary = () => {
    var headers = getCommonHeaders();
    headers.accessToken = this.state.userProfile["accessToken"];
    headers.msisdn = localStorage["msisdn"];
    let urls = apiUrls.fetchPaymentSummary;

    urls = urls.replace("<amount>", this.state.amount);

    apis
      .fetchPaymentSummary(urls, headers)
      .then((response) => response.data)
      .then((data) => {
        console.log("Payment Summaryy ", data);
        if (data.code == "2000") {
          ////debugger;
          this.setState({
            enableLoader: true,
            payInfo: data.data,
          });
        } else {
          /* else if(data.code == "2009")
      {
        localStorage.clear();
        sessionStorage.clear();
        this.setState({
          showPopUp: true,
          msg: 'Session logout ! Please login again. ',
          button: 'Ok',
          enableLoader : false
        });
      }*/
          console.log("Hihih", data.msg);
          this.setState({ enableLoader: false });
          //props.showPopUpFunc(data.msg);
        }
      })
      .catch((error) => {
        //console.log(error);
        this.setState({ enableLoader: true });
      });
  };
  removePromo = () => {
    this.setState({
      enableLoader: false,
    });

    var headers = getCommonHeaders();
    headers.accessToken = this.state.userProfile["accessToken"];
    headers.msisdn = localStorage["msisdn"];
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
          ////debugger;

          this.setState({
            enableLoader: true,
          });
          this.setState({
            showVoucher: false,
          });

          localStorage.removeItem("voucherData");
          localStorage.removeItem("voucherThere");
          this.setState({
            voucherData: {},
            voucherApplied: false
          });
          this.props.setVoucherApplied(false);
          this.props.setVoucherDataVal({});
        } else {
          /*else if(data.code == "2009")
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

  initiateRazorPay = () => {
    this.props.history.push({
      pathname: FRONTEND_NAME + "/payment",
      state: {
        //amount: this.state.payInfo.finalAmtWithGst,
        amount: this.state.voucherApplied ? this.state.voucherData.productCostPayableByUser : this.state.payInfo.finalAmtWithGst,
        voucher_transaction_id: this.state.voucherData ? this.state.voucherData.voucher_transaction_id : null,
        amountWithoutTaxes: this.state.payInfo.cardAmount,
        currency: (!localStorage['selectedCountryCode'] || localStorage['selectedCountryCode'] !== '91') ? "USD" : "INR",
        promocode: (this.state.voucherData && this.state.voucherData.promocode) ? this.state.voucherData.promocode : ''
      }
    })
  }


  initiatePayment = () => {
    this.setState({ enableLoader: false });
    var headers = getCommonHeaders();
    headers.accessToken = this.state.userProfile["accessToken"];
    headers.msisdn = localStorage["msisdn"];
    var voucher_transaction_id = null;
    if (this.state.voucherData != null) {
      voucher_transaction_id = this.state.voucherData.voucher_transaction_id;
    }
    //headers.push()
    var requestBody = {
      amount: this.state.payInfo.cardAmount,
      amountWithGst: this.state.payInfo.finalAmtWithGst,
      appId: 1,
      billingAddress: "",
      billingCity: "",
      billingCountry: "",
      billingName: "",
      billingState: "",
      billingTel: headers.msisdn,
      billingZip: "",
      channel: "web",
      voucher_transaction_id: voucher_transaction_id,
    };

    apis
      .initiatePayment(requestBody, headers)
      .then((response) => response.data)
      .then((data) => {
        console.log("resp data", data);
        if (data.code == "2000") {
          ////debugger;

          this.setState({
            enableLoader: true,
          });
          var url =
            Constant.HTTP +
            Constant.DEV_URL +
            "/" +
            data.data.redirectUrl +
            data.data.orderId;
          console.log(url);
          localStorage.removeItem("voucherData");
          localStorage.removeItem("voucherThere");
          this.setState({
            voucherApplied: false,
            voucherData: {}
          })
          this.props.setVoucherApplied(false);
          this.props.setVoucherDataVal({});
          window.location.href = url;

        } else {
          /* else if(data.code == "2009")
      {
        localStorage.clear();
        sessionStorage.clear();
        this.setState({
          showPopUp: true,
          msg: 'Session logout ! Please login again. ',
          button: 'Ok',
          enableLoader : false
        });
      }*/
          console.log(data.msg);
          this.setState({ enableLoader: false });
          //props.showPopUpFunc(data.msg);
        }
      })
      .catch((error) => {
        //console.log(error);
        this.setState({ enableLoader: true });
      });
  };

  render() {
    const { t } = this.props;
    return (
      <>
        {/* <Header2 />
      {/* <BottomHeader /> */}
        {/* <div className="container">

          {/* <HeaderMenu /> */}
        {/* <PageHeader
            name={{ firstname: "Payment", lastname: "Information" }} */}
        {/* /> */}
        {this.state.showPopUp ? (
          <Popup
            heading={this.state.heading}
            msg={this.state.msg}
            button={this.state.button}
            closePopUp={this.closePopUp}
          />
        ) : null}

        {/* {this.state.enableLoader ? null : <Loading />}
          <div className="row page-body">
          <SideMenu />*/}
        <div className="col chat-oo chat-up" style={{ "padding-top": "15px" }}>
          <div className="col-sm-12  col-md-12 col-lg-12 padd-0">
            {/* <nav
                  aria-label="Page navigation example"
                  style={{
                    marginBottom: "12px",
                    marginRight: "121px",
                    float: "right",
                    marginTop: "10px",
                  }}
                >
                  <ul class="pagination nav-page">
                    <li class="page-item nav-page">
                      {" "}
                      <a
                        class="page-link nav-page"
                        href="#"
                        style={{ marginRight: "5px" }}
                      >
                        {" "}
                        <img
                          src={previous}
                          className="nav-ryt"
                        ></img> Previous{" "}
                      </a>
                    </li>
                    <li class="page-item">
                      {" "}
                      <a class="page-link nav-page-num" href="#">
                        {" "}
                        1{" "}
                      </a>{" "}
                    </li>
                    <li class="page-item">
                      {" "}
                      <a class="page-link nav-page-num" href="#">
                        {" "}
                        2{" "}
                      </a>{" "}
                    </li>
                    <li class="page-item">
                      {" "}
                      <a class="page-link nav-page-num" href="#">
                        {" "}
                        3{" "}
                      </a>{" "}
                    </li>
                    <li class="page-item">
                      {" "}
                      <a
                        class="page-link nav-page"
                        href="#"
                        style={{ marginLeft: "5px", width: "42px" }}
                      >
                        {" "}
                        Next<img src={next} className="nav-lft"></img>
                      </a>
                    </li>
                  </ul>
                </nav> */}
            {
              this.props.amount ? <table class="table table-order-n">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      style={{ fontSize: "16px", paddingLeft: "32px" }}
                    >
                      {t('Payment_Details')}
                    </th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="table-pi">{t('Payment_Details')}</td>
                    <td className="pi-amt">{localStorage['currency'] ? localStorage['currency'] : '₹'} {this.state.amount}</td>
                  </tr>
                  {this.state.voucherApplied ? (
                    // {this.state.payInfo.discountPercent != 0.0 ? (
                    (this.state.voucherData && this.state.voucherData.promocodeCategory && this.state.voucherData.promocodeCategory === "Discount") && <tr>
                      <td className="table-pi">
                        {/* {t('Discount')} @ {this.state.payInfo.discountPercent}% */}
                        {t('Discountsdfas')} @ {this.state.voucherData.discountOrCashbackPercent}%
                      </td>
                      <td className="pi-amt">
                        {/* ₹{this.state.payInfo.discountAmount} */}
                        -{localStorage['currency'] ? localStorage['currency'] : '₹'}  {this.state.voucherData.promocodeFigure}
                      </td>
                    </tr>
                  ) :
                    <tr>
                      <td className="table-pi">
                        {t('Discount')}
                      </td>
                      <td className="pi-amt">
                        - {localStorage['currency'] ? localStorage['currency'] : '₹'} {localStorage['selectedCountryCode'] && localStorage['selectedCountryCode'] === '91' ? this.state.payInfo.discountAmount : this.state.payInfo.discountAmountUsd}
                      </td>
                    </tr>
                  }

                  <tr>
                    <td className="table-pi">
                      {localStorage['selectedCountryCode'] && localStorage['selectedCountryCode'] === '91' ? t('GST') : t('Tax @ ')}{this.state.payInfo.gstPercent}%
                    </td>
                    <td className="pi-amt">
                      {localStorage['currency'] ? localStorage['currency'] : '₹'} {this.state.voucherApplied ? this.state.voucherData?.taxAmount : this.state.payInfo.gstAmount}
                    </td>
                  </tr>
                  <tr>
                    <td className="table-pi-b">{t('Total_Payable_Amount')}</td>
                    <td className="pi-amt">
                      {/* ₹{this.state.payInfo.finalAmtWithGst} */}
                      {localStorage['currency'] ? localStorage['currency'] : '₹'} {this.state.voucherApplied ? this.state.voucherData?.productCostPayableByUser : this.state.payInfo.finalAmtWithGst}
                    </td>
                  </tr>
                </tbody>
              </table> : null
            }

            {this.state.voucherData != null && this.state.voucherApplied ? (
              <div className="offer-divv">
                <div>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => this.removePromo()}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div>
                  <p>{this.state.voucherData.discountOrCashbackPercent}% {t("OFF")}</p>
                  <p>
                    {localStorage['currency'] ? localStorage['currency'] : '₹'}
                    {/* {(
                          this.state.amount *
                          (this.state.voucherData.promocodeFigure / 100)
                        ).toFixed(2)}{" "} */}
                    {this.state.voucherData.promocodeFigure} {this.state.voucherData.promocodeCategory && this.state.voucherData.promocodeCategory === "Discount" ? t(this.state.voucherData.promocodeCategory) + t(" applied on recharge amount.") : t(" Cashback in wallet after recharge.")}
                  </p>
                </div>
                <div></div>
              </div>
            ) : null}
            <div className="pro-pi">
              {/* <button onClick={() => this.initiatePayment()}> */}
              <button disabled={this.props.amount % 50 === 0 ? false : true} onClick={() => this.initiateRazorPay()}>
                {t('Proceed')}
              </button>
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

export default withCombine(PaymentInfo);
