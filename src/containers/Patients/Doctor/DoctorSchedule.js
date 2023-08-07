import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../Auth/HomePage/HomeHeader';
import './DoctorSchedule.scss'
import { getDoctorScheduleInfo } from '../../../services/userService'
import { LANGUAGE, CommonUtils } from '../../../utils'
import { FormattedMessage } from 'react-intl';
import { getDoctorScheduleByDate } from '../../../services/userService'

//moment to dispay Vi
import moment from 'moment';
import localization from 'moment/locale/vi'

class DoctorSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allDays: [],
            allAvailableTime: [],
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    setDateLanguage = () => {
        // console.log('moment in Vi', moment(new Date()).format('dddd-DD/MM'))
        // console.log('moment in En', moment(new Date()).locale('en').format('ddd-DD/MM'))

        let allDays = []
        for (let i = 0; i < 7; i++) {
            let obj = {};
            if (this.props.language === LANGUAGE.VI) {
                let labelVi = moment(new Date()).add(i, 'days').format('dddd-DD/MM')
                obj.label = this.capitalizeFirstLetter(labelVi)
            } else {
                obj.label = moment(new Date()).add(i, 'days').locale('en').format('ddd-DD/MM')

            }
            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            //valueOf sẽ giúp convert milisecond sang unix Timestamp

            allDays.push(obj)
        }
        // console.log('arrDate:', allDays)
        this.setState({
            allDays: allDays,
        })
    }


    componentDidMount() {
        this.setDateLanguage()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            this.setDateLanguage()
        }
    }
    handleOnChangeSelect = async (e) => {
        if (this.props?.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = e.target.value
            let res = await getDoctorScheduleByDate(doctorId, date)

            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }
            // console.log('>>>>>>>check DB', res)
        }
    }

    //===============================render=================================

    render() {
        let { allDays, allAvailableTime } = this.state
        let language = this.props.language
        console.log('allAvailableTime', allAvailableTime)

        return (
            <div className='doctor-schedule-container'>
                <div className='all-schedule'>
                    <select
                        onChange={(e) => this.handleOnChangeSelect(e)}
                    >
                        {allDays?.length > 0 &&
                            allDays.map((item, index) => {
                                return (
                                    <option value={item.value} key={index}>
                                        {item.label}
                                    </option>
                                )
                            })}

                    </select>
                </div>
                <div className='all-available-time'>
                    <div className='calender-text'>
                        <span>
                            <i className='fas fa-calendar-alt'>
                                <FormattedMessage id='detail-doctor.calendar' />
                            </i>
                        </span>
                    </div>
                    <div className='time-pick-conainer'>
                        {allAvailableTime?.length > 0
                            ?
                            allAvailableTime.map((item, index) => {
                                let time = '';
                                if (item?.timeTypeData?.valueEn && item?.timeTypeData?.valueVi) {
                                    time = language === LANGUAGE.EN ? item.timeTypeData.valueEn : item.timeTypeData.valueVi
                                }
                                return (
                                    <button key={index}>{time}</button>
                                )
                            })
                            :
                            <div>
                                <FormattedMessage id='detail-doctor.doctor-avai' />
                            </div>
                        }
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
