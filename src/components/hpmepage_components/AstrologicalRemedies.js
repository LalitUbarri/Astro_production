import React from 'react';
import image1 from '../../images/New-images/image1.png'
import image2 from '../../images/New-images/image2.png'
import image3 from '../../images/New-images/image3.png'
import image4 from '../../images/New-images/image4.png'
import image5 from '../../images/New-images/image5.png'
import {useHistory} from 'react-router-dom'
import { FRONTEND_NAME } from '../../configuration/constants';


export default function AstrologicalRemedies(){
    const history = useHistory();
    return <>
        <div className='AstrologicalRemedies_container'>
            <div className='AstrologicalRemedies_head'>
                <p className="daily-horoscope-header">
                    <span className="horoscope">{('Astrological remedies to get rid of ')}</span>
                    <span className="daily">{(' your problems')} </span>
                </p>
            </div>

            <div className='AstrologicalRemedies_body'>
                <div className='AstrologicalRemedies_card' onClick={() => history.push(FRONTEND_NAME + '/astrologyStore')}>
                    <div className="AstrologicalRemedies_card_img">
                        <img src={image4} alt='Surya Yantra' width={'100%'} />
                     </div>
                     <div className='AstrologicalRemedies_card_details'>
                        <h5> <strong>Surya Yantra </strong></h5>
                        <p>Surya yantra man kee shaanti ko badhaata hai varishthon,adhikaariyon aur sarakaar ka paksh pradaan karata hai. </p>

                        <button className='btn bytbn'> Buy Now </button>
                     </div>
                </div>

                <div className='AstrologicalRemedies_card'onClick={() => history.push(FRONTEND_NAME + '/astromall')}>
                    <div className="AstrologicalRemedies_card_img">
                        <img src={image5} alt='Charan Paduka' width={'100%'} />
                     </div>
                     <div className='AstrologicalRemedies_card_details'>
                        <h5> <strong>Charan Paduka </strong></h5>
                        <p>Charan paduka ko apne puja isthal mein isthapit kare or Bhagwaan ka dhayaan karke </p>

                        <button className='btn bytbn'> Buy Now </button>
                     </div>
                </div>

                <div className='AstrologicalRemedies_card' onClick={() => history.push(FRONTEND_NAME + '/astromall')}>
                    <div className="AstrologicalRemedies_card_img">
                        <img src={image4} alt='Charan Paduka' width={'100%'} />
                     </div>
                     <div className='AstrologicalRemedies_card_details'>
                        <h5> <strong>Rudrakash Mala </strong></h5>
                        <p>Rudrakh mala ke dwara aap mantro ka jaap kare. </p>

                        <button className='btn bytbn'> Buy Now </button>
                     </div>
                </div>

                <div className='AstrologicalRemedies_card'onClick={() => history.push(FRONTEND_NAME + '/astromall')}>
                    <div className="AstrologicalRemedies_card_img">
                        <img src={image3} alt='Charan Paduka' width={'100%'} />
                     </div>
                     <div className='AstrologicalRemedies_card_details'>
                        <h5> <strong>Pramid </strong></h5>
                        <p>Pramid ka mool roop se har prakar ke vastu dosho ko dur karne ke liye kiya jata hai, aap isse apne ghar mein istemal kare. </p>

                        <button className='btn bytbn'> Buy Now </button>
                     </div>
                </div>

                <div className='AstrologicalRemedies_card' onClick={() => history.push(FRONTEND_NAME + '/astromall')}>
                    <div className="AstrologicalRemedies_card_img">
                        <img src={image2} alt='Charan Paduka' width={'100%'} />
                     </div>
                     <div className='AstrologicalRemedies_card_details'>
                        <h5> <strong>Sankh </strong></h5>
                        <p>Pooja ke baad iska use kre or ghar se negativity  door kre. </p>

                        <button className='btn bytbn'> Buy Now </button>
                     </div>
                </div>

                <div className='AstrologicalRemedies_card' onClick={() => history.push(FRONTEND_NAME + '/astromall')}>
                    <div className="AstrologicalRemedies_card_img">
                        <img src={image1} alt='Charan Paduka' width={'100%'} />
                     </div>
                     <div className='AstrologicalRemedies_card_details'>
                        <h5> <strong>Gugal </strong></h5>
                        <p>Iska istemal aap nagetive vibes ko dur karne ke liye kare or positive energy ka sanchar kare. </p>

                        <button className='btn bytbn'> Buy Now </button>
                     </div>
                </div>
            </div>
        </div>
    </>
}