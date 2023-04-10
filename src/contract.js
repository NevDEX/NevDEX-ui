import { ethers, Contract, utils } from 'ethers';
import { getPermitSignature } from "./utils/sign"
import { CONFIG } from "./config/config"
import IERC20 from "./abi/IERC20.json"
import Vault from "./abi/vault.json"
import FaucetToken from "./abi/faucet_token.json"
import UseWallet from './wallet'

async function approve(tokenAddress, amount) {
    // console.log('approve', tokenAddress, amount, ethers.utils.parseEther(amount))
    const { walletGlobal } = UseWallet()
    let signer = walletGlobal.signer
    const tokenContract = new ethers.Contract(tokenAddress, IERC20, signer)
    let tx = await tokenContract.approve(CONFIG.VaultAddress, ethers.utils.parseEther(amount))
    await tx.wait()
}

async function getBalance(tokenAddress, account) {
    const { walletGlobal } = UseWallet()
    let signer = walletGlobal.signer
    const tokenContract = new ethers.Contract(tokenAddress, IERC20, signer);
    let amount = await tokenContract.balanceOf(account)

    return ethers.utils.formatEther(amount)
}

async function getVaultBalance(tokenAddress, account) {
    const { walletGlobal } = UseWallet()
    let signer = walletGlobal.signer
    const vaultContract = new ethers.Contract(CONFIG.VaultAddress, Vault, signer);
    // console.log("VaultAddress:", CONFIG.VaultAddress)
    let amount = await vaultContract.balances(tokenAddress, account)
    return ethers.utils.formatEther(amount.toString())
}

async function deposit(tokenAddress, amount) {
    const { walletGlobal } = UseWallet()
    let signer = walletGlobal.signer
    const vaultContract = new ethers.Contract(CONFIG.VaultAddress, Vault, signer);
    let tx = await vaultContract.deposit(tokenAddress, ethers.utils.parseEther(amount))
    await tx.wait()
}

async function mint(tokenAddress, account, amount) {
    const { walletGlobal } = UseWallet()
    let signer = walletGlobal.signer

    const tokenContract = new ethers.Contract(tokenAddress, FaucetToken.abi, signer);
    await tokenContract.mint(account, ethers.utils.parseEther(amount))
}

async function onAttemptToApprove(amount, erc20Address, deadline, account) {
    // console.log('onAttemptToApprove', amount, erc20Address)
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()

    const token = new ethers.Contract(erc20Address, FaucetToken.abi, signer);
    const vaultContract = new ethers.Contract(CONFIG.VaultAddress, Vault, signer);
    amount = ethers.utils.parseEther(amount)
    const { v, r, s } = await getPermitSignature(
        signer,
        account,
        token,
        vaultContract.address,
        amount,
        deadline
    )
    // console.log("depositWithPermit:", amount, deadline, v, r, s)
    let tx = await vaultContract.depositWithPermit(token.address, amount, deadline, v, r, s)
    await tx.wait()
}

async function withdraw(tokenAddress, amount) {
    const { walletGlobal } = UseWallet()
    let signer = walletGlobal.signer
    const vaultContract = new ethers.Contract(CONFIG.VaultAddress, Vault, signer);
    let tx = await vaultContract.withdraw(tokenAddress, ethers.utils.parseEther(amount))
    await tx.wait()
}

async function allowance(tokenAddress, owner) {
    const { walletGlobal } = UseWallet()
    let signer = walletGlobal.signer
    const tokenContract = new ethers.Contract(tokenAddress, IERC20, signer);
    return utils.formatEther(await tokenContract.allowance(owner, CONFIG.VaultAddress))
}

export {
    approve,
    getBalance,
    deposit,
    getVaultBalance,
    mint,
    onAttemptToApprove,
    withdraw,
    allowance,
}