import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGE } from '../../../utils'
import { changeLanguageApp } from './../../../store/actions/appActions';
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom';






class HomeHeader extends Component {
    handleOnClickChangeLanguage = (language) => {
        //fire redux event: actions
        this.props.changeLanguageAppRedux(language)

    }
    handleClickBackHome = () => {
        if (this.props.history) this.props.history.push('/home')
    }
    render() {
        // console.log('>>>check redux props:', this.props);
        let language = this.props.language;
        return (
            <>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'
                            onClick={() => this.handleClickBackHome()}>
                            <i className="fas fa-bars"></i>
                            <div className='header-logo'></div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.specialty" /></b></div>
                                <div className='sub-title'><FormattedMessage id="home-header.search-doctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.facilities" /></b></div>
                                <div className='sub-title'><FormattedMessage id="home-header.choose-facilities" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.doctor" /></b></div>
                                <div className='sub-title'><FormattedMessage id="home-header.find-doctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="home-header.package" /></b></div>
                                <div className='sub-title'><FormattedMessage id="home-header.health-check" /></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <i className="fas fa-question-circle"></i>
                            <div className='support'><FormattedMessage id="home-header.support" /></div>
                            <div>
                                <div
                                    className={language === LANGUAGE.EN ? 'language-en active' : 'language-en'}
                                    onClick={() => this.handleOnClickChangeLanguage(LANGUAGE.EN)}
                                ><b>EN</b></div>
                                <div
                                    className={language === LANGUAGE.FR ? 'language-fr active' : 'language-fr'}
                                    onClick={() => this.handleOnClickChangeLanguage(LANGUAGE.FR)}
                                ><b>FR</b></div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <h1 className='title1'>
                                <FormattedMessage id="home-header.medical-background" />
                            </h1>
                            <h1 className='title2'>
                                <FormattedMessage id="home-header.comprehensive" />
                            </h1>
                            <div className='search'>
                                <i className="fas fa-search"></i>
                                <input
                                    className='search-box'
                                    type='text'
                                    placeholder={language === LANGUAGE.EN ? 'Find a doctor' : 'Trouver un médecin'} />
                            </div>
                        </div>
                        <div className='content-down'>
                            <div className='icon-block'>
                                <div className='icon'>
                                    <img className='img' src={require('../../../assets/icon1-specialist-examination.png').default} />
                                </div>
                                <Link to='/introduction-articles?name=specialist' style={{ textDecoration: 'none', color: 'inherit', }}>
                                    <div className='text'><FormattedMessage id="home-header.specialist-exam" /></div>
                                </Link>
                            </div>
                            <div className='icon-block'>
                                <div className='icon'>
                                    <img className='img' src={require('../../../assets/icon2-remote-examination.png').default} />
                                </div>
                                <Link to='/introduction-articles?name=remote' style={{ textDecoration: 'none', color: 'inherit', }}>
                                    <div className='text'><FormattedMessage id="home-header.remote-exam" /></div>
                                </Link>
                            </div>
                            <div className='icon-block'>
                                <div className='icon'>
                                    <img className='img' src={require('../../../assets/icon3-general-examination.png').default} />
                                </div>
                                <Link to='/introduction-articles?name=general' style={{ textDecoration: 'none', color: 'inherit', }}>
                                    <div className='text'><FormattedMessage id="home-header.general-exam" /></div>
                                </Link>
                            </div>
                            <div className='icon-block'>
                                <div className='icon'>
                                    <img className='img' src={require('../../../assets/icon4-medical-test.png').default} />
                                </div>
                                <Link to='/introduction-articles?name=medical' style={{ textDecoration: 'none', color: 'inherit', }}>
                                    <div className='text'><FormattedMessage id="home-header.medical-test" /></div>
                                </Link>
                            </div>
                            <div className='icon-block'>
                                <div className='icon'>
                                    <img className='img' src={require('../../../assets/icon5-mental-health.png').default} />
                                </div>
                                <Link to='/introduction-articles?name=mental' style={{ textDecoration: 'none', color: 'inherit', }}>
                                    <div className='text'><FormattedMessage id="home-header.mental-health" /></div>
                                </Link>
                            </div>
                        </div>
                    </div>
                }
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
