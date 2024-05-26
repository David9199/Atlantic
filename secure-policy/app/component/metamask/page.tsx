"use client";
import React from 'react';
import './App.css';
import MetaMaskAuth from "./metamask-auth.client";
import MetaMaskLogo from "./favicon.svg"

export default function Home() {
    const a = () => {
        console.log(123)
    }
    return (
        <main>
            <div className="logoContainer">
                <img src={MetaMaskLogo} height={90} />
            </div>
            <MetaMaskAuth onAddressChanged={(a: any) => {
                console.log(a)

            }} />
            {/* <MetaMaskAuth a={a}/> */}
        </main>
    );
}
