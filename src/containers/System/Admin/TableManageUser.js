import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions"
import './TableManageUser.scss'
import { toast } from 'react-toastify';

class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRedux: [],
            currentPage: 1,
        }
    }
    componentDidMount() {
        this.props.fetchAllUsersStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.getAllUserRedux !== this.props.getAllUserRedux)
            this.setState({
                userRedux: this.props.getAllUserRedux
            })
    }

    handleOnClickDelete = async (id) => {
        await this.props.deleteUserRedux(id)
        await this.props.fetchAllUsersStart()
        toast.success("User deleted")
    }
    handleOnClickEdit = async (id) => {
        await this.props.getUserStartRedux(id)
        let user = await this.props.getOneUserRedux
        this.props.updateForm(user)
    }

    render() {
        let userRedux = this.state.userRedux;
        // let userRedux = this.props.getAllUserRedux

        //VARIABLES FOR PAGING
        let currentPage = this.state.currentPage
        const itemPerPage = 5;
        const startIndex = (currentPage - 1) * itemPerPage;
        const endIndex = startIndex + itemPerPage;
        const currentItems = userRedux.slice(startIndex, endIndex)

        return (
            <>
                <div >
                    <div className='user-table mt-3'>
                        <table id="TableManageUser">
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
                                {currentItems?.length > 0 &&
                                    currentItems.map(item => {
                                        return (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.email}</td>
                                                <td>{item.firstName}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.address}</td>
                                                <td>
                                                    <div>
                                                        <button
                                                            className='btn-edit'
                                                            onClick={() => this.handleOnClickEdit(item.id)}
                                                        >
                                                            <i className="fas fa-edit"></i>
                                                        </button>
                                                        <button
                                                            className='btn-delete'
                                                            onClick={() => this.handleOnClickDelete(item.id)}
                                                        >
                                                            <i className="fas fa-trash-alt"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>

                                        )
                                    })}
                            </tbody>


                        </table>
                        <div className='user-redux-pagination-controls'>
                            {currentPage > 1
                                ? <button className='prev-btn' onClick={() => this.setState({ currentPage: currentPage - 1 })}><i className="fas fa-arrow-left"></i></button>
                                : <span className='prev-btn'></span>
                            }
                            <span className='number'>{currentPage}</span>
                            {currentPage < Math.ceil(userRedux.length / itemPerPage)
                                ? <button className='next-btn' onClick={() => this.setState({ currentPage: currentPage + 1 })}><i className="fas fa-arrow-right"></i></button>
                                : <span className='next-btn'></span>
                            }
                        </div>
                    </div>
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
