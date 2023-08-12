import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailSpecialty.scss'
import { LANGUAGE, CommonUtils } from '../../../utils'
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../Auth/HomePage/HomeHeader';
import DoctorProfile from '../Doctor/DoctorProfile';
import DoctorMoreInfo from '../Doctor/DoctorMoreInfo';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    async componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let doctorId = [47, 48, 49]
        return (
            <div className='detail-secialty-all-container'>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className='detail-specialty-description'>

                </div>
                <div className='detail-specialty-container'>
                    {doctorId?.length > 0 &&
                        doctorId.map((item, index) => {
                            return (
                                <div className='detSpec-content' key={index}>
                                    <span className='detSpec-left'>
                                        <DoctorProfile
                                            doctorIdFromParent={item}
                                            isDoctorDescription={true}
                                        />
                                    </span>
                                    <span className='detSpec-right'>
                                        <DoctorMoreInfo
                                            doctorIdFromParent={item}
                                            isShowPrice={true} />
                                    </span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
