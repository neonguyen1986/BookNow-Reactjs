import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './Specialty.scss';
import { FormattedMessage } from 'react-intl';

// Import slider files
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class About extends Component {

    render() {

        return (
            <>
                <div className='fit-height-width about-section'>
                    <div className='about-footer'>
                        What people say about Bookingcare
                    </div>
                    <div className='about-footer-content'>
                        <div className='left-content'>
                            <iframe width="100%" height="400px" src="https://www.youtube.com/embed/ViFYbu_u4j0" title="MÀN RA MẮT CÀN QUÉT NƯỚC MỸ - VÌ MESSI &quot;OUT TRÌNH&quot; HAY MLS QUÁ TỆ?" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        </div>
                        <div className='right-content'>
                            Good specialist, information was authentic, many patients believe, colleagues appreciated, respected in the industry. Already, working in leading hospitals in Hanoi.
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

