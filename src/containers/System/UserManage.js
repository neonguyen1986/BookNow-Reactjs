import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers, createNewUserService } from '../../services/userService'
import UserModal from './UserModal';

class UserManage extends Component {

    constructor(props) {
        super(props);//without this line, the this.props will return 'undefined' 
        this.state = {
            arrUser: [],
            isOpenUserModal: false
        }
    }

    //===========get user from Node and assign to arrUser===========
    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    //=============READ===========
    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL')
        // console.log('>>>get user from node.js:', response)
        if (response && response.errCode === 0) {
            this.setState({
                arrUser: response.user
            })
        }
    }

    //===========click Add New User Button Event===========
    handleAddNewUser = () => {
        this.setState({
            isOpenUserModal: true
        })
    }
    //===========toggle action for UserModal.js===========
    toggleUserModal = () => {
        this.setState({
            isOpenUserModal: !this.state.isOpenUserModal
        })
    }

    //===========CREATE============
    createNewUserDad = async (data) => {
        try {
            let res = await createNewUserService(data);
            // console.log('Error message:', res)

            //for auto reload data in Manage User page
            if (res && res.errCode === 0) {
                await this.getAllUsersFromReact()
                this.setState({
                    isOpenUserModal: false
                })
            }
            alert(res.errMessage)
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        let arrUser = this.state.arrUser
        // console.log('check user:', arrUser)

        return (
            <div className="user-container">
                <UserModal
                    isOpen={this.state.isOpenUserModal}
                    toggleFromParent={this.toggleUserModal}
                    createNewUserDad={this.createNewUserDad}
                />
                <div className='title text-center'>
                    MANAGE USER
                </div>
                <div className='mx-1 '>
                    <button
                        className='btn btn-primary px-3'
                        onClick={() => this.handleAddNewUser()}>
                        <i className="fas fa-plus">&nbsp; </i>
                        Add New Users
                    </button>
                </div>
                <div className='user-table mt-3 mx-2'>
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrUser && arrUser.length > 0 && arrUser.map(item => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <div>
                                                <button className='btn-edit'><i className="fas fa-edit"></i></button>
                                                <button className='btn-delete'><i className="fas fa-trash-alt"></i></button>
                                            </div>
                                        </td>
                                    </tr>

                                )
                            })}
                        </tbody>


                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
