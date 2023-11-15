import React from "react";
import { withRouter } from "react-router-dom";
import Header from "../common/Header2";
// import HeaderMenu from "../common/HeaderMenu";
import SideMenu from "../common/SideMenu";
import Footer from "../common/Footer";
// import bin from "../images/bin.svg";
import user from "../images/user.svg";
import apis from "../configuration/apis";
import moment from "moment";
import apiUrls from "../configuration/apiUrls";
import { withTranslation } from 'react-i18next';
import { compose } from 'redux'
import PageHeader from "../common/PageHeader";

class ViewHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderItem: this.props.location.state
        ? this.props.location.state.orderItem
        : "",
      orderDetail: "",
      userDetails: [],
    };
  }
  componentDidMount() {
    this.getViewHistory();
  }
  getViewHistory = () => {
    let orderId = this.state.orderItem ? this.state.orderItem.id : "";
    var requestBody = {
      value: orderId,
    };

    return apis.productBilling(requestBody).then((response) => {
      var data = response.data;

      if (data.code == 2000) {
        let orderData = data.data;
        let userDetails = orderData.deliveryAddress;
        userDetails = userDetails.split("|");
        console.log("userDetails", userDetails);

        this.setState({
          orderDetail: orderData,
          userDetails: userDetails,
        });
      } else {
        console.log("ERROR", data.msg);
      }
    });
  };
  downloadReport = (reportId) => {
    // alert(reportId);
    try {
      //debugger;
      let url = apiUrls.downloadReport;
      url = url.replace("<reportId>", Number(reportId));
      window.open(url, "_blank");
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    console.log();
    const { t } = this.props;
    const { orderItem, orderDetail, userDetails } = this.state;

    return (
      <>
        <Header
          openLoginPopup={this.openLoginPopup}
          openSignupPopup={this.openSignupPopup}
          isLogin={this.state.loginSelected}
        />
        <div className="container">
          {/* <Header /> */}

          {/* <HeaderMenu /> */}
          <PageHeader
            // name={{ firstname: "Chat with", lastname: "Astrology" }}
            name={{ firstname: t('View Report'), lastname: t('') }}
          />
          <div className="row page-body">
            <div className="mobsidemenu"><SideMenu /></div>
            <div className="col p">
              <div className="col-sm-12 col-md-12 col-lg-12 padd-0">
                <p className="career-report">{userDetails[5]}</p>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-12 padd-0 table_container mob_480">
                <table class="table table-order-n">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">{this.props.t('Name')}</th>
                      <th scope="col">{this.props.t('DateTime')}</th>
                      <th scope="col">{this.props.t('Status')}</th>
                      <th scope="col">{this.props.t('Language')}</th>
                      <th scope="col">{this.props.t('Report')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <img src={orderItem.imageURL ? orderItem.imageURL : user} className="order-user" alt="order-user"></img>
                      </td>
                      <td>
                        <p className="order-u-name">
                          {orderDetail.deliveryName}
                        </p>
                        <p className="order-id">{t('Order ID')}: {orderDetail.id}</p>
                        <p className="cbr">{userDetails[5]} {t('Report')}</p>
                      </td>
                      <td className="order-date">
                        {moment(new Date(orderDetail.redeemDatetime)).format(
                          "DD MMM YYYY"
                        )}{" "}
                        <br />
                        {moment(new Date(orderDetail.redeemDatetime)).format(
                          "LT"
                        )}
                      </td>
                      <td
                        className={
                          "order-status" +
                          " " +
                          (orderDetail.redemptionStatus == "SUCCESS"
                            ? "txtgreen"
                            : "txtred")
                        }
                      >
                        {t(orderDetail.redemptionStatus)}
                      </td>
                      <td className="rates">
                        <p className="rates-pp ">{t('English')}</p>
                      </td>
                      <td>
                        <p className="per-report">
                          ₹{orderDetail.redeemValue}/{t("report")}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="table_body desk_top">
                <div className="table_Inner_tr1">
                  <div className="table_inner_container2">
                    <div className="table_body1">
                      <div className="table_td12 mt-4">
                        <div className="tab_head_mob d-flex justify-content-between">
                          <span className="text-gray">Order Id: #{orderDetail.id}</span>
                          <span className="text-gray"> Date :{moment(new Date(orderDetail.redeemDatetime)).format(
                            "DD MMM YYYY")}</span>
                        </div>
                        <div className="tab_data_body d-flex justify-content-around">
                          <div className="tab_content text-left pd-10">
                            <p className="userName_tab"><strong> {orderDetail.deliveryName} </strong></p>
                            <span className="mt-2 mb-3 d-block text-gray">status : <span className={
                              "order-status" +
                              " " +
                              (orderDetail.redemptionStatus == "SUCCESS"
                                ? "txtgreen"
                                : "txtred")
                            }>
                              {t(orderDetail.redemptionStatus)} </span></span>
                            <p> <span className="text-gray">Language:</span> {t('English')}</p>
                            <p> <span className="text-gray">Rate:</span> ₹{orderDetail.redeemValue}/{t("report")}</p>
                          </div>

                          <div className="tab_Icon">
                            <img src={orderItem.imageURL ? orderItem.imageURL : user} className="order-user mt-3" width="90px" alt="order-user" />
                            <div className="table_td13 mt-3"></div>
                            <p></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-12 col-md-12 col-lg-12 ra-border padd-0">
                <p className="re-ans">{t('Report Answer')}</p>
                {orderDetail.redemptionStatus != "SUCCESS" ? (
                  <p className="wip">
                    {console.log(userDetails)}
                    {t("Work is progress. Your report shall be answered within 24-48 hours.")}
                  </p>
                ) : (
                  <a href={`${apiUrls.downloadReport}${userDetails[7] ? userDetails[7] : userDetails[6]}`}
                    className="wip"
                    download
                  >
                    {t('Download_Report')}
                  </a>
                )}
              </div>
              <div className="col-sm-12 col-md-12 col-lg-12 padd-0">
                <p className="cli-pro">{t('Client Profile')}</p>
                <div className="col-sm-12 col-md-12 col-lg-12 padd-0">
                  <div className="col-sm-4 col-md-4 col-lg-4 float-left padd-0 tx-align-lft">
                    <span className="report-label">{t('Name')} :</span>
                    <span className="report-value">{t(userDetails[0])}</span>
                  </div>
                  <div className="col-sm-4 col-md-4 col-lg-4 float-left padd-0 tx-align-center pp-ll-ee" >
                    <span className="report-label">{t('Mobile Number')} :</span>
                    <span className="report-value">{t(userDetails[1])}</span>
                  </div>
                  <div className="col-sm-4 col-md-4 col-lg-4 float-left padd-0 tx-align-ryt tt-ll-ee">
                    <span className="report-label">{t('Marital Status')} : </span>
                    <span className="report-value">{t(userDetails[4])}</span>
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-12 padd-0">
                  <div className="col-sm-4 col-md-4 col-lg-4 float-left padd-0 tx-align-lft">
                    <span className="report-label">{t('Date of Birth')} :</span>
                    <span className="report-value">{t(userDetails[2])}</span>
                  </div>
                  <div className="user_details_cont col-sm-4 col-md-4 col-lg-4 float-left padd-0 tx-align-center pp-ll-ee">
                    <span className="report-label">{t('Place of Birth')} :</span>
                    <span className="report-value">{t(userDetails[3])}</span>
                  </div>
                  {/*
                  <div className="col-sm-4 col-md-4 col-lg-4 float-left padd-0 tx-align-ryt">
                    <span className="report-label">Occupation :</span>
                    <span className="report-value">    </span>
                  </div>
                  */}
                </div>
              </div>
              {/*
              <div className="col-sm-12 col-md-12 col-lg-12 padd-0 tx-align-lft comment-div">
                <p className="comment-heading">Comment :</p>
                <p className="comment-text">
               
                </p>
              </div>
               */}
            </div>
          </div>
        </div>
        <Footer history={this.props} />
      </>
    );
  }
}

const withCombine = compose(
  withRouter,
  withTranslation()
)

export default withCombine(ViewHistory);
