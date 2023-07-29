import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './Specialty.scss';
import { FormattedMessage } from 'react-intl';

// Import slider files
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import doctor1 from '../../../../assets/img-doctors/1.pgs-nguyen-thi-hoai-an.jpg'
import doctor2 from '../../../../assets/img-doctors/2.bsnguyen-thi-hung.jpg'
import doctor3 from '../../../../assets/img-doctors/3.bs-tran-huu-loi-yd1.jpg'
import doctor4 from '../../../../assets/img-doctors/4.bs-tran-huu-binh.jpg'
import doctor5 from '../../../../assets/img-doctors/5.thac-si-bac-si-ha-quoc-hung.jpg'
import doctor6 from '../../../../assets/img-doctors/6.bsii-tran-minh-khuyen.jpg'

class OutstandingDoctors extends Component {

    render() {

        return (
            <>
                <div className='fit-height-width doctors'>
                    <div className='section-shared'>
                        <div className='section-container'>
                            <div className='section-header'>
                                <div className='section-title'>Outstanding Doctors</div>
                                <button>VIEW MORE...</button>
                            </div>
                            <div className='section-body'>
                                <Slider {...this.props.settings}>
                                    <div className='img-customize-doctor'>
                                        <div className='tempdiv'><img className='image' src={doctor1} /></div>
                                        <div className='title-name'>Phó giáo sư, Tiến sĩ, Bác sĩ Nguyễn Thị Hoài An</div>
                                        <div>Tai Mũi Họng - Nhi Khoa</div>
                                    </div>
                                    <div className='img-customize-doctor'>
                                        <div className='tempdiv'><img className='image' src={doctor2} /></div>
                                        <div className='title-name'>Phó giáo sư, Tiến sĩ, Bác sĩ Nguyễn Phi Hùng</div>
                                        <div>Thần kinh</div>
                                    </div>
                                    <div className='img-customize-doctor'>
                                        <div className='tempdiv'><img className='image' src={doctor3} /></div>
                                        <div className='title-name'>Bác sĩ chuyên khoa I Trần Hữu Lợi</div>
                                        <div>Nội khoa</div>
                                    </div>
                                    <div className='img-customize-doctor'>
                                        <div className='tempdiv'><img className='image' src={doctor4} /></div>
                                        <div className='title-name'>PGS, TS, Giảng viên cao cấp Trần Hữu Bình</div>
                                        <div>Sức khỏe tâm thần</div>
                                    </div>
                                    <div className='img-customize-doctor'>
                                        <div className='tempdiv'><img className='image' src={doctor5} /></div>
                                        <div className='title-name'>Bác sĩ chuyên khoa II Hà Quốc Hùng</div>
                                        <div>Cơ Xương Khớp - Nội khoa</div>
                                    </div>
                                    <div className='img-customize-doctor'>
                                        <div className='tempdiv'><img className='image' src={doctor6} /></div>
                                        <div className='title-name'>Bác sĩ chuyên khoa II Trần Minh Khuyên</div>
                                        <div>Sức khỏe tâm thần - Trị liệu tâm lý</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctors);
