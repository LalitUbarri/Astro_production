import React,{useState} from "react";
// import $ from 'jquery';
import "../styles/support.css";
import alertIcon from "../images/alert.svg";
import apis from "../configuration/apis";
import Popup from "../components/popup";
// import SupportImg from '../images/newImg/IT-Support.png';
// import SupportImg from '../images/newImg/support.jpg';
import SupportImg from '../images/newImg/162-1626512.png';
import swal from "sweetalert";
import { useTranslation } from "react-i18next";
import { getCommonHeaders } from "../configuration/commonFunctions";

const Support = (props) => {
    const [inputData, setInputData] = useState({
        name: '',
        email: '',
        number: '',
        query: '',
        button:'ok',
    });

    const { name, email, number,query,} = inputData;

    const [Msg, setMsg]= useState("");
    const [showPopup,setShowPopup]= useState(false);
    const [success, setSuccess]= useState(false);
    const [error, setError]= useState('');

    const [t]=useTranslation();

    const onChange = (e) => {
    const {name, value} = e.target;

        if(name === 'number'){
            if(value.length === 11){
                return false;
            }else{
                setInputData({
                    ...inputData,
                    [name]:value
                })
            }
        }else{
            setInputData({
                ...inputData,
                [name]:value
            })
        }
        
       
    };

    const closePopUp=()=>{
        setShowPopup(false)
        if(success){
            props.closeSupport();
        }
    };

    const showPopUp1 = (msg, modalTrue,isSuccess,error) => {
        setShowPopup(modalTrue);
        setMsg(msg)
        setSuccess(isSuccess)
        setError(error);
        
      }
    
    
    const submitSupportForm =(e)=>{
        e.preventDefault();
        const { name, email, number,query} = inputData;
        
        const isvalidEmail = String(email).match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        
        if(number.length < 10 || number.length > 10){
            // alert('kjshd')
            showPopUp1(t("valid_mobile_number"), true,false, "error");
            return;  
        }
        if(!isvalidEmail) {
            showPopUp1(t("valid_email_address."), true,false,"error");
            return;
        }
        let header = getCommonHeaders();
          apis
            .contactUs(inputData, header)
            .then((response) => response.data)
            .then((data) => {
              //debugger;
              
              console.log("support form response", data);
              if (data.code == "2000") {
                showPopUp1(data.msg, true, true,"success");
                setMsg(data.msg);
              } else {
                showPopUp1(data.msg, true, false,"error");
                setMsg(data.msg);
              }
            })
            .catch((error) => {
              console.log(error);
            });

    }

    return (
        <>
             {/* {showPopup && ( <Popup msg={"hello !..."} isSuccess={success} closePopUp={closePopUp} />)} */}
            {/* <!-- Modal --> */}

            {showPopup && (
        <Popup
            heading={''}
            msg={Msg}
            button={inputData.button}
            closePopUp={closePopUp}
            Isicon={true}
            IsiconType={error}
            // alert_panditMsg={IspanditBusy ? "pandit busy" : ''}
        />
      )}
            <div
                className="modal support support_modal"
                id="exampleModalCenter"
               // tabindex="-1"
               
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
               // aria-hidden="true"
               style={{display:"block"}}
            >
                {/* {showPopup && (<Popup msg={Msg} isSuccess={success} closePopUp={closePopUp} />)} */}
      
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">
                                {/* <img src={alertIcon} /> */}
                                {/* {t('Support')} */}
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={props.closeSupport}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-6 text-center">
                                        <img src={SupportImg} alt="support" width="70%" />
                                    </div>
                                    <div className="col-md-6">
                                        <form onSubmit={submitSupportForm}>
                                            <div className="form-group row">
                                                {/* <label for="Name" className="col-form-label">Name*</label> */}
                                                <input type="text" className="form-control" id="Name" placeholder={t('Name*')} name="name" value={name}  onChange={onChange} required/>
                                            </div>
                                            <div className="form-group row">
                                                {/* <label for="Mobile" className="col-form-label">Mobile Number*</label> */}
                                                <input type="number"  className="form-control" 
                                                    id="Mobile" name="number" 
                                                    value={number} minLength="10" 
                                                    maxLength="10" required="true" 
                                                    size="10" onChange={onChange} 
                                                    placeholder={t('Mobile_Number')+"*"} 
                                                    pattern="/^-?\d+\.?\d*$/"
                                                    />
                                                
                                            </div>
                                            <div className="form-group row">
                                                {/* <label for="Email" className="col-form-label">Email ID</label> */}
                                                <input type="email" className="form-control" id="Email" placeholder={t('Email_Id')+"*"} name="email" value={email} onChange={onChange} required />
                                            </div>
                                            <div className="form-group row">
                                                {/* <label for="Concern" className="col-form-label">Concern*</label> */}
                                                {/* <input type="text" /> */}
                                                <textarea className="form-control" id="Concern" placeholder={t('Concern')+"*"} name="query" value={query} onChange={onChange} required />
                                            </div>
                                            <div className="form-group row">
                                                {/* <label for="Concern" className="col col-form-label"></label> */}
                                                <button type="submit" className="btnSubmit">{t('Submit')}</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="row">
                                <div className="col-12">
                                    <a href="https://astrology.com/">https://astrology.com/</a>
                                </div>
                            </div> */}
                            
                        </div>
                        {/* <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-cancel btn-same"
                                data-dismiss="modal"
                            >
                                Cancel
              </button>
                            <button type="button" className="btn btn-recharge btn-same">
                                RECHARGE
              </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};
export default Support;
