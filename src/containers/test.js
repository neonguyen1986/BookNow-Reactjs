// import React, { Component } from 'react';
// import { connect } from "react-redux";
// import { FormattedMessage } from 'react-intl';



// class Test extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             currentPage: 1,
//         }
//     }
//     async componentDidMount() {

//     }

//     componentDidUpdate(prevProps, prevState, snapshot) {

//     }

//     render() {
//         return (
//             <>
//                 abc
//             </>
//         )
//     }

// }

// const mapStateToProps = state => {
//     return {
//         language: state.app.language,

//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {

//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Test);


import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function Example(args) {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <div>
            <Button color="danger" onClick={toggle}>
                Click Me
            </Button>
            <Modal isOpen={modal} toggle={toggle} {...args}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    Lorem ipsum dolor sit amet
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>
                        Do Something
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default Example;