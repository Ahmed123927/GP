import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import user1 from "../../images/user-1.jpg";
import user2 from "../../images/user-2.jpg";
import user3 from "../../images/user-3.jpg";
import img1 from "../../images/img-1.jpg";
import imageTanya from "../../images/image-tanya.jpg";

export default function HomeSlider() {
    const settings = {
        autoplay: true,
        dots: true,
        infinite: true,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    return (
        <section className='py-5 text-white'>
            <article className="text-center p-5">
                <h2 className="fw-bold fw-bolder main-color">
                    Clients Feedback
                </h2>
                <div className="text-center">
                    <p className="text-center text-black">
                        Here are some of our Feedback. If you
                        have any Comment 
                        Tell us <br />He will implement it in the best way.
                    </p>
                </div>
            </article>

            <Slider {...settings}>
                <div className='p-2 sliderphoto text-bg-light'>
                    <figure className=''>
                        <img className='img-fluid rounded-circle mx-auto d-block' src={user1} alt="slider photo" />
                    </figure>
                    <div className='p-3 text-center'>
                        <h4 className='text-muted'> Frank Johnsony </h4>
                        <h6> Manager for QWR. </h6>
                        <p className='mytext text-center fw-bold fw-bolder'>“ If you want to lay the best foundation possible I’d recommend taking this course. <br />The depth the instructors go into is incredible. I now feel so confident about starting up as a professional developer. <br /> The depth the instructors go into is incredible.”</p>
                    </div>
                </div>

                <div className='p-2 sliderphoto text-bg-light'>
                    <figure className='position-relative'>
                        <img className='img-fluid rounded-circle mx-auto d-block' src={user3} alt="slider photo" />
                    </figure>
                    <div className='p-3 text-center'>
                        <h4 className='text-muted main-color'> Alex Joy </h4>
                        <h6> SEO for Zks. </h6>
                        <p className='mytext text-center fw-bold fw-bolder'>“ If you want to lay the best foundation possible I’d recommend taking this course. <br />The depth the instructors go into is incredible. I now feel so confident about starting up as a professional developer. <br /> The depth the instructors go into is incredible.”</p>
                    </div>
                </div>

                <div className='p-2 sliderphoto text-bg-light'>
                    <figure className='position-relative'>
                        <img className='img-fluid rounded-circle mx-auto d-block' src={user2} alt="slider photo" />
                    </figure>
                    <div className='p-3 text-center'>
                        <h4 className='text-muted '> Elaine Stclair </h4>
                        <h6> Manager for QWR. </h6>
                        <p className='mytext text-center fw-bold fw-bolder'>“ If you want to lay the best foundation possible I’d recommend taking this course. <br /> The depth the instructors go into is incredible. <br /> I now feel so confident about starting up as a professional developer.”</p>
                    </div>
                </div>

                <div className='p-2 sliderphoto text-bg-light'>
                    <figure className='position-relative'>
                        <img className='img-fluid rounded-circle mx-auto d-block' src={img1} alt="slider photo" />
                    </figure>
                    <div className='p-3 text-center'>
                        <h4 className='text-muted'> Wanda Arthur </h4>
                        <h6> Manager for QWR. </h6>
                        <p className='mytext text-center fw-bold fw-bolder'>“ If you want to lay the best foundation possible I’d recommend taking this course. <br />The depth the instructors go into is incredible. I now feel so confident about starting up as a professional developer. <br /> The depth the instructors go into is incredible.”</p>
                    </div>
                </div>

                <div className='p-2 sliderphoto text-bg-light'>
                    <figure className='position-relative'>
                        <img className='img-fluid rounded-circle mx-auto d-block' src={imageTanya} alt="slider photo" />
                    </figure>
                    <div className='p-3 text-center'>
                        <h4 className='text-muted'> Alex Joy </h4>
                        <h6> HR for QWR. </h6>
                        <p className='mytext text-center'>“ If you want to lay the best foundation possible I’d recommend taking this course. <br /> The depth the instructors go into is incredible. <br /> I now feel so confident about starting up as a professional developer. ”</p>
                    </div>
                </div>
            </Slider>
        </section>
    );
}
