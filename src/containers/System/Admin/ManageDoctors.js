import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions"
import { toast } from 'react-toastify';
import './ManageDoctors.scss'
import { LANGUAGE } from '../../../utils'
import { FormattedMessage } from 'react-intl';
import { getDetailDoctorInfo, updateDoctorMardownService } from '../../../services/userService'


import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// const mdParser = new MarkdownIt(/* Markdown-it options */);

import Select from 'react-select';




class ManageDoctors extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //save to markdown table
            markdownContent: '',
            HTMLContent: '',
            listDoctors: '',
            selectedDoctor: '',
            description: '',
            isNewDoctor: true,

            //save to doctor_info table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listSpecialty: [],
            listClinic: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedSpecialty: '',
            selectedClinic: '',
            clinicName: '',
            clinicAddress: '',
            note: '',
        }
    }
    async componentDidMount() {

        await this.props.fetchAllDoctorsRedux();

        await this.props.getRequiredDoctorInfo();


    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctorsRedux !== this.props.allDoctorsRedux) {
            this.setState({
                listDoctors: this.props.allDoctorsRedux,
            })
        }
        if (prevProps.allDoctorInfoRequirement !== this.props.allDoctorInfoRequirement) {
            this.setState({
                listPrice: this.props.allDoctorInfoRequirement.resPrice,
                listPayment: this.props.allDoctorInfoRequirement.resPayment,
                listProvince: this.props.allDoctorInfoRequirement.resProvince,
                listSpecialty: this.props.allDoctorInfoRequirement.resSpecialty,
            })
            // console.log('check redux', this.props.allDoctorInfoRequirement)
        }
        //===Display doctor Markdown and doctor_info when Doctor is Selected
        if (prevState.selectedDoctor !== this.state.selectedDoctor && this.state.selectedDoctor !== '') {
            let id = this.state.selectedDoctor.value;
            let res = await getDetailDoctorInfo(id)
            // console.log('???res:', res)
            let data = res.data
            if (data?.Markdown?.markdownContent ||
                data?.Markdown?.description ||
                data?.Doctor_Info?.priceTypeData?.valueEn ||
                data?.Doctor_Info?.paymentTypeData?.valueEn ||
                data?.Doctor_Info?.provinceTypeData?.valueEn ||
                data?.Doctor_Info?.addressClinic ||
                data?.Doctor_Info?.nameClinic ||
                data?.Doctor_Info?.note ||
                data?.Doctor_Info?.specialtyName?.name
            ) {
                let tempSelectedPrice = {
                    value: data.Doctor_Info.priceId,
                    label: this.props.language === LANGUAGE.EN ? data.Doctor_Info.priceTypeData.valueEn : data.Doctor_Info.priceTypeData.valueVi
                }
                let tempSelectedPayment = {
                    value: data.Doctor_Info.paymentId,
                    label: this.props.language === LANGUAGE.EN ? data.Doctor_Info.paymentTypeData.valueEn : data.Doctor_Info.paymentTypeData.valueVi
                }
                let tempSelectedProvince = {
                    value: data.Doctor_Info.provinceId,
                    label: this.props.language === LANGUAGE.EN ? data.Doctor_Info.provinceTypeData.valueEn : data.Doctor_Info.provinceTypeData.valueVi
                }
                let tempselectedSpecialty = {
                    value: data.Doctor_Info.specialtyName.id,
                    label: data.Doctor_Info.specialtyName.name,
                }

                this.setState({
                    description: !data.Markdown.description ? '' : data.Markdown.description,
                    markdownContent: !data.Markdown.markdownContent ? '' : data.Markdown.markdownContent,
                    HTMLContent: !data.Markdown.HTMLContent ? '' : data.Markdown.HTMLContent,
                    selectedPrice: !tempSelectedPrice ? '' : tempSelectedPrice,
                    selectedPayment: !tempSelectedPayment ? '' : tempSelectedPayment,
                    selectedProvince: !tempSelectedProvince ? '' : tempSelectedProvince,
                    clinicName: !data.Doctor_Info.nameClinic ? '' : data.Doctor_Info.nameClinic,
                    clinicAddress: !data.Doctor_Info.addressClinic ? '' : data.Doctor_Info.addressClinic,
                    note: !data.Doctor_Info.note ? '' : data.Doctor_Info.note,
                    selectedSpecialty: !tempselectedSpecialty ? '' : tempselectedSpecialty,
                    isNewDoctor: false,
                })
            } else {
                this.setState({
                    description: '',
                    markdownContent: '',
                    HTMLContent: '',
                    selectedDoctor: '',
                    selectedPrice: '',
                    selectedPayment: '',
                    selectedProvince: '',
                    clinicName: '',
                    clinicAddress: '',
                    note: '',
                    selectedSpecialty: '',

                    isNewDoctor: true,
                })
            }
            // console.log('>>>>check state:', this.state)
        }
    }

    //================= Markdown Editor=================
    mdParser = new MarkdownIt(/* Markdown-it options */);
    // Finish!
    handleEditorChange = ({ html, text }) => {
        // console.log('handleEditorChange', html, text);
        this.setState({
            HTMLContent: html,
            markdownContent: text
        })
    }
    //================= React Select=================
    // options = [
    //     { value: 'chocolate', label: 'Chocolate' },
    //     { value: 'strawberry', label: 'Strawberry' },
    //     { value: 'vanilla', label: 'Vanilla' },
    // ];
    buildDataSelect = (arrInput, type) => {
        let language = this.props.language;
        let result = [];
        if (arrInput?.length > 0) {
            for (let i = 0; i < arrInput.length; i++) {
                let tempArr = arrInput[i]
                if (language === LANGUAGE.EN) {
                    result.push({
                        value: (type === 'USER' || type === 'SPECIALTY') ? tempArr.id : tempArr.keyMap,
                        label: type === 'USER' ? `${tempArr.firstName} ${tempArr.lastName}` :
                            type === 'PRICE' ? `${tempArr.valueEn} USD` :
                                type === 'SPECIALTY' ? tempArr.name :
                                    tempArr.valueEn

                    })
                } else {
                    result.push({
                        value: type === 'USER' ? tempArr.id : tempArr.keyMap,
                        label: type === 'USER' ? `${tempArr.lastName} ${tempArr.firstName}` :
                            type === 'PRICE' ? `${tempArr.valueVi} VND` :
                                type === 'SPECIALTY' ? tempArr.name :
                                    tempArr.valueVi
                    })
                }
            }
        }
        return result
    }

    handleChange = async (key, selectedValue) => {
        this.setState({ [key]: selectedValue });
    };
    //================================================
    //=======================Change description, Clinic name, address, note=========================
    handleOnChangeText = (e, labelName) => {
        let copyState = { ...this.state }
        copyState[labelName] = e.target.value
        this.setState({
            [labelName]: copyState[labelName]
        })
    }

    handleSaveDoctorInfo = async () => {
        let res = await this.props.postDoctorsRedux({
            HTMLContent: this.state.HTMLContent,
            markdownContent: this.state.markdownContent,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            selectedSpecialty: this.state.selectedSpecialty.value,
            selectedClinic: this.state.selectedClinic.value,
            clinicName: this.state.clinicName,
            clinicAddress: this.state.clinicAddress,
            note: this.state.note,
        })
        // console.log('>>>>>>check state:', res)
        if (res?.errCode == 0) {
            toast.success("Doctor info's just added")
            this.setState({
                markdownContent: '',
                description: '',
                HTMLContent: '',
                selectedDoctor: '',
                selectedPrice: '',
                selectedPayment: '',
                selectedProvince: '',
                selectedSpecialty: '',
                selectedClinic: '',
                clinicName: '',
                clinicAddress: '',
                note: '',

                isNewDoctor: true,
            })
        } else {
            toast.warning(res.errMessage)
        }
    }

    handleCancelDoctorInfo = () => {
        this.setState({
            markdownContent: '',
            description: '',
            HTMLContent: '',
            selectedDoctor: '',
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedSpecialty: '',
            selectedClinic: '',
            clinicName: '',
            clinicAddress: '',
            note: '',

            isNewDoctor: true,
        })
    }


    render() {
        let optionsListDoctor = this.buildDataSelect(this.state.listDoctors, 'USER')
        let optionsListPrice = this.buildDataSelect(this.state.listPrice, 'PRICE')
        let optionsListPayment = this.buildDataSelect(this.state.listPayment)
        let optionsListProvince = this.buildDataSelect(this.state.listProvince)
        let optionsListSpecialty = this.buildDataSelect(this.state.listSpecialty, 'SPECIALTY')
        let optionsListClinic = this.buildDataSelect(this.state.listClinic)
        let { isNewDoctor } = this.state
        let { selectedPrice,
            selectedPayment,
            selectedProvince,
            selectedSpecialty,
            selectedClinic,
            clinicName,
            clinicAddress,
            note,
            description } = this.state
        // console.log('>>check doctor', selectedPrice)
        // console.log('=======check state:', this.state)
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title title'>
                    <FormattedMessage id='admin.manage-doctor.doctor-title' />
                </div>
                <div className='doctor-info row' >
                    <div className='content-left col-6 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.choose-doctor' /></label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={(selectedValue) => this.handleChange('selectedDoctor', selectedValue)}
                            options={optionsListDoctor}
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-doctor-place-holder' />}
                        />
                    </div>
                    <div className='content-right col-6 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.doctor-info' /></label>
                        <textarea className='form-control' rows='4'
                            onChange={(e) => this.handleOnChangeText(e, 'description')}
                            value={this.state.description}>

                        </textarea>
                    </div>
                </div>
                <div className='doctor-add-more-info row'>
                    <div className='col-6 form-group'>
                        <label> <FormattedMessage id='admin.manage-doctor.choose-price' /></label>

                        <Select
                            value={selectedPrice}
                            onChange={(selectedValue) => this.handleChange('selectedPrice', selectedValue)}
                            options={optionsListPrice}
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-price-place-holder' />}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label> <FormattedMessage id='admin.manage-doctor.choose-payment' /></label>
                        <Select
                            value={selectedPayment}
                            onChange={(selectedValue) => this.handleChange('selectedPayment', selectedValue)}
                            // onChange={this.handleChangeSelect}
                            options={optionsListPayment}
                            name='selectedPayment'
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-payment-place-holder' />}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label> <FormattedMessage id='admin.manage-doctor.choose-province' /></label>
                        <Select
                            value={selectedProvince}
                            onChange={(selectedValue) => this.handleChange('selectedProvince', selectedValue)}
                            options={optionsListProvince}
                            name='selectedProvince'
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-province-place-holder' />}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label> <FormattedMessage id='admin.manage-doctor.choose-specialty' /></label>
                        <Select
                            value={selectedSpecialty}
                            onChange={(selectedValue) => this.handleChange('selectedSpecialty', selectedValue)}
                            options={optionsListSpecialty}
                            name='selectedSpecialty'
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-specialty-place-holder' />}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label> <FormattedMessage id='admin.manage-doctor.choose-clinic' /></label>
                        <Select
                            value={selectedClinic}
                            onChange={(selectedValue) => this.handleChange('selectedClinic', selectedValue)}
                            options={optionsListClinic}
                            name='selectedClinic'
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-clinic-place-holder' />}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label> <FormattedMessage id='admin.manage-doctor.clinic-name' /></label>
                        <input className='form-control'
                            onChange={(e) => this.handleOnChangeText(e, 'clinicName')}
                            value={clinicName}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label> <FormattedMessage id='admin.manage-doctor.clinic-address' /></label>
                        <input className='form-control'
                            onChange={(e) => this.handleOnChangeText(e, 'clinicAddress')}
                            value={clinicAddress}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label> <FormattedMessage id='admin.manage-doctor.note' /></label>
                        <input className='form-control'
                            onChange={(e) => this.handleOnChangeText(e, 'note')}
                            value={note}
                        />
                    </div>

                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => this.mdParser.render(text)}
                        value={this.state.markdownContent}
                        onChange={this.handleEditorChange} />

                </div>
                <button
                    className='save-content-doctor'
                    onClick={() => this.handleSaveDoctorInfo()}>
                    {isNewDoctor === true
                        ? <FormattedMessage id='admin.manage-doctor.save' />
                        : <FormattedMessage id='admin.manage-doctor.update' />
                    }
                </button>
                <button className='cancel-content-doctor'
                    onClick={() => this.handleCancelDoctorInfo()}>
                    <FormattedMessage id='admin.manage-doctor.cancel' />
                </button>
            </div>
        );
    }

}



const mapStateToProps = state => {
    return {
        language: state.app.language,

        getAllUserRedux: state.admin.users,
        getOneUserRedux: state.admin.oneuser,
        allDoctorsRedux: state.admin.allDoctors,
        allDoctorInfoRequirement: state.admin.allDoctorInfoRequirement,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //CRUD Redux
        fetchAllUsersStart: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (data) => dispatch(actions.deleteUser(data)),
        getUserStartRedux: (id) => dispatch(actions.getUserStart(id)),
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        postDoctorsRedux: (data) => dispatch(actions.postDoctors(data)),

        getRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctors);
