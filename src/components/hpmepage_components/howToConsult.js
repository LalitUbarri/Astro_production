import React from 'react';
import user from '../../images/pro.png';
import signUp from '../../images/New-images/signup.png';
import Talk4 from '../../images/New-images/talk4.png';
import wallet from '../../images/New-images/wellat.png';
import rating from '../../images/New-images/rating.png';
import { MyImage } from '../../common/lazy_loadimg';
// var images = {
//     alt: item.title,
//     height: '',
//     src: item.image,
//     width: '100%',
//     caption: '',
//     onclick: ''
//   }
export default function HowToConsult(props){
    return <>
        <div className='howtoconsult_container'>
            {props.Istrue ? <div className='howtoconsult_head'>
                <p className="daily-horoscope-header">
                    <span className="horoscope">{('How to Consult ')}</span>
                    <span className="daily">{('Our Astrologer')} </span>
                </p>
                <p> At astroking, we provide the best Vastu tips for your happier and more beautiful dream house or apartment. A person can <br /> learn Vastu Shastra from our top-notch Vastu Industry expert. </p>
            </div> :null }
            

            <div className='howtoconsult_body mt-5'>
                <div className='howtoconsult_card'>
                    <div className='howtoconsult_Avatar'>
                        {MyImage({alt:'Sign Up',src:signUp ,width: '50px',})}
                        {/* <img src={signUp} alt='Sign Up' width={'50px'} /> */}
                    </div>
                    <div className='howtoconsult_details text-center'>
                        <h5> Sign Up </h5>
                        <p> With Astroking</p>
                    </div>
                </div>

                <div className='howtoconsult_card'>
                    <div className='howtoconsult_Avatar'>
                    {MyImage({alt:'Put money in your Astro tell wallet ',src:wallet ,width: '50px',})}
                        {/* <img src={wallet} alt='Sign Up' width={'50px'} /> */}
                    </div>
                    <div className='howtoconsult_details'>
                        <h5> Put money in your</h5>
                        <p> Astroking wallet </p>
                    </div>
                </div>

                <div className='howtoconsult_card'>
                    <div className='howtoconsult_Avatar'>
                    {MyImage({alt:'Click on to Call and Chat',src:Talk4 ,width: '50px',})}
                        {/* <img src={Talk4} alt='Sign Up' width={'50px'} /> */}
                    </div>
                    <div className='howtoconsult_details'>
                        <h5> Click on to Call</h5>
                        <p> and Chat </p>
                    </div>
                </div>

                <div className='howtoconsult_card'>
                    <div className='howtoconsult_Avatar'>
                        {MyImage({alt:'Rate & Review after consultation',src:rating ,width: '50px',})}
                        {/* <img src={rating} alt='Sign Up' width={'60px'} /> */}
                    </div>
                    <div className='howtoconsult_details'>
                        <h5> Rate & Review  </h5>
                        <p> after consultation </p>
                    </div>
                </div>
            </div>

        </div>
    </>
}