import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss'
import DatePicker from '../../../components/Input/DatePicker'
import { LANGUAGE, CommonUtils } from '../../../utils'
import { FormattedMessage } from 'react-intl';
import { getlistPatienByIdDate, postUploadSingleFile, getDownloadServerFile } from '../../../services/userService'
import moment from 'moment';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import _ from 'lodash'
import axios from '../../../axios'
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import path from 'path'




class ManagePatient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentDate: '',
            loginData: '',
            data: '',
            selectedFile: '',
            isLoading: false,
            uploadedFile: '',
            pdfUrl: '',
        }
        this.linkRef = React.createRef();
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
                // console.log('>>>>>>>>>check res data:', res)
                this.setState({
                    data: res.data
                })
            }
        }
    }
    callGetListPatient = async () => {

    }

    handleOnChangeDatePicker = async (date) => {
        this.setState({
            currentDate: new Date(date[0]).getTime()
        })
    }
    // ===========Multer Upload file===========
    handleOnChangeFile = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        })
    }

    handleOnClickUploadFile = async (item) => {
        this.setState({ isLoading: true })
        // console.log('+++check state:', this.state)
        // console.log('+++check item:', item)
        const formData = new FormData();
        formData.append('fileName', this.state.selectedFile);

        //date for DB and email
        formData.append('token', item.token)
        formData.append('patientName', item.patientInfo.firstName)
        formData.append('email', item.patientInfo.email)
        formData.append('docFirstName', this.state.loginData.firstName)
        formData.append('docLastName', this.state.loginData.lastName)
        formData.append('language', this.props.language)

        setTimeout(async () => {
            try {
                let res = await postUploadSingleFile(formData);
                if (res?.errCode === 0) {
                    toast.success(`You've sent precription to patient`)
                } else {
                    toast.warning(res.errMessage)
                }
            } catch (error) {
                console.error(error);
            } finally {
                this.setState({ isLoading: false })
                //after sending email, refresh state to update table data
                let res = await getlistPatienByIdDate(this.state.loginData.id, this.state.currentDate)
                this.setState({
                    data: res.data
                })
            }
        }, 2000);
    };
    handleOnClickDownloadFile = async (item) => {
        let res = await getDownloadServerFile(item.token)
        // console.log('>>>result:', res)
        if (res?.fileName) window.open(res.fileName, '_blank')
    }
    // fetchPdf = async () => {
    //     try {
    //         const response = await fetch('/api/pdf'); // Adjust the URL if your backend runs on a different port or domain
    //         console.log('+++++++res ', response)
    //         const blob = await response.blob();
    //         const url = URL.createObjectURL(blob);
    //         this.setState({ pdfUrl: url })
    //     } catch (error) {
    //         console.error('Error fetching PDF:', error);
    //     }
    // }
    render() {
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 15));
        // console.log('==========check state from ManagePatients:', this.state)
        let { data } = this.state;
        let language = this.props.language
        let pdfUrl = this.state.pdfUrl
        console.log('==========check state from ManagePatients:', pdfUrl)

        return (
            <>
                <LoadingOverlay
                    active={this.state.isLoading}
                    spinner
                    text='Loading your content...'
                >
                </LoadingOverlay>

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
                                                            : item.patientInfo.genderData.valueFr}
                                                    </td>
                                                    <td>{item.patientInfo.address}</td>
                                                    <td>
                                                        {language === LANGUAGE.EN
                                                            ? moment.unix(+item.date / 1000).locale('en').format('ddd-MM/DD/YYYY')
                                                            : moment.unix(+item.date / 1000).locale('fr').format('dddd - DD/MM/YYYY')}
                                                    </td>
                                                    <td>
                                                        {language === LANGUAGE.EN
                                                            ? item.timeBooking.valueEn
                                                            : item.timeBooking.valueFr}
                                                    </td>
                                                    <td>
                                                        {item.statusId && item.statusId === 'S3'
                                                            ?
                                                            <>
                                                                <button className='btn btn-secondary'
                                                                    onClick={() => this.handleOnClickDownloadFile(item)}>
                                                                    Check Prescription
                                                                </button>
                                                            </>
                                                            :
                                                            <>
                                                                <input type="file" onChange={(e) => this.handleOnChangeFile(e)} />
                                                                <button className='btn btn-primary' onClick={() => this.handleOnClickUploadFile(item)}>Send</button>
                                                            </>
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr >
                                            <td colSpan='8' style={{ textAlign: 'center' }}>No data</td>
                                        </tr>
                                    }

                                </tbody>


                            </table>
                        </div>
                    </div>
                </div>
            </>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManagePatient));
