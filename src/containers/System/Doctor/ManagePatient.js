import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss'
import DatePicker from '../../../components/Input/DatePicker'
import { LANGUAGE, CommonUtils } from '../../../utils'
import { FormattedMessage } from 'react-intl';
import { getlistPatienByIdDate } from '../../../services/userService'
import moment from 'moment';


class ManagePatient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentDate: '',
            loginData: '',
            data: ''
        }
    }
    async componentDidMount() {
        this.setState({
            loginData: this.props.userInfoAfterLogin,
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.currentDate !== prevState.currentDate) {
            if (this.state.loginData?.id && this.state.currentDate) {
                let res = await getlistPatienByIdDate(this.state.loginData.id, this.state.currentDate)
                console.log('>>>>>>>>>check res data:', res)
                this.setState({
                    data: res.data
                })
            }
        }
    }
    handleOnChangeDatePicker = async (date) => {
        this.setState({
            currentDate: new Date(date[0]).getTime()
        })
        // if (this.state.loginData?.id && this.state.currentDate) {
        //     let res = await getlistPatienByIdDate(this.state.loginData.id, this.state.currentDate)
        //     console.log('>>>>>>>>>check res data:', res)
        //     this.setState({
        //         data: res
        //     })
        // }
    }
    render() {
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        console.log('==========check state from ManagePatients:', this.state)
        let { data } = this.state;
        let language = this.props.language
        return (
            <div className='Manage-patient-container'>
                <div className='manaPati-title title'>
                    Manage Patients
                </div>
                <div className='col-6 form-group'>
                    <label>Chọn ngày</label>
                    <DatePicker
                        onChange={this.handleOnChangeDatePicker}
                        className='form-control choose-date'
                        value={this.state.currentDate}
                        selected={this.state.currentDate}
                        minDate={yesterday}
                    />
                </div>

                <div>
                    <div className='manaPati-table mt-3'>
                        <table id="TableManageUser">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Email</th>
                                    <th>Full Name</th>
                                    <th>gender</th>
                                    <th>Address</th>
                                    <th>Booking Date</th>
                                    <th>Booking Time</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.length > 0 ?
                                    data.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.patientId}</td>
                                                <td>{item.patientInfo.email}</td>
                                                <td>{item.patientInfo.firstName}</td>
                                                <td>
                                                    {language === LANGUAGE.EN
                                                        ? item.patientInfo.genderData.valueEn
                                                        : item.patientInfo.genderData.valueVi}
                                                </td>
                                                <td>{item.patientInfo.address}</td>
                                                <td>
                                                    {language === LANGUAGE.EN
                                                        ? moment.unix(+item.date / 1000).locale('en').format('ddd-MM/DD/YYYY')
                                                        : moment.unix(+item.date / 1000).locale('vi').format('dddd - DD/MM/YYYY')}
                                                </td>
                                                <td>
                                                    {language === LANGUAGE.EN
                                                        ? item.timeBooking.valueEn
                                                        : item.timeBooking.valueVi}
                                                </td>
                                                <td>
                                                    <input type='file' />
                                                    <button className='btn btn-primary'>
                                                        Send Prescription
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr >
                                        <td colSpan='7' style={{ textAlign: 'center' }}>No data</td>
                                    </tr>
                                }

                            </tbody>


                        </table>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        userInfoAfterLogin: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
