'use client';
// Import necessary React and ethers library functionalities
import React, { useState } from 'react';
// import AuthService from './component/metamask/AuthService';
import { ethers } from "ethers";


async function Block01() {

    const ALCHEMY_GOERLI_URL = 'https://eth-mainnet.g.alchemy.com/v2/v1AOvdju7jkXJwLFiFrYWsICKizHvjvR';
    const provider = new ethers.JsonRpcProvider(ALCHEMY_GOERLI_URL);

    // WETH ABI，只包含我们关心的Transfer事件
    const abiWETH = [
        "event Transfer(address indexed from, address indexed to, uint amount)"
    ];

    // 测试网WETH地址
    const addressWETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
    // 声明合约实例
    const contract = new ethers.Contract(addressWETH, abiWETH, provider)

    // 获取过去10个区块内的Transfer事件
    console.log("\n1. 获取过去10个区块内的Transfer事件，并打印出1个");
    // 得到当前block
    const block = await provider.getBlockNumber()
    console.log(`当前区块高度: ${block}`);
    console.log(`打印事件详情:`);
    const transferEvents = await contract.queryFilter('Transfer', block - 10, block)
    // 打印第1个Transfer事件
    console.log(transferEvents[0])

    // 解析Transfer事件的数据（变量在args中）
    console.log("\n2. 解析事件：")
    const amount = ethers.formatUnits(ethers.getBigInt(transferEvents[0].args["amount"]), "ether");
    console.log(`地址 ${transferEvents[0].args["from"]} 转账${amount} WETH 到地址 ${transferEvents[0].args["to"]}`)

    const formatAddress = (address: any) => {
        return `${address.substring(0, 4)}...${address.substring(address.length - 6)}`;
    };

    return (
        <button onClick={Block01}>
            Block test
        </button>
    );
}

export default Block01;
