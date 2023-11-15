import React, { useEffect, useState } from 'react';
// import KundalisImage from '../images/kundalis.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../styles/productlanding.css';
import Footer from '../common/Footer';
import ProductLandingHeader from '../common/prodlandingHeader';
import { FRONTEND_NAME } from '../configuration/constants';
import PhonePopup from './productslanding/Phone_popup';
import { getCommonHeaders1 } from "../configuration/commonFunctions";
import { postApi } from "../configuration/apis";
import apiUrls from '../configuration/apiUrls';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import ReactHtmlParser from 'react-html-parser';
import { useHistory, useParams } from 'react-router-dom'
import $ from 'jquery'

// const CryptoJS = require("crypto-js");

const alphabet = "JABCDEFGHI";

export default function Prodductlandingpage(props) {
    const history = useHistory();
    const param = useParams();
    const [banner, setBanner] = React.useState([]);
    const [products, setproducts] = useState([])
    const [mainProducts, setMainProducts] = React.useState([]);
    // const [disc, SetDisc] = useState('');
    console.log(param);


    const navigateurl = (msisdn) => {
        props.history.push(FRONTEND_NAME + '/customerdetails', { msisdn: msisdn, product: mainProducts });
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    const getBannerhandle = () => {
        const header = getCommonHeaders1();
        postApi(apiUrls.newUserGetofferBanner, header)
            .then(response => response.data)
            .then(res => {
                // console.log(res.data);
                setBanner(res.data);
            }).catch(err => {
                console.log(err);
            })
    }

    const getProducts = () => {
        const header = getCommonHeaders1();
        postApi(apiUrls.OfferProduct, header)
            .then(response => response.data)
            .then(res => {
                console.log(res.data);
                setproducts(res.data);
            }).catch(err => {
                console.log(err);
            })
    }

    // function numberToString(num) {
    //     // Split out each digit of the number:
    //     var dd = num + 13524534 + Math.random();

    //     const digits = Math.floor(dd).toString().split("").map(Number);

    //     // Then create a new string using the alphabet:
    //     return digits.reduce((str, digit) => {
    //         return str + alphabet[digit];
    //     }, "");
    // }

    const getProductsById = (title) => {
        // localStorage['ProductsById'] = id;

        var str = title;
        var trimmed = $.trim(str)
        var slug = trimmed.replace(/[^a-z0-9-]/gi, '-').
            replace(/-+/g, '-').
            replace(/^-|-$/g, '').
            replace(/\s+/g, '-').
            replace('-of-', '-').replace('-Complete-guide-with-', '-');
        var check = slug.toLowerCase();

        history.push(FRONTEND_NAME + '/personalized-kundali/' + check)
        window.scrollTo({
            top: 200,
            behavior: 'smooth'
        })
        // const header = getCommonHeaders1();
        // var url = apiUrls.OfferProductId;
        // url = url.replace('<id>', id);
        // postApi(url, header)
        //     .then(response => response.data)
        //     .then(res => {
        //         // console.log(res.data);
        //         setMainProducts(res.data);
        //         
        //         // SetDisc(res.data.goods_description);
        //     }).catch(err => {
        //         console.log(err);
        //     })
    }


    function percentage(disc_amount, total) {
        return (((disc_amount - total) / disc_amount) * 100).toFixed();
    }

    useEffect(() => {
        getBannerhandle();
        getProducts();
        getProductsById(typeof param.id !== 'undefined' ? param.id : 'Shodashvargiye Kundali(षोडशवर्गिए कुंडली): Complete guide with 20 Years of Prediction');
    }, []);


    let StarStyle = {
        color: "#ff9c05",
        disabled: true,
    };

    return (
        <>
            <ProductLandingHeader url={'/home'} />
            <PhonePopup
                navigateurl={navigateurl}
                mainProducts={mainProducts}
            />
            {
                Object.keys(banner).length !== 0 ? <div className="home_cantainer1 d-flex justify-content-center">
                    <div className="home_inner_container1 mb-2 mt-3">
                        <div className="home_contens">
                            <OwlCarousel
                                className='owl-theme'
                                nav={false}
                                loop={false}
                                items={1}
                                autoplay={false}
                                dots={false}
                            >
                                {banner.map(data => (
                                    <div className='item carousel_items' key={data.bannerId}>
                                        <img src={data.bannerURL} alt={data.bannerName} width='100%' />
                                    </div>
                                ))}
                            </OwlCarousel>
                        </div>
                        {products.map(item => {
                            var title = item.goods_name;
                            var str = title;
                            var trimmed = $.trim(str)
                            var slug = trimmed.replace(/[^a-z0-9-]/gi, '-').
                                replace(/-+/g, '-').
                                replace(/^-|-$/g, '').
                                replace(/\s+/g, '-').
                                replace('-of-', '-').replace('-Complete-guide-with-', '-');
                            var check = slug.toLowerCase();

                            if (check === param.id) {
                                return (
                                    <div className="product_container mt-5" key={item.goods_id}>
                                        <div className="inner_product_container d-flex">
                                            <div className="product_image_container">
                                                <img src={item.goods_image} className="pd-25" alt={item.goods_name} width="100%" />
                                            </div>
                                            <div className="product_details_container text-left">
                                                <h3 className="prod_head mb-4">{item.goods_name}</h3>
                                                <FontAwesomeIcon icon={faStar} color={StarStyle.color} />
                                                <FontAwesomeIcon icon={faStar} color={StarStyle.color} />
                                                <FontAwesomeIcon icon={faStar} color={StarStyle.color} />
                                                <FontAwesomeIcon icon={faStar} color={StarStyle.color} />
                                                <FontAwesomeIcon icon={faStar} color={StarStyle.color} />

                                                <div className="price_conta d-flex align-items-center mt-4">
                                                    <div className="price_after_desc mr-3">
                                                        <h3 className="f-bold fs-30"> ₹{item.discount_price} </h3>
                                                    </div>
                                                    <div className="price_desc d-flex align-items-center">
                                                        <p>M.R.P. : </p>&nbsp;&nbsp; <span className="amount1">₹{item.goods_price}</span>
                                                    </div>
                                                    <div className="price_percentage">
                                                        <span>({percentage(item.goods_price, item.discount_price)}% off)</span>
                                                    </div>
                                                </div>
                                                <div className="prod_btn_group1 d-flex mt-5">
                                                    <div className="add_to_cart_btn_container">
                                                        <button onClick={() => {
                                                            window.$('#staticBackdrop').modal('show');
                                                        }}> Buy Now </button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="prod_desc_container mt-5 mb-5 text-left">
                                            <h3 className="f-bold"> Description </h3>
                                            <p> {ReactHtmlParser(item.goods_description)}</p>
                                        </div>
                                    </div>
                                )
                            }

                        })}


                        <section className="mt-5">
                            <div className="check_out text-left">
                                <h2> Similar Products </h2>
                            </div>
                            <div className={products.length !== 4 ? "list_of_kundalis d-flex mt-5 mb-5" : "list_of_kundalis d-flex mt-5 mb-5 justify-content-between"}>
                                {products.map(item => {
                                    var title = item.goods_name;
                                    title = title.replace(/\s+/g, '-');
                                    // console.log(products);
                                    if (title !== param.id) {
                                        return (
                                            <div className={param.id === title ? "d-none" : products.length !== 4 ? "item_of_kundalis mr-4" : "item_of_kundalis "} key={item.goods_id} onClick={() => getProductsById(item.goods_name)}>
                                                <div className="item_image_container">
                                                    <div className="kundalis_image">
                                                        <img src={item.goods_image} className="pd-25" alt="kundalis" width="100%" />
                                                        <span className="descount_tag">{percentage(item.goods_price, item.discount_price) + '%'}</span>
                                                    </div>
                                                    {/* <div className="item_kundalis_">
                                                        <div className="cart2">
                                                            <FontAwesomeIcon icon={faCartPlus} />
                                                        </div>
                                                        <div className="Wishlist">
                                                            <FontAwesomeIcon icon={faHeart} />
                                                        </div>
                                                        <div className="quick_view">
                                                            <FontAwesomeIcon icon={faEye} />
                                                        </div>
                                                    </div> */}
                                                </div>
                                                <div className="kundalis_details">
                                                    <h6> {item.goods_name} </h6>
                                                    <p> ₹{item.discount_price}  &nbsp; &nbsp;<span className="amount1"> ₹{item.goods_price} </span></p>
                                                </div>
                                            </div>
                                        )
                                    }

                                })}
                            </div>
                        </section>
                        {/* <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScVWddRS7T1KoEIDE06rSzks6hiCcnLkxPkBOXEgIUHS8hM9g/viewform?embedded=true" width="640" height="812" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe> */}
                    </div>
                </div> : <h3> Loading...</h3>
            }

            <Footer history={props} />
        </>
    );
}


