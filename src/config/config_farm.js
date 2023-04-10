const FarmCfg = function (env) {
    switch (env) {
        case "testnet":
            return [
                {
                    "pid": 0,
                    "pair": "NDX-CKB",
                    "lpAddress": "0xbffdce1b8584a273839865994388ac815902e77e",
                    "link": "https://testnet-v1.yokaiswap.com/liquidity/add/0x7455b2B6a77079F37F1b265dBd39C5aB4D0DfB7b/0xb294B3E843ad958C695edAf00DDDCEb5b38464d5",
                },
            ]
    }
}

export default FarmCfg; 