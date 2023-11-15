import React from 'react';
// import user from '../../images/pro.png';
import { MyImage } from '../../common/lazy_loadimg';
import { ScrollTop, astrr_CatData } from '../../configuration/commonFunctions';
import {useHistory} from 'react-router-dom'
import { FRONTEND_NAME } from '../../configuration/constants';
import OwlCarousel from 'react-owl-carousel';


const Mobresponsive = {
    options:{
      loop: true,
      nav:false,
      dots:true,
      responsive:{
          0:{
              items:1,
              nav:false,
              dots: true,
          },
          600:{
              items:3,
              nav:false,
              dots: true,
          },
          1000:{
              items:4,
              nav:false,
              dots: true,
          }
      }
  }
};

export default function Our_Astrologer(props){
    const history = useHistory();
    return <>
        <div className='ourAstrologer_container mt-5'>
            <div className='our_astrologer_warrper'>
                {/* <div className='our_astrologer_head'>
                    <h3> Our <br /><span> Astrologer </span></h3>
                </div> */}
                <div className='our_astrologer_warrper_body'>
                {
                    props.astrolgerList.map(item => {
                        var images = {
                            alt: item.goodsName,
                            height: '',
                            src: item.goodsImage,
                            width: '100px',
                            caption: '',
                            onclick: ''
                          }
                          var cat = item.goodsShortDescription.substring(0,15);
                          cat = cat.replace(/\s/g, "-");
                        return <div className='our_astrologer_body' onClick={() => history.push(FRONTEND_NAME + '/talk/'+ cat)}>
                        <div className='our_astrologer_card'>
                            <div className='our_astrologer_card_head'>
                                <p> {item.goodsShortDescription.substring(0,25)} </p>
                            </div>
                            <div className='our_astrologer_card_body'>
                                <div className='our_astrologer_avatar'>
                                    {/* <img src={user} alt='our astrologer' width={'100px'} /> */}
                                    {MyImage(images)}
                                </div>
                                <div className='our_astrologer_details text-center'>
                                    <h5> {item.goodsName.substring(0, 20)} </h5>
                                    {/* <p> {item.goodsShortDescription} </p> */}
                                    <p>  {item.goodsLanguage.substring(0,13)} | Exp: {item.goodsAttribute} Years</p>
                                </div>
                                <div className='our_astrologer_btn'>
                                    <button className='btn consultbtn'> Consult Now </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    })
                }
                </div>
                
                
            </div>
            <div className='consult_astrologer_warrper'>
                <div className='our_astrologer_head'>
                    <h3 className='Consult_with'> Consult with <span className='Consult_with'> Astrologer </span> of Your choice</h3>
                    <p className='text-white'> astroking offers a safe way to explore life's possibilities with astrological insights. <br />Try us and save upto 100% on Rs 10/min astrological readings</p>
                </div>
                <div className='our_astrologer_head text-right'> <p className='text-white cursor-pointer'  onClick={() => history.push(FRONTEND_NAME + '/talk')}>View More </p> </div>
                
                <div className='our_astrologer_warrper_body1 mt-2'>
                    
                

                <OwlCarousel 
                    className='owl-theme Up_comingEvent_Nav1'
                    {...Mobresponsive.options}
                    >
                        {
                    astrr_CatData.map(item => {
                        var images = {
                            alt: item.title,
                            height: '',
                            src: item.image,
                            width: '100%',
                            caption: '',
                            onclick: ''
                          }
                        return <div className='our_astrologer_body1 our_astrologer_body' key={item.title} 
                        onClick={() =>{ ScrollTop(0);history.push(FRONTEND_NAME + item.url)}}>
                        <div className='our_astrologer_card'>
                            <div className='our_astrologer_card_body'>
                                <div className='our_astrologer_avatar1'>
                                    {/* <img src={user} alt='our astrologer' width={'100px'} /> */}
                                    {MyImage(images)}
                                </div>
                                <div className='our_astrologer_details1 text-center'>
                                    <h5> {item.title} </h5>
                                </div>
                                <div className='our_astrologer_btn'>
                                    <button className='btn consultbtn' onClick={() => {
                                        history.push(FRONTEND_NAME + item.url)
                                        ScrollTop(0);
                                        }}> Consult Now </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    })
                }
                        
                </OwlCarousel>
                </div>
            </div>
        </div>
    </>
}