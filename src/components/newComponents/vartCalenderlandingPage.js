import React, { useEffect, useState } from 'react';
// import PageHeader from "../../common/PageHeader";
import Footer from "../../common/Footer";
// import { FRONTEND_NAME } from "../../configuration/constants";
import { VratCalender } from '../../configuration/commonFunctions'
import Header2 from "../../common/Header2";
import Chat_Talk_Header from "../../common/Chat&Talk_Header";
import PageBanner from "../../common/pageBanner";

export default function VratCalenderLanding(props) {
    const [state, setState] = useState({});
    console.log(props);

    useEffect(() => {
        var filterData = VratCalender;
        var ss = filterData.find(item => item.monthName === props.match.params.name);
        setState({
            ...state,
            monthData:ss
        })

    },[])

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
        <PageBanner Banner={''} title={'Vrat Calender for ' + props.match.params.name} broadcom={"home/vrat calender/" +props.match.params.name } />
        <div className='container'>
            <div className='d-flex column-gap-30 flex-wrap mt-5'>
                {
                    state.monthData && state.monthData.vart.map((item, i) => {
                        console.log(item);
                        return <div class="card vart_card" key={i}>
                            <div class="card-body">
                                <h5 class="card-title"><strong>{item.vartName}</strong></h5>
                                <p class="card-text text-secondary">{item.vartDate}</p>
                                <p class="card-text">{item.vartDisc}</p>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>

        <Footer history={props} />
    </>
}