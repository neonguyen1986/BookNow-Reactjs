import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
class UserRedux extends Component {

    constructor(prop) {
        super(prop)
        this.state = {

        }
    }

    componentDidMount() {
    }


    render() {
        return (
            <div className="user-redux-container" >
                <div className='title'>
                    Redux User Management
                </div>
                <div className='user-redux-body'>
                    <div>Add New User</div>
                </div>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
