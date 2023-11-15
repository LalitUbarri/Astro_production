import React from "react";
import { withRouter } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "jquery/dist/jquery.min";
import "../styles/about.css";
import Header from "../common/Header2";
import PageBanner from "../common/pageBanner";
import { withTranslation } from 'react-i18next';
import { compose } from 'redux'
import Chat_Talk_Header from "../common/Chat&Talk_Header";


class PrivacyPolicy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: null,
      policyData: {},
      loginSelected: true,
    };
  }


  render() {

    return (
      <div className="ios_privacy_policy_container1">
        <Chat_Talk_Header
          IsNavIconTrue={false}
          IsSearchTrue={false}
          IsFilterTrue={false}
          propsData={this.props}
          CustomClass={true}
          IsTitleTrue={true}
          title={this.props.t('IOS Privacy Policy')}
          redirection={'/ios/privacyPolicy'}

        />
        {/* <Header
          IsActive_header_Or_not="chat_and_talk_header-"
          openLoginPopup={this.openLoginPopup}
          openSignupPopup={this.openSignupPopup}
          isLogin={this.state.loginSelected}
        /> */}
        <div className="mt-3">
        <PageBanner title={this.props.t('iOS Privacy Policy')} Banner={''} /></div>
        <div className="container">
          <div className="row page-body privacy_container ios_privacy_policy_container">
            <div className="col-sm-12 col-md-12 col-lg-12 float-left padd-0 text-justify mb-4 ">
              <h2 className="mt-5">
                <strong>{'Privacy Policy'}</strong>
              </h2>
              <p> astroking ("us", "we", or "our") operates //com.astroking (the "iOS App"). This page informs you of our policies regarding the collection, use, and disclosure of Personal Information we receive from users of the Site.</p>

              <p>We use your Personal Information only to provide and improve the App. By using the App, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, accessible at //com. astroking</p>

              <p>At astroking, we prioritize the privacy and security of our users' personal information. We are committed to ensuring the confidentiality of your information and complying with applicable privacy laws. </p>

              <h2 className="mt-5">
                <strong>{'Information We Collect:'}</strong>
              </h2>

              <p><strong>1. Personal Information:</strong>  When you sign up for astroking, we may collect personal information such as your name, email address, contact number, and other relevant details necessary for registration and course enrollment.</p>

              <p><strong>2. Usage Data:</strong> We collect information on how you interact with our app, including your course progress, module completion, session duration, and other usage-related data.</p>

              <p><strong>3. Device Information:</strong> We may collect device-specific information, such as your device type, operating system, unique device identifiers, IP address, and mobile network information, to ensure optimal app performance and enhance your user experience.</p>

              <p><strong> 4. Payment Information:</strong> If you choose to avail yourself of paid services, we may collect payment details to process transactions securely. However, we do not store your payment information. It is handled by our trusted third-party payment processors.</p>

              <h2 className="mt-5">
                <strong>{'How We Use Your Information:'}</strong>
              </h2>

              <p><strong>1. To Provide Services:</strong> We use your information to deliver our courses, facilitate your learning experience, and offer personalized support.</p>

              <p><strong>2. Communication:</strong> We may send you administrative emails, course updates, promotional offers, and other relevant communications to keep you informed about our services.</p>
              <p><strong>3. Personalization:</strong> We may analyze your usage data to personalize your learning experience, recommend relevant courses, and improve our app's features and content.</p>

              <p><strong>4. Security and Fraud Prevention: </strong> We employ measures to ensure the security and integrity of our app, including the detection and prevention of fraudulent activities or unauthorized access.</p>

              <h2 className="mt-5">
                <strong>{'Data Sharing and Disclosure:'}</strong>
              </h2>

              <p><strong>1. Third-Party Service Providers:</strong> We may engage trusted third-party service providers to assist us in delivering our services. These providers are bound by strict confidentiality agreements and are authorized to use your information solely to assist us.</p>

              <p><strong>2. Legal Requirements: </strong> We may disclose your information if required by law, or government authorities, or to protect our rights, safety, or property.</p>

              <p><strong>3. Aggregated and Anonymized Data: </strong> We may share aggregated and anonymized data for statistical analysis, research, or marketing purposes.</p>

              <h2 className="mt-5">
                <strong>{'Data Deletion and Data Archiving:'}</strong>
              </h2>

              <p><strong>This section outlines how we handle data deletion and data archiving on user requests. We are committed to protecting your privacy and ensuring that your personal information is handled responsibly. By using our Astrology Services, you agree to the terms outlined in this policy.</strong></p>

              <p><strong>1. Data Deletion:</strong> Upon your request, we will promptly delete your personal data from our systems. This process involves the permanent removal of all identifiable information associated with your account, ensuring that your data is no longer accessible or retrievable. Please note that certain non-personal and aggregated data may be retained for analytical purposes, but this data will not be linked to your individual identity.</p>

              <p><strong>2. Data Archiving:</strong> In certain cases, you may request that your data be archived instead of deleted. Archiving involves securely storing your personal data in an isolated environment, ensuring that it is not actively used but can be retrieved if necessary. This may be relevant if you intend to reactivate your account in the future or if legal and regulatory requirements necessitate data retention.</p>

              <p><strong>3. User Request Process:</strong> To initiate a data deletion or archiving request, please follow these steps:Contact Information: Send an email to our designated privacy contact at  <strong> <a href="mailto:astrologytell@gmail.com">astrologytell@gmail.com </a></strong> from the email address associated with your account.</p>
              <ul>
                <p><strong>Subject Line:</strong> Use the subject line "Data Deletion/Archiving Request.</p>

                <p><strong>Request Details:</strong> In the body of the email, clearly state whether you are requesting data deletion or data archiving. Please include your full name and any relevant account details to expedite the process.</p>

                <p><strong>Verification:</strong> To protect your privacy, we may need to verify your identity before processing your request. Our privacy contact may ask you to provide additional information for verification purposes.</p>
              </ul>

              <p><strong>4. Timeframe:</strong> We will process your data deletion or archiving request within 14 business days from the date of your email. Please note that some residual data may remain in our backups for a limited period after deletion or archiving. However, this data will not be actively used or accessible.</p>
              <ul>
                <p><strong>Data Security:</strong> We implement industry-standard security measures to protect your information from unauthorized access, loss, misuse, or alteration. However, no data transmission or storage can be guaranteed to be 100% secure. Therefore, while we strive to protect your data, we cannot guarantee its absolute security.</p>

                <p><strong>Retention of Personal Information:</strong> We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.</p>

                <p><strong>Your Rights:</strong> You have the right to access, correct, update, or delete your personal information. You may also have the right to restrict or object to specific data processing activities. To exercise these rights or inquire about your information, please contact us using the details provided below.</p>

                <p><strong>Changes to this Privacy Policy:</strong> We reserve the right to modify or update this Privacy Policy from time to time. We will notify you of any material changes through our app or other means. It is recommended to review this Privacy Policy periodically for any updates.</p>

                <p><strong>Contact Us:</strong> If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at <strong><a href='mailto:astrologytell@gmail.com'>astrologytell@gmail.com</a></strong>.</p>

                <p>By continuing to use astroking, you acknowledge that you have read and understood this Privacy Policy and consent to the collection, use, and disclosure of your information as described herein.</p>

              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const withCombine = compose(
  withRouter,
  withTranslation()
)

export default withCombine(PrivacyPolicy);
