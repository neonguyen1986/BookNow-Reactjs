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
            markdownContent: '',
            HTMLContent: '',
            listDoctors: '',
            selectedDoctor: {},
            description: '',
            isNewDoctor: 'true',
        }
    }
    async componentDidMount() {
        await this.props.fetchAllDoctorsRedux();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctorsRedux !== this.props.allDoctorsRedux) {
            this.setState({
                listDoctors: this.props.allDoctorsRedux,
            })
        }
        //===Display doctor Markdown on description and Mardown when Selected
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
    //================================================
    handleOnChangeDescription = (e) => {
        this.setState({
            description: e.target.value,
        })
    }

    handleSaveContentMarkdown = () => {
        if (this.state.markdownContent !== '') {
            this.props.postDoctorsRedux({
                HTMLContent: this.state.HTMLContent,
                markdownContent: this.state.markdownContent,
                description: this.state.description,
                doctorId: this.state.selectedDoctor.value
            })
            // console.log('check state:', this.state.selectedDoctor)
            toast.success("Doctor info's just added")
            this.setState({
                markdownContent: '',
                description: '',
                selectedDoctor: ''
            })
        } else {
            toast.warning("Missing Markdown Content")
        }
    }

    handleUpdateContentMarkdown = async () => {
        if (this.state.markdownContent === '') {
            toast.warning("Missing Markdown Content")
        } else {
            await updateDoctorMardownService({
                HTMLContent: this.state.HTMLContent,
                markdownContent: this.state.markdownContent,
                description: this.state.description,
                doctorId: this.state.selectedDoctor.value
            })
            toast.success("Doctor info's just updated")
        }
    }
    handleCancelContentMarkdown = () => {
        this.setState({
            markdownContent: '',
            description: '',
            selectedDoctor: ''
        })
    }

    render() {
        let options = this.buildDataSelect(this.state.listDoctors)
        let { isNewDoctor } = this.state

        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    <FormattedMessage id='manage-doctor.doctor-title' />
                </div>
                <div className='doctor-info'>
                    <div className='content-left form-group'>
                        <label><FormattedMessage id='manage-doctor.choose-doctor' /></label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChange}
                            options={options}
                        />
                    </div>
                    <div className='content-right form-group'>
                        <label><FormattedMessage id='manage-doctor.doctor-info' /></label>
                        <textarea className='form-control' rows='4'
                            onChange={(e) => this.handleOnChangeDescription(e)}
                            value={this.state.description}>

                        </textarea>
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
                    onClick={isNewDoctor === true
                        ? () => this.handleSaveContentMarkdown()
                        : () => this.handleUpdateContentMarkdown()}>
                    {isNewDoctor === true
                        ? <FormattedMessage id='manage-doctor.save' />
                        : <FormattedMessage id='manage-doctor.update' />
                    }
                </button>
                <button className='cancel-content-doctor'
                    onClick={() => this.handleCancelContentMarkdown()}>
                    <FormattedMessage id='manage-doctor.cancel' />
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctors);
