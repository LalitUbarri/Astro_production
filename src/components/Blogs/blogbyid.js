import React from 'react'
import Header from "../../common/Header2";
import Footer from "../../common/Footer";
import Chat_Talk_Header from "../../common/Chat&Talk_Header";
import { BlogData } from '../../configuration/commonFunctions'
import { useParams } from 'react-router-dom'
import { withTranslation } from 'react-i18next';
import { compose } from 'redux'


function Blogbyid(props) {
    const param = useParams();
    const { t } = props;

    console.log(param);

    var data = BlogData.map(item => {
        var title = item.title
        title = title.replace(/\s+/g, '-')
        console.log(title);
        if (title === param.id) {
            return (
                <div className="blogs_content text-justify" key={item.id}>
                    <div className="blogs_head text-left">
                        <h3><strong> {item.title}</strong></h3>
                        <p></p>
                        <img src={item.bannerImg} alt={item.title} width='100%' />
                        <p></p>
                    </div>
                    {item.text}

                </div>
            )
        }
    })
    return (
        <>
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
                title={t('blogs')}
            />
            <Header
                IsActive_header_Or_not="chat_and_talk_header-"
            />
            <div className="container">
                <div className="bolg_wrapper">
                    {/* <div className="blogs_content">
                        <div className="blogs_head text-left">
                            <h3> asjhd iuasjhf khdfl KA disk f</h3>
                            <p></p>
                            <img src={banner} alt="" width='100%' />
                        </div>

                    </div> */}
                    {data}
                </div>
            </div>
            <Footer history={props} />
        </>
    )
}

const withCombine = compose(
    withTranslation()
)

export default withCombine(Blogbyid);