import React from 'react'
import Chat_Talk_Header from "../../common/Chat&Talk_Header";
import PageBanner from "../../common/pageBanner";
import Header from "../../common/Header2";
import Footer from "../../common/Footer";
import { withTranslation } from 'react-i18next';
import { compose } from 'redux'
import AboutBanner from '../../images/readmorebanner.png'
import Blogbanner from '../../images/pexels-rdne-stock-project-6806402.jpg'
import { FRONTEND_NAME } from '../../configuration/constants';
import { BlogData, ScrollTop } from '../../configuration/commonFunctions'

function blogs(props) {

    const { t } = props;

    console.log(props);

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
            <PageBanner Banner={''} title={t('blogs')} />

            <div className="container">
                <div className="bolg_wrapper">
                    <div className="blog_inner_wrapper">
                        {BlogData.map(item => {
                            var url = item.title;
                            url = url.replace(/\s+/g, '-')
                            return (
                                <div className="bolg_card" onClick={() => {
                                    ScrollTop(0);
                                    props.history.push(FRONTEND_NAME + '/articles/' + url)
                                }}>
                                    <div className="blog_img">
                                        <img src={item.banner} alt="blog" width="100%" />
                                    </div>
                                    <div className="blog_details">
                                        <div className="blog_head_contaner">
                                            <p className="blog_head">{item.title.substring(0, 100)} </p>
                                        </div>
                                        <div className="blog_author_container">
                                            <p> astroking </p>
                                            <p> {item.date}</p>
                                            {/* <p> Leave A Comment </p> */}
                                        </div>
                                        <p>{item.disc.substring(0, 200)} <button className="btn readmorebtn"> Read more...</button></p>
                                    </div>
                                </div>
                            )
                        })}

                    </div>

                    {/* <div className="blog_cat_container">

                    </div> */}

                </div>
            </div>
            <Footer history={props} />
        </>
    )
}


const withCombine = compose(
    withTranslation()
)

export default withCombine(blogs);