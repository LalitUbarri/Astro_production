import React from "react";
import Header from "../common/Header2";
// import HeaderMenu from "../common/HeaderMenu";
import PageHeader from "../common/PageHeader";
import Footer from "../common/Footer";

import "../styles/notification.css";
import ads from "../images/ads.png";
import * as Constant from "../configuration/constants";
import { getCommonHeaders } from "../configuration/commonFunctions";
import { postApi } from "../configuration/apis";
import * as ErrorConstant from "../configuration/errorConstants";
import * as AxiosConfig from "../configuration/axiosConfig";
// import BottomHeader from "../common/BottomHeader";
import { withTranslation } from 'react-i18next';
import { compose } from 'redux';
import { withRouter } from "react-router-dom";
import Chat_Talk_Header from "../common/Chat&Talk_Header";

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inAppNotification: [],
    };
  }
  componentDidMount() {
    let msisdn = sessionStorage.getItem("msisdn");
    this.getInAppNotifications(msisdn);
  }

  getInAppNotifications = (msisdn) => {
    console.log("inside getInAppNotifications method");
    var url = Constant.ASTRO_URL + Constant.GET_INAPP_NOTIFICATION;
    const body = {
      adhoc: true,
      appName: Constant.NOTIFICATION_APP_NAME,
      deviceId: AxiosConfig.getDeviceId(true),
      msisdn: Constant.MSISDN,
    };
    const headers = getCommonHeaders();
    console.log("body", body);
    postApi(url, headers, body)
      .then((response) => response.data)
      .then((data) => {
        if (data && data.code == ErrorConstant.SUCCESS_CODE) {
          console.log("data ", data.data.response);
          try {
            this.setState({
              inAppNotification: data.data.response,
              enableLoader: true,
            });
          } catch (error) {
            console.log("exception occured");
            this.toggleShowMsg("Something went wrong");
            this.setState({ enableLoader: false });
          }
        } else {
          console.log(
            "Error code from getInAppNotifications API : ",
            data.code,
            "with msg : ",
            data.msg
          );
          this.setState({ enableLoader: false });
        }
      })
      .catch((error) => {
        console.log();
        console.error("error", error);
        this.setState({ enableLoader: false });
      });
  };

  getTime = (inputTime) => {
    var fullScheduleTime = new Date(inputTime).toString().split(" ");
    // var formattedTime = fullScheduleTime[4].split(':');
    // var formattedHour = formattedTime[0];
    // var formattedMin = formattedTime[1];
    return (
      fullScheduleTime[2] +
      " " +
      fullScheduleTime[1] +
      " " +
      fullScheduleTime[3]
    );
  };

  render() {
    const { inAppNotification } = this.state;
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
        CustomClass={true}
        IsTitleTrue={true}
        title={'NOTIFICATION'}
      />
      <Header 
      IsActive_header_Or_not="chat_and_talk_header-"
      />
      {/* <BottomHeader /> */}
      <PageHeader Mob_HeaderIsTrue={'not_show_mob_header1'} name={{ firstname: "NOTIFICATION", lastname: "" }} />
      <div className="notification_container_fluid">
        <div className="container notification_container mb-5">
            <div className="ads_cont">
              <img src={ads} alt="ads" width="100%" />
            </div>
            <div className="notification_body">
            {(inAppNotification && inAppNotification.length > 0)? inAppNotification.map((item, index) => (
              <div className="row">
                <div className="col msg">{item.message}</div>
                <div className="col date">
                  {this.getTime(item.scheduleDate)}
                </div>
              </div>
            )) :
              <div className="d-flex align-items-center justify-content-center No_notification_found">{this.props.t("No notification found!!!")}</div>
            }
          </div>
            
            
              {/*<div className="row">
                                <div className="col msg">☪️ Eid Mubarak! Get 20% off on your first recharge today😍</div>
                                <div className="col date">26 Fab 2020</div>
                            </div>
                            <div className="row">
                                <div className="col msg">🌞🤑 Use code “Solar20” and get 20% off. Know the effect of this eclipse on you and your family 😍</div>
                                <div className="col date">26 Fab 2020</div>
                            </div>
                            <div className="row">
                                <div className="col msg">⏳Last 3 hours left🏃‍♀️🏃‍♀️</div>
                                <div className="col date">26 Fab 2020</div>
                            </div>
                            <div className="row">
                                <div className="col msg">☪️ Eid Mubarak! Get 20% off on your first recharge today😍</div>
                                <div className="col date">26 Fab 2020</div>
                            </div>
                            <div className="row">
                                <div className="col msg">🌞🤑 Use code “Solar20” and get 20% off. Know the effect of this eclipse on you and your family 😍</div>
                                <div className="col date">26 Fab 2020</div>
                            </div>
                            <div className="row">
                                <div className="col msg">⏳Last 3 hours left🏃‍♀️🏃‍♀️</div>
                                <div className="col date">26 Fab 2020</div>
                            </div>
                            <div className="row">
                                <div className="col msg">☪️ Eid Mubarak! Get 20% off on your first recharge today😍</div>
                                <div className="col date">26 Fab 2020</div>
                            </div>
                            <div className="row">
                                <div className="col msg">🌞🤑 Use code “Solar20” and get 20% off. Know the effect of this eclipse on you and your family 😍</div>
                                <div className="col date">26 Fab 2020</div>
                            </div>
                            <div className="row">
                                <div className="col msg">⏳Last 3 hours left🏃‍♀️🏃‍♀️</div>
                                <div className="col date">26 Fab 2020</div>
                            </div>
                            <div className="row">
                                <div className="col msg">☪️ Eid Mubarak! Get 20% off on your first recharge today😍</div>
                                <div className="col date">26 Fab 2020</div>
                            </div>
                            <div className="row">
                                <div className="col msg">🌞🤑 Use code “Solar20” and get 20% off. Know the effect of this eclipse on you and your family 😍</div>
                                <div className="col date">26 Fab 2020</div>
                            </div>
                            <div className="row">
                                <div className="col msg">⏳Last 3 hours left🏃‍♀️🏃‍♀️</div>
                                <div className="col date">26 Fab 2020</div>
                            </div>
                            <div className="row">
                                <div className="col msg">☪️ Eid Mubarak! Get 20% off on your first recharge today😍</div>
                                <div className="col date">26 Fab 2020</div>
                            </div>
                            <div className="row">
                                <div className="col msg">🌞🤑 Use code “Solar20” and get 20% off. Know the effect of this eclipse on you and your family 😍</div>
                                <div className="col date">26 Fab 2020</div>
                        </div>*/}
            
          </div>
        </div>
        <Footer history={this.props}/>
      </>
    );
  }
}

const withCombine=compose(
  withRouter,
  withTranslation()
) 

export default withCombine(Notification);