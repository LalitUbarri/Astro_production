import React, { useState } from 'react';
// import PageHeader from "../../common/PageHeader";
import Footer from "../../common/Footer";
import { FRONTEND_NAME } from "../../configuration/constants";
import {VratCalender} from '../../configuration/commonFunctions'
import Header2 from "../../common/Header2";

import Chat_Talk_Header from "../../common/Chat&Talk_Header";
import PageBanner from "../../common/pageBanner";
import {useHistory} from 'react-router-dom';
 
export default function VratCalenders(props) {
    const history = useHistory();
    // const [state, setState] = useState({});



    
    return <>
        <Chat_Talk_Header
            IsNavIconTrue={false}
            IsSearchTrue={true}
            IsFilterTrue={true}
            IsTitleTrue={true}
            propsData={props}
            title={'Vrat Calender'}
        />
        <Header2 IsActive_header_Or_not="chat_and_talk_header-" />
        <PageBanner Banner={''} title={'Vrat Calender'} broadcom={"home/vrat calender"} />
        <div className='container'>
            <div className='d-flex justify-content-center flex-wrap mt-5'>
                <h3> Want to know the dates and significance of Vrat in 2023 </h3>
                <p>The Hindu calendar comprises a list of festivals, events, and fasts that occur throughout the year. Most of these fasts or vratas are determined based on the position of the Sun and the Moon. The Hindu calendar for 2023 primarily relies on the Lunisolar calendar. Additionally, Hindu festivals and vrats for 2023 are also influenced by geographical location, resulting in variations from one place to another.</p>

                <p>The Hindu calendar is also referred to as the Hindu Vrat or Tyohar calendar. Below is the list of all vrats according to the Hindu calendar for 2023. Some of these vrats are observed to honor deities, while many are associated with mythological significance. The Hindu calendar does not have fixed dates for festivals and occasions. However, this does not apply to all festivals, occasions, or vrats. While some festivals and fasts are determined by the occurrence of the full moon, others vary depending on changes in the Moon's phases, such as Pradosh, Ekadashi, and so on.</p>
            </div>
            <div className='d-flex column-gap-30 flex-wrap mt-5'>
                {
                    VratCalender.map(item => {
                        return <div class="card vart_card" key={item.id} onClick={()=> history.push(FRONTEND_NAME + '/vrat-calender/'+ item.monthName)}>
                        <div class="card-body">
                            <h5 class="card-title">{item.monthName}</h5>
                            <p class="card-text">Want to know the significance of Vrat in {item.monthName}</p>
                            <button class="btn btn-bg d-flex align-items-center">Read More &nbsp;&nbsp;&nbsp;<i class="bi bi-arrow-right fa-5"></i></button>
                        </div>
                    </div>
                    })
                }
                
                
            </div>
        </div>

        <Footer history={props} />
    </>
}