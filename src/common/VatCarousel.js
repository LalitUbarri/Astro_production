import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Button } from 'bootstrap';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import VatCarouselDetails from './VatCarouselDetails';
import CardReading from '../images/upcomingEvents/Rectangle 84.png';
import LoveCard from '../images/upcomingEvents/Rectangle 81.png'


export default function VatCarousel(props) {

    const VatCarousel = [
        {
            name: 'Kalashtami',
            description: 'Saturday, June 10-2023 Paksha : Krishna Tithi : Astami',
            img: CardReading
        },
        {
            name: 'Three Card Reading',
            description: 'Three Card Reading investigates and illuminates factors that improve your luck.',
            img: LoveCard
        },
        {
            name: 'Love Card Reading',
            description: 'No matter how straightforward or complicated an issue in your romantic.',
            img: CardReading
        },
        {
            name: 'Yes No Card Reading',
            description: 'Do you want a piece of instant advice or do you wish to know something super quickly?',
            img: LoveCard
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
                items: 1
            },
            1000: {
                items: 1
            },
            1600: {
                items: 1
            }
        }
    };
    return (

        <section id="testimonial" className="testimonials pt-70 pb-70">
           
                        <OwlCarousel id="customer-testimonoals" className="owl-carousel owl-theme" {...options}>
                            {

                                VatCarousel.map(vatCarouselDetail => {
                                    return (
                                        <VatCarouselDetails vatCarouselDetail={vatCarouselDetail} key={vatCarouselDetail._key} />

                                    )
                                })
                            }
                        </OwlCarousel>
              
        </section>
    );

}
