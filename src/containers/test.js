import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';



class Test extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1,
        }
    }
    async componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let userRedux = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
            11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
            21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
            31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
            41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
            51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
            61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
            71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
            81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
            91, 92, 93, 94, 95, 96, 97, 98, 99, 100]

        let currentPage = this.state.currentPage
        const itemPerPage = 10;
        const startIndex = (currentPage - 1) * itemPerPage;
        const endIndex = startIndex + itemPerPage;

        const currentItems = userRedux.slice(startIndex, endIndex)


        return (
            <>
                <table id="TableManageUser">
                    <thead>
                        <tr>
                            <th>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems?.length > 0 &&
                            currentItems.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item}</td>
                                    </tr>

                                )
                            })}
                    </tbody>
                </table>
                <div className='pagination-controls'>
                    {currentPage > 1 &&
                        <button onClick={() => this.setState({ currentPage: currentPage - 1 })}>Previous</button>
                    }
                    <span>{currentPage}</span>
                    {currentPage < Math.ceil(userRedux.length / itemPerPage) && (
                        <button onClick={() => this.setState({ currentPage: currentPage + 1 })}>Next</button>
                    )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Test);
