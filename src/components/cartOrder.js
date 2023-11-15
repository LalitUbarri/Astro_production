import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Header from "../common/Header2";
// import HeaderMenu from "../common/HeaderMenu";
import PageHeader from "../common/PageHeader";
// import SideMenu from "../common/SideMenu";
import Footer from "../common/Footer";
import "../styles/cartOrder.css";
import voucher from "../images/voucher.svg";
import percentOrange from "../images/percentOrange.svg"
import gray from "../images/gray.svg";
import bin from "../images/bin.svg";
import recent from "../images/recent.svg";
// import added from "../images/added.png";
import Popup1 from "../components/Popup1";
import * as Constant from "../configuration/constants";
import { postApi } from "../configuration/apis";
import { getCommonHeaders } from "../configuration/commonFunctions";
import * as ErrorConstant from "../configuration/errorConstants";
import { FRONTEND_NAME } from "../configuration/constants";
// import $ from "jquery";
import Popup from "./popupChat";
import apis from "../configuration/apis";
// import addToCart from "./addToCart";
import Loading from "./loader";
import VocherCodePopup from "../common/VocherCodePopup";
// import BottomHeader from "../common/BottomHeader";
import { useTranslation } from "react-i18next";
import Chat_Talk_Header from "../common/Chat&Talk_Header";
const CartOrder = (props) => {
  const [addToCartList, setAddToCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingAmount, setShippingAmount] = useState(0);
  const [orderTotalAmount, setOrderTotalAmount] = useState(
    totalAmount + shippingAmount
  );
  const [userAddressList, setUserAddressList] = useState([]);
  const [orderAddress, setOrderAddress] = useState({});
  const [responce, setResponce] = useState({});
  const [selectAddressId, setSelectAddressId] = useState("");
  const [enableLoader, setEnableLoader] = useState("");
  const [closeOnOk, setCloseOnOk] = useState(false);

  const [addressId, setAddressId] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [alternatePhoneNumber, setAlternatePhoneNumber] = useState("");
  const [locality, setLocality] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [stateProvince, setStateProvince] = useState("");
  const [showPopUp, setShowPopUp] = useState(false);
  const [msg, setMsg] = useState("");
  const [button, setButton] = useState("Ok");
  const [heading, setHeading] = useState("");
  // const [userProfile, setUserProfile] = useState(
  //   localStorage.getItem("userProfile")
  //     ? JSON.parse(localStorage.getItem("userProfile"))
  //     : {}
  // );
  // const [pageSize, setPageSize] = useState("2");
  const [pageCount, setPageCount] = useState("1");
  const [cartCount, setCartCount] = useState(sessionStorage["cartCount"] ? sessionStorage["cartCount"] : 0);
  const [showVocherPopup, setShowVocherPopup] = useState(false);
  // const [voucherApply, setVocherAppy] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [vocherTxnid, setVoucherTxnId] = useState("");
  const [t] = useTranslation();
  const [checkOnlyOnlinePooja, setCheckOnlyOnlinePooja] = useState(false)

  useEffect(() => {
    getAddressList();
    fetchCartDetails();
  }, []);

  const getAddressList = () => {
    console.log("inside getProductcatalog method");
    var url = Constant.ASTRO_URL + Constant.GET_USER_ADDRESS;
    const headers = getCommonHeaders();
    setPhoneNumber(headers.msisdn);
    // headers.accessToken = userProfile.accessToken;
    const body = { userId: headers.msisdn };
    console.log("body", body);
    postApi(url, headers, body)
      .then((response) => response.data)
      .then((data) => {
        if (data && data.code == ErrorConstant.SUCCESS_CODE) {
          console.log("data ", data.data);
          try {
            setUserAddressList(data.data);
            setEnableLoader(true);
          } catch (error) {
            console.log("exception occured");
            // this.toggleShowMsg("Something went wrong");
            setEnableLoader(true);
          }
        } else {
          /* else if(data && data.code == "2009")
         {
           localStorage.clear();
           sessionStorage.clear();
           setShowPopUp(true);
           setEnableLoader(true);
           setMsg('Session logout ! Please login again. ');
           setButton('Ok');
         }*/
          console.log(
            "Error code from getProductcatalog API : ",
            data.code,
            "with msg : ",
            data.msg
          );
          setEnableLoader(true);
        }
      })
      .catch((error) => {
        setEnableLoader(true);
        console.log();
        console.error("error", error);
      });
  };
  const getCartTotalCount = () => {

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
            setCartCount(cartCountData.quantity);
          }

        } else {
          console.log(data.msg);
          //props.showPopUpFunc(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
        setEnableLoader(false);
      });
  };

  const fetchCartDetails = () => {
    setEnableLoader(false);
    const headers = getCommonHeaders();
    // headers.accessToken = localStorage["userProfile"]?localStorage["userProfile"].accessToken:null;

    apis
      .viewCartItems(headers)
      .then((response) => response.data)
      .then((data) => {
        console.log("resp data", data);
        if (data.code == "2000") {
          //debugger;
          console.log("viewCartItems", data.data);

          let cartData = data.data;
          setAddToCart(data.data);
          const online = cartData.some((ele) => 'OnlinePuja' == ele.redeemCategory)
          const mallProd = cartData.some((ele) => 'OnlinePuja' != ele.redeemCategory)
          // debugger;
          if (online == true && mallProd == false) {
            setCheckOnlyOnlinePooja(true);
          } else {
            setCheckOnlyOnlinePooja(false);
          }
          //checkOnlinePooja(addToCartList);
          let totalAmount = cartData.reduce(
            (prevValue, currentValue) =>
              prevValue + currentValue.redeemPoint,
            0
          );
          setSubTotal(totalAmount);
          setTotalAmount(totalAmount);
          setEnableLoader(true);
          setPageCount(data.data.length);
          //setTotalAmountForCheckout();
          //props.history.push(FRONTEND_NAME + "/addToCart");
        } else {
          console.log(data.msg);
          setAddToCart([]);
          setSubTotal(0);
          setTotalAmount(0);
          setEnableLoader(true);
          //props.showPopUpFunc(data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
        setEnableLoader(true);
      });
  };
  const updateCart = (newCartData, newAmount, voucherCode, totalDiscount, vocherTxnid) => {
    //  setAddToCart(newCartData);
    setTotalAmount(newAmount);
    setVoucherCode(voucherCode);
    setTotalDiscount(totalDiscount);
    setVoucherTxnId(vocherTxnid);
  }
  const removeVocher = () => {

    var requestBody = {
      voucherTransactionId: vocherTxnid,
      promocode: voucherCode,
    };
    apis
      .removePromo(requestBody)
      .then((response) => response.data)
      .then((data) => {
        console.log("resp data", data);
        if (data.code == "2000") {
          setTotalAmount(subTotal);
          setTotalDiscount(0);
          setVoucherCode("");
          setVoucherTxnId("");

        }
        else {
          console.log(data.msg);

        }
      })
      .catch((error) => {
        console.log(error);

      });

  }
  const setTotalAmountForCheckout = () => {
    var amt = 0;
    addToCartList.map((data) => {
      amt = amt + data.redeemValue;
    });
    setTotalAmount(amt);
    setOrderTotalAmount(amt + shippingAmount);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const headers = getCommonHeaders();
    // headers.accessToken = userProfile.accessToken;
    if (locality == "") {
      setShowPopUp(true)
      setResponce({ msg: t("Please Enter Locality.") });
      return false;
    }
    if (address == "") {
      setShowPopUp(true)
      setResponce({ msg: t("Please Enter Address.") });
      return false;
    }
    if (city == "") {
      setShowPopUp(true)
      setResponce({ msg: t('Please_enter_city.') });
      return false;
    }
    if (country == "") {
      setShowPopUp(true)
      setResponce({ msg: t('Please_enter_country.') });
      return false;
    }
    if (pincode == "") {
      setShowPopUp(true)
      setResponce({ msg: t("Please Enter Pincode.") });
      return false;
    }
    if (stateProvince == "") {
      setShowPopUp(true)
      setResponce({ msg: t("Please Enter State/Province.") });
      return false;
    }
    if (addressId == "") {
      var url = Constant.ASTRO_URL + Constant.SAVE_USER_ADDRESS;
      const body = {
        userAddressList: [
          {
            addressCategory: "Address",
            addressLine1: locality,
            addressLine2: landmark,
            addressType: "address",
            city: city,
            country: country,
            houseNo: address,
            mobile: alternatePhoneNumber,
            pinCode: pincode,
            state: stateProvince,
            userId: headers.msisdn,
            userName: name,
          },
        ],
      };

      console.log("body", body);
      postApi(url, headers, body)
        .then((response) => response.data)
        .then((data) => {
          if (data && data.code == ErrorConstant.SUCCESS_CODE) {
            setAddressId("");
            setName("");
            setPhoneNumber("");
            setAlternatePhoneNumber("");
            setLocality("");
            setAddress("");
            setLandmark("");
            setCity("");
            setCountry("");
            setPincode("");
            setStateProvince("");

            getAddressList();
            // showPopUpFunc("Address added successfully", true);
            setShowPopUp(true)
            setResponce({ msg: t("Address added successfully"), isSuccess: true });
          } else {
            setResponce(data);
          }
        })
        .catch((error) => {
          console.log();
          console.error("error", error);
        });
    } else {
      var url = Constant.ASTRO_URL + Constant.UPDATE_USER_ADDRESS;
      const body = {
        userAddressList: [
          {
            addressCategory: "Address",
            addressId: addressId,
            addressLine1: locality,
            addressLine2: landmark,
            addressType: "address",
            city: city,
            country: country,
            houseNo: address,
            mobile: phoneNumber,
            pinCode: pincode,
            state: stateProvince,
            userId: headers.msisdn,
            userName: name,
          },
        ],
      };

      console.log("body", body);
      postApi(url, headers, body)
        .then((response) => response.data)
        .then((data) => {
          if (data && data.code == ErrorConstant.SUCCESS_CODE) {
            //  showPopUpFunc("Address updated successfully", true);
            setShowPopUp(true)
            setResponce({ msg: t("Address updated successfully"), isSuccess: true });


            setAddressId("");
            setName("");
            setPhoneNumber("");
            setAlternatePhoneNumber("");
            setLocality("");
            setAddress("");
            setLandmark("");
            setCity("");
            setCountry("");
            setPincode("");
            setStateProvince("");

            getAddressList();
          } else {
            /* else if(data && data.code == "2009")
           {
             localStorage.clear();
             sessionStorage.clear();
             setShowPopUp(true);
             setMsg('Session logout ! Please login again. ');
             setButton('Ok');
           }*/
            setResponce(data);
          }
        })
        .catch((error) => {
          console.log();
          console.error("error", error);
        });
    }
  };
  const editAddress = (address) => {
    setAddressId(address.addressId);
    setName(address.deliveryName);
    setAlternatePhoneNumber(address.deliveryMobileNo);
    setLocality(address.addressLine1);
    setAddress(address.houseNo);
    setLandmark(address.addressLine2);
    setCity(address.city);
    setCountry(address.country);
    setPincode(address.pinCode);
    setStateProvince(address.state);
  };

  const deleteAddress = (address) => {
    const headers = getCommonHeaders();
    var url = Constant.ASTRO_URL + Constant.DELETE_USER_ADDRESS;
    const body = address;
    //  headers.accessToken = userProfile.accessToken;
    console.log("body", body);
    postApi(url, headers, body)
      .then((response) => response.data)
      .then((data) => {
        if (data && data.code == ErrorConstant.SUCCESS_CODE) {
          // showPopUpFunc("Address deleted successfully", true);
          setShowPopUp(true)
          setResponce({ "msg": t("Address deleted successfully"), "isSuccess": true });

          setAddressId("");
          setName("");
          setPhoneNumber("");
          setAlternatePhoneNumber("");
          setLocality("");
          setAddress("");
          setLandmark("");
          setCity("");
          setCountry("");
          setPincode("");
          setStateProvince("");

          getAddressList();
        } else {
          /* else if(data && data.code == "2009")
         {
           localStorage.clear();
           sessionStorage.clear();
           setShowPopUp(true);
             setMsg('Session logout ! Please login again. ');
             setButton('Ok');
         }*/
          setResponce(data);
        }
      })
      .catch((error) => {
        console.log();
        console.error("error", error);
      });
  };
  function handleRemove(id, opr, goodsNameKey) {
    //const newList = addToCartList.filter((item) => item.redeemId !== id);

    /*setAddToCart(newList);
    setTotalAmount(newList.reduce((total, currentValue) => total = total + currentValue.redeemPoint*currentValue.redeemUnit, 0));
    //setTaxAmount(((newList.reduce((total, currentValue) => total = total + currentValue.redeemPoint*currentValue.redeemUnit, 0)) * 18) / 100);
    setShippingAmount(0);
    //setOrderTotalAmount((newList.reduce((total, currentValue) => total = total + currentValue.redeemPoint*currentValue.redeemUnit, 0)) + (((newList.reduce((total, currentValue) => total = total + currentValue.redeemPoint*currentValue.redeemUnit, 0)) * 18) / 100) + shippingAmount);
    setOrderTotalAmount((newList.reduce((total, currentValue) => total = total + currentValue.redeemPoint*currentValue.redeemUnit, 0)) + shippingAmount);*/

    if (opr == "add") {
      addToCart(id, 1, goodsNameKey);
    } else if (opr == "sub") {
      removeFromCart(id, 1, goodsNameKey);
    }

  }
  const handleRemoveAll = (id, quantity, goodsNameKey) => {
    removeFromCart(id, quantity, goodsNameKey);
  };
  const removeFromCart = (id, quantity, goodsNameKey) => {
    console.log("cart....." + addToCartList);
    setEnableLoader(false);
    const headers = getCommonHeaders();
    //  headers.accessToken = localStorage["userProfile"]?localStorage["userProfile"].accessToken:null;

    var requestBody = {
      goodsId: id,
      quantity: quantity,
      goodsNameKey: goodsNameKey
    };
    apis
      .removeItemFromCart(requestBody, headers)
      .then((response) => response.data)
      .then((data) => {
        console.log("resp data", data);
        if (data.code == "2000") {
          // debugger;
          {
            console.log("removeItemFromCart" + data.data);
          }

          //setCartTotalCount(data.data);
          setEnableLoader(true);
          fetchCartDetails();
          getCartTotalCount();
          // window.location.reload(false);
          //props.history.push(FRONTEND_NAME + "/addToCart");
        } else {
          console.log("error occurred");
          setEnableLoader(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setEnableLoader(false);
      });
  };

  const addToCart = (id, quantity, goodsNameKey) => {
    console.log("cart....." + addToCartList);
    setEnableLoader(false);
    const headers = getCommonHeaders();
    // headers.accessToken = localStorage["userProfile"]?localStorage["userProfile"].accessToken:null;

    var requestBody = {
      goodsId: id,
      quantity: quantity,
      goodsNameKey: goodsNameKey
    };
    apis
      .addItemsToCart(requestBody, headers)
      .then((response) => response.data)
      .then((data) => {
        console.log("resp data", data);
        if (data.code == "2000") {
          // debugger;
          {
            console.log("addItemsToCart" + data.data);
          }

          //setCartTotalCount(data.data);
          setEnableLoader(true);
          fetchCartDetails();
          getCartTotalCount();
          //  window.location.reload(false);
          console.log("cart....." + addToCartList);
          //props.history.push(FRONTEND_NAME + "/addToCart");
        } else {
          console.log(data.msg);
          setEnableLoader(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setEnableLoader(false);
      });
  };
  const selectOrderAddress = (address, cId) => {
    setOrderAddress(address);

    // $(selectAddressId.pId).hide();
    // $(cId).show();
    document.getElementById(cId).style.display = "block";

    if (selectAddressId == "") {
      setSelectAddressId(cId);
    } else {
      document.getElementById(selectAddressId).style.display = "none";
      setSelectAddressId(cId);
    }
  };

  const proceedToCheckout = (event) => {
    event.preventDefault();

    var url = Constant.ASTRO_URL + Constant.GET_ORDER_WHITE_GOODS;
    const headers = getCommonHeaders();
    // headers.accessToken = userProfile.accessToken; 
    //alert('oder..'+JSON.stringify(orderAddress));
    //console.log('orderAddress..'+JSON.stringify(orderAddress))
    //console.log('orderAddredd len'+JSON.stringify(orde rAddress).length)
    let tempCart = [] //addToCartList;
    addToCartList.forEach(cart => {
      let temp = cart;
      temp.redeemMode = cart.goodsNameKey;
      tempCart.push(temp);
    })
    if (userAddressList.length === 0) {
      setShowPopUp(true);
      if (locality == "" && address == "" && city == "" && country == "" && pincode == "" && stateProvince == "" && addressId == "") {
        // alert(showPopUp)
        setShowPopUp(true)
        setResponce({ msg: t("please add your full adderss.") });
      }
    } else if (localStorage["userBalance"] < (subTotal - totalDiscount)) {
      setShowPopUp(true)
      setHeading('recharge');
      setResponce({ msg: t("You do not have sufficient balance in your wallet") });
    }

    else if (addToCart && addToCartList.length === 0) {
      setShowPopUp(true)
      setResponce({ msg: t("Cart cannot be empty."), isSuccess: false });
      setHeading('recharge')
      return;
    } else if (!checkOnlyOnlinePooja &&
      Object.keys(orderAddress).length === 0 &&
      orderAddress.constructor === Object
    ) {
      console.log("emptt");
      setResponce({ msg: t("Please Enter Address."), isSuccess: false });
    } else {
      const body = {
        address: orderAddress,
        isQuantityCheck: "0",
        isSelfPaytm: "0",
        paytmNumber: "0",
        products: tempCart,
        redemptionAddress: "",
        totalRedeemPoints: subTotal - totalDiscount,
        voucher_transaction_id: vocherTxnid
      };
      console.log("body", body);
      postApi(url, headers, body)
        .then((response) => response.data)
        .then((data) => {
          if (data && data.code == ErrorConstant.SUCCESS_CODE) {
            //  setResponce(data);
            setResponce({
              msg: t("Your order has been placed successfully"),
              isSuccess: true,
            });
            setAddToCart([]);
            setCheckOnlyOnlinePooja(true);
            setSubTotal(0);
            setTotalAmount(0);
            setShippingAmount(0);
            setOrderTotalAmount(0);
            setTotalDiscount(0);
            setVoucherCode("");
            clearCart();
            sessionStorage.setItem("addToCartList", JSON.stringify([]));

          } else {
            /* else if(data && data.code == "2009")
          {
            localStorage.clear();
            sessionStorage.clear();
            setShowPopUp(true);
              setMsg('Session logout ! Please login again. ');
              setButton('Ok');
          }*/
            setResponce(data);
          }
        })
        .catch((error) => {
          console.log();
          console.error("error", error);
        });
    }
  };
  const clearCart = () => {
    setEnableLoader(false);
    const headers = getCommonHeaders();
    //headers.accessToken = localStorage["userProfile"]?localStorage["userProfile"].accessToken:null;

    apis
      .clearCart(headers)
      .then((response) => response.data)
      .then((data) => {
        console.log("resp data", data);
        if (data.code == "2000") {


          //setCartTotalCount(data.data);
          setEnableLoader(true);

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
  const showPopUpFunc = (msg, isSuccess, closeOnOk) => {
    setMsg(msg);
    setShowPopUp(true);
    setCloseOnOk(closeOnOk);
  };

  const closePopUp = () => {
    if (heading === 'recharge') {
      setShowPopUp(false);
      props.history.push({ pathname: FRONTEND_NAME + "/recharge" });
    } else if (closeOnOk) {
      props.history.push({ pathname: FRONTEND_NAME + "/astroMall" });
    }
    else {
      setShowPopUp(false);
    }
  };
  const closeVocherPopup = () => {
    setShowVocherPopup(false);
  }

  // console.log("addToCartList", addToCartList)

  // console.log(addToCartList);
  const checkOnlinePooja = (addToCartList) => {
    console.log("checkOnlinePooja");
    console.log(addToCartList);
    const online = addToCartList.some((ele) => 'OnlinePuja' == ele.redeemCategory)
    const mallProd = addToCartList.some((ele) => 'OnlinePuja' == !ele.redeemCategory)
    // debugger;
    if (online == true && mallProd == false) {
      setCheckOnlyOnlinePooja(true);
    } else {
      setCheckOnlyOnlinePooja(false);
    }

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
        title={`${t("Product")} ${t("Details")}`}
      />
      <Header IsActive_header_Or_not="chat_and_talk_header-" />
      {/* <BottomHeader /> */}
      <div className="container mb-5">

        {/* <HeaderMenu /> */}
        <PageHeader Mob_HeaderIsTrue={'not_show_mob_header1'} name={{ firstname: t("Product"), lastname: t("Details") }} />
        {showPopUp ? (
          <Popup
            isSuccess={responce.isSuccess}
            msg={responce.msg}
            button={button}
            closePopUp={closePopUp}
            Isicon={true}
          />
        ) : null}
        {enableLoader ? null : <Loading />}

        {showVocherPopup && <VocherCodePopup products={addToCartList} totalAmount={totalAmount} updateCartWithVoucher={updateCart} closeVocherPopup={closeVocherPopup} showPopUpFunc={showPopUpFunc} />}

        {!checkOnlyOnlinePooja ?
          <div className="row page-body">
            <div className="col p-0 pad-ryt-0">
              <div className="col-sm-7 col-md-7 col-lg-7 float-left text-left pad-0 mobAddCart">
                <div className="col-sm-12 col-md-12 col-lg-12 float-left text-left pad-0 cart-border billing">
                  <form onSubmit={handleSubmit}>
                    <p>{t('Billing_Address')}</p>
                    <input type="hidden" value={addressId} />
                    <div className="col-sm-12 col-md-12 col-lg-12 pad-0">
                      <div className="col-sm-6 col-md-6 col-lg-6 float-left pad-0">
                        <p className="form-head">{t('Name')}</p>
                        <input
                          placeholder={t('Name')}
                          className="w-98"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="col-sm-6 col-md-6 col-lg-6 float-left pad-0">
                        <p className="form-head">{t('Phone_No.')}</p>
                        {/* <input
                        placeholder="Phone Number*"
                        className="w-98"
                      ></input> */}
                        <input
                          disabled
                          placeholder={t('Phone_No.')}
                          className="w-98"
                          value={phoneNumber.slice(2, 12)}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-12 pad-0">
                      <div className="col-sm-6 col-md-6 col-lg-6 float-left pad-0">
                        <p className="form-head">{t('Alternate_Mobile_Number')}</p>
                        {/* <input
                        placeholder="+91 Alternate Phone Number*"
                        className="w-98"
                      ></input> */}
                        <input
                          placeholder={"+91" + t('Alternate_Mobile_Number')}
                          className="w-98"
                          value={alternatePhoneNumber}
                          onChange={(e) =>
                            setAlternatePhoneNumber(e.target.value)
                          }
                        />
                      </div>
                      <div className="col-sm-6 col-md-6 col-lg-6 float-left pad-0">
                        <p className="form-head">{t('Locality')}</p>
                        {/* <input
                        placeholder="Phone Number*"
                        className="w-98"
                      ></input> */}
                        <input
                          placeholder=""
                          className="w-98"
                          value={locality}
                          onChange={(e) => setLocality(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-12 pad-0">
                      <div className="col-sm-12 col-md-12 col-lg-12 float-left pad-0">
                        <p className="form-head">
                          {t('Flat_Apartment')}
                        </p>
                        {/* <textarea
                        placeholder="Address"
                        className="w-100"
                      ></textarea> */}
                        <textarea
                          placeholder={t('Address')}
                          className="w-100"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-12 pad-0">
                      <div className="col-sm-12 col-md-12 col-lg-12 float-left pad-0">
                        <p className="form-head">{t('Landmark')}</p>
                        {/* <input placeholder="Landmark" className="w-100"></input> */}
                        <input
                          placeholder={t('Landmark')}
                          className="w-100"
                          value={landmark}
                          onChange={(e) => setLandmark(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-12 pad-0">
                      <div className="col-sm-3 col-md-3 col-lg-3 float-left pad-0">
                        <p className="form-head">{t('City')}*</p>
                        {/* <input placeholder="City" className="w-85"></input> */}
                        <input
                          placeholder={t('City')}
                          className="w-85"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                      <div className="col-sm-3 col-md-3 col-lg-3 float-left pad-0">
                        <p className="form-head">{t('Country')}*</p>
                        {/* <input placeholder="Country" className="w-85"></input> */}
                        <input
                          placeholder={t('Country')}
                          className="w-85"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        />
                      </div>
                      <div className="col-sm-3 col-md-3 col-lg-3 float-left pad-0">
                        <p className="form-head">{t('Pin_Code')}</p>
                        {/* <input placeholder="Pincode" className="w-85"></input> */}
                        <input
                          placeholder={t('Pin_Code')}
                          className="w-85"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                        />
                      </div>
                      <div className="col-sm-3 col-md-3 col-lg-3 float-left pad-0">
                        <p className="form-head">{t('State_Province')}</p>
                        {/* <input
                        placeholder="State/Province"
                        className="w-85"
                      ></input> */}
                        <input
                          placeholder={t('State_Province')}
                          className="w-85"
                          value={stateProvince}
                          onChange={(e) => setStateProvince(e.target.value)}
                        />
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <button
                        type="submit"
                        className="btn proceed-checkout"
                        data-toggle="modal"
                        data-target="#exampleModalCenter"
                        style={{ marginTop: "15px" }}
                      >
                        {t('Save')}
                      </button>
                    </div>
                  </form>
                </div>


                <div className="r-l">
                  {userAddressList.map((item, index) => (
                    <div className="col-sm-8 col-md-8 col-lg-8 float-left text-left pad-0 cart-border recently">
                      <div className="">
                        <div className="col-sm-12 col-md-12 col-lg-12 padd-0">
                          <div className="col-sm-6 col-md-6 col-lg-6 float-left padd-0 used">
                            {t('Most_recently_used')}
                          </div>
                          <div className="col-sm-6 col-md-6 col-lg-6 float-left padd-0 tx-align-ryt">
                            <div class="form-check form-check-inline">
                              {/* <input className="form-check-input" type="radio" name="useraddress" id={"add" + item.addressId} value={"add" + item.addressId} onClick={() => setOrderAddress({
                              "addressLine1": item.addressLine1,
                              "addressLine2": item.addressLine2,
                              "city": item.city,
                              "country": item.country,
                              "deliveryMobileNo": item.mobile,
                              "deliveryName": item.userName,
                              "houseNo": item.houseNo,
                              "pinCode": item.pinCode,
                              "state": item.state
                            }
                            )} /> */}
                              <img
                                id={"imgcheck" + item.addressId}
                                src={recent}
                                style={{ display: "none" }}
                                alt="img"
                              ></img>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-12 padd-0">
                          <p className="namee">{item.userName}</p>
                          <p className="address">
                            {item.userName +
                              " " +
                              item.houseNo +
                              " " +
                              item.addressLine1 +
                              " " +
                              item.addressLine2 +
                              " " +
                              item.city +
                              " " +
                              " " +
                              item.state +
                              " " +
                              item.pinCode}
                          </p>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-12 padd-0 delivery">
                          <button
                            onClick={() =>
                              selectOrderAddress(
                                {
                                  addressLine1: item.addressLine1,
                                  addressLine2: item.addressLine2,
                                  city: item.city,
                                  country: item.country,
                                  deliveryMobileNo: item.mobile,
                                  deliveryName: item.userName,
                                  houseNo: item.houseNo,
                                  pinCode: item.pinCode,
                                  state: item.state,
                                },
                                "imgcheck" + item.addressId
                              )
                            }
                          >
                            {t('Delivery to this address')}
                          </button>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-12 padd-0 delivery">
                          <div className="col-sm-6 col-md-6 col-lg-6 float-left padd-0">
                            <button
                              className="edit w-95"
                              onClick={() =>
                                editAddress({
                                  addressId: item.addressId,
                                  addressLine1: item.addressLine1,
                                  addressLine2: item.addressLine2,
                                  city: item.city,
                                  country: item.country,
                                  deliveryMobileNo: item.mobile,
                                  deliveryName: item.userName,
                                  houseNo: item.houseNo,
                                  pinCode: item.pinCode,
                                  state: item.state,
                                })
                              }
                            >
                              {t('Edit')}
                            </button>
                          </div>
                          <div className="col-sm-6 col-md-6 col-lg-6 float-right padd-0 tx-align-ryt">
                            <button
                              className="edit w-95"
                              onClick={() =>
                                deleteAddress({
                                  addressId: item.addressId,
                                })
                              }
                              data-toggle="modal"
                              data-target="#exampleModalCenter"
                            >
                              {t('Delete')}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-sm-5 col-md-5 col-lg-5 float-left text-left pad-left mobCart">
                {/* <div className="col-sm-12 col-md-12 col-lg-12 voucher cart-border voucher-div">
                <span>
                  <img src={voucher}></img>
                </span>
                <p>APPLY VOUCHER CODE</p>
                <span className="float-right">
                  <img src={gray}></img>
                </span>
              </div> */}


                <div className="col-sm-12 col-md-12 col-lg-12 cart-border padd-0">
                  <div className="col-sm-12 col-md-12 col-lg-12 order-div padd-0 yoc">
                    {t("YOUR_ORDER_CHECK")}
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-12 padd-0 results">
                    <div className="col-sm-4 col-md-4 col-lg-4 padd-0 float-left product">
                      {t('Product')}
                    </div>
                    <div className="col-sm-8 col-md-8 col-lg-8 padd-0 float-left showing tx-align-ryt">
                      {t('Showing_Result')} {addToCartList.length} of{" "}
                      {addToCartList.length}
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-12 padd-0 excess">
                    {addToCartList && addToCartList.length > 0 ?
                      <>
                        {addToCartList.map((item, index) => (
                          <div className="CartItem">
                            <div className="cartImg cart1">
                              <img src={item.imageUrl} className="a-img" alt="img"></img>
                            </div>
                            <div className="CartInfo cart1">
                              <p className="cart-item ">
                                {item.redeemMode}
                              </p>
                              <p className="cart-value">
                                {localStorage["currency"] ? localStorage["currency"] : '₹'}{item.discountedRedeemPoint ? item.discountedRedeemPoint : item.redeemPoint}
                              </p>
                            </div>
                            <div className="cartQty cart1">
                              <span className="q-1">{t('Qty')}</span>
                              <span className="q-2"
                                onClick={() => handleRemove(item.redeemId, "sub", item.goodsNameKey)}
                              >
                                -
                              </span>
                              <span className="q-3" id={item.redeemId}>
                                {item.redeemUnit ? item.redeemUnit : 0}
                              </span>
                              <span
                                className="q-4"
                                onClick={() => handleRemove(item.redeemId, "add", item.goodsNameKey)}
                              >
                                +
                              </span>
                            </div>
                            <div className="cartDelet cart1">
                              <img src={bin}
                                className="bin-img"
                                alt="delete"
                                onClick={() =>
                                  handleRemoveAll(item.redeemId, item.redeemUnit, item.goodsNameKey)
                                }>
                              </img>
                            </div>
                          </div>
                        ))}
                      </>
                      :

                      <div className="col">
                        <p style={{ textAlign: "center", marginTop: "50px" }}>{t('No_item_cart')}</p>
                      </div>
                    }
                  </div>
                  <div
                    className="col-sm-12 col-md-12 col-lg-12 padd-0"
                    style={{ overflow: "hidden", marginTop: "10px" }}
                  >
                    <div className="col-sm-12 col-md-12 col-lg-12">
                      <div className="col-sm-6 col-md-6 col-lg-6 padd-0 float-left tx-align-left data">
                        {t('Subtotal')}
                      </div>
                      <div className="col-sm-6 col-md-6 col-lg-6 padd-0 float-left tx-align-ryt value">
                        {localStorage["currency"] ? localStorage["currency"] : '₹'}{" "}
                        {subTotal}
                      </div>
                    </div>
                    {totalDiscount ?
                      <div className="col-sm-12 col-md-12 col-lg-12">
                        <div className="col-sm-6 col-md-6 col-lg-6 padd-0 float-left tx-align-left data">
                          {t('Discount')}
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6 padd-0 float-left tx-align-ryt value">
                          -{localStorage["currency"] ? localStorage["currency"] : '₹'}{" "}
                          {totalDiscount}
                        </div>
                      </div>
                      : ""}

                    {/* <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="col-sm-6 col-md-6 col-lg-6 padd-0 float-left tx-align-left data">
                      TAX
                      </div>
                    <div className="col-sm-6 col-md-6 col-lg-6 padd-0 float-left tx-align-ryt value">
                      &#8377; {taxAmount}
                    </div>
                  </div> */}
                    <div className="col-sm-12 col-md-12 col-lg-12">
                      <div className="col-sm-6 col-md-6 col-lg-6 padd-0 float-left tx-align-left data">
                        {t('Shipping')}
                      </div>
                      <div className="col-sm-6 col-md-6 col-lg-6 padd-0 float-left tx-align-ryt value">
                        {localStorage["currency"] ? localStorage["currency"] : '₹'} {shippingAmount}
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-12">
                      <div className="col-sm-6 col-md-6 col-lg-6 padd-0 float-left tx-align-left data">
                        {t('Order_Total')}
                      </div>
                      <div className="col-sm-6 col-md-6 col-lg-6 padd-0 float-left tx-align-ryt value">
                        {localStorage["currency"] ? localStorage["currency"] : '₹'}{" "}
                        {subTotal - totalDiscount > 0 ? subTotal - totalDiscount : 0}
                      </div>
                    </div>
                    {voucherCode ?
                      <div className="offer-divvMall">

                        <div>

                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={removeVocher}


                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div>
                          <span style={{ float: "left" }}>
                            <img src={percentOrange} alt="%"></img>
                          </span>
                          <p className="voucherCode mrg0">{voucherCode}</p>
                          <p className="vocherText mrg0 ml36">
                            {localStorage["currency"] ? localStorage["currency"] : '₹'}{totalDiscount} {t('promocode_applied_for_this_transaction')}
                          </p>
                        </div>
                      </div>
                      :
                      <div
                        className="voucher-applymall clickptr"
                        onClick={() => setShowVocherPopup(true)}
                      >
                        <span style={{ float: "left" }}>
                          <img src={voucher} alt="voucher"></img>
                        </span>
                        <span style={{ float: "left", marginLeft: "20px" }}>
                          {t('Apply_Voucher_Code')}
                        </span>
                        <span style={{ float: "right" }}>
                          <img src={gray} alt="img" ></img>
                        </span>
                      </div>
                    }

                    <div className="col-sm-12 col-md-12 col-lg-12 pc-div">
                      <button
                        className={addToCartList && addToCartList.length > 0 ? "proceed-checkout" : "disabled-proceed-checkout"}
                        onClick={proceedToCheckout}
                        disabled={addToCartList && addToCartList.length > 0 ? false : true}
                        // data-toggle="modal"
                        // data-target="#exampleModalCenter"
                        style={{ marginBottom: "23px" }}
                      >
                        {t('Proceed_to_Checkout')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> :
          <>
            <div className="cart-border_container">
              <div className="cart_heading yoc">
                <span>{t("YOUR_ORDER_CHECK")}</span>
              </div>
              <div className="cart_heading1 d-flex align-items-center justify-content-between pd-10">
                <strong>{t('Product')}</strong>
                <strong>{t('Showing_Result')} {addToCartList.length} of {""}
                  {addToCartList.length}</strong>
              </div>
              <div className="cart_item_container">
                {addToCartList && addToCartList.length > 0 ? <>
                  {addToCartList.map((item, index) => (
                    <div className="cart_item_card">
                      <div className="cart_item_details d-flex justify-content-between">
                        <div className="cart_item_image">
                          <img src={item.imageUrl} alt="img" width="100%" />
                        </div>
                        <div className="cart_item_title text-left">
                          <p className="cart-item ">
                            {item.redeemMode}
                          </p>
                          <caption>{localStorage["currency"] ? localStorage["currency"] : '₹'}{item.discountedRedeemPoint ? item.discountedRedeemPoint : item.redeemPoint}</caption>
                        </div>
                        <div className="cart_item_action d-flex align-items-center">
                          <div className="cartQty cart1">
                            <span className="q-1">{t('Qty')}</span>
                            <span className="q-2"
                              onClick={() => handleRemove(item.redeemId, "sub", item.goodsNameKey)}
                            >
                              -
                            </span>
                            <span className="q-3" id={item.redeemId}>
                              {item.redeemUnit ? item.redeemUnit : 0}
                            </span>
                            <span
                              className="q-4"
                              onClick={() => handleRemove(item.redeemId, "add", item.goodsNameKey)}
                            >
                              +
                            </span>
                          </div>
                          <div className="cartDelet cart1">
                            <img src={bin}
                            alt="delete"
                              className="bin-img"
                              onClick={() =>
                                handleRemoveAll(item.redeemId, item.redeemUnit, item.goodsNameKey)
                              }>
                            </img>
                          </div>

                        </div>
                      </div>


                    </div>

                  ))}</> : <div className="cart_item_container d-flex align-items-center justify-content-center">
                  <p>{t('No_item_cart')}</p>
                </div>}
              </div>
              <div className="paymet_details">
                <div className="payment_count ">
                  <strong> {t('Subtotal')} : </strong>
                  {localStorage["currency"] ? localStorage["currency"] : '₹'}{" "}
                  {subTotal}
                </div>
                <div className="payment_count">
                  <strong> {t('Discount')} : </strong>
                  -{localStorage["currency"] ? localStorage["currency"] : '₹'}{" "}
                  {totalDiscount}
                </div>
                <div className="payment_count">
                  <strong> {t('Shipping')} : </strong>
                  -{localStorage["currency"] ? localStorage["currency"] : '₹'}{" "}
                  {shippingAmount}
                </div>
                <div className="payment_count">
                  <strong> {t('Order_Total')} </strong>
                  {localStorage["currency"] ? localStorage["currency"] : '₹'}{" "}
                  {subTotal - totalDiscount > 0 ? subTotal - totalDiscount : 0}
                </div>
              </div>

              <div className="voucherCode_container d-flex justify-content-center">
                {voucherCode ? <>


                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={removeVocher}


                  >
                    <span aria-hidden="true">&times;</span>
                  </button>

                  <div>
                    <span><img src={percentOrange} alt="%"  /></span>
                    <p className="voucherCode mrg0">{voucherCode}</p>
                    <p className="vocherText mrg0 ml36">
                      {localStorage["currency"] ? localStorage["currency"] : '₹'}{totalDiscount} {t('promocode_applied_for_this_transaction')}
                    </p>
                  </div>
                </>
                  :
                  <div className="voucher-applymall d-flex justify-content-between"
                    onClick={() => setShowVocherPopup(true)}
                  >
                    <div className="voucher_icon">
                      <img src={voucher} alt="voucher"></img>
                    </div>
                    <div className="Apply_Voucher_Code">
                      {t('Apply_Voucher_Code')}
                    </div>
                    <div className="voucher_icon1">
                      <img src={gray} alt="img"></img>
                    </div>
                  </div>
                }
              </div>
              <div className="proccedBtn_cont d-flex justify-content-center">
                <button
                  className={addToCartList && addToCartList.length > 0 ? "proceed-checkout" : "disabled-proceed-checkout"}
                  onClick={(event) => proceedToCheckout(event)}
                  disabled={addToCartList && addToCartList.length > 0 ? false : true}
                  // data-toggle="modal"
                  // data-target="#exampleModalCenter"
                  style={{ width: "315px", marginBottom: "23px" }}
                >
                  {t('Proceed_to_Checkout')}
                </button>
              </div>

            </div>


            {/* <div className="col-sm-12 col-md-12 col-lg-12 cart-border-min padd-0">
              <div className="col-sm-12 col-md-12 col-lg-12 order-div padd-0 yoc">
                {t("YOUR_ORDER_CHECK")}
              </div>
              <div className="col-sm-12 col-md-12 col-lg-12 padd-0 results">
                <div className="col-sm-4 col-md-4 col-lg-4 padd-0 float-left product">
                  {t('Product')}
                </div>
                <div className="col-sm-8 col-md-8 col-lg-8 padd-0 float-left showing tx-align-ryt">
                  {t('Showing_Result')} {addToCartList.length} of{""}
                  {addToCartList.length}
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-12 padd-0 excess">
                {addToCartList && addToCartList.length > 0 ?
                  <>
                    {addToCartList.map((item, index) => (
                      <div className="CartItem">
                        <div className="cartImg cart1">
                          <img src={item.imageUrl} className="a-img"></img>
                        </div>
                        <div className="CartInfo cart1">
                          <p className="cart-item ">
                            {item.redeemMode}
                          </p>
                          <p className="cart-value">
                            {localStorage["currency"] ? localStorage["currency"] : '₹'}{item.discountedRedeemPoint ? item.discountedRedeemPoint : item.redeemPoint}
                          </p>
                        </div>
                        <div className="cartQty cart1">
                          <span className="q-1">{t('Qty')}</span>
                          <span className="q-2"
                            onClick={() => handleRemove(item.redeemId, "sub", item.goodsNameKey)}
                          >
                            -
                          </span>
                          <span className="q-3" id={item.redeemId}>
                            {item.redeemUnit ? item.redeemUnit : 0}
                          </span>
                          <span
                            className="q-4"
                            onClick={() => handleRemove(item.redeemId, "add", item.goodsNameKey)}
                          >
                            +
                          </span>
                        </div>
                        <div className="cartDelet cart1">
                          <img src={bin}
                            className="bin-img"
                            onClick={() =>
                              handleRemoveAll(item.redeemId, item.redeemUnit, item.goodsNameKey)
                            }>
                          </img>
                        </div>
                      </div>
                    ))}
                  </>




                  // <table class="table table-order">
                  //   <tbody>
                  //     {addToCartList.map((item, index) => (
                  //       <tr>
                  //         <td>
                  //           <img src={item.imageUrl} className="a-img"></img>
                  //         </td>
                  //         <td>
                  //           <p className="cart-item ">{item.redeemMode}</p>
                  //           <p className="cart-value">₹{item.discountedRedeemPoint?item.discountedRedeemPoint:item.redeemPoint}</p>
                  //         </td>
                  //         <td
                  //           className="float-left padd-0 tx-align-lft"
                  //           style={{ marginTop: "5px" }}
                  //         >
                  //           <span className="q-1">Qty</span>
                  //           <span
                  //             className="q-2"
                  //             onClick={() => handleRemove(item.redeemId, "sub")}
                  //           >
                  //             -
                  //           </span>
                  //           <span className="q-3" id={item.redeemId}>
                  //             {item.redeemUnit ? item.redeemUnit : 0}
                  //           </span>
                  //           <span
                  //             className="q-4"
                  //             onClick={() => handleRemove(item.redeemId, "add")}
                  //           >
                  //             +
                  //           </span>
                  //         </td>
                  //         <td
                  //           className="float-left tx-align-lft"
                  //           style={{
                  //             position: "relative",
                  //             left: "30px",
                  //             cursor: "pointer",
                  //           }}
                  //         >
                  //           <img
                  //             src={bin}
                  //             className="bin-img"
                  //             onClick={() =>
                  //               handleRemoveAll(item.redeemId, item.redeemUnit)
                  //             }
                  //           ></img>
                  //         </td>
                  //       </tr>
                  //     ))}
                  //   </tbody>
                  // </table>

                  :
                  <div className="col">
                    <p style={{ textAlign: "center", marginTop: "50px" }}>{t('No_item_cart')}</p>
                  </div>
                }
              </div>
              <div
                className="col-sm-12 col-md-12 col-lg-12 padd-0"
                style={{ overflow: "hidden", marginTop: "10px" }}
              >
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <div className="col-sm-6 col-md-6 col-lg-6 padd-0 float-left tx-align-left data">
                    {t('Subtotal')}
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-6 padd-0 float-left tx-align-ryt value">
                    {localStorage["currency"] ? localStorage["currency"] : '₹'}{" "}
                    {subTotal}
                  </div>
                </div>
                {totalDiscount ?
                  <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="col-sm-6 col-md-6 col-lg-6 padd-0 float-left tx-align-left data">
                      {t('Discount')}
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-6 padd-0 float-left tx-align-ryt value">
                      -{localStorage["currency"] ? localStorage["currency"] : '₹'}{" "}
                      {totalDiscount}
                    </div>
                  </div>
                  : ""}

                {/* <div className="col-sm-12 col-md-12 col-lg-12">
            <div className="col-sm-6 col-md-6 col-lg-6 padd-0 float-left tx-align-left data">
              TAX
              </div>
            <div className="col-sm-6 col-md-6 col-lg-6 padd-0 float-left tx-align-ryt value">
              &#8377; {taxAmount}
            </div>
          </div> 
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <div className="col-sm-6 col-md-6 col-lg-6 padd-0 float-left tx-align-left data">
                    {t('Shipping')}
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-6 padd-0 float-left tx-align-ryt value">
                    {localStorage["currency"] ? localStorage["currency"] : '₹'} {shippingAmount}
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <div className="col-sm-6 col-md-6 col-lg-6 padd-0 float-left tx-align-left data">
                    {t('Order_Total')}
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-6 padd-0 float-left tx-align-ryt value">
                    {localStorage["currency"] ? localStorage["currency"] : '₹'}{" "}
                    {subTotal - totalDiscount > 0 ? subTotal - totalDiscount : 0}
                  </div>
                </div>
                {voucherCode ?
                  <div className="offer-divvMall">

                    <div>

                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={removeVocher}


                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div>
                      <span style={{ float: "left" }}>
                        <img src={percentOrange}></img>
                      </span>
                      <p className="voucherCode mrg0">{voucherCode}</p>
                      <p className="vocherText mrg0 ml36">
                        {localStorage["currency"] ? localStorage["currency"] : '₹'}{totalDiscount} {t('promocode_applied_for_this_transaction')}
                      </p>
                    </div>
                  </div>
                  :
                  <div
                    className="voucher-applymall clickptr"
                    onClick={() => setShowVocherPopup(true)}
                  >
                    <span style={{ float: "left" }}>
                      <img src={voucher}></img>
                    </span>
                    <span style={{ float: "left", marginLeft: "20px" }}>
                      {t('Apply_Voucher_Code')}
                    </span>
                    <span style={{ float: "right" }}>
                      <img src={gray}></img>
                    </span>
                  </div>
                }

                <div className="col-sm-12 col-md-12 col-lg-12 pc-div">
                  <button
                    className={addToCartList && addToCartList.length > 0 ? "proceed-checkout" : "disabled-proceed-checkout"}
                    onClick={(event) => proceedToCheckout(event)}
                    disabled={addToCartList && addToCartList.length > 0 ? false : true}
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                    style={{ width: "315px", marginBottom: "23px" }}
                  >
                    {t('Proceed_to_Checkout')}
                  </button>
                </div>
              </div>
            </div> */}
          </>

        }
      </div>
      <Footer history={props} />
      {/* <Popup1 msg={responce} /> */}
    </>
  );
};

export default withRouter(CartOrder);
