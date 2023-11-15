import React from 'react';
import { useCountUp } from 'react-countup';
import SatisfyCoustomers from '../images/newImg/value.png'
import SatisfyFeedback from '../images/newImg/comment.png'
import PaymentSatisfy from '../images/newImg/privacy.png'
import { useTranslation } from 'react-i18next';

const CompleteHook = () => {
  const [t]=useTranslation();
  const countUpRef = React.useRef(null);
  const countUpRef1 = React.useRef(null);
  const countUpRef2 = React.useRef(null);
  const { start3 } = useCountUp({
    ref: countUpRef,
    start: 2000,
    end: 4000,
    delay: 15,
    duration: 10,
  });
  const { start1 } = useCountUp({
    ref: countUpRef1,
    start: 500,
    end: 1500,
    delay: 15,
    duration: 5,
  });
  const { start2 } = useCountUp({
    ref: countUpRef2,
    start: 2200,
    end: 4500,
    delay: 15,
    duration: 5,
  });
  return (
    <div className="comntainer-fluid">
        <div className="CounterOuter">
            <div className="row">
                <div className="col-md-4">
                    <div className="counterOne">
                      <img src={SatisfyCoustomers} alt="Satisfy Customers" width="40px" />
                      <h6 className="mb-3 mt-1"> {t('Happy_Users')} </h6>
                        <div className="d-flex_Align"> 
                            <h3 ref={countUpRef}></h3>
                            <h3>K</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="counterOne">
                        <img src={SatisfyFeedback} alt="Satisfy Feedback" width="40px"/>
                        <h6 className="mb-3 mt-1"> {t('Users_Feedback')} </h6>
                        <div className="d-flex_Align"> 
                            <h3 ref={countUpRef1}></h3>
                            <h3>K</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="counterOne">
                        <img src={PaymentSatisfy} alt="Payment Satisfy" width="40px" />
                        <h6 className="mb-3 mt-1"> {t('Payment_Satisfaction')} </h6>
                        <div className="d-flex_Align"> 
                            <h3 ref={countUpRef2}></h3>
                            <h3>K</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      {/* <div ref={countUpRef}/> */}
    </div>
  );
};
export default CompleteHook;