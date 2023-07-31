import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './Specialty.scss';
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

class Specialty extends Component {

    render() {

        return (
            <>
                <div className='fit-height-width'>
                    <div className='section-shared'>
                        <div className='section-container'>
                            <div className='section-header'>
                                <div className='section-title'>Popular specialties</div>
                                <button>VIEW MORE...</button>
                            </div>
                            <div className='section-body'>
                                <Slider {...this.props.settings}>
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