import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './Specialty.scss';
import { FormattedMessage } from 'react-intl';
import aboutImg from '../../../../assets/about.jpg'
import '../../HomePage/HomePage.scss'


class About extends Component {

    render() {

        return (
            <>
                <div className='fit-height-width about-section'>
                    <div className='about-footer'>
                        Book Now offers an efficient way to access top-notch medical services
                    </div>
                    <div className='about-footer-content'>
                        <div className='afc-left-content'>
                            <img className='afc-left-img' src={aboutImg} />
                        </div>
                        <div className='afc-right-content'>
                            Our platform connects you with skilled doctors across various specialties, ensuring you receive the care you need. Whether it's a routine check-up or a specialized consultation, our user-friendly interface makes booking appointments a breeze. With a wide range of available time slots, you can choose what suits your schedule best. Our dedicated professionals are committed to providing personalized care, addressing your concerns, and guiding you towards better health. Experience the convenience of modern healthcare by booking a doctor through us. Your well-being is our priority.
                        </div>
                    </div>
                </div>
            </>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(About)

