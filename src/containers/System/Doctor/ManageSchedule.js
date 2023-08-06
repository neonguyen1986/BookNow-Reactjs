import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageSchedule.scss'
import Select from 'react-select';
import * as actions from "../../../store/actions"
import { LANGUAGE, dateFormat } from '../../../utils'
import DatePicker from '../../../components/Input/DatePicker'
import _ from 'lodash'
import moment from 'moment';
import { collapseToast, toast } from 'react-toastify';





class ManageSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            timeRange: [],
        }
    }

    async componentDidMount() {
        await this.props.fetchAllDoctorsRedux();
        await this.props.fetchAllcodeTimeStart();
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctorsRedux !== this.props.allDoctorsRedux) {
            this.setState({
                listDoctors: this.props.allDoctorsRedux,
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data?.length > 0) {
                data.map(item => {
                    item.isSelected = false
                })
            }
            // console.log('check time range,', data)
            this.setState({
                timeRange: data
            })
        }
    }
    //================SELECT==============
    buildDataSelect = (arrInput) => {
        let language = this.props.language;
        let result = [];
        if (arrInput?.length > 0) {
            for (let i = 0; i < arrInput.length; i++) {
                let tempArr = arrInput[i]
                if (language === LANGUAGE.EN) {
                    result.push({
                        value: tempArr.id,
                        label: `${tempArr.firstName} ${tempArr.lastName}`
                    })
                } else {
                    result.push({
                        value: tempArr.id,
                        label: `${tempArr.lastName} ${tempArr.firstName}`
                    })
                }
            }
        }
        return result
    }
    handleChange = async (selectedDoctor) => {
        this.setState({ selectedDoctor })
    };
    //====================================
    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0],
        })
    }
    handleClickTime = (itemInput) => {
        let tempTimeRange = this.state.timeRange
        if (tempTimeRange?.length > 0) {
            tempTimeRange.map(item => {
                if (item.keyMap === itemInput.keyMap) {
                    item.isSelected = !itemInput.isSelected
                }
            })
        }
        this.setState({
            timeRange: tempTimeRange
        })
        // console.log('check after click:', this.state.timeRange.isSelected)
    }

    handleSaveSchedule = () => {
        let { timeRange, selectedDoctor, currentDate } = this.state;
        let result = [];
        if (!currentDate) {
            toast.warning('Invalid Date')
            return;
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.warning('Please select Doctor')
            return;
        }
        let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        if (timeRange?.length > 0) {
            let selectedTime = timeRange.filter(item => item.isSelected === true)
            if (selectedTime?.length > 0) {
                selectedTime.map(schedule => {
                    let obj = {}
                    obj.doctorId = selectedDoctor.value;
                    obj.date = formatedDate;
                    obj.time = schedule.keyMap;
                    result.push(obj);
                })
            } else {
                toast.warning('Please select Time');
                return;
            }
        }
        console.log('check resutl:', result)
    }
    render() {
        let options = this.buildDataSelect(this.state.listDoctors)
        // console.log('>>>check state:', this.state)
        let { timeRange } = this.state
        let language = this.props.language
        return (
            <div className='manage-schedule-container'>
                <div className='ms-title title' >
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6'>
                            <label><FormattedMessage id="manage-schedule.choose-doctor" /></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChange}
                                options={options} />
                        </div>
                        <div className='col-6'>
                            <label><FormattedMessage id="manage-schedule.choose-date" /></label>

                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className='form-control choose-date'
                                value={this.state.currentDate}
                                selected={this.state.currentDate}
                                minDate={new Date()}
                            />
                        </div>
                        <div className='col-12 hour-pic-container'>
                            {timeRange?.length > 0 &&
                                timeRange.map((item, index) => {
                                    return (
                                        <button
                                            className={item.isSelected === true ? 'btn-schedule active' : 'btn-schedule'}
                                            key={index}
                                            onClick={() => this.handleClickTime(item)}
                                        >
                                            {language === LANGUAGE.EN
                                                ? item.valueEn
                                                : item.valueVi}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-primary'
                                onClick={() => this.handleSaveSchedule()}>
                                <FormattedMessage id="manage-schedule.save" />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctorsRedux: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        fetchAllcodeTimeStart: () => dispatch(actions.fetchAllcodeTimeStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
