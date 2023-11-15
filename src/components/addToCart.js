import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Header from "../common/Header2";
// import HeaderMenu from "../common/HeaderMenu";
import PageHeader from "../common/PageHeader";
import SideMenu from "../common/SideMenu";
import Footer from "../common/Footer";
// import previous from "../images/previous.svg";
import comment from "../images/comment.svg";
// import added from "../images/added.png";
// import store from "../images/store.png";

import * as Constant from "../configuration/constants";
import { postApi } from "../configuration/apis";
import { getCommonHeaders } from "../configuration/commonFunctions";
import * as ErrorConstant from "../configuration/errorConstants";
import { FRONTEND_NAME } from "../configuration/constants";
import $ from "jquery";

const AddToCart = (props) => {
  const [redemptionItem, setRedemptionItem] = useState(
    sessionStorage["productcatalogItem"]
  );
  const [redemptionList, setRedemptionList] = useState([]);
  const [addToCartList, setAddToCart] = useState(
    JSON.parse(sessionStorage.getItem("addToCartList"))
  );
  const [totalAmount, setTotalAmount] = useState(
    addToCartList.reduce(
      (total, currentValue) =>
        (total = total + currentValue.redeemPoint * currentValue.redeemUnit),
      0
    )
  );

  useEffect(() => {
    getRedemption();
  }, []);
  const addToCartProduct = (cartItem) => {
    var id = cartItem.redeemId;
    var quantity = parseInt(document.getElementById(id).innerHTML);
    cartItem.redeemUnit = quantity;
    const newList = addToCartList.concat(cartItem);
    setAddToCart(newList);
    sessionStorage.setItem("addToCartList", JSON.stringify(newList));
    setTotalAmount(
      newList.reduce(
        (total, currentValue) =>
          (total = total + currentValue.redeemPoint * currentValue.redeemUnit),
        0
      )
    );
  };

  const buyNow = (cartItem) => {
    var id = cartItem.redeemId;
    var quantity = parseInt(document.getElementById(id).innerHTML);
    cartItem.redeemUnit = quantity;
    const newList = addToCartList.concat(cartItem);
    setAddToCart(newList);
    sessionStorage.setItem("addToCartList", JSON.stringify(newList));
    props.history.push(FRONTEND_NAME + "/cartOrder");
  };
  const cartOrder = () => {
    props.history.push(FRONTEND_NAME + "/cartOrder");
  };
  const setProductQuantity = (id, tran) => {
    var quantity = parseInt(document.getElementById(id).innerHTML);
    if (tran == "add") {
      quantity += 1;
      $("#" + id).html(quantity);
    } else if (tran == "sub") {
      quantity -= 1;
      if (quantity == 0) quantity = 1;
      $("#" + id).html(quantity);
    } else {
      $("#" + id).html(quantity);
    }
  };
  const getRedemption = () => {
    //////debugger;
    console.log("inside getProductcatalog method");
    var url = Constant.ASTRO_URL + Constant.GET_REDEMPTION;
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
          console.log("data ", data.data);
          try {
            setRedemptionList(data.data);
          } catch (error) {
            console.log("exception occured");
            //    this.toggleShowMsg("Something went wrong");
            this.setState({ enableLoader: false });
          }
        } else {
          console.log(
            "Error code from getProductcatalog API : ",
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
      });
  };

  return (
    <>
      <Header />
      <div className="container">

        {/* <HeaderMenu /> */}
        <PageHeader
          name={{ firstname: "ONLINE", lastname: "ASTROLOGY STORE" }}
        />
        <div className="row page-body">
          <div className="col side-menu">
            <SideMenu />
          </div>
          <div className="col padd-0" style={{ marginLeft: "10px" }}>
            <div className="col-sm-12 col-md-12 col-lg-12 padd-0 added-div">
              <div className="col-sm-7 col-md-7 col-lg-7 padd-0 tx-align-lft float-left">
                <img src={comment} className="cmt-img" alt="img"></img>
                <img
                  src={addToCartList[0].redeemImage}
                  className="add-img"
                  alt="img"
                ></img>
                <p className="item-added">
                  Cart subtotal ({addToCartList.length} item):{" "}
                  <span>&#8377;{totalAmount}</span>
                </p>
              </div>
              <div
                className="col-sm-5 col-md-5 col-lg-5 padd-0 float-left tx-align-ryt"
                style={{ marginTop: "15px" }}
              >
                <button className="cart-selected" onClick={() => cartOrder()}>
                  Cart
                </button>
                <button
                  className="proceed-selected"
                  onClick={() => cartOrder()}
                >
                  Proceed to buy ({addToCartList.length} item)
                </button>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12 padd-0 mb-btm similar-prod">
              Similar Product
            </div>
            <div className="store-list">
              {redemptionList.map((item, index) => (
                <div className="store-list-item">
                  <div className="col-sm-9 col-md-9 col-lg-9 float-left padd-0">
                    <div
                      className="col-sm-2 col-md-2 col-lg-2 float-left padd-0 tx-align-lft"
                      style={{ width: "fit-content" }}
                    >
                      <img src={item.goodsImage} className="store-img" alt="img"></img>
                    </div>
                    <div className="col-sm-10 col-md-10 col-lg-10 float-left" style={{ paddingLeft: '30px' }}>
                      <p className="item-head">{item.goodsName}</p>
                      <p className="item-desc">{item.goodsDescription}</p>
                    </div>
                  </div>
                  <div className="col-sm-3 col-md-3 col-lg-3 float-left padd-0">
                    <div className="col-sm-12 col-md-12 col-lg-12 float-left padd-0">
                      <p className="col-sm-4 col-md-4 col-lg-4 float-left padd-0 tx-align-lft strike">
                        &#8377; {item.goodsPrice}
                      </p>
                      <p className="col-sm-8 col-md-8 col-lg-8 float-left padd-0 tx-align-ryt amount">
                        &#8377; {item.goodsPrice} / piece
                      </p>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-12 float-left padd-0 tx-align-lft">
                      <span className="q-1">Qty</span>
                      <span
                        className="q-2"
                        onClick={() => setProductQuantity(item.goodsId, "sub")}
                      >
                        -
                      </span>
                      <span className="q-3" id={item.goodsId}>
                        {item.goodsQuantity}
                      </span>
                      <span
                        className="q-4"
                        onClick={() => setProductQuantity(item.goodsId, "add")}
                      >
                        +
                      </span>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-12 float-left padd-0 mg-19">
                      <div className="col-sm-7 col-md-7 col-lg-7 float-left padd-0 w-112">
                        <button
                          className="cart"
                          onClick={() =>
                            addToCartProduct({
                              redeemCategory: redemptionItem,
                              redeemId: item.goodsId,
                              redeemMode: item.goodsName,
                              redeemParentCategory: "whiteGoods",
                              redeemPoint: item.goodsPrice,
                              redeemUnit: item.goodsQuantity,
                              redeemValue: item.goodsPoints,
                              redeemImage: item.goodsImage,
                            })
                          }
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="col-sm-5 col-md-5 col-lg-5 float-left padd-0 w-112">
                        <button
                          className="buy"
                          onClick={() =>
                            buyNow({
                              redeemCategory: redemptionItem,
                              redeemId: item.goodsId,
                              redeemMode: item.goodsName,
                              redeemParentCategory: "whiteGoods",
                              redeemPoint: item.goodsPrice,
                              redeemUnit: item.goodsQuantity,
                              redeemValue: item.goodsPoints,
                              redeemImage: item.goodsImage,
                            })
                          }
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer history={props} />
    </>
  );
};

export default withRouter(AddToCart);
