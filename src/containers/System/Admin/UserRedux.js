import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGE } from '../../../utils'

class UserRedux extends Component {

    constructor(prop) {
        super(prop)
        this.state = {
            genderArr: []
        }
    }

    async componentDidMount() {
        try {
            let data = await getAllCodeService('gender')
            // console.log('check Allcode type:', res)
            if (data && data.errCode === 0) {
                this.setState({
                    genderArr: data.res
                })
            }

        } catch (error) {
            console.log(error)
        }
    }

    render() {
        let { genderArr } = this.state;
        let language = this.props.language
        return (
            <div className="user-redux-container" >
                <div className='title'>
                    Redux User Management
                </div>
                <div className='user-redux-body'>
                    <div className='container'>{/* giúp chừa khoảng trống 2 bên content*/}
                        <div className='col-12 my-3'>
                            <FormattedMessage id='manage-user.add' />
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                <label><FormattedMessage id='manage-user.email' /></label>
                                <input className='form-control' type='email' />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id='manage-user.password' /></label>
                                <input className='form-control' type='password' />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id='manage-user.first-name' /></label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id='manage-user.last-name' /></label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.phone-number' /></label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id='manage-user.address' /></label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.gender' /></label>
                                <select className="form-control">
                                    {genderArr && genderArr.length > 0 &&
                                        genderArr.map(item => {
                                            return (
                                                <option key={item.id}>{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.position' /></label>
                                <select className="form-control">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.role-id' /></label>
                                <select className="form-control">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.image' /></label>
                                <input className='form-control' type='text' />
                            </div>
                        </div>
                        <button className='btn btn-primary my-3'><FormattedMessage id='manage-user.save' /></button>

                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
