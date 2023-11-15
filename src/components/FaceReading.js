import React, { useState } from 'react'
import Footer from '../common/Footer';
import Header2 from '../common/Header2'
import PageBanner from '../common/pageBanner'
import { getCommonHeaders, SEO } from "../configuration/commonFunctions";
import Banner from '../images/upcomingEvents/FaceReading.png';
import Jupitor from '../images/upcomingEvents/jupiter.png';
import Meteor from '../images/upcomingEvents/meteor.png'
import PageBanner3 from '../common/pageBanner3';
import PlanetryCard from '../components/planetryCard';
import Mangal1 from '../images/upcomingEvents/faceImg.png';
import FaceReadingCard from '../common/FaceReadngCard';
import ForHead from '../images/upcomingEvents/forhead.png';
import Eye from '../images/upcomingEvents/Eye.png'
import Eyebrows from '../images/upcomingEvents/Eyebrow.png';
import Nose from '../images/upcomingEvents/Nose.png';
import Mouth from '../images/upcomingEvents/Mouth.png';
import Chin from '../images/upcomingEvents/Chin.png';
import Chat_Talk_Header from "../common/Chat&Talk_Header";

export default function FaceReading(props) {
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
            <PageBanner3 Bannerclass={"aboutImgouter" + " " + "bgonecard"} Banner={Banner} title={'Face Reading'} broadcom={'Home/ Face Reading'} style={{ background: '#ff9c05' }} />
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
                title={"Face Reading"} 
                />
            <div className='marriage_contanier mt-5'>
           
                <div className='container'>
                <div className='upcoming-fest-container text-left mt-5'>
                        <h3>Face <span>Reading</span></h3>
                        <p> Face reading, also known as physiognomy, is an ancient practice that claims to be able to predict a person's personality, health, and future based on the shape and features of their face. While there is no scientific evidence to support these claims, face reading has been practiced for centuries and continues to be popular in many cultures around the world.
                                </p>  </div>
                    <div className='row'>
                        <div className='col-md-7 '>
                            <div className='upcoming-fest-container text-left'>
                              
                                <p>
                                Astrology is a vast and complex subject that has been studied for centuries. One of the many branches of astrology is face reading, which is the practice of analyzing a person's face to determine their personality, health, and future.</p>
                                <p>There are many different schools of thought on face reading, but most practitioners agree that certain facial features are associated with certain personality traits and life events. For example, a large forehead is said to indicate intelligence, while a small chin is said to indicate a lack of determination. Similarly, a wide smile is said to indicate happiness, while a frown is said to indicate sadness.
                                    <br/>Of course, no single facial feature can tell you everything about a person's personality or future. However, by taking into account the overall shape and structure of the face, as well as the individual features, face readers believe that they can gain a valuable insight into a person's character and destiny.</p>
                            </div>

                        </div>
                        <div className='col-md-5  mangaldoshimg'>
                            <img src={Mangal1} alt='Face Reading' />
                        </div>
                    </div>

                    <div className='upcoming-fest-container text-left mt-5'>
                        <h3>DHere is a Brief Overview of some of The key <span>Features that Face Readers focus on: </span></h3>
    <div className='row facereadingCard'>
<div className='col-md-6'>
<FaceReadingCard Imgs={ForHead} Title={"Forehead"} description={"The forehead is said to represent intelligence, wisdom, and longevity. A large forehead is considered a sign of intelligence, while a small forehead is seen as a sign of a lack of intelligence. A high forehead is associated with wisdom, while a low forehead is associated with a lack of wisdom. A wrinkle-free forehead is said to indicate longevity."}/>
</div>
<div className='col-md-6'>
<FaceReadingCard Imgs={Eye} Title={"Eye"} description={"The eyes are said to represent the mind, emotions, and soul. Large, bright eyes are seen as a sign of intelligence and good health. Small, dark eyes are associated with a lack of intelligence and poor health. Wide-set eyes are seen as a sign of creativity and imagination, while close-set eyes are associated with a lack of creativity and imagination."}/>
</div>
<div className='col-md-6'>
<FaceReadingCard Imgs={Eyebrows} Title={"Eyebrows"} description={"The eyebrows are said to represent protection, strength, and willpower. Thick, well-defined eyebrows are seen as a sign of strength and willpower. Thin, sparse eyebrows are associated with a lack of strength and willpower. Unibrows are seen as a sign of stubbornness and determination."}/>
</div>
<div className='col-md-6'>
<FaceReadingCard Imgs={Nose} Title={"Nose"} description={"The nose is said to represent the sense of smell, as well as the person's personality and character. A large nose is seen as a sign of good luck and prosperity. A small nose is associated with a lack of luck and prosperity. A straight nose is seen as a sign of honesty and integrity. A crooked nose is associated with dishonesty and deception."}/>
</div>
<div className='col-md-6'>
<FaceReadingCard Imgs={Mouth} Title={"Mouth"} description={"The mouth is said to represent the person's communication skills, as well as their ability to express their emotions. A large mouth is seen as a sign of good communication skills. A small mouth is associated with a lack of communication skills. Full lips are seen as a sign of sensuality and passion. Thin lips are associated with a lack of sensuality and passion."}/>
</div>
<div className='col-md-6'>
<FaceReadingCard Imgs={Chin} Title={"Chin"} description={"The chin is said to represent the person's determination, willpower, and self-confidence. A strong chin is seen as a sign of determination and strength. A weak chin is associated with a lack of determination and strength. A square chin is seen as a sign of stubbornness and determination. A round chin is associated with a lack of stubbornness and determination."}/>
</div>
    </div>


    <p>Face reading is a complex and subjective practice, and there is no scientific evidence to support its claims. However, many people believe that face reading can be a valuable tool for understanding themselves and others.</p>
                          </div>

                       
                    <div className='upcoming-fest-container text-left mt-5'>
                        <h3>Here are Some of The <span>Significance of Face Reading in Life</span></h3>
                        <p>Self-awareness: Face reading can help people to gain a better understanding of themselves. By understanding their facial features, people can learn more about their personalities, strengths, weaknesses, and potential.<br/>Relationships: Face reading can also help people to improve their relationships. By understanding the facial features of their partners, friends, and family members, people can better understand their needs, wants, and motivations.</p>
                          </div>

                

                </div>

            </div>
            <Footer history={props} />
        </>
    )
}

