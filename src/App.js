import React, { Suspense, lazy,useState,useEffect } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import "./styles/style.css";
// import $ from "jquery";
// import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { FRONTEND_NAME } from "./configuration/constants";
import { useSelector } from 'react-redux'
import CartOrder from "./components/cartOrder";
import { ScrollTop } from "./configuration/commonFunctions";
// import VratCalenderLanding from "./components/newComponents/vartCalenderlandingPage";

// const CartOrder = lazy(() => import('./components/cartOrder'))
const About = lazy(() => import("./components/about"));
const AstroMall = lazy(() => import("./components/astroMall"));
const Talk = lazy(() => import("./components/talk"));
const Form = lazy(() => import("./components/Form"));
const PanditProfile = lazy(() => import("./components/Profile"));
const Profile = lazy(() => import("./components/profileNew"))
const Notification = lazy(() => import("./components/Notification"))
const WalletTransactions = lazy(() => import("./components/WalletTransactions"))
const AstrologyNews = lazy(() => import("./components/AstrologyNews"))
const astrologyStore = lazy(() => import("./components/astrologyStore"))
const PoojaList = lazy(() => import("./components/poojaList"))
const AddToCart = lazy(() => import("./components/addToCart"))
// const CartOrder = asyncComponent(() => import("./components/cartOrder"))
const OrderHistoryChat = lazy(() => import("./components/orderHistoryChat"))
const ViewHistory = lazy(() => import("./components/viewHistory"))
const TC = lazy(() => import("./components/TC"))
const PrivacyPolicy = lazy(() => import("./components/privacyPolicy"))
const PricingPolicy = lazy(() => import("./components/pricingPolicy"))
const RefundPolicy = lazy(() => import("./components/refundPolicy"))
const Disclaimer = lazy(() => import("./components/disclaimer"))
const Chat = lazy(() => import("./components/chat"))
const Report = lazy(() => import("./components/report"))
const DailyHoroscope = lazy(() => import("./components/DailyHoroscope"))
const OurStory = lazy(() => import("./components/ourStory"))
const otp = lazy(() => import("./components/otp"))
const PaymentInfo = lazy(() => import("./components/paymentInfo"))
const ApplyingVoucherCode = lazy(() => import("./components/applyingVoucherCode"))
const ReportForm = lazy(() => import("./components/reportForm"))
const SocketChat = lazy(() => import("./components/socketchatAstrology"))
const HomePage = lazy(() => import("./components/home"))
const Premium = lazy(() => import("./components/premium"))
const BookSlot = lazy(() => import("./components/bookslot"))
const Kundali = lazy(() => import("./components/Kundali"))
const KundaliForm = lazy(() => import("./components/KundaliForm"))
const MatchingForm = lazy(() => import("./components/matchingForm"))
const ReportRender = lazy(() => import("./components/reportRenderHTML"))
const FreeSession = lazy(() => import("./components/FreeSession"))
const Payment = lazy(() => import("./razorpay/payment"))
const GetVastu = lazy(() => import("./components/GetVastu"))
const poojaDetails = lazy(() => import("./components/poojaDetails"))
const poojaVideo = lazy(() => import("./components/poojaVideo"))
const ThankYou_page = lazy(() => import("./components/thankyou_page"))
const payment_faild = lazy(() => import("./components/payment_faild"))
const LandingPage = lazy(() => import("./components/prodductLandingPage"))
const ProductDetalis = lazy(() => import("./components/productDetails"))
const Getkundali = lazy(() => import("./components/Getkundali"))
const ProductPaymentSummary = lazy(() => import("./components/productslanding/productPaymentSummary"))
const PageNotFound = lazy(() => import("./common/PageNotFound"))
const Videos = lazy(() => import("./components/videos"))
const Feedback = lazy(() => import("./components/feedback"))
const Blogs = lazy(() => import("./components/Blogs/blogs"))
const Blogbyid = lazy(() => import("./components/Blogs/blogbyid"))
const Marriage = lazy(() => import("./components/Marriage"))
const Business = lazy(() => import("./components/Business"))
const Career = lazy(() => import("./components/Career"))
const CourtLegalIssues = lazy(() => import("./components/CourtLegalIssues"))
const DelayInMarriage = lazy(() => import("./components/DelayInMarriage"))
const FaceReading = lazy(() => import("./components/FaceReading"))
const Jiouser = lazy(() => import("./components/productslanding/Jiouser"))
const RedirectPage = lazy(() => import("./components/redirectPage"))
const PalmReading = lazy(() => import("./components/PalmReading"))
const FestivalCalender = lazy(() => import("./components/FestivalCalender"))
const ShubhMuhuratToday = lazy(() => import("./components/ShubhMuhurat"))
const weeklyHoroscope = lazy(() => import("./components/weeklyHoroscope"))
const Yearlyhoroscope = lazy(() => import("./components/Yearlyhoroscope"))
const horoscope_single_page = lazy(() => import("./components/horoscope_single_page"))
const UpcomingFestivals = lazy(() => import("./components/upcomingFestives"))
const OneCardTarot = lazy(() => import("./components/oneCardTarot"))
const PlanetryTransits = lazy(() => import("./components/planetryTransits"))
const VatPurnima = lazy(() => import("./components/VatPurnima"))
const Mangaldosh = lazy(() => import("./components/Mangaldosh"))
const Kalsharpdosh = lazy(() => import("./components/Kalsharpdosh"))
const monthlyHoroscope = lazy(() => import("./components/MonthlyHoroscope"))
const MatchingDetails = lazy(() => import("./components/matchingDetails"))
const home = lazy(() => import("./components/home"))
const BirthdayForcast = lazy(() => import("./components/birthdayForecast"));
const Points = lazy(() => import("./components/points"));
const FreeRemedy = lazy(() => import("./components/FreeRemedy"));
const PsychologistPanel = lazy(() => import("./components/PsychologistPanel"));
const BrihatHoroscope = lazy(() => import("./components/BrihatHoroscope"));
const IOSPricingPolicy = lazy(() => import("./components/IOSPrivacyPolicy"));
const Evoucher = lazy(() => import("./components/newComponents/e-voucher"));
const AuraReading = lazy(() => import('./components/newComponents/AuraReading'));
const kundaliReading = lazy(() => import('./components/newComponents/kundaliReading'));
const IosSupport = lazy(() => import('./components/newComponents/iosSupport'));
const ChatSys = lazy(() => import('./components/socketchatAstrologycopy'));
const VratCalender = lazy(() => import("./components/newComponents/VratCalender"));
const VratCalenderLanding = lazy(() => import('./components/newComponents/vartCalenderlandingPage'));



