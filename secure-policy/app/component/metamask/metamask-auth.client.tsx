'use client';
import React, { useEffect, useState } from "react";
// import styles from "./metamask-auth.module.css";
// import AuthService from './AuthService';

import Web3 from 'web3';

// const [service] = useState(new AuthService());

function isMobileDevice() {
    return 'ontouchstart' in window || 'onmsgesturechange' in window;
}

async function connect(onConnected: any) {
    if (!window.ethereum) {
        alert("Get MetaMask!");
        return;
    }

    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
    });

    onConnected(accounts[0]);
}

async function checkIfWalletIsConnected(onConnected: any, setBalance: any) {
    // 检查浏览器是否安装了 MetaMask
    if (window.ethereum) {
        if (typeof window.web3 === 'undefined') {
            window.web3 = new Web3(window.ethereum);
        }
        console.log("1");
        // window.web3.eth.requestAccounts().then(console.log);


        console.log(window.web3);

        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });

        if (accounts.length > 0) {
            console.log("2");

            const account = accounts[0];
            onConnected(account);
            console.log("3");

            const balanceInWei = await window.ethereum.request({
                method: 'eth_getBalance',
                params: [account, 'latest'],
            });
            console.log("4");

            var balance1 = await window.web3.eth.getBalance(account);
            console.log(balance1);

            const balanceInWei2 = await window.web3.eth.getBalance(account);
            console.log(balanceInWei2);

            const balanceInEth = window.web3.utils.fromWei(balanceInWei, "ether");
            setBalance(balanceInEth);

            return;
        }

        if (isMobileDevice()) {
            await connect(onConnected);
        }
    }
}


type MetaMaskAuthProps = {
    onAddressChanged: (address: string) => void;
};

// export default function MetaMaskAuth(onAddressChanged: (onAddressChanged: any) => void) {
export default function MetaMaskAuth({ onAddressChanged }: MetaMaskAuthProps) {

    // console.log(onAddressChanged)
    const [userAddress, setUserAddress] = useState("");
    const [balance, setBalance] = useState("");


    useEffect(() => {
        checkIfWalletIsConnected(setUserAddress, setBalance);
    }, []);

    useEffect(() => {
        onAddressChanged(userAddress);
    }, [userAddress]);

    //     setAddress(newAddress);
    // console.log('Address changed to:', newAddress);

    return userAddress ? (
        <div>
            Connected with <Address userAddress={userAddress} balance={balance} />
        </div>
    ) : (
        <Connect setUserAddress={setUserAddress} />
    );
}


function Connect({ setUserAddress }: { setUserAddress: any }) {
    if (isMobileDevice()) {
        const dappUrl = "metamask-auth.ilamanov.repl.co"; // TODO enter your dapp URL. For example: https://uniswap.exchange. (don't enter the "https://")
        const metamaskAppDeepLink = "https://metamask.app.link/dapp/" + dappUrl;
        return (
            <a href={metamaskAppDeepLink}>
                <button className="font-mono font-bold">
                    Connect to MetaMask
                </button>
            </a>
        );
    }


    return (
        <button className="font-mono font-bold" onClick={() => connect(setUserAddress)}>
            Connect to MetaMask
        </button>
    );
}


function Address({ userAddress, balance }: { userAddress: any, balance: any }) {
    return (
        <span className="font-mono font-bold">{userAddress.substring(0, 5)}…{userAddress.substring(userAddress.length - 4)} - Balance: ${balance} ETH</span>
    );
}