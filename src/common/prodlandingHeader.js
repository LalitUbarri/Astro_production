import React from 'react'
import Logo from '../images/newImages/WhatsApp-Image-2021-08-02-a.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import '../styles/productlanding.css';
import { FRONTEND_NAME } from '../configuration/constants';

export default function header(props) {
    return (
        <div className="header_container1">
            <div className="header_inner_container1 d-flex align-items-center justify-content-center pd-10">
                <div className="header_logo">
                    <a href={FRONTEND_NAME + props.url}>
                        <img src={Logo} alt="logo" width="100px"  />
                    </a>
                </div>
                {/* <div className="header_menu1">
                    <ul className="nav_menu1 d-flex">
                        {/* <li> HOME </li>
                        <li> SHOP </li> 
                    </ul>
                </div> */}
                {/* <div className="header_cart1">
                    {
                        props.cartlength ? <div className="cart_icon_container">
                            <FontAwesomeIcon icon={faCartShopping} />
                            <span className="cart_Item_counter">{0}</span>
                        </div> : null
                    }


                </div> */}
            </div>
        </div>
    )
}
