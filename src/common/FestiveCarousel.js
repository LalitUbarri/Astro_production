import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import FestiveCarouselDetails from './FestiveCarouselDetails';
import CardReading from '../images/upcomingEvents/Rectangle 84.png';
import LoveCard from '../images/upcomingEvents/Rectangle 81.png'
import { FRONTEND_NAME } from '../configuration/constants';


export default function FestiveCarousel(props) {

    const FestiveCarousel = [
        {
            name: 'One Card Reading',
            description: 'Do you wish to know how your future will be or whether problems in life will be gone or not?',
            img: CardReading,
            // url:props.history.push(FRONTEND_NAME + '/tarot-cards-onecard-tarot')
        },
        {
            name: 'Three Card Reading',
            description: 'Three Card Reading investigates and illuminates factors that improve your luck.',
            img: LoveCard,
            // url:props.history.push(FRONTEND_NAME + '/tarot-cards-onecard-tarot')
        },
        {
            name: 'Love Card Reading',
            description: 'No matter how straightforward or complicated an issue in your romantic.',
            img: CardReading,
            // url:props.history.push(FRONTEND_NAME + '/tarot-cards-onecard-tarot')
        },
        {
            name: 'Yes No Card Reading',
            description: 'Do you want a piece of instant advice or do you wish to know something super quickly?',
            img: LoveCard,
            // url:props.history.push(FRONTEND_NAME + '/tarot-cards-onecard-tarot')
        },
    ]
    //Owl Carousel Settings
    const options = {
        loop: true,
        center: true,
        items: 4,
        margin: 0,
        autoplay: true,
        dots: true,
        autoplayTimeout: 8500,
        smartSpeed: 450,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 3.5
            },
            1600: {
                items: 4
            }
        }
    };
    return (

        <section id="testimonial" className="testimonials pt-70 pb-70">
           
                        <OwlCarousel id="customer-testimonoals" className="owl-carousel owl-theme" {...options}>
                            {

                                FestiveCarousel.map(festiveCarouselDetail => {
                                    return (
                                        <FestiveCarouselDetails festiveCarouselDetail={festiveCarouselDetail} key={festiveCarouselDetail._key} />

                                    )
                                })
                            }
                        </OwlCarousel>
              
        </section>
    );

}