function App() {
	// const dispatch = useDispatch();
	const freesession = useSelector(state => state.freeSession.IsfreeSession);
	var isUserLoggedIn = localStorage['isUserLoggedIn'];
	const [pageYOffset1, setPageYOffset] = useState(0);
	useEffect(() => {
		var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		if(timeZone === 'Asia/Calcutta'){
			localStorage.setItem("selectedCountryCode", 91);
		}else{
			if(isUserLoggedIn){
				localStorage.setItem("selectedCountryCode",localStorage['selectedCountryCode']);
			}else localStorage.setItem("selectedCountryCode", 1);
		};
	},[])

	useEffect(() => {
		// window.scrollBy(0, 0);
		// setPageYOffset(window.pageYOffset);
		window.scrollBy(0, 0);
		// alert("pageXOffset: " + window.pageXOffset + ", pageYOffset: " + window.pageYOffset);
		setPageYOffset(window.pageYOffset);
		console.log(window.pageYOffset);
	})

	return (
		<div className="App">
			<BrowserRouter>
			<Suspense fallback={<div style={{display:'flex', alignItems:'center',height:'100vh', justifyContent:'center'}}> <h2> Loading...</h2></div>}>
				<Route path={FRONTEND_NAME + "/"} exact component={HomePage}></Route>
				<Route path={FRONTEND_NAME + "/home"} exact component={HomePage}></Route>
				<Route path={FRONTEND_NAME + "/about"} component={About}></Route>
				<Route path={FRONTEND_NAME + "/redirectPage"} component={RedirectPage}></Route>
				<Route
					path={FRONTEND_NAME + "/astroMall"}
					component={AstroMall}
				></Route>
				<Route path={FRONTEND_NAME + "/talk/:cateName?"} component={Talk}></Route>
				<Route path={FRONTEND_NAME + "/premium"} component={Premium}></Route>
				{/* <Route path={FRONTEND_NAME + "/kundali"} component={Kundali}></Route> */}
				<Route path={FRONTEND_NAME + "/kundali"} component={KundaliForm}></Route>
				<Route path={FRONTEND_NAME + "/matching"} component={MatchingForm}></Route>
				<Route path={FRONTEND_NAME + "/reportrender"} component={ReportRender}></Route>
				<Route path={FRONTEND_NAME + "/matchingdetails"} component={MatchingDetails}></Route>
				<Route path={FRONTEND_NAME + "/kundalidetails"} component={Kundali}></Route>
				<Route path={FRONTEND_NAME + "/bookslot"} component={BookSlot}></Route>
				<Route path={FRONTEND_NAME + "/form"} component={Form}></Route>
				<Route path={FRONTEND_NAME + "/reportForm"} component={ReportForm}></Route>
				<Route path={FRONTEND_NAME + "/recharge"} component={ApplyingVoucherCode}></Route>

				<Route path={FRONTEND_NAME + "/pooja"} component={PoojaList}></Route>
				<Route path={FRONTEND_NAME + "/poojadetails"} component={poojaDetails}></Route>
				<Route path={FRONTEND_NAME + "/playpooja"} component={poojaVideo}></Route>

				<Route path={FRONTEND_NAME + "/payment"} component={Payment}></Route>
				<Route path={FRONTEND_NAME + "/personalized-kundali/:id?/:title?"} component={LandingPage}></Route>
				<Route path={FRONTEND_NAME + "/customerdetails"} component={ProductDetalis}></Route>
				<Route path={FRONTEND_NAME + "/getkundali"} component={Getkundali}></Route>
				<Route path={FRONTEND_NAME + "/paymentinfo"} component={ProductPaymentSummary}></Route>
				<Route path={FRONTEND_NAME + "/Jiouser/:msisdn?"} component={Jiouser}></Route>
				{/* <Route path={FRONTEND_NAME + "/test"} component={Test}></Route> */}
				<Route path={FRONTEND_NAME + "/videos"} component={Videos}></Route>
				<Route path={FRONTEND_NAME + "/feedback/:txid?"} component={Feedback}></Route>
				<Route path={FRONTEND_NAME + "/article"} component={Blogs}></Route>
				<Route path={FRONTEND_NAME + "/articles/:id?/:title?"} component={Blogbyid}></Route>
				<Route path={FRONTEND_NAME + "/e-vouchers"} component={Evoucher}></Route>
				<Route path={FRONTEND_NAME + "/aura-reading-astrology"} component={AuraReading}></Route>
				<Route path={FRONTEND_NAME + "/kundali-reading-astrology"} component={kundaliReading}></Route>
				<Route path={FRONTEND_NAME + "/vrat-calender-astrology"} component={VratCalender}></Route>
				<Route path={FRONTEND_NAME + "/vrat-calender/:name?"} component={VratCalenderLanding}></Route>
				<Route
					path={FRONTEND_NAME + "/panditProfile"}
					component={PanditProfile}
				></Route>
				<Route
					path={FRONTEND_NAME + "/profile"}
					component={Profile}
				></Route>

				<Route
					path={FRONTEND_NAME + "/paymentInfo"}
					component={PaymentInfo}
				></Route>
				<Route
					path={FRONTEND_NAME + "/notification"}
					component={Notification}
				></Route>
				<Route
					path={FRONTEND_NAME + "/wt"}
					component={WalletTransactions}
				></Route>
				<Route
					path={FRONTEND_NAME + "/ourStory"}
					component={OurStory}
				></Route>

				<Route
					path={FRONTEND_NAME + "/astrologynews"}
					component={AstrologyNews}
				></Route>
				<Route
					path={FRONTEND_NAME + "/vastu"}
					component={GetVastu}
				></Route>

				{
					freesession ? <Route
						path={FRONTEND_NAME + "/freesession"}
						component={FreeSession}
					></Route> : typeof localStorage['isJioUser'] === undefined ? <Route
						path={FRONTEND_NAME + "/home"}
						component={home}
					></Route> : <Route
						path={FRONTEND_NAME + "/freesession"}
						component={FreeSession}
					></Route>
				}

				<Route
					path={FRONTEND_NAME + "/report"}
					component={Report}
				></Route>
				<Route
					path={FRONTEND_NAME + "/disclaimer"}
					component={Disclaimer}
				></Route>
				<Route
					path={FRONTEND_NAME + "/terms"}
					component={TC}
				></Route>
				<Route
					path={FRONTEND_NAME + "/privacyPolicy"}
					component={PrivacyPolicy}
				></Route>
				<Route
					path={FRONTEND_NAME + "/ios/privacyPolicy"}
					component={IOSPricingPolicy}
				></Route>
				<Route
					path={FRONTEND_NAME + "/ios/support"}
					component={IosSupport}
				></Route>
				<Route
					path={FRONTEND_NAME + "/pricingPolicy"}
					component={PricingPolicy}
				></Route>
				
				<Route
					path={FRONTEND_NAME + "/refundPolicy"}
					component={RefundPolicy}
				></Route>
				<Route
					path={FRONTEND_NAME + "/chatList/:cateName?"}
					component={Chat}
				></Route>
				<Route
					path={FRONTEND_NAME + "/chatForm/:type?"}
					component={Form}
				></Route>
				{/* <Route path={FRONTEND_NAME + "/chat"} component={SocketChat}></Route> */}
				<Route path={FRONTEND_NAME + "/chat"} component={ChatSys}></Route>
				<Route
					path={FRONTEND_NAME + "/astrologyStore"}
					exact
					component={astrologyStore}
				></Route>
				<Route
					path={FRONTEND_NAME + "/otp"}
					exact
					component={otp}
				></Route>
				<Route path={FRONTEND_NAME + "/addToCart"} exact component={AddToCart}></Route>
				<Route path={FRONTEND_NAME + "/cartOrder"} exact component={CartOrder}></Route>
				<Route path={FRONTEND_NAME + "/orderHistory"} exact component={OrderHistoryChat}></Route>
				<Route path={FRONTEND_NAME + "/viewHistory"} component={ViewHistory}></Route>
				<Route path={FRONTEND_NAME + "/horoscope/daily-horoscope/:title?"} component={DailyHoroscope}></Route>
				<Route path={FRONTEND_NAME + "/horoscope/weekly-horoscope/:title?"} component={weeklyHoroscope}></Route>
				<Route path={FRONTEND_NAME + "/horoscope/monthly-horoscope/:title?"} component={monthlyHoroscope}></Route>
				<Route path={FRONTEND_NAME + "/horoscope/yearly-horoscope/:title?"} component={Yearlyhoroscope}></Route>
				<Route path={FRONTEND_NAME + "/horoscopes/:cat?/:title?"} component={horoscope_single_page}></Route>
				{/* <Route path={FRONTEND_NAME + "/planetary-transits-astrology-2023"} component={PlanetaryTransit}></Route> */}
				<Route path={FRONTEND_NAME + "/marriage-astrologer-in-India"} component={Marriage}></Route>
				<Route path={FRONTEND_NAME + "/business-astrology-in-india"} component={Business}></Route>
				<Route path={FRONTEND_NAME + "/career-astrology-in-india"} component={Career}></Route>
				<Route path={FRONTEND_NAME + "/court-case-astrology"} component={CourtLegalIssues}></Route>
				<Route path={FRONTEND_NAME + "/marriage-problems-astrology"} component={DelayInMarriage}></Route>
				{/* <Route path={FRONTEND_NAME + "/face-reading-astrology"} component={FaceReading}></Route> */}
				<Route path={FRONTEND_NAME + "/palm-reading-astrology"} component={PalmReading}></Route>
				<Route path={FRONTEND_NAME + "/festival-calender-astrology"} component={FestivalCalender}></Route>
				<Route path={FRONTEND_NAME + "/shubh-muhurat/:name?"} component={ShubhMuhuratToday}></Route>
				<Route path={FRONTEND_NAME + "/birthday-forecast-astrology"} component={BirthdayForcast}></Route>
				<Route path={FRONTEND_NAME + "/loyalty-points-astrology"} component={Points}></Route>
				<Route path={FRONTEND_NAME + "/free-remedy-astrology"} component={FreeRemedy}></Route>
				<Route path={FRONTEND_NAME + "/psychologist-panel-astrology"} component={PsychologistPanel}></Route>
				<Route path={FRONTEND_NAME + "/brihat-horoscope-astrology"} component={BrihatHoroscope}></Route>

				{/* Arvin  */}
				<Route path={FRONTEND_NAME + "/tarot-cards"} component={UpcomingFestivals}></Route>
				<Route path={FRONTEND_NAME + "/tarot-cards-onecard-tarot"} component={OneCardTarot}></Route>
				<Route path={FRONTEND_NAME + "/planetry-transit-2023"} component={PlanetryTransits}></Route>
				<Route path={FRONTEND_NAME + "/upcoming-festivals-vatpurnima"} component={VatPurnima}></Route>
				<Route path={FRONTEND_NAME + "/mangalik-dosh"} component={Mangaldosh}></Route>
				<Route path={FRONTEND_NAME + "/kaalsharp-dosha"} component={Kalsharpdosh}></Route>
				<Route path={FRONTEND_NAME + "/face-reading-astrology"} component={FaceReading}></Route>
				{/* <Route
			path={FRONTEND_NAME + "/Support"}
			component={Support}
		></Route> */}

				{/* <Route path={FRONTEND_NAME + "/login"} component={Login}></Route> */}
				<Route path={FRONTEND_NAME + "/thankyou"} component={ThankYou_page}></Route>
				<Route path={FRONTEND_NAME + "/paymentfailed"} component={payment_faild}></Route>



				{/* <Route path={FRONTEND_NAME + "/newhome"} component={NewHome}></Route> */}
				{/* <Route path={'*'} component={PageNotFound}></Route> */}
				</Suspense>
			</BrowserRouter>

			{<button className="btn top_btn" onClick={() => ScrollTop(0)}><i class="bi bi-arrow-up-square-fill"></i></button>}
		</div>
	);
}

export default App;

