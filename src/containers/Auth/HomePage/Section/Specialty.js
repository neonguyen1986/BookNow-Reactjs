import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';

// Import slider files
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import pediatrics from '../../../../assets/img-specialty/pediatrics.jpg'
import cardiology from '../../../../assets/img-specialty/cardiology.jpg'
import gastroenterology from '../../../../assets/img-specialty/gastroenterology.jpg'
import otorhinolaryngology from '../../../../assets/img-specialty/otorhinolaryngology.jpg'
import spineDepartment from '../../../../assets/img-specialty/spine-department.jpg'
import gynecological from '../../../../assets/img-specialty/gynecological.jpg'

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
        />
    );
}

class Specialty extends Component {

    render() {
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 2,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        };
        return (
            <>
                <div className='fit-height-width'>
                    <div className='section-specialty'>
                        <div className='specialty-container'>
                            <div className='specialty-header'>
                                <div className='specialty-title'>Popular specialties</div>
                                <button>VIEW MORE...</button>
                            </div>
                            <div className='specialty-body'>
                                <Slider {...settings}>
                                    <div className='img-customize'>
                                        <div className='tempdiv'><img className='image' src={cardiology} /></div>
                                        <div>cardiology/khoa tim mạch</div>
                                    </div>
                                    <div className='img-customize'>
                                        <div className='tempdiv'><img className='image' src={gastroenterology} /></div>
                                        <div>Gastroenterology/khoa tiêu hóa</div>
                                    </div>
                                    <div className='img-customize'>
                                        <div className='tempdiv'><img className='image' src={pediatrics} /></div>
                                        <div>Pediatrics/nhi khoa</div>
                                    </div>
                                    <div className='img-customize'>
                                        <div className='tempdiv'><img className='image' src={otorhinolaryngology} /></div>
                                        <div>otorhinolaryngology/khoa tai mũi họng</div>
                                    </div>
                                    <div className='img-customize'>
                                        <div className='tempdiv'><img className='image' src={spineDepartment} /></div>
                                        <div>spine-department/khoa cột sống</div>
                                    </div>
                                    <div className='img-customize'>
                                        <div className='tempdiv'><img className='image' src={gynecological} /></div>
                                        <div>gynecological/phụ khoa</div>
                                    </div>
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
