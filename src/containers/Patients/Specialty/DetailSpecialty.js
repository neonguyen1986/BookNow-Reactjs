import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailSpecialty.scss'
import { LANGUAGE, CommonUtils } from '../../../utils'
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../Auth/HomePage/HomeHeader';


class DetailSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    async componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                />
                <div>
                    hello from DetailSpecialty
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
