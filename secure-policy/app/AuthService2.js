import Web3 from 'web3';

class AuthService2 {
    constructor() {
        if (window.ethereum) {
            this.web3 = new Web3(window.ethereum);
        } else {
            console.error('Please install MetaMask to use this feature.');
        }
    }

    // 请求用户授权并连接钱包
    async connectWallet() {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            this.account = accounts[0];
            console.log('Connected:', this.account);
            return this.account;
        } catch (error) {
            console.error('User denied account access:', error);
        }
    }

    // 使用用户钱包地址进行签名
    async signInWithWallet() {
        if (!this.account) {
            await this.connectWallet();
        }

        try {
            const signature = await this.web3.eth.personal.sign(
                'Please sign this message to confirm your identity.',
                this.account,
                ''  // 密码字段通常留空
            );

            console.log('Signature:', signature);
            return signature;
        } catch (error) {
            console.error('Signing failed:', error);
        }
    }
}

export default AuthService2;
