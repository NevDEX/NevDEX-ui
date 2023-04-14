import FarmCfg from "./config_farm"

function cfgAddress(env) {
  switch (env) {
    case "testnet":
      return {
        ChainId: `0x${Number(71401).toString(16)}`,
        VaultAddress: "0x489f69D6a90F6e515DF9D4A954B7cC4051DCBd48",
        MasterGardener: "0xd6aAF3ffd434Bf3C14abe060A81580BBbC92242E",
        NDXAddress: "0x7455b2B6a77079F37F1b265dBd39C5aB4D0DfB7b",
        MultiCallAddress: "0xaB257428B2F56516F8aDb3c4c6762bDD50b7a118", // 0x299783039957CD900EEafdaBA9da65ed2facA229
        RPC: "https://v1.testnet.godwoken.io/rpc",
      }
    case "HardHat":
      return "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
  }
}

export const CONFIG = {
  VaultAddress: cfgAddress("testnet").VaultAddress,
  MasterGardener: cfgAddress("testnet").MasterGardener,
  NDXAddress: cfgAddress("testnet").NDXAddress,
  Farms: FarmCfg("testnet"),
  MultiCallAddress: cfgAddress("testnet").MultiCallAddress,
  ChainId: FarmCfg("testnet").ChainId,
  RPC: cfgAddress("testnet").RPC,
}
