import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../Auth/HomePage/HomeHeader';
import './DetailDoctor.scss'
import { getDetailDoctorInfo } from '../../../services/userService'
import { LANGUAGE, CommonUtils } from '../../../utils'
import { FormattedMessage } from 'react-intl';



class DetailDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detailDoctor: {}
        }
    }
    async componentDidMount() {
        if (this.props?.match?.params?.id) {
            let id = this.props.match.params.id;
            let res = await getDetailDoctorInfo(id)
            // console.log('>>>check res:', res)
            // convertBase64ToBinary
            if (res?.errCode === 0) {
                this.setState({
                    detailDoctor: res.data
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {

        let detailDoctor = this.state.detailDoctor
        console.log('>>>>check state:', detailDoctor)

        let language = this.props.language

        let nameVi = '', nameEn = ''
        if (detailDoctor?.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`
        }
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='doctor-detail-container'>
                    <div className='doctor-intro'>
                        <div className='left-content'>
                            {detailDoctor?.image &&
                                <img className='doctor-avatar'
                                    src={CommonUtils.convertBase64ToBinary(detailDoctor.image)} />
                            }
                        </div>
                        <div className='right-content'>
                            <div className='up'>
                                {language === LANGUAGE.EN
                                    ? nameEn
                                    : nameVi
                                }
                            </div>
                            <div className='down'>
                                {detailDoctor?.Markdown?.description &&
                                    detailDoctor.Markdown.description}
                            </div>
                        </div>
                    </div>
                    <div className='doctor-schedule'>

                    </div>
                    <div className='doctor-detail'>
                        {detailDoctor?.Markdown?.HTMLContent &&
                            <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.HTMLContent }}>
                            </div>

                        }
                    </div>
                    <div className='cdoctor-comment'>

                    </div>
                </div>
                {/* } */}
            </>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
