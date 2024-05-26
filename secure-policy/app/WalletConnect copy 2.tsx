'use client';
// Import necessary React and ethers library functionalities
import React, { useState } from 'react';
import AuthService2 from './AuthService2';
import Web3 from 'web3';

function WalletConnect() {
    // const [walletInfo, setWalletInfo] = useState({ address: '', balance: '' });

    // if (window.ethereum) {
    //     window.ethereum.request({ method: 'eth_requestAccounts' })
    //         .then((accounts) => {
    //             console.log('Accounts:', accounts);
    //             // Continue with your logic here
    //         })
    //         .catch((error) => {
    //             console.error('User denied account access:', error);
    //         });
    // } else {
    //     console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    // }

    // const connectWallet = async () => {
    //     if (window.ethereum) { // 检查浏览器是否安装了支持Ethereum的插件，如MetaMask
    //         const web3 = new Web3(window.ethereum);
    //         try {
    //             await window.ethereum.enable(); // 请求用户授权
    //             const accounts = await web3.eth.getAccounts(); // 获取钱包账户
    //             const balance = await web3.eth.getBalance(accounts[0]); // 获取账户余额
    //             const balanceInEther = web3.utils.fromWei(balance, 'ether'); // 将余额从Wei转换为Ether

    //             setWalletInfo({
    //                 address: accounts[0],
    //                 balance: balanceInEther
    //             });
    //         } catch (error) {
    //             console.error('Error connecting to wallet:', error);
    //         }
    //     } else {
    //         alert('Please install MetaMask!');
    //     }
    // };

    // return (
    //     <button onClick={connectWallet}>
    //         {walletInfo.address ? `Address: ${walletInfo.address} - Balance: ${walletInfo.balance} ETH` : 'Connect Wallet'}
    //     </button>
    // );

    const [service] = useState(new AuthService2());
    const [account, setAccount] = useState('');


    const handleLogin = async () => {
        try {
            await service.connectWallet();
            const signature = await service.signInWithWallet();
            console.log('Logged in with signature:', signature);
            // 这里可以添加将签名发送到后端进行验证的代码
            // setAccount
            const accounts = await web3.eth.getAccounts(); // 获取钱包账户
            const balance = await web3.eth.getBalance(accounts[0]); // 获取账户余额
            const balanceInEther = web3.utils.fromWei(balance, 'ether'); // 将余额从Wei转换为Ether
            setAccount(account);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const formatAddress = (address: any) => {
        return `${address.substring(0, 4)}...${address.substring(address.length - 6)}`;
    };

    return (
        <div>
            <button onClick={handleLogin}>Sign In with Ethereum Wallet</button>
            {account && (
                <p>Address: {formatAddress(account)}</p> // 在这里调用 formatAddress 并传入 account
            )}
        </div>
    );

}

export default WalletConnect;
