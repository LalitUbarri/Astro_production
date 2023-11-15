import React, { useState } from 'react'
import Footer from '../common/Footer';
import Header2 from '../common/Header2'
import PageBanner from '../common/pageBanner'
import { getCommonHeaders, SEO } from "../configuration/commonFunctions";
import Banner from '../images/upcomingEvents/mangal.png';

import PageBanner3 from '../common/pageBanner3';
import Mangal1 from '../images/upcomingEvents/manglik1.png';
import Mangal2 from '../images/upcomingEvents/mangaldos2.png';
import Chat_Talk_Header from "../common/Chat&Talk_Header";

export default function Mangaldosh(props) {
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
                title={"Mangalik Dosh"}
            />
            <PageBanner3 Bannerclass={"aboutImgouter" + " " + "bgonecard"} Banner={Banner} title={'Mangal Dosh'} broadcom={'Home/ Mangal dosh'} style={{ background: '#ff9c05' }} />

            <div className='marriage_contanier mt-5'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-7 '>
                            <div className='upcoming-fest-container text-left'>
                                <h3>Understanding Manglik Dosha <span>and Navigating Its Effects</span></h3>
                                <p>
                                    Mangal Dosha, also known as Manglik Dosha or Kuja Dosha, is a concept deeply ingrained in Hindu astrology. It revolves around the belief that the planet Mars (Mangal) exerts a negative influence on an individual’s life, particularly in the domains of marriage, relationships, and overall well-being. The presence of Mangal Dosha is believed to bring forth various challenges and obstacles.
                                </p>
                            </div>

                        </div>
                        <div className='col-md-5  mangaldoshimg'>
                            <img src={Mangal1} alt='Manglik Dosha' />
                        </div>
                    </div>

                    <div className='upcoming-fest-container text-left mt-5'>
                        <h3>What does <span>Mangal Dosh mean?</span></h3>
                        <p>In Vedic Astrology, the presence of Mars in the First, Second, Fourth, Seventh, Eighth, or Twelfth House of the Ascendant is referred to as Mangal Dosha or Kuja Dosha. These specific House placements are considered unfavorable, as Mars can be particularly disruptive in these areas. It is believed that Mars in these Houses can give rise to conflicts, challenges, and even disasters in an individual’s life, affecting aspects such as marriage, love, relationships, and career.</p>

                        <p>The occurrence of Mangal Dosha is determined by the presence of Mars in any of the aforementioned Houses in an individual’s birth chart. Its presence can lead to several problems, especially concerning marriage and relationships. Women are believed to be particularly vulnerable to the harmful effects of Mangal Dosha, as it can result in delays in marriage, difficulties in conceiving children, and in some cases, even miscarriage or premature delivery.</p>
                    </div>

                    <div className='row'>
                        <div className='col-md-7 '>
                            <div className='upcoming-fest-container text-left'>
                                <h3>What does Mangal <span>mean in Vedic Astrology?</span></h3>

                                <p>In Vedic Astrology, Mars is regarded as the planet representing energy and aggression. Consequently, when Mars is positioned in specific Houses of the birth chart, it is referred to as ‘Mangal Dosha’ or ‘Kuja Dosha.’ The placement of Mars in the First, Second, Fourth, Seventh, Eighth, or Twelfth House can give rise to difficulties and challenges in an individual’s life, particularly in the context of marriage and relationships.</p>

                                <p>Mars, known as the planet of war, possesses a highly destructive energy. When placed in certain Houses of the birth chart, it can create havoc in the individual’s life. The Mangal Dosha Calculator analyzes the birth chart to determine whether Mars is positioned in any of these Houses. If Mars is found in these Houses, it is considered a Mangal Dosha, which can lead to problems in the individual’s life.</p>

                            </div>
                        </div>
                        <div className='col-md-5  mangaldoshimg'>
                            <img src={Mangal2} alt='Manglik Dosha' />
                        </div>
                    </div>
                    <div className='upcoming-fest-container text-left mt-5'>
                        <h3>What did the Vedas <span>say about Manglik Dosha?</span></h3>

                        <p>While the Vedas, ancient Hindu scriptures, do not explicitly mention Mangal Dosha as a concept, astrology and the influence of planetary positions on human life are integral parts of Vedic teachings. The Vedas emphasize the importance of fulfilling one’s duties, leading a righteous life, and seeking the blessings of deities through prayers and rituals.</p>

                        <h3>How is Mangal <span>Dosh calculated?</span></h3>
                        <p> The calculation of Mangal Dosha involves analyzing the position of Mars in the birth chart. The Mangal Dosha Calculator utilizes information such as the individual’s sex, birth date, place, and time to determine the precise placement of Mars at the time of birth. If Mars is found in any of the problematic Houses mentioned earlier, the person is said to have Mangal Dosha in their kundali, or birth chart. It is then essential to consult an astrologer to understand the implications of Mangal Dosha and explore potential remedies. Removing Mangal Dosha is crucial, as its influence can impact the individual’s entire life trajectory.</p>

                        <h3>There are two types <span>of Mangal Dosha </span></h3>
                        <p>High Mangal Dosha: When Mars is positioned in the 1st, 2nd, 4th, 7th, 8th, or 12th House in the Natal Chart, Moon Chart, or Venus Chart, it is considered a High Mangal Dosha. Individuals with this Dosha may experience numerous hardships throughout their lives.</p>

                        <p> Low Mangal Dosha: If Mars is placed in the 1st, 2nd, 4th, 7th, 8th, or 12th House in any one of the three charts (Natal Chart, Moon Chart, or Venus Chart), it is considered a Low Mangal Dosha or “Partial Manglik Dosha.” Some astrologers believe that this Dosha may become nullified after the age of 28.</p>

                        <h3>Implications of <span>Manglik Dosha</span></h3>
                        <p>Individuals with Manglik Dosha, often referred to as Mangliks, may face numerous challenges in their personal and professional lives. Here, we outline the effects of Mars' placement in each of the six houses associated with this condition.</p>

                        <p><strong>First House: </strong> Mars in the 1st house can lead to frequent conflicts between spouses, sometimes even escalating to physical altercations and violence.</p>
                        <p><strong>Second House:</strong> When Mars occupies the 2nd house, it can disrupt both the individual's family and professional life, leading to instability and disharmony.</p>
                        <p><strong>Fourth House:</strong> In the 4th house, Mars can cause professional setbacks, forcing the individual to switch jobs regularly and experience financial difficulties.</p>
                        <p><strong>Seventh House:</strong> Mars in the 7th house may result in a highly irritable and short-tempered individual, causing frequent disputes between partners.</p>
                        <p><strong>Eighth House: </strong> An individual with Mars in the 8th house may be prone to laziness and recklessness, particularly with finances and assets, potentially leading to the loss of inherited property.</p>
                        <p><strong>Twelfth House:</strong> Mars in the 12th house can result in numerous enemies and mental health issues, as well as considerable financial losses.</p>

                        <h3>Do's and Don'ts for <span>Manglik Individuals</span></h3>
                        <p>To navigate the challenges presented by Manglik Dosha, it is essential to be mindful of certain practices and precautions. Here, we outline some key do's and don'ts for those affected by this condition.</p>

                        <h3> Do's </h3>
                        <p><strong>Fasting: </strong> Observe a fast on the first Tuesday of every new month during Shukla Paksha (waxing phase of the moon). While fasting, consume only split pigeon dal (toor dal).</p>

                        <p><strong> Chanting:</strong> Make a daily practice of chanting the Gayatri Mantra and Hanuman Chalisa. Additionally, chant "Om Shreem Hanumante Namah" 108 times daily, preferably in front of a Hanuman statue, picture, or in a Hanuman temple.</p>

                        <p><strong> Visit Hanuman Temples: </strong> Pay visits to Hanuman temples on Tuesdays and offer sweets, vermilion, and ghee lamps.</p>

                        <p><strong>Donate:</strong> Donate red clothes to workers handling sharp iron materials or iron items. On Tuesdays, donate sharp objects such as knives, red gram dal-based foods, wheat bread, red clothes, and red stones.</p>

                        <h3> Don'ts </h3>
                        <p><strong>Avoid Unfavorable Marriages:</strong> Manglik individuals should ideally marry other Mangliks to mitigate the adverse effects of this condition.</p>
                        <p><strong>Refrain from Recklessness: </strong>Be cautious with finances and assets to avoid losses and maintain stability.</p>
                        <p><strong>Control Temper: </strong> Practice patience and restraint to avoid conflicts and maintain harmony in relationships.</p>

                        <h3>Remedies for <span> Manglik Dosha </span></h3>
                        <p> Various remedies can help alleviate the negative effects of Manglik Dosha. Here, we present some of the most effective methods to counteract this condition.</p>

                        <p><strong>Kumbh Vivah:</strong> This traditional ritual involves a Manglik woman marrying a clay or silver pot before her actual wedding to negate the ill effects of Manglik Dosha.</p>

                        <p><strong>Mars Mantra:</strong> Chant the Mars mantra on Tuesdays to appease the malefic influence of this planet.</p>

                        <p><strong>Gemstones:</strong> Wearing certain gemstones, such as red coral, can help reduce the negative impact of Mars in one's horoscope.</p>
                        
                        <h3>Conclusion </h3>
                        <p> Manglik Dosha can be a significant challenge for those affected by it, particularly in terms of marital relationships and overall harmony in life. By following the do's and don'ts outlined in this guide and employing the various remedies available, individuals can effectively mitigate the adverse effects of this condition and lead a more balanced and fulfilling life.</p>
                        
                    </div>


                </div>

            </div>
            <Footer history={props} />
        </>
    )
}

