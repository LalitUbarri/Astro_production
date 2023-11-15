import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Header from "../common/Header2";
import PageHeader from "../common/PageHeader";
import SideMenu from "../common/SideMenu";
import Footer from "../common/Footer";
import apis from "../configuration/apis";
import Popup from "../components/popupChat";
import user from "../images/user.svg";


import * as Constant from "../configuration/constants";
import { postApi } from "../configuration/apis";
import { getCommonHeaders } from "../configuration/commonFunctions";
import * as ErrorConstant from "../configuration/errorConstants";
import ReactPaginate from "react-paginate";
import $ from "jquery";
import { useTranslation } from "react-i18next";
import Chat_Talk_Header from "../common/Chat&Talk_Header";
import '../styles/orderHistory.css';

const OrderHistoryChat = (props) => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [redemptionSearchList, setRedemptionSearchList] = useState([]);
  const [userMsisdn] = useState(localStorage["msisdn"]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [msg, setMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeChat, setActiveChat] = useState(
    "menu-order activeOrder "
  );
  const [activeCall, setActiveCall] = useState("nav-item nav-link menu-order");
  const [activeReport, setActiveReport] = useState(
    "nav-item nav-link menu-order"
  );
  const [activeMall, setActiveMall] = useState("nav-item nav-link menu-order");
  const [premiumCall, setPremiumCall] = useState("nav-item nav-link menu-order");
  const [premiumChat, setPremiumChat] = useState("nav-item nav-link menu-order");
  const [type, setType] = useState("Chat");

  const [busypanditList, setBusyPanditList] = useState([]);
  //pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const [filteredOrderHistory, setFilteredOrderHistory] = useState([]);
  const [perPage] = useState(4);
  const [pageCount, setPageCount] = useState(0);
  const [initialPage, setInitialPage] = useState(0);
  const [currencyLogo, setCurrencyLogo] = useState('');
  const [t] = useTranslation();
  useEffect(() => {
    getOrderHistory(type);
    fetchBusyPandits();
    getUserCurrency();
  }, [offset, pageCount, currentPage]);

  const fetchBusyPandits = () => {
    apis
      .fetchBusyPandits()
      .then((response) => response.data)
      .then((data) => {
        // console.log("resp data", data);
        if (data.code == "2000") {
          {
            // console.log("busypanditList", data.data);
          }

          if (data.data) setBusyPanditList(data.data);
        } else {
          // console.log(data.msg);

          //props.showPopUpFunc(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getOrderHistory = (type) => {
    getRedemptionSearchWithRating(type);
    // console.log("inside getProductcatalog method");
    var url = Constant.ASTRO_URL + Constant.PRODUCT_BILLING_DETAILS;
    setType(type);
    const headers = getCommonHeaders();
    const body = {
      searchKey: type,
      startDate: "",
      endDate: "",
      pageNumber: "",
      entryList: "",
    };
    // console.log("body", body);
    postApi(url, headers, body)
      .then((response) => response.data)
      .then((data) => {
        if (data && data.code == ErrorConstant.SUCCESS_CODE) {
          console.log("data ", data.data);
          try {
            const orderData = data.data;
            const filteredData = orderData.slice(offset, offset + perPage);
            setOrderHistory(data.data);
            setFilteredOrderHistory(filteredData);
            setPageCount(Math.ceil(orderData.length / perPage));
          } catch (error) {
            console.log("exception occured");
          }
        } else {
          setOrderHistory(data.data);
        }
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  const handlePageClick = ({ selected: selectedPage }) => {
    //  const selectedPage = e.selected;
    setCurrentPage(selectedPage);
    setOffset(selectedPage + 1);
  };

  const getRedemptionSearchWithRating = (type) => {
    // console.log("inside getProductcatalog method");
    var url = Constant.ASTRO_URL + "/FlexPlatform/redemptionSearchWithRating";
    setType(type);
    const headers = getCommonHeaders();
    const body = {
      redeemCategory: type,
      redemptionType: "WHITE",
    };
    // console.log("body", body);
    postApi(url, headers, body)
      .then((response) => response.data)
      .then((data) => {
        if (data && data.code == ErrorConstant.SUCCESS_CODE) {
          // console.log("data ", data.data);
          try {
            setRedemptionSearchList(data.data);
          } catch (error) {
            console.log("exception occured");
          }
        } else {
          console.log(
            "Error code from orderHistoryChat API : ",
            data.code,
            "with msg : ",
            data.msg
          );

          setRedemptionSearchList([]);
        }
      })
      .catch((error) => {
        // console.log();
        console.error("error", error);
      });
  };


  const isOnline = (no, type) => {
    //alert("In IsOnline")
    var con = false;
    con = Number.isInteger(parseInt(no)); //msisdn of pandit
    if (!con) {
      return "";
    }
    if (type == "Mall")
      //Online or not not applicable for mall
      return "";

    const list =
      redemptionSearchList && redemptionSearchList.length > 0
        ? redemptionSearchList.filter((list) => list.goodsId === no)
        : "";
    if (list && list[0] && list[0].goodsSale === 1) return "Online";
    else return t("Currently offline");
  };

  const setOrder = (type) => {
    setCurrentPage(0);
    setPageCount(0);
    setOrderHistory([]);
    setFilteredOrderHistory([]);
    setOffset(0);

    getOrderHistory(type);
    if (type == "Chat") {
      //setOrderHistory(orderHistoryChat);
      setActiveChat("nav-item nav-link activeOrder menu-order");
      setActiveCall("nav-item nav-link menu-order");
      setActiveReport("nav-item nav-link menu-order");
      setActiveMall("nav-item nav-link menu-order");
      setPremiumCall("nav-item nav-link menu-order");
      setPremiumChat("nav-item nav-link menu-order");
    }
    if (type == "Call") {
      //setOrderHistory(orderHistoryCall);
      setActiveChat("nav-item nav-link menu-order");
      setActiveCall("nav-item nav-link activeOrder menu-order");
      setActiveReport("nav-item nav-link menu-order");
      setActiveMall("nav-item nav-link menu-order");
      setPremiumCall("nav-item nav-link menu-order");
      setPremiumChat("nav-item nav-link menu-order");
    }
    if (type == "Report") {
      //setOrderHistory(orderHistoryReport);
      setActiveChat("nav-item nav-link menu-order");
      setActiveCall("nav-item nav-link menu-order");
      setActiveReport("nav-item nav-link activeOrder menu-order");
      setActiveMall("nav-item nav-link menu-order");
      setPremiumCall("nav-item nav-link menu-order");
      setPremiumChat("nav-item nav-link menu-order");
    }
    if (type == "Mall") {
      //setOrderHistory(orderHistoryMall);
      setActiveChat("nav-item nav-link menu-order");
      setActiveCall("nav-item nav-link menu-order");
      setActiveReport("nav-item nav-link menu-order");
      setActiveMall("nav-item nav-link activeOrder menu-order");
      setPremiumCall("nav-item nav-link menu-order");
      setPremiumChat("nav-item nav-link menu-order");
    }
    if (type == "premiumCall") {
      //setOrderHistory(orderHistoryMall);
      setActiveChat("nav-item nav-link menu-order");
      setActiveCall("nav-item nav-link menu-order");
      setActiveReport("nav-item nav-link menu-order");
      setActiveMall("nav-item nav-link menu-order");
      setPremiumChat("nav-item nav-link menu-order");
      setPremiumCall("nav-item nav-link activeOrder menu-order");
    }
    if (type == "premiumChat") {
      //setOrderHistory(orderHistoryMall);
      setActiveChat("nav-item nav-link menu-order");
      setActiveCall("nav-item nav-link menu-order");
      setActiveReport("nav-item nav-link menu-order");
      setActiveMall("nav-item nav-link menu-order");
      setPremiumCall("nav-item nav-link menu-order");
      setPremiumChat("nav-item nav-link activeOrder menu-order");
    }
  };

  const handleTypeClick = (item, type) => {
    //debugger;
    let panditMsisdn = item.redeemMode;
    // window.alert(type)
    //console.log("Item Data", item)
    if (type == "Chat") {
      // debugger;
      if (busypanditList.some((ele) => item.goodsId == ele)) {
        showPopUpFun(t("Pandit is curently busy."), false);
        return;
      }
      if (localStorage["userBalance"] < item.redeemValue * 5) {
        showPopUpFun("Minimum balance of 5 minutes( " + currencyLogo + item.redeemValue * 5 + " for 5 mins) is required to chat with astrologer.", false);
        return;
      }
      if (sessionStorage["chatId"]) {
        props.history.push({
          pathname: Constant.FRONTEND_NAME + "/chat",
          state: {
            panditMsisdn: panditMsisdn,
          },
        });
      } else {
        props.history.push({
          pathname: Constant.FRONTEND_NAME + "/chatForm",
          state: {
            typeOfService: "Chat",
            panditMsisdn: panditMsisdn,
            orderDetail: item,
            isPremium: false
          },
        });
      }
    } else if (type == "Report") {
      debugger;
      if (localStorage["userBalance"] < item.redeemValue) {
        showPopUpFun("Minimum balance of " + currencyLogo + item.redeemValue + " is required to request report from astrologer.", false);
        return;
      }
      checkPendingReport(item);
    } else if (type == "Call") {
      if (localStorage["userBalance"] < item.redeemValue * 5) {
        showPopUpFun("Minimum balance of 5 minutes( " + currencyLogo + item.redeemValue * 5 + " for 5 mins) is required to talk with astrologer.", false);
        return;
      }
      if (busypanditList.some((ele) => item.goodsId == ele)) {
        showPopUpFun(t("Pandit is curently busy."), false);
        return;
      }

      requestCall(item);
    }

    else if (type == "premiumCall") {
      if (localStorage["userBalance"] < item.redeemValue * 5) {
        showPopUpFun("Minimum balance of 5 minutes( " + currencyLogo + item.redeemValue * 5 + " for 5 mins) is required to talk with astrologer.", false);
        return;
      }
      if (busypanditList.some((ele) => item.goodsId == ele)) {
        showPopUpFun(t("Pandit is curently busy."), false);
        return;
      }

      requestCall(item);
    }
    else if (type == "premiumChat") {
      if (localStorage["userBalance"] < item.redeemValue * 5) {
        showPopUpFun("Minimum balance of 5 minutes( " + currencyLogo + item.redeemValue * 5 + " for 5 mins) is required to talk with astrologer.", false);
        return;
      }
      if (busypanditList.some((ele) => item.goodsId == ele)) {
        showPopUpFun(t("Pandit is curently busy."), false);
        return;
      }


      if (sessionStorage["chatId"]) {
        props.history.push({
          pathname: Constant.FRONTEND_NAME + "/chat",
          state: {
            panditMsisdn: panditMsisdn,
          },
        });
      } else {
        props.history.push({
          pathname: Constant.FRONTEND_NAME + "/chatForm",
          state: {
            typeOfService: "Chat",
            panditMsisdn: panditMsisdn,
            orderDetail: item,
            isPremium: true
          },
        });
      }
    }

    else props.history.push(Constant.FRONTEND_NAME + "/astromall");
  };



  const checkPendingReport = (orderData) => {
    debugger;
    var requestBody = {
      redeemCategory: "Report",
      redemptionType: userMsisdn,
    };
    return apis
      .pendingReport(requestBody)
      .then((response) => response.data)
      .then((data) => {
        // console.log("response checkPendingReport", data);
        if (data.code == "2000") {
          if (data.data) {
            let reportList = data.data;
            let pendingreport = reportList.filter(
              (item) =>
                item.redeemMode == orderData.redeemMode &&
                item.redemptionStatus == "PENDING"
            );
            if (pendingreport.length > 0) {
              showPopUpFun(
                t("You already hava a request in the queue. Please try again once previous request is completed."),
                false
              );

              return;
            } else {
              let panditNo = orderData.goodsId
                ? orderData.goodsId
                : orderData.redeemMode;
              props.history.push({
                pathname: Constant.FRONTEND_NAME + "/reportForm",
                state: {
                  typeOfService: "Report",
                  panditMsisdn: panditNo,
                  orderDetail: orderData,
                },
              });
            }
          }
        }
        else {
          let panditNo = orderData.goodsId
            ? orderData.goodsId
            : orderData.redeemMode;
          props.history.push({
            pathname: Constant.FRONTEND_NAME + "/reportForm",
            state: {
              typeOfService: "Report",
              panditMsisdn: panditNo,
              orderDetail: orderData,
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const requestCall = (data) => {
    var requestBody = {
      no2dial: data.redeemMode,
      ratePerMinute: data.redeemValue,
      userBalance: localStorage["userBalance"],
      userNumber: userMsisdn,
    };
    return apis
      .requestCall(requestBody)
      .then((response) => response.data)
      .then((data) => {
        // console.log("response requestCall", data);
        if (data.code == "2000") {
          showPopUpFun("Your request for call has been submitted.", true);
        } else {
          showPopUpFun(data.msg, false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleViewDetail = (item) => {
    props.history.push({
      pathname: Constant.FRONTEND_NAME + "/viewHistory",
      state: { orderItem: item },
    });
  };
  const toDateFormat = (milisecond) => {
    const date = new Date(milisecond);
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const monthName = monthNames[monthIndex];
    const year = date.getFullYear();
    return `${day} ${monthName} ${year}`;
  };
  const toTimeFormat = (milisecond) => {
    const date = new Date(milisecond);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  const showPopUpFun = (msg, isSuccess) => {
    setShowPopUp(true);
    setMsg(msg);
    setIsSuccess(isSuccess);
  };
  const closePopUp = () => {
    setShowPopUp(false);
  };

  const getUserCurrency = () => {
    var headers = getCommonHeaders();
    headers.msisdn = localStorage['selectedCountryCode'] + localStorage['msisdn'];
    const countryCode = localStorage["selectedCountryCode"] ? localStorage["selectedCountryCode"] : '91';
    apis
      .getCurrency(headers, countryCode)
      .then((response) => response.data)
      .then((data) => {
        if (data.code == '2000') {
          const currencyLogo = data.data.currencyLogo ? data.data.currencyLogo : '₹';
          setCurrencyLogo(currencyLogo);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    $(".table_tr .table_th ").click(function (e) {
      e.preventDefault();
      $('.table_th').removeClass('activeOrder')
      $(this).addClass('activeOrder')
    })
  })

  // console.log("Busy list", busypanditList);

  return (
    <>

      <Chat_Talk_Header
        IsNavIconTrue={false}
        IsSearchTrue={false}
        IsFilterTrue={false}
        propsData={props}
        IsTitleTrue={true}
        title={'Order History'}
        CustomClass={true}
      />
      <Header
        IsActive_header_Or_not="chat_and_talk_header-"
      />

      <div className="container">
        {showPopUp && (
          <Popup msg={msg} isSuccess={isSuccess} closePopUp={closePopUp} />
        )}

      
        <PageHeader
          Mob_HeaderIsTrue={'not_show_mob_header1'}
          name={{ firstname: "Order", lastname: "History" }} />
        <div className="page-body">
          <div className="row">
            <div className="col-12 col-md-3 mobsidemenu">
              <SideMenu />
            </div>
            <div className="orderhistory_container">
              <div className="orderhistory_table">
                <div className="table_head">
                  <div className="table_tr d-flex">
                    <div className="table_th activeOrder" onClick={() => setOrder("Chat")}> {t('Chat')} <span className="sr-only">(current)</span>{" "}</div>
                    <div className="table_th" onClick={() => setOrder("Call")}> {" "}{t('Call')}{" "}</div>
                    <div className="table_th" onClick={() => setOrder("Report")}>{" "}{t('Report')}{" "}</div>
                    <div className="table_th" onClick={() => setOrder("Mall")}> {" "}{t('AstroMall')}{" "}</div>
                    <div className="table_th" onClick={() => setOrder("premiumCall")}>{" "}{t('Premium Call')}{" "}</div>
                    <div className="table_th" onClick={() => setOrder("premiumChat")}>{" "}{t('Premium Chat')}{" "}</div>
                  </div>
                </div>

                <div className="table_body desk_top">
                  <div className="table_Inner_tr1">
                    <div className={filteredOrderHistory && filteredOrderHistory.length > 0 ? "table_inner_container2" : "table_inner_container"}>
                      <div className="table_body1">
                        {filteredOrderHistory && filteredOrderHistory.length > 0 ? (
                          filteredOrderHistory.map((item, index) => (
                            <div className="table_td12 mt-4" key={index}>
                              <div className="tab_head_mob">
                                <span className="text-gray">Order Id: #{item.id}</span>
                              </div>
                              <div className="tab_data_body d-flex justify-content-around">
                                <div className="tab_content text-left pd-10">
                                  <p className="userName_tab"><strong> {item.productName} </strong></p>
                                  <span className="mt-2 mb-3 d-block text-gray">status : <span className="text-green">
                                    {type != "Mall"
                                      ? item.redeemFlag
                                        ? t('Completed')
                                        : t('Report_in_queue')
                                      : item.redeemFlag
                                        ? t('Order_Placed')
                                        : ""}</span> </span>
                                  <p> Date :{toDateFormat(item.redeemDate)}  {toTimeFormat(item.redeemDate)}</p>
                                  {(type === "premiumCall" || type === "premiumChat") && <p> Slot Time : {toTimeFormat(item.premiumStartTime)} to {toTimeFormat(item.premiumEndTime)} </p>}
                                  <div className="card_details">
                                    <p> {type != "Mall" ? (
                                      <>
                                        {t(type)} {t('Rate')} :{" "}
                                        <span>
                                          {`${currencyLogo}${item.redeemValue}`}
                                          {type == "Report" ? "/" + t('report') : "/" + t('min')}
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        {t('Order_Total')}
                                        <span>{`${currencyLogo}${item.redeemPoint}`}</span>
                                      </>
                                    )} </p>
                                    <p> {(type == "Chat" || type == "Call") && (
                                      <>
                                        {t('Duration')} :{" "}
                                        <span>
                                          {item.redeemPoint / item.redeemValue}{t('min')}
                                        </span>
                                      </>
                                    )} </p>

                                    <p>
                                      {type == "Report" && (
                                        <a
                                          className="txtred"
                                          onClick={() => handleViewDetail(item)}
                                        >
                                          {t('View Details')}
                                        </a>
                                      )}
                                      {(type == "Chat" || type == "Call") && (
                                        <>
                                          {t('Duration')} :{" "}
                                          <span>
                                            {item.redeemPoint / item.redeemValue}{t('min')}
                                          </span>
                                        </>
                                      )}
                                    </p>
                                    <p> {type == "Chat" || type == "Call" ? (
                                      <p>
                                        {t('Deduction')} :
                                        <span> {`${currencyLogo}${item.redeemPoint}`}</span>
                                      </p>
                                    ) : (
                                      ""
                                    )} </p>
                                  </div>
                                </div>
                                <div className="tab_Icon">
                                  <img src={item.imageURL ? item.imageURL : user} alt="premium" className="order-user mt-3" width="90px" />
                                  {(!(type === "premiumCall" || type === "premiumChat")) && <div className="table_td13 mt-3">
                                  
                                    {(type == "Chat" || type == "Call") ? (
                                      busypanditList.some(
                                        (ele) => item.redeemMode == ele
                                      ) ? (
                                        <button
                                          disabled
                                          className={"order-chat bggrey"}
                                        >
                                          {t(type)}
                                        </button>
                                      ) :
                                        (
                                          <button
                                            type="button"
                                            disabled={
                                              isOnline(item.redeemMode, type) !== "Online"
                                            }
                                            onClick={() => handleTypeClick(item, type)}
                                            className={
                                              "order-chat" +
                                              " " +
                                              (isOnline(item.redeemMode, type) !==
                                                "Online"
                                                ? "bggrey"
                                                : "bggreen")
                                            }
                                          >
                                            {t(type)}
                                          </button>
                                        )
                                    ) : (
                                      <>
                                        <span
                                          onClick={() => handleTypeClick(item, type)}
                                        >
                                          <div className="order-chat bggreen">
                                            {type == "Report" ? t('Get_Report') : t(type)}
                                          </div>
                                        </span>
                                      </>
                                    )}

                                    
                                  </div>}
                                  <p>
                                    {type != "Mall" ? (
                                      <>
                                        {" "}
                                        <span>
                                          {`${currencyLogo}${item.redeemValue}`}
                                          {type == "Report" ? "/" + t('report') : "/" + t('min')}
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        {t('Order_Total')}
                                        <span>{`${currencyLogo}${item.redeemPoint}`}</span>
                                      </>
                                    )}</p>
                                </div>
                              </div>
                            </div>
                          ))) : null}


                      </div>

                    </div>
                  </div>
                </div>


                <div className="table_body mb-480">
                  <div className="table_Inner_tr">
                    <div className={filteredOrderHistory && filteredOrderHistory.length > 0 ? "table_inner_container1" : "table_inner_container"}>
                      {orderHistory && orderHistory.length > 0 && (
                        <div className="table_head d-flex">
                          <div className="table_th1">&nbsp;</div>
                          <div className="table_th1">{t('OrderId')}</div>
                          <div className="table_th1">{t('DateTime')}</div>
                          <div className="table_th1">{t('Status')}</div>
                          <div className="table_th1">{t('Call Duration & Rate')}</div>
                          {type === 'premiumChat' ? <div className="table_th1">{t('Slot Time')}</div> : <div className="table_th1">&nbsp;</div>}
                        </div>
                      )}
                      {filteredOrderHistory && filteredOrderHistory.length > 0 ? (
                        filteredOrderHistory.map((item, index) => (
                          <div className="table_body1 d-flex" key={index}>
                            <div className="table_td1">
                              <img src={item.imageURL ? item.imageURL : user} className="order-user" alt="orders" />
                            </div>
                            <div className="table_td1">
                              <p className="order-u-name">{item.productName}</p>
                              <p className="order-id">{t('Order ID')}: #{item.id}</p>
                            </div>
                            <div className="table_td1">
                              {toDateFormat(item.redeemDate)}
                              <br />
                              {toTimeFormat(item.redeemDate)}
                            </div>
                            <div className={item.redeemFlag ? "table_td1 order-status txtgreen" : " table_td1 order-status txtred"}>
                              {type != "Mall"
                                ? item.redeemFlag
                                  ? t('Completed')
                                  : t('Report_in_queue')
                                : item.redeemFlag
                                  ? t('Order_Placed')
                                  : ""}
                            </div>
                            <div className="table_td1">
                              <p>
                                {type != "Mall" ? (
                                  <>
                                    {t(type)} {t('Rate')} :{" "}
                                    <span>
                                      {`${currencyLogo}${item.redeemValue}`}
                                      {type == "Report" ? "/" + t('report') : "/" + t('min')}
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    {t('Order_Total')}
                                    <span>{`${currencyLogo}${item.redeemPoint}`}</span>
                                  </>
                                )}
                              </p>
                              <p>
                                {type == "Report" && (
                                  <a
                                    className="txtred"
                                    onClick={() => handleViewDetail(item)}
                                  >
                                    {t('View Details')}
                                  </a>
                                )}
                                {(type == "Chat" || type == "Call") && (
                                  <>
                                    {t('Duration')} :{" "}
                                    <span>
                                      {item.redeemPoint / item.redeemValue}{t('min')}
                                    </span>
                                  </>
                                )}
                              </p>
                              {type == "Chat" || type == "Call" ? (
                                <p>
                                  {t('Deduction')}:
                                  <span>{`${currencyLogo}${item.redeemPoint}`}</span>
                                </p>
                              ) : (
                                ""
                              )}
                            </div>

                            {(!(type === "premiumCall" || type === "premiumChat")) && <div className="table_td1">
                              {/* {console.log(type)} */}

                              {(type == "Chat" || type == "Call") ? (
                                busypanditList.some(
                                  (ele) => item.redeemMode == ele
                                ) ? (
                                  <button
                                    disabled
                                    className={"order-chat bggrey"}
                                  >
                                    {t(type)}
                                  </button>
                                ) :
                                  (
                                    <button
                                      type="button"
                                      disabled={
                                        isOnline(item.redeemMode, type) !== "Online"
                                      }
                                      onClick={() => handleTypeClick(item, type)}
                                      className={
                                        "order-chat" +
                                        " " +
                                        (isOnline(item.redeemMode, type) !==
                                          "Online"
                                          ? "bggrey"
                                          : "bggreen")
                                      }
                                    >
                                      {t(type)}
                                    </button>
                                  )
                              ) : (
                                <>
                                  <span
                                    onClick={() => handleTypeClick(item, type)}
                                  >
                                    <div className="order-chat bggreen">
                                      {type == "Report" ? t('Get_Report') : t(type)}
                                    </div>
                                  </span>
                                </>
                              )}

                              {(type == "Chat" || type == "Call") ? (
                                busypanditList.some(
                                  (ele) => item.redeemMode == ele
                                ) ? (
                                  <p className={"c-off-r txtred"}>{t('Busy')}</p>
                                ) :
                                  (
                                    <p
                                      className={
                                        "c-off-r" +
                                        " " +
                                        (isOnline(item.redeemMode, type) == "Online"
                                          ? "txtgreen"
                                          : "txtred")
                                      }
                                    >
                                      {t(isOnline(item.redeemMode, type))}
                                    </p>
                                  )
                              ) : (
                                ""
                              )}
                            </div>}

                            {type === 'premiumChat' ? <div className="table_td1">
                              {toTimeFormat(item.premiumStartTime)}
                              <br />
                              {toTimeFormat(item.premiumEndTime)}
                            </div> : null}
                          </div>
                        ))) : <div className="col order_history_data_not_found">
                        <p className="text-center">{t('No_Data_Found')}</p>
                      </div>}

                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
            </div>


          </div>
          <div className="col pagination-cl">
            <nav aria-label="..." style={{ width: 'fit-content' }}>
              <ReactPaginate
                previousLabel={"<" + t("Previous")}
                nextLabel={t("Next") + ">"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                forcePage={initialPage}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
              />
            </nav>
          </div>

        </div>
      </div>
      <Footer history={props} />
    </>
  );
};

export default withRouter(OrderHistoryChat);
