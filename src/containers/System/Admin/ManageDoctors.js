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
            selectedDoctor: {},
            description: '',
            isNewDoctor: 'true',

            //save to doctor_info table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            clinicName: '',
            clinicAddress: '',
            note: '',
        }
    }
    async componentDidMount() {
        this.setState({
            selectedDoctor: ''//set state to display placeholder
        })
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
            })
            // console.log('check redux', this.props.allDoctorInfoRequirement)
        }
        //===Display doctor Markdown and doctor_info when Selected
        if (prevState.selectedDoctor !== this.state.selectedDoctor && this.state.selectedDoctor !== '') {
            let id = this.state.selectedDoctor.value;
            let res = await getDetailDoctorInfo(id)
            let data = res.data.Markdown
            if (data?.description || data?.markdownContent) {
                this.setState({
                    description: data.description,
                    markdownContent: data.markdownContent,
                    isNewDoctor: false,
                })
            } else {
                this.setState({
                    description: '',
                    markdownContent: '',
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
                        value: type === 'USER' ? tempArr.id : tempArr.keyMap,
                        label: type === 'USER' ? `${tempArr.firstName} ${tempArr.lastName}` :
                            type === 'PRICE' ? `${tempArr.valueEn} USD` : tempArr.valueEn

                    })
                } else {
                    result.push({
                        value: type === 'USER' ? tempArr.id : tempArr.keyMap,
                        label: type === 'USER' ? `${tempArr.lastName} ${tempArr.firstName}` : tempArr.valueVi
                    })
                }
            }
        }
        return result
    }
    //chưa được
    // handleChangeSelect = async (selectedOption, name) => {
    //     let stateKey = name.name;
    //     let copyState = { ...this.state }
    //     copyState[stateKey] = selectedOption
    //     this.setState({
    //         ...copyState
    //     })
    //     console.log(`check ${name.name}:`, this.state.selectedPayment)
    // }

    handleChangeListDoctor = async (selectedDoctor) => {
        this.setState({ selectedDoctor })
    };
    handleChangeListPrice = async (selectedPrice) => {
        this.setState({ selectedPrice })
        console.log('>>>>check price', selectedPrice)
    };
    handleChangeListPayment = async (selectedPayment) => {
        this.setState({ selectedPayment })
        console.log('>>>>check Payment', selectedPayment)

    };
    handleChangeListProvince = async (selectedProvince) => {
        this.setState({ selectedProvince })
        console.log('>>>>check province', selectedProvince)

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

    handleSaveContentMarkdown = async () => {
        let res = await this.props.postDoctorsRedux({
            HTMLContent: this.state.HTMLContent,
            markdownContent: this.state.markdownContent,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
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
                selectedDoctor: ''
            })
        } else {
            toast.warning(res.errMessage)
        }
    }

    // handleUpdateContentMarkdown = async () => {
    //     if (this.state.markdownContent === '') {
    //         toast.warning("Missing Markdown Content")
    //     } else {
    //         await updateDoctorMardownService({
    //             HTMLContent: this.state.HTMLContent,
    //             markdownContent: this.state.markdownContent,
    //             description: this.state.description,
    //             doctorId: this.state.selectedDoctor.value
    //         })
    //         toast.success("Doctor info's just updated")
    //     }
    // }
    handleCancelContentMarkdown = () => {
        this.setState({
            markdownContent: '',
            description: '',
            selectedDoctor: ''
        })
    }

    render() {
        let optionsListDoctor = this.buildDataSelect(this.state.listDoctors, 'USER')
        let optionsListPrice = this.buildDataSelect(this.state.listPrice, 'PRICE')
        let optionsListPayment = this.buildDataSelect(this.state.listPayment)
        let optionsListProvince = this.buildDataSelect(this.state.listProvince)
        let { isNewDoctor } = this.state
        let { clinicName, clinicAddress, note, description } = this.state
        // console.log('>>check doctor', this.state.selectedDoctor)
        // console.log('name:', clinicName, ';address:', clinicAddress, ';note:', note, ';description:', description)
        console.log('=======check state:', this.state)
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
                            onChange={this.handleChangeListDoctor}
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
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeListPrice}
                            options={optionsListPrice}
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-price-place-holder' />}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label> <FormattedMessage id='admin.manage-doctor.choose-payment' /></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeListPayment}
                            // onChange={this.handleChangeSelect}
                            options={optionsListPayment}
                            name='selectedPayment'
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-payment-place-holder' />}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label> <FormattedMessage id='admin.manage-doctor.choose-province' /></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeListProvince}
                            options={optionsListProvince}
                            name='selectedProvince'
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-province-place-holder' />}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label> <FormattedMessage id='admin.manage-doctor.clinic-name' /></label>
                        <input className='form-control'
                            onChange={(e) => this.handleOnChangeText(e, 'clinicName')}
                            value={this.state.clinicName}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label> <FormattedMessage id='admin.manage-doctor.clinic-address' /></label>
                        <input className='form-control'
                            onChange={(e) => this.handleOnChangeText(e, 'clinicAddress')}
                            value={this.state.clinicAddress}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label> <FormattedMessage id='admin.manage-doctor.note' /></label>
                        <input className='form-control'
                            onChange={(e) => this.handleOnChangeText(e, 'note')}
                            value={this.state.note}
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
                    onClick={() => this.handleSaveContentMarkdown()}>
                    {isNewDoctor === true
                        ? <FormattedMessage id='admin.manage-doctor.save' />
                        : <FormattedMessage id='admin.manage-doctor.update' />
                    }
                </button>
                <button className='cancel-content-doctor'
                    onClick={() => this.handleCancelContentMarkdown()}>
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
