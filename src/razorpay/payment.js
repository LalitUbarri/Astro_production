import React, { useEffect, useState } from 'react'
import axios from "axios"

import Loading from '../components/loader'

import Popup from "../components/popupChat"

import * as Constant from "../configuration/constants"

import { useTranslation } from "react-i18next";

const redirectRazorPay = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = 'https://checkout.razorpay.com/v1/checkout.js'
        document.body.appendChild(script)
        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
    })
    //script.onload = redirectToPayment
    //return
}



const Payment = (props) => {
    const [loading, setLoading] = useState(true)
    const [isSuccess, setIsSuccess] = useState(false)
    const [msg, setMsg] = useState("")
    const [isProgress, setIsProgress] = useState(false)
    const amount = props.location.state.amount ? props.location.state.amount : 0
    const amountWithoutTaxes = props.location.state.amountWithoutTaxes ? props.location.state.amountWithoutTaxes : 0
    const voucher = props.location.state.voucher_transaction_id ? props.location.state.voucher_transaction_id : null
    const currency = props.location.state.currency ? props.location.state.currency : "INR"
    const promocode = props.location.state.promocode ? props.location.state.promocode : "INR"
    const sign = currency === "INR" ? '₹' : '$'
    const email = localStorage["profileData"] && JSON.parse(localStorage["profileData"]).filter(a => a.fieldColumnName === "email_id").length > 0 ?
        JSON.parse(localStorage["profileData"]).filter(a => a.fieldColumnName === "email_id")[0].fieldValue :
        "";
    const [t] = useTranslation();


    useEffect(() => {
        redirectToPayment()
    }, [])

    console.log(props)
    console.log(email)

    const validateRecharge = (response) => {

        setLoading(true)

        console.log(response)

        const body = {
            "razorpay_payment_id": response.razorpay_payment_id,
            "razorpay_order_id": response.razorpay_order_id,
            "razorpay_signature": response.razorpay_signature
        }

        const razorPayURL = Constant.RAZORPAY_API_URL + "/ordervalidation"

        axios.post(razorPayURL, body)
            .then(respose => {

                if (respose.data.code === 2000 && respose.data.status === 'SUCCESS') {
                    console.log("Confirmed")
                    // setMsg(t("Thanks for recharging your wallet with") + " " + sign + " " + amountWithoutTaxes)
                    props.history.push(Constant.FRONTEND_NAME + "/thankyou", {
                        state: {
                            currency: currency,
                            amount: amountWithoutTaxes
                        }
                    })
                    setIsSuccess(true)
                }
                else if (respose.data.code === 2001 && respose.data.status === 'SUCCESS') {
                    setIsSuccess(true)
                    setMsg(t(respose.data.msg))
                }
                else if (respose.data.code === 2002 && respose.data.status === 'ERROR') {
                    setMsg(t(respose.data.msg))
                }
                else {
                    setMsg(t("Error while recharging your wallet"))
                    console.log("Error")
                }
                setIsProgress(true)
                setLoading(false)
            })
            .catch(error => {
                setIsProgress(true)
                console.log(error)
                setLoading(false)
            })
    }

    async function redirectToPayment() {
        setLoading(true)
        const result = await redirectRazorPay()

        if (result) {
            //setLoading(false)
            const createOrder = {
                "amount": amount.toString(),
                "currency": currency,
                "receipt": "Receipt Test",
                "mobile": localStorage['selectedCountryCode'] + localStorage['msisdn'],
                "voucherTransactionId": voucher,
                "amountWithoutTaxes": amountWithoutTaxes.toString(),
                "promocode": promocode,
                "channel":"WEB"
                // "channel":"JIO WEB"
            }

            const razorPayURL = Constant.RAZORPAY_API_URL + "/createorder"

            axios.post(
                //'http://localhost:8080/RazorPay/createorder',
                razorPayURL,
                createOrder
            ).then(data => data.data).then(data => {
                console.log(data);
                if (data.code === 2000 && data.status === "SUCCESS") {
                    const { amount, currency, id } = data.data
                    const options = {
                        "key": Constant.RAZORPAY_KEY,
                        "amount": amount,
                        "currency": currency,
                        "name": "Astroking",
                        "description": "Wallet Recharge",
                        "image": "https://astroking.com/static/media/AstroIcon.png",
                        "order_id": id,
                        
                        "handler": function (response) {
                            setLoading(true)
                            setTimeout(() => validateRecharge(response), 5000)
                        },
                        "prefill": {
                            "name": localStorage["profileData"]
                                ? JSON.parse(localStorage["profileData"]).find(
                                    (item) => item.fieldColumnName == "first_name"
                                ).fieldValue
                                : "",
                            "email": email,
                            "contact": "+" + localStorage['selectedCountryCode'] + localStorage['msisdn']
                        },
                        "theme": {
                            "color": "#FE5602"
                        },
                        "modal": {
                            "ondismiss": function () {
                                props.history.push(Constant.FRONTEND_NAME + "/recharge");
                            }
                        },
						"config": {
							display: {
							  blocks: {
								banks: {
								  name: 'Pay via UPI',
								  instruments: [
									{
									  method: 'upi',
									  flow: 'intent'
									}
								  ],
								},
							  },
							  sequence: ['block.banks'],
							  preferences: {
								show_default_blocks: true,
							  },
							},
						  },
                        //   "callback_url":`https://astroking.com/RPLink/callBackPayLink/?msisdn=${localStorage['msisdn']}`,
                        //   "redirect":true,
                    };

                    const razorPayWindow = new window.Razorpay(options);
                    razorPayWindow.open();

                    razorPayWindow.on('payment.failed', function (response) {
                        setIsSuccess(false)
                        props.history.push(Constant.FRONTEND_NAME + "/paymentfailed")
                        // setMsg(t("Payment failed, Please try after sometime."));
                        setIsProgress(true)
                    })
                }
                else {
                    setMsg(t("Error while payment initiation"));
                    setIsProgress(true)
                }

                setLoading(false)
            }).catch(error => {
                setMsg(t("Error while payment initiation"));
                setIsProgress(true)
                setLoading(false)
                console.log(error)
            })
        }
        else {
            setMsg(t("Error while payment initiation"));
            setIsProgress(true)
            setLoading(false)
        }
    }


    return (
        <>
            {loading ?
                <div className='wait-grid'>
                    {t("Please wait, Loading...")}
                    <Loading />
                </div>
                :
                <>
                    {isProgress &&
                        <Popup
                            msg={msg}
                            isSuccess={isSuccess}
                            closePopUp={() => {
                                props.history.push(Constant.FRONTEND_NAME + '/recharge')
                            }}
                        // type={'payment'}
                        />
                    }
                </>
            }
        </>
    )
}

export default Payment