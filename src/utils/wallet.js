
import { providers, ethers } from 'ethers';
import { CONFIG } from "../config/config"
import { networks } from '../config/network';

var walletGlobal = {
    signer: null,
    provider: null,
    wallet: "",
}

async function connectWithEther() {
    const { ethereum } = window
    if (!ethereum) {
        alert('Must connect to MetaMask!')
        return
    }

    const provider = new ethers.providers.Web3Provider(ethereum)
    const { chainId } = await provider.getNetwork();
    if (chainId != networks['GodwokenTestnet'].chainId) {
        await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
                {
                    ...networks['GodwokenTestnet']
                }
            ]
        });
    }

    const address = (await ethereum.request({ method: 'eth_requestAccounts' }))[0]
    let signer = provider.getSigner()
    walletGlobal.signer = signer
    walletGlobal.provider = provider
    walletGlobal.wallet = "MetaMask"

    return address
}

async function connectWalletconnect() {
    var provider = new WalletConnectProvider.default({
        rpc: {
            71401: "https://v1.testnet.godwoken.io/rpc",
        },
    })
    await provider.enable()
    const web3Provider = new providers.Web3Provider(provider)
    const signer = await web3Provider.getSigner()
    const address = await signer.getAddress()

    walletGlobal.signer = signer
    walletGlobal.provider = provider
    walletGlobal.wallet = "WalletConnect"

    provider.on('accountsChanged', (accounts) => {
        // console.log(accounts)
    })

    // Subscribe to chainId change
    provider.on('chainChanged', (chainId) => {
        // console.log(chainId)
    })

    // Subscribe to session disconnection
    provider.on('disconnect', (code, reason) => {
        // console.log(code, reason)
        location.reload()
    })

    return address
}

export default function UseWallet() {
    return {
        walletGlobal,
        connectWithEther,
        connectWalletconnect,
    }
}