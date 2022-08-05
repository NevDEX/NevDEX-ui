import Web3 from 'web3';
import { ethers, Contract, utils } from 'ethers';

const web3 = new Web3(window.web3.currentProvider);

var walletGlobal = {
    account: "",
}

async function connect() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        console.log("new web3")
        try {
            await window.ethereum.enable();
        } catch (error) {
            console.error("User denied account access...")
        }
    }
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
    }
    else {
        console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
    }

    let chainId = await web3.eth.getChainId();
    // if (chainId != 43113) {
    //     window.ethereum.request({
    //         method: 'wallet_addEthereumChain',
    //         params: [
    //             {
    //                 chainId: '0xa869',
    //                 chainName: 'Avalanche Fuji Testnet',
    //                 rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    //                 iconUrls: [''],
    //                 blockExplorerUrls: ['https://testnet.snowtrace.io'],
    //                 nativeCurrency: {
    //                     name: 'AAVX',
    //                     symbol: 'AAVX',
    //                     decimals: 18,
    //                 },
    //             },
    //         ],
    //     })
    // }

    const accounts = await web3.eth.getAccounts()
    walletGlobal.account = accounts[0]
    window.ethereum.on("accountsChanged", async ([selectedAccount]) => {
        const accounts = await web3.eth.getAccounts();
        console.log("updateAccount", accounts)
        // walletGlobal.account = accounts[0]
        // store.dispatch('updateLoginAccount', { account: walletGlobal.account })
    });
}

async function connectWithEther() {
    const { ethereum } = window
    if (!ethereum) {
        alert('Must connect to MetaMask!')
        return
    }
    const account = await ethereum.request({ method: 'eth_requestAccounts' })
    console.log('connectWithEther Connected: ', account[0])
    walletGlobal.account = account[0]
    const provider = new ethers.providers.Web3Provider(ethereum)
    const { chainId } = await provider.getNetwork();
    walletGlobal.chainId = chainId
    console.log('connectWithEther', account, chainId)
}

export default function UseWallet() {
    return {
        connect,
        web3,
        walletGlobal,
        connectWithEther,
    }
}