import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss'
import { LANGUAGE, CommonUtils } from '../../../../utils'
import { FormattedMessage } from 'react-intl';
// import { Modal } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import DoctorProfile from '../DoctorProfile';
import _ from 'lodash'

class BookingModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    async componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    toggleModal = () => {
        this.props.toggleModalParent()
    };
    render() {
        let { dataTime } = this.props
        console.log('check modal', this.props)
        let dataTimeParent = dataTime && !_.isEmpty(dataTime) ? dataTime : {}
        return (
            <div>
                {/* <Button color="primary" onClick={this.toggleModal}>
                    Open Modal
                </Button> */}
                <Modal isOpen={this.props.isOpenParent}
                    centered size='lg'>
                    <ModalHeader toggle={this.toggleModal}>
                        Booking a test
                    </ModalHeader>
                    <ModalBody>
                        <Col md={12}>
                            <DoctorProfile
                                dataTimeParent={dataTimeParent}
                                // doctorIdParent={doctorIdParent}
                                isDoctorDescription={false} />
                        </Col>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="name">
                                        <FormattedMessage id='patient.detail-doctor.name' />
                                    </Label>
                                    <Input type="text" id="name" />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="phoneNumber">
                                        <FormattedMessage id='patient.detail-doctor.phone-number' />
                                    </Label>
                                    <Input type="number" id="phoneNumber" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input type="email" id="email" />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="address">
                                        <FormattedMessage id='patient.detail-doctor.address' />
                                    </Label>
                                    <Input type="text" id="address" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="bookFor">
                                        <FormattedMessage id='patient.detail-doctor.book-for' />
                                    </Label>
                                    <Input type="text" id="bookFor" />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="gender">
                                        <FormattedMessage id='patient.detail-doctor.gender' />
                                    </Label>
                                    <Input type="text" id="gender" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <FormGroup>
                                    <Label for="location">
                                        <FormattedMessage id='patient.detail-doctor.test-type' />
                                    </Label>
                                    <Input type="text" id="location" />
                                </FormGroup>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary">Confirm</Button>
                        <Button color="secondary" onClick={this.toggleModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
