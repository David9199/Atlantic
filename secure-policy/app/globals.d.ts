// globals.d.ts
import Web3 from 'web3';

declare global {
    interface Window {
        ethereum: {
            isMetaMask?: boolean;
            request: (args: { method: string, params?: any[] }) => Promise<any>;
            on: (event: string, callback: (...args: any[]) => void) => void;
        };
        web3: Web3;
    }
}

export { };
