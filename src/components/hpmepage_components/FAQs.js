import React from 'react';
import arrowBtn from '../../images/New-images/Group-102.png';
import accImg from '../../images/New-images/Rectangle-121.png';

export default function FAQS() {
    return <>
        <div className='faqs_container'>
            <div className='faqs_head'>
                <p className="daily-horoscope-header">
                    <span className="horoscope">{('Frequently asked ')}</span>
                    <span className="daily">{(' Questions?')} </span>
                </p>
            </div>
            <div className='faqs_card_container'>
                <div className='faqs_card'>
                    <div class="accordion" id="accordionExample">
                        <div class="accordion-item1">
                            <div class="card-header" id="headingOne">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block acc_btn" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                        <p > <strong>What is Astrology?</strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>

                            <div id="collapseOne" class="collapse " aria-labelledby="headingOne" data-parent="#accordionExample">
                                <div class="card-body">
                                    <div className='card-body_img'>
                                        <img src={accImg} alt="What is Astrology" width={'100%'} />
                                    </div>
                                    <p>Astrology is a field of study that revolves around the belief that the movements of planets, the sun, the moon, and constellations hold significance in shaping an individual's destiny. While some consider it a pseudoscience, astrology deals with the exploration of planetary movements in the universe and their perceived impact on human life.</p>
                                    <p>It is worth noting that astrology recognizes the presence of nine planets, also known as Navagrahas, contrary to the widely accepted knowledge of eight planets in our solar system. Interestingly, the planet Earth is not included among these nine celestial bodies in astrology.</p>
                                    <p>The nine planets in astrology are the Sun (Surya), Moon (Chandra), Mars (Mangala), Mercury (Budha), Jupiter (Brihaspati), Venus (Shukra), Saturn (Shani), Rahu (the north node of the moon), and Ketu (the south node of the moon).</p>
                                    <p>Among these planets, some are referred to as friendly planets, signifying their positive influence on one's life. Conversely, there are planets, such as Rahu and Ketu, believed to exert negative effects on individuals. The presence of these planets in one's Kundli, or birth chart, is said to bring suffering and hardship. However, it's essential to recognize that the presence of Ketu in a horoscope is not always negative, and similarly, the presence of Jupiter in a Kundli may not always be advantageous.</p>
                                    <p>The significance of these planetary influences is determined by the houses in which the planets reside. There are 12 houses in Kundali, each representing various aspects of life.</p>
                                    <p>Astrologers employ mathematics and various tools to calculate the trajectories of astronomical bodies and predict how these movements will influence an individual's daily life and future.</p>
                                    <p>Astrology encompasses a wide range of approaches, with 80 different types, of which 10 are particularly useful and popular. These forms of astrology include:</p>
                                    <ol type='1'>
                                        <li>
                                            Modern Astrology: Focused on self-improvement, free will, and psychological aspects.
                                        </li>
                                        <li>Traditional Astrology: Concentrated on fate, destiny, and future predictions.</li>
                                        <li> Relationship Astrology: Concerned with love, friendship, and business compatibility.</li>
                                        <li>Sidereal Astrology: Draws from Vedic astrology, emphasizing spirituality and healing.</li>
                                        <li>Chinese Astrology: Compares the lunar and solar calendars.</li>
                                        <li>Horary Astrology: Used for seeking truth and finding lost objects.</li>
                                        <li>Electional Astrology: Helps determine auspicious dates and times.</li>
                                        <li>Financial Astrology: Applied in betting and stock trading.</li>
                                        <li>Locational Astrology: Explores the astrology of geography and global events.</li>
                                        <li>Medical Astrology: Focuses on healing the mind, body, and spirit.</li>
                                    </ol>
                                    <p>Astrology is not merely random guesswork; it is a science rooted in principles established by a learned Gurus thousands of years ago, which have remained unchanged to this day. These wise individuals studied planetary movements and their energetic influences on human life. The enduring popularity of astrology stems from its perceived accuracy, as it continues to influence the lives of millions of people, including ourselves and countless other astrologers who share their knowledge one prediction at a time.</p>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item1">
                            <div class="card-header" id="headingTwo">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block collapsed acc_btn" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        <p > <strong>What does science have to say about Astrology?</strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                <div class="card-body">
                                    <p>Astrology is the study of how the movements and positions of stars and planets can affect human lives and the natural world. It has been talked about and debated for a long time. Some people think astrology is not real science, but others believe it is.</p>
                                    <p>One reason why some people see astrology as a science is that it has been used by many cultures for thousands of years. People have used astrology to predict things like weather, disasters, and even politics. Because so many people have trusted for it so long, it suggests that there might be something true about it.</p>
                                    <p>Another reason why astrology is seen as a science is that it uses complicated math and calculations. The positions of planets and stars are measured very precisely, and the meanings behind these positions are based on a system of symbols. Astrology is not just about stars and planets, it is about how they relate to Earth and how that affects our lives.</p>
                                    <p>Astrology also has a psychological side. It can help people learn more about themselves and grow as individuals. Understanding astrology can give insights into who we are and our place in the world, which is valuable.</p>
                                    <p>It is important to note that astrology is not a replacement for science. It can work alongside science, and astrologers can use scientific data to support their predictions. Astrology and science can go hand in hand.</p>
                                    <p>In conclusion, astrology may not be seen as a traditional science, but it uses math and calculations and has been used by different cultures for a long time. It can also help with self-discovery and personal growth. Even though astrology does not have the same kind of proof as some sciences, it does not mean it is not a valid way of understanding things.</p>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item1">
                            <div class="card-header" id="headingThree">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block collapsed acc_btn" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        <p > <strong>Does Astrology Work? To what extent does astrology work?</strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                <div class="card-body">
                                    <img src="" alt="" width={'100%'} />
                                    <p>Scientists say that astrology does not work, but there are people who believe in it and say that it does work. So, who is right? It depends on what you think "working" means.</p>
                                    <p>Astrology is the study of stars and planets and how they can affect a person's mood, environment, family, love life, and overall life. Astrologers make predictions based on a person's birth chart or horoscope.</p>
                                    <p>Astrology can calculate the chances of certain events happening in a person's life, both in the past and in the future. There are online courses available to learn astrology, where you can gain a deeper understanding of it.</p>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item1">
                            <div class="card-header" id="headingThree1">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block collapsed acc_btn text-justify" type="button" data-toggle="collapse" data-target="#collapseThree1" aria-expanded="false" aria-controls="collapseThree1">
                                        <p > <strong>How do astrology predictions work?</strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseThree1" class="collapse" aria-labelledby="headingThree1" data-parent="#accordionExample">
                                <div class="card-body">
                                    <img src="" alt="" width={'100%'} />
                                    <p>Astrology predictions depend on knowing the exact time of a person's birth. If someone provides incorrect information about their birth time and date, the predictions will not be accurate. Predictions are made using the positions of the planets, whether they are in the right places or not.</p>
                                    <p>In addition to the planet positions, other factors like the power and degree of the planets, zodiac signs, transit positions, yoga, and yogini transit also play a role in predicting the future.</p>
                                    <p>A comprehensive understanding of astrology shows that it works in a real sense. It is connected to karma and gives appropriate results. Good actions bring good results, while negative actions have negative consequences.</p>
                                    <p>Can gemstones help remove negative impacts?</p>
                                    <p>Yes, gemstones are considered excellent remedies in astrology. They are connected to both astrology and science. They can bring about changes and reduce the negative effects, but it is important to wear them consistently for 40 days to observe any changes.</p>
                                    <p>Therefore, astrology works when you believe in it. It takes time to see results. There are many institutes and astrologers who can help you learn astrology online. Make sure to choose a reputable institute if you want to pursue a career in astrology, or find a reliable astrologer to help you with your future predictions.</p>
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item1">
                            <div class="card-header" id="headingThree2">
                                <h2 class="mb-0">
                                    <button className="btn btn-link btn-block collapsed acc_btn text-justify" type="button" data-toggle="collapse" data-target="#collapseThree2" aria-expanded="false" aria-controls="collapseThree2">
                                        <p > <strong>How to figure out your zodiac signs?</strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseThree2" class="collapse" aria-labelledby="headingThree2" data-parent="#accordionExample">
                                <div class="card-body">
                                    <img src="" alt="" width={'100%'} />
                                    <p>Ever wondered how the sun, moon, and planets can affect your life and who you are as a person? Well, your horoscope has the answers! Horoscopes give predictions about your future based on where the celestial bodies were when you were born. To find your horoscope, the first step is to know your zodiac sign. Are you ready to start your astrological journey? We will show you how to find your zodiac sign.</p>
                                    <p><strong>You can use your birthday to figure out your zodiac sign.</strong> There are 12 zodiac signs, each connected to a specific time of the year. These signs have fixed dates, although sometimes they can vary by day in different years. Here are the zodiac signs and their corresponding date ranges:</p>
                                    <ul>
                                        <li><p>Aries: March 21st to April 19th</p></li>
                                        <li><p>Taurus: April 20th to May 20th</p></li>
                                        <li><p>Gemini: May 21st to June 20th</p></li>
                                        <li><p>Cancer: June 21st to July 22nd</p></li>
                                        <li><p>Leo: July 23rd to August 22nd</p></li>
                                        <li><p>Virgo: August 23rd to September 22nd</p></li>
                                        <li><p>Libra: September 23rd to October 22nd</p></li>
                                        <li><p>Scorpio: October 23rd to November 21st</p></li>
                                        <li><p>Sagittarius: November 22nd to December 21st</p></li>
                                        <li><p>Capricorn: December 22nd to January 19th</p></li>
                                        <li><p>Aquarius: January 20th to February 18th</p></li>
                                        <li><p>Pisces: February 19th to March 20th</p></li>

                                    </ul>
                                    <p>
                                        Each zodiac sign is associated with certain personality traits. These traits are believed to be present in people born under that specific sign. Here are some examples:
                                    </p>
                                    <ul>
                                        <li><p>Aries: Independent and courageous</p></li>
                                        <li><p>Pisces: Reserved and thoughtful</p></li>
                                        <li><p>Taurus: Easy-going but stubborn</p></li>
                                        <li><p>Leo: Kind, generous, and confident</p></li>
                                        <li><p>Gemini: Social and adaptable</p></li>
                                        <li><p>Cancer: Adventurous and unpredictable</p></li>
                                        <li><p>Virgo: Analytical and focused on self-improvement</p></li>
                                        <li><p>Libra: Ambitious and diplomatic</p></li>
                                        <li><p>Scorpio: Intense and hardworking</p></li>
                                        <li><p>Sagittarius: Positive, energetic, and adventurous</p></li>
                                        <li><p>Capricorn: Ambitious and in control</p></li>
                                        <li><p>Aquarius: Innovative and unafraid of judgment</p></li>
                                    </ul>
                                    <p>You can also determine how compatible you are with others based on their zodiac sign. The zodiac signs are grouped into four elements: fire, water, air, and earth. Signs within the same element are believed to be more compatible. Here are the elements and the signs associated with them:</p>
                                    <ul>
                                        <li><p>Fire signs: Aries, Leo, and Sagittarius</p></li>
                                        <li><p>Water signs: Cancer, Scorpio, and Pisces</p></li>
                                        <li><p>Air signs: Gemini, Libra, and Aquarius</p></li>
                                        <li><p>Earth signs: Taurus, Virgo, and Capricorn</p></li>
                                    </ul>
                                    <p>Therefore, by understanding your zodiac sign and the traits associated with it, as well as considering the elements and compatibility with other signs, you can gain insights into yourself and your relationships.</p>
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item1">
                            <div class="card-header" id="headingOne3">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block acc_btn" type="button" data-toggle="collapse" data-target="#collapseOne3" aria-expanded="true" aria-controls="collapseOne3">
                                        <p > <strong>How to select the best astrologer for your problem?</strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>

                            <div id="collapseOne3" class="collapse" aria-labelledby="headingOne3" data-parent="#accordionExample">
                                <div class="card-body">
                                    <div className='card-body_img'>
                                        <img src={accImg} alt="What is Astrology" width={'100%'} />
                                    </div>
                                    <p>Selecting the best astrologer for your problem can be a daunting task, given the numerous practitioners and varying levels of expertise in the field. Here are some key factors to consider when selecting an astrologer.</p>
                                    <p>Credentials and Experience: Look for an astrologer who has appropriate credentials and a strong background in astrology. Check if they have received formal education or certification from reputable astrological organizations.</p>
                                    <p>Specialization: Astrology encompasses various branches such as natal astrology, horary astrology, Vedic astrology, and more. Determine the area of astrology that aligns with your needs and find an astrologer who specializes in that particular field. </p>
                                    <p>Reputation and Reviews: Research the astrologer's reputation in the community. Seek recommendations from friends, family, or online forums. Look for online reviews or testimonials from their previous clients. </p>
                                    <p>Consultation Style: Consider the astrologer's consultation style and approach. Some astrologers provide detailed interpretations, while others focus on practical advice and guidance. Determine your preference and find an astrologer whose style resonates with you. </p>
                                    <p>Ethical Standards: Ensure that the astrologer adheres to ethical standards and follows a code of conduct. They should prioritize the well-being of their clients, maintain confidentiality, and avoid making false promises or engaging in unethical practices. </p>
                                    <p>Compatibility and Personal Connection: Trust your intuition and gauge your personal compatibility with the astrologer. A good rapport and comfort level can enhance the effectiveness of the consultation.</p>

                                </div>
                            </div>
                        </div>
                        <div class="accordion-item1">
                            <div class="card-header" id="headingTwo4">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block collapsed acc_btn text-justify" type="button" data-toggle="collapse" data-target="#collapseTwo4" aria-expanded="false" aria-controls="collapseTwo4">
                                        <p > <strong>How Can Online Astrology Help Me In Predicting The Future?</strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseTwo4" class="collapse" aria-labelledby="headingTwo4" data-parent="#accordionExample">
                                <div class="card-body">
                                    <p>Online astrology can be a resourceful tool for gaining insights and understanding potential future outcomes. While it's important to approach astrology with a critical mindset, it can provide guidance and perspectives that may assist you in making informed decisions. Here are a few ways online astrology can help in predicting the future:</p>
                                    <p>Natal Chart Analysis: Online astrology platforms often provide the opportunity to generate a natal chart based on your birth details. A natal chart is a personalized map of the positions of celestial bodies at the time of your birth. </p>
                                    <p>Transit and Progression Analysis: Astrologers study the movement of celestial bodies in relation to your natal chart to make predictions. Online astrology platforms can calculate and generate transit and progression reports, indicating the current positions of planets and their impact on your birth chart. </p>
                                    <p>Forecast Reports: Many online astrology platforms offer forecast reports that provide predictions for specific time periods, such as a month or a year. These reports consider the current planetary positions and their interactions with your natal chart. </p>
                                    <p>Compatibility Analysis: Online astrology can also assist in predicting the future of relationships. By comparing the natal charts of two individuals, astrologers can assess the compatibility between them. </p>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item1">
                            <div class="card-header" id="headingThree5">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block collapsed acc_btn text-justify" type="button" data-toggle="collapse" data-target="#collapseThree5" aria-expanded="false" aria-controls="collapseThree5">
                                        <p > <strong>Online Astrologer: Do you often worry about where to find a trustable online astrologer? Or will you get the correct reading or not?</strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseThree5" class="collapse" aria-labelledby="headingThree5" data-parent="#accordionExample">
                                <div class="card-body">
                                    <img src="" alt="" width={'100%'} />
                                    <p>Finding a trustworthy online astrologer can indeed be a concern, given the abundance of options available. To ensure you find a reliable professional and receive accurate readings, consider the following tips:</p>
                                    <p>Research and Reviews: Conduct thorough research on different online astrologers. Look for reviews, testimonials, or feedback from their clients. </p>
                                    <p>Credentials and Experience: Check the astrologer's credentials, educational background, certifications, and experience.</p>
                                    <p>Professionalism and Ethics: A trustworthy astrologer adheres to a code of ethics and maintains professionalism. They prioritize the well-being of their clients, maintain confidentiality, and avoid making false promises. </p>
                                    <p>Consultation Style: Assess the astrologer's consultation style and approach. Consider whether they provide detailed interpretations, practical advice, or a combination of both.</p>
                                    <p>Communication and Connection: Evaluate the astrologer's communication skills and ability to explain complex concepts in a clear and understandable manner. </p>
                                    <p>Recommendations and Referrals: Seek recommendations from trusted sources, such as friends, family, or online communities. </p>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item1">
                            <div class="card-header" id="headingThree6">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block collapsed acc_btn text-justify" type="button" data-toggle="collapse" data-target="#collapseThree6" aria-expanded="false" aria-controls="collapseThree6">
                                        <p > <strong>What Kind Of Questions Can I Ask Online Astrologers?</strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseThree6" class="collapse" aria-labelledby="headingThree6" data-parent="#accordionExample">
                                <div class="card-body">
                                    <img src="" alt="" width={'100%'} />
                                    <p>When consulting with online astrologers, you can ask a wide range of questions related to various aspects of your life. Here are some common areas where people seek guidance from astrologers:</p>
                                    <p>Personal Life: You can inquire about your personality traits, strengths, weaknesses, and potential life paths based on your birth chart. </p>
                                    <p>Relationships: Astrologers can provide insights into compatibility, dynamics, and potential challenges within relationships. </p>
                                    <p>Career and Finances: Questions about career choices, job prospects, financial opportunities, and potential success can be asked. </p>
                                    <p>Health and Well-being: You can seek astrological insights into health-related matters and ask questions about potential health issues, preventive measures, and overall well-being. </p>
                                    <p>Timing and Events: Astrologers can offer guidance on when certain events or opportunities might manifest in your life. </p>
                                    <p>Personal Development: Astrologers can provide guidance on personal growth, self-improvement, and overcoming challenges. </p>
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item1">
                            <div class="card-header" id="headingThree7">
                                <h2 class="mb-0">
                                    <button className="btn btn-link btn-block collapsed acc_btn text-justify" type="button" data-toggle="collapse" data-target="#collapseThree7" aria-expanded="false" aria-controls="collapseThree7">
                                        <p > <strong>Can Astrology Predictions Be Changed?</strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseThree7" class="collapse" aria-labelledby="headingThree7" data-parent="#accordionExample">
                                <div class="card-body">
                                    <img src="" alt="" width={'100%'} />
                                    <p>Astrology is based on the belief that celestial bodies and their positions can influence human behavior and destiny. Astrological predictions are made by analyzing these positions at the time of a person's birth. However, astrology does not determine an individual's fate or control their actions. It is merely a tool for understanding potential influences.</p>
                                    <p>Astrology predictions can be subject to change due to several factors. Firstly, free will plays a significant role in shaping our lives. Personal choices and decisions can alter the course of events, overriding any astrological indications. Additionally, the interpretation of astrological charts can vary among astrologers, leading to different predictions.</p>
                                    <p>Moreover, astrology primarily focuses on general tendencies and patterns rather than precise events. Life is complex and influenced by numerous factors, including societal changes and individual growth. Therefore, while astrology may offer insights and guidance, it is not set in stone and should not be seen as an infallible predictor of the future.</p>
                                    <p>Ultimately, astrology serves as a tool for self-reflection and understanding rather than a fixed blueprint for one's life. It is up to individuals to embrace their agency and make choices that can shape their destiny, irrespective of astrological indications.</p>
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item1">
                            <div class="card-header" id="headingOne11">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block acc_btn" type="button" data-toggle="collapse" data-target="#collapseOne11" aria-expanded="true" aria-controls="collapseOn11">
                                        <p > <strong>Can Astrology Predict About Lottery Winning?</strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>

                            <div id="collapseOne11" class="collapse" aria-labelledby="headingOne11" data-parent="#accordionExample">
                                <div class="card-body">
                                    <div className='card-body_img'>
                                        <img src={accImg} alt="What is Astrology" width={'100%'} />
                                    </div>
                                    <p>Astrology, as a practice, is not designed specifically to predict lottery winnings or any form of gambling success. Astrology primarily focuses on exploring celestial influences on personality traits, relationships, and life patterns. The concept of predicting lottery winnings through astrology is not supported by empirical evidence or scientific consensus.</p>
                                    <p>Lottery outcomes are typically based on random chance, statistical probabilities, and mathematical algorithms. Astrology, on the other hand, is based on the positions of celestial bodies and their perceived influence on human life. These two domains operate on fundamentally different principles.</p>
                                    <p>While astrology can offer insights into an individual's personality traits, strengths, and weaknesses, it cannot predict specific events such as lottery wins. Winning the lottery is a matter of luck and probability, and astrology does not have the capacity to accurately predict or manipulate these outcomes.</p>
                                    <p>It is important to approach astrology with a realistic understanding of its limitations and use it as a tool for self-reflection, personal growth, and understanding rather than relying on it for predicting lottery winnings or similar outcomes.</p>

                                </div>
                            </div>
                        </div>
                        <div class="accordion-item1">
                            <div class="card-header" id="headingTwo12">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block collapsed acc_btn text-justify" type="button" data-toggle="collapse" data-target="#collapseTwo12" aria-expanded="false" aria-controls="collapseTwo12">
                                        <p > <strong>What is Lal Kitab? </strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseTwo12" class="collapse" aria-labelledby="headingTwo12" data-parent="#accordionExample">
                                <div class="card-body">
                                    <p>Lal Kitab is a book on Hindu astrology and palmistry written in the Urdu language during the 19th Century. It consists of five books and is also known as the Red Book. Lal Kitab astrology is based on the principles of Samudrika Shastra.</p>
                                    <p>The Lal Kitab contains poetic verses that provide recommended remedies, known as upayas or farmanns. It is believed to have originated from Persian literature and astrology. Lal Kitab remedies are simple and helpful for addressing planetary afflictions in a person's birth chart or horoscope. Over time, Lal Kitab astrology has become a part of the folklore in Northern India and Pakistan.</p>

                                </div>
                            </div>
                        </div>
                        <div class="accordion-item1">
                            <div class="card-header" id="headingThree13">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block collapsed acc_btn" type="button" data-toggle="collapse" data-target="#collapseThree13" aria-expanded="false" aria-controls="collapseThree13">
                                        <p > <strong>What makes Lal Kitab unique compared to Vedic astrology?</strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseThree13" class="collapse" aria-labelledby="headingThree13" data-parent="#accordionExample">
                                <div class="card-body">
                                    <img src="" alt="" width={'100%'} />
                                    <p>Lal Kitab is a unique system of astrology that uses planetary positions and aspects to offer remedies for various life problems. It differs from traditional Vedic astrology by considering astrology and palmistry as separate phenomena. Lal Kitab emphasizes the relationship between astrology and palm reading, explaining how the planets in one's horoscope are reflected in the lines of their palm. This approach provides an effective way to mitigate the negative effects of the planets on a person's life.</p>
                                    <p>Lal Kitab shares some similarities with Vedic astrology, including concepts like Graha doshas. It is considered a simplified version of Vedic astrology condensed into five volumes.</p>

                                </div>
                            </div>
                        </div>
                        <div class="accordion-item1">
                            <div class="card-header" id="headingThree14">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block collapsed acc_btn text-justify" type="button" data-toggle="collapse" data-target="#collapseThree14" aria-expanded="false" aria-controls="collapseThree14">
                                        <p > <strong>Why is Lal Kitab popular?</strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseThree14" class="collapse" aria-labelledby="headingThree14" data-parent="#accordionExample">
                                <div class="card-body">
                                    <img src="" alt="" width={'100%'} />
                                    <p>Lal Kitab is widely popular in Pakistan and Northern India because it is written in Urdu and Hindi. However, its popularity is not limited to these regions. Lal Kitab is gaining recognition as a valuable source of remedies for complex problems.</p>
                                    <p>Lal Kitab simplifies Vedic astrology remedies and presents them as practical solutions for people facing difficult life situations. It distills the essence of Vedic astrology and offers accessible remedies for individuals seeking guidance.</p>

                                </div>
                            </div>
                        </div>
                        <div class="accordion-item1">
                            <div class="card-header" id="headingThree15">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block collapsed acc_btn text-justify" type="button" data-toggle="collapse" data-target="#collapseThree15" aria-expanded="false" aria-controls="collapseThree15">
                                        <p > <strong>Difference between Vedic Astrology and Lal-Kitab Astrology?</strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseThree15" class="collapse" aria-labelledby="headingThree15" data-parent="#accordionExample">
                                <div class="card-body">
                                    <img src="" alt="" width={'100%'} />
                                    <p>The Lal Kitab and Vedic Astrology have some important differences. Vedic Astrology was developed by wise sages through extensive research, while the Lal Kitab originated from Vedic Astrology but has its own unique theories. Vedic Astrology is written in Sanskrit, while the Lal Kitab is written in Persian/Urdu.</p>
                                    <p>Vedic Astrology focuses more on predicting the future, while the Lal Kitab not only predicts but also provides remedies to overcome negative situations in life. Vedic Astrology is more theoretical, while the Lal Kitab is more practical in nature.</p>
                                    <p>In the Lal Kitab, houses (bhavas) are given more importance than planets. Although the position of a planet in a house remains the same, the signs change according to "Kaal Purush." In Vedic Astrology, each person has a different ascendant based on the rising zodiac sign, but in the Lal Kitab, everyone's ascendant is considered Aries, the second house is Taurus, and so on. Also, the Lal Kitab does not consider the movement of planets.</p>
                                    <p>In Vedic Astrology, the moon's position in a person's natal chart is significant, but in the Lal Kitab, planets are categorized as malefic or beneficial. The Lal Kitab emphasizes correcting karma from past lives through the dos and don'ts of the present life for a peaceful and successful future.</p>
                                    <p>The mathematical calculations in Vedic Astrology and the Lal Kitab also differ. Vedic Astrology makes predictions based on vargh, navmasha, and dashamsha kundli, while the Lal Kitab relies on andhi and nabalig kundli for predictions.</p>
                                    <p>Both Vedic Astrology and the Lal Kitab offer remedies, but Vedic Astrology's remedies often involve extensive rituals such as traveling to holy places, wearing specific gemstones, and performing long ceremonies. On the other hand, the Lal Kitab provides simpler remedies.</p>
                                    <p>Lal Kitab does not name planets based on their positions, whereas Vedic Astrology does. Lal Kitab has a strong connection to palmistry and combines astrology with it, while Vedic Astrology follows ancient astrological methods.</p>
                                    <p>In Vedic Astrology, the houses are fixed while the planets are not, but in the Lal Kitab, both houses and planets are fixed.</p>
                                    <p>The remedies for weak planets differ in Vedic Astrology and the Lal Kitab. For example, if the moon is weak, Vedic Astrology suggests respecting one's mother, keeping pets, and avoiding solitude. In contrast, the Lal Kitab recommends using silver utensils and jewelry, sleeping with a crystal under the pillow, and refraining from donating to educational institutions or offering free education to someone.</p>
                                    <p>For the sun, Vedic Astrology suggests offering water to the rising sun in a copper vessel, while the Lal Kitab suggests showing utmost respect to one's father.</p>
                                    <p>Overall, the Lal Kitab is a part of Vedic Astrology but is less focused on rituals and more practical. It places significant importance on palmistry, which is not the case in Vedic Astrology. In Vedic Astrology, the horoscope is based on zodiac signs (rashi), while the Lal Kitab considers houses instead.</p>

                                </div>
                            </div>
                        </div>
                        <div class="accordion-item1">
                            <div class="card-header" id="headingThree16">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block collapsed acc_btn text-justify" type="button" data-toggle="collapse" data-target="#collapseThree16" aria-expanded="false" aria-controls="collapseThree16">
                                        <p > <strong>What are the remedies of Lal Kitab Remedies/Lal Kitab Upay</strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseThree16" class="collapse" aria-labelledby="headingThree16" data-parent="#accordionExample">
                                <div class="card-body">
                                    <img src="" alt="" width={'100%'} />
                                    <p>The Lal Kitab provides remedies to counteract the negative effects of malefic planets. These remedies are known for being easy, affordable, and highly effective. People believe that Lal Kitab remedies are infallible and provide quick results. They are especially suitable for our current time, known as Kaliyuga, where traditional methods like mantras, rituals, and ceremonies have become challenging.</p>
                                    <p>The remedies are simple, such as throwing something in running water or placing something in your home. However, it's important to be cautious because these remedies can backfire if not studied and performed correctly. If you notice any negative side effects, it is advisable to stop performing the remedies immediately. Therefore, it is essential to approach Lal Kitab consultancy with care and take proper guidance.</p>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item1">
                            <div class="card-header" id="headingThree17">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block collapsed acc_btn text-justify" type="button" data-toggle="collapse" data-target="#collapseThree17" aria-expanded="false" aria-controls="collapseThree17">
                                        <p > <strong>What is Kundali?</strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseThree17" class="collapse" aria-labelledby="headingThree17" data-parent="#accordionExample">
                                <div class="card-body">
                                    <img src="" alt="" width={'100%'} />
                                    <p>Kundali is a special chart that shows information about a person based on their birth date, time, and location. It is also known as a Birth Horoscope. The Kundali is made using the Vedic Astrology System, and it shows the positions of the planets at the time of someone's birth, including the Sun, Moon, and other important aspects. Astrologers use Kundali to understand a person's personality, potential, past, present, and future. It is important in India to compare the Kundalis of potential partners before marriage to see if they are astrologically compatible.</p>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item1">
                            <div class="card-header" id="headingThree18">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block collapsed acc_btn text-justify" type="button" data-toggle="collapse" data-target="#collapseThree18" aria-expanded="false" aria-controls="collapseThree18">
                                        <p > <strong>How is a Kundali made?</strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseThree18" class="collapse" aria-labelledby="headingThree18" data-parent="#accordionExample">
                                <div class="card-body">
                                    <img src="" alt="" width={'100%'} />
                                    <p>To create a Kundali, an astrologer calculates the time of birth and determines the Ascendant or Rising Sign of the person. The Kundali is divided into 12 Houses, with the First House being the Ascendant. These Houses represent different aspects of life. The movement of planets through these Houses at specific times is analysed by trained astrologers. The positions of the planets in the Houses indicate various events and possibilities.</p>
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item1">
                            <div class="card-header" id="headingThree19">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block collapsed acc_btn text-justify" type="button" data-toggle="collapse" data-target="#collapseThree19" aria-expanded="false" aria-controls="collapseThree19">
                                        <p > <strong>What is needed to make a Kundali?</strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseThree19" class="collapse" aria-labelledby="headingThree19" data-parent="#accordionExample">
                                <div class="card-body">
                                    <img src="" alt="" width={'100%'} />
                                    <p>By examining your Kundali, an astrologer can predict your future and provide guidance on improving your life. They can suggest remedies to overcome difficulties based on the information in your chart. Your Kundali also reveals insights about your personality, finances, career, health, relationships, and other aspects of life. It can help you determine the best academic subjects and career path for your desired success. You can also learn about your lucky planets, days, colours, numbers, strengths, and weaknesses through your Kundali.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='faqs_card'>
                    <div class="accordion" id="accordionExample1">
                           <div class="accordion-item1">
                            <div class="card-header" id="headingThree20">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block collapsed acc_btn text-justify" type="button" data-toggle="collapse" data-target="#collapseThree20" aria-expanded="false" aria-controls="collapseThree20">
                                        <p > <strong>What is the difference between Kundali generated from software and handwritten Kundali?</strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseThree20" class="collapse" aria-labelledby="headingThree20" data-parent="#accordionExample1">
                                <div class="card-body">
                                    <img src="" alt="" width={'100%'} />
                                    <p>In today's world, where bad things happen often and happiness seems like a distant dream, we often turn to Kundali for a little bit of hope. But now the question is, should we rely on online software or handmade Kundali?</p>
                                    <p>Let's understand the difference between the two: handmade Kundali and software-designed Kundali.</p>
                                    <p>Software-Designed Kundali:</p>
                                    <ul>
                                        <li><p>Software Kundali is created by specific computer programs and websites.</p></li>
                                        <li><p>It uses the birth date and time to calculate the horoscope based on sun signs or zodiac signs.</p></li>
                                        <li><p>The accuracy of software Kundali is not very high, and it's not recognized by professional astrologers.</p></li>
                                        <li><p>The software generates Kundali without the input of experienced astrologers.</p></li>
                                        <li><p>Software Kundali doesn't provide answers to additional questions or confusion.</p></li>
                                        <li><p>You can only ask one question at a time and may have to wait in an online queue for a long time.</p></li>
                                        <li><p>No expert has proven these software Kundalis to be reliable.</p></li>
                                        <li><p>There is no software platform that can address all your doubts satisfactorily.</p></li>

                                    </ul>
                                    <p>Handmade Kundali:</p>
                                    <ul>
                                        <li><p>Handmade Kundali is manually calculated by skilled astrologers based on the sun or zodiac signs.</p></li>
                                        <li><p>Expert astrologers provide genuine and authentic handmade Kundali.</p></li>
                                        <li><p>Handmade Kundali includes accurate descriptions and measurements based on birth date, place, and time.</p></li>
                                        <li><p>It considers the positions of the sun, moon, planets, aspects, and angles at the time of birth.</p></li>
                                        <li><p>Handmade Kundali not only predicts the future but also helps in solving problems and dealing with situations.</p></li>
                                        <li><p>Astrologers can guide you through offline and online reports based on handmade Kundali.</p></li>
                                        <li><p>Handmade Kundali is considered a reliable approach to understanding what is good and what is not.</p></li>
                                        <li><p>You can trust the predictions and calculations made by skilled astrologers for your handmade Kundali.</p></li>
                                        <li><p>Handmade Kundali is a genuine practice in Hinduism and other religions to predict the future and economic growth.</p></li>
                                        <li><p>Skilled astrologers have studied and mastered their specific fields to provide the best results through handmade Kundali.</p></li>

                                    </ul>
                                    <p>So, if you want accurate and reliable results, handmade Kundali is the way to go. Skilled astrologers can help you understand your obstacles and provide guidance based on your handmade Kundali.</p>
                                </div>
                            </div>
                        </div>   <div class="accordion-item1">
                            <div class="card-header" id="headingThree21">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block collapsed acc_btn text-justify" type="button" data-toggle="collapse" data-target="#collapseThree21" aria-expanded="false" aria-controls="collapseThree21">
                                        <p > <strong>Kundali generated by the software can be trusted or not?</strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseThree21" class="collapse" aria-labelledby="headingThree21" data-parent="#accordionExample1">
                                <div class="card-body">
                                    <img src="" alt="" width={'100%'} />
                                    <p>The Kundali generated by software is very accurate when it comes to the placement of planets. It's like having a computer do all the calculations instead of a person. A skilled astrologer may take hours to create a detailed Kundali, while software can do it in a few clicks. Both work on the same principle, but the machine is faster than a human.</p>
                                    <p>However, the predictions made by software or online Kundalis are based on general planet placements and not on their specific positions, aspects, or other factors. This means that their forecasts are not very accurate. The software might predict the same future for different people with completely different characteristics. It's not the program's fault because even a skilled astrologer would find it difficult to analyze every aspect of the Kundali. So, online Kundalis is useful for knowing the position of your planets, but not for predicting their outcomes.</p>
                                    <p>When it comes to the mathematical calculations of planet placements, the web software provides accurate information. However, it's always a good idea to double-check these calculations manually. But predicting the future and events requires a lot of understanding and interpretation, which a program cannot do. The software has its limitations, but it's a part of our lives and will continue to improve in the future.</p>
                                </div>
                            </div>
                        </div>   <div class="accordion-item1">
                            <div class="card-header" id="headingThree22">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block collapsed acc_btn text-justify" type="button" data-toggle="collapse" data-target="#collapseThree22" aria-expanded="false" aria-controls="collapseThree22">
                                        <p > <strong>How Can I Get a Perfect Life Partner with Kundali Matching Services?</strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseThree22" class="collapse" aria-labelledby="headingThree22" data-parent="#accordionExample1">
                                <div class="card-body">
                                    <img src="" alt="" width={'100%'} />
                                    <p>Marriage is a sacred practice in Hindu society, and the Kundali or horoscope plays a significant role in it. The Kundali reflects the positions of planets throughout a person's life.</p>
                                    <p>According to astrology, when a man and a woman get married, their luck, fate, and destiny become intertwined. If the couple is astrologically compatible, they are believed to have good luck and blessings in their married life. However, if there is a lack of compatibility, challenges may arise.</p>
                                    <p>This is where Kundali matching comes in. Kundali matching analyzes the planets and their positions between two people to determine if they are compatible.</p>
                                    <p>How can I match my Kundali with my name and birthdate?</p>
                                    <p>Kundali matching by name and birthdate is done using marital horoscope software as part of Guna Milan. There are 36 different Gunas or traits that are considered. The more compatible the couple's Gunas are, the higher the chances of a happy marriage. Kundali matching also takes horoscope compatibility into account, which is based on names and birthdates to assess the compatibility of traits or Gunas between the couple.</p>
                                    <p>The names and birthdates of the bride and groom are combined to determine the matching Gunas according to Vedic astrology.</p>
                                    <p>The importance of Kundali matching software</p>
                                    <p>Kundali Milan software is a computer program that automates the process of matching Kundalis. It makes it easier for astrologers or individuals to analyze and compare the charts.</p>
                                    <p>The significance of Kundali software lies in its ability to calculate compatibility quickly and accurately. It considers various astrological factors such as birth dates, times, and locations to identify potential areas of conflict and compatibility between the individuals. It also provides insights into their personalities, strengths, and weaknesses.</p>
                                    <p>Kundali matching software for marriage horoscope by date of birth</p>
                                    <p>There are several astrology software programs available that can generate marriage horoscopes based on an individual's date of birth. Here are a few popular ones:</p>
                                    <ul>
                                        <li><p>Astro-Vision LifeSign Mini: This software provides detailed marriage horoscopes based on the birth details of the individuals. It predicts compatibility, finances, children, and more.</p></li>
                                        <li><p>Kundali 7: Another popular software that generates marriage horoscopes based on the Vedic astrology system. It offers detailed predictions for compatibility, health, and finances, and provides Kundali name-matching services.</p></li>
                                        <li><p>Janus: A professional-level astrology software that generates detailed marriage horoscopes based on various astrological factors. It predicts compatibility, family life, finances, and more.</p></li>
                                        <li><p>Time Passages: This software combines Western and Vedic astrology systems to generate marriage horoscopes. It offers predictions for compatibility, finances, and more.</p></li>
                                        <li><p>My Kundali Milan Software: This software assesses the compatibility of future marriage partners from psychological, emotional, and biological perspectives. It considers longevity, mental compatibility, health, financial stability, and separation possibilities.</p></li>
                                    </ul>
                                    <p>It is important to note that the accuracy and usefulness of these astrology software programs may vary. It is also crucial to consider multiple factors and not rely solely on astrology when making important life decisions like marriage or partnership.</p>
                                </div>
                            </div>
                        </div>   <div class="accordion-item1">
                            <div class="card-header" id="headingThree23">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block collapsed acc_btn text-justify" type="button" data-toggle="collapse" data-target="#collapseThree23" aria-expanded="false" aria-controls="collapseThree23">
                                        <p > <strong>Embracing Favorable Choices: Name Selection and Color Symbolism</strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseThree23" class="collapse" aria-labelledby="headingThree23" data-parent="#accordionExample1">
                                <div class="card-body">
                                    <img src="" alt="" width={'100%'} />
                                    <p>When it comes to making choices, we often seek what is favorable and auspicious for ourselves and our loved ones. From selecting an ideal name for a newborn child to choosing colors that align with our personal energies, these decisions can impact our lives in subtle yet meaningful ways. In this blog, we will explore the significance of favorable choices, particularly in the realms of name selection for newborns and the symbolism of colors.</p>
                                </div>
                            </div>
                        </div>   <div class="accordion-item1">
                            <div class="card-header" id="headingThree24">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block collapsed acc_btn text-justify" type="button" data-toggle="collapse" data-target="#collapseThree24" aria-expanded="false" aria-controls="collapseThree24">
                                        <p > <strong>Name Selection for a Newborn Child:</strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseThree24" class="collapse" aria-labelledby="headingThree24" data-parent="#accordionExample1">
                                <div class="card-body">
                                    <img src="" alt="" width={'100%'} />
                                    <p>Choosing a name for a newborn child is an important decision that can shape their identity and influence their life's journey. While the ultimate choice remains a personal one, considering certain factors can contribute to a favorable name selection:</p>
                                    <ol type='a'>
                                        <li>
                                            <p><strong>Numerology: </strong>Numerology, the study of numbers and their vibrational energies, can guide name selection. Each letter corresponds to a specific numerical value, and by calculating the overall sum, a numerologist can provide insights into the energy and potential influences associated with a name.</p>
                                        </li>
                                        <li>  <p><strong>Cultural and Family Traditions:</strong>  Many families choose names that honor cultural or familial traditions. Such names can carry a sense of identity, heritage, and connection to one's roots, adding a favorable and meaningful element to the child's life</p>
                                        </li>
                                        <li>   <p><strong>Personal Significance: </strong>Consider the significance of certain names based on personal beliefs, aspirations, or spiritual practices. Some parents may choose names associated with qualities they hope their child will embody or names that hold personal significance to their own journey</p>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>   <div class="accordion-item1">
                            <div class="card-header" id="headingThree25">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block collapsed acc_btn text-justify" type="button" data-toggle="collapse" data-target="#collapseThree25" aria-expanded="false" aria-controls="collapseThree25">
                                        <p > <strong>The Symbolism of Colors:</strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseThree25" class="collapse" aria-labelledby="headingThree25" data-parent="#accordionExample1">
                                <div class="card-body">
                                    <img src="" alt="" width={'100%'} />
                                    <p>Colors have a profound impact on our emotions, energy levels, and overall well-being. Different colors carry distinct symbolism and can evoke various responses. Understanding color symbolism can help us make favorable choices in our surroundings, clothing, and daily lives. Here are a few examples:</p>
                                    <ol type='a'>
                                        <li><p><strong>Red:</strong> Associated with energy, passion, and strength, red can stimulate action and confidence. It symbolizes vitality and courage and is often used to ignite motivation and ambition.</p></li>
                                        <li><p><strong>Blue: </strong>A color representing calmness, tranquility, and clarity, blue can promote relaxation, peace, and communication. It is often associated with trust, integrity, and self-expression.</p></li>
                                        <li><p><strong>Green:</strong> Symbolizing growth, harmony, and balance, green represents nature and fertility. It is known for its soothing and healing properties, making it a favorable choice for creating a peaceful environment.</p></li>
                                        <li><p><strong>Yellow:</strong> Radiating warmth, positivity, and optimism, yellow can uplift moods and inspire creativity. It symbolizes intellect, happiness, and personal power, making it an ideal choice for enhancing productivity and focus</p></li>
                                        <li><p><strong>Purple:</strong> Associated with spirituality, intuition, and imagination, purple represents wisdom and mystery. It can promote deep introspection, spiritual growth, and connection with the divine.</p></li>
                                        <li><p><strong>White:</strong>Symbolizing purity, innocence, and clarity, white is often associated with new beginnings and fresh starts. It represents simplicity and can create a sense of calm and peace in one's surroundings.</p></li>

                                    </ol>
                                </div>
                            </div>
                        </div>   <div class="accordion-item1">
                            <div class="card-header" id="headingThree26">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block collapsed acc_btn text-justify" type="button" data-toggle="collapse" data-target="#collapseThree26" aria-expanded="false" aria-controls="collapseThree26">
                                        <p > <strong>Individual Color Preferences:</strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseThree26" class="collapse" aria-labelledby="headingThree26" data-parent="#accordionExample1">
                                <div class="card-body">
                                    <img src="" alt="" width={'100%'} />
                                    <p>While color symbolism can provide general guidance, individual color preferences play a significant role in choosing favorable colors. Each person has unique energy and resonance with certain colors. It's important to listen to your intuition and pay attention to how different colors make you feel. Trusting your innate sense of attraction and repulsion can lead to choices that align with your personal energies and preferences.</p>
                                </div>
                            </div>
                        </div>   <div class="accordion-item1">
                            <div class="card-header" id="headingThree27">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block collapsed acc_btn text-justify" type="button" data-toggle="collapse" data-target="#collapseThree27" aria-expanded="false" aria-controls="collapseThree27">
                                        <p > <strong>Harmonizing Colors with Personal Energy:</strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseThree27" class="collapse" aria-labelledby="headingThree27" data-parent="#accordionExample1">
                                <div class="card-body">
                                    <img src="" alt="" width={'100%'} />
                                    <p>In addition to considering color symbolism and personal preferences, harmonizing colors with your personal energy can contribute to a favorable choice. Each individual has a unique energetic vibration, and certain colors can complement and amplify these energies. Meditation, mindfulness, and self-reflection can help you attune to your inner energy and determine which colors resonate most strongly with your being.</p>
                                </div>
                            </div>
                        </div>   <div class="accordion-item1">
                            <div class="card-header" id="headingThree28">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block collapsed acc_btn text-justify" type="button" data-toggle="collapse" data-target="#collapseThree28" aria-expanded="false" aria-controls="collapseThree28">
                                        <p > <strong>Seeking Professional Guidance:</strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseThree28" class="collapse" aria-labelledby="headingThree28" data-parent="#accordionExample1">
                                <div class="card-body">
                                    <img src="" alt="" width={'100%'} />
                                    <p>If you find it challenging to determine favorable colors or names on your own, consulting with professionals can provide valuable insights and assistance. Numerologists can analyze the numerical vibrations associated with different names, offering guidance based on your child's birth date and other factors. Color therapists or consultants can provide personalized assessments, considering your energy, personality, and specific goals, helping you make choices that align with your individual needs.</p>
                                    <p>Making favorable choices, such as selecting an ideal name for a newborn child or choosing colors that harmonize with our energy, can contribute to a sense of alignment, positivity, and well-being. Whether it's considering numerology, cultural traditions, personal significance, or color symbolism, the key is to listen to your intuition, respect your cultural and familial values, and create an environment that supports your individual journey. Remember, these choices are deeply personal and should ultimately reflect your own beliefs, aspirations, and desires.</p>
                                </div>
                            </div>
                        </div>   <div class="accordion-item1">
                            <div class="card-header" id="headingThree29">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block collapsed acc_btn text-justify" type="button" data-toggle="collapse" data-target="#collapseThree29" aria-expanded="false" aria-controls="collapseThree29">
                                        <p > <strong>Embarking on a Spiritual Journey: Unraveling Life's Mysteries</strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseThree29" class="collapse" aria-labelledby="headingThree29" data-parent="#accordionExample1">
                                <div class="card-body">
                                    <img src="" alt="" width={'100%'} />
                                    <p>The quest for spirituality and self-discovery is a deeply personal and transformative journey. As we navigate life's challenges and seek meaning, astrology can offer insights into our individual paths. In this blog, we will delve into the profound questions that often arise during a spiritual journey. From understanding planetary doshas to exploring past lives, finding life's purpose, and managing personal struggles, we will explore these topics through the lens of astrology and spiritual growth.</p>
                                </div>
                            </div>
                        </div>   <div class="accordion-item1">
                            <div class="card-header" id="headingThree30">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block collapsed acc_btn text-justify" type="button" data-toggle="collapse" data-target="#collapseThree30" aria-expanded="false" aria-controls="collapseThree30">
                                        <p > <strong>Exploring Planetary Doshas:</strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseThree30" class="collapse" aria-labelledby="headingThree30" data-parent="#accordionExample1">
                                <div class="card-body">
                                    <img src="" alt="" width={'100%'} />
                                    <p>Astrology acknowledges the influence of planetary energies on our lives, including the concept of doshas. Doshas occur when certain planets create challenging aspects in our birth charts. Consulting with an astrologer can provide valuable insights into any planetary doshas present in your chart and guide you on potential remedies or practices to balance these energies.</p>
                                </div>
                            </div>
                        </div>   <div class="accordion-item1">
                            <div class="card-header" id="headingThree31">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block collapsed acc_btn text-justify" type="button" data-toggle="collapse" data-target="#collapseThree31" aria-expanded="false" aria-controls="collapseThree31">
                                        <p > <strong>Understanding the Root of Misfortune:</strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseThree31" class="collapse" aria-labelledby="headingThree31" data-parent="#accordionExample1">
                                <div class="card-body">
                                    <img src="" alt="" width={'100%'} />
                                    <p>Misfortune can stem from various factors, including karmic patterns, past experiences, and current life choices. Astrology can provide a lens through which to explore these influences. By analyzing your birth chart, an astrologer can help identify potential areas of imbalance or lessons to be learned, empowering you to make conscious choices and navigate challenges with wisdom.</p>
                                </div>
                            </div>
                        </div>   <div class="accordion-item1">
                            <div class="card-header" id="headingThree32">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block collapsed acc_btn text-justify" type="button" data-toggle="collapse" data-target="#collapseThree32" aria-expanded="false" aria-controls="collapseThree32">
                                        <p > <strong>Embracing Success in Life:</strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseThree32" class="collapse" aria-labelledby="headingThree32" data-parent="#accordionExample1">
                                <div class="card-body">
                                    <img src="" alt="" width={'100%'} />
                                    <p>Success is a subjective concept, and it can encompass different aspects such as personal fulfillment, career achievements, or spiritual growth. Astrology can offer guidance by identifying your inherent talents, strengths, and favorable planetary positions in your birth chart. By aligning your actions with these insights, you can harness your potential and cultivate success in various areas of life.</p>
                                </div>
                            </div>
                        </div>   <div class="accordion-item1">
                            <div class="card-header" id="headingThree33">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block collapsed acc_btn text-justify" type="button" data-toggle="collapse" data-target="#collapseThree33" aria-expanded="false" aria-controls="collapseThree33">
                                        <p > <strong>Unveiling Past Lives:</strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseThree33" class="collapse" aria-labelledby="headingThree33" data-parent="#accordionExample1">
                                <div class="card-body">
                                    <img src="" alt="" width={'100%'} />
                                    <p>The idea of past lives suggests that our current existence is intertwined with previous incarnations. While exploring specific details of past lives can be challenging, astrology can provide glimpses into karmic patterns and unresolved issues carried forward from previous experiences. Through introspection, meditation, or guidance from an experienced past-life regression therapist, you may gain deeper insights into your soul's journey.</p>
                                </div>
                            </div>
                        </div> 
                          <div class="accordion-item1">
                            <div class="card-header" id="headingThree34">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block collapsed acc_btn text-justify" type="button" data-toggle="collapse" data-target="#collapseThree34" aria-expanded="false" aria-controls="collapseThree34">
                                        <p > <strong>Learning Life Lessons:</strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseThree34" class="collapse" aria-labelledby="headingThree34" data-parent="#accordionExample1">
                                <div class="card-body">
                                    <img src="" alt="" width={'100%'} />
                                    <p>Each individual has unique lessons to learn during their lifetime. Astrology can reveal areas of focus and growth opportunities based on planetary placements and aspects in your birth chart. Reflecting on these insights can help you embrace life's lessons, fostering personal development and spiritual evolution.</p>
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item1">
                            <div class="card-header" id="headingThree35">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block collapsed acc_btn text-justify" type="button" data-toggle="collapse" data-target="#collapseThree35" aria-expanded="false" aria-controls="collapseThree35">
                                        <p > <strong>Discovering Life's Purpose:</strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseThree35" class="collapse" aria-labelledby="headingThree35" data-parent="#accordionExample1">
                                <div class="card-body">
                                    <img src="" alt="" width={'100%'} />
                                    <p>Finding one's life purpose is a profound quest that astrology can illuminate. By examining planetary positions, aspects, and the alignment of different houses in your birth chart, an astrologer can offer insights into your inherent talents, passions, and potential paths. This guidance can help you align your actions with your higher purpose, leading to a fulfilling and meaningful life.</p>
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item1">
                            <div class="card-header" id="headingThree36">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block collapsed acc_btn text-justify" type="button" data-toggle="collapse" data-target="#collapseThree36" aria-expanded="false" aria-controls="collapseThree36">
                                        <p > <strong>Envisioning Your Life in a Year:</strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseThree36" class="collapse" aria-labelledby="headingThree36" data-parent="#accordionExample1">
                                <div class="card-body">
                                    <img src="" alt="" width={'100%'} />
                                    <p>Astrology provides a tool to forecast potential trends and energies for the future. By examining transits, progressions, and planetary movements, an astrologer can offer insights into the general themes and opportunities that may unfold in your life in the upcoming year. However, it's important to remember that free will and personal choices play a significant role in shaping our experiences.</p>
                                     </div>
                            </div>
                        </div>
                        <div class="accordion-item1">
                            <div class="card-header" id="headingThree37">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block collapsed acc_btn text-justify" type="button" data-toggle="collapse" data-target="#collapseThree37" aria-expanded="false" aria-controls="collapseThree37">
                                        <p > <strong>Advancing in Your Spiritual Journey:</strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseThree37" class="collapse" aria-labelledby="headingThree37" data-parent="#accordionExample1">
                                <div class="card-body">
                                    <img src="" alt="" width={'100%'} />
                                    <p>Advancement in the spiritual journey involves personal growth, self-reflection, and aligning with higher consciousness. While astrology can offer guidance, true spiritual progress comes from within. Practices such as meditation, mindfulness, self-inquiry, and connecting with spiritual teachings can deepen your spiritual journey and bring about transformation.</p>
                                     </div>
                            </div>
                        </div>
                        <div class="accordion-item1">
                            <div class="card-header" id="headingThree38">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block collapsed acc_btn text-justify" type="button" data-toggle="collapse" data-target="#collapseThree38" aria-expanded="false" aria-controls="collapseThree38">
                                        <p > <strong>Overcoming Misfortune:</strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseThree38" class="collapse" aria-labelledby="headingThree38" data-parent="#accordionExample1">
                                <div class="card-body">
                                    <img src="" alt="" width={'100%'} />
                                    <p>Misfortunes are often part of life's ups and downs, and astrology can provide insights into the potential timing and nature of challenging periods. However, it's essential to understand that astrology is not a definitive predictor of events. By cultivating resilience, self-care, and seeking support from spiritual practices, therapists, or mentors, you can navigate challenging times and find inner strength.</p>
                                      </div>
                            </div>
                        </div>
                        <div class="accordion-item1">
                            <div class="card-header" id="headingThree39">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block collapsed acc_btn text-justify" type="button" data-toggle="collapse" data-target="#collapseThree39" aria-expanded="false" aria-controls="collapseThree39">
                                        <p > <strong>Managing Struggles and Personal Traits:</strong></p>
                                        <img src={arrowBtn} alt='arrow btn' width={'20px'} />
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseThree39" class="collapse" aria-labelledby="headingThree39" data-parent="#accordionExample1">
                                <div class="card-body">
                                    <img src="" alt="" width={'100%'} />
                                    <p>Astrology can shed light on personal struggles, including difficulty with authority figures, anxiety, hesitancy to speak up, or aggression. By examining planetary positions and aspects, an astrologer can offer insights into potential underlying influences. Remedies such as gemstone recommendations, spiritual practices, or energy healing modalities may provide support in managing and transforming these traits.</p>
        </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}