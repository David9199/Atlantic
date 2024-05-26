import React, { Component } from 'react';
import Web3 from 'web3';

class CusComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            web3: null,
        };
    }

    componentDidMount() {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            this.setState({ web3 });
        } else {
            console.error('Please install MetaMask to use this feature.');
        }
    }

    render() {
        return (
            <div>
                {/* Your component code */}
                {this.state.web3 ? 'Web3 is initialized' : 'Web3 is not available'}
            </div>
        );
    }
}

export default MyComponent;
