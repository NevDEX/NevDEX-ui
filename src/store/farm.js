import { ethers } from 'ethers';
import { CONFIG } from '../config/config'
import { getMasterAllowAllowance, getPoolUserInfo, pendingReward, getPoolInfo, getNDXAmount } from '../contract/farm'

const state = {
    farms: [],
    ndx: {
        price: 0,
        pending: 0,
        inWallet: 0,
        locked: 0,
        unlocked: 0,
        toHarvest: 0,
    }
}
const mutations = {
    updateFarms(state, payload) {
        console.log('state farms', payload.farms)
        state.farms = payload.farms
    },
    updateNDX(state, payload) {
        state.ndx.price = payload.ndx.price
        state.ndx.inWallet = payload.ndx.inWallet
        state.ndx.locked = payload.ndx.locked
        state.ndx.unlocked = payload.ndx.unlocked
        state.ndx.toHarvest = payload.ndx.toHarvest
    }
}

const actions = {
    async loadFarms({ commit }, account) {
        let ndxPrice
        let inWallet, locked, unlocked
        let toHarvest = Number(0)

        if (account !== "Connect Wallet") {
            let ret = await getNDXAmount(account)
            inWallet = Number(ethers.utils.formatEther(ret.inWallet))
            locked = Number(ethers.utils.formatEther(ret.locked))
            unlocked = ret.unlocked
        }

        let loadUserData = async (farm) => {
            let enabled, lpAmount, pending
            if (account !== "Connect Wallet") {
                // console.log('11111111111111111')
                let ret = await getMasterAllowAllowance(farm.lpAddress, account)
                console.log('ret', ret)
                enabled = Number(ret) !== 0

                if (enabled) {
                    let ret = await getPoolUserInfo(farm.pid, account)
                    lpAmount = Number(ethers.utils.formatEther(ret.amount))
                    pending = Number(ethers.utils.formatEther(await pendingReward(account, farm.pid)))
                }
            }

            // console.log('2222222222222222222')
            return { lpAmount, pending, enabled }
        }

        let loadPoolData = async (farm) => {
            let { apr, poolLiquidityUsd, multiplier, emissionRate, ndxPriceUsd } = await getPoolInfo(farm.pid)
            ndxPrice = ndxPriceUsd
            return { apr, poolLiquidityUsd, multiplier, emissionRate }
        }


        let farms = []
        for (let i = 0; i < CONFIG.Farms.length; i++) {
            let farm = CONFIG.Farms[i]
            let { pid, pair, lpAddress, link } = farm

            // console.log('1111', farm)
            let { lpAmount, pending, enabled } = await loadUserData(farm)
            toHarvest += pending
            let { apr, poolLiquidityUsd, multiplier, emissionRate } = await loadPoolData(farm)
            farms.push({ pid, pair, lpAddress, link, lpAmount, pending, enabled, apr, poolLiquidityUsd, multiplier, emissionRate })
        }
        commit('updateFarms', {
            farms
        })
        // Commit and send to mutation.
        commit('updateNDX', {
            ndx: {
                price: ndxPrice,
                inWallet,
                locked,
                unlocked,
                toHarvest,
            }
        })
    },
}

const getters = {
    farms: (state) => state.farms,
    ndx: (state) => state.ndx,
}

export default {
    state,
    mutations,
    actions,
    getters,
}
