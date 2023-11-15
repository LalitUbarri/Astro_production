import React, { useState } from 'react'
import Footer from '../common/Footer';
import Header2 from '../common/Header2'
import PageBanner from '../common/pageBanner'
import { getCommonHeaders, SEO } from "../configuration/commonFunctions";
import Banner from '../images/readmorebanner.png'

export default function PlanetaryTransit(props) {

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
                keywords='Planetary Transits Astrology'
                title="Planetary Transits - Expert Astrological Insights | astroking"
                description="Gain expert astrological insights into planetary transits with astroking. Discover how planetary movements impact your life and make informed decisions."
            />
            <Header2
                IsActive_header_Or_not="chat_and_talk_header-"
                openLoginPopup={openLoginPopup}
                openSignupPopup={openSignupPopup}
                isLogin={loginSelected}
                countryCode={countryCode}
                changeIsHeaderOpen={changeIsHeaderOpen}
            />
            <PageBanner Banner={''} title={'Planetary Transit 2023'} />


            <div className='planetaryTransit'>
                <div className='container'>
                    <div className='header_heading mt-5'>
                        <h2><strong> Top Ten Spectacular Celestial Events to Observe in 2023</strong> </h2>
                    </div>

                    <div className='planetary_month_wise_details mt-5 text-justify'>
                        <h4>February 2: Comet C/2022 E3 comes close to Earth</h4>
                        <p> On February 2nd, Comet C/2022 E3 will make a close approach to Earth, coming within approximately 26.4 million miles of our planet. This proximity marks the closest the comet has been to Earth since the time when Homo sapiens started inhabiting Europe and Asia after migrating from Africa. While the brightness of comets can be unpredictable, this particular comet might be visible to the naked eye when viewed under dark skies. However, using binoculars or a telescope will significantly improve the chances of observing it. In January, stargazers in the Northern Hemisphere may be able to spot the comet in the morning sky towards the northwest. As for those in the Southern Hemisphere, they should keep a lookout starting in early February. The comet exhibits a distinct green color and possesses a faint, elongated tail.</p>

                        <h4> March 1: Venus-Jupiter conjunction </h4>
                        <p> In the early months of the year, the two most luminous planets will gradually approach each other in the southwestern sky. On March 1st, they will reach their nearest distance from one another. Both planets should be visible to the naked eye, and even the smallest backyard telescope will allow you to observe them within the same field of view, as mentioned by Andrew Fazekas of National Geographic. It's important to note that despite their apparent closeness, the two planets remain millions of miles apart. To witness this celestial event, direct your gaze towards the west-southwest during dusk, and you will witness the two planets side by side.</p>

                        <h4> April 15 to April 29: Lyrid meteor shower</h4>
                        <p> This year, the peak of the Lyrids shower is expected on the night of April 22nd, and the conditions for viewing are expected to be favorable. According to Dobrijevic, the waxing crescent moon will only be 6 percent illuminated, allowing for better visibility of the meteors. On a clear, dark sky, observers typically witness around 18 meteors per hour during the Lyrids shower. However, there have been rare instances where the Lyrids have surprised viewers with a remarkable display of up to 100 meteors per hour.</p>

                        <h4> April 15 to May 27: Eta Aquarid meteors </h4>
                        <p> The Eta Aquarid meteor shower is renowned for its swift meteors that leave behind luminous trails in their wake. According to NASA, these meteors can reach speeds of approximately 148,000 miles per hour as they enter Earth's atmosphere. The radiant point, where the meteors appear to originate, is located within the constellation Aquarius. Originating from the comet Halley, which completes its orbit around the sun approximately every 76 years, the Eta Aquarid meteors provide a captivating celestial display. This comet is also responsible for producing the Orionid meteor shower, which takes place in October. The last notable sighting of Halley's Comet occurred in 1986, and it is expected to make its next appearance in 2061.</p>

                        <h4> July 14 to September 1: Perseid meteor shower</h4>
                        <p> Regarded as one of the most impressive meteor showers annually, the Perseid meteor shower captivates observers with its luminous meteors that leave behind long tails. The sky comes alive with a display of bright shooting stars, occurring at an estimated rate of about 50 to 100 meteors per hour. This meteor shower occurs as the Earth traverses through the remnants left behind by the comet Swift-Tuttle. The peak of the Perseids coincides with the Earth's passage through the densest part of the debris field. In the previous year, the Perseid meteor shower occurred simultaneously with the full moon, which posed challenges in spotting certain shooting stars. However, this year's spectacle promises to be extraordinary, with the peak occurring two days before the new moon on August 11th and 12th. This fortuitous timing ensures optimal viewing conditions, allowing for an even more remarkable experience.</p>

                        <h4> August 31: A super blue moon </h4>
                        <p> On the night of August 31st, sky gazers will have the opportunity to observe a visually striking phenomenon. The full moon will appear larger and more radiant than its usual appearance. This captivating occurrence is attributed to the moon's close proximity to Earth in its elliptical orbit, classifying it as a supermoon. This year, there will be a sequence of four consecutive supermoons, taking place on July 3rd, August 1st, August 31st, and September 29th.</p>

                        <h4> September 26 to November 22: Orionids </h4>
                        <p> While not as intense as the Perseids or Geminids, the Orionid meteor shower remains a captivating celestial event worth observing. From a location with minimal light pollution, viewers can expect to witness approximately 10 to 20 meteors per hour at the peak of the shower, which occurs around the early morning of October 22nd. Similar to the Eta Aquarids, the Orionids originate from the comet Halley, named after the renowned English astronomer Edmond Halley. Halley's groundbreaking work involved accurately calculating the orbit of the comet, ultimately enabling him to predict its return in 1758—16 years after his passing.</p>

                        <h4> October 14: Annular solar eclipse </h4>
                        <p> During the middle of October, residents in the southwestern United States will have the opportunity to witness an annular solar eclipse. Solar eclipses transpire when the moon aligns between the Earth and the sun. However, this year, the moon's positioning will not completely obscure the sun, resulting in a mesmerizing phenomenon known as a "ring of fire." This captivating display manifests as a luminous circle, offering a stunning visual spectacle for observers in specific locations. Annular solar eclipses can endure for durations of up to 12 minutes and 30 seconds, but this year's maximum duration in the United States will be approximately five minutes.</p>

                        <h4>October 28: Partial lunar eclipse</h4>
                        <p> The penumbral eclipse will exclusively be observable along the East Coast of the United States. For those observing from that region, the moon will remain below the horizon throughout the partial eclipse. The partial eclipse will commence at 3:35 p.m. Eastern Daylight Time and conclude at 4:52 p.m. However, keen observers may still have a chance to perceive the subtle shadow, known as the Earth's penumbra, cast upon the moon's surface once it rises in their vicinity. The penumbral eclipse will reach its conclusion at 6:26 p.m. Eastern Time.</p>

                        <h4>November 19 to December 24: Geminid meteor shower</h4>
                        <p>Distinguished from many other meteor showers, the Geminids originate from a rocky celestial body known as an asteroid, rather than an icy comet. The asteroid, named Phaethon, presents an intriguing puzzle for scientists, as its connection to a meteor shower remains somewhat uncertain. Some speculate that Phaethon could potentially be a dormant comet, having shed its icy outer layer.The peak of the Geminid meteor shower is expected to occur on the nights of December 13th and 14th, offering the possibility of a spectacular display for stargazers. It is projected that an impressive rate of 120 meteors per hour could grace the night sky during this period. In contrast, last year's shower was hindered by a waning gibbous moon, resulting in only 30 to 40 meteors visible per hour in the Northern Hemisphere. However, this year's peak coincides with a youthful waxing crescent moon, which will set early in the evening. Consequently, the darkness of the sky will be preserved, enhancing the viewing experience for observers.</p>
                    </div>
                </div>
            </div>
            <Footer history={props} />
        </>
    )
}
