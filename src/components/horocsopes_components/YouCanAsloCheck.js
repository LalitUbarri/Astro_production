import React from 'react'; 
import Img1 from '../../images/New-images/Screenshot12.png'
import images2 from '../../images/New-images/image-14.png'

export default function Youcanalsocheck(){
    return <>
            <div className="youCanAslocheck_container">
                    <div className="youCanAslocheck_card">
                        <div className="youCanAslocheck_card_head">
                            <p className='text-white'><strong> You Can Also Check </strong></p>
                        </div>

                        <div className="youCanAslocheck_card_container">
                            <div className="youCanAslocheck_card_container_card">
                                <div className="youCanAslocheck_card_img">
                                    <img src={Img1} alt="Today ‘s Horoscope" width={'100px'} />
                                </div>
                                <div className="youCanAslocheck_card_details">
                                    <p> Today ‘s Horoscope</p>
                                </div>
                            </div>

                            <div className="youCanAslocheck_card_container_card">
                                <div className="youCanAslocheck_card_img">
                                    <img src={Img1} alt="Today ‘s Horoscope" width={'100px'} />
                                </div>
                                <div className="youCanAslocheck_card_details">
                                    <p> Yesterday’s Horoscope</p>
                                </div>
                            </div>

                            <div className="youCanAslocheck_card_container_card">
                                <div className="youCanAslocheck_card_img">
                                    <img src={Img1} alt="Today ‘s Horoscope" width={'100px'} />
                                </div>
                                <div className="youCanAslocheck_card_details">
                                    <p> Tomorrow’s Horoscope</p>
                                </div>
                            </div>

                            <div className="youCanAslocheck_card_container_card">
                                <div className="youCanAslocheck_card_img">
                                    <img src={Img1} alt="Today ‘s Horoscope" width={'100px'} />
                                </div>
                                <div className="youCanAslocheck_card_details">
                                    <p> Monthly ‘s Horoscope</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="youCanAslocheck_card youCanAslocheck_card_bg">
                        <img src={images2} alt="image" width={'100%'} />
                    </div>
                </div>
    </>
}