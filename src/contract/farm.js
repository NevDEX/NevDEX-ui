import { ethers, utils } from 'ethers';
import BigNumber from 'bignumber.js'
import { CONFIG } from "../config/config"
import MasterGardener from "../abi/MasterGardener.json"
import NDX from "../abi/NDX.json"
import LP from "../abi/LP.json"
import IYokaiPair from "../abi/IYokaiPair.json"
import { getMarketPrice } from '../utils/token'
import { Contract, Provider, setMulticallAddress } from 'ethers-multicall'
import { timestamp } from '../utils/time'

async function approveMaster(lpAddress, account, amount) {
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const lp = new ethers.Contract(lpAddress, LP.abi, signer);
    // console.log('approveMaster', lpAddress, account, amount)
    let tx = await lp.approve(CONFIG.MasterGardener, BigInt(amount * 10 ** 18))
    await tx.wait()
}

// function deposit(uint256 _pid, uint256 _amount, address _ref) public nonReentrant {
async function depositPool(pid, amount) {
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const masterGardener = new ethers.Contract(CONFIG.MasterGardener, MasterGardener.abi, signer)
    let tx = await masterGardener.deposit(pid, ethers.utils.parseEther(amount.toString()), ethers.constants.AddressZero)
    await tx.wait()
}

async function poolInfo() {
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const masterGardener = new ethers.Contract(CONFIG.MasterGardener, MasterGardener.abi, signer)

    let res = await masterGardener.methods.poolLength()
    console.log('poolLength  ', res)
}

async function getLPAmount(account, lpAddress) {
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const lp = new ethers.Contract(lpAddress, LP.abi, signer)
    let res = await lp.balanceOf(account)
    console.log('getLPAmount', res.toString(), ethers.utils.formatEther(res))

    return ethers.utils.formatEther(res)
}

async function pendingReward(account, pid) {
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const masterGardener = new ethers.Contract(CONFIG.MasterGardener, MasterGardener.abi, signer);
    let res = await masterGardener.pendingReward(pid, account)
    return res
}

function getMasterGardenerContract() {
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    return new ethers.Contract(CONFIG.MasterGardener, MasterGardener.abi, signer);
}

async function getPoolUserInfo(pid, account) {
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()

    const masterGardener = new ethers.Contract(CONFIG.MasterGardener, MasterGardener.abi, signer);
    let res = await masterGardener.userInfo(pid, account)
    return res
}

async function claimReward(pid) {
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()

    const masterGardener = new ethers.Contract(CONFIG.MasterGardener, MasterGardener.abi, signer)
    let res = await masterGardener.claimReward(pid)
}

async function withdrawLP(pid, amount) {
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const masterGardener = new ethers.Contract(CONFIG.MasterGardener, MasterGardener.abi, signer)
    let tx = await masterGardener.withdraw(pid, ethers.utils.parseEther(amount.toString()), ethers.constants.AddressZero)
    await tx.wait()
}

async function getGovToken() {
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const masterGardener = new ethers.Contract(CONFIG.MasterGardener, MasterGardener.abi, signer)
    return await masterGardener.govToken()
}

async function getMasterAllowAllowance(lpAddress, account) {
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const lpContract = new ethers.Contract(lpAddress, LP.abi, signer)
    let allowance = await lpContract.allowance(account, CONFIG.MasterGardener)
    console.log('allowance', allowance)
    return allowance
}

async function getNDXAmount(account) {
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const ndxContract = new ethers.Contract(CONFIG.NDXAddress, NDX.abi, signer)
    let inWallet = await ndxContract.balanceOf(account)
    let locked = await ndxContract.lockOf(account)
    let unlocked = await ndxContract.canUnlockAmount(account)
    return { inWallet, locked, unlocked }
}

async function getPoolInfo(pid) {
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const masterGardener = new ethers.Contract(CONFIG.MasterGardener, MasterGardener.abi, provider)
    let pool = await masterGardener.poolInfo(pid)
    // multiplier
    let rewardMultiplier = await masterGardener.getMultiplier(timestamp(), timestamp() + 1)
    rewardMultiplier = Number(rewardMultiplier)
    // console.log('rewardMultiplier', rewardMultiplier)
    setMulticallAddress(CONFIG.chainId, CONFIG.MultiCallAddress)
    const multiCall = new Provider(provider, CONFIG.chainId)
    await multiCall.init() // Only required when `chainId` is not provided in the `Provider` constructor
    const pair = new Contract(pool.lpToken, IYokaiPair)
    let calls = [pair.balanceOf(CONFIG.MasterGardener), pair.totalSupply(), pair.getReserves()]
    let [lpStated, lpTotalSupply, [reserve0, reserve1]] = await multiCall.all(calls)
    let ckbPrice = await getMarketPrice('CKB')
    let poolLiquidityUsd = (lpStated / lpTotalSupply) * (Number(reserve1) / 10 ** 18 * Number(ckbPrice)) * 2
    // allocation point
    let multiplier = Number(pool.allocPoint)
    let poolWeight = Number(1)
    // APR
    let totalSupply = 100000000
    let farmPercentage = 0.6
    let NDX_PER_YEAR = BigNumber(totalSupply * farmPercentage)
    let ndxPriceUsd = reserve1 / reserve0 * ckbPrice
    // console.log('reserve1', ethers.utils.formatEther(reserve1.toString()), 'reserve0', ethers.utils.formatEther(reserve0.toString()))
    // console.log('ndxPriceUsd', ndxPriceUsd)
    const yearlyRewardAllocation = NDX_PER_YEAR.times(poolWeight)
    // console.log('yearlyRewardAllocation', yearlyRewardAllocation.times(ndxPriceUsd).toString())
    // console.log('poolLiquidityUsd', poolLiquidityUsd.toString())
    // const totalRewardPricePerYear = new BigNumber(rewardTokenPrice).times(tokenPerBlock).times(BLOCKS_PER_YEAR)
    // const totalStakingTokenInPool = new BigNumber(stakingTokenPrice).times(totalStaked)
    // const apr = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)
    const apr = yearlyRewardAllocation.times(ndxPriceUsd).div(poolLiquidityUsd).times(100)
    // emission rate
    let emissionRate = Number(poolWeight * 0.1) * (rewardMultiplier) * 60
    // console.log({ apr, poolLiquidityUsd, multiplier, emissionRate })

    return { apr, poolLiquidityUsd, multiplier, emissionRate, ndxPriceUsd }
}

async function claimRewards(pids) {
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const masterGardener = new ethers.Contract(CONFIG.MasterGardener, MasterGardener.abi, provider.getSigner())
    let tx = await masterGardener.claimRewards(pids)
    await tx.wait()
}

async function withdrawFeePercent(pid) {
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const masterGardener = new ethers.Contract(CONFIG.MasterGardener, MasterGardener.abi, provider.getSigner())
    let percent = await masterGardener.withdrawFeePercent(pid)
    return percent
}

async function getLockPercentage() {
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const masterGardener = new ethers.Contract(CONFIG.MasterGardener, MasterGardener.abi, provider.getSigner())
    let percent = await masterGardener.getLockPercentage(pid)
    return percent
}

export {
    approveMaster,
    depositPool,
    pendingReward,
    getPoolUserInfo,
    claimReward,
    withdrawLP,
    getGovToken,
    getMasterAllowAllowance,
    poolInfo,
    getLPAmount,
    getNDXAmount,
    getMasterGardenerContract,
    getPoolInfo,
    claimRewards,
    withdrawFeePercent,
    getLockPercentage,
}