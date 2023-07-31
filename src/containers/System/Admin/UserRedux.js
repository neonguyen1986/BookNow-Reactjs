import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGE } from '../../../utils'
import * as actions from "../../../store/actions"

class UserRedux extends Component {

    constructor(prop) {
        super(prop)
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: []
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux)
            this.setState({
                genderArr: this.props.genderRedux
            })

        if (prevProps.positionRedux !== this.props.positionRedux)
            this.setState({
                positionArr: this.props.positionRedux
            })

        if (prevProps.roleRedux !== this.props.roleRedux)
            this.setState({
                roleArr: this.props.roleRedux
            })
    }

    render() {
        // let { genderArr } = this.state;
        let language = this.props.language
        let { genderArr, positionArr, roleArr } = this.state
        let isLoadingGenderReact = this.props.isLoadingGenderRedux
        console.log('>>>check position', this.state)
        return (
            <div className="user-redux-container" >
                <div className='title'>
                    Redux User Management
                </div>
                {isLoadingGenderReact === true
                    ?
                    <div> Loading...</div>
                    :
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
                                        {positionArr?.length > 0 &&
                                            positionArr.map(item => {
                                                return (
                                                    <option key={item.id}>{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                                )
                                            })}
                                    </select>
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id='manage-user.role-id' /></label>
                                    <select className="form-control">
                                        {roleArr?.length > 0 &&
                                            roleArr.map(item => {
                                                return (
                                                    <option key={item.id}>{language === LANGUAGE.VI ? item.valueVi : item.valueEn}</option>
                                                )
                                            })}
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
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGenderRedux: state.admin.isLoadingGender,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
