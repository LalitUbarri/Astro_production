import React, { useEffect } from 'react';
import signUp from '../../images/New-images/Group-206.png';
import Talk4 from '../../images/New-images/Group-207.png';
import wallet from '../../images/New-images/Group-211.png';
import rating from '../../images/New-images/Group-208.png';
import $ from 'jquery';

export default function Counter(){

    useEffect(() => {
        $('.count').each(function () {
            $(this).prop('Counter',0).animate({
                Counter: $(this).text()
            }, {
                duration: 4000,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
    },[])
    return <>
        <div className='counter_container'>
        <div className='howtoconsult_body'>
                <div className='howtoconsult_card'>
                    <div className='howtoconsult_Avatar'>
                        <img src={signUp} alt='Sign Up' width={'100px'} />
                    </div>
                    <div className='howtoconsult_details'>
                        <h5 className='text-white'> <span className='count'> 150 </span> + </h5>
                        <p> Total Astrologers</p>
                    </div>
                </div>

                <div className='howtoconsult_card'>
                    <div className='howtoconsult_Avatar'>
                        <img src={Talk4} alt='Sign Up' width={'100px'} />
                    </div>
                    <div className='howtoconsult_details'>
                        <h5 className='text-white count'> 352967 </h5>
                        <p> Total Chats/ Call minutes  </p>
                    </div>
                </div>

                <div className='howtoconsult_card'>
                    <div className='howtoconsult_Avatar'>
                        <img src={rating} alt='Sign Up' width={'100px'} />
                    </div>
                    <div className='howtoconsult_details'>
                        <h5 className='text-white'> <span className='count'>4</span>.0+ </h5>
                        <p> Rating & Review </p>
                    </div>
                </div>

                <div className='howtoconsult_card'>
                    <div className='howtoconsult_Avatar'>
                        <img src={wallet} alt='Sign Up' width={'100px'} />
                    </div>
                    <div className='howtoconsult_details'>
                        <h5 className='text-white'> <span className='count'>70</span>K+  </h5>
                        <p> Million Total Customers  </p>
                    </div>
                </div>
            </div>
        </div>
    </>
}