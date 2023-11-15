var url = Constant.ASTRO_URL + Constant.GET_ORDER_WHITE_GOODS;
const headers = getCommonHeaders();
// headers.accessToken = userProfile.accessToken;
//alert('oder..'+JSON.stringify(orderAddress));
//console.log('orderAddress..'+JSON.stringify(orderAddress))
//console.log('orderAddredd len'+JSON.stringify(orderAddress).length)
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
    setResponce({ ...responce, msg: t("Please Enter Address."), isSuccess: false });
    // setResponce({ msg: t("please add your full adderss.") });
  }
} else if (addToCart && addToCartList.length === 0) {
  setShowPopUp(true)
  setResponce({ msg: t("Cart cannot be empty."), isSuccess: false });
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