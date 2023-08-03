import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions"
import { toast } from 'react-toastify';
import './ManageDoctors.scss'

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
            selectedDoctor: '',
            description: '',
        }
    }
    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    //================= Markdown Editor=================
    mdParser = new MarkdownIt(/* Markdown-it options */);
    // Finish!
    handleEditorChange = ({ html, text }) => {
        // console.log('handleEditorChange', html, text);
        this.setState({
            HTMLContent: text,
            markdownContent: html
        })
    }
    //================= React Select=================
    options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor }, () =>
            console.log(`Option selected:`, this.state.selectedDoctor)
        );
    };
    //================================================
    handleOnChangeDescription = (e) => {
        this.setState({
            description: e.target.value,
        })
    }

    handleSaveContentMarkdown = () => {
        console.log('check state:', this.state)
    }

    render() {


        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    Create Doctor information
                </div>
                <div className='doctor-info'>
                    <div className='content-left form-group'>
                        <label>Choose Doctor</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChange}
                            options={this.options}
                        />
                    </div>
                    <div className='content-right form-group'>
                        <label>Referral information about the doctor</label>
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
                        onChange={this.handleEditorChange} />

                </div>
                <button
                    className='save-content-doctor'
                    onClick={() => this.handleSaveContentMarkdown()}>
                    Save
                </button>
            </div>
        );
    }

}



const mapStateToProps = state => {
    return {
        getAllUserRedux: state.admin.users,
        getOneUserRedux: state.admin.oneuser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //CRUD Redux
        fetchAllUsersStart: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (data) => dispatch(actions.deleteUser(data)),
        getUserStartRedux: (id) => dispatch(actions.getUserStart(id)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctors);
