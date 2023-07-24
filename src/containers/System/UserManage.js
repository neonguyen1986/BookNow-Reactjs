import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers } from '../../services/userService'

class UserManage extends Component {

    constructor(props) {
        super(props);//without this line, the this.props will return 'undefined' 
        this.state = {
            arrUser: [],
        }
    }

    async componentDidMount() {
        let response = await getAllUsers('ALL')
        console.log('>>>get user from node.js:', response)
        if (response && response.errCode === 0) {
            this.setState({
                arrUser: response.user
            })
        }
    }


    render() {
        let arrUser = this.state.arrUser
        console.log('check user:', arrUser)

        return (
            <div className="user-container">
                <div className='title text-center'>
                    MANAGE USER
                </div>
                <div className='user-table mt-3 mx-2'>
                    <table id="customers">
                        <thead>
                            <tr>
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
