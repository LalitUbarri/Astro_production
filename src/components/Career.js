import React, { useState } from 'react'
import Footer from '../common/Footer';
import Header2 from '../common/Header2'
import PageBanner from '../common/pageBanner'
import { getCommonHeaders, SEO } from "../configuration/commonFunctions";
import Banner from '../images/readmorebanner.png'
import Chat_Talk_Header from "../common/Chat&Talk_Header";
export default function Career(props) {
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
                keywords="Career Astrology in india"
                title="The Leading Career Astrology in india - astroking"
                description="Discover your true career path with astroking, the leading provider of career astrology in India. Unlock your professional potential today!"
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
                title={"Career Astrology"} 
                />
            <PageBanner Banner={''} title={'Career Astrology'} />
            <div className='marriage_contanier'>
                <div className='container'>
                    <div className='marriage_headeing mt-5'>
                        <h2> Career Astrology: Discovering the Path to Success</h2>
                    </div>
                    <div className='marriage_details_contanier mt-5 text-justify'>
                        <p> In today's world, having a good career is crucial for survival and happiness. We all want a successful and fulfilling job, but it can be challenging to choose the right career path. Having a career of your choice is becoming increasing crucial to be successful and feel content with your growth in your life. While having a successful career is important it is also becoming equally difficult to choose the right career. This is where Career Astrology comes into picture. A learned astrologer can draw a career horoscope on the basis of the native’s birth data and analyse what career will suit him the best. Career astrology will be of great help here. By looking at your birth data, an astrologer can create a career horoscope and suggest the best profession for you.</p>

                        <p>By delving into astrology, you can uncover your innate strengths and unique talents. Through an exploration of planetary positions, you gain insight into your natural inclinations and abilities, gaining a glimpse into the areas where you possess exceptional potential. For instance, a prominent Mars placement might suggest a latent aptitude for leadership or an entrepreneurial drive. Furthermore, astrology holds the power to shed light on advantageous periods for career progression. Through the lens of transit astrology, which analyses the present planetary positions in relation to your birth chart, you receive valuable guidance on seizing opportune moments and making significant strides in your professional journey.</p>

                        <p> <strong>The significance of houses in career selection: </strong></p>

                        <p>Starting with the first house, often referred to as the Ascendant, it mirrors our personality and how we present ourselves to the world. Within its domain lie the clues to our natural talents and abilities, offering valuable guidance in pursuing fulfilling careers.</p>

                        <p>Transitioning to the second house, it governs our material possessions and financial stability. This house exerts influence over our career choices, as our desire for wealth and security plays a pivotal role.</p>

                        <p>Moving on to the third house, it governs communication and intellectual pursuits. Careers involving writing, teaching, or any field that necessitates effective communication skills often find themselves influenced by this house.</p>

                        <p>Furthermore, the fourth house signifies our home and family life. It casts an impact on careers associated with real estate, interior design, or nurturing professions such as counseling or caregiving.</p>


                        <p>Shifting gears to the fifth house, it governs creativity and self-expression. This house acts as a guiding force, directing individuals towards artistic careers like acting, painting, or music.</p>

                        <p>Transitioning to the sixth house, it governs work and service. Careers in healthcare, social work, or any field that involves aiding others are often influenced by this house.</p>

                        <p> The seventh house represents partnerships and relationships. It steers individuals towards careers in law, counseling, or any profession involving close collaboration with others.</p>



                        <p>Moving on to the eighth house, it governs transformation and shared resources. Careers in finance, psychology, or research can be influenced by this house.</p>

                        <p> Transitioning to the ninth house, it governs higher education, travel, and philosophy. Careers in academia, publishing, or international relations may find their roots in this house.</p>

                        <p>The tenth house oversees our public image and career ambitions. It unveils insights into our professional path, guiding us towards success in leadership roles or high-profile careers.</p>

                        <p> Finally, the eleventh house represents community and social networks. It has the power to influence careers in networking, social activism, or any field that thrives on collaboration and group dynamics. </p>

                        <p> <strong> How different planets are linked to specific professions:  </strong></p>
                        <p> The Sun is considered the King of the stars. It influences areas like name, fame, power, authority, management, engineering, medicine, and more. The Moon, known as the Queen of the stars, affects the mind and reasoning abilities. Careers associated with the Moon include administration, politics, agriculture, travel, and telecommunications.</p>

                        <p> Mars, referred to as the Army chief of the stars, governs stamina and abilities. It is linked to professions like the military, police force, information technology, engineering, and trades involving metals. Mercury, known as the prince of the stars, influences intelligence and decision-making. It is associated with banking, finance, education, writing, and communication.</p>

                        <p> Jupiter, considered the Teacher or Minister of the stars, rules education and marriage. It affects professions like teaching, banking, law, publishing, and advisory roles. Venus, the star of wealth, is linked to luxury, art, and love. It influences careers in cosmetics, music, trade, and entertainment.
                            Saturn, the Lord of justice, is associated with tradition, philosophy, and hard work. It is linked to professions like agriculture, philosophy, and physical labor.</p>

                        <p> Rahu indicates research, technology, and foreign trade. Ketu represents computers, mathematics, and spirituality. These are just a few examples, and astrology offers more insights into suitable career paths based on individual birth charts.</p>

                        <p> By understanding your birth chart and consulting a career horoscope, you can make better choices for your professional life. Astrology can guide you towards the right career, help you find the best timing for job opportunities, and offer strategies for success. It's like having a roadmap to navigate your career path and reach new heights.</p>

                        <p> In conclusion, Career Astrology provides valuable guidance in choosing the right profession. By analysing your birth data, astrologers can create a career horoscope and offer insights into the most suitable career options. It's important to remember that astrology is just one tool among many, and personal effort and passion also play significant roles in achieving career success.</p>
                    </div>
                </div>
            </div>
            <Footer history={props} />
        </>
    )
}
