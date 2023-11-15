import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Header from "../common/Header2";
// import HeaderMenu from "../common/HeaderMenu";
import PageHeader from "../common/PageHeader";
import SideMenu from "../common/SideMenu";
import Footer from "../common/Footer";
// import previous from "../images/previous.svg";
// import next from "../images/next.svg";
// import store from "../images/store.png";
// import comment from "../images/comment.svg";
import apis from "../configuration/apis";
import * as Constant from "../configuration/constants";
import { postApi } from "../configuration/apis";
import { getCommonHeaders } from "../configuration/commonFunctions";
import * as ErrorConstant from "../configuration/errorConstants";
import { FRONTEND_NAME } from "../configuration/constants";
import $ from "jquery";
// import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";
import Loading from "./loader";
import Signup from "./signup";
// import BottomHeader from "../common/BottomHeader";
import { useTranslation } from "react-i18next";
import Chat_Talk_Header from "../common/Chat&Talk_Header";

const AstrologyStore = (props) => {
  const [redemptionItem, setRedemptionItem] = useState(
    sessionStorage["productcatalogItem"]
  );
  // const [redemptionItemTitle, setRedemptionItemTitle] = useState(
  //   sessionStorage["productcatalogItemTitle"]
  // );
  const [redemptionList, setRedemptionList] = useState([]);
  const [parentCategory, setParentCategory] = useState("");
  const [addToCartList, setAddToCart] = useState([]);
  // const [quantity, setQuantity] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [enableLoader, setEnableLoader] = useState(false);
  const [cartTotalCount, setCartTotalCount] = useState({});
  const [imgUrl, setImgUrl] = useState({});
  const [pageSize, setPageSize] = useState(0);
  // const [activePage, setActivePage] = useState(0);

  const [displaySignupPopUp, setDisplaySignupPopUp] = useState(false);
  const [loginSelected, setLoginSelected] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    localStorage["userProfile"] ? true : false
  );
  const [currencyLogo, setCurrencyLogo] = useState('');
  const [t] = useTranslation();
  const [countryCode, setCountryCode] = useState([]);

  useEffect(() => {
    getRedemption(1);
    if (localStorage["userProfile"]) {
      getCartTotalCount();
    }
    getUserCurrency();
    fetchcountryCode();
  }, []);

  const fetchcountryCode = () => {
    var headers = getCommonHeaders();
    let dataToPush = [];
    apis
      .getCountryCode(headers)
      .then((response) => response.data)
      .then((data) => {
        if (data.code == '2000') {

          data.data.forEach(d => {
            dataToPush.push(d.countryCode);
          });

          setCountryCode(dataToPush)
        }
      })
      .catch((error) => {
        console.log(error);
      });

  }

  const addToCart = (id, quantity, img, goodsNameKey) => {
    console.log('cart.....' + addToCartList);
    setEnableLoader(false);
    const headers = getCommonHeaders();
    // headers.accessToken = localStorage["userProfile"]?localStorage["userProfile"].accessToken:null;

    var requestBody = {
      "goodsId": id,
      "quantity": quantity,
      "goodsNameKey": goodsNameKey
    };
    apis.addItemsToCart(requestBody, headers)
      .then(response => response.data)
      .then(data => {
        console.log("resp data", data);
        if (data.code == "2000") {
          // debugger;
          { console.log('addItemsToCart' + data.data) }

          //setCartTotalCount(data.data);
          setEnableLoader(true);
          // window.location.reload(false);
          console.log('cart.....' + addToCartList);
          getCartTotalCount();
          //setEnableLoader(true);
          localStorage["imgUrl"] = img;
          //props.history.push(FRONTEND_NAME + "/addToCart");

        }

        else {
          console.log(data.msg);
          setEnableLoader(true);
          //props.showPopUpFunc(data.msg);
        }
      })
      .catch(error => {
        console.log(error);
        setEnableLoader(false);
        //props.showPopUpFunc(data.msg);
      }
      )

  };
  //  addItemsToCart(cartItem);

  const buyNow = (cartItem) => {
    /*var id = cartItem.redeemId;
    var quantity = parseInt(document.getElementById(id).innerHTML);
    cartItem.redeemUnit = quantity;
    const newList = addToCartList.concat(cartItem);
    setAddToCart(newList)
    sessionStorage.setItem("addToCartList", JSON.stringify(newList));*/
    //addItemsToCart(cartItem);
    handleCartChange(cartItem.redeemId, "addCart", cartItem.redeemImage, cartItem.goodsNameKey);

    setTimeout(() => {
      props.history.push(FRONTEND_NAME + "/cartOrder");
    }, 1000);
  };
  const getCartTotalCount = () => {
    setEnableLoader(false);
    const headers = getCommonHeaders();
    //headers.accessToken = localStorage["userProfile"]?localStorage["userProfile"].accessToken:null;

    apis
      .getCartItemCount(headers)
      .then((response) => response.data)
      .then((data) => {
        console.log("resp data", data);
        if (data.code == "2000") {
          ////debugger;
          if (data.data) {
            let cartCountData = data.data;
            sessionStorage["cartCount"] = cartCountData.quantity;
            setCartTotalCount(data.data);
            setEnableLoader(true);
          }

          //props.history.push(FRONTEND_NAME + "/addToCart");
        } else {
          console.log(data.msg);
          setEnableLoader(true);
          //props.showPopUpFunc(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
        setEnableLoader(false);
      });
  };

  const addItemsToCart = (cartItem) => {
    setEnableLoader(false);
    const headers = getCommonHeaders();
    // headers.accessToken = localStorage["userProfile"]?localStorage["userProfile"].accessToken:null;

    var requestBody = {
      goodsId: cartItem.redeemId,
      quantity: cartItem.redeemUnit,
    };
    apis
      .addItemsToCart(requestBody, headers)
      .then((response) => response.data)
      .then((data) => {
        console.log("resp data", data);
        if (data.code == "2000") {
          ////debugger;
          {
            console.log("addItemsToCart" + data.data);
          }

          setCartTotalCount(data.data);
          setEnableLoader(true);
          setImgUrl(cartItem.redeemImage);
          localStorage["imgUrl"] = cartItem.redeemImage;
          //props.history.push(FRONTEND_NAME + "/addToCart");
        } else if (data.code == "2009") {
          setEnableLoader(true);
          openLoginPopup();
        } else {
          console.log(data.msg);
          setEnableLoader(true);
          //props.showPopUpFunc(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
        setEnableLoader(false);
      });
  };

  const handleCartChange = (id, opr, img, goodsNameKey) => {
    //const newList = addToCartList.filter((item) => item.redeemId !== id);

    /*setAddToCart(newList);
    setTotalAmount(newList.reduce((total, currentValue) => total = total + currentValue.redeemPoint*currentValue.redeemUnit, 0));
    //setTaxAmount(((newList.reduce((total, currentValue) => total = total + currentValue.redeemPoint*currentValue.redeemUnit, 0)) * 18) / 100);
    setShippingAmount(0);
    //setOrderTotalAmount((newList.reduce((total, currentValue) => total = total + currentValue.redeemPoint*currentValue.redeemUnit, 0)) + (((newList.reduce((total, currentValue) => total = total + currentValue.redeemPoint*currentValue.redeemUnit, 0)) * 18) / 100) + shippingAmount);
    setOrderTotalAmount((newList.reduce((total, currentValue) => total = total + currentValue.redeemPoint*currentValue.redeemUnit, 0)) + shippingAmount);*/
    var quantity = parseInt(document.getElementById(id).innerHTML);
    if (opr == "add") {
      debugger;

      quantity += 1;

      $("#" + id).html(quantity);
      // addToCart(id, 1);
    } else if (opr == "sub") {
      quantity -= 1;
      if (quantity == 0 || quantity < 0) quantity = 1;
      $("#" + id).html(quantity);
      //  removeFromCart(id, 1);
    }
    else {
      addToCart(id, quantity, img, goodsNameKey);
    }
  };
  const removeFromCart = (id, quantity) => {
    console.log("cart....." + addToCartList);
    setEnableLoader(false);
    const headers = getCommonHeaders();
    //  headers.accessToken = localStorage["userProfile"]?localStorage["userProfile"].accessToken:null;

    var requestBody = {
      goodsId: id,
      quantity: quantity,
    };
    apis
      .removeItemFromCart(requestBody, headers)
      .then((response) => response.data)
      .then((data) => {
        console.log("resp data", data);
        if (data.code == "2000") {
          debugger;
          {
            console.log("removeItemFromCart" + data.data);
          }

          //setCartTotalCount(data.data);
          setEnableLoader(true);
          getCartTotalCount();
          //  window.location.reload(false);
          //props.history.push(FRONTEND_NAME + "/addToCart");
        }
        else {
          console.log(data.msg);
          setEnableLoader(true);
          //props.showPopUpFunc(data.msg);
        }
      })
      .catch(error => {
        console.log(error);
        setEnableLoader(false);
      });
  };
  const setProductQuantity = (id, tran, quantity1) => {
    var quantity = parseInt(document.getElementById(id).innerHTML);
    if (tran == "add") {
      quantity += 1;

      $("#" + id).html(quantity);
    } else if (tran == "sub") {
      quantity -= 1;
      if (quantity == 0 || quantity < 0) quantity = 0;
      $("#" + id).html(quantity);
    } else {
      $("#" + id).html(quantity);
    }
  };
  const getRedemption = (activePage) => {
    ////debugger;
    console.log("inside getProductcatalog method");
    var url = Constant.ASTRO_URL + Constant.GET_REDEMPTION;
    url = url.replace("<page>", activePage);
    url = url.replace("<size>", pageSize);
    const body = {
      redeemCategory: redemptionItem,
      redemptionType: "WHITE",
    };
    const headers = getCommonHeaders();
    console.log("body", body);
    postApi(url, headers, body)
      .then((response) => response.data)
      .then((data) => {
        if (data && data.code == ErrorConstant.SUCCESS_CODE) {
          console.log("redemption data ", data);
          try {
            setRedemptionList(data.data);
            setPageCount(Math.ceil(data.totalCount / pageSize));
            setEnableLoader(true);
            setParentCategory(data.parentCategory);
          } catch (error) {
            console.log("exception occured");
            //  this.toggleShowMsg("Something went wrong");
            setEnableLoader(false);
            //this.setState({ enableLoader: false });
          }
        } else {
          console.log(
            "Error code from getProductcatalog API : ",
            data.code,
            "with msg : ",
            data.msg
          );
          setEnableLoader(true);
          //this.setState({ enableLoader: false });
        }
      })
      .catch((error) => {
        console.log();
        console.error("error", error);
        setEnableLoader(true);
      });

    // let pager = Pager('pager', 2);
    // pager.init();
    // pager.showPageNav('pager', 'pageNavPosition');
    // pager.showPage(1);
  };
  const handlePageClick = (data) => {
    let selected = data.selected;
    /*let offset = Math.ceil(selected * props.perPage);

    this.setState({ offset: offset }, () => {
      this.loadCommentsFromServer();
    });*/
    getRedemption(selected);
  };

  const cartOrder = () => {
    props.history.push(FRONTEND_NAME + "/cartOrder");
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

  console.log("Redemption list", redemptionList);
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
        title={parentCategory}
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
            countryCode={countryCode}
          />
        )}
        {/* <HeaderMenu /> */}
        <PageHeader
          Mob_HeaderIsTrue={'not_show_mob_header1'}
          name={{ firstname: "ONLINE", lastname: "ASTROLOGY STORE" }}
        />
        {enableLoader ? null : <Loading />}
        <div className="page-body">
          <div className="row">
            <div className="col-12 col-md-3 mobsidemenu">
              <SideMenu />
            </div>

            <div className="col-md-9 mobChatlist">
              <div className="col-sm-12 col-md-12 col-lg-12 text-left mb-2">
                {t('AstroMall')} / {parentCategory}
              </div>
              {/* {console.log("cartCount.." + cartTotalCount.length)} */}
              {Object.keys(cartTotalCount).length > 0 &&
                cartTotalCount.constructor === Object ? (
                <div className="col-sm-12 col-md-12 col-lg-12 added-div">
                  <div className='row'>
                    <div className="col-sm-7 col-md-7 col-lg-7 tx-align-lft DFlex">
                      {/* <img src={comment} className="cmt-img"></img> */}
                      <img src={localStorage["imgUrl"]} className="add-img" alt="img"></img>
                      <p className="item-added">
                        {t('Subtotal')} ({cartTotalCount.quantity ? cartTotalCount.quantity : 0} {t('Items')}):{" "}
                        <span>{`${currencyLogo}${cartTotalCount.goodsPrice ? cartTotalCount.goodsPrice : 0}`}</span>
                      </p>
                    </div>
                    <div className="col-sm-5 col-md-5 col-lg-5 float tx-align-ryt userBalance">
                      <button className="cart-selected" onClick={() =>
                        isUserLoggedIn ?
                          cartOrder() :
                          openLoginPopup()}>
                        {t('Cart')}
                      </button>
                      <button
                        className={cartTotalCount.quantity && cartTotalCount.quantity > 0 ? "proceed-selected" : "disabled-proceed-selected"}
                        disabled={cartTotalCount.quantity && cartTotalCount.quantity > 0 ? false : true}
                        onClick={() => isUserLoggedIn ? cartTotalCount.quantity && cartTotalCount.quantity > 0 && cartOrder() : openLoginPopup()}
                      >
                        {t('Proceed to buy')} ({cartTotalCount.quantity} {t('item')})
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="store-list">
                {redemptionList && redemptionList.length > 0 ? (
                  <table id="pager" class="wp-list-table widefat striped posts">
                    {redemptionList && redemptionList.length > 0 &&
                      redemptionList.map((item, index) => (
                        <tr>
                          <div className="store-list-item">
                            <div className="row">
                              <div className="col-sm-2 col-md-2 col-lg-2">
                                <img
                                  src={item.goodsImage}
                                  className="store-img"
                                  alt="img"
                                  width="100%"
                                />
                              </div>
                              <div className="col-sm-6 col-md-6 col-lg-6">
                                <p className="item-head">{item.goodsName}</p>
                                <p className="item-desc">{item.goodsDescription}</p>
                              </div>
                              <div className="col-sm-4 col-md-4 col-lg-4">
                                <div className="col-sm-12 col-md-12 col-lg-12 padd-0">
                                  {/*
                            <p className="col-sm-4 col-md-4 col-lg-4 float-left padd-0 tx-align-lft strike">
                              &#8377; {item.goodsPrice}
                            </p>
                            */}
                                  <p className="amount">
                                    {`${currencyLogo}${item.goodsPrice}/${t('piece')}`}
                                  </p>
                                </div>


                                <div className="col-sm-12 col-md-12 col-lg-12">
                                  <span className="q-1">{t('Qty')}</span>
                                  <span
                                    className="q-2"
                                    onClick={() =>

                                      handleCartChange(item.goodsId, "sub")

                                    }
                                  >
                                    -
                                  </span>
                                  <span className="q-3" id={item.goodsId}>
                                    1
                                  </span>
                                  <span
                                    className="q-4"
                                    onClick={() =>

                                      handleCartChange(item.goodsId, "add")

                                    }
                                  >
                                    +
                                  </span>
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-12 mg-19">
                                  <div className="w-112">
                                    <button
                                      className="cart mb-3"
                                      onClick={() =>
                                        isUserLoggedIn ?
                                          handleCartChange(item.goodsId, "addCart", item.goodsImage, item.goodsNameKey)
                                          : openLoginPopup()
                                      }
                                    >
                                      {t('Add_To_Cart')}
                                    </button>

                                    <button
                                      className="buy mb-3"
                                      onClick={() =>
                                        isUserLoggedIn ?
                                          buyNow({
                                            redeemCategory: redemptionItem,
                                            redeemId: item.goodsId,
                                            redeemMode: item.goodsNameKey,
                                            redeemParentCategory: "whiteGoods",
                                            redeemPoint: item.goodsPrice,
                                            redeemUnit: item.goodsQuantity,
                                            redeemValue: item.goodsPoints,
                                            redeemImage: item.goodsImage,
                                            goodsNameKey: item.goodsNameKey
                                          })
                                          : openLoginPopup()
                                      }
                                    >
                                      {t('Buy_Now')}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </tr>

                      )
                      )
                    }</table>
                ) : (
                  <div className="col">
                    <p style={{ textAlign: "center" }}>
                      {t('No_Product')}
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

export default withRouter(AstrologyStore);
