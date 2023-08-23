import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSpecialty.scss'
import { LANGUAGE, CommonUtils } from '../../../utils'
import { FormattedMessage } from 'react-intl';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { postCreateNewSpecialty } from '../../../services/userService';
import { toast } from 'react-toastify';



class ManageSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            previewImgURL: '',
            isOpen: false,
            specialtyName: '',
            markdownSpecialty: '',
            HTMLSpecialty: '',
            specialtyImage: '',
        }
    }
    async componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    //================= Preview Image=================
    handleOnChangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64file = await CommonUtils.convertBlobToBase64(file)
            // console.log('>>>check base64', base64file)
            //Ta sẽ tạo một link HTML (blob) của ảnh này
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objectUrl,
                specialtyImage: base64file,
            })
        }
        // console.log('>>>check image:', objectUrl)
    }
    handleOpenPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }
    //================= Preview Image=================
    //================= Markdown Editor=================
    mdParser = new MarkdownIt(/* Markdown-it options */);
    // Finish!
    handleEditorChange = ({ html, text }) => {
        console.log('handleEditorChange', html, text);
        this.setState({
            markdownSpecialty: text,
            HTMLSpecialty: html,
        })
    }
    //================= Markdown Editor=================
    handleOnChangeSpecialtyName = (e) => {
        this.setState({
            specialtyName: e.target.value
        })
    }

    handleOnClickSave = async () => {
        let res = await postCreateNewSpecialty(this.state)
        if (res?.errCode === 0) {
            toast.success(`You're just add a new specialty`)
        }
        else {
            toast.warning(res.errMessage)
        }
    }
    render() {
        let { previewImgURL, isOpen, specialtyName } = this.state
        console.log('>>>>check state ManageSpecialty:', this.state)
        return (
            <>
                <div className='manage-specialty-container'>
                    <div className='title'>
                        <FormattedMessage id='admin.manage-specialty.title' />
                    </div>
                    <div className='manage-specialty-content'>
                        <div className='specialty-name'>
                            <div className='specialty-name col-12 form-group ml-3'>
                                <label>
                                    Specialty name in English
                                </label>
                                <input className='form-control'
                                    value={this.state.specialtyName}
                                    onChange={(e) => this.handleOnChangeSpecialtyName(e)} />
                            </div>
                            <div className='specialty-name col-12 form-group ml-3'>
                                <label>
                                    Nom de la spécialité en français
                                </label>
                                <input className='form-control'
                                    value={this.state.specialtyName}
                                    onChange={(e) => this.handleOnChangeSpecialtyName(e)} />
                            </div>
                        </div>
                        <div className='preview-image-container-specialty col-6 form-group'>
                            <div className='left-content'>
                                <label>
                                    <FormattedMessage id='admin.manage-specialty.image' />
                                </label>
                                {/* ====go together */}
                                <input id='previewImg' type='file' hidden
                                    onChange={(e) => this.handleOnChangeImage(e)} />
                                <label className='upload-button' htmlFor='previewImg'>
                                    <span>Image</span>
                                    <i className="fas fa-upload"></i></label>
                                {/* ====go together */}

                            </div>
                            <div className='right-content'>
                                <div className='preview-image'
                                    style={{ backgroundImage: `url(${previewImgURL}` }}
                                    onClick={() => this.handleOpenPreviewImage()}
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className='markdown-content col-12'>
                        <p>Specialty content in English</p>
                        <MdEditor
                            style={{ height: '300px' }}
                            renderHTML={text => this.mdParser.render(text)}
                            onChange={this.handleEditorChange} />

                    </div>
                    <div className='markdown-content col-12'>
                        <p>Contenu spécialisé en français</p>
                        <MdEditor
                            style={{ height: '300px' }}
                            renderHTML={text => this.mdParser.render(text)}
                            onChange={this.handleEditorChange} />

                    </div>
                    <button className='btn btn-primary'
                        onClick={() => this.handleOnClickSave()}
                    >
                        <FormattedMessage id='admin.manage-specialty.save' />
                    </button>
                </div>

                {
                    isOpen === true &&
                    <Lightbox
                        mainSrc={previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </>
        )

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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
