'use client';
// Import necessary React and ethers library functionalities
import React, { useState } from 'react';
import AuthService from './component/metamask/AuthService';
import Web3 from 'web3';

function WalletConnect() {
    const [walletInfo, setWalletInfo] = useState({ address: '', balance: '' });

    if (window.ethereum) {
        window.ethereum.request({ method: 'eth_requestAccounts' })
            .then((accounts) => {
                console.log('Accounts:', accounts);
                // Continue with your logic here
            })
            .catch((error) => {
                console.error('User denied account access:', error);
            });
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

    const connectWallet = async () => {
        if (window.ethereum) { // 检查浏览器是否安装了支持Ethereum的插件，如MetaMask
            const web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.enable(); // 请求用户授权
                const accounts = await web3.eth.getAccounts(); // 获取钱包账户
                const balance = await web3.eth.getBalance(accounts[0]); // 获取账户余额
                const balanceInEther = web3.utils.fromWei(balance, 'ether'); // 将余额从Wei转换为Ether

                setWalletInfo({
                    address: accounts[0],
                    balance: balanceInEther
                });
            } catch (error) {
                console.error('Error connecting to wallet:', error);
            }
        } else {
            alert('Please install MetaMask!');
        }
    };

    return (
        <button onClick={connectWallet}>
            {walletInfo.address ? `Address: ${walletInfo.address} - Balance: ${walletInfo.balance} ETH` : 'Connect Wallet'}
        </button>
    );

    // const [service] = useState(new AuthService());

    // const handleLogin = async () => {
    //     try {
    //         await service.connectWallet();
    //         const signature = await service.signInWithWallet();
    //         console.log('Logged in with signature:', signature);
    //         // 这里可以添加将签名发送到后端进行验证的代码
    //     } catch (error) {
    //         console.error('Login failed:', error);
    //     }
    // };

    // return (
    //     <button onClick={handleLogin}>Sign In with Ethereum Wallet</button>
    // );


    // // State variable to store the user's wallet address
    // const [account, setAccount] = useState('');
    // // Function to handle the connection process
    // const connectWallet = async () => {
    //     // Check if MetaMask is installed by checking if window.ethereum is available
    //     if (typeof window !== 'undefined') {
    //         try {
    //             const w: any = window;
    //             const e: any = ethers;
    //             console.log(e)
    //             // Request account access if MetaMask exists
    //             const provider: any = new e.BrowserProvider(w.ethereum ?? '');
    //             const accounts = await provider.send("eth_requestAccounts", []);
    //             const account = accounts[0];
    //             setAccount(account);  // Set the connected wallet address to the state
    //             console.log('Connected:', account);
    //         } catch (error) {   
    //             // Handle any errors that occur during the connection process
    //             console.error('Connection failed:', error);
    //         }
    //     } else {
    //         // Prompt user to install MetaMask if it's not installed
    //         alert('Ethereum wallet is not available. Please install MetaMask!');
    //     }
    // };

    // return (
    //     <div>
    //         <button onClick={connectWallet} className="font-mono font-bold">
    //             Connect Wallet
    //         </button>
    //         {account && <p>Connected Account: {account}</p>}
    //     </div>
    // );
}

export default WalletConnect;
