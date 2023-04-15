const networks = {
    71401: {
        chainId: `0x${Number(71401).toString(16)}`,
        chainName: "Godwoken Testnet v1",
        nativeCurrency: {
            name: "pCKB",
            symbol: "pCKB",
            decimals: 18
        },
        rpcUrls: ["https://v1.testnet.godwoken.io/rpc"],
        blockExplorerUrls: ["https://v1.aggron.gwscan.com/"]
    },
    1666700000: {
        chainId: `0x${Number(1666700000).toString(16)}`,
        chainName: "Harmony Testnet Shard 0",
        nativeCurrency: {
            name: "ONE",
            symbol: "ONE",
            decimals: 18
        },
        rpcUrls: ["https://api.s0.b.hmny.io"],
        blockExplorerUrls: ["https://explorer.pops.one"]
    },

}

export {
    networks
}