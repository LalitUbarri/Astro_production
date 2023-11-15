import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Header from "../common/Header2";
import HeaderMenu from "../common/HeaderMenu";
import PageHeader from "../common/PageHeader";
import SideMenu from "../common/SideMenu";
import Footer from "../common/Footer";
import previous from "../images/previous.svg";
import next from "../images/next.svg";
import store from "../images/store.png";
import comment from "../images/comment.svg";
import apis from "../configuration/apis";
import * as Constant from "../configuration/constants";
import { getApi, postApi } from "../configuration/apis";
import { getCommonHeaders } from "../configuration/commonFunctions";
import * as ErrorConstant from "../configuration/errorConstants";
import { FRONTEND_NAME } from "../configuration/constants";
import $ from "jquery";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";
import Loading from "./loader";
import Signup from "./signup";
import BottomHeader from "../common/BottomHeader";
import { useTranslation } from "react-i18next";
import Chat_Talk_Header from "../common/Chat&Talk_Header";

const PoojaList = (props) => {
  const [redemptionItem, setRedemptionItem] = useState(
    sessionStorage["productcatalogItem"]
  );
  const [redemptionItemTitle, setRedemptionItemTitle] = useState(
    sessionStorage["productcatalogItemTitle"]
  );
  const [redemptionList, setRedemptionList] = useState([]);
  const [parentCategory, setParentCategory] = useState("");
  const [addToCartList, setAddToCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [enableLoader, setEnableLoader] = useState(false);
  const [cartTotalCount, setCartTotalCount] = useState({});
  const [imgUrl, setImgUrl] = useState({});
  const [pageSize, setPageSize] = useState(0);
  const [activePage, setActivePage] = useState(0);

  const [displaySignupPopUp, setDisplaySignupPopUp] = useState(false);
  const [loginSelected, setLoginSelected] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    localStorage["userProfile"] ? true : false
  );
  const [currencyLogo, setCurrencyLogo] = useState('');

  const [currentPage, setCurrentPage] = useState(0);
  const [offset, setOffset] = useState(0);

  const [t] = useTranslation();

  useEffect(() => {
    getProductBilling();
    getUserCurrency();
  }, []);



  const getProductBilling = () => {
    var requestBody = {
      "searchKey": "OnlinePuja",
      "startDate": "",
      "endDate": "",
      "pageNumber": "",
      "entryList": ""
    };

    apis.productBillingDetails(requestBody).then((response) => {
      var data = response.data;
      console.log("productBillingDetails", data.data);
      if (data.code == 2000) {
        console.log("poojalist", data.data);
        setRedemptionList(data.data)
      } else {
        console.log("ERROR", data.msg);
      }
      setEnableLoader(true)
    });
  };


  const openLoginPopup = () => {
    setDisplaySignupPopUp(true);
    setLoginSelected(true);
  };

  const openSignupPopup = () => {
    setDisplaySignupPopUp(true);
    setLoginSelected(false);
  };
  const closeSignUpPopup = () => {
    setDisplaySignupPopUp(false);
  };

  const closePopupOnLogin = () => {
    ////debugger;
    setDisplaySignupPopUp(false);
    setIsUserLoggedIn(true);

    localStorage["isUserLoggedIn"] = true;
  };

  const handlePageClick = ({ selected: selectedPage }) => {
    //  const selectedPage = e.selected;
    setCurrentPage(selectedPage);
    setOffset(selectedPage + 1);
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

  const joinNow = (videoUrl, bestStartTime, bestEndTime, poojaStatus, isOffline) => {
    if (checkJoinNow(videoUrl, bestStartTime, bestEndTime, poojaStatus)) {
      if (isOffline === 0) {
        window.open(videoUrl, "_blank")
      }
      else {
        if (videoUrl.match('meet.google.com')) {
          // alert('this is google meet link');
          window.open(videoUrl, "_blank")
        } else {
          props.history.push({
            pathname: FRONTEND_NAME + "/playpooja",
            state: {
              bestStartTime: bestStartTime,
              bestEndTime: bestEndTime,
              poojaVideoUrl: videoUrl
            }
          })
        }

      }
    }
  }

  const checkJoinNow = (videoUrl, bestStartTime, bestEndTime, poojaStatus) => {
    if ((!bestStartTime || !bestEndTime || !videoUrl || poojaStatus === "Requested")) return false;

    let startTime = new Date(bestStartTime).getTime();
    let endTime = new Date(bestEndTime).getTime();
    let currentTime = new Date().getTime();

    // console.log("Time", startTime, endTime, currentTime)

    if (currentTime < startTime || currentTime > endTime) {
      return false;
    }

    return true;
  }

  return (
    <>
      <Chat_Talk_Header
        IsNavIconTrue={false}
        IsSearchTrue={false}
        IsFilterTrue={false}
        // editSearchTerm={this.editSearchTerm}
        // editSortTerm={this.editSortTerm}
        // IsMob_Side_Nave={this.IsMob_Side_Nave}
        propsData={props}
        CustomClass={true}
        IsTitleTrue={true}
        title={t('Astrology_News')}
      />
      <Header
        IsActive_header_Or_not="chat_and_talk_header-"
        openLoginPopup={openLoginPopup}
        openSignupPopup={openSignupPopup}
        isLogin={loginSelected}
      />
      {/* <BottomHeader /> */}
      <div className="container">

        {displaySignupPopUp && (
          <Signup
            openLoginPopup={openLoginPopup}
            openSignupPopup={openSignupPopup}
            closePopUp={closeSignUpPopup}
            closeOnLogin={closePopupOnLogin}
            isLogin={loginSelected}
          />
        )}
        {/* <HeaderMenu /> */}
        <PageHeader
          Mob_HeaderIsTrue={'not_show_mob_header1'}
          name={{ firstname: "ASTRO", lastname: "POOJA" }}
        />
        {enableLoader ? null : <Loading />}
        <div className="page-body">
          <div className="row">
            <div className="col-12 col-md-3 mobsidemenu">
              <SideMenu />
            </div>

            <div className="col-md-9 mobChatlist">

              <div
                className="loadMore mb-3" style={{ cursor: 'pointer' }}
                onClick={() => {
                  sessionStorage["productcatalogItem"] = "OnlinePuja";
                  sessionStorage["productcatalogItemTitle"] = t("Online Puja");
                  props.history.push({
                    pathname: FRONTEND_NAME + "/astrologyStore"
                  })
                }}
              >
                {t('BUY MORE PUJA')}
              </div>
              <div className="store-list">
                {redemptionList && redemptionList.length > 0 ? (
                  <table id="pager" class="wp-list-table widefat striped posts">
                    {redemptionList && redemptionList.length > 0 &&
                      redemptionList.map((item, index) => {
                        let startTime = new Date(item.bestStartTime).getTime();
                        let endTime = new Date(item.bestEndTime).getTime();
                        let currentTime = new Date().getTime();
                        var ddd = checkJoinNow(item.poojaVideoUrl, item.bestStartTime, item.bestEndTime, item.poojaStatus);

                        if (ddd || item.poojaStatus === "Requested") {
                          return (
                            <tr>
                              <div className="store-list-item">
                                <div className="row">
                                  <div className="col-sm-2 col-md-2 col-lg-2">
                                    <img
                                      src={item.imageURL}
                                      className="store-img"
                                      alt={item.productName}
                                      width="100%"
                                    />
                                  </div>
                                  <div className="col-sm-7 col-md-7 col-lg-7">
                                    <p className="item-head">{item.productName}
                                      {item.poojaStatus && item.poojaStatus === "Requested" && <span class="badge badge-secondary status-red"> {t('Requested')}</span>}
                                      {item.poojaStatus && item.poojaStatus === "Scheduled" && <span class="badge badge-secondary status-green"> {t('Scheduled')}</span>}
                                    </p>
                                    <p className="item-desc">{item.goodsDescription}</p>
                                  </div>
                                  <div className="col-sm-3 col-md-3 col-lg-3 button-section">
                                    <button
                                      className={checkJoinNow(item.poojaVideoUrl, item.bestStartTime, item.bestEndTime, item.poojaStatus) ? "cart mb-3" : "cart-gray mb-3"}
                                      onClick={() => { joinNow(item.poojaVideoUrl, item.bestStartTime, item.bestEndTime, item.poojaStatus, item.isOffline) }}
                                    >
                                      {t('Join Now')}
                                    </button>

                                    <div
                                      className="click-more"
                                      onClick={() => {
                                        props.history.push({
                                          pathname: FRONTEND_NAME + "/poojadetails",
                                          state: { kundaliFormData: item.id },
                                        })
                                      }}
                                    >
                                      {t('CLICK HERE FOR DETAILS')}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </tr>

                          )
                        }
                      }
                      )
                    }</table>
                ) : (
                  <div className="col">
                    <p style={{ textAlign: "center" }}>
                      {t('No booked pooja found, Please book using below button')}
                      {/* No product available under selected category. */}
                    </p>
                  </div>
                )}

              </div>
              <div className="row">
                <div className="col-md-12">

                  <nav
                    aria-label="Page navigation example"
                    style={{ float: "right" }}
                  >
                    {/* <ul class="pagination nav-page">
                  <li class="page-item nav-page"> <a class="page-link nav-page" href="#" style={{ marginRight: "5px" }} > <img src={previous} className="nav-ryt"></img>Previous </a></li>
                  <li class="page-item"> <a class="page-link nav-page-num" href="#"> 1 </a> </li>
                  <li class="page-item"> <a class="page-link nav-page-num" href="#"> 2 </a> </li>
                  <li class="page-item"><a class="page-link nav-page-num" href="#"> 3 </a> </li>
                  <li class="page-item"><a class="page-link nav-page" href="#" style={{ marginLeft: "5px" }} > Next<img src={next} className="nav-lft"></img> </a> </li>
                </ul> */}
                    <div id="pageNavPosition" class="pager-nav"></div>
                    {
                      <ReactPaginate
                        previousLabel={"<" + t('Previous')}
                        nextLabel={t('Next') + ">"}
                        pageCount={pageCount}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        previousLinkClassName={"pagination__link"}
                        nextLinkClassName={"pagination__link"}
                        disabledClassName={"pagination__link--disabled"}
                        activeClassName={"pagination__link--active"}
                      />
                    }
                  </nav>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer history={props} />
    </>
  );
};

export default withRouter(PoojaList);
