import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './Specialty.scss';
import { FormattedMessage } from 'react-intl';

// Import slider files
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import cardiology from '../../../../assets/img-specialty/1. cardiology.jpg'
import { getAllSpecialty } from '../../../../services/userService';
import { collapseToast } from 'react-toastify';
import { CommonUtils } from '../../../../utils';

class Specialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allSpecialties: ''
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialty()
        console.log('>>>check data', res)
        if (res?.data?.length > 0) {
            this.setState({
                allSpecialties: res.data
            })
        }
    }
    render() {
        let { allSpecialties } = this.state;
        console.log('>>>>>check state from Specialty:', this.state)
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
                                    {allSpecialties?.length > 0 &&
                                        allSpecialties.map((item, index) => {
                                            let imgSrc = CommonUtils.convertBase64ToBinary(item.image)
                                            return (
                                                <div key={index} className='img-customize'>
                                                    <div className='tempdiv'><img className='image' src={imgSrc} /></div>
                                                    <div><b>{item.name}</b></div>
                                                </div>
                                            )
                                        })
                                    }
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
