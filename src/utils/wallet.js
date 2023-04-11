
import { providers, ethers } from 'ethers';
import { CONFIG } from "../config/config"

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
    console.log('connectWithEther chainId', chainId)
    // check network    
    if (chainId != CONFIG.ChainId) {
        ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
                chainId: '0x116e9',
                rpcUrls: ["https://godwoken-testnet-v1.ckbapp.dev"],
                chainName: "Godwoken Testnet v1",
                nativeCurrency: {
                    name: "pCKB",
                    symbol: "pCKB",
                    decimals: 18
                },
                blockExplorerUrls: ["https://gw-testnet-explorer.nervosdao.community"]
            }]
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