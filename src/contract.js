// import Web3 from 'web3';
import { ethers, Contract, utils } from 'ethers';
import tokenAbi from "./abi/token.json"
import vaultAbi from "./abi/vault.json"
import { getPermitSignature } from "./utils/sign"
import { CONFIG } from "./config/config"
// const ERC20Token = require("./abi/ERC20Token.json")
// const Vault = require("./abi/vault.json")

// const web3 = new Web3(window.web3.currentProvider);

async function approve(tokenAddress, amount, account) {
    // const tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);
    // console.log('approve', CONFIG.VaultAddress, web3.utils.toWei(amount, 'ether'), account)
    // await tokenContract.methods.approve(CONFIG.VaultAddress, web3.utils.toWei(amount, 'ether')).send({
    //     from: account,
    // })
}

async function getBalance(tokenAddress, account) {
    // const tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);
    // let amount = await tokenContract.methods.balanceOf(account).call()
    // console.log('==> getBalance tokenAddress:', tokenAddress, "account:", account, 'amount:', amount)
    // return web3.utils.fromWei(amount, 'ether');
}

async function getVaultBalance(tokenAddress, account) {
    // const vaultContract = new web3.eth.Contract(vaultAbi, CONFIG.VaultAddress);
    // let amount = await vaultContract.methods.balances(tokenAddress, account).call()
    // console.log('==> getVaultBalance tokenAddress:', tokenAddress, "account:", account, 'amount:', amount)
    // return web3.utils.fromWei(amount, 'ether');
}

async function deposit(tokenAddress, amount, account) {
    // const vaultContract = new web3.eth.Contract(vaultAbi, CONFIG.VaultAddress);
    // await vaultContract.methods.deposit(tokenAddress, web3.utils.toWei(amount, 'ether')).send({
    //     from: account,
    // })
}

async function mint(tokenAddress, account, amount) {
    console.log('mint', tokenAddress, account, amount)
    // const tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);
    // await tokenContract.methods.mint(account, web3.utils.toWei(amount, 'ether')).send({
    //     from: account,
    // })
}

async function onAttemptToApprove(amount, erc20Address, deadline, account) {
    console.log('onAttemptToApprove', amount, erc20Address)
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()

    const vaultAddress = CONFIG.VaultAddress
    const token = new ethers.Contract(erc20Address, ERC20Token.abi, signer);
    // console.log("token address:", token.address,"vault address:", vault.address)
    const vault = new ethers.Contract(vaultAddress, Vault, signer);
    amount = web3.utils.toWei(amount, 'ether')
    const { v, r, s } = await getPermitSignature(
        signer,
        account,
        token,
        vault.address,
        amount,
        deadline
    )
    // console.log("depositWithPermit:", amount, deadline, v, r, s)
    await vault.depositWithPermit(token.address, amount, deadline, v, r, s)
}

async function withdraw(tokenAddress, amount, account) {
    // const vaultContract = new web3.eth.Contract(vaultAbi, CONFIG.VaultAddress);
    // await vaultContract.methods.withdraw(tokenAddress, web3.utils.toWei(amount, 'ether')).send({
    //     from: account,
    // })
}

export {
    approve,
    getBalance,
    deposit,
    getVaultBalance,
    mint,
    onAttemptToApprove,
    withdraw
}