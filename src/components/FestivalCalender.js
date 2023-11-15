import React, { useState } from 'react'
import Footer from '../common/Footer';
import Header2 from '../common/Header2'
import PageBanner from '../common/pageBanner'
import { festivalData, getCommonHeaders, SEO } from "../configuration/commonFunctions";
import Banner from '../images/readmorebanner.png'
import Chat_Talk_Header from "../common/Chat&Talk_Header";
export default function FestivalCalender(props) {
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
                title="Looking for the  best horoscope site for Daily, Weekly, and Monthly Horoscopes for Every Zodiac Sign | astroking"
                description="Astro Tell is one of the  best horoscope site  for Access daily, weekly, and monthly horoscopes for every zodiac sign at astroking. Discover what the stars have in store for you and gain valuable astrological advice to navigate life's challenges. Check your horoscope now!"
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
            title={"Festival Calender"} 
            />
            <PageBanner Banner={''} title={'Festival Calender'} />
            <div className='marriage_contanier'>
                <div className='container'>
                    <div className='marriage_headeing mt-5'>
                        <h2>Know the dates and significance of popular Indian festivals in 2023 </h2>
                    </div>
                    <div className='marriage_details_contanier mt-5 text-justify'>
                       <p>
                       India is a nation characterized by its diverse religions, regions, and languages. It is renowned for its year-round celebration of a wide array of festivals. One remarkable aspect of India is that people come together to celebrate these festivals with great splendor, regardless of their religion or community.
                       </p>
                       <p>
                       The country boasts numerous cultural festivals, each with its own rituals, traditions, and beliefs. Additionally, there are numerous religious festivals that hold immense significance and are widely celebrated across the nation with enthusiasm and zeal.
                       </p>
                       <p>
                       The Indian calendar, known as the Shaka Calendar, follows a luni-solar system and exhibits regional variations. It comprises 12 months, each having distinct names that differ from the English calendar. The initial month of the Indian calendar is called Chaitra, while the final month is known as Phalguna.
                       </p>
                       <p>
                       Indian festivals occur throughout the year and their dates are determined by various factors, including lunar cycles, solar movements, and religious customs. The calculation of these festivals involves a complex process that combines ancient scriptures, astronomical calculations, and regional practices.
                       </p>
                       <p>
                       The lunar calendar plays a pivotal role in determining the dates of Indian festivals. Festivals like Diwali and Eid follow the lunar calendar, which is based on the moon's cycles. The lunar calendar consists of months that commence with the new moon and conclude with the full moon. The festival dates are often determined by the moon's position in relation to the sun.
                       </p>
                       <p>
                       Furthermore, the solar calendar significantly influences the calculation of Indian festivals. This calendar is based on the sun's movement and is used to determine festivals such as Makar Sankranti and Pongal. These festivals are often associated with specific positions of the sun, such as the winter solstice or the sun's transition into a new zodiac sign.
                       </p>
                       <p>
                       Scholars and priests rely on ancient scriptures and texts to calculate the dates of Indian festivals. These texts, including the Panchang or Hindu almanac, contain detailed astronomical calculations, planetary positions, and religious observances. Astrologers and experts interpret these calculations to determine the precise dates and timings of festivals.
                       </p>
                       <p>
                       In Hindu mythology, festivals hold immense significance as they commemorate various mythological events, celestial phenomena, and historical milestones. They serve as a means to connect with the divine, express gratitude, seek blessings, and celebrate the victory of good over evil. Now, let's delve into some prominent festivals and explore their significance in Hindu mythology.
                       </p>
                       <p>
                        
                       </p>
                        <h4>Lohri: Celebrating the Harvest and winter’s End</h4>

                        <p>Lohri, a popular festival in India, will be celebrated on January 13, a Friday, in 2023. It coincides with the last day of the month of Paush, known as Makar Sankranti in many regions. The festival holds significance in Punjab, where it marks the harvesting season and the end of winter.</p>

                        <p> During Lohri, people gather and light a large bonfire in their yards. This act symbolizes the culmination of the rabi crops' harvest. They also create small idols of the Lohri goddess and place them beneath the fire. Traditional attire is worn, and sesame seeds, jaggery, and rewaries are thrown into the fire. The celebration continues with singing, dancing, and prayers to the God of fire for prosperity and abundance. Greetings and gifts are exchanged among friends and family.</p>

                        <h4>Pongal: Celebrating Harvest and the Sun God</h4>

                        <p>Pongal, a widely celebrated festival in South India (known as Makar Sankranti in North India), spans from the 13th to the 16th of January, with the main festivities occurring on the 14th, a Saturday. The festival is primarily observed in Tamil Nadu and is dedicated to the Sun God, Surya.
                        </p>

                        <p>The festival of Pongal extends for three days: Bhogi Pongal, Surya Pongal, and Maattu Pongal. On the main day, people gather to cook Pongal dishes, facing east towards the rising sun. These dishes are then offered to God. The festival is characterized by the joyous celebration of the harvest, with families coming together to express their gratitude and partake in feasts.
                        </p>

                        <h4>Republic Day: Celebrating India's Constitution</h4>

                        <p>Republic Day is celebrated every year on 26 January throughout India with great enthusiasm. The significance of this day lies in honoring the date on which the Constitution of India came into effect.</p>

                        <p>In Delhi, at Rajpath, regiments of the Indian Army, Navy, Air Force, police, and paramilitary forces hold magnificent parades. This grand display highlights the unity and strength of the nation. It is important to note that even after India gained independence in 1947, it did not possess a permanent constitution. </p>

                        <h4>Vasant Panchami: Welcoming Spring and Saraswati</h4>

                        <p> Vasant Panchami, a renowned festival in India, falls on January 26, a Thursday, in 2023. It marks the end of winter and the arrival of spring. The festival is closely associated with the Hindu goddess Saraswati.
                        </p>

                        <p>During Vasant Panchami, people take part in the tradition of giving the first lessons of education to children. In Punjab, it is also known as the "Kite festival," where people fly colorful kites. Young girls dress in bright yellow attire and engage in various festivities.</p>

                        <h4>Holi: The Festival of Colors</h4>

                        <p> Holi, also known as the "Festival of Colors," will be celebrated on 8 March, a Wednesday, in 2023. This vibrant festival signifies the victory of good over evil and the arrival of spring. It is also associated with the eternal love of Radha and Krishna.</p>

                        <p>During Holi, people engage in playful activities, throwing colored powder and using water guns to drench each other in vibrant hues. The festive atmosphere is filled with joy, laughter, and music.</p>

                        <h4>Gudi Padwa: Welcoming the New Year </h4>

                        <p>Gudi Padwa, a popular festival in India, will be celebrated on 22 March, a Wednesday, in 2023. It marks the beginning of the Chaitra month according to the Hindu calendar. According to mythology, Lord Brahma created the universe on this day and introduced the concept of days, weeks, months, and years.</p>

                        <p>On Gudi Padwa, people partake in customary oil baths, wear new clothes, and decorate their homes. The festival symbolizes new beginnings and the hope for a prosperous year ahead.</p>

                        <h4>Ram Navami: Celebrating Lord Rama's Birth</h4>

                        <p>Ram Navami, a significant festival in India, will be observed on 30 March, a Thursday, in 2023. It celebrates the birth of Lord Rama, the seventh incarnation of Lord Vishnu.</p>

                        <p>On this day, people clean their houses and decorate small statues of Rama. Offerings of flowers and fruits are placed, and prayers are recited after an early bath. Special foods are prepared, and the day is filled with devotion and reverence.</p>

                        <h4>Good Friday: Commemorating the Crucifixion</h4>

                        <p>Good Friday will be observed on 7 April, a Friday, in 2023. This solemn day is observed worldwide and commemorates the crucifixion of Jesus Christ.</p>

                        <p>Christians observe Good Friday by fasting and showing their appreciation for Christ's sacrificial act. The day holds immense religious significance and is often marked by prayer, reflection, and attending church services.</p>

                        <h4>Easter: Celebrating Resurrection and Rebirth</h4>
                        <p>Easter will be celebrated on 9 April, a Sunday, in 2023. This festival commemorates the resurrection of Jesus Christ and is considered a time of rebirth for Christianity.</p>

                        <p>The traditional celebration of Easter involves special prayers sung in praise of Jesus Christ in churches, followed by elaborate Sunday masses filled with joyful music. Additionally, the festival is associated with the symbol of the egg, representing resurrection. Egg decoration and hunting activities are common during this time.</p>

                        <h4>Baisakhi: Harvest Festival and Sikh New Year</h4>
                        <p>Baisakhi, a popular festival in India, falls on 14 April, a Friday, in 2023. It is primarily celebrated in Punjab and other parts of North India. Baisakhi is the Sikh New Year and a spring harvest festival.</p>

                        <p>During Baisakhi, farmers pray for an abundant harvest as a symbol of prosperity. Devotees visit Gurudwaras to offer prayers, and various fairs are organized, featuring lively Bhangra and Gidda performances, folk songs, amusement rides, and delicious food.</p>

                        <h4>Eid-Ul-Fitr: Celebrating the End of Ramadan</h4>
                        <p> Eid-Ul-Fitr, also known as Ramadan Eid, will be celebrated on 22 April, a Saturday, in 2023. This festival marks the end of the fasting month of Ramadan, during which Muslims abstain from eating or drinking during daylight hours. Eid-Ul-Fitr is celebrated on the last day of the holy month when Muslims break their fast and come together to celebrate with food, gifts, and well wishes.</p>

                        <h4>Buddha Purnima: Honoring Buddha's Life</h4>
                        <p>Buddha Purnima, also known as Buddha Jayanti or Vesak, will be celebrated on 5 May, a Friday, in 2023. This Buddhist holiday commemorates the birth, enlightenment, and death of Gautama Buddha.</p>

                        <p>On this day, Buddha idols are worshipped, and prayer meetings are organized. Devotees visit Buddhist sites, recite Buddhist scriptures, and participate in religious debates and group meditations. The festival serves as a time for introspection and spiritual reflection.</p>

                        <h4>Ganga Dussehra: Revering the Sacred Ganges</h4>
                        <p>Ganga Dussehra, one of the most important festivals in India, will be celebrated on 30 May, a Tuesday, in 2023. It is held to honor the Goddess Ganga and her descent to Earth. The sacred Ganges River is considered divine and is venerated for its purifying properties.</p>

                        <p>On Ganga Dussehra, people pray to Goddess Ganga and seek her blessings. The festival spans ten days, beginning with Nirjala Ekadashi. Devotees engage in rituals and ceremonies along the banks of the Ganges to express their reverence and gratitude.</p>

                        <h4>Rath Yatra: Chariot Festival</h4>
                        <p>Rath Yatra, one of the holiest and oldest festivals in India, will be celebrated on 20 June, a Tuesday, in 2023. The festival is held in Puri, Odisha, as well as in various other locations across the country and the world.</p>

                        <p>Rath Yatra commemorates the return of Lord Krishna with his siblings, Balarama and Subhadra, to Vrindavan. The idols of Lord Jagannath, Balarama, and Subhadra are taken out in a grand procession. The festivities include devotional singing, dancing, and a jubilant celebration of Lord Jagannath's annual visit to the Gundicha Temple.</p>

                        <h4>Eid al-Adha: Festival of Sacrifice</h4>
                        <p>Eid al-Adha, also known as Bakrid, will commence on 29 June, a Tuesday, in 2023. It is observed during the month of "Dhu al-Hijjah," the twelfth and final month of the Islamic calendar.</p>

                        <p>Eid al-Adha commemorates the willingness of Prophet Ibrahim (Abraham) to sacrifice his son, following Allah's command. The festival signifies faith, sacrifice, and obedience. The pilgrimage to Mecca, known as "hajj," culminates with Eid al-Adha.</p>

                        <h4>Muharram: Commemorating a Historic Event</h4>
                        <p> Muharram, the first month of the Islamic calendar, will be observed on 29 July, a Saturday, in 2023. It is considered a religious occasion and holds significance in Islamic history.</p>

                        <p> Muharram also marks the anniversary of the battle of Karbala, where Imam Hussain Ibn Ali, the grandson of the Islamic prophet Muhammad, was martyred. The day is observed with fasting, visiting mosques, prayers to Allah, spending time with family, and preparing special cuisines.</p>

                        <h4>Independence Day: Celebrating Freedom</h4>
                        <p> Independence Day, a national holiday in India, will be celebrated on 15 August, a Tuesday, in 2023. This annual occasion commemorates India's freedom from British colonial rule in 1947.</p>

                        <p>On Independence Day, people hoist the national flag, wear patriotic colors symbolizing the tricolor, and participate in cultural programs and parades to honor the day. The event is marked by speeches, patriotic songs, and a sense of national pride.</p>

                        <h4>Onam: Harvest Festival of Kerala</h4>
                        <p>Onam, a popular festival in South India, will be celebrated on 29 August, a Tuesday, in 2023. The festival spans ten days, starting with Atham and culminating in Thiru Onam or Thiruvonam.</p>

                        <p>Onam's significance lies in the mythological tale of the generous ruler Mahabali, who was granted permission to visit his people once a year. The festival is marked by the purchase and wearing of new clothes, beautifully decorating lamps, engaging in various games and dances, and enjoying feasts.</p>

                        <h4>Raksha Bandhan: Celebrating Sibling Bond</h4>
                        <p>Raksha Bandhan will be celebrated on 30 August, a Wednesday, in 2023. This auspicious festival celebrates the bond between brothers and sisters. The word "Raksha" means "safety" or "protection," while "Bandhan" means "bond."</p>

                        <p>On Raksha Bandhan, sisters tie a protective band, known as Rakhi, on their brothers' wrists, symbolizing their love and the brother's commitment to protecting and supporting their sisters. The day is marked by prayers, family gatherings, and the exchange of gifts.</p>

                        <h4>Krishna Janmashtami: Celebrating Lord Krishna's Birth</h4>
                        <p>Krishna Janmashtami, a joyous festival, will be celebrated on 7 September, a Thursday, in 2023. It commemorates the birth of Lord Krishna.</p>

                        <p>The celebrations begin at midnight, the time when Lord Krishna is believed to have been born. People fast, sing devotional songs and engage in prayers. Statues of baby Krishna are washed and adorned with care. The fasting is broken with a shared meal, and the day is filled with joyous festivities, including Dahi Handi competitions.</p>

                        <h4>Ganesh Chaturthi: Honoring Lord Ganesha</h4>
                        <p>Ganesh Chaturthi, a vibrant festival, will be celebrated on 19 September, a Tuesday, in 2023. It is observed with great enthusiasm throughout India, with special significance in Maharashtra.</p>

                        <p>Ganesh Chaturthi is a ten-day festival that begins weeks before the main day. People create clay idols of Lord Ganesha, paint them, and install them in their homes. On the tenth day, the idols are immersed in water during the procession known as Ganpati Visarjan. The festival is accompanied by chanting, dancing, and fervent devotion to Lord Ganesha.</p>

                        <h4>Gandhi Jayanti: Remembering Mahatma Gandhi</h4>
                        <p>Gandhi Jayanti, observed on 2 October every year, honors the birth anniversary of Mahatma Gandhi, the father of the Indian nation. In 2023, it falls on a Monday.</p>

                        <p>Mahatma Gandhi played a pivotal role in India's independence movement, advocating for non-violence and social change. The day is marked by paying tribute to his principles and remembering his contributions to India's freedom struggle.</p>

                        <h4> Navratri: Festival of Goddess Worship</h4>
                        <p>Navratri, a series of holy festivals in India, will begin in October, with Dussehra falling on 24 October in 2023. The festival spans nine nights and is dedicated to the worship of various forms of the divine feminine.</p>

                        <p>During Navratri, people engage in vibrant dance forms, music, and cultural activities. The festival culminates with Dussehra, also known as Vijayadashami, symbolizing the victory of good over evil. </p>

                        <h4>Diwali: Festival of Lights </h4>
                        <p> Diwali, also known as Deepavali, will be celebrated on 12 November, a Sunday, in 2023. This popular festival is observed throughout India with great enthusiasm.</p>

                        <p> Diwali signifies the return of Lord Rama to Ayodhya after 14 years of exile and his victory over the demon king Ravana. People clean their houses, decorate them with lights and diyas, wear new clothes, make sweets, and offer prayers for prosperity. The festival also includes exchanging gifts and fireworks displays.</p>

                        <h4>Bhai Dooj: Celebrating Sibling Love</h4>
                        <p> Bhai Dooj falls on 14 November, a Tuesday, in 2023. It is a festival that celebrates the bond between brothers and sisters.</p>

                        <p>On Bhai Dooj, sisters perform aarti for their brothers and apply a red tikka on their foreheads, symbolizing their love and protection. The day is marked by prayers, family gatherings, and the exchange of gifts and good wishes.</p>

                        <h4> Guru Nanak Jayanti: Honoring the First Sikh Guru </h4>
                        <p>Guru Nanak Jayanti, celebrating the birth anniversary of the first Sikh Guru, Guru Nanak Dev, will be observed on 27 November, a Monday, in 2023. The festival holds special significance in Punjab and is celebrated throughout India.</p>

                        <p> The festivities commence with a 48-hour continuous recitation of the Guru Granth Sahib, known as Akhand Path. A day before Guru Nanak's birthday, a parade called Nagarkirtan takes place, led by five men carrying the Sikh triangular flag, Nishan Sahib.</p>

                        <h4>Christmas: Celebrating the Birth of Jesus Christ </h4>
                        <p>Christmas, observed on the 25th of December every year, will be celebrated worldwide in 2023. It commemorates the birth of Jesus Christ, believed to be the Son of God, by Christians.</p>

                        <p>Christmas is a time for loved ones to come together, exchange gifts, and celebrate the joyous occasion. Churches hold special services, and people participate in prayers, carol singing, and acts of kindness. The festive spirit is marked by decorations, feasts, and a sense of goodwill and giving.</p>

                        <div className='festival_table'>
                            <div className='festi_tab_head'>
                                <div className='festi_tab_tr'> Date </div>
                                <div className='festi_tab_tr'> Day</div>
                                <div className='festi_tab_tr'> Festival Name</div>
                            </div>
                            {festivalData.map((item, i) => {
                                return <div className='festi_tab_body' key={i}>
                                    <div className='festi_tab_td'>{item.date}</div>
                                    <div className='festi_tab_td'>{item.day}</div>
                                    <div className='festi_tab_td'>{item.festival}</div>
                                </div>
                            })}

                        </div>
                    </div>
                </div>
            </div>
            <Footer history={props} />
        </>
    )
}

