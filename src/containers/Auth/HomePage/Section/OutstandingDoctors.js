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
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';

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


    handleViewDetailDoctor = (doctor) => {
        console.log('doctor info:', doctor)
        this.props.history.push(`/detail-doctor/${doctor.id}`)
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
                                            // console.log('>>>image check;;;', item.image)
                                            return (
                                                <div className='img-customize-doctor' key={index}
                                                    onClick={() => this.handleViewDetailDoctor(item)}>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctors));
