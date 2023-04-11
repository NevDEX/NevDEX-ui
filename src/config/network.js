const networks = {
    GodwokenTestnet: {
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
}

export {
    networks
}