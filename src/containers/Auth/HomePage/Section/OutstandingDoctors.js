import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './Specialty.scss';
import { FormattedMessage } from 'react-intl';

// Import slider files
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from '../../../../store/actions'
import { LANGUAGE, CommonUtils } from '../../../../utils'

import doctor1 from '../../../../assets/img-doctors/1.pgs-nguyen-thi-hoai-an.jpg'
import doctor2 from '../../../../assets/img-doctors/2.bsnguyen-hung.jpg'
import doctor3 from '../../../../assets/img-doctors/3.bs-tran-huu-loi-yd1.jpg'
import doctor4 from '../../../../assets/img-doctors/4.bs-tran-huu-binh.jpg'
import doctor5 from '../../../../assets/img-doctors/5.thac-si-bac-si-ha-quoc-hung.jpg'
import doctor6 from '../../../../assets/img-doctors/6.bsii-tran-minh-khuyen.jpg'

class OutstandingDoctors extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: []
        }
    }
    componentDidMount() {
        this.props.loadTopDoctors();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            })
        }
    }

    render() {
        let arrDoctors = this.state.arrDoctors;
        let language = this.props.language;
        // console.log('check topDoctorsRedux:', arrDoctors)
        return (
            <>
                <div className='fit-height-width doctors'>
                    <div className='section-shared'>
                        <div className='section-container'>
                            <div className='section-header'>
                                <div className='section-title'><FormattedMessage id='home-page.outstanding-doctor' /></div>
                                <button><FormattedMessage id='home-page.more-info' /></button>
                            </div>
                            <div className='section-body'>
                                <Slider {...this.props.settings}>
                                    {arrDoctors?.length > 0 &&
                                        arrDoctors.map((item, index) => {
                                            let position = language === LANGUAGE.EN ? item.positionData.valueEn : item.positionData.valueVi
                                            let name = language === LANGUAGE.EN ? `${item.firstName} ${item.lastName} ` : `${item.lastName} ${item.firstName} `
                                            return (
                                                <div className='img-customize-doctor' key={index}>
                                                    <div className='tempdiv'><img
                                                        className='image' src={CommonUtils.convertBase64ToBinary(item.image)} /></div>
                                                    <div className='title-name'>
                                                        {position} {name}
                                                        {/* Phó giáo sư, Tiến sĩ, Bác sĩ Nguyễn Thị Hoài An */}
                                                    </div>
                                                    {/* <div>Tai Mũi Họng - Nhi Khoa</div> */}
                                                </div>
                                            )
                                        })}


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
        topDoctorsRedux: state.admin.topDoctors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctors())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctors);
