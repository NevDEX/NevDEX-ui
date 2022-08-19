import { ethers, Contract, utils } from 'ethers';
import { getPermitSignature } from "./utils/sign"
import { CONFIG } from "./config/config"
import ERC20Token from "./abi/ERC20Token.json"
import Vault from "./abi/vault.json"
import tokenAbi from "./abi/token.json"

async function approve(tokenAddress, amount, account) {
    // const tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);
    // console.log('approve', CONFIG.VaultAddress, web3.utils.toWei(amount, 'ether'), account)
    // await tokenContract.methods.approve(CONFIG.VaultAddress, web3.utils.toWei(amount, 'ether')).send({
    //     from: account,
    // })
}

async function getBalance(tokenAddress, account) {
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    console.log(signer, account, tokenAbi)
    const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer);
    let amount = await tokenContract.balanceOf(account)
    console.log('==> getBalance tokenAddress:', tokenAddress, "account:", account, 'amount:', amount.toString())
    return ethers.utils.formatEther(amount)
}

async function getVaultBalance(tokenAddress, account) {
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const vaultContract = new ethers.Contract(CONFIG.VaultAddress, Vault, signer);
    let amount = await vaultContract.balances(tokenAddress, account)
    return amount / 10 ** 18
}

async function deposit(tokenAddress, amount, account) {
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const vaultContract = new ethers.Contract(CONFIG.VaultAddress, Vault, signer);
    await vaultContract.methods.deposit(tokenAddress, web3.utils.toWei(amount * 10 ** 18, 'ether'))
}

async function mint(tokenAddress, account, amount) {
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    console.log('mint tokenAddress', tokenAddress)
    const tokenContract = new ethers.Contract(tokenAddress, ERC20Token.abi, signer);
    await tokenContract.mint(account, ethers.utils.parseEther(amount))
}

async function onAttemptToApprove(amount, erc20Address, deadline, account) {
    console.log('onAttemptToApprove', amount, erc20Address)
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()

    const token = new ethers.Contract(erc20Address, ERC20Token.abi, signer);
    // console.log("token address:", token.address,"vault address:", vault.address)
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
    await vaultContract.depositWithPermit(token.address, amount, deadline, v, r, s)
}

async function withdraw(tokenAddress, amount) {
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const vaultContract = new ethers.Contract(CONFIG.VaultAddress, Vault, signer);
    await vaultContract.withdraw(tokenAddress, ethers.utils.parseEther(amount))
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