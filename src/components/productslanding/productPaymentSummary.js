import React, { useState } from 'react'
// import KundalisImage from '../../images/kundalis.webp'
import Footer from '../../common/Footer';
import ProductLandingHeader from '../../common/prodlandingHeader';
import { useLocation } from 'react-router-dom';
import * as constent from '../../configuration/constants';
import axios from 'axios';
import apiUrls from '../../configuration/apiUrls';


export default function ProductPaymentSummary() {

    const location = useLocation();
    const [product, setproducts] = useState(location.state !== undefined ? location.state.product : null);

    const [useDetails, setUserDetails] = useState(location.state !== undefined ? location.state.state : {
        firstname: '', lastname: '', pob: '', state: '', country: '', pincode: '', msisdn: ''
    })
    const { firstname, lastname, pob, state, country, pincode, msisdn } = useDetails;
    if (location.state === undefined) {
        window.location.href = constent.FRONTEND_NAME + '/home';
    }


    const discount_price = 10;

    const [total, setTotal] = useState(0);

    React.useEffect(() => {
        if (discount_price > 0) {
            var gst = 18;
            var GST_Total;
            var item_price;
            item_price = product[0].discount_price;
            GST_Total = (product[0].discount_price * gst / 100);

            var tt = (parseInt(item_price) + parseFloat(GST_Total)).toFixed(2);
            setTotal(tt);
        }

    })

    function percentage(disc_amount, total) {
        return (((disc_amount - total) / disc_amount) * 100).toFixed();
    }


    console.log(location.state !== undefined ? location.state.state : null);

    const razorPayHandle = (txid, price) => {
        // alert(txid)
        var url = apiUrls.RazorPayOffer;
        url = url.replace('<txnId>', txid)
        url = url.replace('<price>', price)

        axios.post(url).then(res => {
            console.log(res);
            window.location.href = url;
        }).catch(err => {
            console.log(err);
        })
    }


    return (

        <>
            <ProductLandingHeader />
            {Object.keys(product).length !== 0 ?
                <div className="productSummary_container_fluid">
                    <div className="summary_container d-flex justify-content-between mt-5 mb-5">
                        <div className="product_summary d-flex">
                            <div className="productSummary_inner">
                                {product.map(item => {
                                    return (
                                        <div className="d-flex justify-content-between prod_border">
                                            <div className="product_image">
                                                <img src={item.goods_image} alt="products image" width="100px" />
                                            </div>
                                            <div className="product_details">
                                                <h5 className="text-left"> {item.goods_name}</h5>
                                                <div className="price_conta d-flex align-items-center mt-4">
                                                    <div className="price_after_desc mr-3">
                                                        <h4 className="f-bold">{'₹' + item.discount_price} </h4>
                                                    </div>
                                                    <div className="price_desc d-flex align-items-center">
                                                        <p>M.R.P. : </p>&nbsp;&nbsp; <span className="amount1">{'₹' + item.goods_price}</span>
                                                    </div>
                                                    <div className="price_percentage">
                                                        <span>({percentage(product[0].goods_price, product[0].discount_price,)}% off)</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}

                                <div className="address_container text-left mb-5">
                                    <div className="d-flex mt-5 address_inner">
                                        <input type="radio" id="html" name="fav_language" checked value="HTML" /> &nbsp;&nbsp;&nbsp;
                                        <label for="html" className="add_label">
                                            <strong style={{ textTransform: 'capitalize' }}>{firstname + " " + lastname}</strong>
                                            <span> &nbsp; {pob + "," + state + "," + country + "," + pincode + "," + "Phone number:" + "+" + msisdn} </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="product_payment_info">
                            <div className="payment_info text-left">
                                <div className="product_head">
                                    <h4> Order Summary </h4>
                                </div>

                                <div className="product_pay_summary">
                                    <div className="sub_total_cont">
                                        <strong> Items : </strong>
                                        <strong> ₹{product[0].discount_price}</strong>
                                    </div>

                                    <div className="desc_price">
                                        <strong> You saved : </strong>
                                        <strong> ₹{(product[0].goods_price * percentage(product[0].goods_price, product[0].discount_price,) / 100).toFixed()}</strong>
                                    </div>
                                    <div className="shipping_price">
                                        <strong> GST (18%) : </strong>
                                        <strong> + ₹{(product[0].discount_price * 18 / 100).toFixed(2)}</strong>
                                    </div>
                                    <div className="shipping_price">
                                        <strong> Total : </strong>
                                        <strong> ₹{total}</strong>
                                    </div>
                                    <div className="shipping_price total_price">
                                        <strong> Order Total :</strong>
                                        <strong> ₹{total}</strong>
                                    </div>
                                </div>
                                <div className="mt-5 mb-3 text-center">
                                    <button className="fil-btn-otp"
                                        onClick={() => razorPayHandle(
                                            location.state !== undefined ?
                                                location.state.state.transactionId :
                                                null, total)}
                                    > Check Out </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div> : <div className="mt-5 d-flex align-items-center justify-content-center">
                    <h3> Loading...</h3>
                </div>
            }
            <Footer />
        </>
    )
}
