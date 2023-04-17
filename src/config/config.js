import FarmCfg from "./config_farm"
import marketList from './market_list_godwoken.json'
import marketListHarmony from '../config/market_list_harmony.json'
import tokenListHarmony from "./token_list/tokenList_Harmony.json"
import tokenListGodwoken from "./token_list/tokenList_Godwoken.json"

function getConfig(chain) {
  switch (chain) {
    case 71401:
      return {
        ChainId: `0x${Number(71401).toString(16)}`,
        VaultAddress: "0x489f69D6a90F6e515DF9D4A954B7cC4051DCBd48",
        MasterGardener: "0xd6aAF3ffd434Bf3C14abe060A81580BBbC92242E",
        NDXAddress: "0x7455b2B6a77079F37F1b265dBd39C5aB4D0DfB7b",
        MultiCallAddress: "0xaB257428B2F56516F8aDb3c4c6762bDD50b7a118", // 0x299783039957CD900EEafdaBA9da65ed2facA229
        RPC: "https://v1.testnet.godwoken.io/rpc",
        MarketList: marketList,
        TokenList: tokenListGodwoken,
      }
    case 1666700000:
      return {
        ChainId: `0x${Number(1666700000).toString(16)}`,
        VaultAddress: "0xA3eE539024861E677413d9415943eE0679AF1156",
        MasterGardener: "0xd6aAF3ffd434Bf3C14abe060A81580BBbC92242E",
        NDXAddress: "0x7455b2B6a77079F37F1b265dBd39C5aB4D0DfB7b",
        MultiCallAddress: "0xaB257428B2F56516F8aDb3c4c6762bDD50b7a118", // 0x299783039957CD900EEafdaBA9da65ed2facA229
        RPC: "https://api.s0.b.hmny.io",
        MarketList: marketListHarmony,
        TokenList: tokenListHarmony,
      }
  }
}

export const CHAIN = 1666700000

export const CONFIG = {
  VaultAddress: getConfig(CHAIN).VaultAddress,
  MasterGardener: getConfig(CHAIN).MasterGardener,
  NDXAddress: getConfig(CHAIN).NDXAddress,
  Farms: FarmCfg(CHAIN),
  MultiCallAddress: getConfig(CHAIN).MultiCallAddress,
  ChainId: getConfig(CHAIN).ChainId,
  RPC: getConfig(CHAIN).RPC,
  API_URL: 'https://dev.nevdex.tech/api/',
  // const BaseUrl = "https://testnet.nevdex.tech/api/"
  // const BaseUrl = "https://mainnet.nevdex.tech/api/"
  MarketList: getConfig(CHAIN).MarketList,
  TokenList: getConfig(CHAIN).TokenList,
}
