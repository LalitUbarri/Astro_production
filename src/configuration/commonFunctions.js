import apis from "./apis";
import { Helmet } from 'react-helmet-async';
import vrat from '../images/New-images/Rectangle57.png'
import Rath from '../images/New-images/Rectangle59.png'
import Yogini from '../images/New-images/Rectangle61.png'
import astroImg1 from '../images/New-images/Rectangle-129.png'
import astroImg2 from '../images/New-images/Rectangle-131.png'
import astroImg3 from '../images/New-images/Rectangle-133.png'
import astroImg4 from '../images/New-images/Rectangle-138.png'

// import Blogbanner from '../images/blogs/dummy.png';
// import Blog1 from '../images/pexels-rdne-stock-project-6806402.jpg';

import blog_tile_1 from '../images/blogs/Impact.png';
import blog_tile_2 from '../images/blogs/Venus Transit 2023 affect your Zodiac Sign.png';
import blog_tile_3 from '../images/blogs/The Effect of Mercury Retrograde on All Signs.png';
import blog_tile_4 from '../images/blogs/Mars-in-leo.jpg';
import blog_tile_5 from '../images/blogs/understanding-the-moon.jpg';
import blog_tile_6 from '../images/blogs/5zodic-signs.jpg';
import blog_tile_7 from '../images/blogs/tarrot-card-love.jpg';
import blog_tile_8 from '../images/blogs/mars-to-venus-impact.jpg';
import blog_tile_9 from '../images/blogs/factor-.jpg';
import blog_tile_10 from '../images/blogs/Zodiac-lucky-Number.jpg';
import blog_tile_11 from '../images/blogs/number-of-poer.jpg';
import blog_tile_12 from '../images/blogs/gms.jpg';
import blog_tile_13 from '../images/blogs/nirjala.jpg';
import blog_tile_14 from '../images/blogs/guru.jpg';
import blog_tile_15 from '../images/blogs/mangal (1).jpg';
import blog_tile_16 from '../images/blogs/2023 (1).jpg';
import blog_tile_17 from '../images/blogs/om-1.jpg';
import blog_tile_18 from '../images/blogs/gow.jpg';
import blog_tile_19 from '../images/blogs/mansik (1).jpg';
import blog_tile_20 from '../images/blogs/luxuru.jpg';
import blog_tile_21 from '../images/blogs/jy.jpg';
import blog_tile_22 from '../images/blogs/shuk.jpg';

import blog1 from '../images/blogs/Impact of Lunar Eclipse on Zodiac Signs (2).png';
import blog2 from '../images/blogs/Venus-Transit-2023-affect-your-Zodiac.png';
import blog3 from '../images/blogs/The Effect of Mercury Retrograde on All Signs.png';
import blog4 from '../images/blogs/Mars-in-Leo-1.jpg';
import blog5 from '../images/blogs/Understanding-moon.jpg';
import blog6 from '../images/blogs/5-zodaic-signs.jpg';
import blog7 from '../images/blogs/decoding-love.jpg';
import blog8 from '../images/blogs/impact-of-Mars.jpg';
import blog9 from '../images/blogs/Factors-responsible.jpg';
import blog10 from '../images/blogs/zodic-luck-number.jpg';
import blog11 from '../images/blogs/Numerology-and-Mobile-Numbers.jpg';
import blog12 from '../images/blogs/Debunking-the-Mystery.jpg';
import blog13 from '../images/blogs/nirjala-ekadashi.jpg';
import blog14 from '../images/blogs/gruru.jpg';
import blog15 from '../images/blogs/mangal.jpg';
import blog16 from '../images/blogs/2023.jpg';
import blog17 from '../images/blogs/om.jpg';
import blog18 from '../images/blogs/gow-dan.jpg';
import blog19 from '../images/blogs/MANSIK.jpg';
import blog20 from '../images/blogs/shaadi.jpg';
import blog21 from '../images/blogs/jyo.jpg';
import blog22 from '../images/blogs/Shukar-ka.jpg';

// import blog11 from '../images/blogs/;

import Table from '../images/table.png';
import { APP_LANGUAGE, APP_NAME, APP_VERSION, CAMPAIGN_ID, CHANNEL, CHANNEL_NAME, CLIENT_ID, DEVICE_ID, DEVICE_TYPE, SUBSIDISED_ID } from "./constants";

/*
export const CHANNEL = "wap";
export const DEVICE_ID = "ff52af0e54986b3a";
export const DEVICE_TYPE="mobile";
export const DEVICE_NAME="WAP";
export const APP_NAME = "astrologer";
export const CLIENT_ID="yBMYafcnQ/OZY70+m7WwWA==";
export const CAMPAIGN_ID= 1;
export const APP_VERSION=1;
export const CHANNEL_NAME="api";
export const APP_LANGUAGE="en";
*/
export function getCommonHeaders() {
  var headers = {};
  headers = {
    'Content-Type': 'application/json',
    // 'X-FORWARDED-FOR':'127.0.0.1',
    'clientId': 'yBMYafcnQ/OZY70+m7WwWA==',
    'campaignId': '1',
    'deviceId': 'a1b2c3d4',
    'appName': 'astrology',
    'appVersion': '1',
    'channel': 'api',
    'channelName': 'android',
    //'appLanguage':APP_LANGUAGE,
    'deviceType': 'mobile',
    "countryCode": localStorage['selectedCountryCode'] ? localStorage['selectedCountryCode'] : '91',
    "msisdn": typeof localStorage['msisdn'] === 'undefined' ? 0 : localStorage['selectedCountryCode'] + localStorage["msisdn"],
    // "appLanguage": "en"
    "appLanguage": localStorage['selectedLanguage'] ? localStorage['selectedLanguage'] : "en"

  };

  return headers;
}


export function getCommonHeaders1() {
  var headers = {};

  headers = {
    'Content-Type': 'application/json',
    // 'X-FORWARDED-FOR':'127.0.0.1',
    'clientId': CLIENT_ID,
    'campaignId': CAMPAIGN_ID,
    'deviceId': DEVICE_ID,
    'appName': APP_NAME,
    'appVersion': APP_VERSION,
    'channel': CHANNEL,
    'channelName': CHANNEL_NAME,
    //'appLanguage':APP_LANGUAGE,
    'deviceType': DEVICE_TYPE,
    "countryCode": '',
    "msisdn": '',
    //"appLanguage": "en"
    "appLanguage": localStorage['selectedLanguage'] ? localStorage['selectedLanguage'] : "en"

  };

  return headers;
}
/*
export const getKeyValues=(keyArray)=>{

  var requestBody = {
    key: keyArray
  };

  return apis.getKeysValue(requestBody).then((response) => {
    var data = response.data;
    console.log(data);

    if (data.code == "2000") {
      let keysValueResponse= data.data;
      console.log("response getKeysValue ", keysValueResponse);
     

      return keysValueResponse;

     
    } else {
      console.log("ERROR", data.msg);
      return;
    }
  });
};
*/

export const getStaticValues = () => {

  var headers = getCommonHeaders();

  return apis.getStaticData(headers).then((response) => {

    var data = response.data;
    // console.log(data);

    if (data.code == "2000") {
      let staticValueResponse = data?.data;

      // console.log("staticdata is", staticValueResponse);
      let freeChatData = staticValueResponse ? staticValueResponse.find(item => item.id == SUBSIDISED_ID) : "";
      // console.log("response getStaticValues", freeChatData);
      return freeChatData;


    } else {
      console.log("ERROR", data.msg);
      return;
    }
  });
};
export function getDeviceId(force) {
  if (force || (typeof sessionStorage["DeviceId"] == 'undefined' || sessionStorage['DeviceId'] === '')) {
    sessionStorage["DeviceId"] = generateDeviceId();
  }
  return sessionStorage["DeviceId"];
}

function generateDeviceId() {
  var navigator_info = window.navigator;
  var screen_info = window.screen;
  var uid = navigator_info.mimeTypes.length;
  uid += navigator_info.userAgent.replace(/\D+/g, '');
  uid += navigator_info.plugins.length;
  uid += screen_info.height || '';
  uid += screen_info.width || '';
  uid += screen_info.pixelDepth || '';
  //console.log(uid);
  return uid.toString();
}

export function ScrollTop(scroll) {
  window.scrollTo({
    top: scroll,
    behavior: 'smooth'
  })
}

export function SEO({ title, keywords, description, name, type }) {
  return (
    <Helmet>
      { /* Standard metadata tags */}
      <title>{title}</title>
      <link rel="canonical" href={window.location.href} />
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      { /* End standard metadata tags */}
      { /* Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      { /* End Facebook tags */}
      { /* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content={type} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      { /* End Twitter tags */}
    </Helmet>
  )
}

export const festivalData = [
  {
    date: '13th Jan ',
    day: ' Friday ',
    festival: ' Lohri'
  },
  {
    date: '14th Jan ',
    day: ' Saturday ',
    festival: 'Pongal'
  },
  {
    date: '26th Jan',
    day: ' Thursday ',
    festival: ' Republic Day'
  },
  {
    date: '26th Jan',
    day: ' Thursday  ',
    festival: ' Vasant Panchami'
  },
  {
    date: '8th Mar',
    day: '  Wednesday ',
    festival: ' Holi'
  },
  {
    date: '22nd Mar',
    day: ' Wednesday ',
    festival: 'Gudi Padwa'
  },
  {
    date: '30th Mar',
    day: ' Thursday',
    festival: 'Ram Navami'
  },
  {
    date: '7th Apr',
    day: 'Friday ',
    festival: ' Good Friday'
  },
  {
    date: '9th Apr',
    day: ' Sunday ',
    festival: 'Easter Day'
  },
  {
    date: '14th Apr',
    day: ' Friday ',
    festival: 'Baisakhi'
  },
  {
    date: '22th Apr',
    day: ' Saturday',
    festival: 'Ramzan Id / Eid - ul - Fitr'
  },
  {
    date: '5th May',
    day: ' Friday ',
    festival: 'Buddha Purnima / Vesak'
  },
  {
    date: '30th May',
    day: ' Tuesday',
    festival: 'Ganga Dusshera'
  },
  {
    date: '20th Jun',
    day: 'Tuesday',
    festival: 'Rath Yatra'
  },
  {
    date: '29th Jun',
    day: 'Tuesday ',
    festival: 'Eid al - Adha'
  },
  {
    date: '29th July',
    day: 'Saturday',
    festival: 'Muharram'
  },
  {
    date: '15th Aug ',
    day: 'Tuesday',
    festival: 'Independence Day'
  },
  {
    date: '29th Aug ',
    day: ' Tuesday ',
    festival: 'Onam'
  },
  {
    date: '30th Aug',
    day: 'Wednesday ',
    festival: 'Raksha Bandhan'
  },
  {
    date: '7th Sept',
    day: ' Thursday ',
    festival: 'Janmashtami'
  },
  {
    date: '19th Sept ',
    day: 'Tuesday',
    festival: 'Ganesh Chaturthi'
  },
  {
    date: '2nd Oct',
    day: ' Monday ',
    festival: 'Gandhi Jayanti'
  },
  {
    date: '22nd Oct ',
    day: ' Sunday ',
    festival: 'Maha Ashtami'
  },
  {
    date: '23rd Oct ',
    day: 'Monday ',
    festival: 'Maha Navami'
  },
  {
    date: '24th Oct ',
    day: ' Tuesday ',
    festival: 'Dussehra'
  },
  {
    date: '12th Nov ',
    day: ' Sunday ',
    festival: 'Diwali / Deepavali'
  },
  {
    date: '14th Nov ',
    day: 'Tuesday ',
    festival: 'Bhai Dooj'
  },
  {
    date: '27th Nov ',
    day: ' Monday ',
    festival: 'Guru Nanak Jayanti'
  },
  {
    date: '25th Dec',
    day: ' Monday ',
    festival: 'Christmas'
  }
]

export const BlogData = [
  {
    id: 'abc',
    title: 'The Astrological Impact of the April 2023 Lunar Eclipse on Zodiac Signs',
    bannerImg: blog1,
    banner: blog_tile_1,
    date: 'April 08, 23',
    disc: 'Astrology has long been used to explore the potential influences of celestial events on our lives. One such event that captures our attention is a lunar eclipse. On April 2023, a lunar eclipse is set to occur, presenting a fascinating opportunity to delve into its potential effects on the zodiac signs. In this blog post, we will explore the implications of this celestial occurrence and how it may impact each zodiac sign.',
    text: <div> <p>Astrology has long been used to explore the potential influences of celestial events on our lives. One such event that captures our attention is a lunar eclipse. On April 2023, a lunar eclipse is set to occur, presenting a fascinating opportunity to delve into its potential effects on the zodiac signs. In this blog post, we will explore the implications of this celestial occurrence and how it may impact each zodiac sign.</p>

      <p>The lunar eclipse in April 2023 brings a wave of introspection for Aries individuals. They may find themselves reflecting on their personal goals and ambitions. It is an ideal time to reassess priorities and make necessary adjustments. A heightened sense of self-awareness empowers Aries to embark on new beginnings and pursue ventures that align with their true passions.</p>

      <p>The lunar eclipse prompts Taurus to focus on matters of the heart and personal relationships. It encourages them to evaluate the strength and stability of their partnerships. During this time, Taurus individuals may experience shifts in their emotional connections, leading to stronger bonds or, in some cases, the need for reevaluation and potential restructuring.</p>

      <p>Gemini's communication skills are amplified during the April 2023 lunar eclipse. It serves as an opportune time for expressing ideas, seeking knowledge, and engaging in meaningful conversations. Gemini individuals may find themselves at the center of social interactions, sharing their insights and embracing intellectual pursuits that enhance personal growth and understanding.</p>

      <p>Cancer individuals experience a significant focus on their personal well-being and inner emotional landscape during the lunar eclipse. This period encourages them to prioritize self-care and nurture their emotional needs. Engaging in therapeutic activities, establishing healthy boundaries, and taking time for introspection are essential for Cancer's overall sense of balance and harmony.</p>

      <p>The April 2023 lunar eclipse impacts Leo's creative energy, emphasizing self-expression and artistic endeavors. Leos may feel inspired to explore new artistic outlets, enhance their skills, or even showcase their talents to a wider audience. This celestial event fuels their passion, leading to exciting opportunities for personal growth and recognition.</p>

      <p>The lunar eclipse in April 2023 encourages Virgo individuals to focus on their home and family life. It prompts them to establish a stronger foundation and create a harmonious living space. Virgos may find themselves renovating, decluttering, or nurturing familial relationships, ensuring a stable and supportive environment for themselves and their loved ones.</p>

      <p>Libras experience an increased focus on communication and intellectual pursuits during the lunar eclipse. This period encourages them to express their ideas, engage in constructive discussions, and foster harmonious connections. Libras may find themselves drawn to partnerships that align with their values and enhance their personal growth through shared knowledge.</p>

      <p>The lunar eclipse in April 2023 shines a light on Scorpio's financial matters. It prompts them to reassess their monetary situation, review investments, and explore new avenues for financial growth. Scorpios may experience transformative shifts in their approach to money, leading to enhanced financial stability and a sense of empowerment.</p>

      <p>The lunar eclipse fuels Sagittarius' thirst for adventure and personal growth. It encourages them to broaden their horizons, embrace new experiences, and expand their knowledge. Sagittarians may find themselves embarking on exciting journeys, whether physical or intellectual, which enable them to gain a fresh perspective on life and ignite their innate curiosity.</p>

      <p>During the April 2023 lunar eclipse, Capricorns focus on their personal growth and self-image.</p>

    </div>
  },

  {
    id: 'abcd',
    title: 'How will Venus Transit 2023 affect your Zodiac Sign',
    bannerImg: blog2,
    banner: blog_tile_2,
    date: 'April 09, 23',
    disc: 'In 2023, one of the most anticipated astronomical events will take place, the transit of Venus. This rare event occurs when the planet Venus passes between the Earth and the Sun, appearing as a small black dot against the bright backdrop of the Sun.',
    text: <div> <p>In 2023, one of the most anticipated astronomical events will take place, the transit of Venus. This rare
      event occurs when the planet Venus passes between the Earth and the Sun, appearing as a small black
      dot against the bright backdrop of the Sun.</p>

      <h3>Venus Transit in Vedic Astrology</h3>

      <p>According to Vedic astrology, the planet Venus is considered to be the factor of love, luxury, beauty, and marital happiness. Venus travels from one zodiac sign to another at an interval of 23 days. The ruling
        planet of Libra and Taurus, Venus is the brightest planet if we discount the Sun and the Moon. In Vedic
        astrology, it represents beauty, love, fame, and luxury. The planet completes one circle around the Sun in about 225 days. But how long does Venus Transit take? Venus can stay in one sign for 23 to 60 days,
        depending on its motion. The outcome or the effects of transit depends on the house it takes place in.
        Depending on that, the pros and cons of the Venus transit affect everyone differently!</p>

      <h3>Venus Transit 2023: Dates and Time</h3>

      <p>Now we know how Venus transits affect us, it’s time to look at the Venus Transit dates for 2023.</p>

      <p>&nbsp;</p>
      <img src={Table} alt="table" width="100%" />
      <p>&nbsp;</p>

      <p>Since Venus’s transit to Gemini happened on May 02, 2023, currently, Venus is in Gemini. On May 30,
        2023, it will transit to Cancer.</p>

      <h3> Venus Transit Effects on Zodiac Sign 2023 </h3>

      <p>Venus, as mentioned before, is the ruling planet for Taurus and Libra. It is also an exalted planet
        in Pisces. Therefore, it will affect these signs the most, and many a time, in a positive way.
        However, every transit is different, and it will be different for each sign, too. Let’s see the
        impact of this transition on all the zodiac signs.</p>

      <p>As Venus is the planet of love, beauty, and harmony, its transit can bring about significant
        changes in our emotional and romantic lives. The 2023 transit will have a profound impact on
        our relationships, financial matters, and creative pursuits.</p>

      <p>During this transit, Venus will be moving through the sign of Capricorn, which is known for its
        practicality, responsibility, and disciplined nature. This transit will bring about a sense of
        seriousness and maturity in our approach to relationships and finances.</p>

      <p><strong>For the fire signs (Aries, Leo, and Sagittarius)</strong>, this transit will bring a focus on career and professional goals, with an increased need for stability and security. </p>

      <p><strong>The air signs (Gemini, Libra, and Aquarius) </strong>will feel a strong urge to communicate and connect with others, with a heightened sense of creativity and inspiration.</p>

      <p><strong>The earth signs (Taurus, Virgo, and Capricorn)</strong> will experience a sense of grounding and
        practicality, with a need for structure and stability in their personal and professional lives. </p>

      <p><strong>The water signs (Cancer, Scorpio, and Pisces)</strong> will feel a sense of emotional intensity and vulnerability, with a need to delve deeper into their innermost thoughts and feelings.</p>

      <h3> Remedies for the Venus Transit 2023 </h3>
      <p> To balance the effects of the Venus transit, it is recommended to perform certain remedies based on
        your zodiac sign. Here are some remedies that you can try:</p>
      <p> <strong>Aries:</strong> Focus on your breathing and practice meditation regularly.</p>
      <p><strong>Taurus:</strong> Donate to a charity or volunteer at a local organization.</p>
      <p><strong>Gemini:</strong> Practice mindfulness and focus on the present moment.</p>
      <p><strong>Cancer:</strong> Spend time in nature and connect with your inner self.</p>
      <p><strong>Leo:</strong>  Practice gratitude and count your blessings.</p>
      <p><strong>Virgo:</strong> Keep a journal and write down your thoughts and feelings.</p>
      <p><strong>Libra:</strong> Practice forgiveness and let go of any grudges.</p>
      <p><strong>Scorpio:</strong> Surround yourself with positive people and avoid negativity.</p>
      <p><strong>Sagittarius:</strong> Take up a new hobby or learn a new skill.</p>
      <p><strong>Capricorn:</strong> Practice self-care and prioritize your health.</p>
      <p><strong>Aquarius:</strong> Connect with your friends and family and spend quality time with them.</p>
      <p><strong>Pisces:</strong> Practice self-reflection and work on your personal growth.</p>
      <p> In conclusion, the Venus transit of 2023 is a significant astrological event that will have a profound
        impact on all zodiac signs. By practicing the recommended remedies based on your zodiac sign, you can
        balance the effects of this transit and create a positive and fulfilling experience. Remember to stay
        grounded, focus on self-care, and surround yourself with positivity during this time.</p>
    </div>
  },

  {
    id: "abcde",
    title: 'The Effect of Mercury Retrograde on All Signs',
    bannerImg: blog3,
    banner: blog_tile_3,
    date: 'April 10, 23',
    disc: "If you're feeling a bit off and out of sync lately, don't worry, it may be due to Mercury retrograde. When the planet of communication and cognitive function appears to be moving backward from our perspective here on Earth, it can have a significant impact on our mental state. Mercury retrograde is known to make our brains work twice as hard to function properly, and its effects can be felt by everyone. However, understanding how this cosmic phenomenon will specifically affect each zodiac sign from April to May 2023 can provide valuable insights into the unique experiences we may encounter.",
    text: <div> <p>If you're feeling a bit off and out of sync lately, don't worry, it may be due to Mercury retrograde. When the planet of communication and cognitive function appears to be moving backward from our perspective here on Earth, it can have a significant impact on our mental state. Mercury retrograde is known to make our brains work twice as hard to function properly, and its effects can be felt by everyone. However, understanding how this cosmic phenomenon will specifically affect each zodiac sign from April to May 2023 can provide valuable insights into the unique experiences we may encounter.
    </p>

      <p><strong>Aries:</strong> As Mercury stations retrograde on April 21, it challenges your self-esteem, particularly if you've been placing your bets on the wrong things. However, once Mercury stations direct on May 14, financial issues will begin to resolve themselves, especially if you've been working on healing your relationship with money.
      </p>

      <p><strong>Taurus:</strong> Mercury retrograde takes place in your first house of self, starting from April 21, leading to a thorough revaluation of your identity. By the time Mercury stations direct on May 14, you may feel like a different person or a more authentic version of yourself. Use this period to engage in introspection and have meaningful conversations with yourself.</p>

      <p><strong>Gemini:</strong> With Mercury retrograde in your spiritual 12th house from April 21, you're prompted to delve into your psyche and confront your inner demons. Your determination to succeed will help you overcome any fears, especially when your emotions become your strongest motivators. When Mercury stations direct on May 14, you'll feel refreshed, as if you've awakened from a tumultuous dream.
      </p>

      <p><strong>Cancer:</strong> Mercury stations retrograde in your 11th house of community on April 21, leaving you feeling disconnected even when surrounded by others. If there are issues with your social circle, now is the time to communicate and address what went wrong. Once Mercury stations direct on May 14, you'll adopt a more positive and healthier attitude toward your peers, allowing new connections to enter your life.
      </p>

      <p><strong>Leo:</strong> As Mercury retrogrades through your 10th house of career from April 21, it may disrupt your professional plans, especially if they were already uncertain. However, once Mercury stations direct on May 14, you'll gain clarity on your next career move.</p>

      <p><strong>Virgo:</strong> Feeling a bit lost? Mercury stations retrograde in your ninth house of travel and expansion on April 21, leading you down unexpected paths. Embrace detours and delays as they may offer valuable insights. When Mercury stations direct on May 14, your sense of direction will return, especially if you've been exploring your interests and beliefs.</p>

      <p><strong>Libra:</strong> Mercury retrograde in your eighth house of transactions from April 21 urges you to settle debts and evaluate your investments. Financial dilemmas that require your attention may arise during this period. However, when Mercury stations direct on May 14, you'll be ready to let go of what no longer serves you and embrace new experiences.
      </p>

      <p><strong>Scorpio: </strong>With Mercury retrograde in your seventh house of partnerships starting from April 21, it's time to reevaluate your understanding of harmony and togetherness. Focus on fulfilling your part in relationships, rather than forcing connections. Once Mercury stations direct on May 14, communication issues with allies, business partners, and significant others become easier to resolve. You may decide to leave certain relationships behind or reignite connections that are worth revisiting.
      </p>

      <p> <strong>Sagittarius:</strong> Mercury retrograde, beginning on April 21, prompts a self-care overhaul. Take a closer look at your habits and routines. When Mercury stations direct on May 14, you'll find a better balance between productivity and rest. Remember, progress happens one step at a time, so don't overthink the process.
      </p>

      <p><strong>Capricorn:</strong> This Mercury retrograde may initially seem complex and confusing, but it can lead to intriguing and enticing experiences. Starting on April 21, Mercury stations retrograde in your fifth house of pleasure, creativity, and romance. It may temporarily cool down your current relationship and dampen your artistic inspiration. However, once Mercury stations direct on May 14, your creative spark will reignite, potentially leading to new romantic connections or revitalizing your current partnership.</p>
      <p><strong>Aquarius:</strong> Mercury stations retrograde in your fourth house of home and family on April 21, urging you to heal your relationship with your roots and nurture new beginnings. Use this period to address any conflicts within your family and establish boundaries to protect your energy. Remember that you have the power to create the home and family of your dreams.</p>

      <p><strong>Pisces: </strong>Be cautious with your words, Pisces, as Mercury retrograde, beginning on April 21, occurs in your third house of communication. Past conversations may resurface, and it's crucial to think before you speak. Take extra care with correspondence and back up important documents, as technological errors may be more likely. Once Mercury stations direct on May 14, you'll find resolutions to ongoing conflicts and learn the importance of communicating with intention.</p>

      <p>In conclusion, while Mercury retrograde affects everyone, its specific influence on each zodiac sign during the period from April to May 2023 can provide valuable insights. By understanding these effects, you can navigate this cosmic phenomenon with greater awareness, allowing for personal growth and transformation. Remember to stay mindful and open to the lessons that Mercury retrograde brings, and trust that you have the power to navigate its challenges with grace.</p>
    </div>
  },

  {
    id: 'abcdef',
    title: 'निर्जला एकादशी का महत्व, कथा और महिमा',
    bannerImg: blog13,
    banner: blog_tile_13,
    date: 'April 11, 23',
    disc: "जैसा कि हम सब जानते हैं कि ज्येष्ठ शुक्ल पक्ष की एकादशी तिथि को निर्जला एकादशी कहा जाता है. हर साल कुल 24 एकादशी पड़ती है, जिनमें से से निर्जला एकदशी सबसे ज्यादा अहम मानी जाती है. चली आ रहीं मान्यताओं के अनुसार, इस व्रत को करने से साल भर की सभी एकादशी व्रत करने के बराबर का फल प्राप्त होता है और भगवान विष्णु की विशेष कृपा प्राप्त होती है. इस दिन किए गए पूजन व दान-पुण्य से अक्षय पुण्य की प्राप्ति होती है. मान्यता है कि भगवान विष्णु का आशीर्वाद दिलाने वाली सभी एकादशी में निर्जला एकादशी का व्रत सबसे कठिन होता है. इस व्रत में पानी पीना वर्जित माना जाता है, इसलिए इसे निर्जला एकादशी कहा जाता है. पद्म पुराण में बताया गया है कि इस व्रत को करने से दीर्घायु और मोक्ष की प्राप्ति होती है.",
    text: <div> <p><strong>जैसा </strong>कि हम सब जानते हैं कि ज्येष्ठ शुक्ल पक्ष की एकादशी तिथि को निर्जला एकादशी कहा जाता है. हर साल कुल 24 एकादशी पड़ती है, जिनमें से से निर्जला एकदशी सबसे ज्यादा अहम मानी जाती है. चली आ रहीं मान्यताओं के अनुसार, इस व्रत को करने से साल भर की सभी एकादशी व्रत करने के बराबर का फल प्राप्त होता है और भगवान विष्णु की विशेष कृपा प्राप्त होती है. इस दिन किए गए पूजन व दान-पुण्य से अक्षय पुण्य की प्राप्ति होती है. मान्यता है कि भगवान विष्णु का आशीर्वाद दिलाने वाली सभी एकादशी में निर्जला एकादशी का व्रत सबसे कठिन होता है. इस व्रत में पानी पीना वर्जित माना जाता है, इसलिए इसे निर्जला एकादशी कहा जाता है. पद्म पुराण में बताया गया है कि इस व्रत को करने से दीर्घायु और मोक्ष की प्राप्ति होती है.
      हिंदू पंचांग के अनुसार इस बार ज्येष्ठ माह के शुक्ल पक्ष की एकादशी तिथि 30 मई दोपहर 01 बजकर 07 मिनट से शुरू हो रही है. ये तिथि अगले दिन 31 मई को दोपहर 01 बजकर 45 पर समाप्त होगी. ऐसे में इस बार निर्जला एकादशी 31 मई 2023 को मनाई जाएगी. निर्जला एकादशी का पारण 01 जून को किया जाएगा, जिसका समय सुबह 05 बजकर 24 मिनट से लेकर सुबह 08 बजकर 10 मिनट तक रहेगा.</p>

      <h3>निर्जला एकादशी की सम्पूर्ण पूजन विधि</h3>

      <p>1 निर्जला एकादशी व्रत के दिन सुबह जल्दी उठकर स्नान कर साफ कपड़े पहनें. </p>

      <p>2 सबसे पहले पूजाघर में घी का दीपक जलाएं और हाथ जोड़कर व्रत का संकल्प लें.</p>

      <p>3 भगवान विष्णु की पूजा के लिए सबसे पहले गंगाजल से अभिषेक करें, फिर चंदन और हल्दी से तिलक करें.</p>

      <p>4 फूल, पीले वस्त्र, पीला जनेऊ, अक्षत, नैवेद्य, तुलसीदल आदि अर्पित करें</p>

      <p>5 सिर्फ सात्विक चीजों का भोग लगाएं.</p>

      <p>6 धूप-दीप जलाकर निर्जला एकादशी की व्रत कथा सुनें या पढ़ें. </p>

      <p>7 इसके बाद आखिर में आरती करें. इस बात का ध्यान रखें कि भगवान विष्णु के साथ लक्ष्मी जी की पूजा भी जरूर करें.</p>

      <h3> निर्जला एकादशी की व्रत कथा </h3>

      <p>चली आ रही पौराणिक कथा के अनुसार, महाभारत काल में एक बार पांडव पुत्र महाबली भीम के महल में वेदों के रचयिता महर्षि वेदव्यास पधारे. भीम ने वेदव्यास जी से पूछा- “हे मुनिश्रेठ! आप तो सर्वज्ञ हैं और सबकुछ जानते हैं, मेरे परिवार में युधिष्ठर, अर्जुन, नकुल, सहदेव, माता कुंती, द्रोपदी सभी एकादशी का व्रत रखते हैं और मुझे भी व्रत रखने के लिए कहते हैं. लेकिन मैं हर महीने एकादशी का व्रत रखने में असमर्थ हूं क्योंकि मुझे अत्यधित भूख लगती है. इसलिये आप मुझे कोई ऐसा उपाय बताएं, जिससे मुझे एकादशी के व्रत के समान फल की प्राप्ति हो” वेदव्यास जी ने कहा- हे भीम! स्वर्गलोक की प्राप्ति और नरक से मुक्ति दिलाने वाले एकादशी व्रत की महिमा अपरमपार है. इसलिए तुम ज्येष्ठ माह की शुक्ल पक्ष की निर्जला एकादशी का व्रत करो. इसमें केवल एक दिन अन्न-जल का त्याग करना होता है. इसमें व्रतधारी को एकादशी तिथि के सूर्योदय से द्वादशी तिथि के सूर्योदय तक बिना खाए-पिए रहना होता है. मात्र इस एक एकादशी के व्रत से तुम्हें सालभर की सभी एकादशी व्रत के समान पुण्य फल की प्राप्ति होगी. व्यास जी के आज्ञानुसार भीम ने निर्जला एकादशी का व्रत किया और इसके बाद उन्हें मोक्ष की प्राप्ति हुई.</p>

      <p>माना जाता है कि निर्जला एकादशी के दिन गरीब और जरूरतमंद लोगों को दान देने और उनकी सहायता करने से मनोवांछित फल की प्राप्ति होती है. इस दिन व्रत करने से समस्त पाप मिट जाते हैं, और दुख तथा कष्टों का नाश होता है. इतना ही नहीं, इस व्रत के पुण्य प्रभाव से व्यक्ति को मृत्यु के बाद स्वर्ग में स्थान मिलता है.</p>

      <h3> कृपया ध्यान दें और निर्जला एकादशी के दिन भूल से भी ये काम ना करें</h3>

      <p>1. निर्जला एकादशी के दिन घर में चावल ना बनाएं.</p>

      <p>2.एकादशी तिथि के दिन तुलसी के पत्ते नहीं तोड़ें, अगर पत्तों की अति आवश्कता हो तो आप एक दिन पहले ही पत्तों को तोड़ कर रख सकते हैं.</p>

      <p>3 इस दिन घर में प्याज, लहसुन, मांस, मदिरा का सेवन ना करें. </p>

      <p>4 साथ ही किसी से लड़ाई-झगड़ा ना करें, किसी का बुरा ना सोचें, किसी का अहित ना करें, और ना ही क्रोध करे</p>

      <p>आशा है आपको हमारा लेख पसंद आया होगा. लेख पूरी तरह से मान्यताओं और जानकारियों पर आधारित है, किसी भी जानकारी या मान्यता को अमल में लाने से पहले संबंधित विशेषज्ञ से सलाह लें. स्वस्थ रहें, सुरक्षित रहें, ईश्वर की कृपा सदा आप पर बनी रहे.
      </p>

    </div>
  },

  {
    id: 'abcdefg',
    date: 'April 12, 23',
    title: 'शुक्र का मिथुन राशि में गोचर: इन राशि वालों के जीवन में संकट और समृद्धि का आयेगा विपरीत प्रभाव',
    bannerImg: blog22,
    banner: blog_tile_22,
    disc: "ज्योतिष विज्ञान के अनुसार, हमारी जन्मकुंडली में ग्रहों का विशेष महत्व होता है। जब हम पैदा होते हैं, तो ग्रहों की स्थिति हमारे जीवन पर प्रभाव डालती है। हर ग्रह की अपनी विशेषता होती है और वह अलग-अलग राशियों में अलग-अलग प्रभाव डालते हैं।",
    text: <div> <p>ज्योतिष विज्ञान के अनुसार, हमारी जन्मकुंडली में ग्रहों का विशेष महत्व होता है। जब हम पैदा होते हैं, तो ग्रहों की स्थिति हमारे जीवन पर प्रभाव डालती है। हर ग्रह की अपनी विशेषता होती है और वह अलग-अलग राशियों में अलग-अलग प्रभाव डालते हैं।</p>

      <p>ज्योतिष शास्त्र के अनुसार, शुक्र ग्रह का विशेष महत्व होता है। शुक्र ग्रह वैदिक ज्योतिष में प्रेम, सौंदर्य, वैभव्य, और सुख का प्रतीक होता है। यह ग्रह विवाह, संबंध, और कला के क्षेत्र में महत्वपूर्ण भूमिका निभाता है। जब शुक्र ग्रह किसी व्यक्ति की राशि में गोचर करता है, तो उसके जीवन में बदलाव हो सकते हैं।</p>

      <p>वर्तमान में, शुक्र ग्रह की मिथुन राशि में यात्रा शुरू होने जा रही है। यह गोचर 30 मई तक रहेगा और फिर इसका प्रभाव कर्क राशि में पड़ना शुरू होगा। मिथुन राशि में शुक्र का गोचर मिथुन राशि वालों के लिए खास रहेगा। इस गोचर के दौरान, प्रेम और संबंधों में उत्साह और सुख का माहौल बन सकता है। यह एक अच्छा समय हो सकता है नए संबंधों की शुरुआत के लिए या मौजूदा संबंधों को मधुर बनाने के लिए।</p>

      <h3>आइये जानते हैं अन्य राशियों पर इसका क्या प्रभाव पड़ेगा।</h3>

      <p><strong>मेष राशि </strong> वालों के लिए शुक्र ग्रह का मिथुन राशि में गोचर विशेष महत्वपूर्ण होगा। इस गोचर के दौरान, आपको सुखद और आनंदमय अनुभव हो सकते हैं, लेकिन इसके साथ ही कुछ अप्रत्याशित उतार-चढ़ावों का भी सामना करना पड़ेगा। आपकी सौम्यता और मृदु व्यक्तित्व के कारण, आप विभिन्न परिस्थितियों पर आसानी से नियंत्रण पा सकते हैं।</p>

      <p>इस गोचर के समय, आपकी धार्मिक और आध्यात्मिक रुचि में वृद्धि हो सकती है। आप अपने आध्यात्मिकता के क्षेत्र में अधिक से अधिक समय बिता सकते हैं और अपनी आंतरिक स्थिति में सुधार देख सकते हैं। इस समय, आपके लिए लिए गए निर्णय और किए गए कार्यों की सराहना होगी, जिससे आपका स्वाभाविक प्रभाव और स्थान मजबूत होगा।</p>

      <p><strong>वृषभ राशि </strong> वालों के लिए शुक्र ग्रह का द्वितीय धन भाव में गोचर विशेष महत्वपूर्ण होगा। इस गोचर के दौरान, आपको बेहतर सफलता की प्राप्ति हो सकती है। आपके आर्थिक पक्ष मजबूत होगा और आपको काफी धन मिलने की उम्मीद होगी। आपको पैतृक संपत्ति से संबंधित विवादों का समाधान मिलेगा और आपके लिए आर्थिक रूप से सकारात्मक घटनाओं का संकेत होगा। हालांकि, इस गोचर के दौरान आपको स्वास्थ्य संबंधी चिंताओं पर ध्यान देना होगा। कार्यक्षेत्र में, आपको षड्यंत्रों से बचने की जरूरत हो सकती है। आपको सतर्क रहना चाहिए और धोखाधड़ी से बचना चाहिये।</p>

      <p><strong>मिथुन राशि </strong> वालों के लिए शुक्र ग्रह का गोचर विशेष रूप से लाभदायक होगा। इस गोचर के दौरान, आपको विलासिता पूर्ण वस्तुओं पर खर्च करना पड़ेगा। आप आनंद और सुख के लिए अच्छी वस्तुओं का आनंद उठा सकते हैं। हालांकि, आपको अपने स्वास्थ्य के प्रति सावधान रहने की आवश्यकता है। आपको अपनी शारीरिक और मानसिक स्वास्थ्य का ध्यान रखना चाहिए।</p>

      <p>इस गोचर के दौरान, अगर आप केंद्र या राज्य सरकार के किसी विभाग में सरकारी टेंडर के लिए आवेदन करने की सोच रहे हैं, तो यह गोचर आपके लिए अनुकूल रहेगा। आपको सरकारी परियोजनाओं और विभागों में अवसर मिल सकते हैं।</p>

      <p><strong>कर्क राशि </strong>में शुक्र ग्रह का गोचर आपके व्यय भाव में होगा, जिससे आपको बहुत सारी भागदौड़ और खर्च का सामना करना पड़ेगा। आपकी विलासिता पूर्ण वस्तुओं पर अधिक खर्च होगा, लेकिन आपकी आय में भी उसी तरह की वृद्धि देखने को मिलेगी। यह गोचर आपको विदेशी मित्रों और संबंधियों से सुखद समाचार प्राप्त करने का योग प्रदान करेगा। आगे बढ़कर किसी भी प्रकार की सरकारी सर्विस के लिए आवेदन करने पर सफलता मिलेगी, लेकिन इसमें थोड़ा समय लग सकता है। आपको गुप्त शत्रुओं से बचना चाहिए और झगड़े-विवाद और कोर्ट केस से दूर रहने की कोशिश करनी चाहिए। इस गोचर के दौरान, अपने वित्तीय मामलों पर सतर्क रहें और व्यय को संयमित रखने का प्रयास करें।</p>

      <p><strong>सिंह राशि </strong>में शुक्र ग्रह का गोचर आपके एकादश लाभभाव में होगा, जिससे आपको हर प्रकार से लाभ प्राप्त होगा। आपकी आय के साधन बढ़ेंगे और यदि आप नौकरी में हैं और नए अनुबंध पर हस्ताक्षर करने की योजना बना रहे हैं, तो यह गोचर आपके लिए अनुकूल रहेगा। संतान संबंधी चिंताएं दूर होंगी और आपके उच्चाधिकारियों के संबंध मजबूत होंगे। प्रेम संबंधी मामलों में प्रगाढ़ता आएगी और अगर आप प्रेम विवाह की योजना बना रहे हैं, तो भी यह गोचर अनुकूल रहेगा। विद्यार्थियों के लिए यह समय बहुत अनुकूल है और उनके लिए एक वरदान समान है।</p>

      <p> <strong>कन्या राशि </strong>में शुक्र ग्रह का गोचर होने से आपको दशम कर्म भाव में बहुत सुख प्राप्त होगा और आपकी सामाजिक पद प्रतिष्ठा में वृद्धि होगी। आपको केंद्र और राज्य सरकार के विभागों में प्रतीक्षित कार्यों का सम्पन्न करने का अवसर मिलेगा।</p>

      <p>यदि आप जमीन, जायदाद, मकान या वाहन की खरीद की योजना बना रहे हैं, तो भी इस गोचर के द्वारा आपको समर्थन मिलेगा। आपको माता-पिता के स्वास्थ्य का ध्यान रखना चाहिए और अपने संकल्पों के प्रति सतर्क रहना होगा।</p>

      <p> <strong>तुला राशि </strong>में शुक्र ग्रह का गोचर होने से आपको धार्मिक और अध्यात्मिक मामलों में अत्यंत जागरूकता होगी। आपका भाग्य बढ़ेगा और आपके लिए लिए गए निर्णय की प्रशंसा होगी। आप अपने अद्भुत साहस और पराक्रम के बल पर कठिन परिस्थितियों पर आसानी से विजय प्राप्त करेंगे। जिन लोगों ने आपको नीचा दिखाने की कोशिश की थी, वे लोग आपकी मदद के लिए आगे आएंगे। यदि आप दूसरे देश के लिए वीजा आदि का आवेदन करना चाह रहे हैं, तो भी इस गोचर के द्वारा आपको सहायता मिलेगी। आपको ध्यान देना चाहिए कि आप अपने धार्मिक और आध्यात्मिक आयामों के प्रति सतर्क रहें और अपने निर्णयों को सावधानीपूर्वक लें, क्योंकि यह गोचर आपके लिए विशेष महत्वपूर्ण है।</p>

      <p><strong>वृश्चिक राशि </strong>में शुक्र ग्रह का गोचर होने से आपको अप्रत्याशित परिणामों का सामना करना पड़ सकता है। आप सफलतापूर्वक बंद कामों को पूरा करने में सफल रहेंगे, लेकिन आपको हमेशा षड्यंत्रकारियों से सतर्क रहना होगा। किसी बड़े संस्थान या सरकार द्वारा पुरस्कार की घोषणा हो सकती है, और आपको अचानक धन प्राप्ति का योग बन सकता है। इसके साथ ही दिए गए धन की वापसी की उम्मीद भी आप कर सकते हैं। आपको अपनी प्रतिष्ठा और ऊर्जा शक्ति का बहुत उपयोग करना चाहिए।</p>

      <p><strong>धनु राशि </strong>में शुक्र ग्रह का गोचर होने से आपको सप्तम दांपत्य भाव में बेहतरीन सफलता की प्राप्ति हो सकती है। विवाह से संबंधित वार्ता सफल रहेगी और आपके दांपत्य जीवन में मधुरता आएगी। प्रेम संबंधी मामलों में भी प्रगाढ़ता होगी और आपके प्रेमी या प्रेमिका के साथ गहरे और मधुर संबंध बनेंगे। यदि आप केंद्र या राज्य सरकार के विभागों में किसी भी तरह के टेंडर आदि का आवेदन करना चाहते हैं, तो यह समय अत्यंत अनुकूल होगा और आपको सफलता मिलेगी।</p>

      <p><strong>मकर राशि </strong>में शुक्र ग्रह का गोचर होने से छठे शत्रु भाव में अच्छे प्रभाव की स्थिति नहीं होगी। इस समय मेहनत करने पर भी आपको अपेक्षित फल नहीं मिल सकता है और पढ़े-लिखे शत्रुओं की संख्या में वृद्धि हो सकती है। आपको अधिक धन उधार में देने से बचना चाहिए और स्वयं ही कर्ज लेने से भी बचें। आपको झगड़ों, विवादों और कोर्ट मामलों से संबंधित समस्याओं से बाहरी सहायता मिल सकती है।</p>

      <p> <strong> कुंभ राशि </strong>में शुक्र ग्रह का गोचर होने से पंचम विद्या भाव में प्रभाव मान-सम्मान की वृद्धि करेगा। यह समय विद्यार्थियों और प्रतियोगिता में भाग लेने वाले छात्रों के लिए वरदान की तरह है। आपकी मान्यता और सम्मान बढ़ेंगे और आपको विद्या में सफलता मिलेगी। संतान संबंधी चिंता दूर होगी और नव दंपति के लिए संतान प्राप्ति और प्रादुर्भाव के योग बनेंगे। काफी समय से प्रतीक्षित कार्य को पूरा करने का अवसर मिलेगा। आपके आय के साधनों में वृद्धि होगी और नौकरी में पदोन्नति और नए अनुबंध की प्राप्ति के योग बनेंगे। यदि आप सरकारी नौकरी की तलाश में हैं, तो मिलने की उम्मीद कर सकते हैं।</p>

      <p><strong>मीन राशि </strong>में शुक्र ग्रह का गोचर होने से चतुर्थ सुख भाव में प्रभाव मानसिक पीड़ा और अशांति का कारण बन सकता है। इसलिए आपको अपने मानसिक स्वास्थ्य का ख़ास ध्यान रखना चाहिए और स्वास्थ्य के प्रति चिंतनशील रहना चाहिए। अपनी आत्माओं के साथ सक्रिय रहें और स्वास्थ्य की देखभाल करें।</p>

      <p>जब आप किसी भी तरह के अनुबंध पर हस्ताक्षर करें, तो सावधानी बरतें और सभी शर्तों को समझें। जमीन और जायदाद संबंधी विवादों का समाधान होगा और कोर्ट कचहरी के मामलों में निर्णय आपके पक्ष में जा सकते हैं। आपकी सामाजिक पद प्रतिष्ठा बढ़ेगी और आपको सम्मान मिलेगा।</p>

      <p>अगर आप किसी चुनाव में भाग लेने की सोच रहे हैं, तो यह समय अनुकूल होगा। आपको अवसर मिलेगा और आपकी प्रतिष्ठा और स्थानीय समर्थन में वृद्धि हो सकती है। तैयार रहें और योग्यता के आधार पर विचारशीलता से अपने मुद्दों को प्रदर्शित करें।</p>

      <p><strong> निष्कर्ष:</strong>
        यह विशेष गतिविधियाँ और प्रभाव ज्योतिषीय विश्लेषण द्वारा बताए जाते हैं और इससे हमें अपने भविष्य में संभावित बदलावों के बारे में अवगत होने का अवसर मिलता है।</p>

    </div>
  },
  {
    id: 'abcdefh',
    date: 'April 13, 23',
    title: 'Mars in Leo: Impact and Key Dates',
    bannerImg: blog4,
    banner: blog_tile_4,
    disc: "From May 20 to July 10, Mars will be in fiery Leo, inspiring us to find pleasure and express ourselves in vibrant ways. The second half of the month will be especially dynamic as it is action-packed with astrological shifts, one of which includes the audacious, bright and passionate planet, Mars. This period encourages us to embrace our desires, passions, and confidence, while urging us to act boldly for high rewards. However, it's important to maintain humility and avoid excessive self-assurance. Mars in Leo can make people sensitive about their egos and pride.",
    text: <div> <p>From May 20 to July 10, Mars will be in fiery Leo, inspiring us to find pleasure and express
      ourselves in vibrant ways. The second half of the month will be especially dynamic as it is
      action-packed with astrological shifts, one of which includes the audacious, bright and
      passionate planet, Mars. This period encourages us to embrace our desires, passions, and
      confidence, while urging us to act boldly for high rewards. However, it's important to maintain
      humility and avoid excessive self-assurance. Mars in Leo can make people sensitive about
      their egos and pride. </p>

      <p>The tarot card representing this transit is the Six of Wands, symbolizing owning
        achievements and celebrating success. It reminds us not to hold back and to let our
        accomplishments shine. The man isn’t afraid to claim success and own his achievements. In
        fact, he’s willing and wanting to show them off. And why shouldn’t he? He crushed it and
        should let people see how amazing he is. The lesson here is to not hold back and to own our
        triumphs. It would be a crime not to let the sun shine on our accomplishments — it’s a great
        hindrance to us. </p>

      <p>During the previous Mars transit in Leo (June 11 to July 29, 2021), we experienced a similar
        energetic vibe. This time, with Mars in Leo, the intensity will increase, fuelling our desire to
        win at any cost and seize life's opportunities. The last time Mars transited the sign Leo there
        were different planets connecting with the fire sign. This time around, the vibe is going to
        intensify since Mars in Leo will be ravenous. The lion is super charged with a lot of cosmic
        energy, that gives it extra power. We’ll want to win at all costs — not caring what we need to
        do in order to achieve our objectives. The transit isn’t for the faint of heart, rather for the
        ones who are eager to grab life by the horns. Roar out what you want to make it happen!</p>

      <h3>Key Dates for Mars in Leo:</h3>

      <p><strong>May 20: </strong> Mars opposes Pluto retrograde, intensifying our competitiveness and determination
        to achieve our goals.</p>

      <p><strong>May 23:</strong> Mars squares Jupiter, providing us with energy, enthusiasm, and optimism as we
        embark on projects.</p>

      <p><strong>May 26: </strong> Mars interacts with the Nodes of Destiny, awakening our passion and instilling hope
        for the future.</p>

      <p><strong>June 22: </strong> Mars harmonizes with Chiron, enabling us to take actions towards healing and
        resolving past wounds.</p>

      <p><strong>June 26: </strong> Mars faces off with Uranus, motivating us to break free from limitations and
        embrace our individuality.</p>

    </div>
  },
  {
    id: 'abcdefi',
    date: 'April 14, 23',
    title: 'Understanding Your Moon Sign:Unveiling Your Emotional Personality',
    bannerImg: blog5,
    banner: blog_tile_5,
    disc: "You're probably familiar with your sun sign, which represents your outward personality. But did you know that your moon sign reveals important insights into your emotional world? While the sun sign takes the spotlight, the moon sign represents your innermost self, your emotional core. Let's explore what your moon sign means and how it can help you take better care of yourself.",

    text: <div> <p>You're probably familiar with your sun sign, which represents your outward personality. But
      did you know that your moon sign reveals important insights into your emotional world?
      While the sun sign takes the spotlight, the moon sign represents your innermost self, your
      emotional core. Let's explore what your moon sign means and how it can help you take
      better care of yourself.</p>

      <h3>How Your Sun and Moon Signs Work Together</h3>

      <p>While your sun sign defines your personality traits, the moon sign influences your emotional
        landscape. It governs your moods, your instincts, and your innermost desires. The interplay
        between your sun and moon signs can create fascinating dynamics. For example, a
        confident Leo sun sign may hide deep sensitivities brought on by a Pisces moon sign.
        Understanding and embracing the uniqueness of your moon sign is key to harmonizing with
        your sun sign and achieving balance in your life.</p>

      <h3>The Influence of Moon Phase and House Placement</h3>

      <p>The phase and house placement of the moon in your birth chart also provide valuable
        insights. The moon's phase reveals how you express and navigate your emotions, while the
        house placement indicates the areas of life where you find emotional fulfilment. For instance,
        a Capricorn moon in the ninth house may seek emotional satisfaction through ambitious
        pursuits and exploration, while a Scorpio moon in the seventh house values deep and
        intense connections in partnerships.</p>

      <h3>Exploring the Traits of the 12 Moon Signs</h3>

      <p>Discovering your moon sign can be a transformative experience. Each moon sign reflects
        the qualities of the corresponding zodiac sign. Here's a brief overview of the 12 moon signs
        and their meanings:</p>

      <p><strong> Aries Moon: </strong> Impulsive and fiery, driven by excitement and victory.</p>

      <p><strong>Taurus Moon: </strong>  Sensual and grounded, seeking stability and comfort.</p>

      <p><strong>Gemini Moon: </strong>  Mercurial and communicative, needing outlets for expression and social
        connections.</p>

      <p> <strong>Cancer Moon:</strong> Highly intuitive and influenced by surroundings, craving security, and support.</p>

      <p><strong>Leo Moon: </strong> Creative and attention-seeking, desiring recognition, and appreciation.</p>

      <p><strong>Virgo Moon: </strong> Analytical and organized, finding fulfilment in practical contributions.</p>

      <p> <strong>Libra Moon:</strong> Balanced and harmonious, valuing relationships and seeking validation from within.</p>

      <p><strong>Scorpio Moon:</strong> Intense and private, craving deep connections and transformation.</p>

      <p> <strong>Sagittarius Moon:</strong> Curious and adventurous, seeking intellectual expansion and freedom.</p>

      <p><strong>Capricorn Moon: </strong> Ambitious and disciplined, finding emotional fulfilment through
        achievements.</p>

      <p><strong>Aquarius Moon: </strong> Humanitarian and idealistic, driven by values and the greater good.</p>

      <p><strong>Pisces Moon: </strong> Empathetic and spiritual, seeking creative outlets and profound connections.</p>

      <h3>Embrace Your Moon Sign for Self-Care</h3>

      <p> Understanding your moon sign opens doors to self-discovery and self-care. By aligning with
        your moon sign's unique needs, you can cultivate emotional well-being and nurture your
        authentic self. Pay attention to the guidance it offers, whether it's deepening intimacy,
        practicing self-care, or exploring creative pursuits. By honouring your moon sign, you can
        unlock a deeper understanding of yourself and celebrate your entire being.</p>

      <p>Remember, your moon sign holds the key to a rich emotional world. Consider reading
        horoscopes for both your sun and moon signs to gain a fuller picture of the cosmic
        influences in your life. Use your moon sign as a compass for self-care, guiding you towards
        the nurturing experiences and activities you need to thrive. Embrace the power of your moon
        sign and cherish the unique emotional tapestry it weaves within you.</p>

    </div>
  },
  {
    id: 'abcdefj',
    date: 'April 15, 23',
    title: '5 Zodiac Signs Who Overthink the Most',
    bannerImg: blog6,
    banner: blog_tile_6,
    disc: "Do you find yourself caught in a never-ending loop of negative thoughts? One small idea enters your mind, and before you know it, it spirals into a cascade of negative possibilities. You feel trapped in your own thoughts, creating a dark place that's hard to escape. If this sounds familiar, then you might be one of the zodiac signs that tend to overthink everything:Gemini, Virgo, Capricorn, Cancer, and Libra. If any of these signs dominate your sun, moon, or Mercury, you know first-hand how overwhelming your thoughts can become.",

    text: <div> <p>Do you find yourself caught in a never-ending loop of negative thoughts? One small idea
      enters your mind, and before you know it, it spirals into a cascade of negative possibilities.
      You feel trapped in your own thoughts, creating a dark place that's hard to escape. If this
      sounds familiar, then you might be one of the zodiac signs that tend to overthink everything:
      Gemini, Virgo, Capricorn, Cancer, and Libra. If any of these signs dominate your sun, moon,
      or Mercury, you know first-hand how overwhelming your thoughts can become.</p>

      <p>Wouldn't it be great if the world understood the intensity of your anxiety? Unfortunately, you
        often find yourself alone in a self-created drama. But here's the good news: if you have the
        ability to think yourself into a corner, you also have the power to think yourself to freedom.
        It's easier said than done, but trust that by setting positive intentions, focusing on gratitude,
        and practicing mindful writing, you can transform your thoughts. Have faith in the universe's
        guidance.</p>

      <h3> Virgo's Overthinking Nature </h3>

      <p>Virgo, an earth sign ruled by Mercury, has a reputation for overthinking every aspect of life.
        Whether it's making small decisions or major life choices, Virgos tend to analyze and dissect
        every detail, often trapping themselves in a cycle of overanalysis. Their quest for perfection
        and order drives them to meticulously plan and organize their tasks. However, this pursuit of
        perfection can be their downfall as they lose sight of the bigger picture. Virgos often secondguess their choices, constantly questioning if they made the right decision. Their minds are
        occupied with "what ifs" and potential outcomes, making them indecisive and hesitant. In
        relationships, Virgos analyze every word, gesture, and action, often searching for hidden
        meanings or ulterior motives. This critical nature, combined with overthinking, can lead to
        misunderstandings, unnecessary worry, and self-doubt. To find peace of mind, Virgos can
        benefit from trusting their instincts and accepting that not everything can be controlled or
        perfect. Balancing analysis with intuition is key.</p>

      <h3>Gemini's Never-Ending Thought Process</h3>

      <p>Gemini, an air sign ruled by Mercury, tends to overthink everything. Their minds are
        constantly racing, transitioning from one idea to another at lightning speed. They excel at
        analysis, breaking down situations into small components and pondering potential outcomes.
        While this allows them to explore different perspectives, it also leads to excessive worrying.
        Gemini's overactive mind makes it difficult for them to find peace and tranquility. They
        struggle to settle on a single thought or decision, leaving them in a constant state of mental
        flux. Gemini's ability to seamlessly transition between thoughts grants them a sharp intellect
        and adaptability. However, this continuous mental activity can be exhausting and
        overwhelming. It can also strain their relationships as others may feel scrutinized or judged.
        Despite the challenges, Gemini's thorough consideration of all angles enables them to excel
        in problem-solving and intellectual pursuits.</p>

      <h3> Capricorn's Relentless Strive for Perfection </h3>

      <p>Capricorn, it's hard for you to settle for anything less than the best. You constantly ponder
        how things could have gone better and tend to overthink about overachieving. While you
        understand that perfection is unrealistic and your expectations are high, you can't help but
        ruminate over every mistake. It's time to give yourself credit for your accomplishments,
        Capricorn. You're already doing a great job.</p>

      <h3>Libra's Endless Evaluation Process</h3>

      <p>Libra, an air sign ruled by Venus, is known for overthinking everything. They meticulously
        process their thoughts, constantly evaluating and weighing every decision, which often leaves
        them trapped in indecision. Libras obsessively consider all possible outcomes, analyzing each
        detail before making a choice. They second-guess themselves, constantly questioning their
        actions, thoughts, and emotions. This constant mental evaluation can lead to exhaustion and
        self-doubt. Libras' desire for balance and harmony makes it difficult for them to make
        decisions, as they tirelessly weigh the pros and cons. Their overthinking tendencies extend to
        their relationships, where they scrutinize every word and analyze underlying meanings. This
        can create anxiety and hinder their ability to fully relax and be themselves. In their
        professional lives, Libras question their career paths, seeking the most balanced and fulfilling
        options. They can become overwhelmed by the multitude of possibilities, leading to a sense
        of career paralysis. In personal matters, Libras overthink their emotions and relationships,
        often sabotaging themselves. To overcome overthinking, Libras should practice mindfulness,
        embrace moments of stillness, and learn to trust their intuition.</p>

      <h3>Cancer's Constant Contemplation</h3>

      <p>Cancer, as a water sign, is known for overthinking everything. Their deep emotional
        connection to situations leads them to mull over every possible outcome. Their minds
        tirelessly analyze and consider various scenarios. Their cautious nature drives them to
        examine every decision or action meticulously, seeking the best choices for themselves and
        their loved ones. However, overthinking can result in indecisiveness and mental exhaustion.
        Cancer's heightened intuition allows them to perceive subtle nuances, making them explore
        all angles. While advantageous, overthinking can burden Cancer. To cope, they should
        practice mindfulness, embrace joy and relaxation, and learn to trust their intuition and
        imperfections.</p>

      <p>Remember, awareness is the first step towards managing overthinking. By understanding
        your tendency to overthink, you can develop strategies to calm your mind and find inner
        peace. Practice mindfulness, focus on the present moment, and cultivate self-compassion.
        Embrace the power of positive affirmations, gratitude, and self-care to quiet your thoughts
        and create a more balanced mental landscape. </p>

    </div>
  },
  {
    id: 'abcdefk',
    date: 'April 16, 23',
    title: "Decoding Love: Unveiling the Tarot Card that Signals Someone's Affection",
    bannerImg: blog7,
    banner: blog_tile_7,
    disc: "Love has always been a captivating enigma, capable of stirring emotions and igniting the soul. For centuries, humans have sought answers and signs to decipher the language of love. Among the many tools available, tarot cards have emerged as a popular divination method, offering insights into matters of the heart. In this blog, we delve into the fascinating realm of tarot to explore the card that signifies someone's love for you, providing a glimpse into the depths of affection and connection.",

    text: <div> <p>Love has always been a captivating enigma, capable of stirring emotions and igniting the soul.
      For centuries, humans have sought answers and signs to decipher the language of love. Among
      the many tools available, tarot cards have emerged as a popular divination method, offering
      insights into matters of the heart. In this blog, we delve into the fascinating realm of tarot to
      explore the card that signifies someone's love for you, providing a glimpse into the depths of
      affection and connection.</p>

      <h3> The Lovers Card: A Symbolic Gateway to Love:</h3>

      <p>In the vast tarot deck, one card stands out as the quintessential representation of love and
        passion—the Lovers card. Depicted with striking imagery, this card symbolizes unity, harmony,
        and profound emotional connections. It represents the divine union between two souls,
        transcending mere physical attraction. When the Lovers card appears in a reading, it signifies
        that a significant bond is forming, and the forces of love are at work.</p>

      <h3> Interpreting the Symbolism: </h3>

      <p>The Lovers card holds various symbolic elements that offer deeper insights into the affection
        someone holds for you. The presence of an angelic figure overseeing the scene signifies the
        guidance and protection of higher powers. It suggests that the love between you and the person
        in question is not a coincidence but a part of a greater divine plan.</p>

      <p>The card also portrays a couple standing beneath a brilliant sun, representing warmth, vitality,
        and life force. This symbolizes the intensity and passion within the relationship, indicating that
        the person's feelings for you are genuine and deeply felt. The Lovers card also embodies the
        power of choice and the importance of making decisions that align with one's heart. It
        encourages embracing love and following one's authentic desires.</p>

      <h3>Emotional Connection and Harmony:</h3>

      <p>When the Lovers card appears in a tarot reading, it signifies an exceptional emotional
        connection. It suggests that the person in question truly understands and appreciates you,
        fostering an atmosphere of acceptance, respect, and harmony. Their feelings are not fleeting or
        superficial but rather grounded in a genuine desire for emotional intimacy and a meaningful
        connection.</p>

      <h3>A Call for Balance and Choices:</h3>

      <p>While the Lovers card represents love and deep affection, it also serves as a reminder of the
        need for balance and choices. It suggests that both parties must make conscious decisions to
        nurture the relationship, fostering open communication, and mutual understanding. It
        encourages maintaining individuality while embracing the collective energy of the partnership.</p>

      <p>In the realm of tarot, the appearance of the Lovers card unveils profound affection and
        emotional connection. It serves as a powerful reminder that love, with all its complexities, has
        the potential to transcend and transform our lives.</p>

    </div>
  },
  {
    id: 'abcdefl',
    date: 'April 18, 23',
    title: 'Factors responsible for successful inter-caste Marriage',
    bannerImg: blog9,
    banner: blog_tile_9,
    disc: "Love knows no boundaries, and when two individuals from different castes come together in matrimony, it is a testament to the power of love and the breaking down of societal barriers. Inter-caste marriages have become more prevalent in recent years, as society evolves and embraces the principles of equality and individual choice.",

    text: <div> <p>Love knows no boundaries, and when two individuals from different castes come together in
      matrimony, it is a testament to the power of love and the breaking down of societal barriers.
      Inter-caste marriages have become more prevalent in recent years, as society evolves and
      embraces the principles of equality and individual choice.</p>

      <p>While successful inter-caste marriages depend on various factors such as understanding,
        communication, and compromise, some individuals turn to astrology to seek guidance and
        compatibility analysis. In this blog, we will explore the factors responsible for successful intercaste marriages and delve into the role astrology plays in them.</p>

      <h3> Planetary Influences on Inter-Caste Marriages </h3>

      <p>The position of celestial bodies within a horoscope plays a crucial role in determining whether
        an individual is destined for an inter-caste marriage or an arranged union. Venus, Jupiter, and
        Mars hold significance in shaping such relationships among the planets. Let's delve into the
        specifics of each planet's influence.</p>

      <p><strong>Venus: </strong> Referred to as the planet of love, relationships, and marriage, Venus wields considerable
        influence. When positioned favorably in an individual's horoscope, it instills a profound desire for
        nurturing love and harmonious connections. Such individuals tend to overlook factors like caste
        and social status, paving the way for successful inter-caste unions. Venus empowers them to
        embrace compromise and foster understanding with their partners.</p>

      <p><strong>Mars: </strong> Symbolizing passion, vitality, and assertiveness, Mars holds sway over individuals seeking deep
        love and are willing to fight for it. The favorable placement of Mars in the horoscope can help
        transcend societal barriers, including caste, as individuals harness their fervor to overcome
        obstacles. Conversely, an unfavorable placement of Mars may lead to conflicts and arrogance,
        potentially straining inter-caste marriages.</p>

      <p><strong>Jupiter: </strong> Known as the planet of growth, wisdom, and expansion, Jupiter symbolizes partnerships and
        marriage. Those blessed with a strong Jupiter in their horoscopes possess a broad-minded and
        progressive outlook on matrimony. Jupiter aids in dismantling orthodox societal barriers, such
        as caste and religion. Such individuals embrace a more inclusive perspective, fostering intercaste marriages and transcending conventional boundaries.</p>

      <h3>Astrological Factors Influencing Successful Inter-caste Marriages</h3>

      <p>The realm of inter-caste love marriages brings with it a unique set of challenges and
        opportunities. Astrology can offer insights into the factors that contribute to the success of such
        unions. Let us explore the key astrological aspects that influence the outcome of inter-caste
        marriages:</p>

      <p>The Seventh House: In astrology, the seventh house represents partnerships and marriage. Its
        strength or weakness can significantly influence the prospects of a successful marriage. A
        strong seventh house indicates a favorable time for marriage, while a weak one may pose
        obstacles and difficulties. Additionally, the positioning and aspects of influential planets like
        Mars and Venus in the seventh house can further influence the outcome of the union.</p>

      <p>Partner's Compatibility: Compatibility between partners plays a crucial role in determining the
        success of any marriage. Through analyzing the horoscopes, astrology can provide insights into
        the values, interests, and personality traits of the individuals involved. These astrological
        indicators can shed light on the potential to build a strong bond, surpassing any cultural
        differences that may exist.</p>

      <p> Acceptance of Cultural Differences: Cultural disparities often arise in inter-caste marriages, and
        their acceptance or resistance can significantly affect marital harmony. Initially, some may deny
        the influence of cultural differences, but over time, they can become bothersome if not
        addressed. Successfully navigating these differences requires willingness and openmindedness from both partners. Astrology can provide guidance on how well individuals may
        adapt to such disparities and their potential to work through them for a harmonious marriage.</p>

      <p>Family & Society: The role of family and society in Inter-caste marriages cannot be overlooked.
        The planetary positions of Jupiter and Rahu in the horoscopes of both partners offer insights
        into the level of acceptance and support that families may provide. A favorable alignment
        suggests a higher likelihood of familial harmony, while challenging aspects may indicate the
        need for more effort to bridge the gap between different cultural backgrounds.</p>

      <p> In conclusion, the alignment of planets and the positions of houses in the context of inter-caste
        marriage can provide significant insights into the potential success of the union. It is crucial for
        couples to carefully analyze all relevant factors and fully comprehend their implications before
        embarking on the path of inter-caste marriage. It is important to bear in mind that marriage is a
        decision that profoundly affects one's life, and therefore, rushing into it should be avoided at all
        costs. </p>

    </div>
  },
  {
    id: 'abcdefm',
    date: 'April 22, 23',
    title: 'Impact of Mars and Venus Conjunction 2023',
    bannerImg: blog8,
    banner: blog_tile_8,
    disc: "Mars and Venus, the two prominent planets in astrology, represent different aspects of our personalities and desires. Mars embodies assertiveness, ambition, passion, and physical energy, while Venus symbolizes love, beauty, harmony, and emotional fulfillment. When these two celestial bodies align, their combined energies can create a powerful force that influences our relationships, creativity, self-expression, and overall vitality.",

    text: <div> <p>Mars and Venus, the two prominent planets in astrology, represent different aspects of our
      personalities and desires. Mars embodies assertiveness, ambition, passion, and physical
      energy, while Venus symbolizes love, beauty, harmony, and emotional fulfillment. When these
      two celestial bodies align, their combined energies can create a powerful force that influences
      our relationships, creativity, self-expression, and overall vitality.</p>

      <h3>Mars-Venus conjunction in Leo will be on July 07, 2023. The transit will be of 32 days.
        The conjunction will end on August 07, 2023. </h3>

      <h3> Positive & negative impacts of Mars and Venus conjunction</h3>

      <h3>Positive Effects: </h3>

      <p>The conjunction of Mars and Venus generates a potent force of passion and desire, ushering in
        a favorable period for romance and intimacy. Individuals may find themselves irresistibly drawn
        to their partners, experiencing an amplified attraction. Furthermore, they may feel a heightened
        longing for closeness and intimacy.</p>

      <p>Venus symbolizes charm, social adeptness, and the capacity to forge connections, while Mars
        represents confidence and assertiveness. When these celestial bodies align, individuals often
        exhibit enhanced charisma and sociability. They possess a greater aptitude for establishing
        meaningful connections and leaving a positive impression on others.</p>

      <p>Both Mars and Venus are associated with communication, albeit in different ways. When they
        converge, individuals tend to communicate more effectively, articulating their needs assertively
        yet diplomatically, and engaging in successful negotiations.</p>

      <p>Venus is closely linked to creativity, art, and beauty, while Mars embodies energy and action.
        The conjunction of these planets often sparks inspiration and unleashes a surge of creativity.
        People find themselves better equipped to channel their energy into artistic pursuits and various
        projects.</p>

      <p>Mars signifies confidence and assertiveness, while Venus represents self-esteem and selfworth. In their conjunction, individuals experience heightened confidence and assertiveness,
        gaining a stronger sense of their own value and worth.</p>

      <p>Mars embodies motivation and drive, whereas Venus represents pleasure and enjoyment.
        When these planets align, individuals are motivated and driven to pursue their goals with
        determination.</p>

      <p>Venus, the planet of love and relationships, converges with Mars, the embodiment of passion
        and desire. This alignment enhances the depth and intensity of relationships, fostering more
        passionate, loving, and fulfilling connections. It provides an opportune time for new relationships
        to blossom or for existing ones to deepen and strengthen.</p>


      <p><strong>Negative Effects: </strong>Mars symbolizes aggression and conflict, while Venus epitomizes harmony and balance.
        Consequently, when these planets align, there is a heightened likelihood of encountering
        conflicts and engaging in arguments, as Mars's forceful energy may overpower Venus's
        harmonious influence.</p>

      <p>Venus's association with love and relationships combines with Mars's embodiment of passion
        and desire during their conjunction, leading to intense feelings of jealousy and possessiveness.
        Mars's energy has the potential to amplify these emotions within relationships.</p>

      <p>Mars represents impulsiveness and recklessness, whereas Venus represents balance and
        harmony. During their conjunction, individuals may be more inclined to take risks or make
        impulsive decisions without considering the potential consequences.</p>

      <p>Mars signifies individuality and self-assertion, while Venus embodies cooperation and empathy.
        When these planets align, individuals may become more focused on their own needs and
        desires, potentially neglecting the needs of others.</p>

      <p> Mars represents sexual desire and passion, while Venus embodies love and pleasure. The
        convergence of these planets may result in heightened sexual tension and frustration, as Mars's
        urgency may not necessarily align with Venus's energy.</p>

      <p>Mars represents action and energy, while Venus embodies beauty and aesthetics. During their
        conjunction, individuals may place excessive emphasis on superficial appearances and make
        decisions based on superficial qualities rather than deeper, more meaningful considerations.</p>

      <h3> Conclusion: </h3>

      <p>The Mars and Venus conjunction in Leo 2023 promises to be a celestial spectacle, radiating
        passion, creativity, and harmony. Embrace this rare event as a catalyst for personal growth,
        improved relationships, and creative endeavors. Allow the energies of Mars and Venus to
        inspire you reignite your passions, and bring more love and harmony into your life. Remember
        to stay attuned to your intuition and embrace the opportunities that present themselves during
        this transformative period. May the cosmic dance of Mars and Venus in Leo illuminate your path
        and bring you closer to your true self.</p>

    </div>
  },
  {
    id: 'abcdefn',
    date: 'April 24, 23',
    title: "Know Your Zodiac's Lucky Numbers in 2023",
    bannerImg: blog10,
    banner: blog_tile_10,
    disc: "In our continuous pursuit of success in life, astrology emerges as a valuable tool, offering profound insights into this journey. The significance of utilizing appropriate numbers in astrology cannot be overstated, as they serve to harmonize the mind with one's aspirations. By aligning with favorable planetary energies, one can enhance their ability to manifest desired outcomes. If you are aware of your date of birth, it becomes possible to ascertain the most auspicious numbers corresponding to your zodiac sign for the year 2023. To optimize your prospects of success, it is advisable to incorporate these fortunate numbers into your daily practices. ",

    text: <div> <p>In our continuous pursuit of success in life, astrology emerges as a valuable tool, offering
      profound insights into this journey. The significance of utilizing appropriate numbers in astrology
      cannot be overstated, as they serve to harmonize the mind with one's aspirations. By aligning
      with favorable planetary energies, one can enhance their ability to manifest desired outcomes. If
      you are aware of your date of birth, it becomes possible to ascertain the most auspicious
      numbers corresponding to your zodiac sign for the year 2023. To optimize your prospects of
      success, it is advisable to incorporate these fortunate numbers into your daily practices. </p>

      <p>Presented below is a compilation of the fortunate numbers associated with each zodiac sign for
        the year 2023.</p>

      <p><strong>Aries (March 21 - April 19):</strong>  Lucky Numbers: 7 and 9</p>

      <p>In 2023, Aries individuals are advised to focus on the power of 7, which symbolizes growth and
        spiritual awareness. The lucky numbers for Aries have always taken a bend towards odd
        numbers. 2. </p>

      <p><strong> Taurus (April 20 - May 20): </strong> Lucky Numbers: 6</p>

      <p>Taurus natives can expect the number 6 to be favorable in 2023. The number is believed to
        enhance their stability, determination, and financial prospects. </p>

      <p><strong>Gemini (May 21 - June 20): </strong> Lucky Numbers: 5 </p>

      <p>For Gemini individuals, 2023 brings a focus on communication, adaptability, and personal
        growth. Lucky number is 5. Natives looking for new starts in their careers or academics will have
        a remarkable year ahead.</p>

      <p><strong>Cancer (June 21 - July 22): </strong>Lucky Numbers: 2 and 6</p>

      <p>The nurturing and intuitive Cancerians can look forward to a prosperous 2023 with numbers 2
        and 6. These numbers align with their empathetic nature and may bring good luck in matters of
        family, home, and emotional well-being.</p>

      <p> <strong>Leo (July 23 - August 22): </strong> Lucky Numbers: 7</p>

      <p>Leo individuals thrive in the spotlight, and in 2023, the number 7, and may shine favorably upon
        them. The number is associated with leadership, creativity, and self-expression. </p>

      <p> <strong>Virgo (August 23 - September 22): </strong>Lucky Numbers: 1, 6, and 7</p>

      <p>Practicality and attention to detail are the hallmarks of Virgo individuals. In 2023, numbers like 1,
        6, and 7 can enhance their analytical abilities and bring success in areas related to work, health,
        and personal growth.</p>

      <p><strong>Libra (September 23 - October 22): </strong>Lucky Numbers: 8 and 10</p>

      <p>Harmony and balance are vital for Libra individuals, and in 2023, the numbers 8 and 10 may
        support their pursuit of equilibrium. </p>

      <p> <strong> Scorpio (October 23 - November 21): </strong>Lucky Numbers: 1 and 3</p>

      <p>Scorpio individuals possess intensity and passion, and in 2023, numbers 1 and 3 can amplify
        these qualities. These numbers are associated with transformation, spirituality, and material
        abundance.</p>

      <p><strong>Sagittarius (November 22 - December 21): </strong> Lucky Numbers: 3</p>

      <p>Sagittarius individuals are known for their adventurous spirit, and in 2023, number 3 may
        support their pursuit of new experiences and personal freedom. </p>

      <p><strong> Capricorn (December 22 - January 19): </strong> Lucky Numbers: 3, 4 and 9</p>

      <p> Capricorns are driven and ambitious individuals, and in 2023, numbers like 3, 4, and 9 can align
        with their determination and bring favorable outcomes. These numbers are associated with
        discipline, stability, and financial success.</p>

      <p><strong>Aquarius (January 20 - February 18): </strong> Lucky Numbers: 22</p>

      <p>The lucky number for Aquarius is the unique, 22, which denotes multiplying of the well wishes.
        Aquarius individuals thrive on uniqueness and innovation. </p>

      <p><strong>Pisces (February 19 - March 20): </strong> Lucky Numbers: 0 and 9</p>
      <p> Pisces individuals are intuitive and compassionate, and in 2023, the numbers 0 and 9 support
        their spiritual journey and emotional well-being. These numbers are associated with creativity,
        intuition, and deep connections.</p>

      <h3> Conclusion </h3>
      <p> While astrology can be a fun way to explore different aspects of our lives, it is important to
        remember that luck is influenced by a multitude of factors. So, embrace these numbers as
        potential guiding lights, but remember that your actions and decisions are the true drivers of
        your success.</p>

    </div>
  },
  {
    id: 'abcdefo',
    date: 'May 01, 23',
    title: 'Numerology and Mobile Numbers: The Power of Digits',
    bannerImg: blog11,
    banner: blog_tile_11,
    disc: "In the fascinating world of numerology, every number carries a unique vibration and meaning. From personality traits to life path predictions, numerology offers insights into various aspects of our lives. One area where numerology has gained popularity is in the selection of mobile numbers. By understanding the significance of different digits, individuals can choose a mobile number that resonates with their personal energy and aspirations. In this blog, we explore how numerology can guide you in selecting a mobile number that aligns with your intentions and enhances your overall well-being.",

    text: <div> <p>In the fascinating world of numerology, every number carries a unique vibration and meaning.
      From personality traits to life path predictions, numerology offers insights into various aspects of
      our lives. One area where numerology has gained popularity is in the selection of mobile
      numbers. By understanding the significance of different digits, individuals can choose a mobile
      number that resonates with their personal energy and aspirations. In this blog, we explore how
      numerology can guide you in selecting a mobile number that aligns with your intentions and
      enhances your overall well-being.</p>

      <h3>Understanding Numerology and its Influence:</h3>

      <p>Numerology is an ancient divination system that assigns numerical values to letters and
        numbers. It believes that these vibrations have an impact on our lives and can provide valuable
        insights into our personalities, strengths, weaknesses, and even future endeavors. By
        examining the energy of different numbers, numerologists interpret their significance and
        influence on various aspects of our lives, including mobile number selection.</p>

      <h3>Calculating Your Life Path Number:</h3>

      <p>Before delving into choosing a mobile number, it's essential to calculate your life path number.
        This number is derived from your birthdate and represents the core aspects of your personality
        and life purpose. Once you have your life path number, you can explore the corresponding
        digits and their associated meanings to guide your mobile number selection.</p>

      <p>Choosing Mobile Numbers based on Numerological Significance:</p>

      <p>When it comes to selecting a mobile number, numerology provides guidelines to help you make
        an informed decision. Each digit holds a distinct energy and can influence different aspects of
        your life. Here's a brief overview of the numerological significance of each digit:</p>

      <p>1: Represents independence, leadership, and self-confidence.</p>
      <p>2: Symbolizes harmony, cooperation, and diplomacy.</p>
      <p>3: Signifies creativity, self-expression, and communication skills.</p>
      <p>4: Represents stability, practicality, and methodical approach.</p>
      <p>5: Symbolizes adaptability, freedom, and a desire for change.</p>
      <p>6: Signifies nurturing, responsibility, and harmonious relationships.</p>
      <p>7: Represents introspection, spirituality, and analytical thinking.</p>
      <p>8: Symbolizes success, abundance, and material wealth.</p>
      <p>9: Signifies compassion, humanitarianism, and a desire for universal well-being. </p>

      <p>&nbsp;</p>

      <p>By understanding the qualities associated with each digit, you can choose a mobile number that
        aligns with your intentions and enhances the energy you wish to attract in your life.</p>

      <p>Harnessing the Power of Intention:</p>

      <p>In addition to numerology, setting intentions plays a crucial role in choosing a mobile number.
        By clarifying your goals, aspirations, and the energy you want to cultivate in your life, you can
        align your mobile number selection with your intentions. Whether it's seeking success, fostering
        better communication, or attracting positive energy, infusing your mobile number choice with
        intention can enhance the vibrational resonance and create a powerful connection between you
        and your device.</p>

      <p> Numerology offers a unique perspective on selecting a mobile number that resonates with your
        personal energy and aspirations. By understanding the numerological significance of different
        digits and aligning your intentions, you can harness the power of numerology to enhance your
        mobile experience.</p>

    </div>
  },
  {
    id: 'abcdefp',
    date: 'May 03, 23',
    title: 'The Power of Gemstones: Debunking the Mystery',
    bannerImg: blog12,
    banner: blog_tile_12,
    disc: "Gemstones have captivated humanity for centuries with their allure and mystique. From ancient civilizations to modern times, they have been believed to possess various metaphysical properties and healing benefits. In this blog, we will explore the question: Is wearing gemstones helpful?",

    text: <div> <p>Gemstones have captivated humanity for centuries with their allure and mystique. From ancient
      civilizations to modern times, they have been believed to possess various metaphysical
      properties and healing benefits. In this blog, we will explore the question: Is wearing gemstones
      helpful?</p>

      <p>1. Historical Significance: Throughout history, gemstones have held cultural and spiritual
        significance in different societies. Ancient civilizations such as the Egyptians, Greeks,
        and Indians believed that gemstones had the power to influence one's life positively.
        They were worn as amulets, talismans, and ornaments to bring luck, protection, and
        prosperity.</p>

      <p>2. Symbolism and Personal Connection: For many individuals, gemstones hold personal
        significance due to their symbolic representations. Each gemstone is associated with
        specific qualities and characteristics. For example, diamonds symbolize strength and
        purity, while emeralds represent love and harmony. Wearing a gemstone can serve as a
        constant reminder of these qualities, fostering a positive mindset and enhancing selfconfidence.</p>


      <p>3. Energy and Vibrations: One belief surrounding gemstones is that they emit unique
        energy vibrations. Advocates suggest that these vibrations can interact with the body's
        energy field, known as the aura, promoting balance and well-being. According to this
        theory, different gemstones possess distinct energies that align with specific aspects of
        life, such as health, love, or abundance.</p>

      <p>4. Alternative Healing Practices: Gemstones are often incorporated into alternative healing
        practices such as crystal therapy and Reiki. Proponents claim that these practices can
        harness the energetic properties of gemstones to address physical, emotional, and
        spiritual imbalances. While scientific evidence is limited, many individuals report positive
        experiences and a sense of improved well-being after engaging in such practices.</p>

      <p>5. Personal Belief and Placebo Effect: The effectiveness of gemstones can be subjective
        and vary from person to person. Some argue that the benefits individuals experience
        may be attributed to the placebo effect or personal belief. The power of suggestion and
        the psychological impact of wearing a gemstone can influence one's perception of its
        effects. However, it is important to note that personal experiences should be respected,
        as individuals find value and comfort in their beliefs.</p>

      <p>The question of whether wearing gemstones is helpful remains open to interpretation. While
        scientific evidence may not fully support the metaphysical claims associated with gemstones,
        their historical significance, personal symbolism, and the placebo effect cannot be disregarded.
        Ultimately, the decision to wear gemstones lies with the individual, and their experience and
        belief system shape the outcome.</p>

      <p>In the end, whether one perceives gemstones as merely decorative or as tools for enhancing
        well-being, their beauty and allure continue to fascinate and inspire humanity.</p>

    </div>
  },
  {
    id: 'abcdefq',
    date: 'May 04, 23',
    title: 'गुरु प्रदोष व्रत से पाएं शत्रुओं पर विजय. गुरु प्रदोष व्रत का महत्व और कथा.',
    bannerImg: blog14,
    banner: blog_tile_14,
    disc: "आज हम जानेंगे, गुरु प्रदोष व्रत के बारे में. गुरुवार के दिन पड़ने वाले प्रदोष व्रत को गुरु प्रदोष व्रत कहा जाता है. हर दिन पड़ने वाले प्रदोष व्रत का अलग-अलग महत्व होता है. प्रदोष व्रत हर माह के कृष्ण और शुक्ल पक्ष की त्रयोदशी को रखा जाता है. प्रचलित मान्यताओं के अनुसार, प्रदोष व्रत करने से सभी कष्टों से मुक्ति मिलती है और सभी मनोकामनाएं पूरी होती हैं. शास्त्रों में दी गई जानकारी के अनुसार गुरु प्रदोष व्रत शत्रुओं पर विजय प्राप्त करने वाला व्रत है. यह व्रत रखने वाले के जीवन में सौभाग्य, सुख, समृद्धि लाता है.",

    text: <div> <p>आज हम जानेंगे, गुरु प्रदोष व्रत के बारे में. गुरुवार के दिन पड़ने वाले प्रदोष व्रत को गुरु प्रदोष व्रत कहा जाता है. हर दिन पड़ने वाले प्रदोष व्रत का अलग-अलग महत्व होता है. प्रदोष व्रत हर माह के कृष्ण और शुक्ल पक्ष की त्रयोदशी को रखा जाता है. प्रचलित मान्यताओं के अनुसार, प्रदोष व्रत करने से सभी कष्टों से मुक्ति मिलती है और सभी मनोकामनाएं पूरी होती हैं. शास्त्रों में दी गई जानकारी के अनुसार गुरु प्रदोष व्रत शत्रुओं पर विजय प्राप्त करने वाला व्रत है. यह व्रत रखने वाले के जीवन में सौभाग्य, सुख, समृद्धि लाता है.</p>

      <p>व्रत रखने वाले व्यक्ति को गुरु प्रदोष व्रत के दिन ब्रह्ममुहूर्त में उठकर स्नान आदि के बाद 'अहमद्य महादेवस्य कृपाप्राप्त्यै सोमप्रदोषव्रतं करिष्ये' मंत्र का जप करते हुए संकल्प लेना चाहिए और इसके बाद व्रत रखना चाहिए. ध्यान रखें गुरु प्रदोष व्रत के दिन शिव शंकर की पूजा करते समय लाल रंग के कपड़े पहनें. आप घर पर ही पूजा या मंदिर में, जहां संभव हो, वहाँ पूजा कर सकते हैं. शिवलिंग पर बेलपत्र, धूप, दीप, चंदन, गंगाजल, जल, फल, फूल, पांच तरह की मिठाई आदि अर्पित करें. साथ ही प्रदोष व्रत कथा कर भगवान भोलेनाथ की आरती करें. अंत में ओम नमः शिवाय मंत्र का जाप करें. पूरे दिन भोलेनाथ का स्मरण करते रहें. दिनभर उपवास रखें, शाम को आरती के बाद फलाहार करें. अगले दिन नित्य दिनों की तरह पूजा पाठ कर व्रत खोलें.
      </p>

      <h3> गुरु प्रदोष व्रत </h3>

      <p><strong>प्रचलित पौराणिक</strong> कथा के अनुसार, दैत्यों के राजा वृत्रासुर ने एक बार स्वर्गलोक पर आक्रमण कर दिया था. दैत्यों और देवताओं के बीच भयंकर युद्ध हुआ.  देवताओं की सेना ने वृत्रासुर की सेना को युद्ध में हरा दिया. इस पर वृत्रासुर के सैनिक अपने प्राण बचाने के लिए युद्ध भूमि छोड़कर भागने लगे. ये देखकर वृत्रासुर अति क्रोधित हो उठा और स्वर्गलोक पर अपना आधिपत्य जमाने के लिए उसने छल से विकराल रूप धारण कर लिया. ये देखकर, देवताओं ने स्वर्गलोक की रक्षा के लिए वृत्रासुर पर अपने दिव्य अस्त्रों का प्रयोग किया लेकिन सभी अस्त्र शस्त्र उसके कठोर शरीर से टकराकर चूर-चूर हो गए. ये सब देखकर देवराज इन्द्र अपने प्राण और स्वर्गलोक को बचाने के लिए देवगुरु बृहस्पति के पास पहुंचे और उनसे वृत्रासुर को हराने का उपाय पूछा. इस पर गुरु बृहस्पति ने बताया कि वृत्तासुर बहुत ही पराक्रमी और शक्तिशाली है उसे हराना आसान नहीं. इसका उपाय सिर्फ महादेव ही बता सकते हैं. देवगुरु ने इंद्र देव से भोलेनाथ को प्रसन्न करने के लिए गुरु प्रदोष व्रत करने को कहा.</p>


      <p>इन्द्रदेव ने गुरु बृहस्पति के कहे अनुसार, गुरु प्रदोष व्रत का संकल्प लिया और विधि पूर्वक पूजा अर्चना की, जिसके फलस्वरूप भगवान भोलेनाथ ने इन्द्रदेव से प्रसन्न होकर उन्हें दर्शन दिए और संसार के कल्याण और वृत्रासुर को परास्त करने का समाधान बताया. भोलेनाथ ने कहा कि वृत्रासुर को हराने के लिए इंद्र देव को महर्षि दधिचि से हडि्डयों का दान देने का अनुरोध करना होगा, क्योंकि तप साधना से दधिचि ने अपनी हड्डियों को अत्यंत कठोर बनाया है और उनकी हडि्डयों से जो अस्त्र बनेगा वही वृत्रासुर का अंत करेगा. इन्द्र ने शिव की आज्ञा के अनुसार महर्षि दधिचि से हड्डियों का दान मांगा. महर्षि दधिचि ने संसार के हित में अपने प्राण त्याग दिए. देव शिल्पी विश्वकर्मा ने महर्षि दधिचि की हडि्डयों से वज्र नामक अस्त्र बनाकर इंद्र को सौंप दिया. युद्ध में देवराज इन्द्र ने वृत्रासुर पर वज्र से प्रहार किया जिससे टकराकर वह रेत की तरह बिखर गया. पुन: देवताओं का देवलोक पर अधिकार हो गया.</p>

      <p>इस प्रकार से जो भी व्यक्ति भगवान शिव की उपासना करते हुए गुरु प्रदोष व्रत रखता है, उसके सभी शत्रुओं का नाश होता है और शिव कृपा से वो अपने सभी शत्रुओं को परास्त करने में सफल होता है.</p>

      <p>आशा है आपको हमारा लेख पसंद आया होगा. लेख पूरी तरह से मान्यताओं और जानकारियों पर आधारित है. हम इसकी पुष्टि नहीं करते हैं. स्वस्थ रहें, सुरक्षित रहें, ईश्वर की कृपा सदा आप पर बनी रहे.</p>

    </div>
  },
  {
    id: 'abcdefr',
    date: 'May 05, 23',
    title: 'मंगल प्रदोष व्रत करके पाएं कर्ज से मुक्ति, जानें पूजन विधि और कथा भोले भंडारी, भर देंगे आपकी झोली खाली.',
    bannerImg: blog15,
    banner: blog_tile_15,
    disc: "सोम प्रदोष व्रत के बाद, आज हम जानेंगे मंगल प्रदोष व्रत के संबंध में. भौम मंगल ग्रह का दूसरा नाम है और इसी के चलते मंगलवार  के दिन प्रदोष तिथि का योग बनने पर यह व्रत रखा जाता है. माना जाता है मंगल प्रदोष व्रत रखने से कर्ज और रोगों से छुटकारा मिलता है.  इसके साथ ही जीवन में सुख,-समृद्धि, संतान आदि की प्राप्ति होती है.",

    text: <div> <p>सोम प्रदोष व्रत के बाद, आज हम जानेंगे मंगल प्रदोष व्रत के संबंध में. भौम मंगल ग्रह का दूसरा नाम है और इसी के चलते मंगलवार  के दिन प्रदोष तिथि का योग बनने पर यह व्रत रखा जाता है. माना जाता है मंगल प्रदोष व्रत रखने से कर्ज और रोगों से छुटकारा मिलता है.  इसके साथ ही जीवन में सुख,-समृद्धि, संतान आदि की प्राप्ति होती है.</p>

      <p>कहा जाता है कि इस दिन भगवान शिव और भगवान हनुमान की पूजा करना शुभ होता है. मंगल प्रदोष व्रत के दिन भगवान शंकर का जलाभिषेक करने के साथ ही माता पार्वती और भगवान गणेश की पूजा करने की भी मान्यता है. कहा जाता है कि यदि प्रदोष व्रत मंगलवार के दिन हो तो इसका महत्व बढ़ जाता है और ऐसे में हनुमान चालीसा का पाठ भी करना चाहिए.</p>

      <p>मंगल प्रदोष व्रत के दिन ब्रह्म मुहूर्त में उठकर स्नान करें. मन ही मन भगवान शिव का स्मरण करते हुए व्रत का संकल्प करें और दिनभर बिना अन्न ग्रहण किए व्रत रखें. शाम के समय स्नान आदि करने के बाद सफेद रंग के वस्त्र धारण करें. इसके बाद घर के उत्तर-पूर्व दिशा में, थोड़ी सी जगह को साफ करके गंगाजल छिड़कें. इसके बाद 5 रंगों के फूलों से रंगोली बनाएं, और उसके ऊपर भगवान शिव और माता पार्वती की मूर्ति स्थापित करें. मूर्ति स्थापित करने के बाद भगवान शिव की पूजा आरंभ करें. भगवान पर गंगाजल, पुष्प, बेलपत्र, धतूरा, चंदन, अक्षत,मिठाई आदि अर्पित करें. शिव कथा और चालीसा पढ़ें. अंत में भगवान से किसी भी भूल-चूक के लिए माफी मांग लें.</p>

      <h3>मंगल प्रदोष व्रत कथा-</h3>

      <p>एक नगर में एक वृद्ध महिला रहती थी. वह काफी गरीब थी, उसके एक ही पुत्र था. वृद्ध महिला की भगवान शिव और हनुमान जी पर गहरी आस्था थी. वो प्रत्येक मंगलवार को नियमपूर्वक व्रत रखकर हनुमानजी की पूजा- आराधना करती थी. एक बार हनुमानजी ने महिला की परीक्षा लेने की सोची.
        फिर क्या था हनुमानजी, एक साधु का वेश धारण कर महिला के घर के बाहर जाकर भिक्षा मांगने लगे
        जब महिला ने साधु की आवाज सुनी तो वो दरवाजे पर जाकर बोली </p>

      <p>“साधु महाराज मै बहुत गरीब हूँ, फिर भी घर में जो है, वो लेकर आती हूँ”
        हनुमान जी(वेशधारी साधु)  बोले- “मैं भूखा हूं, भोजन करूंगा, तुम थोड़ी जमीन लीप दो” </p>

      <p>वृद्ध महिला दुविधा में पड़ गई, और हाथ जोड़कर बोली- महाराज, लीपने और मिट्टी खोदने के अतिरिक्त आप कोई दूसरी आज्ञा दें, मैं अवश्य पूर्ण करूंगी. साधु महाराज ने तीन बार प्रतिज्ञा कराने के बाद कहा- तुम अपने बेटे को बुलाओ, मैं उसकी पीठ पर आग जलाकर भोजन बनाऊंगा.
        यह सुनकर वृद्ध महिला घबरा गई, परंतु वो वचन दे चुकी थी. उसने अपने पुत्र को बुलाकर साधु महाराज को सौंप दिया.</p>

      <p>साधु वेशधारी हनुमानजी ने वृद्ध महिला के पुत्र को पेट के बल लिटवाया और महिला से उसकी पीठ पर आग जलाने के लिए कहा. महिला ने साधु महाराज के कहे अनुसार वैसा ही किया.</p>

      <p>इधर भोजन बनाकर साधु ने महिला को बुलाकर कहा- तुम अपने पुत्र को पुकारो ताकि वो भी आकर भोग लगा ले.
        इस पर महिला बोली- महाराज आप उसका नाम लेकर मुझे और कष्ट न पहुंचाए. </p>

      <p>  लेकिन जब साधु महाराज नहीं माने तो महिला ने अपने पुत्र को आवाज लगाई. उसका पुत्र घर के अंदर से भागता हुआ बाहर आया, ये देख महिला आश्चर्यचकित होकर, साधु महाराज के चरणों में गिर गई. हनुमान जी ने महिला को अपने असली रुप में आकर दर्शन दिए, उसके सारे कष्ट दूर होने और अंत में मोक्ष प्राप्ति का आशीर्वाद दिया.</p>

      <p><strong> आशा है आपको हमारा लेख पसंद आया होगा. लेख पूरी तरह से मान्यताओं और जानकारियों पर आधारित है. हम इसकी पुष्टि नहीं करते हैं. स्वस्थ रहें, सुरक्षित रहें, ईश्वर की कृपा सदा आप पर बनी रहे.</strong></p>

    </div>
  },
  {
    id: 'abcdefs',
    date: 'May 06, 23',
    title: 'जून 2023 अंक ज्योतिष राशिफल: जन्मतिथि के अनुसार कैसा रहने वाला है ये महीना',
    bannerImg: blog16,
    banner: blog_tile_16,
    disc: "ज्योतिष विज्ञान के अनुसार, जब कोई व्यक्ति जन्मतिथि के आधार पर अपनी कुंडली बनवाता है, तो उसके भविष्य के बारे में कुछ बातें पता चल सकती हैं। अगर हम जून 2023 के लिए अंक ज्योतिष राशिफल की बात करें, तो आप अपने जीवन के बारे में कुछ जान सकते हैं। इस राशिफल के आधार पर आप जान सकते हैं कि आने वाले माह में आपके जीवन में कैसे बदलाव हो सकते हैं। चलिए जानते हैं कि जून के माह में आपके जीवन में क्या बदलाव हो सकते हैं।",

    text: <div> <p>ज्योतिष विज्ञान के अनुसार, जब कोई व्यक्ति जन्मतिथि के आधार पर अपनी कुंडली बनवाता है, तो उसके भविष्य के बारे में कुछ बातें पता चल सकती हैं। अगर हम जून 2023 के लिए अंक ज्योतिष राशिफल की बात करें, तो आप अपने जीवन के बारे में कुछ जान सकते हैं। इस राशिफल के आधार पर आप जान सकते हैं कि आने वाले माह में आपके जीवन में कैसे बदलाव हो सकते हैं। चलिए जानते हैं कि जून के माह में आपके जीवन में क्या बदलाव हो सकते हैं।</p>


      <p><strong> मूलांक 1 मई राशिफल </strong> मूलांक 1 वालों के लिए जून का महीना शुभ हो सकता है। इस महीने आपको सफलता और उपलब्धि की प्राप्ति की उम्मीद है। जून 2023 के अंक ज्योतिष राशिफल के अनुसार, इस महीने आप नई अनुभवों का आनंद उठा सकते हैं। हालांकि, इस महीने आपको कुछ चुनौतियों का सामना भी करना पड़ सकता है, लेकिन आपको मजबूती के साथ उनका सामना करना चाहिए। आपको अपने जीवन में परिवर्तन को ध्यान में रखना चाहिए, क्योंकि वह आपके विकास में महत्वपूर्ण भूमिका निभाएगा। इस महीने आपके सामने कई अवसर आ सकते हैं, जिन्हें आपको ध्यान से सोचकर उपयोग करना चाहिए।</p>

      <p>आपको इस महीने अपने आत्म-चिंतन और आत्म-देखभाल को महत्व देना चाहिए ताकि आप अपने जीवन में संतुलन बना सकें। जून के महीने में आपको कुछ महत्वपूर्ण निर्णय लेने पड़ सकते हैं, इसलिए आपको सोच-समझकर और आत्मविश्वास के साथ निर्णय लेना होगा।</p>


      <p><strong>मूलांक 2 मई राशिफल </strong> मूलांक 2 वालों के लिए जून का महीना बहुत महत्वपूर्ण और सफल हो सकता है। इस महीने आप अपने प्रेम जीवन में आनंद का अनुभव कर सकते हैं। लेकिन आपको रिश्तों को मजबूत बनाने के लिए समझदारी और सहयोग की आवश्यकता होगी। इसलिए आपको अपने साथी के साथ संवाद और समझदारी करने का प्रयास करना चाहिए, ताकि आप खुशहाल जीवन का आनंद ले सकें। इसके साथ ही, आपका करियर में सफलता का अनुभव होगा। आपकी वित्तीय स्थिति में सुधार होगा और आप नए निवेश या साझेदारी में शामिल हो सकते हैं, जिससे आपको भविष्य में लाभ होगा। जून का महीना अंक 2 वालों के लिए नए अवसर लेकर आया है।</p>

      <p>जून के महीने में आप अपने जीवन के बहुत सारे आनंद उठा सकते हैं, इसलिए आपको अपने जीवन में संतुलन बनाए रखना बहुत आवश्यक है। सकारात्मक मानसिकता के साथ आप अपने आने वाले किसी भी चुनौती को पार कर सकेंगे। चुनौतियों को सुलझाने के लिए संचार कौशल महत्वपूर्ण होगा।</p>

      <p><strong>मूलांक 3 मई राशिफल </strong> मूलांक 3 वालों के लिए जून का महीना बहुत उत्साहजनक और अवसरों से भरा होगा। आपको इस महीने में कई नए अवसर मिल सकते हैं और आप उन्हें अपना सकते हैं। इसके साथ ही, आपकी आशावादी और उत्साही दृष्टि रहेगी जो आपको आगे बढ़ने में मदद करेगी। आप अपने जीवन के विभिन्न क्षेत्रों में विकास कर सकते हैं और मुख्य भूमिका निभा सकते हैं, जो आपको नए चीजें सीखने का अवसर देगी और कार्यक्षेत्र में सम्मान कमाने का मौका देगी। आपके आसपास के लोग आपकी प्रेरणा लेने के लिए प्रभावित हो सकते हैं। इसके साथ ही, आप जून के महीने में नई चीजों को सीखने में रुचि दिखा सकते हैं।</p>

      <p>जीवन में बदलाव को स्वीकार करना महत्वपूर्ण होता है, इसलिए आपको आने वाले बदलावों को स्वीकार करने की क्षमता रखनी चाहिए ताकि आप अपने जीवन में विकास कर सकें। आप अच्छे संचार कौशल के बादशाह हैं, और इससे आपको कई संपर्क मिल सकते हैं जो आपके भविष्य में लाभकारी होंगे।</p>

      <p><strong>मूलांक 4 मई राशिफल</strong> जून 2023 में मूलांक 4 वालों के लिए परिवर्तन का महीना होगा और इसके साथ नए अवसर भी मिलेंगे। आपको इस माह में स्थिरता और संयम के साथ अपने व्यक्तिगत और पेशेवर जीवन पर काम करना चाहिए। आप अपने जीवन में परिवर्तन का अनुभव कर सकते हैं और अपने प्रयासों के फल को प्राप्त करेंगे। इस माह में आपको आर्थिक विकास और रिश्तों में मजबूती का अनुभव होगा।</p>

      <p> इसके अलावा, जून माह में आपके लिए साझेदारी और नए संबंध बनाने का अच्छा समय है। आप इस माह में कई नए लोगों से मिल सकते हैं और साझेदारी कर सकते हैं। ये संबंध भविष्य में आपके काम आ सकते हैं और आपके विकास और सफलता में महत्वपूर्ण भूमिका निभा सकते हैं। आपको बातचीत, चर्चा, सभा आदि में भाग लेना चाहिए, क्योंकि ये आपके विकास और सफलता के लिए महत्वपूर्ण होंगे।</p>

      <p><strong> मूलांक 5 मई राशिफल </strong> जून 2023 में मूलांक 5 वाले जातकों के लिए रोमांचक समय का आनंद होगा। यह महीना आपके लिए गतिशील और अवसरों से भरा होगा, और आपको नए अनुभवों का भी इंतजार होगा। आपके रिश्ते इस दौरान और भी मजबूत होंगे और आप कई नई साझेदारियों में शामिल हो सकते हैं। आपकी आर्थिक स्थिति बेहतर होगी, क्योंकि धन लाभ के कई अवसर आपको मिलेंगे।</p>

      <p> इसके साथ ही, इस अंक वाले जातकों को अपने व्यक्तिगत विकास पर ध्यान केंद्रित करना चाहिए। इस महीने आप खुद की खोज करेंगे और जीवन में कई चुनौतियाँ आ सकती हैं। लेकिन संकल्प और सहनशीलता के साथ आप सफलता प्राप्त कर सकते हैं। आपका स्वास्थ्य इस महीने अच्छा रहेगा, लेकिन संतुलित जीवनशैली बनाए रखना और खुद की देखभाल को प्राथमिकता देना आवश्यक होगा। जून में, मूलांक 5 वाले जातकों को परिवर्तन को अपनाकर जीवन में आ रहे अवसरों का लाभ उठाना चाहिए।</p>

      <p><strong> मूलांक 6 मई राशिफल </strong> जून 2023 में मूलांक 6 वाले जातकों के लिए यह एक आशाजनक महीना होगा, जहां सकारात्मक ऊर्जा और अनुकूल परिस्थितियाँ आपको आगे बढ़ने के लिए प्रेरित करेंगी। इस महीने आपके जीवन में कई नए अवसर आएंगे, और आपको इनका लाभ उठाना चाहिए। आपको अपने रिश्तों को मजबूत करने पर ध्यान देना चाहिए और व्यावसायिक क्षेत्र में प्रयास करना चाहिए, क्योंकि यह महीना आपको लाभ प्रदान कर सकता है। आपकी वित्तीय स्थिति में स्थिरता और प्रचुरता की पेशकश होगी।</p>

      <p> आपका स्वास्थ्य बढ़िया रहेगा, जिससे आप शारीरिक गतिविधियों में संलग्न हो सकेंगे और संतुलित जीवनशैली का आनंद ले सकेंगे। यदि आप नए उद्यम शुरू कर रहे हैं, तो यह महीना आपके लिए फलदायी परिणामदायी साबित हो सकता है। मूलांक 6 वाले जातकों के लिए यह महत्वपूर्ण है कि वे शांतिपूर्वक आचरण बनाए रखें, जिससे वे चुनौतियों को अनुग्रह के साथ संभाल सकें।</p>

      <p><strong> मूलांक 7 मई राशिफल </strong> जून 2023 में मूलांक 7 वाले जातकों के लिए यह महीना काफी अच्छा रहेगा। आपको इस माह में कई अवसर मिलेंगे, जिससे आपका व्यक्तिगत विकास होगा। जून महीने में आपकी सभी महत्वाकांक्षाएं पूरी होंगी, क्योंकि आपके लिए जीवन में नए रास्ते खुलेंगे। आपके विचारों में स्पष्टता की भावना रहेगी, जिससे आप समझदारी से निर्णय ले पाएंगे। आप मजबूत संबंध अपने करीबी लोगों के साथ बना सकते हैं और अपने लक्ष्यों को साधने के लिए संकल्प और ध्यान से काम करेंगे।</p>

      <p> जीवन में कुछ चुनौतियां उभर सकती हैं, लेकिन आपको उनसे निपटने की क्षमता होगी। आपके जीवन में समन्वित ऊर्जा और संतुलन होगा, जो आपको शांति और सुख लाएगा। अपने आंतरिक ज्ञान पर भरोसा करें, क्योंकि वह आपको सकारात्मक परिणामों की ओर ले जाएगा। हालांकि, इस परिवर्तनकारी महीने को आशावाद के साथ ग्रहण करें और इससे होने वाले सकारात्मक बदलावों का लाभ उठाएं।"</p>

      <p><strong> मूलांक 8 मई राशिफल </strong> जून 2023 के अंक ज्योतिष राशिफल के अनुसार, अंक 8 वाले जातकों को इस महीने में सक्रिय और प्रगतिशीलता के लिए तैयार रहना चाहिए। वे अपने मनोबल को बनाए रखें और अपने लक्ष्यों की ओर प्रगति करें। अपने परिवार और प्रियजनों के साथ संबंधों को मजबूत रखने का भी ध्यान दें। इस माह को शांति और संतुलन के साथ बिताने के लिए अपने स्वास्थ्य पर विशेष ध्यान दें। नियमित योगा और मेडिटेशन से आप तनाव को कम कर सकते हैं और शारीरिक और मानसिक स्वास्थ्य को सुधार सकते हैं।</p>

      <p>आपको अपने कार्य में संयम और संगठन की आवश्यकता होगी। यह महीना आपके लिए वित्तीय स्थितियों में उत्कृष्टता का समय हो सकता है। अपनी व्यवस्था को सुधारने और निवेश के माध्यम से संपत्ति को वृद्धि देने के लिए उचित कदम उठाएं। आपको आपके उद्योग में मेहनत और समर्पण के साथ काम करना होगा ताकि आप सफलता की ओर बढ़ सकें। </p>

      <p><strong> मूलांक 9 मई राशिफल </strong> मूलांक 9 वाले जातकों के लिए जून 2023 माह में परिवर्तनशीलता और सकारात्मक ऊर्जा का समय होगा। आप इस माह में महत्वपूर्ण विकास और प्रगति के अनुभव कर सकते हैं। इस समय आपको संकल्पित और सकारात्मक रहने की आवश्यकता होगी और सभी चुनौतियों का सामना करना पड़ सकता है। आपकी पौराणिक शक्ति और स्पष्टता की भावना आपको आपके उद्देश्यों की ओर आग्रह करेगी और आप आने वाले अवसरों का लाभ उठा सकेंगे।</p>

      <p>हालांकि, इन चुनौतियों का सामना करना आपके व्यक्तिगत विकास के लिए प्रेरक होगा। ये मुश्किलें आपकी शक्तियों को बढ़ा सकती हैं और आपको अपनी क्षमताओं को पहचानने के लिए प्रोत्साहित कर सकती हैं। जून के अंत तक, आप अपने उद्देश्यों को प्राप्त करने के लिए स्पष्टता की भावना के साथ प्रेरित हो सकते हैं। आपका आंतरिक ज्ञान आपके मार्गदर्शन में सहायता करेगा और इससे आपको सफलता मिलेगी।</p>

    </div>
  },
  {
    id: 'abcdeft',
    date: 'May 07, 23',
    title: 'ओम नम: शिवाय का जाप, कराएगा बेड़ा पार,',
    bannerImg: blog17,
    banner: blog_tile_17,
    disc: "जैसा कि हम सब जानते हैं शास्त्रों के अनुसार प्रदोष व्रत भगवान शिव की ख़ास कृपा पाने का दिन है, जो प्रदोष व्रत बुधवार के दिन पड़ता है उसे बुध प्रदोष कहते हैं. इस विशेष दिन भगवान शिव की उपासना करने से जीवन में आ रही सभी समस्याएं दूर होती हैं और जीवन में सुख समृद्धि की प्राप्ति होती है. बुध प्रदोष व्रत में हरी वस्तुओं का प्रयोग करना चाहिए. जो भी भक्तजन प्रदोष व्रत रखना चाहते हैं, वो सुबह- सवेरे स्नान करने के बाद साफ कपड़े पहनें.उसके बाद सूर्य देव को जल से ​अर्घ्य दें.उसके बाद हाथ में जल और पुष्प लेकर प्रदोष व्रत और शिव पूजा का संकल्प करें.इसके बाद दिन में आप दैनिक पूजा पाठ कर सकते हैं.दिनभर फलाहार ले सकते हैं.जितना संभव हो ज्यादा से ज्यादा भगवान भोलेनाथ की भक्ति में समय व्यतीत करें.दिन के समय में व्रत के दौरान सोना वर्जित है.आप शाम के समय किसी शिव मंदिर में जाकर पूजा कर सकते हैं अथवा घर पर ही विधिपूर्वक पूजा - अर्चना करें.इस दौरान ओम नम: शिवाय मंत्र का उच्चारण करते रहें.",

    text: <div>
      <h3> बुध प्रदोष व्रत का महत्व, पूजा विधि, कथा....</h3>

      <p>जैसा कि हम सब जानते हैं शास्त्रों के अनुसार प्रदोष व्रत भगवान शिव की ख़ास कृपा पाने का दिन है, जो प्रदोष व्रत बुधवार के दिन पड़ता है उसे बुध प्रदोष कहते हैं. इस विशेष दिन भगवान शिव की उपासना करने से जीवन में आ रही सभी समस्याएं दूर होती हैं और जीवन में सुख समृद्धि की प्राप्ति होती है. बुध प्रदोष व्रत में हरी वस्तुओं का प्रयोग करना चाहिए. </p>

      <p>जो भी भक्तजन प्रदोष व्रत रखना चाहते हैं, वो सुबह- सवेरे स्नान करने के बाद साफ कपड़े पहनें. उसके बाद सूर्य देव को जल से ​अर्घ्य दें. उसके बाद हाथ में जल और पुष्प लेकर प्रदोष व्रत और शिव पूजा का संकल्प करें. इसके बाद दिन में आप दैनिक पूजा पाठ कर सकते हैं. दिनभर फलाहार ले सकते हैं. जितना संभव हो ज्यादा से ज्यादा भगवान भोलेनाथ की भक्ति में समय व्यतीत करें. दिन के समय में व्रत के दौरान सोना वर्जित है.आप शाम के समय किसी शिव मंदिर में जाकर पूजा कर सकते हैं अथवा घर पर ही विधिपूर्वक पूजा- अर्चना करें. इस दौरान ओम नम: शिवाय मंत्र का उच्चारण करते रहें.</p>

      <h3>बुध प्रदोष व्रत की कथा</h3>

      <p>प्राचीन समय की बात है, एक आदमी का नया नया विवाह हुआ था, वो गौने के बाद अपनी पत्नी को लेने अपने ससुराल पहुंचा और उसने सास से कहा कि वो बुधवार के दिन अपनी पत्नी को विदा कराके घर लौट जाएगा. इस पर उसके सास ससुर ने समझाया कि बुधवार को पत्नी को विदा कराकर ले जाना शुभ नहीं है. लेकिन वो आदमी अपनी बात पर अड़ा रहा, यहाँ तक की सास- ससुर के अलावा उसके साले- सालियों और गाँव के लोगों ने भी उसे बहुत समझाया पर वो अपनी बात से टस से मस ना हुआ, आखिरी में हार मानकर उसके सास ससुर ने अपने बेटी दामाद को भारी मन से विदा कर दिया. दोनों पति- पत्नी बैल गाड़ी में बैठकर अपने गांव की ओर चल दिए.</p>


      <p>चलते-चलते एक नगर के बाहर उस आदमी की पत्नी को प्यास लगी. उसने पति से कहा कि जाओ जाकर थोड़ा पानी ले आओ. वो आदमी अपनी पत्नी के कहे अनुसार हाथ में एक लोटा लेकर पानी लेने चला गया. जब वो आदमी पानी लेकर लौटा तो उसकी आखें फटी की फटी रह गईं, उसने देखा कि उसकी पत्नी किसी पराये आदमी द्वारा लाए लोटे से पानी पीकर उससे खूब खुश होकर बातें कर रही है और सबसे अचंभे कि बात ये कि वो पराया पुरुष देखने में बिल्कुल उसकी ही शक्ल सूरत का है. ये सब देखकर वो बहुत गुस्से में आकर अपनी पत्नी और उस आदमी पर आग बबूला होकर, उनसे लड़ाई करने लगा. धीरे धीरे वहां काफी भीड़ एकत्रित हो गई और सिपाही भी आ गए.</p>

      <p>सिपाहियों ने उस औरत से पूछा की सच सच बताओं की तुम्हारा पति इन दोनों में से कौन है. लेकिन वो औरत चुप रही, क्योंकि दोनों ही बिल्कुल हूबहू थे. वो कोई फैसला नहीं कर पा रही थी. ये सब देख उस आदमी को अपने सास-ससुर की कही बात याद आ गई, वो मन ही मन पछताने लगा और भगवान शिव से प्रर्थना करने लगा.</p>

      <p>“हे भगवान मुझे और मेरी पत्नी को इस मुसीबत से बचा लो. मैंने अपनी पत्नी को बुधवार के दिन विदा कराकर जो अपराध किया है उसके लिए मुझे माफ कर दो. भविष्य में मैं ऐसी गलती कभी नही करूंगा. भगवान शिव उसकी प्रार्थना से खुश हो गए और दूसरा व्यक्ति उसी समय कहीं अंतर ध्यान हो गया. इसके बाद वो आदमी अपनी पत्नी के साथ सही सलामत अपने घर पहुंच गया. इसके बाद से दोनों पति पत्नी नियमपूर्वक प्रदोष व्रत करने लगे.</p>

      <p>बुध प्रदोष व्रत के दिन कथा और पूजन के समापन के बाद शिव जी से मनोकामना पूर्ति के लिए प्रार्थना करना ना भूलें. उसके बाद रा​त्रि में जागरण करें. अगले दिन सुबह स्नान ध्यान से निवृत होकर पूजा पाठ करें. उसके बाद अपने सामर्थ्य अनुसार दान करें. फिर सूर्योदय के बाद भोजन करके व्रत को पूरा करें.</p>

      <p><strong>आशा है आपको हमारा लेख पसंद आया होगा. लेख पूरी तरह से मान्यताओं और जानकारियों पर आधारित है. हम इसकी पुष्टि नहीं करते हैं. स्वस्थ रहें, सुरक्षित रहें, ईश्वर की कृपा सदा आप पर बनी रहे.</strong></p>

    </div>
  },
  {
    id: 'abcdefu',
    date: 'May 08, 23',
    title: 'कमाएं गौ दान के बराबर का पुण्य सुख, सौभाग्य, समृद्धि और मोक्ष का रास्ता- सोम प्रदोष व्रत प्रदोष व्रत का महत्व, सोम प्रदोष व्रत की विस्तार से जानकारी, कथा और महिमा.',
    bannerImg: blog18,
    banner: blog_tile_18,
    disc: "हिंदू धर्म में व्रत, उपवास का बेहद महत्व है. हिंदू धर्म में प्रचलित अनेक व्रत और उपवास में से एक है प्रदोष व्रत. प्रदोष व्रत में भगवान भोलेनाथ की उपासना की जाती है. हिंदू चंद्र कैलेंडर के अनुसार प्रदोष व्रत चंद्र मास के 13वें दिन (त्रयोदशी) होता है. कहा जाता है कि प्रदोष के दिन भगवान शिव की पूजा करने से व्यक्ति के समस्त पाप धूल जाते हैं और अंत में उसे मोक्ष की प्राप्ति होती है. यह जीवन नें सुख, सौभाग्य और समृद्धि लाता है.",

    text: <div> <p>हिंदू धर्म में व्रत, उपवास का बेहद महत्व है. हिंदू धर्म में प्रचलित अनेक व्रत और उपवास में से एक है प्रदोष व्रत. प्रदोष व्रत में भगवान भोलेनाथ की उपासना की जाती है. हिंदू चंद्र कैलेंडर के अनुसार प्रदोष व्रत चंद्र मास के 13वें दिन (त्रयोदशी) होता है. कहा जाता है कि प्रदोष के दिन भगवान शिव की पूजा करने से व्यक्ति के समस्त पाप धूल जाते हैं और अंत में उसे मोक्ष की प्राप्ति होती है. यह जीवन नें सुख, सौभाग्य और समृद्धि लाता है.</p>

      <p>माना जाता है कि प्रदोष काल में भगवान भोलेनाथ कैलाश पर्वत पर अपने रजत भवन में तांडव करते हैं और उस समय सभी देवी देवता उनकी स्तुति करते हैं. प्रदोष व्रत के अनेक नाम हैं. सोमवार के दिन पड़ने वाली प्रदोष तिथि को सोम प्रदोष व्रत कहते हैं. वहीं मंगलवार के दिन पड़ने वाली प्रदोष तिथि को भौम प्रदोष व्रत कहा जाता है.</p>

      <p>आज हम सोम प्रदोष व्रत के बारे में जानेंगे, सोम प्रदोष व्रत करने से चंद्रमा समेत सभी ग्रह और नक्षत्र शुभ प्रभाव प्रदान करते हैं. इस व्रत के प्रभाव से बिगड़े काम भी बन जाते हैं और अंत में मोक्ष की प्राप्ति होती है. इतना ही नहीं धार्मिक मान्यताओं के अनुसार सोम प्रदोष व्रत की कथा सुनने मात्र से गौ दान के बराबर के पुण्य की प्राप्ति होती है. आपको बता दें कि दिन और रात्रि के मिलन को प्रदोष काल माना जाता है, यानि की सूर्यास्त हो रहा हो और रात्रि शुरु हो रही हो, उसे प्रदोष कहा जाता है. इस समय भगवान शिव की अराधना करने से मनचाहे फल की प्राप्ति होती है और हर दोष दूर हो जाता है.</p>


      <p><strong>सोम प्रदोष व्रत </strong> में भगवान शिव, देवी पार्वती, भगवान गणेश,भगवान कार्तिकेय और नंदी की पूरे विधि विधान से पूजा अर्चना की जाती है. सोम प्रदोष व्रत में प्रदोष काल यानी शाम का समय शुभ माना जाता है- </p>

      <ul>
        <li>सोम प्रदोष व्रत के दिन व्रत करने वाले को सुबह जल्दी उठकर नहाना चाहिए और सूर्यदेव को अर्घ्य देने के बाद शिवजी की पूजा-अर्चना करनी चाहिए.</li>
        <li>प्रदोष काल में फिर से शिवजी और माता पार्वती की विधि-विधान से पूजा करनी चाहिए</li>
        <li>भगवान को पंचामृत या गंगाजल से स्नान कराएं. </li>
        <li>इसके बाद भगवान पर बेलपत्र, सफेद फूल, अक्षत, भांग, धूप, नैवेद्य, पान, सुपारी, लौंग, इलायची और फल चढ़ाएं.</li>
        <li>8 दिशाओं में 8 दीपक जलाकर प्रदोष व्रत की कथा पढ़ें और इसके बाद आरती करें. प्रदोष व्रत में रात्रि जागरण का भी विधान है.</li>
      </ul>

      <h3>सोम प्रदोष व्रत की कथा</h3>

      <p>एक नगर में एक स्त्री अपने पुत्र के साथ रहा करती थी. उसके पति की मृत्यु हो चुकी थी, इसलिए माता-पुत्र दोनों सुबह होते ही भीख मांगने निकल पड़ते थे. भिक्षा में जो कुछ भी प्राप्त होता, दोनों का उससे गुजारा चल रहा था, वो स्त्री नियम से प्रदोष व्रत किया करती थी. एक दिन वो स्त्री अपने पुत्र के साथ घर लौट रही थी, तभी उन्हें जंगल के करीब एक लड़का घायल अवस्था में कराहता हुआ मिला. माता-पुत्र ने गरीब होने के बावजूद घायल पड़े उस लड़के की मदद करने का फैसला किया और उसे अपने साथ घर ले आए. वो लड़का जब थोड़ा स्वस्थ हुआ तो उसने बताया कि वो विदर्भ का राजकुमार है और शत्रुओं ने उसके राज्य पर आक्रमण कर उसके पिता की हत्या कर दी है और जब लड़ते-लड़ते वो बेहोश होकर गिर गया तो शत्रुओं ने उसे मरा हुआ समझकर छोड़कर चले गए. स्वस्थ होने पर राजकुमार ने भी उस स्त्री के साथ प्रदोष व्रत रखने शुरु किए. एक रात राजकुमार के सपने में भगवान शिव आए और उसे फिर से सेना इक्ट्ठी करने और मित्र राज्यों के साथ मिलकर अपने खोए राज्य को वापस पाने के लिए उत्साहित किया और साथ ही उसे आदेश दिया कि अपना राजपाठ संभालने के बाद वो इस गरीब स्त्री और उसके पुत्र की देखभाल करें और बड़े होने पर उसके पुत्र को अपने राज्य में मंत्री पद दे. राजकुमार ने शिव शंकर के कहे अनुसार सबकुछ किया और खुशी-खुशी जीवन व्यतीत करके अंत में मोक्ष पाया.</p>

      <p>आशा है आपको हमारा लेख पसंद आया होगा. लेख पूरी तरह से मान्यताओं और जानकारियों पर आधारित है, किसी भी जानकारी या मान्यता को अमल में लाने से पहले संबंधित विशेषज्ञ से सलाह लें. स्वस्थ रहें, सुरक्षित रहें, ईश्वर की कृपा सदा आप पर बनी रहे.</p>
    </div>
  },
  {
    id: 'abcdefv',
    date: 'May 09, 23',
    title: 'मानसिक तनाव के लिए जातक के दोषों का विश्लेषण और निवारण',
    bannerImg: blog19,
    banner: blog_tile_19,
    disc: "मानसिक तनाव और इसके समाधान के संबंध में ज्योतिष एक माध्यम हो सकता है, जो जातक की कुंडली में विभिन्न ग्रह, भाव और योगों के माध्यम से मानसिक स्थिति को प्रभावित करता है। हालांकि, ध्यान देने योग्य है कि ज्योतिष केवल एक मानवीय विज्ञान नहीं है और इसे वैज्ञानिकता के संकेत के रूप में नहीं लिया जाना चाहिए। यह एक विचारशील दृष्टिकोण, धार्मिक आधार और अनुभव पर आधारित है। ",

    text: <div> <p>मानसिक तनाव और इसके समाधान के संबंध में ज्योतिष एक माध्यम हो सकता है, जो जातक की कुंडली में विभिन्न ग्रह, भाव और योगों के माध्यम से मानसिक स्थिति को प्रभावित करता है। हालांकि, ध्यान देने योग्य है कि ज्योतिष केवल एक मानवीय विज्ञान नहीं है और इसे वैज्ञानिकता के संकेत के रूप में नहीं लिया जाना चाहिए। यह एक विचारशील दृष्टिकोण, धार्मिक आधार और अनुभव पर आधारित है। </p>

      <h3>कुंडली में मानसिक तनाव के लिए जिम्मेदार ग्रह</h3>

      <p>कुंडली में मानसिक तनाव और चिंता के लिए जिम्मेदार ग्रहों की कुछ सामान्य स्थितियां और उनके प्रभावों को निम्नलिखित रूप में समझा जा सकता है:</p>

      <p> 1. शनि ग्रह (Saturn): शनि ग्रह को बाधाओं का कारक माना जाता है और इसका नकारात्मक प्रभाव तनाव और चिंता का कारण बन सकता है। जब शनि कुंडली में विशेष भावों में अस्थान प्राप्त करता है या दूसरे ग्रहों पर इसकी दृष्टि होती है, तो यह जातक में अलगाव की भावना पैदा कर सकता है। <br />

        2. मंगल ग्रह (Mars): मंगल ग्रह क्रोध, हताशा और चिंता का कारण बन सकता है। कुंडली के विशिष्ट भावों में मंगल की स्थिति या दूसरे ग्रहों पर इसकी दृष्टि जातक में बेचैनी, आवेग और आक्रामकता को पैदा कर सकती है। <br />

        3. चंद्रमा ग्रह (Moon): चंद्रमा कुंडली में भावनाओं के साथ जुड़ा होता है और इसका नकारात्मक प्रभाव मिज़ाज परिवर्तन, चिंता और भावनात्मक अस्थिरता को पैदा कर सकता है। कुंडली के विशिष्ट भावों में चंद्रमा की स्थिति या दूसरे ग्रहों पर इसकी दृष्टि जातक को अत्यधिक संवेदनशील और भावनात्मक रूप से कमजोर महसूस करा सकती है। <br />

        4. बुध ग्रह (Mercury): बुध ग्रह संचार और बुद्धि का प्रतीक है और इसका नकारात्मक प्रभाव निर्णय लेने, संचार और पारस्परिक संबंधों से संबंधित चिंता को पैदा कर सकता है। कुंडली के विशिष्ट भावों में बुध की स्थिति या दूसरे ग्रहों पर इसकी दृष्टि जातक को अपनी क्षमताओं पर संदेह करने का कारण बना सकती है।<br />

        5. राहु और केतु (Rahu and Ketu): राहु और केतु छाया ग्रह माने जाते हैं और इनके नकारात्मक प्रभाव से मानसिक अस्थिरता, भय और चिंता हो सकती है। कुंडली के विशिष्ट भावों में राहु और केतु की स्थिति या दूसरे ग्रहों पर इनकी दृष्टि जातक को अपने जीवन के बारे में भ्रमित और अनिश्चित महसूस करा सकती है। </p>


      <p>यहां उपरोक्त ग्रहों के अलावा भी कई अन्य ग्रह और उनकी स्थितियां हैं जो व्यक्ति की कुंडली में तनाव और चिंता का कारण बन सकती हैं। ज्योतिष विशेषज्ञ की सलाह लेने से आपको अपनी व्यक्तिगत स्थिति के आधार पर सटीक जानकारी मिलेगी और आपको सही उपाय की दिशा में मार्गदर्शन मिलेगा। </p>

      <h3> कुंडली में मानसिक तनाव के लिए जिम्मेदार भाव</h3>

      <p>ज्योतिष शास्त्र के अनुसार, विभिन्न भावों में स्थित ग्रहों की व्याख्या इस प्रकार की जाती है कि वे मानसिक तनाव और चिंता के संकेत दे सकते हैं। नीचे दिए गए हैं कुछ विशेष भाव और उनके संदर्भ में ग्रहों के प्रभाव की व्याख्या:</p>

      <p>1. छठा भाव: यह भाव स्वास्थ्य और सेवा के संबंध में प्रमुख होता है। शनि, मंगल और राहु के अशुभ स्थानों पर स्थित रहने पर तनाव और चिंता की स्थिति उत्पन्न हो सकती है। यहां जीवन में स्वास्थ्य समस्याएं और दैनिक जीवन की चिंताएं प्रभावित हो सकती हैं।<br />

        2. आठवां भाव: इस भाव में मृत्यु, परिवर्तन और छिपे हुए भय का प्रतिनिधित्व होता है। अगर अशुभ ग्रहों की स्थिति होती है, तो यह मृत्यु, आर्थिक हानि और छिपे हुए भय के कारण तनाव और चिंता का कारण बन सकता है।<br />

        3. बारहवां भाव: इस भाव में अलगाव, आध्यात्मिकता और छिपे हुए शत्रुओं का प्रतिनिधित्व होता है। अगर अशुभ ग्रहों की स्थिति होती है, तो यह छिपे हुए

        शत्रुओं और अलगाव से संबंधित चिंता और तनाव का कारण बन सकता है।<br />

        4. प्रथम भाव: यह भाव व्यक्तित्व और आत्म-प्रतिष्ठा का प्रतिनिधित्व करता है। यदि इस भाव में अशुभ ग्रहों की स्थिति होती है, तो यह आत्म-प्रतिष्ठा और व्यक्तित्व से संबंधित चिंता और तनाव का कारण बन सकता है।<br />

        5. पंचम भाव: इस भाव में रचनात्मकता और बुद्धिमत्ता का प्रतिनिधित्व होता है। यदि अशुभ ग्रहों की स्थिति होने पर यहां रचनात्मक क्षमताओं और बुद्धि से संबंधित तनाव और चिंता उत्पन्न हो सकती है।</p>

      <h3> कुंडली में मानसिक तनाव के लिए जिम्मेदार दोष </h3>

      <p>वैदिक ज्योतिष में मानसिक तनाव के लिए जिम्मेदार दोषों के बारे में यहां बताया गया है, जो व्यक्ति के जीवन में तनाव पैदा कर सकते हैं:</p>

      <p>1. मंगल दोष: यह दोष तब उत्पन्न होता है जब मंगल ग्रह किसी व्यक्ति की कुंडली के विशेष भावों में स्थित होता है। इसे विवाह में बाधा और तनाव का कारक माना जाता है.<br />

        2. कालसर्प दोष: यह दोष तब उत्पन्न होता है जब राहु और केतु एक साथ किसी कुंडली में स्थित होते हैं। यह दोष विभिन्न क्षेत्रों में तनाव और कठिनाई का कारण बन सकता है.<br />

        3. पितृ दोष: यह दोष पूर्वजों के कर्तव्यों या पितृ श्राप के कारण उत्पन्न होता है। यह दोष व्यक्ति के जीवन में तनाव और कठिनाई का कारण बन सकता है.<br />

        4. शनि दोष: जब किसी व्यक्ति की कुंडली में शनि ग्रह कमजोर या नकारात्मक स्थिति में होता है, तो शनि दोष होता है। इसे जीवन के विभिन्न क्षेत्रों में तनाव और कठिनाई का कारण माना जाता है.<br />

        5. गुरु चांडाल दोष: यह दोष तब उत्पन्न होता है जब गुरु और राहु ग्रह एक साथ किसी कुंडली में स्थित होते हैं। यह दोष व्यक्ति के जीवन में तनाव और कठिनाई  का कारण बन सकता है. </p>

      <h3>तनाव और चिंता से बचने के लिए वास्तु उपाय</h3>
      <p> वास्तुशास्त्र में घर के लेआउट की महत्वपूर्णता बहुत है। अगर घर में चीजें सही तरीक़े से व्यवस्थित की गई हैं तो तनाव से मुक्ति और खुशहाल जीवन के लिए नये दृष्टिकोण देखने को मिलते हैं और व्यक्ति की मानसिक शक्ति मज़बूत बनती है। तनाव और चिंता से बचने के लिए यहां कुछ वास्तु उपाय दिए गए हैं: </p>

      <p> 1. नियमित सफाई और अव्यवस्थित चीजों से छुटकारा: घर को नियमित रूप से साफ और साफ़-सुथरा रखें। अव्यवस्थित और अनावश्यक चीजों से छुटकारा पाएं। यह आपको एक शुद्ध और सकारात्मक माहौल प्रदान करेगा। <br />

        2. उचित वेंटिलेशन: अच्छा वेंटिलेशन यूनिटी के माध्यम से घर में ताजगी का प्रवाह सुनिश्चित करता है। यह घर के अंदर की गुणवत्ता को सुधारने में मदद करता है और सकारात्मक ऊर्जा को बढ़ाता है। <br />

        3. शांतिपूर्ण रंग: नीले, हरे और बैंगनी जैसे शांतिपूर्ण और सकारात्मक रंगों का उपयोग करें। इन रंगों का उपयोग घर में शांति, तनावमुक्तता और सकारात्मकता का वातावरण सृजित करने में मदद करता है। <br />

        4. बेडरूम की स्थिति: बेडरूम को दक्षिण-पश्चिम कोने में स्थापित करें, यह घर के वास्तु के अनुसार शांति और सुख को बढ़ाने में मदद कर सकता है। अपने बिस्तर को इस तरह स्थापित करें कि आपके सिर की दिशा दक्षिण या पूर्व की ओर हो। <br />

        5. बिस्तर के नीचे की सफाई: यदि आपके बिस्तर के नीचे अव्यवस्थितता है, तो उसे साफ और सुरक्षित रखें। नकारात्मक ऊर्जा को बढ़ाने से बचने के लिए बिस्तर के नीचे के स्थान को साफ़ रखें और उन चीजों से बचें जो वहां नहीं होनी चाहिए। <br />

        6. पौधों का उपयोग: पौधे एक शांतिपूर्ण और सकारात्मकता भरे माहौल को बढ़ाने में मदद कर सकते हैं। अपने घर में चमेली, एलोवेरा और अन्य पौधों का उपयोग करें जो शांति और आराम के लिए जाने जाते हैं। <br />

        7. बेडरूम में शीशे का उपयोग: बेडरूम में शीशे का उपयोग नकारात्मक ऊर्जा को बढ़ा सकता है। इसलिए शीशे का उपयोग कम करें या सोने से पहले उन्हें कपड़े से ढक दें। यह एक शांतिपूर्ण बेडरूम का माहौल सृजित करने में मदद करेगा।</p>

    </div>
  },
  {
    id: 'abcdefw',
    date: 'May 10, 23',
    title: 'ऐशो आराम की जिंदगी जीतने वाली 5 राशियाँ: नहीं करतीं अपनी इच्छाओं से समझौता',
    bannerImg: blog20,
    banner: blog_tile_20,
    disc: "ज्योतिष शास्त्र के अनुसार, कुछ राशियां होती हैं जो ऐशो आराम से जीवन जीना पसंद करती हैं और इसलिए उन्हें लक्ष्मी जी की प्रिय राशियां माना जाता है। ये राशियां शाही या धनवान परिवार में जन्म लेती हैं और अपने जीवन को ऐशो आराम के साथ बिताने की प्राथमिकता रखती हैं। आइये जानते है कि राशि चक्र में लक्ष्मी जी की प्रिय राशियां कौन सी है।",

    text: <div> <p>ज्योतिष शास्त्र के अनुसार, कुछ राशियां होती हैं जो ऐशो आराम से जीवन जीना पसंद करती हैं और इसलिए उन्हें लक्ष्मी जी की प्रिय राशियां माना जाता है। ये राशियां शाही या धनवान परिवार में जन्म लेती हैं और अपने जीवन को ऐशो आराम के साथ बिताने की प्राथमिकता रखती हैं। आइये जानते है कि राशि चक्र में लक्ष्मी जी की प्रिय राशियां कौन सी है।</p>

      <p><strong> वृषभ राशि </strong> वृषभ राशि (Taurus) वालों को आरामदायक और विलासितापूर्ण जीवन जीने की इच्छा होती है। यह एक स्थिर (fixed) पृथ्वी तत्व वाली राशि है और इसे शुक्र ग्रह (Venus) शासित करता है। वृषभ राशि के जातकों में सामृद्धिक आनंद, खूबसूरती और भौतिक सुख की इच्छा होती है। इसे कई बार लक्ष्मी जी की प्रिय राशि माना जाता है।</p>

      <p>इस राशि के व्यक्ति संपत्ति, आर्थिक सुरक्षा और आराम को महत्व देते हैं। वे उच्च गुणवत्ता वाली संपत्ति, शानदार कपड़े और अच्छे गहने पसंद करते हैं। इसके साथ ही, वे विलासिता के जीवन की आनंद लेते हैं और अपने जीवन को सुखद बनाने के लिए प्रयास करते हैं।</p>


      <p>वृषभ राशि के जातकों को वित्तीय सुरक्षा का ध्यान रखने की आवश्यकता होती है और वे इसके लिए कठिन मेहनत करते हैं। यह राशि वाले व्यक्ति दृढ़ संकल्प और व्यावहारिक मानसिकता रखते हैं जो उन्हें वित्तीय निर्णय लेने और निवेश करने में मदद करती है। वृषभ राशि के जातक अपनी आर्थिक सुरक्षा के लिए सावधानीपूर्वक निवेश करने का प्रयास करते हैं और अपने प्राप्त धन को बचाने और बढ़ाने के लिए कठिनाईयों का सामना करते हैं।</p>

      <p>वृषभ राशि के लोगों को अपने प्राकृतिक आसपास के साथ गहरा संबंध होता है और वे इसे आनंद लेते हैं। वे ग्रामीण क्षेत्रों में संपत्ति निवेश करना पसंद करते हैं, जो उन्हें शांति और सुकून की भावना प्रदान करती हैं।</p>

      <p>वृषभ राशि के लोग भोजन के मामले में भी आनंद लेते हैं और विभिन्न प्रकार के आहार का आनंद उठाते हैं। उन्हें अपनी पसंदीदा चीज़ों को प्राप्त करने की ख्वाहिश होती है और वे इसके लिए कठिन मेहनत भी करते हैं। वृषभ राशि के जातक सामृद्धिक और सुखद जीवन जीने की इच्छा रखते हैं और वे अपने जीवन में सुख-सुविधा का आनंद लेना पसंद करते हैं। इस राशि के लोगों पर मां लक्ष्मी की विशेष कृपा होती है। इसके कारण ये लोग अपने जीवन में काफी धन प्राप्त करते है।</p>

      <p><strong>मिथुन राशि </strong></p>

      <p>मिथुन राशि के जातक बहुत संवेदनशील होते हैं और उन्हें अपने आसपास के माहौल में बेहतरीन चीजों का आनंद लेने की क्षमता होती है। वे कला, साहित्य, संगीत और सांस्कृतिक कार्यक्रमों में रुचि रखते हैं और अपनी सृजनात्मकता को व्यक्त करने में उन्हें खुशी मिलती है। इसके साथ ही, वे अपने विचारों और विचारधारा को व्यक्त करने के लिए समान मनोवृत्ति वाले लोगों के साथ बातचीत करना पसंद करते हैं।</p>

      <p> मिथुन राशि के जातक कार्यात्मक होते हैं और अपने कार्यस्थल पर कुशलता से अपने कामों को पूरा करते हैं। वे बुद्धिजीवी होते हैं और अपनी समस्याओं का समाधान निकालने में माहिर होते हैं। उन्हें नए और चुनौतीपूर्ण कार्यों के साथ रहना पसंद होता है और वे इनमें अपनी बुद्धि और नौकरी का सबसे अच्छा उपयोग करने का प्रयास करते हैं। उनके घर पर डिजाइनर फर्नीचर, कलाकृति और शानदार सजावट का सामान मौजूद होता हैं। </p>

      <p>इस राशि के जातक नए अनुभवों की तलाश में हमेशा उत्सुक रहते हैं और ज्ञान और जानकारी की प्राप्ति के लिए प्रयासरत रहते हैं। उन्हें खुद को स्वतंत्र और स्वाधीन महसूस करने की आवश्यकता होती है और इसलिए वे आध्यात्मिक और मानसिक विकास के मार्ग पर अपना ध्यान केंद्रित करते हैं। इन सभी गुणों के साथ, मिथुन राशि के जातक जीवन में आराम और आनंद की कमी को महसूस नहीं करते हैं और विभिन्न विलासितापूर्ण चीजों का आनंद उठाते हैं। उनके घर में शानदार सजावट और विलासितापूर्ण सुविधाएं होती हैं जो उनकी विलासिता को पूरा करती हैं।</p>

      <p> <strong> सिंह राशि </strong> सिंह राशि के जातक एक राजा के समान शाही जीवन जीना पसंद करते हैं। अपने आप में विश्वास रखते हैं और स्वतंत्रता की प्राथमिकता देते हैं। वे अक्सर नेतृत्व की भूमिका में आने के लिए प्रशंसा प्राप्त करते हैं और अपनी प्रतिभा और क्षमताओं का पूरा उपयोग करते हैं। इन लोगों की स्वभाविक प्रवृत्ति होती है कि वे सामान्यतः अपने आसपास के लोगों को प्रभावित करने का प्रयास करते हैं और उन्हें मार्गदर्शन और प्रेरणा प्रदान करते हैं। </p>

      <p> सिंह राशि के जातकों को प्रतिस्पर्धा में आगे बढ़ने की इच्छा होती है और वे अपने लक्ष्यों की प्राप्ति के लिए मेहनत करते हैं। इन्हें सार्वजनिक या सामाजिक स्थान पर आदान-प्रदान करने में आनंद और संतुष्टि मिलती है और वे अपनी अद्वितीयता और प्रतिष्ठा की कामना करते हैं। इस राशि वालों को लक्ज़री सामान बेहद पसंद होता है। साथ ही ये लोग अपने घरों को अक्सर उत्कृष्ट कलाकृति से सजाते है। इस राशि के जातक काफी आकर्षित होते है, जिसके कारण बाकी लोग आसानी से इनकी तरफ आकर्षित हो जाते है।</p>

      <p> <strong> तुला राशि </strong> तुला राशि के जातक शांतिपूर्ण और सुखद जीवन का आनंद लेने की प्राथमिकता रखते हैं। वे ऐशो-आराम से भरी जिंदगी जीने का अभिलाषी होते हैं और समृद्धि, सुख, और अधिकारों की प्राप्ति को महत्व देते हैं। वे जीवन की हर पहलू पर संतुलन बनाए रखने का प्रयास करते हैं और विश्राम, मनोरंजन, और सामाजिक संगठनों में अपना समय बिताने का आनंद लेते हैं। तुला राशि के जातक आरामदायक और विलासितापूर्ण जीवन को पसंद करते हैं और यहां तक कि उन्हें शांति और सौभाग्य के लिए उचित माहौल और समृद्धि का महत्व भी होता है।</p>

      <p> तुला राशि के जातकों को धन और समृद्धि की प्राप्ति के लिए सक्रियता और विवेकपूर्ण निर्णय लेने की आवश्यकता होती है। वे सामाजिक माहौल में अपने रिश्तों और सामरिक संबंधों को मजबूत बनाने के लिए नेटवर्किंग, व्यवसायिक योग्यता, और वाणिज्यिक कौशल का उपयोग करते हैं। वे धार्मिक और नैतिक मूल्यों का सम्मान करते हैं और उच्च स्तर की न्यायिक नीति और सामाजिक इंस्टीट्यूशन के विकास में योगदान देते हैं। इन सभी गुणों के साथ, वे स्वयं पर आत्मविश्वास और प्रगति के लिए मेहनत करते हैं जो उन्हें धन, समृद्धि, और सुख की प्राप्ति में सहायता कर सकती है।</p>

      <p><strong>मीन राशि</strong> मीन राशि के जातकों को धन की कमी का अनुभव नहीं होता है। इन लोगों की मेहनती और संघर्षपूर्ण प्रवृत्ति के कारण वे अपने जीवन में सफलता प्राप्त करते हैं। वे कठिनाइयों का सामना करने के लिए तत्पर रहते हैं और अपने काम में मेहनत और समर्पण दिखाते हैं। इन लोगों पर लक्ष्मी माँ का आशीर्वाद होता है और वे मेहनती लोगों को पसंद करती हैं, जिसके कारण उन्हें आराम से धन की प्राप्ति होती है।</p>

      <p> मीन राशि के जातक अपने आर्थिक मोर्चे पर हमेशा आगे बढ़ते रहते हैं और वे हाथ पर हाथ धरे बैठना पसंद नहीं करते हैं। उन्हें स्वतंत्रता और स्वाधीनता का महत्वपूर्ण अनुभव होता है और वे अपने काम को स्वयं करने में विश्वास रखते हैं। ये लोग अपने अद्यतन और विकास पर बल देते हैं और नए अवसरों की तलाश करते हैं। इन गुणों के कारण, मीन राशि के जातकों को आर्थिक मामलों में पीछे देखने की कोई आवश्यकता नहीं होती है।</p>

      <p> याद रखें कि ज्योतिष एक विज्ञान है जो व्यक्ति के व्यक्तिगत गुणों और प्रवृत्तियों का अध्ययन करता है, लेकिन इसमें भाग्य और संघर्ष के तत्व भी शामिल होते हैं। आपके कर्म, प्रयास और नियति आपके आर्थिक स्थिति को प्रभावित करते हैं। इसलिए, आपके अद्यतन और मेहनती प्रयास आपके आर्थिक सफलता को बढ़ाने में महत्वपूर्ण भूमिका निभाते हैं।</p>
    </div>
  },
  {
    id: 'abcdefx',
    date: 'May 11, 23',
    title: 'ज्योतिष शास्त्र के अनुसार जानें कि क्या व्यक्ति का जीवनसाथी पहले से तय होता है',
    bannerImg: blog21,
    banner: blog_tile_21,
    disc: "प्रत्येक व्यक्ति के जीवन में एक साथी की खोज व्यक्तिगत संतोष और खुशहाली का एक महत्वपूर्ण हिस्सा होती है। जब हम अपने आप को एक साथी के साथ संयुक्त करते हैं, तो हमारा जीवन उत्कृष्टता, समृद्धि और सुख की ओर आग्रस्त होता है। ज्योतिष शास्त्र एक प्राचीन विज्ञान है जो इस प्रश्न पर प्रकाश डाल सकता है: क्या हमारा जीवनसाथी हमारे लिए पहले से ही तय होता है?",

    text: <div> <p>प्रत्येक व्यक्ति के जीवन में एक साथी की खोज व्यक्तिगत संतोष और खुशहाली का एक महत्वपूर्ण हिस्सा होती है। जब हम अपने आप को एक साथी के साथ संयुक्त करते हैं, तो हमारा जीवन उत्कृष्टता, समृद्धि और सुख की ओर आग्रस्त होता है। ज्योतिष शास्त्र एक प्राचीन विज्ञान है जो इस प्रश्न पर प्रकाश डाल सकता है: क्या हमारा जीवनसाथी हमारे लिए पहले से ही तय होता है?</p>

      <p>हालांकि, इस मुद्दे पर विभिन्न दृष्टिकोण हो सकते हैं। कुछ लोग मानते हैं कि ज्योतिष शास्त्र वास्तविकता में विश्वासयोग्य है और इसके माध्यम से व्यक्ति का जीवनसाथी पहले से ही निर्धारित किया जा सकता है। ज्योतिष शास्त्र के अनुसार, ग्रहों की स्थिति, कुंडली और भाग्य पर आधारित अनुमान लगाए जा सकते हैं जो व्यक्ति के जीवनसाथी की पहचान कर सकते हैं।</p>

      <p>"इस दृष्टिकोण के अनुसार, व्यक्ति के जीवनसाथी पहले से तय होता है। ज्योतिष शास्त्र में मान्यता है कि ग्रहों की चाल के आधार पर और कुंडली के विश्लेषण से जीवनसाथी की पहचान की जा सकती है। ग्रहों का प्रभाव व्यक्ति के जीवन में विवाह संबंधी योग को प्रभावित करता है, जिससे उसका जीवनसाथी पहले से निर्धारित हो जाता है। कुंडली में राशि, नक्षत्र और ग्रहों की स्थिति के माध्यम से जीवनसाथी का प्रकटीकरण किया जा सकता है।"</p>

      <h3> ज्योतिष में, व्यक्ति की जीवनसाथी भविष्यवाणी करने के लिए निम्नलिखित ग्रहों का महत्वपूर्ण योगदान होता है:</h3>

      <p> 1. शुक्र ग्रह: शुक्र ग्रह प्रेम, सौंदर्य, आकर्षण, और रोमांटिक भावनाओं का प्रतिनिधित्व करता है। जन्म कुंडली में शुक्र की स्थिति और पहलू देखकर ज्योतिषी व्यक्ति के प्रेम और संबंधों के प्रति उसकी प्राथमिकता का अनुमान लगा सकते हैं। <br />

        2. चंद्रमा ग्रह: चंद्रमा ग्रह मन, भावनाएं, और आध्यात्मिकता का प्रतिनिधित्व करता है। जन्म कुंडली में चंद्रमा की स्थिति व्यक्ति के रिश्तों में भावनात्मक आकर्षण, संवेदनशीलता, और संबंधों की महत्त्वाकांक्षा के बारे में संकेत देती है। <br />

        3. मंगल ग्रह: मंगल ग्रह जोश, ऊर्जा, प्रेरणा, और यौनता का प्रतिनिधित्व करता है। जन्म कुंडली में मंगल की स्थिति और पहलू ज्योतिषी को व्यक्ति की साहसिकता, आक्रामकता, और यौन उत्प्रेरणा के बारे में जानकारी देती है।</p>

      <p> यह ग्रह व्यक्ति के जीवनसाथी के संबंध में मार्गदर्शन प्रदान करते हैं, लेकिन इनके अलावा भी कुंडली में अन्य ग्रहों और भावों का भी महत्व होता है। ज्योतिषी कुंडली के संपूर्ण विश्लेषण के आधार पर व्यक्ति के जीवन के विभिन्न पहलुओं को देखते हुए जीवनसाथी के संबंध में सलाह देते हैं। इसलिए, ग्रहों का विश्लेषण करने के साथ-साथ अन्य आवश्यक प्रमाणों को भी मध्यस्थ करना महत्वपूर्ण है।</p>

      <h3>ज्योतिष में, जीवनसाथी भविष्यवाणी के लिए सप्तम भाव और पंचम भाव महत्वपूर्ण होते हैं।</h3>

      <p>
        1. सप्तम भाव: सप्तम भाव साझेदारी और विवाह का भाव होता है। इस भाव के माध्यम से ज्योतिषी व्यक्ति के जीवनसाथी के बारे में जानकारी प्राप्त करते हैं। सप्तम भाव किसी के संभावित जीवनसाथी को समझने में महत्वपूर्ण भूमिका निभाता है। सप्तम भाव में मंगल ग्रह एक भावुक और मुखर साथी की आवश्यकता का संकेत दे सकता है। इसके साथ ही, सप्तम भाव पर अन्य ग्रहों द्वारा निर्मित पहलू रिश्तों की प्रकृति के बारे में महत्वपूर्ण विवरण प्रदान करते हैं।</p>

      <p> 2. पंचम भाव: पंचम भाव प्रेम संबंधों, रोमांस, और रचनात्मकता का प्रतिनिधित्व करता है। इस भाव की सहायता से ज्योतिषी व्यक्ति के भावी साथी के बारे में जान सकते हैं। पंचम भाव में व्यक्ति के प्रेम के प्रति दृष्टिकोण को दर्शाता है। इसके अलावा, पंचम भाव प्रेम का प्रतिनिधित्व करता है और एक दीर्घकालिक साझेदारी या जीवनसाथी के बारे में बताता है। पंचम भाव से जुड़ी ऊर्जा को समझकर, व्यक्ति अपने डेटिंग जीवन और उन गुणों के बारे में जानकारी प्राप्त कर सकता है, जो उन्हें संभावित जीवनसाथी के बारे में बता सकती है।</p>

      <p> यह दोनों भाव जीवनसाथी के बारे में महत्वपूर्ण ज्योतिषीय जानकारी प्रदान करते हैं। ज्योतिषी कुंडली का पूरा विश्लेषण करते हुए व्यक्ति के जीवन के अन्य पहलुओं को भी ध्यान में रखते हैं और उचित सलाह देते हैं।</p>

      <h3> क्या जीवन साथी पहले से तय होता है? </h3>

      <p>ज्योतिष शास्त्र में, जीवनसाथी के पहले से तय होने या न होने की मान्यता विभिन्न हो सकती है और यह व्यक्ति के ज्योतिषीय दृष्टिकोण पर निर्भर करता है। कुछ ज्योतिषी विश्वास करते हैं कि जन्म कुंडली में ग्रहों की स्थिति और योग व्यक्ति के जीवनसाथी के बारे में निर्दिष्ट संकेत प्रदान कर सकते हैं। इसके आधार पर, ज्योतिषी जीवनसाथी के बारे में भविष्यवाणी कर सकते हैं। हालांकि, इसे सच्चाई या निश्चितता की तरह लेना सम्भव नहीं है, और ज्योतिषी की व्यक्तिगत विशेषताओं, अनुभव, और तत्वों पर निर्भर करता है।</p>

      <p> व्यक्ति की जन्म कुंडली में विभिन्न घटकों की स्थिति और ग्रहों के संयोग के माध्यम से, ज्योतिषी जीवनसाथी के संभावित गुणों, प्रेम के प्रति दृष्टिकोण और संभावित सम्पन्नता के बारे में विश्वास करते हैं। इसमें विभिन्न भावों और ग्रहों की संयोजना, विपरीत संयोग, योग, दशा-भुक्ति, और अन्य तत्वों का अध्ययन शामिल होता है।</p>

      <p>हालांकि, इस विषय पर विभिन्न स्कूल ऑफ़ थॉट हैं और अलग-अलग ज्योतिषी अलग-अलग दृष्टिकोण रखते हैं। कुछ ज्योतिषी जानकारी को बहुत महत्वपूर्ण मानते हैं और मानते हैं कि जीवनसाथी के गुणों का पूर्व-निर्धारण किया जा सकता है, जबकि कुछ अन्य ज्योतिषी इसे पूर्णतः विवादास्पद मानते हैं और व्यक्तिगत पसंद, आपसी संबंध और कर्मों के प्रभाव को अधिक महत्व देते हैं।</p>

      <p>संक्षेप में कहें तो, ज्योतिष शास्त्र जीवनसाथी के पहले से तय होने या न होने की विवादास्पद मान्यता रखता है, और यह व्यक्ति के विश्वास और अपने ज्योतिषीय दृष्टिकोण पर निर्भर करता है।</p>

      <h3> सप्तम भाव से जानें जीवनसाथी का स्वभाव</h3>

      <p>ज्योतिष के अनुसार, व्यक्ति की कुंडली के सप्तम भाव में राशियों और ग्रहों के होने से हम जीवनसाथी के स्वभाव के बारे में कुछ विशेष बातें जान सकते हैं। निम्नलिखित विवरण आपको सामग्री का अधिक अवधारणा करने में मदद करेंगे:</p>

      <p>1. सप्तम भाव में मेष, सिंह या धनु राशि होने पर जीवनसाथी साहसी और अधिक क्रोधी स्वभाव वाला होता है. वे अपने जीवन में साहसिक और प्रबल भूमिका निभाते हैं.</p>
      <p>2. सप्तम भाव में कर्क, वृश्चिक या मीन राशि होने पर जीवनसाथी भावुक और कोमल स्वभाव वाला होता है. वे संवेदनशील होते हैं और जीवन के भावुक पहलुओं को महत्व देते हैं.</p>
      <p>3. सप्तम भाव में वृषभ, कन्या या मकर राशि होने पर जीवनसाथी कार्यकुशल होता है, लेकिन अंतर्मुखी स्वभाव वाला होता है. वे अपने कर्तव्यों में निष्ठापूर्ण और परिश्रमी होते हैं.</p>
      <p>4. सप्तम भाव में मिथुन, तुला या कुंभ राशि होने पर जीवनसाथी सामाजिक, वाचक और व्यवहार में अच्छा होता है. वे मानसिक रूप से सामाजिक होते हैं और संगठन के लिए कुशल होते हैं.</p>
      <p>यह तथ्यों का उपयोग व्यक्तिगत अनुभव और जीवनसाथी के साथ व्यक्तिगत अनुभवों के साथ मिलाकर किया जाना चाहिए। कुंडली के अध्ययन से केवल जीवनसाथी के स्वभाव के बारे में मात्र एक सामान्य अंदाजा दिया जा सकता है, इसलिए इसे विशेष संदर्भ मानना चाहिए। अगर आपको व्यक्तिगत ज्योतिषी बातचीत करनी हो तो उनसे अपनी स्थिति का विश्लेषण करवाना बेहतर होगा।</p>

      <h3> सप्तम भाव में ग्रह</h3>

      <p>ज्योतिष के अनुसार, सप्तम भाव में ग्रहों का होना भी जीवनसाथी के स्वभाव के बारे में अवधारणा करने में मदद करता है। निम्नलिखित विवरण आपको ग्रहों के स्थिति के बारे में अधिक जानकारी देता है:</p>

      <p> 1. सप्तम भाव में सूर्य ग्रह होने पर जीवनसाथी अहंकारी, आत्मविश्वासी और धनी हो सकता है। वे अपने अंदर के प्रभावशाली और सक्षम गुणों के बारे में गर्व महसूस करते हैं।</p>
      <p>2. सप्तम भाव में मंगल ग्रह होने पर जीवनसाथी महत्वकांक्षी, क्रोधी, खर्चीला और खाने-पीने का शौकीन हो सकता है। उनमें अधिक ऊर्जा और प्रवृत्ति हो सकती है, जिससे कभी-कभी जीवनसाथी के साथ संघर्ष हो सकता है।</p>
      <p>3. सप्तम भाव में बुध ग्रह होने पर जीवनसाथी बातूनी और बुद्धिमान हो सकता है। वे वाणीकी, बुद्धि, और ज्ञान में माहिर होते हैं और वाणी की महत्वाकांक्षा रखते हैं।</p>
      <p>4. सप्तम भाव में गुरु ग्रह होने पर जीवनसाथी धार्मिक, समझदार और शिक्षित हो सकता है। वे अपनी विचारधारा और ज्ञान को महत्व देते हैं और सामाजिक मामलों में उच्च स्तर पर सोच सकते हैं।</p>
      <p>5. सप्तम भाव में शुक्र ग्रह होने पर जीवनसाथी आकर्षक, सुंदर और कलाप्रिय हो सकता है। वे सौंदर्य, कला, और सुख को महत्व देते हैं और जीवन को आनंददायी बनाने के लिए प्रयास करते हैं।</p>
      <p>6. सप्तम भाव में शनि ग्रह होने पर जीवनसाथी गंभीर, अंतर्मुखी, रूढ़िवादी और निराशावादी हो सकता है। वे कार्यों को गंभीरता से लेते हैं और जीवन की उचितता और सत्यता को महत्व देते हैं।</p>
      <p>7. सप्तम भाव में चंद्रमा ग्रह होने पर जीवनसाथी मददगार और शांत स्वभाव का हो सकता है। वे संवेदनशीलता, सहानुभूति और आदर्शवादीता के गुणों को महत्व देते हैं और परिवार और साथी के साथ मेल-जोल में खुशहाली का ध्यान रखते हैं।</p>
      <p>8. सप्तम भाव में राहु और केतु ग्रह होने पर जीवनसाथी समझदार हो सकता है, लेकिन उनकी रिश्तों में स्वार्थपूर्ण भावनाएं रह सकती हैं। वे कूटनीतिज्ञता और अपने हित की चिंता कर सकते हैं।</p>

      <p> यह सूची ज्योतिष द्वारा उपयोग की जाने वाली अवधारणाओं का संक्षेप है और यह व्यक्ति की कुंडली के अन्य ग्रहों और प्रभावों के साथ भी संबंधित हो सकता है। ज्योतिष के अनुसार ग्रहों का केवल एक भाव में होना ही संपूर्ण जीवनसाथी के व्यक्तित्व को परिभाषित नहीं करता है, और यह सिर्फ एक मात्र दिशा प्रदान करता है। अगर आप अपने जीवनसाथी के बारे में और गहराई से जानना चाहते हैं, तो एक अभिज्ञ ज्योतिषी से संपर्क करना सर्वोत्तम होगा।</p>

    </div>
  },

]

export const UpComingEventData = [
  {
    title: 'Vat Purnima Vrat',
    banner: vrat,
    date: '03 June  2023'
  },
  {
    title: 'Rath Yatra',
    banner: Rath,
    date: '20 June  2023'
  },
  {
    title: 'Yogini Ekadashi',
    banner: Yogini,
    date: '14 June  2023'
  },
]

export const astrr_CatData = [
  {
    title: 'Delay In Marriage',
    image: astroImg1,
    url: '/marriage-problems-astrology'

  },
  {
    title: 'Career Astrology',
    image: astroImg2,
    url: '/career-astrology-in-india'

  },
  {
    title: 'Palm Readers',
    image: astroImg3,
    url: '/hand-reading-astrology'

  },
  {
    title: 'Business Astrology',
    image: astroImg4,
    url: '/business-astrology-in-india'
  },

]

export const HoroscopesData = [
  {
    CategoryTitle: 'weekly',
    weeklyData: [
      {
        id: 1,
        signTitle: 'Aries',
        disc: <div>
          <p> This week holds exciting prospects for Aries, as romance, career growth, and personal well-being take center stage. With the lucky number 9 and the lucky color red by your side, let's explore the opportunities that await you. In matters of the heart, Aries can anticipate a surge of romantic energy. New connections may blossom, while existing relationships deepen and strengthen. Embrace these passionate moments and invest time and effort in nurturing your relationships.</p>

          <p> Allow love to flourish and bring joy into your life. On the professional front, business endeavors are poised to thrive. Take bold actions and seize new opportunities that come your way. This week holds the promise of career growth and success, but it requires your proactive involvement. Don't shy away from taking on challenges and pushing your boundaries.</p>

          <p> Trust in your abilities and let your determination drive you towards achieving your goals. While focusing on your career and love life, it is equally important to prioritize your well-being. Engage in activities that bring you joy and help you relax. Strive for a balanced lifestyle that enhances your overall health and vitality. This surge of energy and motivation you're experiencing can be harnessed to tackle new challenges both professionally and personally.</p>

          <p>  Assert your needs in relationships and communicate openly with your loved ones. Amidst all the excitement, remember to take care of your health. Make sure to get enough rest and relaxation to recharge your mind and body. By maintaining a healthy balance and prioritizing self-care, you can maximize your productivity and overall happiness. As you navigate this week, keep the lucky number 9 and the lucky color red in mind. Embrace the opportunities that come your way, both in your career and love life.</p>

          <p>  Trust in your abilities, take calculated risks, and maintain a holistic approach that encompasses your well-being. In conclusion, this week presents a dynamic blend of romance, career growth, and self-care for Aries. Embrace the possibilities, harness your lucky number 9, and infuse your life with the vibrant energy of the lucky color red. Seize the opportunities, nurture your relationships, and prioritize your well-being. Success and fulfillment await you on this exciting journey.</p>
        </div>
      },
      {
        id: 2,
        signTitle: 'Taurus',
        disc: <div>
          <p>This week may present Taurus with some emotional challenges, but with the lucky number 6 and the lucky color green guiding you, you can navigate them with grace and find success in various aspects of your life. In matters of the heart, effective communication and understanding will be crucial for maintaining harmony in your relationships. Take the time to express yourself clearly and listen actively to your loved ones.</p>

          <p>By fostering open and honest communication, you can overcome any emotional challenges and strengthen the bonds you share. On the professional front, Taurus can expect growth and opportunities. Trust your instincts and make decisions with confidence. Stay focused on your goals, and success will follow. This week emphasizes stability and practicality, encouraging you to build a solid foundation in your career. Be open to financial opportunities that may come your way and make choices that align with your long-term aspirations.</p>

          <p> While pursuing career advancements, it is equally important to prioritize your physical and mental health. Engage in activities that promote relaxation and rejuvenation. Prioritize self-care to maintain balance and well-being. Find healthy ways to release stress and cultivate a supportive environment that nurtures your overall health. In all areas of life, including relationships and career, adaptability and versatility will be key. Stay open to new connections and be willing to adapt to changing circumstances in your professional endeavors. By embracing these qualities, you can navigate challenges and seize opportunities that come your way. </p>

          <p> As you navigate the week, keep the lucky number 6 and the lucky color green in mind. These elements symbolize stability, growth, and balance. Prioritize mental and emotional well-being, and seek harmony in all areas of your life. By finding equilibrium, you can navigate the emotional challenges and embrace the opportunities that arise. In conclusion, this week presents Taurus with a blend of emotional challenges and opportunities for growth. Embrace effective communication, trust your instincts, and stay focused on your goals. Prioritize self-care, adaptability, and versatility to maintain balance and find success. With the lucky number 6 and the lucky color green as your guides, you have the tools to overcome challenges and create a fulfilling and harmonious week ahead.</p>
        </div>
      },
      {
        id: 3,
        signTitle: 'Gemini',
        disc: <div>
          <p> Gemini, get ready for a week filled with love, professional growth, and a focus on well-being. With the lucky number 3 and the lucky color yellow on your side, exciting opportunities await you. In matters of the heart, love is in the air for Gemini. New connections may spark, and existing relationships have the potential to deepen. Embrace open and honest communication to strengthen your bonds and foster deeper connections. This week, prioritize emotional well-being and nurturing your relationships, allowing love to flourish.</p>

          <p>  On the professional front, your career shines bright. New opportunities may arise, and your ideas will be well-received by colleagues and superiors. Embrace teamwork and collaboration to achieve success. Trust your intuition when making decisions, as it will guide you towards the right path. This week holds the promise of positive changes in your career, so be open to new opportunities and take bold steps towards your goals. While pursuing professional growth, it is essential to maintain a healthy routine that supports your overall well-being.</p>

          <p> Incorporate exercise, meditation, and a balanced diet into your daily life. Nurturing your physical and mental health is key to maximizing your productivity and maintaining a positive mindset. Prioritize self-care practices that recharge and rejuvenate you. As you navigate this week, keep the lucky number 3 and the lucky color yellow in mind. Number 3 signifies creativity, self-expression, and growth, while the color yellow represents optimism and positivity. Embrace these energies as you embrace new connections, professional opportunities, and personal well-being.</p>

          <p> In conclusion, this week brings forth a blend of love, professional growth, and well-being for Gemini. Embrace the new connections and deepen existing relationships, communicate openly, and prioritize emotional well-being. Embrace the positive changes in your career, trust your intuition, and collaborate with others for success. Nurturing your health and well-being is paramount. With the lucky number 3 and the lucky color yellow guiding you, you have the tools to embrace the opportunities and create a fulfilling week ahead.</p>
        </div>
      },
      {
        id: 4,
        signTitle: 'Cancer',
        disc: <div>
          <p> Cancer, get ready for a week filled with stability, growth, and emotional connections. With the lucky number 2 and the lucky color silver guiding you, you can navigate the realms of love and career with grace and success. In matters of the heart, this week brings stability and harmony to your relationships. Nurture the emotional connections and cherish the moments shared with your loved ones. Focus on effective communication and teamwork, as these qualities will enhance the bonds you share.</p>

          <p>  Embrace the opportunities for growth and deepening connections, allowing love to flourish. On the professional front, teamwork and collaboration will play a vital role in your career. Your efforts will be recognized, leading to new opportunities and growth. Embrace these chances and contribute your unique skills and ideas to achieve success. This week holds the promise of advancement and recognition, so stay open to collaborations and trust in your abilities. While pursuing career growth, it is important to pay attention to your emotional well-being. Engage in activities that bring you peace and relaxation.</p>

          <p> Prioritize self-care to maintain balance and inner harmony. If needed, seek support from loved ones or professionals to navigate any emotional challenges that may arise. By taking care of your emotional well-being, you can perform at your best and maintain a positive mindset. Express yourself confidently in your relationships and let your creativity flow in your career. Take calculated risks that align with your goals, as they can lead to exciting opportunities and growth. Pay attention to your physical well-being as well, ensuring you have outlets to release any stress or tension. Find healthy ways to manage and cope with any challenges that may come your way. As you navigate this week, keep the lucky number 2 and the lucky color silver in mind. Number 2 represents harmony, cooperation, and balance, while the color silver symbolizes intuition and grace.</p>

          <p>Embrace these energies as you foster emotional connections, collaborate in your career, and prioritize your well-being. In conclusion, this week offers stability, growth, and emotional connections for Cancer. Nurture your relationships, focus on teamwork in your career, and embrace the opportunities that come your way. Pay attention to your emotional well-being, express yourself confidently, and take calculated risks. With the lucky number 2 and the lucky color silver guiding you, you have the tools to navigate the week with grace and success in both your personal and professional endeavors.</p>
        </div>
      },
      {
        id: 5,
        signTitle: 'Leo',
        disc: <div>
          <p>Leos, get ready for a week filled with love, professional success, and stability. With the lucky number 5 and the lucky color gold as your guiding forces, you can confidently navigate the realms of love and career. In matters of the heart, love and passion take center stage for Leos this week. Express your feelings openly and wholeheartedly, and enjoy the beautiful moments shared with your partner. Embrace the deep connections and let love flourish in your life.</p>

          <p>On the professional front, success is on the horizon. Your leadership skills will shine, and your efforts will be rewarded. Embrace new challenges with confidence, knowing that you have the skills and capabilities to overcome them. This week brings opportunities for professional growth and recognition. Trust in your abilities and seize these chances for advancement. While pursuing professional success, it is crucial to focus on maintaining a healthy work-life balance. Take breaks and indulge in activities that bring you joy and relaxation. Nurturing your physical and mental health is vital to sustain your productivity and overall well-being.</p>

          <p> Prioritize self-care practices that support your overall wellness. This week emphasizes stability and practicality in both your career and relationships. Focus on building a solid foundation in both aspects of your life. Be open to financial opportunities that may come your way, as they can contribute to your stability and growth. Take time for self-care and find healthy ways to release stress and maintain balance. As you navigate this week, keep the lucky number 5 and the lucky color gold in mind.</p>

          <p> Number 5 represents versatility, adaptability, and positive change, while the color gold symbolizes prosperity and success. Embrace these energies as you navigate the realms of love, career, and personal well-being. In conclusion, this week offers Leos a blend of love, success, and stability. Embrace love and passion in your relationships, and express your feelings openly. Embrace the professional success that awaits you and confidently take on new challenges. Focus on maintaining a healthy work-life balance and prioritize self-care. With the lucky number 5 and the lucky color gold guiding you, you have the tools to navigate the week with confidence and embrace the opportunities for love, success, and stability that come your way.</p>
        </div>
      },
      {
        id: 6,
        signTitle: 'Virgo',
        disc: <div>
          <p>Virgo, get ready for a week filled with challenges and opportunities for growth in your love life and career. With the lucky number 4 and the lucky color navy blue as your guiding forces, you can navigate these challenges with patience, practicality, and success. In matters of the heart, this week may present some challenges. Patience and understanding will be key in maintaining harmony in your relationships. Trust the process and communicate openly with your partner. By fostering open and honest communication, you can overcome any obstacles and strengthen the bonds you share. Embrace the opportunities for growth and deeper connections that arise.</p>

          <p> On the professional front, growth and success are within reach. However, it may require extra effort and focus on your part. Stay determined and don't hesitate to seek support from colleagues or mentors. By leveraging their expertise and guidance, you can navigate the challenges and reach new heights in your career. Trust in your abilities and stay focused on your goals. While pursuing professional growth, it is crucial to prioritize self-care and stress management. Engage in activities that bring you peace and relaxation. Take breaks to recharge and maintain your overall well-being. </p>

          <p>By nurturing your physical and mental health, you can perform at your best and overcome any challenges that come your way. This week emphasizes organization and practicality in all areas of your life. Take steps to improve your work environment and find a balance between your personal and professional life. Nurture your relationships and openly communicate your needs and desires. Prioritize self-care and pay attention to your mental and emotional health. As you navigate this week, keep the lucky number 4 and the lucky color navy blue in mind. Number 4 signifies stability, practicality, and discipline, while the color navy blue represents trust, reliability, and calmness.</p>

          <p> Embrace these energies as you tackle challenges in your love life and career. In conclusion, this week offers Virgo a blend of challenges and opportunities for growth. Embrace patience and understanding in your relationships, communicate openly, and trust the process. Embrace the opportunities for professional growth, stay focused, and seek support when needed. Prioritize self-care, maintain balance, and nurture your relationships. With the lucky number 4 and the lucky color navy blue guiding you, you have the tools to navigate the challenges with patience, practicality, and success in both your personal and professional endeavors.</p>

        </div>
      },
      {
        id: 7,
        signTitle: 'Libra',
        disc: <div>
          <p>Libra, get ready for a week filled with love, career growth, and a focus on balance. With the lucky number 7 and the lucky color pink as your guiding forces, you can navigate the realms of love and career with harmony, success, and a touch of sweetness. In matters of the heart, love and harmony fill your life this week. Existing relationships will strengthen, and new connections have the potential to blossom. Embrace the joy of love and express your feelings openly and authentically.</p>

          <p> Let your heart guide you as you nurture and deepen the bonds you share. This week holds the promise of beautiful connections and a harmonious love life. On the professional front, your career is on an upward trajectory. New opportunities and growth are likely to come your way. Trust your instincts and take calculated risks, as they can lead you towards success. Embrace these opportunities with confidence, knowing that you have the skills and capabilities to seize them.</p>

          <p>This week brings positive developments in your career, so stay open to new opportunities and be proactive in pursuing them. While pursuing love and career success, it is important to focus on maintaining balance in all aspects of your life. Pay attention to your physical and mental well-being, as they are crucial for your overall happiness and productivity. Incorporate relaxation techniques into your routine to effectively manage stress and find moments of peace amidst the busyness of life.</p>

          <p>Prioritize self-care practices that rejuvenate your mind, body, and soul. Harmony and balance are the themes for the week, both in your relationships and career. Cultivate peace in your relationships and seek compromise when conflicts arise. Embrace open communication and find common ground to maintain harmony and deepen your connections. In your career, stay open to new opportunities and maintain a balanced approach to your work. Seek harmony between your personal and professional life. As you navigate this week, keep the lucky number 7 and the lucky color pink in mind. Number 7 signifies intuition, spiritual growth, and inner wisdom, while the color pink represents love, compassion, and harmony.</p>

          <p>  Embrace these energies as you embrace love, success, and balance in your life. In conclusion, this week offers Libra a blend of love, career growth, and harmony. Embrace the love and joy in your relationships, express your feelings openly, and deepen your connections. Embrace the opportunities for career growth and success, trust your instincts, and take calculated risks. Focus on maintaining balance and prioritize your well-being. With the lucky number 7 and the lucky color pink guiding you, you have the tools to navigate the week with harmony, success, and a touch of sweetness in both your personal and professional endeavors.</p>
        </div>
      },
      {
        id: 8,
        signTitle: 'Scorpio',
        disc: <div>
          <p>Scorpio, get ready for a week filled with passion, career growth, and self-care. With the lucky number 8 and the lucky color black as your guiding forces, you can navigate the realms of love and career with intensity, determination, and self-awareness. In matters of the heart, passion and intensity define your love life this week. Embrace the deep connections you have and express your desires openly. Keep communication channels open and honest, allowing for authentic and meaningful exchanges with your partner.</p>

          <p> Embrace the intensity of your emotions and let them guide you towards deeper connections and fulfillment in love. On the professional front, your career prospects are promising. Your hard work and dedication will be recognized, opening doors to new opportunities and growth. Embrace these opportunities with confidence, knowing that you have the skills and capabilities to excel. Trust in your abilities and continue to give your best effort. This week holds the potential for significant advancements in your career, so stay focused on your goals and be prepared to seize the moment.</p>

          <p> While pursuing love and career success, it is crucial to prioritize your well-being. Engage in activities that promote physical and mental wellness. Take breaks when needed and effectively manage stress to maintain optimal health. Prioritize self-care practices that nourish your mind, body, and soul. By taking care of yourself, you can maintain a strong foundation for personal and professional growth. This week encourages self-reflection and emotional growth. Pay attention to your intuition and trust your instincts as you navigate both your personal and professional life.</p>

          <p> In your career, focus on long-term goals and make practical plans to achieve them. By setting clear intentions and taking consistent action, you can make significant progress towards your objectives. Prioritize self-care and find healthy ways to manage stress, as emotional well-being is essential for your overall success and fulfillment. As you navigate this week, keep the lucky number 8 and the lucky color black in mind. Number 8 symbolizes determination, abundance, and success, while the color black represents power, introspection, and protection. Embrace these energies as you embrace passion, growth, and self-care in both your personal and professional endeavors.</p>

          <p>In conclusion, this week offers Scorpio a blend of passion, career growth, and self-care. Embrace the intensity of love, express your desires openly, and deepen your connections. Embrace the promising career prospects, trust in your abilities, and seize the opportunities that come your way. Prioritize your well-being through self-care practices and effective stress management. With the lucky number 8 and the lucky color black guiding you, you have the tools to navigate the week with intensity, determination, and self-awareness, ensuring your success and fulfillment in all areas of life.</p>
        </div>
      },
      {
        id: 9,
        signTitle: 'Sagittarius',
        disc: <div>
          <p>Sagittarius, get ready for a week filled with exciting adventures in love, career growth, and finding balance. With the lucky number 12 and the lucky color purple as your guiding forces, you can navigate the realms of love and career with enthusiasm, creativity, and a touch of magic. In matters of the heart, this week brings exciting adventures and new connections. Embrace the opportunities to explore new experiences in love and nurture the bonds with your loved ones. Open yourself up to new connections and allow yourself to be swept away by the excitement and joy that love can bring.</p>

          <p> This week holds the promise of growth and expansion in your love life. On the professional front, your career is on an upward trajectory. New opportunities may arise, and your ideas will be well-received. Stay focused on your goals and work towards them with determination and enthusiasm. Embrace the possibilities that come your way and be open to taking calculated risks aligned with your passions. This week brings the potential for significant advancements in your career, so seize the opportunities with confidence and creativity.</p>

          <p>While pursuing love and career success, it is important to pay attention to your physical health. Engage in activities that bring you joy and promote overall well-being. Find a balance between work and relaxation to ensure optimal health. Take breaks, prioritize self-care, and make time for activities that rejuvenate your mind, body, and soul. By nurturing your physical health, you can maintain the energy and vitality necessary for success in all areas of your life. This week also encourages you to embrace new experiences and expand your horizons. Step out of your comfort zone and explore new paths.</p>

          <p>In your career, take calculated risks that align with your passions and allow for personal and professional growth. In your relationships, embrace the excitement and joy that comes with new experiences and allow them to deepen your connections. Focus on maintaining balance and finding joy in everyday life. As you navigate this week, keep the lucky number 12 and the lucky color purple in mind. Number 12 represents creativity, expansion, and divine guidance, while the color purple symbolizes magic, spirituality, and transformation.</p>

          <p>Embrace these energies as you embrace excitement, growth, and balance in both your personal and professional endeavors. In conclusion, this week offers Sagittarius a blend of exciting adventures in love, career growth, and finding balance. Embrace the new experiences and connections in love, nurture your relationships, and allow them to bring you joy and growth. Embrace the upward trajectory of your career, seize new opportunities, and take calculated risks aligned with your passions. Prioritize your physical health and find balance between work and relaxation. With the lucky number 12 and the lucky color purple guiding you, you have the tools to navigate the week with enthusiasm, creativity, and a touch of magic, ensuring your success and fulfillment in all aspects of life.</p>
        </div>
      },
      {
        id: 10,
        signTitle: 'Capricorn',
        disc: <div>
          <p>Capricorn, get ready for a week that requires you to find a balance between love and responsibilities. With the lucky number 1 and the lucky color brown as your guiding forces, you can navigate the realms of career, business, and love with discipline, determination, and a grounded approach. In matters of the heart, this week calls for nurturing your relationships while tending to your commitments. Balancing love and responsibilities may require effective communication and understanding. Make time for your loved ones and express your affection, while also fulfilling your obligations.</p>

          <p>Remember that open and honest communication is the key to maintaining harmony and understanding in your relationships. On the professional front, career progress is likely. Embrace new challenges and trust in your abilities. Your hard work and dedication will be recognized, leading to success and growth in your chosen field. Stay focused on your career goals and make practical plans to achieve them. This week presents an opportunity for significant advancements, so seize the moment and show your determination and discipline.</p>

          <p> While pursuing career success, it is crucial to take care of your physical and mental health. Prioritize self-care and stress management. Incorporate relaxation techniques into your routine to promote overall well-being. Allocate time for activities that bring you peace and rejuvenation. By nurturing your physical and mental health, you can maintain the energy and focus necessary for success in all areas of your life. This week emphasizes discipline and determination in both your personal and professional pursuits. Stay focused on your career goals and make practical plans to achieve them.</p>

          <p> Remain committed to your responsibilities while also finding time for self-care and stress management. Nurture your relationships by expressing your needs and maintaining open lines of communication. As you navigate this week, keep the lucky number 1 and the lucky color brown in mind. Number 1 symbolizes independence, leadership, and new beginnings, while the color brown represents stability, reliability, and grounding. Embrace these energies as you balance responsibilities and relationships, ensuring that you approach both with a disciplined and grounded mindset. In conclusion, this week offers Capricorn the opportunity to balance responsibilities and relationships.</p>

          <p> Nurture your relationships while fulfilling your commitments, and maintain open and honest communication with your loved ones. Embrace career progress, trust in your abilities, and make practical plans for success. Prioritize self-care and stress management for your overall well-being. With the lucky number 1 and the lucky color brown guiding you, you have the tools to navigate the week with discipline, determination, and a grounded approach, ensuring your success and fulfillment in all areas of life.</p>
        </div>
      },
      {
        id: 11,
        signTitle: 'Aquarius',
        disc: <div>
          <p>Aquarius, get ready for a week filled with love, innovation, and a focus on your overall well-being. With the lucky number 11 and the lucky color turquoise as your guiding forces, you can navigate the realms of career, business, and love with originality, harmony, and a touch of serenity. In matters of the heart, this week is filled with love and harmony. Express your feelings openly and embrace the emotional connections you share with your loved ones. Cherish the moments together and nurture your relationships.</p>

          <p> By allowing love to flourish, you create a foundation of trust and happiness. On the professional front, your career prospects are bright. New opportunities may come your way, and your innovative ideas will be valued. Embrace teamwork and collaboration, as they can lead to even greater success. This week encourages you to bring forth your unique ideas and express your individuality in both your career and relationships. Embrace innovation and originality, and let your creativity shine in all that you do.</p>

          <p> While pursuing love and career success, it is crucial to focus on your well-being. Engage in activities that promote physical and mental health. Practice mindfulness and relaxation techniques to find inner balance and peace. Prioritize self-care and make time for activities that bring you joy and rejuvenation. By nurturing your well-being, you can maintain the energy and clarity needed to excel in all areas of your life. This week also encourages you to seek intellectual and social stimulation. Embrace opportunities for learning and growth.</p>

          <p>Stay open to new experiences and surround yourself with people who inspire you. By expanding your horizons, you invite fresh perspectives and ideas into your life. As you navigate this week, keep the lucky number 11 and the lucky color turquoise in mind. Number 11 symbolizes intuition, inspiration, and spiritual growth, while the color turquoise represents serenity, clarity, and healing. Embrace these energies as you navigate the realms of love, innovation, and balance. In conclusion, this week offers Aquarius a blend of love, innovation, and a focus on overall well-being.</p>

          <p> Embrace the love and harmony in your relationships, cherishing the moments shared with your loved ones. Embrace the bright prospects in your career, allowing your innovative ideas to shine. Prioritize your well-being through self-care and relaxation techniques. Seek intellectual and social stimulation to foster growth and inspiration. With the lucky number 11 and the lucky color turquoise guiding you, you have the tools to navigate the week with originality, harmony, and a sense of serenity, ensuring your success and fulfillment in all areas of life.</p>
        </div>
      },
      {
        id: 12,
        signTitle: 'Pisces',
        disc: <div>
          <p>Pisces, get ready for a week filled with emotional depth, professional growth, and self-care. With the lucky number 22 and the lucky color sea green as your guiding forces, you can navigate the realms of career, business, and love with compassion, creativity, and a sense of serenity. In matters of the heart, this week brings a deepening of emotional connections. Express your feelings openly and nurture the bonds with your partner. Embrace the opportunity to create a strong foundation of love and understanding. By embracing emotional depth and connection, you can cultivate a fulfilling and harmonious relationship.</p>

          <p>On the professional front, growth and success are within reach. Your hard work will pay off, leading to new opportunities and advancements in your career. Stay focused on your goals and believe in your abilities. This week presents a chance for positive changes and recognition in your professional endeavors. Embrace the possibilities and trust in the journey. While pursuing love and professional growth, it is essential to prioritize your well-being. Pay attention to your physical and emotional health.</p>

          <p> Engage in activities that bring you joy and relaxation. Practice self-care rituals that nurture your mind, body, and soul. By taking care of yourself, you can maintain the energy and clarity needed to thrive in all areas of your life. This week also highlights the importance of compassion and creativity. Trust your intuition when making decisions, especially in matters of the heart. Allow your natural creativity to flow in your personal and professional endeavors. Embrace innovative approaches and think outside the box.</p>

          <p> By infusing compassion and creativity into your actions, you can bring forth unique solutions and deepen your relationships. As you navigate this week, keep the lucky number 22 and the lucky color sea green in mind. Number 22 represents balance, harmony, and manifesting dreams into reality, while sea green symbolizes healing, tranquility, and self-expression. Embrace these energies as you navigate the realms of emotional connection, professional growth, and self-care. In conclusion, this week offers Pisces an opportunity to embrace emotional connection, professional growth, and self-care. Nurture the bonds in your love life, expressing your feelings openly and authentically.</p>

          <p> Embrace the growth and success in your career, believing in your abilities and staying focused on your goals. Prioritize your well-being through self-care practices and relaxation techniques. By infusing compassion and creativity into your actions, you can navigate the week with grace and fulfillment. With the lucky number 22 and the lucky color sea green guiding you, you have the tools to embrace emotional depth, professional growth, and self-care, ensuring your success and happiness in all areas of life.</p>

        </div>
      }
    ]
  },
  {
    CategoryTitle: 'monthly',
    weeklyData: [
      {
        id: 1,
        signTitle: 'Aries',
        disc: <div>

        </div>
      },
      {
        id: 2,
        signTitle: 'Aries',
        disc: <div>

        </div>
      },
      {
        id: 3,
        signTitle: 'Aries',
        disc: <div>

        </div>
      },
      {
        id: 4,
        signTitle: 'Aries',
        disc: <div>

        </div>
      },
      {
        id: 5,
        signTitle: 'Aries',
        disc: <div>

        </div>
      },
      {
        id: 6,
        signTitle: 'Aries',
        disc: <div>

        </div>
      },
      {
        id: 7,
        signTitle: 'Aries',
        disc: <div>

        </div>
      },
      {
        id: 8,
        signTitle: 'Aries',
        disc: <div>

        </div>
      },
      {
        id: 9,
        signTitle: 'Aries',
        disc: <div>

        </div>
      },
      {
        id: 10,
        signTitle: 'Aries',
        disc: <div>

        </div>
      },
      {
        id: 11,
        signTitle: 'Aries',
        disc: <div>

        </div>
      },
      {
        id: 12,
        signTitle: 'Aries',
        disc: <div>

        </div>
      },
    ]
  },
  {
    CategoryTitle: 'yearly',
    weeklyData: [{}]
  }
]

export const BirthdayForcast = [
  {
    date: 'Tuesday,  1st August 2023',
    OutDisc: ' Moon square Rahu on your solar return chart and it is going to be a wonderful year for you. You will have lots of good days in terms of money. You will do well in your job/business. Those who are single will plan to get married. You will also get a pleasant news about your progress in job. You can get promoted all of a sudden.',
    disc: <div>
      <p> Moon square Rahu on your solar return chart and it is going to be a wonderful year for you. You will have lots of good days in terms of money. You will do well in your job/business. Those who are single will plan to get married. You will also get a pleasant news about your progress in job. You can get promoted all of a sudden.</p>

      <p>Your courage, confidence and will power will help you to move towards the path of success. You will have loving relations with your life partner. You will have peace and    happiness in your family life. You will be empathetic. Your official work will also get done with ease. You will be able to create a harmony among the people around you. You will prepare for exams/interview. You will be mentally peaceful and feel blessed.</p>
    </div>,
    LuckyDates: '1, 10, 19, 28',
    LuckyDays: 'Tuesday, Wednesday, Friday',
    LuckyColours: 'Red, Blue, Green'
  },
  {
    date: 'Wednesday, 2nd August 2023',
    OutDisc: 'Moon square Jupiter on your solar return chart and it is going to be give fantastic results. All your career/business/ finance related problems will get resolved. You will focus on your work. You will get the support of your bosses and seniors. Your obstacles will get removed under the guidance of experienced persons. Your elders will also bless you. You will refresh old memories with old friends.',
    disc: <div>
      <p> Moon square Jupiter on your solar return chart and it is going to be give fantastic results. All your career/business/ finance related problems will get resolved. You will focus on your work. You will get the support of your bosses and seniors. Your obstacles will get removed under the guidance of experienced persons. Your elders will also bless you. You will refresh old memories with old friends.</p>

      <p>Time will be in your favor. You will plan to get married. You will also enjoy with your family and friends. You will also do a lot of shopping for some auspicious occasion in the family. You will revive old relations. You will remain at the top in matters of love. You will plan to start some new business in collaborations or partnership. You will plan to purchase a house.</p>
    </div>,
    LuckyDates: '2, 11, 20, 29',
    LuckyDays: 'Tuesday, Thursday, Saturday ',
    LuckyColours: 'Red, Yellow, White '
  },
  {
    date: 'Thursday, 3rd August 2023',
    OutDisc: ' Moon opposite Venus on your solar return chart and will give you excellent results. It is    going to be a fruitful year for you. You will perform every task after a lot of thinking and with full passion. You will also meet an influential person who will help you a lot. Youth will try every way to get their work done. Even students will get success in exams/interview. You will lend a helping hands to those in need.',
    disc: <div>
      <p> Moon opposite Venus on your solar return chart and will give you excellent results. It is    going to be a fruitful year for you. You will perform every task after a lot of thinking and with full passion. You will also meet an influential person who will help you a lot. Youth will try every way to get their work done. Even students will get success in exams/interview. You will lend a helping hands to those in need.</p>

      <p> You will take care of yourself and also fulfill the wishes of your family. You will enjoy wearing good clothes, jewellary etc. You will seriously evaluate your emotions and behavior. You will receive money that you had given to someone else. Your children will care about your feelings. Auspicious functions will take place at your home. Relatives will visit your place. </p>
    </div>,
    LuckyDates: ' 3, 12, 21, 30',
    LuckyDays: 'Monday, Wednesday, Friday ',
    LuckyColours: 'Red, Yellow, Green'
  },
  {
    date: 'Friday,  4th August 2023',
    OutDisc: ' Moon opposite Mars on your solar return chart and it will give nice results. You will receive lot of money. And will consider yourself fortunate. Your focus will be on your work. You will do well in your business. Your fate will also take a turn for the better. You will establish a rapport with your juniors and colleagues. You will have monetary gains. You will get good news about progress in your job/business.',
    disc: <div>
      <p> Moon opposite Mars on your solar return chart and it will give nice results. You will receive lot of money. And will consider yourself fortunate. Your focus will be on your work. You will do well in your business. Your fate will also take a turn for the better. You will establish a rapport with your juniors and colleagues. You will have monetary gains. You will get good news about progress in your job/business.</p>

      <p>Those who are single will plan to get married. You will be creative and active. You will do your job skillfully. The differences between husband and wife will come to an end. Your mind will be stable and your problems will come to an end. You will do well in politics, business and sports. Your health will remain perfect and you will have no worries.</p>
    </div>,
    LuckyDates: ' 4, 13, 22, 31',
    LuckyDays: 'Monday, Tuesday, Saturday',
    LuckyColours: 'Pink, Yellow, White'
  },
  {
    date: 'Saturday,  5th August 2023',
    OutDisc: 'Moon semi square Jupiter on your solar return chart and will give amazing results. You will get promoted in your job. Your business will also run smoothly. You will get assistance from your friends and colleagues. You will get initial success in work and it will be lasting too. A lot of your time will be spent in useful and productive work. You will take work to completion with a planned approach.',
    disc: <div>
      <p> Moon semi square Jupiter on your solar return chart and will give amazing results. You will get promoted in your job. Your business will also run smoothly. You will get assistance from your friends and colleagues. You will get initial success in work and it will be lasting too. A lot of your time will be spent in useful and productive work. You will take work to completion with a planned approach.</p>

      <p>You will receive a good news from somewhere. You will be successful in your love life. The results of examination will be in your favor. You will also plan to go out of station with your family. Spiritual activities will also catch your attention. You will take concrete decisions in business. Your financial position is going to be stable and strong. </p>
    </div>,
    LuckyDates: '5, 14, 23',
    LuckyDays: 'Wednesday, Thursday, Saturday ',
    LuckyColours: 'Red, Blue, White'
  },
  {
    date: 'Sunday,  6th August 2023',
    OutDisc: ' Moon trine Sun on your solar return chart and will give fantastic results. You will get victory in court related matters. Differences between siblings will get resolved. You will plan to get married. Most of your time will be spent in entertainment. You will achieve material success. You will pay attention to increase your income. Students will get success in exams/interview. Your earnings will rise.',
    disc: <div>
      <p> Moon trine Sun on your solar return chart and will give fantastic results. You will get victory in court related matters. Differences between siblings will get resolved. You will plan to get married. Most of your time will be spent in entertainment. You will achieve material success. You will pay attention to increase your income. Students will get success in exams/interview. Your earnings will rise.</p>

      <p> Your prestige name, fame and respect will increase. You will kick start some new project. You will also take firm decisions in business. You will buy something new for the house. You will also plan to buy a new vehicle. You will plan to travel abroad for work or business. You will be financially in a very strong position and will feel a lot secure about future.</p>
    </div>,
    LuckyDates: ' 6, 15, 24',
    LuckyDays: 'Tuesday, Friday, Saturday',
    LuckyColours: 'Red, Yellow, Green'
  },
  {
    date: 'Monday,  7th August 2023',
    OutDisc: 'Sun square Jupiter on your solar return chart and will give favorable results. You will have peace and happiness in your life. You will also have monetary gains. You will also spend your time well. You could be given a big responsibility at your workplace. You will meet near and dear ones. Your dedication and honesty will bring you closer to officials. Because of increase in economic activities, there will be flow of money.',
    disc: <div>
      <p> Sun square Jupiter on your solar return chart and will give favorable results. You will have peace and happiness in your life. You will also have monetary gains. You will also spend your time well. You could be given a big responsibility at your workplace. You will meet near and dear ones. Your dedication and honesty will bring you closer to officials. Because of increase in economic activities, there will be flow of money.</p>

      <p>You will get success after putting hard work. People will have a lot of expectations from you. The result of exams/interview will be in your favor. You will also plan to go abroad for job or higher studies. Students can be diverted from their studies but should not lose focus. Those who are single will plan to get married. You will also be praised by high officials. Some special person will help you a lot.</p>
    </div>,
    LuckyDates: ' 7, 16, 25',
    LuckyDays: 'Monday, Wednesday, Saturday',
    LuckyColours: 'Red, Pink, Violet'
  },
  {
    date: 'Tuesday,  8th August 2023',
    OutDisc: ' Moon conjunct Jupiter on your solar return chart and will give excellent results. You will get some award or reward. Those who are single will plan to get married. Your nature will also be praised all over. You will be cautious in money matters. You can be busy in property purchase or selling related activities. Love birds will have a great time. You will plan for the future and take care of your present requirements.',
    disc: <div>
      <p> Moon conjunct Jupiter on your solar return chart and will give excellent results. You will get some award or reward. Those who are single will plan to get married. Your nature will also be praised all over. You will be cautious in money matters. You can be busy in property purchase or selling related activities. Love birds will have a great time. You will plan for the future and take care of your present requirements.</p>

      <p> You will have a lot of money gaining days. The atmosphere at your workplace will be cordial. You will make outline for new activities. You will run your business well and will fulfill your responsibilities very nicely. Your enemies and opponents will be stronger but will get defeated with ease. There will be cordial meetings with officials.</p>
    </div>,
    LuckyDates: '8, 17, 26',
    LuckyDays: 'Tuesday, Wednesday, Saturday',
    LuckyColours: ' Yellow, Maroon, Purple'
  },
  {
    date: 'Wednesday,  9th August 2023',
    OutDisc: ' Moon square Venus on your solar return chart and give fantastic results. You will have mental peace. You will also help others. This attitude of yours will get lot of praise. You will try to do the best in your field of work. You will make good progress in your job/business. There is strong possibility of money gains. To gain more profit you make best use of your talents and resources. You will get good news related to property.',
    disc: <div>
      <p> Moon square Venus on your solar return chart and give fantastic results. You will have mental peace. You will also help others. This attitude of yours will get lot of praise. You will try to do the best in your field of work. You will make good progress in your job/business. There is strong possibility of money gains. To gain more profit you make best use of your talents and resources. You will get good news related to property.</p>

      <p> There will be benefits from the new projects. You will decide about new policies for your work and business. You will plan to buy a house or property. You will remain busy with your home affairs. Couples will have better compatibility. Financial progress will be happening. Those in politics, business and sports will do well.</p>
    </div>,
    LuckyDates: ' 9, 18, 27',
    LuckyDays: 'Tuesday, Thursday, Sunday',
    LuckyColours: 'Blue, Yellow, Brown'
  },
  {
    date: 'Thursday,  10th August 2023',
    OutDisc: 'Moon square Saturn on your solar return chart and will give wonderful results. You will do your work peacefully and easily. You will have monetary gains. You can be given a gift or present. You will do something new and good in life. It will give you happy feeling and you will be a lot satisfied. You will complete your work on time. Working couples will manage their affairs well. You will behave well with others.',
    disc: <div>
      <p> Moon square Saturn on your solar return chart and will give wonderful results. You will do your work peacefully and easily. You will have monetary gains. You can be given a gift or present. You will do something new and good in life. It will give you happy feeling and you will be a lot satisfied. You will complete your work on time. Working couples will manage their affairs well. You will behave well with others.</p>

      <p>You will be making best efforts for children education. You will have lots of money gaining days. You will be a disciplined person and will get lot of appreciation. Works that were left pending will get completed. You will have loving relations with your life partner. New contacts will prove to be beneficial. You will be very hopeful regarding your future.</p>
    </div>,
    LuckyDates: '1, 10, 19, 28',
    LuckyDays: 'Wednesday, Thursday, Sunday ',
    LuckyColours: 'Red, Crimson, White'
  },
  {
    date: 'Friday,  11th August 2023',
    OutDisc: ' Moon sextile Sun on your solar return chart and will give amazing results. It is going    to be a successful year. There is possibility of buying new items for household purposes. You will be never sort of money. New job/business offers will come to you. Your held up works will also get completed. Your work efficiency and work capability will increase. Your love life will be wonderful.',
    disc: <div>
      <p> Moon sextile Sun on your solar return chart and will give amazing results. It is going    to be a successful year. There is possibility of buying new items for household purposes. You will be never sort of money. New job/business offers will come to you. Your held up works will also get completed. Your work efficiency and work capability will increase. Your love life will be wonderful.</p>

      <p>Those who are in a relationship for a long time will have plan to get married. Your official work will get done with ease. You will be confident. Your status and influence will increase. You may receive some good new related to progress in your job. A meeting with an influential person will prove beneficial. You will have wonderful relations with your siblings and will get along very well. </p>
    </div>,
    LuckyDates: '2, 11, 20, 29',
    LuckyDays: ' Wednesday, Thursday, Saturday',
    LuckyColours: 'White, Pink, Yellow'
  },
  {
    date: 'Saturday,  12th August 2023',
    OutDisc: 'Moon semi square Sun on your solar return chart and will give wonderful results. The time is good. Marriage proposals will start and you will be preparing for wedding activities. Auspicious functions will take place at your house. All business related decisions will prove to be correct. Your work will get done with ease. The students will excel in their studies. You may get promotion, bonus or due allowance.',
    disc: <div>
      <p>Moon semi square Sun on your solar return chart and will give wonderful results. The time is good. Marriage proposals will start and you will be preparing for wedding activities. Auspicious functions will take place at your house. All business related decisions will prove to be correct. Your work will get done with ease. The students will excel in their studies. You may get promotion, bonus or due allowance.</p>

      <p> A person might have some attraction for you. The decision of court case will be in your favor. This is time for money gains. You will get support of your love ones. You will be getting good results due to the efforts you are making towards the betterments of your career. New job/business opportunity will come to you. Not to be left behind you will make good progress in your life</p>
    </div>,
    LuckyDates: '3, 12, 21, 30',
    LuckyDays: 'Monday, Tuesday, Saturday',
    LuckyColours: 'Maroon, Red, Lavender'
  },
  {
    date: 'Sunday,  13th August 2023',
    OutDisc: 'Venus semi sextile Mars on your solar return chart and will give good results. You will become very active and will finish your job with ease. Your colleagues will also give you full support and cooperation. You will suddenly get promotion in your job. You will also take a major decision to expand your business in partnership or collaboration. Your financial position is going to be good. You will also get money from somewhere.',
    disc: <div>
      <p>Venus semi sextile Mars on your solar return chart and will give good results. You will become very active and will finish your job with ease. Your colleagues will also give you full support and cooperation. You will suddenly get promotion in your job. You will also take a major decision to expand your business in partnership or collaboration. Your financial position is going to be good. You will also get money from somewhere.</p>

      <p>The favorable placement of planets increases the benefits and your fame will also increase. You will work very hard. You will also look after your family elders well. Even your health is going to be wonderful. You will have a pleasant relationship with your spouse/partner. You will be having plans to go on a short trip with your family for fun and relaxation you will enjoy.</p>
    </div>,
    LuckyDates: ' 4, 13, 22',
    LuckyDays: 'Monday, Wednesday, Friday',
    LuckyColours: 'White, Maroon, Blue'
  },
  {
    date: 'Monday,  14th August 2023',
    OutDisc: 'Moon semi square Mercury on your solar return chart and will give fantastic results. You will make progress in your job. Everyone will praise your impressive personality. Your business will also prosper and flourish. Love mates will enjoy wonderful bonding. You will have plans to get married in your mind. Your income will be good. You will win confidence of your associates. Money and wealth will keep coming.',
    disc: <div>
      <p>Moon semi square Mercury on your solar return chart and will give fantastic results. You will make progress in your job. Everyone will praise your impressive personality. Your business will also prosper and flourish. Love mates will enjoy wonderful bonding. You will have plans to get married in your mind. Your income will be good. You will win confidence of your associates. Money and wealth will keep coming.</p>

      <p> You will bring many luxury items to your house. You will achieve your target in a very methodical way and will succeed in all your endeavour. If unemployed, you may get the appointment letter and if already in service, may get promotion. You will get back your due money. Your brothers will support you. Legal issues will get resolved. You will be in good mood and full of self confidence. You will feel relaxed and secured.</p>
    </div>,
    LuckyDates: '  5, 14, 23',
    LuckyDays: 'Monday, Thursday, Saturday',
    LuckyColours: 'Peacock Blue, Purple, White'
  },
  {
    date: 'Tuesday,  15th August 2023',
    OutDisc: 'Sun semi sextile Mars on your solar return chart and will give mixed results. You need to avoid conflict and extravagant tendencies. There will be tough situations that you will face at your workplace. And at times going will be really hard. Your peers and superiors will not listen to you. They will also refuse to cooperate. You will have differences of opinion with your bosses. Your colleagues will create obstacles for you. You may face termination or can even be charge sheeted.',
    disc: <div>
      <p>Sun semi sextile Mars on your solar return chart and will give mixed results. You need to avoid conflict and extravagant tendencies. There will be tough situations that you will face at your workplace. And at times going will be really hard. Your peers and superiors will not listen to you. They will also refuse to cooperate. You will have differences of opinion with your bosses. Your colleagues will create obstacles for you. You may face termination or can even be charge sheeted.</p>

      <p>There will be conspiracies and plotting against you. Even your competitors in business will try to sabotage your business. You will also face financial problems. And will take loan or debt at a high interest. Yet your family will support you. You need to make wise financial decisions. Your legal problems will get resolved.  </p>
    </div>,
    LuckyDates: ' 6, 15, 24',
    LuckyDays: 'Wednesday, Saturday, Monday',
    LuckyColours: ' Brown, Violet, Pastel Shades'
  }
]

export const weeklyHoroscopeData = [
  {
    id: 1,
    title: 'Aries',
    disc: <div>
      <p>This week holds exciting prospects for Aries, as romance, career growth, and personal well-being take center stage. With the lucky number 9 and the lucky color red by your side, let's explore the opportunities that await you. In matters of the heart, Aries can anticipate a surge of romantic energy. New connections may blossom, while existing relationships deepen and strengthen. </p>

      <p>Embrace these passionate moments and invest time and effort in nurturing your relationships. Allow love to flourish and bring joy into your life. On the professional front, business endeavors are poised to thrive. Take bold actions and seize new opportunities that come your way. </p>

      <p>This week holds the promise of career growth and success, but it requires your proactive involvement. Don't shy away from taking on challenges and pushing your boundaries. Trust in your abilities and let your determination drive you towards achieving your goals. While focusing on your career and love life, it is equally important to prioritize your well-being. Engage in activities that bring you joy and help you relax. Strive for a balanced lifestyle that enhances your overall health and vitality. </p>

      <p>This surge of energy and motivation you're experiencing can be harnessed to tackle new challenges both professionally and personally. Assert your needs in relationships and communicate openly with your loved ones. Amidst all the excitement, remember to take care of your health. Make sure to get enough rest and relaxation to recharge your mind and body. By maintaining a healthy balance and prioritizing self-care, you can maximize your productivity and overall happiness. As you navigate this week, keep the lucky number 9 and the lucky color red in mind. Embrace the opportunities that come your way, both in your career and love life. </p>

      <p>Trust in your abilities, take calculated risks, and maintain a holistic approach that encompasses your well-being. In conclusion, this week presents a dynamic blend of romance, career growth, and self-care for Aries. Embrace the possibilities, harness your lucky number 9, and infuse your life with the vibrant energy of the lucky color red. Seize the opportunities, nurture your relationships, and prioritize your well-being. Success and fulfillment await you on this exciting journey.</p>
    </div>
  },
  {
    id: 2,
    title: 'Taurus',
    disc: <div>
      <p> This week may present Taurus with some emotional challenges, but with the lucky number 6 and the lucky color green guiding you, you can navigate them with grace and find success in various aspects of your life. In matters of the heart, effective communication and understanding will be crucial for maintaining harmony in your relationships. Take the time to express yourself clearly and listen actively to your loved ones.</p>

      <p> By fostering open and honest communication, you can overcome any emotional challenges and strengthen the bonds you share. On the professional front, Taurus can expect growth and opportunities. Trust your instincts and make decisions with confidence. Stay focused on your goals, and success will follow. This week emphasizes stability and practicality, encouraging you to build a solid foundation in your career. Be open to financial opportunities that may come your way and make choices that align with your long-term aspirations. </p>

      <p>While pursuing career advancements, it is equally important to prioritize your physical and mental health. Engage in activities that promote relaxation and rejuvenation. Prioritize self-care to maintain balance and well-being. Find healthy ways to release stress and cultivate a supportive environment that nurtures your overall health. In all areas of life, including relationships and career, adaptability and versatility will be key. Stay open to new connections and be willing to adapt to changing circumstances in your professional endeavors. By embracing these qualities, you can navigate challenges and seize opportunities that come your way. </p>

      <p>As you navigate the week, keep the lucky number 6 and the lucky color green in mind. These elements symbolize stability, growth, and balance. Prioritize mental and emotional well-being, and seek harmony in all areas of your life. By finding equilibrium, you can navigate the emotional challenges and embrace the opportunities that arise. In conclusion, this week presents Taurus with a blend of emotional challenges and opportunities for growth. Embrace effective communication, trust your instincts, and stay focused on your goals. Prioritize self-care, adaptability, and versatility to maintain balance and find success. With the lucky number 6 and the lucky color green as your guides, you have the tools to overcome challenges and create a fulfilling and harmonious week ahead.</p>
    </div>
  },
  {
    id: 3,
    title: 'Gemini',
    disc: <div>
      <p> Gemini, get ready for a week filled with love, professional growth, and a focus on well-being. With the lucky number 3 and the lucky color yellow on your side, exciting opportunities await you. In matters of the heart, love is in the air for Gemini. New connections may spark, and existing relationships have the potential to deepen. Embrace open and honest communication to strengthen your bonds and foster deeper connections. This week, prioritize emotional well-being and nurturing your relationships, allowing love to flourish. </p>

      <p>On the professional front, your career shines bright. New opportunities may arise, and your ideas will be well-received by colleagues and superiors. Embrace teamwork and collaboration to achieve success. Trust your intuition when making decisions, as it will guide you towards the right path. This week holds the promise of positive changes in your career, so be open to new opportunities and take bold steps towards your goals. While pursuing professional growth, it is essential to maintain a healthy routine that supports your overall well-being. Incorporate exercise, meditation, and a balanced diet into your daily life. </p>

      <p>Nurturing your physical and mental health is key to maximizing your productivity and maintaining a positive mindset. Prioritize self-care practices that recharge and rejuvenate you. As you navigate this week, keep the lucky number 3 and the lucky color yellow in mind. Number 3 signifies creativity, self-expression, and growth, while the color yellow represents optimism and positivity. Embrace these energies as you embrace new connections, professional opportunities, and personal well-being. In conclusion, this week brings forth a blend of love, professional growth, and well-being for Gemini.</p>

      <p> Embrace the new connections and deepen existing relationships, communicate openly, and prioritize emotional well-being. Embrace the positive changes in your career, trust your intuition, and collaborate with others for success. Nurturing your health and well-being is paramount. With the lucky number 3 and the lucky color yellow guiding you, you have the tools to embrace the opportunities and create a fulfilling week ahead.</p>
    </div>
  },
  {
    id: 4,
    title: 'Cancer',
    disc: <div>
      <p> Cancer, get ready for a week filled with stability, growth, and emotional connections. With the lucky number 2 and the lucky color silver guiding you, you can navigate the realms of love and career with grace and success. In matters of the heart, this week brings stability and harmony to your relationships. Nurture the emotional connections and cherish the moments shared with your loved ones. Focus on effective communication and teamwork, as these qualities will enhance the bonds you share.</p>

      <p> Embrace the opportunities for growth and deepening connections, allowing love to flourish. On the professional front, teamwork and collaboration will play a vital role in your career. Your efforts will be recognized, leading to new opportunities and growth. Embrace these chances and contribute your unique skills and ideas to achieve success. This week holds the promise of advancement and recognition, so stay open to collaborations and trust in your abilities. While pursuing career growth, it is important to pay attention to your emotional well-being. Engage in activities that bring you peace and relaxation. </p>

      <p>Prioritize self-care to maintain balance and inner harmony. If needed, seek support from loved ones or professionals to navigate any emotional challenges that may arise. By taking care of your emotional well-being, you can perform at your best and maintain a positive mindset. Express yourself confidently in your relationships and let your creativity flow in your career. Take calculated risks that align with your goals, as they can lead to exciting opportunities and growth. Pay attention to your physical well-being as well, ensuring you have outlets to release any stress or tension. Find healthy ways to manage and cope with any challenges that may come your way.</p>

      <p> As you navigate this week, keep the lucky number 2 and the lucky color silver in mind. Number 2 represents harmony, cooperation, and balance, while the color silver symbolizes intuition and grace. Embrace these energies as you foster emotional connections, collaborate in your career, and prioritize your well-being. In conclusion, this week offers stability, growth, and emotional connections for Cancer. Nurture your relationships, focus on teamwork in your career, and embrace the opportunities that come your way. Pay attention to your emotional well-being, express yourself confidently, and take calculated risks. With the lucky number 2 and the lucky color silver guiding you, you have the tools to navigate the week with grace and success in both your personal and professional endeavors.</p>

    </div>
  },
  {
    id: 5,
    title: 'Leo',
    disc: <div>
      <p>Leos, get ready for a week filled with love, professional success, and stability. With the lucky number 5 and the lucky color gold as your guiding forces, you can confidently navigate the realms of love and career. In matters of the heart, love and passion take center stage for Leos this week. Express your feelings openly and wholeheartedly, and enjoy the beautiful moments shared with your partner. Embrace the deep connections and let love flourish in your life.</p>

      <p>On the professional front, success is on the horizon. Your leadership skills will shine, and your efforts will be rewarded. Embrace new challenges with confidence, knowing that you have the skills and capabilities to overcome them. This week brings opportunities for professional growth and recognition. Trust in your abilities and seize these chances for advancement. While pursuing professional success, it is crucial to focus on maintaining a healthy work-life balance. Take breaks and indulge in activities that bring you joy and relaxation.</p>

      <p> Nurturing your physical and mental health is vital to sustain your productivity and overall well-being. Prioritize self-care practices that support your overall wellness. This week emphasizes stability and practicality in both your career and relationships. Focus on building a solid foundation in both aspects of your life. Be open to financial opportunities that may come your way, as they can contribute to your stability and growth. Take time for self-care and find healthy ways to release stress and maintain balance. </p>

      <p>As you navigate this week, keep the lucky number 5 and the lucky color gold in mind. Number 5 represents versatility, adaptability, and positive change, while the color gold symbolizes prosperity and success. Embrace these energies as you navigate the realms of love, career, and personal well-being. In conclusion, this week offers Leos a blend of love, success, and stability. Embrace love and passion in your relationships, and express your feelings openly.</p>

      <p> Embrace the professional success that awaits you and confidently take on new challenges. Focus on maintaining a healthy work-life balance and prioritize self-care. With the lucky number 5 and the lucky color gold guiding you, you have the tools to navigate the week with confidence and embrace the opportunities for love, success, and stability that come your way.</p>
    </div>
  },
  {
    id: 6,
    title: 'Virgo',
    disc: <div>
      <p> Virgo, get ready for a week filled with challenges and opportunities for growth in your love life and career. With the lucky number 4 and the lucky color navy blue as your guiding forces, you can navigate these challenges with patience, practicality, and success. In matters of the heart, this week may present some challenges. Patience and understanding will be key in maintaining harmony in your relationships. Trust the process and communicate openly with your partner. By fostering open and honest communication, you can overcome any obstacles and strengthen the bonds you share. Embrace the opportunities for growth and deeper connections that arise. </p>

      <p>On the professional front, growth and success are within reach. However, it may require extra effort and focus on your part. Stay determined and don't hesitate to seek support from colleagues or mentors. By leveraging their expertise and guidance, you can navigate the challenges and reach new heights in your career. Trust in your abilities and stay focused on your goals. While pursuing professional growth, it is crucial to prioritize self-care and stress management. Engage in activities that bring you peace and relaxation. Take breaks to recharge and maintain your overall well-being. By nurturing your physical and mental health, you can perform at your best and overcome any challenges that come your way. </p>

      <p>This week emphasizes organization and practicality in all areas of your life. Take steps to improve your work environment and find a balance between your personal and professional life. Nurture your relationships and openly communicate your needs and desires. Prioritize self-care and pay attention to your mental and emotional health. As you navigate this week, keep the lucky number 4 and the lucky color navy blue in mind. Number 4 signifies stability, practicality, and discipline, while the color navy blue represents trust, reliability, and calmness.</p>

      <p> Embrace these energies as you tackle challenges in your love life and career. In conclusion, this week offers Virgo a blend of challenges and opportunities for growth. Embrace patience and understanding in your relationships, communicate openly, and trust the process. Embrace the opportunities for professional growth, stay focused, and seek support when needed. Prioritize self-care, maintain balance, and nurture your relationships. With the lucky number 4 and the lucky color navy blue guiding you, you have the tools to navigate the challenges with patience, practicality, and success in both your personal and professional endeavors.</p>

    </div>
  },
  {
    id: 7,
    title: 'Libra',
    disc: <div>
      <p>Libra, get ready for a week filled with love, career growth, and a focus on balance. With the lucky number 7 and the lucky color pink as your guiding forces, you can navigate the realms of love and career with harmony, success, and a touch of sweetness. In matters of the heart, love and harmony fill your life this week. Existing relationships will strengthen, and new connections have the potential to blossom. Embrace the joy of love and express your feelings openly and authentically. </p>

      <p>Let your heart guide you as you nurture and deepen the bonds you share. This week holds the promise of beautiful connections and a harmonious love life. On the professional front, your career is on an upward trajectory. New opportunities and growth are likely to come your way. Trust your instincts and take calculated risks, as they can lead you towards success. Embrace these opportunities with confidence, knowing that you have the skills and capabilities to seize them.</p>

      <p> This week brings positive developments in your career, so stay open to new opportunities and be proactive in pursuing them. While pursuing love and career success, it is important to focus on maintaining balance in all aspects of your life. Pay attention to your physical and mental well-being, as they are crucial for your overall happiness and productivity. Incorporate relaxation techniques into your routine to effectively manage stress and find moments of peace amidst the busyness of life. Prioritize self-care practices that rejuvenate your mind, body, and soul.</p>

      <p> Harmony and balance are the themes for the week, both in your relationships and career. Cultivate peace in your relationships and seek compromise when conflicts arise. Embrace open communication and find common ground to maintain harmony and deepen your connections. In your career, stay open to new opportunities and maintain a balanced approach to your work. Seek harmony between your personal and professional life. As you navigate this week, keep the lucky number 7 and the lucky color pink in mind.</p>

      <p> Number 7 signifies intuition, spiritual growth, and inner wisdom, while the color pink represents love, compassion, and harmony. Embrace these energies as you embrace love, success, and balance in your life. In conclusion, this week offers Libra a blend of love, career growth, and harmony. Embrace the love and joy in your relationships, express your feelings openly, and deepen your connections. Embrace the opportunities for career growth and success, trust your instincts, and take calculated risks. Focus on maintaining balance and prioritize your well-being. With the lucky number 7 and the lucky color pink guiding you, you have the tools to navigate the week with harmony, success, and a touch of sweetness in both your personal and professional endeavors.</p>
    </div>
  },
  {
    id: 8,
    title: 'Scorpio',
    disc: <div>
      <p> Scorpio, get ready for a week filled with passion, career growth, and self-care. With the lucky number 8 and the lucky color black as your guiding forces, you can navigate the realms of love and career with intensity, determination, and self-awareness. In matters of the heart, passion and intensity define your love life this week. Embrace the deep connections you have and express your desires openly. Keep communication channels open and honest, allowing for authentic and meaningful exchanges with your partner. Embrace the intensity of your emotions and let them guide you towards deeper connections and fulfillment in love.</p>

      <p> On the professional front, your career prospects are promising. Your hard work and dedication will be recognized, opening doors to new opportunities and growth. Embrace these opportunities with confidence, knowing that you have the skills and capabilities to excel. Trust in your abilities and continue to give your best effort. This week holds the potential for significant advancements in your career, so stay focused on your goals and be prepared to seize the moment. </p>

      <p>While pursuing love and career success, it is crucial to prioritize your well-being. Engage in activities that promote physical and mental wellness. Take breaks when needed and effectively manage stress to maintain optimal health. Prioritize self-care practices that nourish your mind, body, and soul. By taking care of yourself, you can maintain a strong foundation for personal and professional growth. This week encourages self-reflection and emotional growth. Pay attention to your intuition and trust your instincts as you navigate both your personal and professional life. In your career, focus on long-term goals and make practical plans to achieve them. </p>

      <p>By setting clear intentions and taking consistent action, you can make significant progress towards your objectives. Prioritize self-care and find healthy ways to manage stress, as emotional well-being is essential for your overall success and fulfillment. As you navigate this week, keep the lucky number 8 and the lucky color black in mind. Number 8 symbolizes determination, abundance, and success, while the color black represents power, introspection, and protection. Embrace these energies as you embrace passion, growth, and self-care in both your personal and professional endeavors. In conclusion, this week offers Scorpio a blend of passion, career growth, and self-care. </p>

      <p>Embrace the intensity of love, express your desires openly, and deepen your connections. Embrace the promising career prospects, trust in your abilities, and seize the opportunities that come your way. Prioritize your well-being through self-care practices and effective stress management. With the lucky number 8 and the lucky color black guiding you, you have the tools to navigate the week with intensity, determination, and self-awareness, ensuring your success and fulfillment in all areas of life.
      </p>
    </div>
  },
  {
    id: 9,
    title: 'Sagittarius',
    disc: <div>
      <p> Sagittarius, get ready for a week filled with exciting adventures in love, career growth, and finding balance. With the lucky number 12 and the lucky color purple as your guiding forces, you can navigate the realms of love and career with enthusiasm, creativity, and a touch of magic. In matters of the heart, this week brings exciting adventures and new connections. Embrace the opportunities to explore new experiences in love and nurture the bonds with your loved ones. Open yourself up to new connections and allow yourself to be swept away by the excitement and joy that love can bring. This week holds the promise of growth and expansion in your love life.</p>

      <p>On the professional front, your career is on an upward trajectory. New opportunities may arise, and your ideas will be well-received. Stay focused on your goals and work towards them with determination and enthusiasm. Embrace the possibilities that come your way and be open to taking calculated risks aligned with your passions. This week brings the potential for significant advancements in your career, so seize the opportunities with confidence and creativity. While pursuing love and career success, it is important to pay attention to your physical health. Engage in activities that bring you joy and promote overall well-being. </p>

      <p>Find a balance between work and relaxation to ensure optimal health. Take breaks, prioritize self-care, and make time for activities that rejuvenate your mind, body, and soul. By nurturing your physical health, you can maintain the energy and vitality necessary for success in all areas of your life. This week also encourages you to embrace new experiences and expand your horizons. Step out of your comfort zone and explore new paths. In your career, take calculated risks that align with your passions and allow for personal and professional growth. In your relationships, embrace the excitement and joy that comes with new experiences and allow them to deepen your connections.</p>

      <p>Focus on maintaining balance and finding joy in everyday life. As you navigate this week, keep the lucky number 12 and the lucky color purple in mind. Number 12 represents creativity, expansion, and divine guidance, while the color purple symbolizes magic, spirituality, and transformation. Embrace these energies as you embrace excitement, growth, and balance in both your personal and professional endeavors. In conclusion, this week offers Sagittarius a blend of exciting adventures in love, career growth, and finding balance. Embrace the new experiences and connections in love, nurture your relationships, and allow them to bring you joy and growth. Embrace the upward trajectory of your career, seize new opportunities, and take calculated risks aligned with your passions. Prioritize your physical health and find balance between work and relaxation. With the lucky number 12 and the lucky color purple guiding you, you have the tools to navigate the week with enthusiasm, creativity, and a touch of magic, ensuring your success and fulfillment in all aspects of life.</p>
    </div>
  },
  {
    id: 10,
    title: 'Capricorn',
    disc: <div>
      <p> Capricorn, get ready for a week that requires you to find a balance between love and responsibilities. With the lucky number 1 and the lucky color brown as your guiding forces, you can navigate the realms of career, business, and love with discipline, determination, and a grounded approach. In matters of the heart, this week calls for nurturing your relationships while tending to your commitments. Balancing love and responsibilities may require effective communication and understanding. Make time for your loved ones and express your affection, while also fulfilling your obligations. Remember that open and honest communication is the key to maintaining harmony and understanding in your relationships. On the professional front, career progress is likely. Embrace new challenges and trust in your abilities.</p>

      <p>Your hard work and dedication will be recognized, leading to success and growth in your chosen field. Stay focused on your career goals and make practical plans to achieve them. This week presents an opportunity for significant advancements, so seize the moment and show your determination and discipline. While pursuing career success, it is crucial to take care of your physical and mental health. Prioritize self-care and stress management. Incorporate relaxation techniques into your routine to promote overall well-being. Allocate time for activities that bring you peace and rejuvenation. By nurturing your physical and mental health, you can maintain the energy and focus necessary for success in all areas of your life. </p>

      <p>This week emphasizes discipline and determination in both your personal and professional pursuits. Stay focused on your career goals and make practical plans to achieve them. Remain committed to your responsibilities while also finding time for self-care and stress management. Nurture your relationships by expressing your needs and maintaining open lines of communication. As you navigate this week, keep the lucky number 1 and the lucky color brown in mind. Number 1 symbolizes independence, leadership, and new beginnings, while the color brown represents stability, reliability, and grounding. Embrace these energies as you balance responsibilities and relationships, ensuring that you approach both with a disciplined and grounded mindset.</p>

      <p>In conclusion, this week offers Capricorn the opportunity to balance responsibilities and relationships. Nurture your relationships while fulfilling your commitments, and maintain open and honest communication with your loved ones. Embrace career progress, trust in your abilities, and make practical plans for success. Prioritize self-care and stress management for your overall well-being. With the lucky number 1 and the lucky color brown guiding you, you have the tools to navigate the week with discipline, determination, and a grounded approach, ensuring your success and fulfillment in all areas of life.</p>
    </div>
  },
  {
    id: 11,
    title: 'Aquarius',
    disc: <div>
      <p>Aquarius, get ready for a week filled with love, innovation, and a focus on your overall well-being. With the lucky number 11 and the lucky color turquoise as your guiding forces, you can navigate the realms of career, business, and love with originality, harmony, and a touch of serenity. In matters of the heart, this week is filled with love and harmony. Express your feelings openly and embrace the emotional connections you share with your loved ones. Cherish the moments together and nurture your relationships. By allowing love to flourish, you create a foundation of trust and happiness. On the professional front, your career prospects are bright.</p>

      <p>New opportunities may come your way, and your innovative ideas will be valued. Embrace teamwork and collaboration, as they can lead to even greater success. This week encourages you to bring forth your unique ideas and express your individuality in both your career and relationships. Embrace innovation and originality, and let your creativity shine in all that you do. While pursuing love and career success, it is crucial to focus on your well-being. Engage in activities that promote physical and mental health. Practice mindfulness and relaxation techniques to find inner balance and peace.</p>

      <p>Prioritize self-care and make time for activities that bring you joy and rejuvenation. By nurturing your well-being, you can maintain the energy and clarity needed to excel in all areas of your life. This week also encourages you to seek intellectual and social stimulation. Embrace opportunities for learning and growth. Stay open to new experiences and surround yourself with people who inspire you. By expanding your horizons, you invite fresh perspectives and ideas into your life. As you navigate this week, keep the lucky number 11 and the lucky color turquoise in mind. Number 11 symbolizes intuition, inspiration, and spiritual growth, while the color turquoise represents serenity, clarity, and healing.</p>

      <p> Embrace these energies as you navigate the realms of love, innovation, and balance. In conclusion, this week offers Aquarius a blend of love, innovation, and a focus on overall well-being. Embrace the love and harmony in your relationships, cherishing the moments shared with your loved ones. Embrace the bright prospects in your career, allowing your innovative ideas to shine. Prioritize your well-being through self-care and relaxation techniques. Seek intellectual and social stimulation to foster growth and inspiration. With the lucky number 11 and the lucky color turquoise guiding you, you have the tools to navigate the week with originality, harmony, and a sense of serenity, ensuring your success and fulfillment in all areas of life.</p>
    </div>
  },
  {
    id: 12,
    title: 'Pisces',
    disc: <div>
      <p>Pisces, get ready for a week filled with emotional depth, professional growth, and self-care. With the lucky number 22 and the lucky color sea green as your guiding forces, you can navigate the realms of career, business, and love with compassion, creativity, and a sense of serenity. In matters of the heart, this week brings a deepening of emotional connections. Express your feelings openly and nurture the bonds with your partner. Embrace the opportunity to create a strong foundation of love and understanding. By embracing emotional depth and connection, you can cultivate a fulfilling and harmonious relationship.</p>

      <p> On the professional front, growth and success are within reach. Your hard work will pay off, leading to new opportunities and advancements in your career. Stay focused on your goals and believe in your abilities. This week presents a chance for positive changes and recognition in your professional endeavors. Embrace the possibilities and trust in the journey. While pursuing love and professional growth, it is essential to prioritize your well-being. Pay attention to your physical and emotional health. Engage in activities that bring you joy and relaxation. Practice self-care rituals that nurture your mind, body, and soul.</p>

      <p> By taking care of yourself, you can maintain the energy and clarity needed to thrive in all areas of your life. This week also highlights the importance of compassion and creativity. Trust your intuition when making decisions, especially in matters of the heart. Allow your natural creativity to flow in your personal and professional endeavors. Embrace innovative approaches and think outside the box. By infusing compassion and creativity into your actions, you can bring forth unique solutions and deepen your relationships. As you navigate this week, keep the lucky number 22 and the lucky color sea green in mind. Number 22 represents balance, harmony, and manifesting dreams into reality, while sea green symbolizes healing, tranquility, and self-expression. </p>

      <p>Embrace these energies as you navigate the realms of emotional connection, professional growth, and self-care. In conclusion, this week offers Pisces an opportunity to embrace emotional connection, professional growth, and self-care. Nurture the bonds in your love life, expressing your feelings openly and authentically. Embrace the growth and success in your career, believing in your abilities and staying focused on your goals. Prioritize your well-being through self-care practices and relaxation techniques. By infusing compassion and creativity into your actions, you can navigate the week with grace and fulfillment. With the lucky number 22 and the lucky color sea green guiding you, you have the tools to embrace emotional depth, professional growth, and self-care, ensuring your success and happiness in all areas of life.</p>
    </div>
  }
]

export const yearlyHoroscopeData = [
  {
    id: 1,
    title: 'Aries',
    disc: <div>
      <p>For those born under the sign of Aries, if you have plans to pursue opportunities in foreign work or education, there is potential for success. However, it's important to be aware that the influence of Rahu and Mars may cause delays along the way. During the second and third quarters of this year, obstacles may arise due to miscommunication or misunderstandings. It is advised to maintain patience when dealing with paperwork or engaging in work-related conversations. The presence of Ketu suggests the need for a focused mindset. Be prepared for significant or unexpected positive changes in your business, but instead of taking excessive risks, it is advisable to opt for calculated risks.</p>

      <p> Those who have contemplated restarting their old business or a previous project may experience success. The second phase of this year holds the potential for the growth of family businesses. This year will bring you a surge of energy and enthusiasm, propelling you forward in various areas of life. Your assertiveness and leadership skills shine but be mindful of others' feelings. Collaborating with others and expanding professional connections will be beneficial. Engage with colleagues and seek guidance from mentors or trusted advisors to gain valuable insights. </p>

      <p>Regarding your financial situation, the influence of Jupiter in the coming year may provide assistance and potentially enable you to acquire a property for yourself. However, it's important to remain mindful of the impact of Saturn to ensure that your savings remain unaffected. By implementing proper financial planning and exercising patience, you can effectively manage the flow of money in a favorable direction. In terms of your professional aspirations in 2023, the movement of Mars in the first quarter may support you in achieving your goals. </p>

      <p>However, it is essential to control impulsive and aggressive responses while maintaining patience in your work. During the second phase, there are promising opportunities for business owners, including potential breakthroughs or new job prospects for professionals. The last quarter holds the potential for pleasant surprises, such as unexpected promotions or recognition for your hard work and efforts. Nonetheless, it is vital to avoid relying solely on luck and instead invest your efforts into calculated risks. </p>

      <p>Regarding marriage and love relationships, Rahu and Jupiter indicate favorable prospects. However, the presence of Ketu demands attention within the relationship. Allocating quality time for your partner becomes essential to mitigate any malefic influence from Rahu-Ketu on your relationship. It is advised to avoid being influenced by third parties and instead engage in healthy and direct communication with your partner to prevent miscommunications. In relationships, communicate your need for independence clearly. Single Aries may be drawn to confident, independent individuals.
        Your yearly finance horoscope advises considering advice from financial experts or mentors to gain insights into investment opportunities. </p>

      <p>
        Your Health horoscope for this year is influenced by your inherent qualities of possessing excellent energy, stamina, and a positive attitude towards everything. However, it is important to acknowledge that any challenging health issues you may encounter could be attributed to your workload and the pressures you face. Maintaining good health becomes paramount in order to achieve your life goals. The health horoscope for Aries in 2023 advises the adoption of a nourishing and wholesome diet, along with adhering to a proper sleep routine and engaging in regular workouts. As you navigate through the year, you may experience a significant influence from Saturn and Rahu, which necessitates the cultivation of a healthy lifestyle. By embracing such a lifestyle, you can mitigate the adverse effects and safeguard your well-being.</p>

    </div>
  },
  {
    id: 2,
    title: 'Taurus',
    disc: <div>
      <p> This year, Taurus has the fortunate alignment of Saturn, Rahu, and Jupiter, all playing significant roles in shaping careers. Success hinges on maintaining a positive attitude, practicing patience, persevering through challenges, and conducting thorough research. In the first quarter, it is advised to exercise patience and avoid aggressive behavior to ensure the smooth execution of your plans. To obtain Saturn's blessings for desired business success, persistence is crucial, alongside deterring negative comments and thoughts. The influence of the Sun at the year's outset may cause slight delays in gaining favor from superiors and bosses. However, those aspiring to pursue international sports careers can expect the realization of their aspirations. Furthermore, 2023 holds promising potential for promotions and new job opportunities.</p>

      <p> Business owners should remain vigilant as unexpected losses or financial expenses may arise intermittently. Those involved in family businesses are advised to approach every decision with patience, while October is unfavorable for making changes to new business plans. However, improvements should be anticipated from the end of March, despite the delay in gaining favor from bosses and seniors due to the Sun's position. This year presents opportunities to acquire new skills and education, satisfying your desires for studying abroad and finding career success. </p>

      <p>The movement of Venus suggests that you possess both creativity and perfection in your work, contributing to favorable outcomes. Employing an intelligent approach, discipline, and commitment will aid in securing favorable business deals, particularly with the Sun and Mercury aligning. The Sun's influence will bring new friendships and contacts within your work and family life. In addition to fostering a creative approach to success, the Venus movement may open doors for international or long-distance travel in your career.  </p>

      <p>The Taurus love predictions for 2023 suggest that the upcoming year will bring abundant pleasure to individuals. However, they will also face challenges that must be overcome in order to fully enjoy the joy of new beginnings and achieve optimal success. Maintaining a positive attitude in challenging situations is crucial for personal well-being, as it will lead to positive outcomes. The Taurus love horoscope for 2023 highlights the influence of Venus, the ruling planet of the sign, known for promoting compassion and love. The movement of Mercury and Jupiter will have a positive impact on relationships, leading to marital and romantic success. In terms of marital life, it is advised to avoid being stubborn and allow space for the partner to feel secure. Love relationships will flourish during July and August. Single Taurus individuals may find love in September, while November may bring some emotional lows with ups and downs. December holds potential for individuals seeking a relationship, but caution should be exercised in choosing a partner, as minor disagreements may arise, causing tension. </p>

      <p>Everyone desires good health, but the significance of knowing about one's health in advance lies in the guidance provided by astrologers. Such guidance allows individuals to adopt specific tips and practices that contribute to their overall well-being and fitness. Taurus health horoscope 2023 indicates that you may develop strong immunity against various infectious diseases during the year, alleviating concerns about your health. However, it is crucial to be mindful of certain factors influenced by Jupiter that may lead to weight gain due to improper diet and lifestyle choices.</p>

      <p> Additionally, the transit of Rahu may induce heightened stress levels, and it is advisable to steer clear of such draining situations. Proper scheduling and time management are key to minimizing stress. Let us delve deeper into the health horoscopes for Taurus natives in 2023.
        Maintaining a positive attitude in every challenging situation is crucial for your well-being. By adopting a positive mindset, you will witness remarkable outcomes. Remember, the more effort and dedication you put into your life, the greater the rewards and results will be.
      </p>
    </div>
  },
  {
    id: 3,
    title: 'Gemini',
    disc: <div>
      <p> Gemini for you, the year ahead calls for patience, attention to detail, and a disciplined approach in both your personal and professional life, guided by the influence of Saturn. Jupiter, on the other hand, presents you with opportunities to expand your network of friends, professional connections, and international relations. This year, you will prioritize commitment, career growth, and health. With the blessings of Jupiter and Mercury, many of your dreams are expected to materialize in the second half of the year.</p>

      <p>Healthwise, the year is predicted to be average. The movement of the planets and their impact on your thoughts will significantly influence your well-being. To maintain your fitness and health, it is crucial to surround yourself with positive individuals and cultivate a positive mindset. Pregnant individuals are advised to pay attention to their well-being and avoid unnecessary stress to ensure a healthy childbirth, as guided by Rahu and Ketu. Regulating anger and improving overall health is recommended by avoiding heavy and greasy foods, as the movement of Mars may trigger unnecessary aggression. Students may experience slower progress and increased effort this year to achieve desired outcomes, as indicated by Saturn. Long-term plans should be reconsidered, as Saturn's energies may slow down progress and demand perfection. </p>

      <p>To achieve the predicted success in your academic pursuits, patience and perseverance are essential. The initial motion of Mars in the first quarter may ignite great ambition, but it is important to control anger for smooth and favorable outcomes. Competitive exams can be conquered and recognition obtained through determination and dedicated study. Rahu may encourage individuals to pursue courses related to writing and digital marketing. Journalism and science students can expect success this year. The influence of Mars may cause some individuals to experience a loss of confidence. However, the Sun and Mars will provide a solid foundation for those aspiring to embark on an athletic career. While Mars may present unexpected partnership proposals, Ketu's influence on romantic relationships may cause delays or unwelcome obstacles. Trusting your intuition is advised, as it will guide you in the right direction when it comes to matters of the heart.</p>

      <p> Your love horoscope for the year shows a subtle connection between the Sun and Mercury, and those in secret relationships should exercise caution to navigate potential challenges when it comes to interactions with siblings and parents. The year presents favourable circumstances for those seeking marriage, with the Sun and Mercury movements bringing forth marriage proposals from long-time friends and the possibility of international relocation after the second quarter. Beginning the year, relationships with in-laws may face challenges, and unexpected conflicts or differences in opinions may impact marital life. Nurturing a spirit of conflict resolution can lead to improvements with the assistance of Jupiter, patience, and a positive attitude. In terms of romantic relationships, the Gemini Love Prediction 2023 emphasizes the importance of making commitments. While occasional feelings of solitude may arise, you will generally feel valued and cherished. Nurturing your relationship is crucial as it holds significant importance in your life.</p>

      <p>Gemini natives possess a natural inclination towards leadership and excel in various tasks they undertake in their daily lives. Their remarkable ability to embrace challenges is truly commendable. To ensure sound health, the Gemini health horoscope 2023 provides several valuable tips. The planetary movements, particularly those of the Sun, Mercury, Rahu, and Ketu, may have a notable impact on your well-being. However, maintaining a healthy routine is vital for all Gemini individuals in the upcoming year.</p>
    </div>
  },
  {
    id: 4,
    title: 'Cancer',
    disc: <div>
      <p> As the calendar turns to a new year, Cancer natives can expect several shifts and transformations in various aspects of their lives. This year, it is essential to prioritize your health, financial well-being, relationships with in-laws, and job satisfaction. With a Saturn transit in play, it becomes crucial to practice meditation and avoid overthinking, as these tendencies can have a detrimental impact on both your health and decision-making abilities. Stress and negative influences from your surroundings can also hinder the quality and outcomes of your work, making it necessary to focus on effective work management and maintain a positive mindset, especially when faced with obstacles and delays in achieving your goals.</p>

      <p> Rahu and Ketu may bring changes to your career and place of residence, while others may experience success in purchasing their dream home or apartment. From the second quarter onwards, Saturn's movements will align more favorably with your plans, although patience will be required. It is crucial to analyze and verify before undertaking new projects, as Saturn's transit demands meticulous attention. In the second quarter, Mercury's influence may challenge your confidence, leading to negative feelings and indecisiveness. In both work and business endeavors, maintaining a polite and humble attitude, in line with Mars's movement, will prove beneficial. While immediate promotions or higher ranks may not be forthcoming, the planets indicate that this period should be utilized for acquiring new skills and techniques to enhance your performance, increasing the likelihood of a higher rank in the subsequent quarter. Jupiter's blessings may provide support from your superiors, but it is advised to exercise caution and avoid divulging your plans to everyone at work, especially due to the influence of Rahu and Ketu, unless specifically requested to do so. </p>

      <p>Saturn and Jupiter are likely to bestow success in new job opportunities, promotions, and financial gains in business endeavors. However, it is crucial not to shy away from hard work and persistence. Ignoring your well-being could lead to potential health issues, particularly related to teeth, due to Saturn's placement. The combined influence of Rahu-Ketu and Jupiter suggests that the elderly should exercise caution and avoid consuming heavy or rich oily foods. Towards the end of the second quarter, Mercury and Venus may bring satisfaction and fulfillment in writing-related careers as well as in relationships.</p>

      <p> The love horoscope for Cancer in 2023 indicates a promising year for romantic relationships. In the first phase of the year, you can look forward to enjoying social gatherings, periodic functions, and festivities, which will bring a fresh wave of joy into your life. With the presence of Venus in your horoscope, you may have the opportunity to spend quality time with your special someone. However, it is important to be mindful of potential monetary expenditure during this period. For single Cancer individuals who are seeking marriage, the second quarter of the year holds great promise. Cancer love horoscope 2023 predicts fortune and success in married life, bringing joy and happiness to those who tie the knot. In matters of relationships, it is crucial for Cancer individuals to maintain a positive mindset. With Jupiter transitioning in your horoscope, you can anticipate exciting possibilities in the realm of love and partnerships. However, the first quarter of the year may pose challenges due to work pressure and unfavourable circumstances, affecting your love life. The Cancer love horoscope 2023 advises refraining from blaming your partner for their mistakes and encourages spending quality time together without engaging in arguments.</p>

      <p>Moving on to the health aspect, Cancer natives are typically energetic and enthusiastic about even the smallest things. However, it is important for you to pay attention to your physical and mental well-being. The Cancer health horoscope 2023 suggests that overall, Cancer individuals can expect average health conditions with no serious illness predicted. To maintain good health, it is recommended to prioritize proper rest and self-care. By doing so, you can strengthen your immune system and minimize the chances of falling ill. Praying to Mars for good health in 2023 can also be beneficial. For those engaged in spiritual and religious pursuits, opportunities may arise in foreign countries or through the digital platform. Some of you may find a calling to learn yoga, martial arts, or meditation. </p>

    </div>
  },
  {
    id: 5,
    title: 'Leo',
    disc: <div>
      <p>Saturn's movement in 2023 may bring about some delays and challenges in receiving support and recognition at work. This could include delays in obtaining support from senior authorities and elders at home. Additionally, unforeseen work-related travel might be on the horizon. It is important to avoid becoming aggressive or demanding in your job or business, considering the influence of Saturn and Rahu. Mars, at the start of the year, may assist in recovering owed money from friends, but caution is advised when it comes to heavy investments in the share market. Saturn may also cause delays in expected financial gains from your business. Seeking professional financial advice and practicing patience and a positive approach during the first quarter will be beneficial. Jupiter's support will come to fruition when you make the right decisions and take initiative. While promotions may face delays in the early stages, things will turn in your favour as the year progresses. There are possibilities of foreign settlement and employment, and Jupiter's blessings can lead to success in a new job, along with the desired rank and support from your boss.</p>

      <p>In 2023, Leo's love and relationships may encounter certain obstacles due to the influence of Saturn. The presence of Rahu can also lead to unexpected disputes with your partner. As Saturn and Rahu provide sensible advice, it is important to keep outsiders out of your intimate relationships and maintain a strong foundation with your loved one.</p>

      <p> March requires careful communication with your in-laws and a conscious effort to avoid arguments, as the movement of Mercury can bring unnecessary stress and conflict to relationships. It is crucial to be attentive to your decisions during this month, as sudden breaks in love life are possible. Mercury's influence plays a significant role in the success of love marriages. The second half of the year may bring distance and misunderstandings in relationships due to the movement of Saturn and the Moon. Taking a short vacation with your partner can help revitalize your connection.</p>

      <p>The year offers opportunities to exchange and communicate feelings of love, strengthening your bond with your partner. Spending quality time with your children and embarking on a short trip together can rejuvenate your family life. Mars encourages patience when starting a new relationship. It is advised to avoid hasty or forceful responses in your romantic life. However, the month of September may not be favorable for partnerships due to the transit of the Moon and Ketu. Jupiter and Rahu may bring unexpected engagement requests, while Saturn and the Moon indicate the possibility of a small gathering with your partner's family. In matters of personal relationships, Saturn and Rahu advise against third-party interference. Love marriages may find success, particularly after the first quarter, and there is a potential for foreign settlement in the second quarter. Those going through a divorce can expect positive outcomes. Jupiter's movement in the second quarter might bring successful pregnancies. The latter half of the year holds rewarding experiences for singles and those in long-distance relationships, as romantic encounters and positive news will contribute to greater happiness and stability. Overall, the times are highly blissful in the realm of relationships. </p>

      <p> During the first quarter, it is crucial to pay attention to your children's health. Students may face delays in obtaining admissions to foreign universities, but there is an opportunity for those interested in research and engineering-related courses. Success can be achieved by students preparing for government and competitive examinations through hard work and a positive attitude. You may likely improve the energy levels day by day. But the planets also suggest that you should never skip workouts or daily meals. Otherwise you end up in low energy and thereby ill health. It is recommended to consume more fruits and vegetables and take a good rest in 2023. Jupiter and Rahu caution against negative influences and emphasize the importance of positive approaches. The second quarter holds potential for success in sports and foreign university applications. However, Saturn and Rahu indicate the need for perseverance and hard work due to possible delays. It is important to maintain a healthy routine and discipline in order to prevent disruptions in studies, especially at the beginning of the year. Students should also be mindful of avoiding aggressive behavior, as indicated by Mars. In the second quarter, Mars' movement can impact health and exam preparations, making it crucial to work on maintaining positive thoughts and choosing the right company to stay focused.</p>
    </div>
  },
  {
    id: 6,
    title: 'Virgo',
    disc: <div>
      <p> This year, Virgo, it's time to embrace positive energy and seize the opportunities for personal and professional growth. Efficiently manage both aspects of your life, with the support of your loving family. At work, impress your superiors by showcasing your dedication and competence, paving the way for career progression. Stay committed to your tasks and responsibilities, as it will contribute to your professional advancement. </p>

      <p>In the workplace, prioritize commitment and meeting deadlines. Strive for a balance that prevents you from becoming a workaholic or succumbing to stress due to an overload of tasks. During the third quarter, Ketu and Mars may create some stress within the family business.Your luck will favour you if you remain patient and intelligent. Office politics may induce stress, so remain attentive to opportunities, including new job prospects. Jupiter and Rahu indicate that ignorance or miscommunication may cause you to miss out on good job opportunities or new projects related to your business. Students will receive assistance from their mothers in their studies, and their moral education and determination will pave the way for desired results.</p>

      <p>While navigating the financial realm, be mindful of potential troubles and save wisely. Involve your partner in financial discussions, fostering stability and a stronger bond. Avoid any misunderstandings with your partner, as even a simple doubt can escalate into major conflicts. Prioritize open communication and trust within your relationship. When it comes to finances, the horoscope predicts promising prospects, such as an increase in income or unexpected financial opportunities. However, it's crucial to approach these situations with caution and careful planning. Adopt a proactive approach to effectively manage your finances throughout the year. During the second quarter, make time for family and friends. Both Saturn and Rahu demand more effort and a positive mindset in your personal and professional endeavors. Jupiter's influence in the second quarter brings happiness through promotions, marriages, and the possibility of childbirth. In the last quarter, Venus and Ketu advise you to pay attention to your relationships and financial matters. Refrain from making hasty financial decisions based on advice from new or unknown individuals, as Saturn and Rahu caution. Mars and Mercury movements indicate the potential to earn money through travel this year.</p>

      <p> In May, it is advised to avoid arguments and proposing in relationships. Planetary alignment during this time may not be favorable for receiving expected outcomes. July and August hold the potential for positive results in love marriages and receiving positive responses to relationship proposals. A secret relationship may be influenced by Rahu and the Sun, requiring caution as interaction with parents and siblings may pose challenges. For those desiring to convert their love relationship into marriage, this year holds promise. Occasionally, relationships need revitalization, and effective communication of feelings becomes essential. Jupiter suggests that written communication can serve as an opportunity to reinvigorate your marital relationship. Planetary alignment may cause delays in expected results within love relationships this year. Distance in relationships can arise from ego clashes, communication gaps, and misunderstandings. Avoid unnecessary arguments and negative thinking within your relationship.</p>

      <p>ake care of your health, as it may encounter minor challenges this year. Boost your well-being through practicing meditation or engaging in gentle exercise routines. Throughout the first and last quarters of the year, patience and attention are required on personal, professional, and health fronts. Virgo health horoscope for 2023 suggests a period of good health due to Jupiter's transit. This combination of planetary movements suggests that from April to May, there may be a higher risk of health-related issues. It is crucial to take good care of one's health during this period to avoid potentially grave situations. However, when the Sun transits into Taurus in May, there is a possibility of slight improvement in health. During this time, there will be a conjunction of Rahu and Jupiter in the eighth house, with Saturn's influence also present. To maintain well-being, it is important to continue improving daily routines and prioritize physical health. By following these measures, Virgo individuals can enjoy good health throughout the year 2023. </p>

      <p>Virgo this year you will be in a good mood, enabling you to tackle any confusions with ease. Your improved health may positively impact your professional life as well.</p>

    </div>
  },
  {
    id: 7,
    title: 'Libra',
    disc: <div>
      <p>This year, as a Libra, your focus should be on finding balance in all areas of your life. Prioritize self-care to maintain your physical and mental well-being. Enhance your communication skills to foster better relationships with your loved ones. In matters of the heart, seize the opportunities that arise this year for deep connections and romantic adventures. If you're single, you may be drawn to someone intriguing, igniting a passionate connection. Keep an open mind and allow yourself to be swept away by the magic of new love. Explore creative outlets to express yourself and boost your confidence. Seek new opportunities for personal and professional growth. </p>

      <p>When it comes to finances, practice moderation and avoid impulsive spending. Embrace gratitude for the abundance in your life. Your indecisive nature may hinder important financial work, but the latter half of the year brings transiting planets that strengthen your financial situation. Income flow remains smooth until September, and earning opportunities may increase with expanded work horizons in November, supported by Jupiter's influence. February is a favorable month for property or vehicle transactions, while investments and property buying opportunities extend until September. The year-end favors smooth financial transactions, making it suitable for luxury purchases and loans. In terms of your career, 2023 holds fruitful prospects with Jupiter's support. Known contacts may assist in job searches, but Saturn may cause some delays. Business owners will face intermittent challenges, demanding patience. The year 2023 shows progress in your education, though it may take time to pick up momentum initially. The Sun and Jupiter have a positive impact on your educational journey, and February brings answered prayers and positive results. Jupiter's transition boosts confidence in your performance, and October presents wonderful prospects for academic development with Jupiter's blessings. </p>

      <p> The beginning of the year holds promise for a positive and happy love life and relationship for Libras. The transition of Venus may enhance your social circle, providing opportunities for romance. Strong passion and heightened emotions may have a deep impact on your relationship with your partner due to fluctuations in Mars' position. It's crucial to remain patient and work through any challenges that arise. As the year progresses, Jupiter's transition may help resolve relationship problems. May may test your patience, leading to aggression. However, the latter half of the year brings blessings from Venus, bringing happiness to your relationship. Your romantic relationships receive blessings from the planets, and March marks a turning point. Jupiter's influence helps clarify relationships, strengthening your bond.</p>

      <p> It's important to prioritize a balanced diet, sufficient rest, and sleep. Listen to your body's needs and address any minor health concerns promptly. Maintain a healthy work-life balance and avoid overexerting yourself. The year 2023 appears favorable for your finances and money-related matters as observed by Libra astrology. Saturn advises being prepared with plans for gains. While the year may start with a bumpy ride, better opportunities will arise with time. Planetary support ensures good health and fitness, but precautions are needed due to the influence of Rahu and Ketu. Maintain a balanced mind as Saturn demands and overcome any feelings of blockage or negativity with Jupiter's soothing effect. Take care of your mental and physical well-being throughout the year.</p>

      <p>Overall, the Libra horoscope for 2023 indicates a year free from major obstacles in various aspects of your life. Strive for balance, embrace opportunities, and navigate the year with optimism. </p>
    </div>
  },
  {
    id: 8,
    title: 'Scorpio',
    disc: <div>
      <p> This year, Scorpio, tap into your inner strength and determination as you take charge of your goals with passion and confidence. Trust your instincts and make decisions boldly. Nurturing your relationships with support and understanding will bring fulfilment. Expand your knowledge and horizons through new experiences. On the financial front, you may encounter promising opportunities and increased income, but approach them cautiously with careful planning. Take a proactive approach to managing your finances responsibly. Prioritize self-care and relaxation to maintain balance and well-being. Adjust to a new physical routine with patience and perseverance.</p>

      <p> The start of the year holds prosperity for Scorpios, with potential rewards from old investments due to Jupiter's blessings. However, complications may arise due to unsupportive Rahu and Ketu. By mid-February, things begin to improve, and February is a favorable time for property transactions. Saturn advises avoiding unnecessary expenses in the middle of the year to prevent potential consequences. May brings good earning opportunities and increased wealth, thanks to Jupiter's blessings. The year-end shows major improvements in wealth with a steady inflow of money, making it favorable for property deals.</p>

      <p>Career-wise, the start of the year is favorable, but Saturn may cause problems later on. By the end of February, significant improvements can be made. Professionals have the potential for great success, with April presenting some hurdles. Stability and growth in the workplace increase after mid-May, leading to positive outcomes in the latter half of the year. Business owners may not witness immediate gains but can expect good associations and lucrative deals. The year-end brings multiple opportunities for progress.Education may face initial challenges, but improvements can be seen in April, leading to satisfactory progress. Jupiter supports expanding knowledge. September may present difficulties, but by the year-end, encouraging progress can be achieved.</p>

      <p>In terms of love life, Scorpios can expect a sweet beginning, with Jupiter and Venus influencing positive relationships. Married couples in cordial relationships may grow closer, while singles may find love around mid-February. Mars' movements in March and July may bring interactions and potential challenges, respectively. Committed individuals can take their relationships to the next level, as love life flows smoothly despite minor hurdles. Jupiter blesses the latter part of the year with joy and love.</p>

      <p>In terms of health, the year starts with unfavourable positions, but improvement occurs from mid-February, influenced by Mars and Jupiter. April may cause disturbances in mental well-being, and it is essential to prioritize rest. The stars' effect continues until the end of August, affecting metabolism and balance. However, the last part of the year shows a turnaround, leading to improved health conditions. Chronic illnesses can be managed, and overall health can improve with a healthy lifestyle. Mental well-being should be prioritized throughout the year. Scorpio's horoscope for 2023 suggests embracing inner strength, seizing opportunities, and prioritizing well-being to navigate the year with success and fulfilment. 
      </p>
    </div>
  },
  {
    id: 9,
    title: 'Sagittarius',
    disc: <div>
      <p> As the year begins, Sagittarius, your optimistic approach sets the stage for a smooth journey ahead. Your positive mindset and hopeful outlook create an atmosphere of ease and harmony. This may be an opportune time to forge connections and develop new relationships, particularly if you're single and seeking companionship. Venus, the planet of love, hints at the potential for romantic encounters during this period. So, don't hesitate to open your heart to new possibilities.</p>

      <p>Turning our attention to your financial prospects, both Jupiter and Venus align to bring positivity into your monetary affairs. These celestial forces create favorable conditions for financial growth and prosperity. Opportunities may arise from unexpected sources, presenting you with numerous avenues to increase your income and accumulate wealth. However, it's crucial to remain cautious as matters related to past assets may resurface, demanding your attention and careful consideration. By addressing these financial obligations, you can ensure stability and safeguard your resources for the future. The effects of Rahu and Ketu, two lunar nodes, remind you to be cautious with your spending habits and investment decisions. By maintaining a vigilant approach and making wise choices, you can optimize your financial growth and ensure a secure future. </p>

      <p>As we delve into your career prospects, the alignment of Jupiter with your professional endeavors signifies an excellent start to the year. Jupiter's benevolent influence provides you with opportunities for growth, advancement, and recognition in your chosen field. Whether you're a seasoned professional or a fresh graduate, the planets align to support your career aspirations. New doors may open, presenting exciting prospects and avenues for progress. However, as the year progresses, you may encounter certain uncertainties and obstacles in your career path. Jupiter's influence opens up pathways for growth and helps you navigate through the challenges, ensuring that your efforts yield fruitful results. You'll experience positive growth in your career, and your hard work will be recognized and appreciated by your superiors, colleagues, and mentors.</p>

      <p>For businesspeople, the year may begin with a sense of uncertainty. However, as time progresses, the planets align in your favor, indicating the potential for forming trade alliances and partnerships. These collaborations can be instrumental in expanding your business, attracting new clients, and securing significant deals. With Jupiter's favorable influence, you'll have the opportunity to achieve material gains and solidify your position in the market. By the end of the year, your clever strategies and ambitious plans will bear fruit, allowing you to make substantial progress and achieve your business goals.</p>

      <p>As the year unfolds, the expansion of your social circle becomes more pronounced. You'll find yourself surrounded by a vibrant and diverse community, allowing you to engage with people from various walks of life. This widening of your social network can bring exciting experiences and valuable connections. You may discover new friendships, professional partnerships, or even mentors who can guide you on your path to personal growth. With the blessing of Jupiter, the planet of abundance and expansion, you'll be able to overcome the difficulties within your family. Jupiter's positive influence can help heal rifts, foster forgiveness, and bring joy to your love life. It encourages you to embrace the power of love, kindness, and understanding in your relationships, fostering a sense of unity and deepening your connections with your loved ones.</p>

      <p>Moving on to matters of health and well-being, Jupiter's favorable influence extends to your physical vitality. It supports your fitness and energizes you, allowing you to tackle the demands of daily life with vigor. However, the packed schedules and demanding routines you may face could potentially drain your energy and leave you feeling fatigued. While focusing on your physical health, it's equally important to prioritize your mental well-being. Avoid getting entangled in unnecessary hassles and stressful situations that can burden your mind. As the year progresses, you'll notice gradual improvements in your overall health and well-being. Keep a regular check on your weight and adopt healthy eating habits that prioritize nutritious foods while reducing oil, fats, and starches. </p>

      <p>The year 2023 holds great promise for Sagittarius individuals ahead.</p>
    </div>
  },
  {
    id: 10,
    title: 'Capricorn',
    disc: <div>
      <p> Capricorn, in the year 2023, it is crucial to maintain stability and discipline. Set clear goals and develop a well-defined plan of action. Dedicate ample time and effort to your work, striving for excellence in all your endeavors. </p>

      <p>Financially, it is advisable to exercise caution and avoid unnecessary risks. While the year may bring profitable opportunities, there is a possibility of others attempting to deceive you and take advantage of your financial resources. Remain vigilant and alert to protect your assets. From around March onwards, the stars indicate a positive impact on your financial status, offering potential growth and stability. Capricorn, throughout the year, you will be required to maintain strict discipline and make balanced decisions, especially as Saturn's influence demands efficient planning and organization. Paying attention to the requirements of your family and fulfilling your responsibilities will be essential. Seek stability and follow a focused approach in your professional life. However, be prepared for certain uncertainties and challenges, particularly due to the influence of the North Node.</p>

      <p>Extended work hours and meeting deadlines may be necessary to secure your position at the workplace</p>

      <p>For businesspeople, the year may present an opportunity to strike significant deals with high-worth customers. However, the impact of the Nodes could introduce sudden changes and difficult situations, requiring careful handling. Seeking advice from mentors or astrologers regarding financial decisions and business strategies can provide valuable insights and guidance. In terms of education, the year holds promise for progress and development. With a positive approach and effective guidance from mentors, you can flourish academically. Jupiter's influence brings noticeable advancements in your studies. However, it is important to remain attentive to fluctuations in your health, as the impact of the Nodes may cause some health issues. Take proactive measures to maintain your well-being, following a balanced diet, and incorporating regular exercise into your routine.</p>

      <p>Capricorns are known for their compassionate nature and their inclination to seek support from loved ones during challenging times. According to the predictions of the Capricorn love life in 2023, if you are in a committed relationship and considering marriage, the month of February can be an ideal time to tie the knot, as the cosmic energies favor harmonious unions. The Capricorn love horoscope 2023 predicts that during the later part of the year, your astrological stars will assist you in discovering your inner strength and resilience. Venus's presence is likely to introduce new experiences and excitement into your romantic life. In July, the planets bestow their blessings upon single Capricorns, intensifying their quest for love. This period will provide ample opportunities for expressing emotions and forming meaningful connections. However, the presence of Mars may occasionally lead to unnecessary confrontations, which should be handled with care.</p>

      <p>As per the Horoscope predictions for 2022, the initial phase of the year is expected to be favourable for your health, although minor health issues may arise intermittently. This period may also facilitate the recovery from previous ailments or diseases, aided by Saturn's transit from its own house. Consequently, your stamina will improve, enabling you to combat or recuperate from chronic illnesses, particularly those related to joint pain or frequent body aches. To maintain your well-being, you will display discipline and implement necessary measures, such as adhering to a suitable diet, engaging in regular exercise, and establishing a regulated meal schedule. While you may adopt a strict approach with yourself, the ultimate outcome will be positive. This gradual recovery process will extend until April, following which you may encounter minor health issues due to Saturn's transit in the second house. During the initial phase of the year, you may experience toothaches and foot pain, but with proper care, you can effectively manage any discomfort.</p>
      
    <p>Overall, the year 2023 offers opportunities for growth and prosperity for Capricorn individuals. By maintaining discipline, making informed decisions, and seeking guidance when necessary, you can navigate the challenges and make significant strides in various aspects of your life.</p>
    </div>
  },
  {
    id: 11,
    title: 'Aquarius',
    disc: <div>
    <p> Aquarius, in the year ahead, embrace your unique individuality and let your true self shine. Engage in stimulating intellectual discussions and seek out thought-provoking experiences. Cultivate deep and meaningful connections with others, while also understanding that your family is there to support you through life's complexities. It's advisable to avoid arguments with them for now, focusing instead on fostering harmony.</p>

    <p>Explore new hobbies and interests to fuel your creativity. When it comes to finances, make well-informed decisions and prioritize long-term security. Practice mindfulness and self-care to maintain a healthy mind and body. Regular exercise, whether it's running, yoga, or trying a new sport, will boost your energy levels and reduce stress. Nourish your body with a healthy diet, incorporating nutritious foods and staying hydrated. Be mindful of portion sizes and opt for wholesome meals that support your overall well-being. </p>

    <p>Regarding your career, the beginning of the year presents an opportunity to make important decisions. However, Saturn's influence may demand more from you. Jupiter's blessings in April indicate potential gains in all areas of your work. The transit of Venus may facilitate the launch of a new project in your business. Jupiter's presence suggests you'll take on significant projects at work and gradually refocus on your studies. Despite challenging conditions, your Aquarius talent will help you manage your studies, and seeking guidance from expert astrologers can provide valuable insights. For students, Saturn's influence encourages you to avoid wasting time and concentrate on your studies. Beware of the misleading impact of the Nodes, and parental guidance is essential in navigating these influences. Jupiter indicates that the latter part of the year is favourable for addressing long-standing educational issues. Gradually, you'll experience a positive shift in your mindset. </p>

    <p>In terms of your finance horoscope, the stars predicts a positive impact on your life. Jupiter may bring forth some promising opportunities at the beginning of the year. However, be cautious of the influence of the Nodes around mid-February, as they may present financial challenges. Venus, on the other hand, may favour your wealth, fixed assets, and property matters throughout the year. Exercise caution in managing your finances based on the Aquarius 2023 Horoscope.</p>

    <p>In your love life, Venus's influence will provide opportunities for romantic experiences and heightened emotions as the year progresses. The month of February could be an ideal time to start a new relationship if you're single. Take note that Saturn suggests a need to address any recent mistakes or concerns, and spending quality time with your family is crucial in resolving ongoing issues. The month of May may bring some turbulence to your love life, but by July, you'll exhibit confidence and decisiveness in matters of the heart. Jupiter's positivity will contribute to your personal growth throughout the year.</p>

    <p>Saturn's influence supports your overall health but be cautious not to overexert yourself. The transit of Rahu may bring some physical challenges, and adopting meditation and alternative healing techniques will aid in recovery. Consider incorporating Ayurveda and organic food to support your well-being if you're dealing with prolonged illness. Towards the end of the year, be mindful of your sleep habits, as lack of sleep may contribute to stress and nervous issues.</p>
    
  <p>Embrace the opportunities that lie ahead, Aquarius, and navigate the year with confidence, mindfulness, and a commitment to your personal growth and well-being.</p>
  </div>
  },
  {
    id: 12,
    title: 'Pisces',
    disc: <div>
      <p>The yearly horoscope of Pisces 2023 year holds a mix of opportunities and challenges for individuals born under the sign of Pisces. The celestial movements and planetary influences offer valuable insights into various aspects of your life, including finance, love, relationships, career, education, and health. As we delve into the predictions for the year, it's important to remember that astrology can provide guidance and suggestions, but it's ultimately up to you to make the most of the energies and make informed decisions. </p>

      <p> Financially, Pisces can expect opportunities for growth and improved status, particularly from February onwards. However, Saturn's presence may require careful steps and accepting new challenges for desired success. Jupiter's blessings may help resolve pending property or asset issues and encourage long-term financial strategies. The latter half of the year may present new opportunities. Career-wise, Jupiter brings new opportunities for progress. Mars instills confidence and a chance to rectify past mistakes. The year-end holds promise for a good position, and business ventures and education may flourish. The influence of the South Node may introduce complexities, but the latter half of the year remains favorable for studies. Health-wise, energy may start low but improve with Mars' influence. Jupiter and Venus offer support and enhanced well-being, while caution is advised during the middle of the year. Awareness for health and fitness increases, and digestive sensitivities should be considered. Sleep disorders and minor injuries may occur initially but improve from April onwards.</p>

      <p> In matters of love, Pisces can anticipate refreshing experiences. While Saturn may bring a reality check, Venus will activate social connections and February promises rewarding moments in all aspects of life. Mars advises against a careless approach, but Jupiter offers a foundation for more stable relationships. Overall, luck and prosperity are indicated, along with better career and educational prospects. Relationships with colleagues will improve, but personal relationships may face obstacles and unexpected disturbances. Calmness and self-care are essential for navigating these challenges. The year brings amazing experiences in the love life of Pisces, marked by social gatherings and the influence of Saturn. Couples may find resolution and singles have rewarding prospects, especially around February. </p>

      <p>When it comes to your health, the year 2023 brings a mix of challenges and opportunities for Pisces individuals. It is important to pay attention to your well-being and take proactive steps to maintain a healthy mind and body throughout the year. As the year begins, Jupiter's placement in your twelfth house may bring some sleeping disorders and issues with your intimate comfort. It is advisable to establish a consistent sleep routine and create a peaceful sleep environment to improve the quality of your rest. Consider incorporating relaxation techniques such as meditation or soothing music before bedtime to promote better sleep. During the initial months, you may also experience minor injuries or health concerns that require visits to hospitals or doctor's clinics. It is crucial to address these issues promptly and follow medical advice to ensure proper healing. It is important to be mindful of your digestive system throughout the year, particularly during the first four months and the last four months. Remember to listen to your body, honor its signals, and prioritize self-care. By taking proactive steps to maintain your health, you can navigate the year with vitality and resilience. Careful attention to small injuries and visits to medical professionals may be required. Digestive sensitivity is highlighted, particularly in the first and last four months of the year, advising against consuming stale food or combining too many foods in one meal.</p>

      <p>In summary, Pisces can expect a year of financial opportunities, refreshing love experiences, career progress, and improved health. While challenges may arise, with careful steps and a focus on self-care, the overall trajectory is positive.</p>
    </div>
  }
]

export const  VratCalender = [
  {
    id:'0b4hfg98n73g67s40',
    monthName:'January',
    img:'',
    monthDisc:'',
    vart:[
      {
        vartName:'Pausha Putrada Ekadashi',
        vartDate:'Monday, January 2',
        vartDisc:<div>
          <p>Putrada Ekadashi is a Hindu holy day, which falls on the 11th lunar day of the fortnight of the waxing moon in the Hindu month of Pausha. This day is also known as Pausha Putrada Ekadashi, to differentiate it from the other Putrada Ekadashi in Shravana, which is also called Shravana Putrada Ekadashi. </p>

          <p>Couples fast on this day and worship the god Vishnu for a good son. This day is especially observed by Vaishnavas, followers of Vishnu. Couples also worship the deity for well-being for their children. Grains, beans, cereals, and certain vegetables and spices are avoided on this day. This Pausha Putrada Ekadashi is more popular in North India, while other states give more importance to the Shravana one.</p>
        </div> 
      },
      {
        vartName:'Pradosh Vrat',
        vartDate:'Wednesday, January 4',
        vartDisc:<div>
          <p>Pradosh Vrat or Pradosham is a popular Hindu Vrat that is dedicated to Lord Shiva and his wife, Goddess Parvati. Devotees observe this vrat for eternal bliss, spiritual upliftments and good health. Pradosh Kaal timings usually lie in “Sandhyakal” that is in the evening of twilight.</p>

          <p>Pradosham Vrat tithi falls on trayodashi (thirteenth day in Hindu month). There are two Pradosh days in a Hindu month, one falling in shukla paksha (waxing moon) and other in krishna paksha (waning moon).</p>
        </div> 
      },
      {
        vartName:'Pausha Purnima',
        vartDate:'Friday, January 6',
        vartDisc:<div>
          <p>Paush Purnima is celebrated during the Magha month of Hindu calendar. The specialty of this day is to take a dip in any holy water body.  A huge number of people take holy dips in sacred Yamuna and Ganga river on this day. According to the Gregorian calendar, the day falls either in the month of January or December.</p>

          <p>People from across the country gather at Prayag Sangam on the eve of Paush Purnima to perform the ceremonial bath. It is believed that there is a huge importance of Paush Purnima Vrat and bathing rituals as people get rid of their past and present sins and take a step closer to the path of attaining salvation (Moksha). Other than Prayag, Ujjain and Nasik are other famous pilgrimage places where the devotees perform holy bath on Paush Purnima.</p>
        </div> 
      },
      {
        vartName:'Sakat Chauth',
        vartDate:'Tuesday, January 10',
        vartDisc:<div>
          <p>Sakat Chauth is the day dedicated to worshipping Goddess Sakat and Lord Ganesha. On this day, women devotees observe a fast on the occasion of Krishna Paksha Ganesh Chaturthi for the happiness, prosperity and well-being of their children. The day is celebrated in all parts of India with immense fervor. In some parts of the country, Sakat Chauth is popularly celebrated as VakraTunda Chaturthi or TilKut Chauth.</p>

          <p>As per the Hindu calendar, the day falls on the fourth day during Krishna Paksha in the Magh month. According to the Gregorian calendar, the day falls in the month of January or February.</p>
        </div> 
      },
      {
        vartName:'Shatilla Ekadshi',
        vartDate:'Wednesday, January 18',
        vartDisc:<div>
          <p>Shattila Ekadashi, also famous as Tilda or Sattila Ekadashi, takes place on the 11th day during the Paush Month in the Krishna Paksha. The importance of Shattila Ekadashi is to make the people understand about the divine blessings and benefits associated with making donations and offering food to the needy and poor. </p>

          <p>Hence, the most significant part of this observance is to feed the poor and perform the puja of Lord Vishnu as by performing this the devotees get blessed and are bestowed with abundant wealth and happiness.</p>
        </div> 
      },
      {
        vartName:'Pradosh Vrat',
        vartDate:'Friday, January 20',
        vartDisc:<div>
          <p>Pradosh Vrat or Pradosham is a popular Hindu Vrat that is dedicated to Lord Shiva and his wife, Goddess Parvati. Devotees observe this vrat for eternal bliss, spiritual upliftments and good health.</p>

          <p> Pradosh Kaal timings usually lie in “Sandhyakal” that is in the evening of twilight. The word Pradosh Vrat in Hindi means Vrat related to the first part of the night or the evening. This sacred Vrat is observed to seek blessings of Lord Shiva and Parvati. Pradosh Vrat is observed two times in a month.</p>
        </div> 
      },
      {
        vartName:'Mauni Amavasya',
        vartDate:'Saturday, January 21',
        vartDisc:<div>
          <p>Mauni Amavasya is a Mahavrat and the holy confluence of Gods is inhibited as per Hindu mythology. It falls in Magh month - the virtuous month and also referred to as Magh Amavasya which is believed to be the era of Lord Krishna. It is also believed that Dwapara yuga started on this promising day. </p>

          <p> On Maun Amavasya, bathing in the holy rivers such as on the banks of river Ganges or at the Dashashwamedh Ghat in Kashi in Magh month provides the attainment of virtues, knowledge, wealth and happiness by keeping silence (Maun). </p>

          <p>On this day a silent fast is observed by the devotees and this year it falls on24th January 2020. This is the day dedicated to spiritual sadhana. </p>
        </div> 
      },
      {
        vartName:'Vasant Panchami',
        vartDate:'Thursday, January 26',
        vartDisc:<div>
          <p>Vasant Panchami 2023 is a colorful and joyous festival celebrated by Hindus and Sikhs across India.</p>

          <p>  It is also popularly called Basant Panchami in Hindi. The word ‘Vasant’ means spring and ‘Panchami’ implies the fifth day, so, as the name is, Vasant Panchami Saraswati Puja is observed on the fifth day of the season of Spring. </p>

          <p>Vasant Panchami also marks the beginning of the preparations of Holi and Holika Bonfire which occurs 40 days after this festival.</p>
        </div> 
      }
    ]
  },
  {
    id:'0b4hfg98n73g67s402',
    monthName:'February',
    img:'',
    monthDisc:'',
    vart:[
      {
        vartName:'Jaya Ekadashi',
        vartDate:'Wednesday, February 1',
        vartDisc:<div>
          <p>Jaya Ekadashi is observed on the eleventh day (Ekadashi) in the Magh month during the Shukla Paksha. It is believed that observing a fast on this Hindu tithi absolves all the past and present sins of the devotees.</p>

          <p>The most significant part of this observance is to feed the poor and perform the puja of Lord Vishnu as by performing this the devotees get blessed and are bestowed with abundant wealth and happiness.</p>

          <p> The significance of Jaya Ekadashi has been described in the several Hindu scriptures such as the Bhavishyottara Purana and Padma Purana, which is present in the form of a conversation between Lord Krishna and King Yudhisthira.</p>
        </div> 
      },
      {
        vartName:'Pradosh Vrat',
        vartDate:'Thursday, February 2',
        vartDisc:<div>
          <p>Pradosh Vrat or Pradosham is a popular Hindu Vrat that is dedicated to Lord Shiva and his wife, Goddess Parvati. Devotees observe this vrat for eternal bliss, spiritual upliftments and good health. </p>

          <p>Pradosh Kaal timings usually lie in “Sandhyakal” that is in the evening of twilight. Pradosham Vrat tithi falls on trayodashi (thirteenth day in Hindu month).</p>

          <p> There are two Pradosh days in a Hindu month, one falling in shukla paksha (waxing moon) and other in krishna paksha (waning moon).</p>
        </div> 
      },
      {
        vartName:'Magha Purnima',
        vartDate:'Sunday, February 5',
        vartDisc:<div>
          <p>Magha Purnima is celebrated on the eve of full moon day in the Hindu month of Magha. As per Hindu mythology, Magha Purnima is a sacred day for performing various spiritual and religious acts and rituals. At this time period, popular ‘Magha Mela’ and ‘Kumbh Mela’ are also organized where hundreds of thousands of devotees mark their presence from across the nation. </p>

          <p> In the regions of Tamil Nadu, on the day of Magha Purnima, float festival is organized.  By doing charities and making donations on this day, one gets relieved from all his present and past sins. </p>

          <p>Deity Vishnu and Lord Hanuman are worshipped on the day of Magha Purnima. It is believed that all the desires of the devotees who offer prayers to these deities on this day are fulfilled.</p>
        </div> 
      },
      {
        vartName:'Sankashti Chaturthi',
        vartDate:'Thursday, February 9',
        vartDisc:<div>
          <p>Sankashti Chaturthi or Sankatahara Chaturthi is a festival devoted to the benign Elephant God or Lord Ganesha.</p>

          <p>On this day, devotees worship Lord Ganesha to overcome their hurdles in life and to come out as an achiever in difficult times.</p>

          <p> This Hindu festival is observed every month on the “Chaturthi” (Fourth Day) of the Krishna Paksha (the waning phase of moon). It is also known by the name of “Sankat Hara Chaturthi” in the state of Tamil Nadu in India. </p>
        </div> 
      },
      {
        vartName:'Vijaya Ekadashi',
        vartDate:'Thursday, February 16',
        vartDisc:<div>
          <p>The significance of Vijaya Ekadashi has been described in the several Hindu scriptures. The term ‘Vijaya’ in literal meaning signifies victory.</p>

          <p>Observance of Vijaya Ekadashi and it's fast offers success and victory to the observer in the difficult situation and circumstances of his/her life. It helps in providing relief from all sort of hurdles and obstacles. If people make donations and perform charities on this day, they get relieved from their past and present sins and also earn fruitful results.</p>

          <p>  Vijaya Ekadashi fast initiates from the early morning of Ekadashi and is concluded at the sunrise of ‘Dwadashi’. There are several devotees who initiate their fast from the very tenth day by consuming ‘satvik meal’ before sunset. It is prohibited to consume any sort of grains, pulses, and rice on this day.</p>
        </div> 
      },
      {
        vartName:'Mahashivratri',
        vartDate:'Saturday, February 18',
        vartDisc:<div>
          <p>The observance and celebration of Mahashivratri among Hindus and Shaivites holds immense importance. It is a Hindu festival dedicated to Lord Shiva. Maha Shivratri is a sacred Hindu festival that is marked by a solemn remembrance of overcoming darkness and obstacles in life and world by way of fasting and meditation. </p>

          <p>This auspicious occasion is the time when divine powers of Lord Shiva and Goddess Shakti come together. It is also believed that on this day the Universe evokes the spiritual energies quite easily. </p>

          <p>The observance of Mahashivratri is marked by fasting, the meditation on Lord Shiva, introspection, social harmony and vigil at Shiva temples. Unlike other Hindu festivals which are celebrated during the day, Shivratri is one unique festival that is observed during the night.</p>
        </div> 
      },
      {
        vartName:'Pradosh Vrat',
        vartDate:'Saturday, February 18',
        vartDisc:<div>
          <p>Pradosh Vrat or Pradosham is a popular Hindu Vrat that is dedicated to Lord Shiva and his wife, Goddess Parvati. </p>

          <p>Devotees observe this vrat for eternal bliss, spiritual upliftments and good health. Pradosh Kaal timings usually lie in “Sandhyakal” that is in the evening of twilight.</p>

          <p> The word Pradosh Vrat in Hindi means Vrat related to the first part of the night or the evening. This sacred Vrat is observed to seek blessings of Lord Shiva and Parvati. Pradosh Vrat is observed two times in a month.</p>
        </div> 
      },
      {
        vartName:'Somavati Amavasya',
        vartDate:'Monday, February 20',
        vartDisc:<div>
          <p>When Amavasya falls on a Monday, then it is called as the Somvati Amavasya and is regarded as an auspicious and fortunate day.</p>

          <p> On this particular day, devotees worship Lord Shiva and also offer prayers to their forefathers.</p>

          <p> Hindu women also observe a fast of Somvati Amavasya for the good fortune and longevity of their husbands.</p>
        </div> 
      },
      
    ]
  },
  {
    id:'0b4hfg98n73g67s403',
    monthName:'March',
    img:'',
    monthDisc:'',
    vart:[
      {
        vartName:'Amalaki Ekadashi',
        vartDate:'Friday, March 3',
        vartDisc:<div>
          <p> Amalaki Ekadashi is regarded as one of the most pious and vital Ekadashi among all the 24 Ekadashis that take place in a year.</p>

          <p>The term Amalaki represents the Indian gooseberry. As per the mythology, it is believed that Goddess Lakshmi and Lord Vishnu reside in the tree of gooseberry. Thus, the tree is regarded as highly auspicious. People offer prayers and worship the tree on the eve of Amalaki Ekadashi. </p>
        </div> 
      },
      {
        vartName:'Holika Dahan/Phalgun Purnima',
        vartDate:'Tuesday, March 7',
        vartDisc:<div>
          <p> As per the Hindu calendar, when the full moon day or the Purnima is observed in the specific month of Phalguna during the Shukla Paksha, then that particular Purnima is called Phalguna Purnima.</p>

          <p>The day falls in the month of February or March as per the Gregorian calendar. There are various other festivals which are also celebrated in the month of Phalguna such as Holi, Maha Shivratri, and Vasant Panchami. </p>
        </div> 
      },
      {
        vartName:'Papmochani Ekadashi',
        vartDate:'Saturday, March 18',
        vartDisc:<div>
          <p> There are a total of twenty-four Ekadashis which take place in a year and Papmochani is one among them which is celebrated in the honor of Lord Vishnu. In the literal sense, Papmochani comprises of two words i.e.</p>

          <p> ‘Pap’ means ‘Sin’ and ‘Mochani’ signifying ‘Removal’ and together it signifies that the one who would observe Papmochani Ekadashi is absolved from all the past and present sins. On this auspicious and fortunate day of Papmochani Ekadashi, devotees worship and offer prayers to Lord Vishnu.</p>

          <p>Papmochani Ekadashi takes place on the Ekadashi (eleventh day) of the Chaitra month during the  Krishna Paksha. It is regarded as the last Ekadashi out of all the 24 Ekadashi which fall in between two major festivities i.e. Holika Dahan and Chaitra Navratri.</p>
        </div> 
      },
      {
        vartName:'Pradosh Vrat',
        vartDate:'Sunday, March 19',
        vartDisc:<div>
          <p> Pradosh Vrat or Pradosham is a popular Hindu Vrat that is dedicated to Lord Shiva and his wife, Goddess Parvati. Devotees observe this vrat for eternal bliss, spiritual upliftments and good health.</p>

          <p>Pradosh Kaal timings usually lie in “Sandhyakal” that is in the evening of twilight. Pradosham Vrat tithi falls on trayodashi (thirteenth day in Hindu month). There are two Pradosh days in a Hindu month, one falling in shukla paksha (waxing moon) and other in krishna paksha (waning moon). </p>
        </div> 
      },
      {
        vartName:'Masik Shivaratri',
        vartDate:'Monday, March 20',
        vartDisc:<div>
          <p> Monthly Shivratri fast is observed to please Lord Shiva. Fasting on this day according to the rules and regulations removes all the sufferings of his devotees.</p>

          <p>According to belief, fasting on the day of Shivratri brings happiness and prosperity in life and communicates positivity. </p>
        </div> 
      },
      {
        vartName:'Chaitra Amavasya',
        vartDate:'Tuesday, March 21',
        vartDisc:<div>
          <p>According to Hindu calendar, the new moon day which takes place in the Chaitra month is called Chaitra Amavasya. For those following the Gregorian calendar, the day falls in the month of March or April.</p>

          <p> It is for this reason dedicated to spiritual healing and considered apt for engaging in rituals that help in reversing karmic doshas and absolving an individual of his or her sins. The different phases of moon (waning and waxing) culminating in a fortnight herald the beginning of several rituals that are believed to appease the gods and forefathers. </p>
        </div> 
      },
      {
        vartName:'Gangaur/Gauri Pooja',
        vartDate:'Friday, March 24',
        vartDisc:<div>
          <p> Gauri Tritiya, popularly known as Gangaur, is celebrated extensively in parts of Rajasthan, Gujarat, Madhya Pradesh and Haryana. Gangaur festival is a 18 day long festival that begins on the first day of Chaitra month.</p>

          <p>Gangaur Puja is dedicated to Lord Shiva and Goddess Parvati and is a Hindu festival that celebrates marital happiness. ‘Gana’ means Shiva and ‘Gaur’ means Parvati and this divine couple is worshipped by all the womenfolk on this day for long life of their husbands. This day is also known as Saubhagya Teej.</p>
        </div> 
      },
      {
        vartName:'Yamuna Chhath',
        vartDate:'Monday, March 27',
        vartDisc:<div>
          <p> Yamuna Chhath which is also known as Yamuna Jayanti is one of the most significant Hindu festival which is celebrated with much gusto in cities of Mathura and Vrindavan. This festival commemorates the advent of Goddess Yamuna on earth, so, it is also termed as the birth anniversary of Yamuna, the holy river. </p>

          <p> It is observed with a great deal of enthusiasm on the Shukla Paksha Sashti tithi in the month of Chaitra which according to the Gregorian calendar falls in the month of March. On this day, people perform Chhath Puja on the banks of the holy river and pray for happiness and prosperity.</p>
        </div> 
      },
      {
        vartName:'Maha Saptami',
        vartDate:'Tuesday, March 28',
        vartDisc:<div>
          <p> The seventh day of the Navratri festival is celebrated as Maha Saptami. During the grand Durga Puja festivity of 9 days, there is vital importance of the seventh day which is observed as Maha Saptami. As per the Hindu calendar, the day is celebrated in the month of Chaitra during Shukla Paksha on Saptami. </p>
        </div> 
      },
      {
        vartName:'Durga Ashtami',
        vartDate:'Wednesday, March 29',
        vartDisc:<div>
          <p> Durga Ashtami during Navratri, especially Chaitra Navratri and Shardiya Navratri are considered the most auspicious days to seek Goddess Durga’s blessings. Durga Ashtami during Shardiya Navratri is also known as Maha Ashtami and is held in reverence by Hindus across the world. </p>
        </div> 
      },
      {
        vartName:'Ram Navami',
        vartDate:'Thursday, March 30',
        vartDisc:<div>
          <p>Ram Navami is one of the biggest Hindu festivals that holds much reverence for devotees of Lord Rama. Lord Ram is the avatar of Lord Vishnu and it was on this day he descended on this earth as son to Ayodhya king, Dasaratha and his queen Kaushalya.</p>

          <p>Lord Ram was born during Shukla Paksha on Navami tithi in the month of Chaitra and this is why this day is celebrated with happiness and fervor as Lord Rama’s birthday. Rama Navami festival also marks the last day of Chaitra Navratri festivities.</p>
        </div> 
      }
    ]
  },
  {
    id:'0b4hfg98n73g67s404',
    monthName:'April',
    img:'',
    monthDisc:'',
    vart:[
      {
        vartName:'Kamada Ekadashi',
        vartDate:'Saturday, April 1',
        vartDisc:<div>
          <p>Falling on the eleventh day of Chaitra, Kamada Ekadashi is believed to fulfil all worldly desires of devotees (kamada meaning ‘fulfillment of desire). It is the first ekadashi in the Hindu Year, and is celebrated right after Chaitra Navratri and Rama Navami. </p>

          <p>Fasting on Kamada Ekadashi, which is dedicated to Lord Krishna, is said to absolve devotees of even the murder of a Brahmin, considered the most heinous crime in Hindu religion.</p>

          <p>Krishna being an incarnation of Lord Vishnu, the latter is worshipped with utmost devotion on this day, which is also known as Chaitra Shukla Ekadashi in many parts of the country</p>
        </div> 
      },
      {
        vartName:'Som Pradosh Vrat',
        vartDate:'Monday, April 3',
        vartDisc:<div>
          <p>Pradosh Vrat or Pradosham is a popular Hindu Vrat that is dedicated to Lord Shiva and his wife, Goddess Parvati. Devotees observe this vrat for eternal bliss, spiritual upliftments and good health. Pradosh Kaal timings usually lie in “Sandhyakal” that is in the evening of twilight.</p>

          <p>Pradosham Vrat tithi falls on trayodashi (thirteenth day in Hindu month). There are two Pradosh days in a Hindu month, one falling in shukla paksha (waxing moon) and other in krishna paksha (waning moon).</p>
        </div> 
      },
      {
        vartName:'Hanuman Jayanti/Chaitra Purnima',
        vartDate:'Thursday, April 6',
        vartDisc:<div>
          <p>Hanuman Jayanti celebrates the birth of Lord Hanuman, who is believed to put an end to the miseries and hardships of his followers. The hero of the epic Ramayana, Hanuman, also known as Bajrangbali and Pavanaputra, is remembered for his ardent devotion to Lord Rama. </p>

          <p>According to the Hindu calendar 2023, Hanuman Jayanti falls in the month of Chaitra. Read Hanuman Chalisa to gain strength during the difficult time! </p>
        </div> 
      },
      {
        vartName:'Varuthini Ekadashi',
        vartDate:'Sunday, April 16',
        vartDisc:<div>
          <p>The Vaishnava Varuthini Ekadashi (also known as Baruthani Ekadashi) is a very sacred fasting day for the Vaishnavas that falls on the Ekadashi (eleventh day) during the Krishna Paksha of the Madhusudana month according to the Vaishnava calendar.</p>
        </div> 
      },
      {
        vartName:'Bhauma Pradosh Vrat',
        vartDate:'Tuesday, April 18',
        vartDisc:<div>
          <p>Pradosh Vrat or Pradosham is a popular Hindu Vrat that is dedicated to Lord Shiva and his wife, Goddess Parvati. Devotees observe this vrat for eternal bliss, spiritual upliftments and good health. Pradosh Kaal timings usually lie in “Sandhyakal” that is in the evening of twilight.</p>

          <p> Pradosham Vrat tithi falls on trayodashi (thirteenth day in Hindu month). There are two Pradosh days in a Hindu month, one falling in shukla paksha (waxing moon) and other in krishna paksha (waning moon).</p>
        </div> 
      },
      {
        vartName:'Masik Shivaratri',
        vartDate:'Tuesday, April 18',
        vartDisc:<div>
          <p>Monthly Shivratri fast is observed to please Lord Shiva. Fasting on this day according to the rules and regulations removes all the sufferings of his devotees. According to belief, fasting on the day of Shivratri brings happiness and prosperity in life and communicates positivity.</p>
        </div> 
      },
      {
        vartName:'Vaishakh Amavasya',
        vartDate:'Thursday, April 20',
        vartDisc:<div>
          <p>Vaishakha Amavasya is a beautiful day and you can take a holy dip in the Ganges, or any other water that has the essence of this river. It actually blesses you with a long life, relieving people of all the present sins.</p>

          <p>On this very auspicious day of Vaishakha Amavasya, you can also free your forefathers from all their sins. It is believed that you can perform a Pind daan (oblation to the souls of your ancestors on this day) anywhere in the country where it could be done nicely. </p>
        </div> 
      },
      {
        vartName:'Sita Navami',
        vartDate:'Saturday, April 29',
        vartDisc:<div>
          <p>Sita Navami, also known as Sita Jayanti, marks the birth anniversary of Goddess Sita, the consort of Lord Rama. The day is also famous as Janki Navami. On the day, married women observe a fast for the long lives of their husbands, just the way Sita Mata prayed for Lord Rama’s life and well-being while she was abducted by Ravana.</p>

          <p>The festival of Sita Navami falls on Navami tithi (ninth day) during Shukla Paksha in the month of Vaisakh.</p>

          <p>By observing a fast on Janaki Navami, women seek longevity for their husbands’ lives. Goddess Sita, regarded as the incarnated form of Goddess Lakshmi, was born in Mithila. She is also known by the names of Janaki, Bhoomija, and Maithili.</p>
        </div> 
      }  
    ]
  },
  {
    id:'0b4hfg98n73g67s405',
    monthName:'May',
    img:'',
    monthDisc:'',
    vart:[
      {
        vartName:'Mohini Ekadashi',
        vartDate:'Monday, May 1',
        vartDisc:<div>
          <p>Mohini Ekadashi is regarded as one of the most important fasting days for Hindu people. The day of Mohini Ekadashi is celebrated to worship Lord Vishnu and his incarnated form of Mohini.</p>

          <p>Devotees observe a Mohini Ekadashi fast to get relieved from their past sins and live a life filled with luxuries. Mohini Ekadashi is celebrated in the month of Vaisakh during the Shukla Paksha on the 11th day (Ekadashi tithi).</p>
        </div> 
      },
      {
        vartName:'Pradosh Vrat',
        vartDate:'Wednesday, May 3',
        vartDisc:<div>
          <p>Pradosh Vrat or Pradosham is a popular Hindu Vrat that is dedicated to Lord Shiva and his wife, Goddess Parvati. Devotees observe this vrat for eternal bliss, spiritual upliftments and good health. </p>

          <p>Pradosh Kaal timings usually lie in “Sandhyakal” that is in the evening of twilight. Pradosham Vrat tithi falls on trayodashi (thirteenth day in Hindu month). There are two Pradosh days in a Hindu month, one falling in shukla paksha (waxing moon) and other in krishna paksha (waning moon).</p>
        </div> 
      },
      {
        vartName:'Buddha Purnima/Vaishakh Purnima',
        vartDate:'Friday, May 5',
        vartDisc:<div>
          <p>The Hindu month of Vaishakh is regarded as one of the most fortunate months to perform fast, donation, Homa, and other religiously relevant and significant things. In Hindu Panchang, the auspiciousness and importance of Vaishakh month are clearly shown. </p>

          <p>The Purnima that falls in the month of Vaishakh is celebrated as Vaishakh Purnima. Devotees worship and offer prayers to Lord Vishnu on the day of Vaishakh Purnima with utmost dedication and faith. Vaishakha Purnima is celebrated on the full moon day in the Hindu month of Vaishakh.</p>

          <p>Buddha Purnima also famous a Vesak is one of the most significant festivals for the individuals who follow Buddhism. It is a Buddhist festival that marks the birth of Gautam Buddha. Huge celebrations are witnessed in countries like India, Sri Lanka and Nepal on this day.</p>
        </div> 
      },
      {
        vartName:'Vrishabh Sankranti/Apara Ekadashi',
        vartDate:'Monday, May 15',
        vartDisc:<div>
          <p>Apara Ekadashi or Jayeshtha Krishna Ekadashi is a fortunate day of fasting for Hindu people. This Ekadashi is also well-known as ‘Achla Ekadashi’ and is celebrated in the honor of Lord Vishnu. In a literal sense, the term ‘Apar’ means ‘a lot’ or ‘limitless’.</p>

          <p>And it is believed that the devotees who observe a fast of Apara Ekadashi get bestowed with abundance and unlimited wealth. Apara Ekadashi is celebrated in the month of Jyeshtha during the Krishna Paksha on the 11th day (Ekadashi tithi). </p>
        </div> 
      },
      {
        vartName:'Pradosh Vrat',
        vartDate:'Wednesday, May 17',
        vartDisc:<div>
          <p>Pradosh Vrat or Pradosham is a popular Hindu Vrat that is dedicated to Lord Shiva and his wife, Goddess Parvati. Devotees observe this vrat for eternal bliss, spiritual upliftments and good health. Pradosh Kaal timings usually lie in “Sandhyakal” that is in the evening of twilight.</p>

          <p>Pradosham Vrat tithi falls on trayodashi (thirteenth day in Hindu month). There are two Pradosh days in a Hindu month, one falling in shukla paksha (waxing moon) and other in krishna paksha (waning moon).</p>
        </div> 
      },
      {
        vartName:'Masik Shivaratri',
        vartDate:'Wednesday, May 17',
        vartDisc:<div>
          <p>Monthly Shivratri fast is observed to please Lord Shiva. Fasting on this day according to the rules and regulations removes all the sufferings of his devotees. According to belief, fasting on the day of Shivratri brings happiness and prosperity in life and communicates positivity.</p>
        </div> 
      },
      {
        vartName:'Shani Jayanti/Vat Savitri Vrat',
        vartDate:'Friday, May 19',
        vartDisc:<div>
          <p>The festival of Shani Jayanti or Shri Shanaishcar Janma Diwas is celebrated in the honor of Lord Shani (Saturn) as it is regarded as the birth anniversary of the deity. On this particular day, at various places, women also observe a fast of Vat Savitri.</p>

          <p>Vat Savitri Vrat is one of the most significant fasts observed by married Hindu women across India. On this day, women fast and pray for the longevity and good health of their husbands. In some Indian states, Vat Savitri Vrat is observed on Amavasya, while others observe the fast on Purnima day — both in the month of jyeshtha. </p>
        </div> 
      },
      {
        vartName:'Nirjala Ekadashi',
        vartDate:'Wednesday, May 31',
        vartDisc:<div>
          <p>As per the Hindu scriptures, among all the twenty-four Ekadashis, Nirjala Ekadashi possesses the highest level of significance and importance. As the name suggests, the literal meaning of Nirjala is without water. Thus, on the day of Nirjala Ekadashi devotees observe a dry fast where they neither consume food nor a single drop of water.</p>

          <p>As per the Hindu calendar, Nirjala Ekadashi is celebrated in the month of Jyeshtha during the Shukla Paksha on the 11th day (Ekadashi tithi).</p>
        </div> 
      }
      
    ]
  },
  {
    id:'0b4hfg98n73g67s406',
    monthName:'June',
    img:'',
    monthDisc:'',
    vart:[
      {
        vartName:'Pradosh Vrat',
        vartDate:'Friday, June 2',
        vartDisc:<div>
          <p>Pradosh Vrat or Pradosham is a popular Hindu Vrat that is dedicated to Lord Shiva and his wife, Goddess Parvati. Devotees observe this vrat for eternal bliss, spiritual upliftments and good health. Pradosh Kaal timings usually lie in “Sandhyakal” that is in the evening of twilight.</p>

          <p>Pradosham Vrat tithi falls on trayodashi (thirteenth day in Hindu month). There are two Pradosh days in a Hindu month, one falling in shukla paksha (waxing moon) and other in krishna paksha (waning moon).</p>
        </div> 
      },
      {
        vartName:'Vat Purnima Vrat',
        vartDate:'Saturday, June 3',
        vartDisc:<div>
          <p>Vat Purnima Vrat or Vat Purnima is one of the most significant observances for Hindu women, especially the one who are married. The fast is observed on the day of Amavasya as well as Purnima.</p>

          <p>Vat Purnima Vrat is observed by the Hindu women who are married in the month of Jyeshtha during the Purnima Tithi according to Amanta calendar which is also popularly known as Vat Savitri Vrat. As per Hindu mythology, it is believed that the Vat (Banyan) tree stands for ‘Trimurtis’ which means representing Lord Vishnu, Lord Brahma, and Lord Shiva. Thus, the devotees get blessed with good fortune by worshipping the Banyan tree.</p>

          <p>The significance and glory of this fast are also mentioned in numerous scriptures and Puranas such as Skanda Purana, Bhavishyottara Purana, Mahabharata, etc.</p>

          <p>The fast and puja of Vat Purnima are performed by the Hindu married women so that their husbands get blessed with prosperity, good health, and longevity.</p>

          <p>The observance of the Vat Purnima Vrat is a token of devotion and true love by a married woman to her husband.</p>
        </div> 
      },
      {
        vartName:'Jyeshtha Purnima',
        vartDate:'Sunday, June 4',
        vartDisc:<div>
          <p>Jyeshtha Purnima is observed by married Hindu women who consider Goddess Savitri as their role model. It is celebrated on a full moon day that falls in the month of jyeshth according to the Hindu calendar. </p>
        </div> 
      },
      {
        vartName:'Yogini Ekadashi',
        vartDate:'Wednesday, June 14',
        vartDisc:<div>
          <p>According to the Hindu beliefs, the observance of Yogini Ekadashi is highly significant and is observed in most parts of the nation. It is regarded as one of the most important Ekadashis which help the devotees to get relieved from various health ailments. The auspicious occasion of Yogini Ekadashi is observed in the Hindu month of Ashadha on the eleventh day, i.e. Ekadashi tithi, during Krishna Paksha. </p>
        </div> 
      },
      {
        vartName:'Mithuna Sankranti',
        vartDate:'Thursday, June 15',
        vartDisc:<div>
          <p>Raja Parba, also known as Mithuna Sankranti, is a three-day-long festival of womanhood celebrated in Odisha, India. The second day of the festival signifies beginning of the solar month of Mithuna from, which the season of rains starts</p>
        </div> 
      },
      {
        vartName:'Pradosh Vrat',
        vartDate:'Friday, June 16',
        vartDisc:<div>
          <p>Pradosh Vrat or Pradosham is a popular Hindu Vrat that is dedicated to Lord Shiva and his wife, Goddess Parvati. Devotees observe this vrat for eternal bliss, spiritual upliftments and good health. Pradosh Kaal timings usually lie in “Sandhyakal” that is in the evening of twilight. Pradosham Vrat tithi falls on trayodashi (thirteenth day in Hindu month). There are two Pradosh days in a Hindu month, one falling in shukla paksha (waxing moon) and other in krishna paksha (waning moon).</p>
        </div> 
      },
      {
        vartName:'Masik Shivaratri',
        vartDate:'Friday, June 16',
        vartDisc:<div>
          <p>Monthly Shivratri fast is observed to please Lord Shiva. Fasting on this day according to the rules and regulations removes all the sufferings of his devotees. According to belief, fasting on the day of Shivratri brings happiness and prosperity in life and communicates positivity.</p>
        </div> 
      },
      {
        vartName:'Devshayani Ekadashi',
        vartDate:'Thursday, June 29',
        vartDisc:<div>
          <p>Devshayani Ekadashi is the eleventh day of the bright fortnight in the lunar month of Ashadha. It falls between June and July and holds great significance for the Vaishnav community, followers of Lord Vishnu. It is also known by various other names such as Maha Ekadashi, Toli Ekadashi, Ashadhi Ekadashi, Harishayani Ekadashi, etc. This date in the Hindu Calendar is marked by the entry of Sun into the zodiac sign of Gemini. Thus beginning the Chaturmasa, a holy period of four months between Ashadha and Kartik.</p>
        </div> 
      }
    ]
  },
  {
    id:'0b4hfg98n73g67s407',
    monthName:'July',
    img:'',
    monthDisc:'',
    vart:[
      {
        vartName:'Shani Pradosh Vrat',
        vartDate:'Saturday, July 1',
        vartDisc:<div>
          <p>Pradosh Vrat or Pradosham is a popular Hindu Vrat that is dedicated to Lord Shiva and his wife, Goddess Parvati. Devotees observe this vrat for eternal bliss, spiritual upliftments and good health. </p>

          <p>Pradosh Kaal timings usually lie in “Sandhyakal” that is in the evening of twilight. Pradosham Vrat tithi falls on trayodashi (thirteenth day in Hindu month). There are two Pradosh days in a Hindu month, one falling in shukla paksha (waxing moon) and other in krishna paksha (waning moon).</p>
        </div>
      },
      {
        vartName:'Jyeshtha Purnima',
        vartDate:'Monday, July 3',
        vartDisc:<div>
          <p>Jyeshtha Purnima is observed by married Hindu women who consider Goddess Savitri as their role model. It is celebrated on a full moon day that falls in the month of jyeshth according to the Hindu calendar. As per the Gregorian calendar the auspicious day would take place in the summer months of May or June.</p>

          <p>The day celebrates marital devotion and purity of women living a wedded life in India. Besides Savitri, women worship Lord Brahma, Yama and Narad on this day. Her husband, Satyavan, whose life Yama had taken away only to restore it after her intervention is also prayed to, on this day. It is believed that women praying and fasting on this day are blessed with a harmonious married life and long life of spouse.</p>
        </div> 
      },
      {
        vartName:'Kamika Ekadashi',
        vartDate:'Thursday, July 13',
        vartDisc:<div>
          <p>Kamika Ekadashi festival is dedicated to worshipping Lord Vishnu and is celebrated with great enthusiasm all over by Hindus, all across the country. It is an auspicious fasting day of Hindus. Kamika Ekadashi is celebrated during Krishna paksha (dark fortnight) of Shravan month.</p>
        </div> 
      },
      {
        vartName:'Shani Pradosh Vrat',
        vartDate:'Saturday, July 15',
        vartDisc:<div>
          <p>Pradosh Vrat or Pradosham is a popular Hindu Vrat that is dedicated to Lord Shiva and his wife, Goddess Parvati. Devotees observe this vrat for eternal bliss, spiritual upliftments and good health. Pradosh Kaal timings usually lie in “Sandhyakal” that is in the evening of twilight. Pradosham Vrat tithi falls on trayodashi (thirteenth day in Hindu month). There are two Pradosh days in a Hindu month, one falling in shukla paksha (waxing moon) and other in krishna paksha (waning moon).</p>
        </div> 
      },
      {
        vartName:'Masik Shivaratri',
        vartDate:'Saturday, July 15',
        vartDisc:<div>
          <p>Monthly Shivratri fast is observed to please Lord Shiva. Fasting on this day according to the rules and regulations removes all the sufferings of his devotees. According to belief, fasting on the day of Shivratri brings happiness and prosperity in life and communicates positivity.</p>
        </div> 
      },
      {
        vartName:'Somavati Amavasya',
        vartDate:'Monday, July 17',
        vartDisc:<div>
          <p>When Amavasya falls on a Monday, then it is called as the Somvati Amavasya and is regarded as an auspicious and fortunate day. On this particular day, devotees worship Lord Shiva and also offer prayers to their forefathers. Hindu women also observe a fast of Somvati Amavasya for the good fortune and longevity of their husbands.</p>
        </div> 
      },
      {
        vartName:'Soma Pradosh Vrat',
        vartDate:'Monday, July 31',
        vartDisc:<div>
          <p>Pradosh Vrat or Pradosham is a popular Hindu Vrat that is dedicated to Lord Shiva and his wife, Goddess Parvati. Devotees observe this vrat for eternal bliss, spiritual upliftments and good health.</p>

          <p>Pradosh Kaal timings usually lie in “Sandhyakal” that is in the evening of twilight. Pradosham Vrat tithi falls on trayodashi (thirteenth day in Hindu month). There are two Pradosh days in a Hindu month, one falling in shukla paksha (waxing moon) and other in krishna paksha (waning moon).</p>
        </div> 
      }
    ]
  },
  {
    id:'0b4hfg98n73g67s408',
    monthName:'August',
    img:'',
    monthDisc:'',
    vart:[
      {
        vartName:'Ashadha Purnima',
        vartDate:'Tuesday, August 1',
        vartDisc:<div>
          <p>Full Moon day or Purnima that occurs in the Hindu month Ashadha is known as Ashadha Purnima. On this auspicious occasion, people worship Lord Vishnu and observe Gopadam Vrat. Ashadha Purnima is also celebrated as Guru Purunima, a full moon day when people seek blessings of their Guru or mentors. </p>
        </div>
      },
      {
        vartName:'Vaishnava Kamika Ekadashi',
        vartDate:'Saturday, August 12',
        vartDisc:<div>
          <p>Vaishnava Kamika Ekadashi is observed on the Ekadashi Tithi i.e., the eleventh day of the Krishna Paksha in the Shravana month of the Hindu calendar. According to the Vaishnava calendar, it falls in the Sridhar month. On this day, devotees worship Lord Vishnu.</p>

          <p>The Vaishnava Kamika Ekadashi is one of the most propitious and significant Ekadashi celebrations for Vaishnavas. This is because it falls during the Chaturmas period, which is an auspicious four month period devoted to Lord Krishna - an avatar of Lord Vishnu. The Vaishnava Kamika Ekadashi Vrat is an important fasting ritual of the Hare Krishna followers.</p>
        </div> 
      },
      {
        vartName:'Soma Pradosh Vrat',
        vartDate:'Monday, August 14',
        vartDisc:<div>
          <p>Pradosh Vrat or Pradosham is a popular Hindu Vrat that is dedicated to Lord Shiva and his wife, Goddess Parvati. Devotees observe this vrat for eternal bliss, spiritual upliftments and good health.</p>

          <p>Pradosh Kaal timings usually lie in “Sandhyakal” that is in the evening of twilight. Pradosham Vrat tithi falls on trayodashi (thirteenth day in Hindu month). There are two Pradosh days in a Hindu month, one falling in shukla paksha (waxing moon) and other in krishna paksha (waning moon).</p>
        </div> 
      },
      {
        vartName:'Masik Shivaratri',
        vartDate:'Monday, August 14',
        vartDisc:<div>
          <p>Monthly Shivratri fast is observed to please Lord Shiva. Fasting on this day according to the rules and regulations removes all the sufferings of his devotees. According to belief, fasting on the day of Shivratri brings happiness and prosperity in life and communicates positivity.</p>
        </div> 
      },
      {
        vartName:'Shravan Amavasya',
        vartDate:'Wednesday, August 16',
        vartDisc:<div>
          <p>The month of Shravan (July-August) brings number of significant events and festivals for Hindus. Shravan Amavasya or the no moon day is vital in Hindu culture from several aspects. It is famous from various other names in different regions depending upon the local cultures of India.</p>

          <p>According to Hindu Calendar, the festival of Shravan Amavasya will be celebrated on no moon day of Saravana month. The no moon day or Shravana Amavasya, is regarded as a very auspicious day for ancestral worship. Amavasya which falls in some specific months are regarded as much significant for remembering our ancestors and one of those is Shravana Amavasya.</p>

          <p>On this particular day, the male members of the house observe the ancestral puja (Pitru Puja) and also perform the offering to ancestors (Pitru tarpan). People also pray for the blessings of their ancestors. Special meals are cooked on this day and offered to the Brahmins.</p>
        </div> 
      },
      {
        vartName:'Hariyali Teej',
        vartDate:'Saturday, August 19',
        vartDisc:<div>
          <p>Teej festival is one of the most auspicious and widely celebrated festivals in Hinduism. Hariyali Teej festival is celebrated by unmarried as well as married women. This festival is also popularly called Sawan Teej. Sindhara Teej, Choti Teej, Hartalika Teej, Akha Teej or Kajari Teej. It is celebrated in the honor of Goddess Parvati and Lord Shiva. It falls on the 3rd Day of first fortnight in North Indian Lunar Month (Shravan Month). </p>

          <p>After a long period of 108 births and with great penance and prayers of Goddess Parvati, Lord Shiva finally recognized the Goddess as his wife on the auspicious day of Hariyali Teej which makes this day extremely significant in Hindu culture.</p>
        </div> 
      },
      {
        vartName:'Varlakshmi Vrat',
        vartDate:'Friday, August 25',
        vartDisc:<div>
          <p>The Varamahalakshmi Vrat or the Varalakshmi Vrat is associated with the Goddess of Fortune, Goddess Lakshmi. The word ‘Vara’ represents ‘Boon’. On this holy day, the devotees perform a specific and special ‘Lakshmi Puja’ to please the Goddess Lakshmi and for seeking good fortune, wealth and success.</p>
        </div> 
      },
      {
        vartName:'Shravana Putrada Ekadashi',
        vartDate:'Sunday, August 27',
        vartDisc:<div>
          <p>Shravana Putrada Ekadashi, also known as Pavitropana Ekadashi and Pavitra Ekadashi, is a Hindu holy day, which falls on the 11th lunar day of the fortnight of the waxing moon in the Hindu month of Shravana which in the Gregorian calendar falls in July or August.</p>
        </div> 
      },
      ,
      {
        vartName:'Bhauma Pradosh Vrat',
        vartDate:'Tuesday, August 29',
        vartDisc:<div>
          <p>Pradosh Vrat or Pradosham is a popular Hindu Vrat that is dedicated to Lord Shiva and his wife, Goddess Parvati. Devotees observe this vrat for eternal bliss, spiritual upliftments and good health.</p>

          <p>Pradosh Kaal timings usually lie in “Sandhyakal” that is in the evening of twilight. Pradosham Vrat tithi falls on trayodashi (thirteenth day in Hindu month). There are two Pradosh days in a Hindu month, one falling in shukla paksha (waxing moon) and other in krishna paksha (waning moon).</p>
        </div> 
      },
      {
        vartName:'Shravana Purnima',
        vartDate:'Thursday, August 31',
        vartDisc:<div>
          <p>Shravana Purnima is regarded as a highly auspicious day in Hindu culture. The various rituals which are performed on Shravana Purnima possess immense significance. The rituals of ‘Upnayan’ and ‘Yagyopaveet’ are observed on this day. Brahmins also observe ‘Shudhikaran’ ritual on Shravana Purnima as it is considered as one of the most sacred day for performing religious rituals.</p>
        </div> 
      }
    ]
  },
  {
    id:'0b4hfg98n73g67s409',
    monthName:'September',
    img:'',
    monthDisc:'',
    vart:[
      {
        vartName:'Kajari Teej',
        vartDate:'Saturday, September 2',
        vartDisc:<div>
          <p>Kajari Teej, also known as Kajali Teej, is widely celebrated all over India. This Hindu festival is celebrated in the lunar month of Bhadrapada on the 3rd day of the dark fortnight (Krishna Paksha). </p>

          <p>As per the Gregorian calendar, Kajari Teej usually falls in the month of August of July. It is basically a festival which is celebrated majorly by Hindu women. The major areas where the festival holds much significance are Rajasthan, Madhya Pradesh, and Uttar Pradesh.</p>
        </div>
      },
      {
        vartName:'Janmashtami Samarta',
        vartDate:'Wednesday, September 6',
        vartDisc:<div>
          <p>Krishna Janmashtmi is recorded two days back to back. No grains are supposed to be consumed while fasting on Janmashtami until the next day when the fast is broken. Parana which implies breaking the fast ought to be done at a suitable time.</p>

          <p>For Krishna Janmashtami fasting, Parana is done next day after sunrise when Ashtami Tithi and Rohini Nakshatra are over. If Ashtami Tithi and Rohini Nakshatra don't get over before sunset then the fast can be broken during the day when either Ashtami Tithi and Rohini Nakshatra is over. At a point when neither Ashtami Tithi nor Rohini Nakshatra is over before sunset or even Hindu Midnight (otherwise called Nishita Time), one should be waiting to get them over before breaking the fast.</p>
        </div> 
      },
      {
        vartName:'Janmashtami',
        vartDate:'Thursday, September 7',
        vartDisc:<div>
          <p>Krishna Janmashtami, also known simply as Krishnashtami, Janmashtami, or Gokulashtami, is an annual Hindu festival that celebrates the birth of Krishna, the eighth avatar of Vishnu. In certain Hindu texts, such as the Gitagovinda, Krishna has been identified as supreme God and the source of all avatars.</p>
        </div> 
      },
      {
        vartName:'Aja Ekadashi',
        vartDate:'Sunday, September 10',
        vartDisc:<div>
          <p>Aja Ekadashi is all about the Ekadashi observed at the time of Krishnna Paksha (the dark fortnight of Moon) in the Hindu month of ‘Bhadrapada’. This Ekadashi is also called ‘Ananda Ekadashi’.</p>

          <p>In North India, Aja Ekadashi is observed in the Hindu month of ‘Bhadrapada’ and in other regions it is observed in the month of ‘Shravana’. Aja Ekadashi is purely dedicated to Lord Vishnu and Goddess Lakshmi.</p>
        </div> 
      },
      {
        vartName:'Bhauma Pradosh Vrat',
        vartDate:'Tuesday, September 12',
        vartDisc:<div>
          <p>Pradosh Vrat or Pradosham is a popular Hindu Vrat that is dedicated to Lord Shiva and his wife, Goddess Parvati. Devotees observe this vrat for eternal bliss, spiritual upliftments and good health. </p>

          <p>Pradosh Kaal timings usually lie in “Sandhyakal” that is in the evening of twilight. Pradosham Vrat tithi falls on trayodashi (thirteenth day in Hindu month). There are two Pradosh days in a Hindu month, one falling in shukla paksha (waxing moon) and other in krishna paksha (waning moon).</p>
        </div> 
      },
      {
        vartName:'Masik Shivaratri',
        vartDate:'Wednesday, September 13',
        vartDisc:<div>
          <p>Monthly Shivratri fast is observed to please Lord Shiva. Fasting on this day according to the rules and regulations removes all the sufferings of his devotees. According to belief, fasting on the day of Shivratri brings happiness and prosperity in life and communicates positivity.</p>
        </div> 
      },
      ,
      {
        vartName:'Bhadrapada Amavasya',
        vartDate:'Thursday, September 14',
        vartDisc:<div>
          <p>Bhadrapada Amavasya will be observed on the new moon day in Bhadrapada month. In Hindu religion, it is believed that by praying on the eve of Bhadrapada Amavasya, one is rid of past sins, and malicious feelings are driven out of mind. It helps individuals start afresh on a spiritual and optimistic note. Many individuals observe Bhadrapada Amavasya fast to usher in harmony and peace in their abode.</p>
        </div> 
      },
      {
        vartName:'Vishwakarma Puja',
        vartDate:'Sunday, September 17',
        vartDisc:<div>
          <p>Vishwakarma Jayanti is a day of celebration for Vishwakarma, a Hindu god, the divine architect. The festival is observed primarily in factories and industrial areas, often on the shop floor.</p>
        </div> 
      },
      {
        vartName:'Hartalika Teej',
        vartDate:'Monday, September 18',
        vartDisc:<div>
          <p>The celebration of Hartalika Teej is in recognition of the holy bond between Lord Shiva and Goddess Parvati.</p>

          <p>According to Hindu mythology, Goddess Parvati found Lord Shiva as her husband on the fortunate day of Hartalika Teej. This is the day that celebrates her exceptional devotion and penance for 108 consecutive births following which Lord Shiva became her partner.</p>

          <p>For the same reason, the day is considered auspicious for women and girls alike. On the eve of Hartalika Teej, women worship Goddess Parvati to seek her blessings for a successful married life. The statues of Goddess Parvati and Lord Shiva are made with sand and are worshipped for wellbeing of spouses and blessing for healthy children.</p>
        </div> 
      },
      {
        vartName:'Radha Ashtami',
        vartDate:'Saturday, September 23',
        vartDisc:<div>
          <p>Radha Ashtami is a well-known Hindu festival which is celebrated to commemorate the birth of Shri Radha Rani. Radharani was revered as the consort of Lord Krishna. According to the Hindu beliefs, she is the incarnation or avatar of Goddess Lakshmi.</p>

          <p>As per the Hindu calendar, the auspicious eve of Radha Ashtami is celebrated in the month of Bhadrapada, on the eighth day of the Shukla Paksha which is the Ashtami Tithi. The occasion of Radha Ashtami falls 15 days after the festival of Janmashtami, the birth anniversary of Lord Krishna. It usually takes place in the month of August or September according to the Gregorian calendar.</p>

          <p>Radha Ashtami is also popular as Radhashtami or Radha Jayanti. On this particular day, the devotees worship Radharani with much enthusiasm and devotion. The day also signifies the selfless and admirable bond of love between Radha and Krishna, and their sacred association.</p>
        </div> 
      },
      {
        vartName:'Parsva Ekadashi',
        vartDate:'Monday, September 25',
        vartDisc:<div>
          <p>Parsva Ekadashi is regarded as one of the most auspicious and virtuous festivities which takes place on the eleventh day (Ekadashi) of Bhadrapada month in the Shukla Paksha as per the Hindu calendar. According to the Gregorian calendar, this auspicious festival falls in the month of either August or September.</p>
        </div> 
      },
      {
        vartName:'Vamana Jayanti',
        vartDate:'Tuesday, September 26',
        vartDisc:<div>
          <p>Vamana Jayanti is celebrated to worship the fifth incarnation (avatar) of Lord Vishnu as Lord Vamana. The festivities of Vamana Jayanti takes place on the twelfth day of Bhadrapada month in the Shukla Paksha as per the Hindu calendar. Vamana Jayanti falls either in August or September as per the Gregorian calendar.</p>
        </div> 
      },
      {
        vartName:'Pradosh Vrat',
        vartDate:'Wednesday, September 27',
        vartDisc:<div>
          <p>Pradosh Vrat or Pradosham is a popular Hindu Vrat that is dedicated to Lord Shiva and his wife, Goddess Parvati. Devotees observe this vrat for eternal bliss, spiritual upliftments and good health. </p>

          <p>Pradosh Kaal timings usually lie in “Sandhyakal” that is in the evening of twilight. Pradosham Vrat tithi falls on trayodashi (thirteenth day in Hindu month). There are two Pradosh days in a Hindu month, one falling in shukla paksha (waxing moon) and other in krishna paksha (waning moon).</p>
        </div> 
      },
      {
        vartName:'Bhadrapada Purnima',
        vartDate:'Friday, September 29',
        vartDisc:<div>
          <p>Bhadrapada is considered to be one of the most auspicious months in Hindu Calendar. This month is considered to be the celebration month for Lord Ganesha. But, there is one exception related to the Bhadrapada Purnima as the rituals for this day pertain to the Lord Satyanarayana.</p>

          <p>This festival is very popular in the state of Gujarat and is celebrated with a lot of devotion. The devotees offer prayers to Amba Devi by deploying special measures, and there is a fair that is organized at the Ambaji temple. Devotees from the entire state throng to the Ambaji temple to seek her blessings on this auspicious day.</p>
        </div> 
      }
    ]
  },
  {
    id:'0b4hfg98n73g67s4010',
    monthName:'October',
    img:'',
    monthDisc:'',
    vart:[
      {
        vartName:'Indira Ekadashi',
        vartDate:'Tuesday, October 10',
        vartDisc:<div>
          <p>Indira Ekadashi is one of the most significant and religious Hindu festivals which is meant for worshipping Lord Vishnu. As per the Hindu calendar, the festival is observed on the eleventh day (Ekadashi) in the Bhadrapada or Ashwin month during Krishna Paksha. According to the Gregorian calendar, it is celebrated either in the month of September or October.</p>
          
        </div> 
      },
      {
        vartName:'Masik Shivaratri',
        vartDate:'Thursday, October 12',
        vartDisc:<div>
          <p>Monthly Shivratri fast is observed to please Lord Shiva. Fasting on this day according to the rules and regulations removes all the sufferings of his devotees. According to belief, fasting on the day of Shivratri brings happiness and prosperity in life and communicates positivity.</p>
        </div> 
      },
      {
        vartName:'Pradosh Vrat',
        vartDate:'Thursday, October 12',
        vartDisc:<div>
          <p>Pradosh Vrat or Pradosham is a popular Hindu Vrat that is dedicated to Lord Shiva and his wife, Goddess Parvati. Devotees observe this vrat for eternal bliss, spiritual upliftments and good health. </p>

          <p>Pradosh Kaal timings usually lie in “Sandhyakal” that is in the evening of twilight. Pradosham Vrat tithi falls on trayodashi (thirteenth day in Hindu month). There are two Pradosh days in a Hindu month, one falling in shukla paksha (waxing moon) and other in krishna paksha (waning moon).</p>
        </div> 
      },
      {
        vartName:'Navratri Begins/ Ghatasthapana',
        vartDate:'Sunday, October 15',
        vartDisc:<div>
          <p>Navratri is one of the most significant and auspicious festivals in Hindu culture which is celebrated with much joy, enthusiasm and fervor. It is a 9-day festival. There are four Navratri in a year, however, two of them are considered supremely significant. </p>
          
          <p>Kalash Sthapana or the Ghatasthapana is regarded as the most significant ritual that marks the beginning of the celebrations of the Navratri festival. The ritual is performed to invoke the Goddess by placing the Kalash. The devotees chant Durga Saptshati and also light the Akhand Jyoti which is lit for complete nine days of the festival.</p>
        </div> 
      },
      {
        vartName:'Brahmacharini Puja ',
        vartDate:'Monday, October 16',
        vartDisc:<div>
          <p>Maa Brahmacharini, worshipped on the second day of Chaitra Navratri, is symbolic of the severe penance carried out by Goddess Parvati. After the Kushmanda form, Goddess Parvati took birth at the home of King Himavanth.</p>
        </div> 
      },
      {
        vartName:'Tula Sankranti',
        vartDate:'Wednesday, October 18',
        vartDisc:<div>
          <p>Tula Sankranti is an auspicious day when the paddy fields are full and yields. The farmers ideate Goddess Lakshmi in the lush plants and worship her. Fresh paddies and rice, wheat plants and Kara, a medicinal plant to ward off insects are offered to the Goddess Lakshmi to seek blessings from the Goddess.</p>
        </div> 
      },
      ,
      {
        vartName:'Saraswati Avahan',
        vartDate:'Friday, October 20',
        vartDisc:<div>
          <p>The very first day of Goddess Saraswati Puja at the time of Navratri festival is popularly celebrated as ‘Saraswati Avahan’. The term Avahan denotes invocation and thus the ritual of Saraswati Avahan is performed for invoking the divine blessings of Goddess Saraswati.</p>

          <p>The concluding three days of the grand festival of Navratri are primarily dedicated for worshipping Saraswati Maa. The ritual of Saraswati Avahan is performed on the seventh day (Maha Saptami) in the month of Ashwin during Shukla Paksha as per the Hindu calendar. </p>

        </div> 
      },
      {
        vartName:'Katyayani Puja',
        vartDate:'Friday, October 20',
        vartDisc:<div>
          <p>The sixth day of the Navratri festival is dedicated to the worship of Goddess Katyayani. After worshipping Goddess Skandamata on the fifth day of Navratri, the devotees observe and perform Katyayani Puja on the sixth day.</p>

          <p>As per the Hindu beliefs, Goddess Katyayani symbolizes the sixth form of Goddess Durga. It is believed that to kill the demon, Mahishasura, Maa Parvati got into the form of Goddess Katyayani. This form of Goddess Parvati is said to be the most violent of all and she is also recognized as the Warrior Goddess in this form. Planet Brihaspati is believed to be governed by Maa Katyayani. On the sixth day of Navratri, devotees worship Goddess Katyayani and hear and read her story.</p>
        </div> 
      },
      {
        vartName:'Kalparambha',
        vartDate:'Friday, October 20',
        vartDisc:<div>
          <p>Kalparambha and Akal Bodhon are rituals that are observed on Shashti Tithi and mark the beginning of Durga Puja festivities in West Bengal. In other states, this ritual is known as Bilva Nimantran.</p>

          <p>The ritual of Kalparambha is observed a day prior to Navpatrika Puja which is also known as Kolabou Puja.</p>
        </div> 
      },
      {
        vartName:'Navpatrika Pooja',
        vartDate:'Saturday, October 21',
        vartDisc:<div>
          <p>The ritual of Navpatrika Puja or Nabapatrika Puja is also widely popular as Maha Saptami and is regarded as the very first day of the occasion of Durga Puja. As per the Hindu beliefs, a medium is required for invoking the spirit of Goddess Durga. And, the living mediums are the sources by which devotees can have an interaction with the Gods and Goddesses. These mediums help in paying homage and interacting with the divinity. On the day of Bilva Nimantran, Goddess Durga is invoked in the branches of Bilva tree and then only Durga Puja is performed.</p>
        </div> 
      },
      {
        vartName:'Saraswati Pooja',
        vartDate:'Saturday, October 21',
        vartDisc:<div>
          <p>In the Navratri festival, devotees worship Goddess Saraswati and perform Saraswati Puja after worshipping Goddess Katyayani on the sixth day of Navratri.</p>

          <p>As per the Hindu beliefs, Goddess Saraswati symbolizes another form of Goddess Durga. Goddess Saraswati is spoken to as an elegant lady in white, an image of virtue and peace. She is the Goddess of information, learning, expressions and culture. She is viewed as the quiet Goddess wearing a sickle Moon on her temples riding a swan or situated on a lotus bloom.
</p>
        </div> 
      },
      {
        vartName:'Durga Pooja Ashtami',
        vartDate:'Sunday, October 22',
        vartDisc:<div>
          <p>Durga Ashtami is one of the most widely observed and celebrated days in the Hindu culture.</p>

          <p>Durgashtami is celebrated every month on the Ashtami tithi (eighth day) of Shukla Paksha. This is why this day is often termed as Maas Durgashtami or Masik Durgashtami. However, Durga Ashtami during Navratri, especially Chaitra Navratri and Shardiya Navratri are considered the most auspicious days to seek Goddess Durga’s blessings. Durga Ashtami during Shardiya Navratri is also known as Maha Ashtami and is held in reverence by Hindus across the world.</p>
        </div> 
      },
      {
        vartName:'Durga Maha Navami Pooja',
        vartDate:'Monday, October 23',
        vartDisc:<div>
          <p>In India, the festival of Navratri holds deep religious significance. It is celebrated twice in a year - Chaitra Navratri which falls in the Hindu Month of Chaitra and Sharad Navratri in the Lunar month of Ashvin. Navmi Tithi (9th Day) of Navratri is considered as the most auspicious day among all the nine days of this festival.</p>

          <p>In Hindu Calendar, on Chaitra Navratri, this day is celebrated as Rama Navami while on Sharad Navratri, it is revered as Maha Navami. Maha Navami is a religious festival dedicated to Maa Durga and her 9 avatars. People worship the different avatars of Durga in different parts of India. Essentially on this day, the Mahisasurmardini, i.e. one who killed the buffalo demon, the form of Durga is worshipped. As the legend has it, on this auspicious day of Maha Navami, the Goddess killed the evil Mahisasur. Navami is the day to laud the victory of good over evil.</p>
        </div> 
      },
      {
        vartName:'Durga Visarjan',
        vartDate:'Tuesday, October 24',
        vartDisc:<div>
          <p>Durga Visarjan is a religious festivity that marks the end of the celebration of the 9 day long Navratri festival that comprises of invoking Goddess Durga and her various incarnations with a ritual of rigorous fasting as well as intense praying to seek her blessings. The observance of immersing the idol of Maa Durga in the river coincides with the celebration of Vijayadashami or Dussehra. </p>

          <p>Celebrated in the Hindu month of Ashvin, this Indian festival is celebrated zealously in the states of West Bengal, Assam, Odisha and in some parts of Bihar and Maharashtra.</p>
        </div> 
      },
      {
        vartName:'Papankusha Ekadashi',
        vartDate:'Wednesday, October 25',
        vartDisc:<div>
          <p>Pradosh Vrat or Pradosham is a popular Hindu Vrat that is dedicated to Lord Shiva and his wife, Goddess Parvati. Devotees observe this vrat for eternal bliss, spiritual upliftments and good health. Pradosh Kaal timings usually lie in “Sandhyakal” that is in the evening of twilight. Pradosham Vrat tithi falls on trayodashi (thirteenth day in Hindu month). There are two Pradosh days in a Hindu month, one falling in shukla paksha (waxing moon) and other in krishna paksha (waning moon).</p>
        </div> 
      },
      {
        vartName:'Pradosh Vrat',
        vartDate:'Friday, October 27',
        vartDisc:<div>
          <p>Pradosh Vrat or Pradosham is a popular Hindu Vrat that is dedicated to Lord Shiva and his wife, Goddess Parvati. Devotees observe this vrat for eternal bliss, spiritual upliftments and good health. Pradosh Kaal timings usually lie in “Sandhyakal” that is in the evening of twilight.</p>
        </div> 
      },
      {
        vartName:'Sharad Purnima/Ashwina Purnima',
        vartDate:'Saturday, October 28',
        vartDisc:<div>
          <p>Sharad Purnima is one of the most religiously significant full moon nights in Hindu Calendar. It comes in the Sharad Ritu (season) and is observed on Purnima (full moon night) in the month of Ashvin (September/October). This celebration is also known as Kaumudi, i.e. Moonlight or Kojagari Purnima. 2023 Sharad Poonam is also celebrated as a harvest festival in many states of India and also marks the beginning of the winter season after monsoon.</p>
        </div> 
      }
    ]
  },
  {
    id:'0b4hfg98n73g67s4011',
    monthName:'November',
    img:'',
    monthDisc:'',
    vart:[
      {
        vartName:'Karwa Chauth',
        vartDate:'Wednesday, November 1',
        vartDisc:<div>
          <p>Karva Chauth is celebrated in Northern India on a huge scale by the Indian women. It is a day long festival which is noted with extreme enthusiasm and passion. A ritual of fasting the whole day is observed on the day of Karwa Chauth which is known as Karwa Chauth Vrat or Karva Chauth Fasting.</p>

          <p>On this day married women keep a strict fast from sunrise to moonrise to ensure the safety and longevity of their husband’s life. Karwa Chauth is celebrated highly in the states of Himachal Pradesh, Uttrakhand, Uttar Pradesh, Haryana, Punjab, Gujarat and Rajasthan.</p>
        </div> 
      },
      {
        vartName:'Ahoi Ashtami',
        vartDate:'Thursday November 9',
        vartDisc:<div>
          <p>Ahoi Ashtami is an Indian festival dedicated to Goddess Ahoi popularly known as Ahoi Mata. It is majorly celebrated in Northern India and falls on 'ashtami' or the eighth day of the month of Kartik in the dark fortnight (Krishna Paksha). This religious festival comes four days after Karva Chauth and eight days prior to Deepawali.</p>

          <p>Ahoi Ashtami is essentially the festival of mothers who perform the Ahoi Mata Vrat on this day for the wellbeing of their sons. Traditionally it was done only for sons, but now mothers observe this fast for the welfare of all their children. Mothers worship Goddess Ahoi with utmost fervor and pray for a long, happy and healthy life for their children. They break the fast only after seeing and worshipping the moon or the stars.</p>
        </div> 
      },
      {
        vartName:'Rama Ekadashi',
        vartDate:'Friday, November 10',
        vartDisc:<div>
          <p>Rama Ekadashi is regarded as one of the most auspicious and significant Ekadashis as per the Hindu beliefs. According to the Hindu calendar, Rama Ekadashi takes place on the 11th day in the Kartik month during the Krishna Paksha. It is also popular by its other names such as Kartik Krishna Ekadashi or Rambha Ekadashi and it takes place four days prior to the Diwali celebrations.</p>
          <p>Rama Ekadashi Vrat is recognized as one of the most significant Ekadashi fasts which are observed in the Hindu religion as the devotees can get absolved from all their sins by keeping this fast religiously.</p>
        </div> 
      },
      {
        vartName:'Masik Shivaratri',
        vartDate:'Saturday, November 11',
        vartDisc:<div>
          <p>Monthly Shivratri fast is observed to please Lord Shiva. Fasting on this day according to the rules and regulations removes all the sufferings of his devotees. According to belief, fasting on the day of Shivratri brings happiness and prosperity in life and communicates positivity.</p>
        </div> 
      },
      {
        vartName:'Shani Pradosh Vrat',
        vartDate:'Sunday, November 12',
        vartDisc:<div>
          <p>Pradosh Vrat or Pradosham is a popular Hindu Vrat that is dedicated to Lord Shiva and his wife, Goddess Parvati. Devotees observe this vrat for eternal bliss, spiritual upliftments and good health. Pradosh Kaal timings usually lie in “Sandhyakal” that is in the evening of twilight. Pradosham Vrat tithi falls on trayodashi (thirteenth day in Hindu month). There are two Pradosh days in a Hindu month, one falling in shukla paksha (waxing moon) and other in krishna paksha (waning moon).</p>
        </div> 
      },
      {
        vartName:'Kedara Gauri Vrat',
        vartDate:'Sunday, November 12',
        vartDisc:<div>
          <p>Kedara Gauri Vrat is the most celebrated religious observance in Southern India, especially in major parts of Tamil Nadu. This Hindu festival coincides with the main day of Diwali or Laxmi Puja. It is strictly observed by the ardent devotees of Lord Shiva and can be concluded by anyone irrespective of sex or caste.</p>

          <p>It is a 21 day long fasting observance which commences on Ashtami (eighth day) of Shukla Paksha in the Tamil month of Purattasi and ends on Amavasya, the main day of Deepawali. Now days, devotees usually perform this fasting on single day i.e. the last day of Amavasya.</p>
        </div> 
      },
      ,
      {
        vartName:'Chhath Pooja',
        vartDate:'Wednesday, November 22',
        vartDisc:<div>
          <p>Kartika Amavasya is the Amavasya or No moon day that falls in the Hindu month of Kartika. According to the Gregorian calendar, Kartika month corresponds to the October/November month. Kartik Amavasy is also celebrated all over the world as a day of Diwali.</p>
        </div> 
      },
      {
        vartName:'Devutthana Ekadashi',
        vartDate:'Friday, November 24',
        vartDisc:<div>
          <p>Devutthana Ekadashi is one of the important Ekadashi, out of the 24 Ekadashis, as it is believed that on this Ekadashi Tithi (date), Lord Vishnu, the protector, and preserver of the Earth and Universe, wakes up after the Chaturmas (4 months) of being in a sleep state.</p>
        </div> 
      },
      {
        vartName:'Pradosh Vrat',
        vartDate:'Saturday, November 25',
        vartDisc:<div>
          <p>Pradosh Vrat or Pradosham is a popular Hindu Vrat that is dedicated to Lord Shiva and his wife, Goddess Parvati. Devotees observe this vrat for eternal bliss, spiritual upliftments and good health. </p>

          <p>Pradosh Kaal timings usually lie in “Sandhyakal” that is in the evening of twilight. Pradosham Vrat tithi falls on trayodashi (thirteenth day in Hindu month). There are two Pradosh days in a Hindu month, one falling in shukla paksha (waxing moon) and other in krishna paksha (waning moon).</p>
        </div> 
      },
      {
        vartName:'Kartika Purnima',
        vartDate:'Thursday, November 30',
        vartDisc:<div>
          <p>Kartika Purnima is a Hindu, Sikh and Jain cultural festival that is celebrated on Purnima. It falls in November or December of the Gregorian calendar and is also known as Tripurari Purnima or Deva-Deepawali, the gods' festival of lights.</p>

          <p>Kartik Purnima is celebrated as the birth anniversary of Vrinda, personification of Tulsi plant. This day also marks the birthday of Matsya, the fish incarnation of Lord Vishnu. It is believed that Kartikey, son of Lord Shiva was also born on this day. The last five days of the Kartik month as considered to be the most sacred days and devotees observe fast by eating only once a day, in the afternoon, which is known as Habisha. </p>
        </div> 
      }
    ]
  },
  {
    id:'0b4hfg98n73g67s4012',
    monthName:'December',
    img:'',
    monthDisc:'',
    vart:[
      {
        vartName:'Utpanna Ekadashi',
        vartDate:'Friday, December 8',
        vartDisc:<div>
          <p>Utpanna Ekadashi also called as Utpatti Ekadashi, is observed on the eleventh day (Ekadashi) in the Margashirsh month during the Krishna Paksha. It is the first Ekadashi that comes after Kartik Purnima.</p>

          <p>The devotees who wish to observe a yearly fast for Ekadashi then they must initiate the same on this day. As per the Hindu beliefs and mythology, it is believed that observing a fast on this Hindu tithi absolves all the past and present sins of the devotees.</p>
        </div>
      },
      {
        vartName:'Ravi Pradosh Vrat',
        vartDate:'Sunday, December 10',
        vartDisc:<div>
          <p>Pradosh Vrat or Pradosham is a popular Hindu Vrat that is dedicated to Lord Shiva and his wife, Goddess Parvati. Devotees observe this vrat for eternal bliss, spiritual upliftments and good health.</p>

          <p>Pradosh Kaal timings usually lie in “Sandhyakal” that is in the evening of twilight. Pradosham Vrat tithi falls on trayodashi (thirteenth day in Hindu month). There are two Pradosh days in a Hindu month, one falling in shukla paksha (waxing moon) and other in krishna paksha (waning moon).</p>
        </div> 
      },
      {
        vartName:'Masik Shivaratri',
        vartDate:'Monday, December 11',
        vartDisc:<div>
          <p>Monthly Shivratri fast is observed to please Lord Shiva. Fasting on this day according to the rules and regulations removes all the sufferings of his devotees. According to belief, fasting on the day of Shivratri brings happiness and prosperity in life and communicates positivity.</p>
        </div> 
      },
      {
        vartName:'Moksha Ekadashi',
        vartDate:'Friday, December 22',
        vartDisc:<div>
          <p>Mokshada Ekadashi is a Hindu holy day, which falls on the 11th lunar day of the fortnight of the waxing moon in the Hindu month of Margashirsha, corresponding to November–December. Hindus, particularly Vaishnavas, observe a 24-hour fast in honour of the deity Krishna, an avatar of Vishnu.</p>
        </div> 
      },
      {
        vartName:'Pradosh Vrat',
        vartDate:'Sunday, December 24',
        vartDisc:<div>
          <p>Pradosh Vrat or Pradosham is a popular Hindu Vrat that is dedicated to Lord Shiva and his wife, Goddess Parvati. Devotees observe this vrat for eternal bliss, spiritual upliftments and good health.</p>

          <p>Pradosh Kaal timings usually lie in “Sandhyakal” that is in the evening of twilight. Pradosham Vrat tithi falls on trayodashi (thirteenth day in Hindu month). There are two Pradosh days in a Hindu month, one falling in shukla paksha (waxing moon) and other in krishna paksha (waning moon).</p>
        </div> 
      },
      {
        vartName:'Margashirsha Purnima',
        vartDate:'Thursday, December 28',
        vartDisc:<div>
          <p>Purnima that comes up in the Shukla Paksha of Margashirsha month is known as Margashirsha Purnima. Battisi Purnima or Korala Purnima are other names often used for Margashisrsha Purnima. As mentioned in the ancient Hindu scriptures, the month of Margashirsha Poonam is known as the month of religious activities, worship and charity.</p>

          <p> It is believed that the era of Satyug, began this month and that is the reason that tapasya, worship and other auspicious activities performed on this day are highly rewarding. Bathing in the sacred rivers of Haridwar, Banaras and Prayagraj are known to be highly auspicious on this day.</p>
        </div> 
      }
    ]
  }


]

export const ShubhMuhurats = [
  {
      name: 'Marriage Muhurat in 2023',
      list: ['January 15, Sunday          ', 'January 18, Wednesday	     ', 'January 25, Wednesday       ', 'January 26, Thursday        ', 'January 27, Friday	     ', 'January 30, Monday 	     ', 'February 6, Monday          ', 'February7, Tuesday          ', 'February 9, Thursday        ', 'February 10, Friday         ', 'February 12, Sunday         ', 'February 13, Monday         ', 'February 14, Tuesday        ', 'February 16, Thursday       ', 'February 22, Wednesday	     ', 'February 23, Thursday       ', 'February 27, Monday	     ', 'February 28, Tuesday	     ', 'March 6, Monday             ', 'March 9, Thursday           ', 'March 11, Saturday	     ', 'March 13, Monday	     ', 'May 3, Wednesday            ', 'May 6, Saturday             ', 'May 8, Monday		     ', 'May 9, Tuesday        	     ', 'May 10, Wednesday           ', 'May 11, Thursday            ', 'May 15, Monday		     ', 'May 16, Tuesday	     ', 'May 20, Saturday            ', 'May 21, Sunday		     ', 'May 22, Monday		     ', 'May 29, Monday        	     ', 'May 30, Tuesday             ', 'June 1, Thursday            ', 'June 3, Saturday            ', 'June 5, Monday        	     ', 'June 6, Tuesday             ', 'June 7, Wednesday	     ', 'June 11, Sunday             ', 'June 12, Monday	     ', 'June 23, Friday	     ', 'June 26, Monday             ', 'November 23, Thursday       ', 'November 27, Monday         ', 'November 28, Tuesday        ', 'November 29, Wednesday      ', 'December 6, Wednesday       ', 'December 7, Thursday        ', 'December 9, Saturday        ', 'December 15, Friday         ']
  },
  {
      name: 'Griha Pravesh Muhurat 2023',
      list: ['January 25, Wednesday	   ', 'January 27, Friday	   ', 'January 30, Monday	   ', 'February 01, Wednesday	   ', 'February 08, Wednesday	   ', 'February 10, Friday	   ', 'February 22, Wednesday	   ', 'March 08, Wednesday	   ', 'March 10, Friday	   ', 'March 13, Monda	   ', 'March 17, Friday	   ', 'May 06, Saturday	   ', 'May 15, Monday		   ', 'May 20, Saturday	   ', 'May 22, Monday		   ', 'May 29, Monday		   ', 'May 31, Wednesday	   ', 'June 12, Monday	   ', 'November 17, Friday	   ', 'November 22, Wednesday	   ', 'November 23, Thursday	   ', 'November 27, Monday	   ', 'November 29, Wednesday	   ', 'December 08, Friday	   ', 'December 15, Friday	   ', 'December 21, Thursday	   ']
  },
  {
      name: 'Annanprashan Muhurat 2023',
      list: ['4 January 2023, Wednesday      ', 'January 12, 2023, Thursday  	', '23 January 2023, Monday   	', '26 January 2023, Thursday  	', '27 January 2023, Friday  	', '3 February 2023, Friday   	', '10 February 2023, Friday   	', '22 February 2023, Wednesday 	', '24 February 2023, Friday 	', '9 March 2023, Thursday 	', '10 March 2023, Friday 		', '23 March 2023, Thursday  	', '24 March 2023, Friday 		', '27 March 2023, Monday 		', '31 March 2023, Friday 		', '6 April 2023, Thursday		', '7 April 2023, Friday		', '10 April 2023, Monday		', 'April 24, 2023, Monday		', 'April 26, 2023,Wednesday	', '27 April 2023,Thursday		', '3 May 2023, Wednesday 		', '12 May, 2023, Friday 		', '17 May, 2023, Wednesday   	', '22 May 2023, Monday   		', '24 May 2023, Wednesday 	', '29 May 2023, Monday  		', '1 June 2023, Thursday  	', '8 June 2023, Thursday 		', '19 June 2023, Monday 		', '21 June 2023, Wednesday  	', '28 June 2023, Wednesday 	', '5 July 2023, Wednesday 	', '7 July 2023, Friday  		', '14 July 2023, Friday 		', '21 August 2023, Monday  	', '23 August 2023, Wednesday 	', '28 August 2023, Monday 	', '1 September 2023, Friday      	', '4 September 2023, Monday 	', '6 September 2023, Wednesday 	', '18 September 2023, Monday   	', '21 September 2023, Thursday 	', '25 September 2023, Monday 	', '27 September, 2023, Wednesday 	', '16 October 2023, Monday 	', '23 October 2023, Monday   	', '26 October 2023, Thursday  	', '10 November 2023, Friday 	', '22 November 2023, Wednesday 	', '24 November 2023, Friday  	', '27 November 2023, Monday 	', '29 November 2023, Wednesday	', '1 December 2023, Friday   	', '7 December 2023, Thursday 	', '15 December 2023, Friday  	', '18 December 20 23, Monday 	', '21 December 2023, Thursday 	', '22 December 2023, Friday 	', '28 December 2023, Thursday 	', '29 December 2023, Friday       ']
  }

]