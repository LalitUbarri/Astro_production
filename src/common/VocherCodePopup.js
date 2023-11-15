import React,{useState} from 'react'
import apis from '../configuration/apis';
import { useTranslation } from "react-i18next";

export default function VocherCodePopup(props) {
    const [t]=useTranslation();
    const [vocherCode,setVoucherCode]=useState("");
    const [products]=useState(props.products?props.products:[])
    const [totalAmount]=useState(products.reduce(
        (prevValue, currentValue) =>
          prevValue + currentValue.redeemPoint,
        0
      ))
    const applyCode=()=>{
        if(!vocherCode)
        {
            props.closeVocherPopup();
            props.showPopUpFunc(t('Please_enter_voucher_code'),false);
            return;
        }
        var requstBody={
            products: products,
            totalRedeemPoints: totalAmount,
            promocode:vocherCode,
            productName:"Astro Mall"

        }
        apis
        .applyastromallpromo(requstBody)
        .then((response) => response.data)
        .then((data) => {
          console.log("resp data", data);
          if (data.code == "2000") {
            
              console.log("success" + data.data);
              let updatedCart= data.data;
              props.closeVocherPopup();
              props.showPopUpFunc("The voucher code has been succesfully applied.",true);
              props.updateCartWithVoucher(updatedCart.products,updatedCart.discountedTotalPoints,vocherCode,updatedCart.totalDiscount,updatedCart.voucher_transaction_id);
              
            
  
          
          } else {
            setVoucherCode("");
            props.closeVocherPopup();
            props.showPopUpFunc(data.msg,false);
            console.log(data.msg);
  
            //props.showPopUpFunc(data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return (
        <div
        class="modal popup1"
        style={{ display:"block",backgroundColor: "rgba(0,0,0,0.20)" }}
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content" style={{ height: "165px" }}>
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                {t('Voucher_Code')}
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={props.closeVocherPopup}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body v-apply">
              <input
                id="voucherCode"
                placeholder={t('Please_enter_voucher_code')}
                onChange={(e)=> setVoucherCode(e.target.value)}
                
              />
              <span onClick={applyCode} >{t('Apply')}</span>
            </div>
          </div>
        </div>
      </div>
    )
}
