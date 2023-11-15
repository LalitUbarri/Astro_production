import React, { useState } from 'react'
import Footer from '../common/Footer';
import Header2 from '../common/Header2'
import PageBanner from '../common/pageBanner'
import { getCommonHeaders, SEO } from "../configuration/commonFunctions";
import Banner from '../images/upcomingEvents/mask.png'
import cardimg from '../images/Ellipse 22.png';
import cardimg1 from '../images/Ellipse 25.png';
import cardimg2 from '../images/Ellipse 28.png';
import cardimg3 from '../images/Ellipse 24.png';
import PageBanner2 from '../common/pageBanner2';
import FestiveCarousel from '../common/FestiveCarousel';
import CardReading from '../images/upcomingEvents/Rectangle 84.png';
import LoveCard from '../images/upcomingEvents/Rectangle 84.png'
import LineImg from '../images/upcomingEvents/Rectangle 89.png'
import Chat_Talk_Header from "../common/Chat&Talk_Header";


export default function UpcomingFestivals(props) {
    const [state, setState] = useState({
        displaySignupPopUp: false,
        loginSelected: false,
        isHeaderOpen: false,
        countryCode: [],

    })

    const { displaySignupPopUp, loginSelected, countryCode } = state


    const openSignupPopup = () => {
        setState({
            displaySignupPopUp: true,
            loginSelected: false,
        });
    };

    const openLoginPopup = () => {
        setState({ displaySignupPopUp: true, loginSelected: true });
    };

    const changeIsHeaderOpen = (headerOpen) => {
        setState({
            isHeaderOpen: headerOpen
        })
    }
    return (
        <>
            <SEO
                keywords='Face Reading Astrology'
                title="Face Reading Astrology Insights | astroking"
                description="Unlock hidden insights with face reading astrology. Explore the power of astroking for accurate face analysis and predictions"
            />
            <Header2
                IsActive_header_Or_not="chat_and_talk_header-"
                openLoginPopup={openLoginPopup}
                openSignupPopup={openSignupPopup}
                isLogin={loginSelected}
                countryCode={countryCode}
                changeIsHeaderOpen={changeIsHeaderOpen}
            />
            <Chat_Talk_Header
            IsNavIconTrue={false}
            IsSearchTrue={false}
            IsFilterTrue={false}
            // editSearchTerm={this.editSearchTerm}
            // editSortTerm={this.editSortTerm}
            // IsMob_Side_Nave={this.IsMob_Side_Nave}
            propsData={props}
            CustomClass={true}
            IsTitleTrue={true}
            title={"Tarot Cards"} 
            />
            <div className='container'>
                <div className='mob_480'>
                <PageBanner2 Banner={Banner} title={'Tarot Cards'} broadcom={'Home/ Tarot Cards'} />
                </div>
           

<div className='marriage_contanier mt-5'>
    <div className='upcoming-fest-container text-left'>
        <h3>Tarot <span>Card</span></h3>
        <p>Tarot cards work on the mystical energy and generally represent the storybook of our life. It is more like a mirror to our soul and acts as an inner key to the path of wisdom and spirituality. Tarot cards reading is complex, deeper, and a unique combination of prowess and analytical ability. A set of 78 cards are there, which form two different decks— Major Arcana and Minor Arcana.</p>
        <p>The Major Arcana Cards generally represent spiritual and Karmic lessons. It represents a path of self-awareness and depicts different stages as one encounters the greater meaning and understanding of life. Moreover, the Major Arcana card reading also lets the person analyse things on a soul level. On the other hand, the Minor Arcana Cards depict the tribulations and trials that a person shall experience on a daily basis. Illustrating a deeper practical part of life lets the native resolve the current issues too. Usually, the Minor Arcana cards possess a temporary impact, but they are strong and highly expressed.
            Tarot cards have the ability and power to provide answers to questions regarding all the aspects of the lives of an individual. Be it past, present, or future, it acts as a perfect getaway to understand the purpose of the life you had, you are having, or what you may have.
        </p>
        <h3>What is a <span>Tarot Card Reading</span></h3>

        <p>Tarot reading is a powerful form of divination that use an ancient deck of cards to help you find answers to your questions about your love, relationships, career, wellness and more.</p>
    </div>

    <div className='upcoming-fest-container mt-5'>
        <h3>How tarot card reading can add <span>value to someone's life</span></h3>
        <p>Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.</p>
    </div>






    {/* <div className='marriage_headeing mt-5 mb-5'>
        <h3> The Importance of Shubh Muhurat: Meaning, <br /> Significance, and Determining Factors </h3>

        <p> In the vast tapestry of Indian culture and traditions, the concept of Shubh Muhurat holds a special place. Translated as "auspicious time" or "favorable moment," Shubh Muhurat plays a crucial role in various aspects of life, including weddings, inaugurations, and other significant events. This blog explores the meaning and significance of Shubh Muhurat, as well as the factors that determine its occurrence.
            Shubh Muhurat refers to a specific period or duration believed to be auspicious and propitious for commencing important activities or events. It is believed that starting a venture or performing a task during a Shubh Muhurat enhances the chances of success and prosperity while minimizing obstacles and negative influences.
        </p>
    </div>
    <div className='Shubh_contaner mt-5 mb-5'>
        <div className='muhurat_card'>
            <div className='muhurat_img'>
                <img src={cardimg} alt="Annanprashan Muhurat 2023" width={'200px'} />
            </div>
            <div className='muhurat_title'>
                <p> Annanprashan Muhurat 2023 </p>
            </div>
        </div>

        <div className='muhurat_card'>
            <div className='muhurat_img'>
                <img src={cardimg1} alt="Annanprashan Muhurat 2023" width={'200px'} />
            </div>
            <div className='muhurat_title'>
                <p> Marriage Muhurat 2023 </p>
            </div>
        </div>

        <div className='muhurat_card'>
            <div className='muhurat_img'>
                <img src={cardimg2} alt="Annanprashan Muhurat 2023" width={'200px'} />
            </div>
            <div className='muhurat_title'>
                <p> Griha Pravesh Muhurat 2023</p>
            </div>
        </div>

        <div className='muhurat_card'>
            <div className='muhurat_img'>
                <img src={cardimg3} alt="Annanprashan Muhurat 2023" width={'200px'} />
            </div>
            <div className='muhurat_title'>
                <p> Car/Bike Muhurat 2023 </p>
            </div>
        </div>
    </div> */}
</div>

<FestiveCarousel Line={LineImg} festiveImg={CardReading} tittle={"Three Card Reading"} description={"Three Card Reading investigates and illuminates factors that improve your luck."} festiveImg1={LoveCard} tittle1={"Love Card Reading"} description1={"No matter how straightforward or complicated an issue in your romantic."} />

    <div className='upcoming-fest-container mt-5'>
        <h3>How To Read The <span>Tarot Cards?</span></h3>
        <p className='text-justify'>Together these two decks—Major and Minor Arcana, form a comprehensive and pictorial picture. It is vital to keep in mind that all the solutions we wish to know lie innately within these two tarot card decks. They depict strongly an individual, situation, or potential outcome. As there are no hidden motives or puzzles in the tarot cards reading, the power to discern their meaning lies within the person’s narrative and interpretation.
            Before any tarot cards reading, make sure to clear the deck by shuffling it properly. Also, this deliberate action must become a meditation for the tarot reader. You must feel and understand the physicality of the tarot cards in your hand. While doing so, you must visualise your question properly and clearly. If you are performing tarot card reading for someone else, you must utilise this reflective time to dig deeper into the roots of their circumstance and situation. This shall help you form particular queries about them.
            You can take as long as you need but remember to focus and meditate properly. Whenever you are good to go, divide the cards into three parts and reorder the pile facing down. Then, on a nice clean cloth, prepare the cards for the spread and pull cards to get the answer to the questions running through the head.</p>
        <p className='text-justify'>
            Though all the cards have their own classic association, the strongest source behind the right predictions is your intuition. Your immediate emotional reaction towards the card you drew makes all the rightful patterns and systems, allowing you to form a better narrative and understanding of the circumstances.
        </p>
    </div>

        <div className='upcoming-fest-container mt-5 mb-5'>
            <h3>Types of <span>Tarot Cards?</span></h3>
            <p>It consists of <strong>78 cards divided into two groups:</strong> the <strong>major arcana, which has 22 cards,</strong>  also known as trumps, and the <strong>minor arcana, which has 56 cards.</strong>  The cards of the major arcana have pictures representing various forces, characters, virtues, and vices.</p>
        </div>
            </div>
            
                <Footer history={props} />
        </>
    )
}

