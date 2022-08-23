import tokenList from "../config/tokenList.js"

function getTokenAddress(symbol) {
    // console.log('getTokenAddress symbol', symbol)
    const tokenCfg = tokenList.tokens.filter(token => token.symbol == symbol);
    // console.log(' ==>', tokenCfg[0].address)
    return tokenCfg[0].address
}

function getTokenCfg(symbol) {
    // console.log('getTokenCfg symbol', symbol)
    const tokenCfg = tokenList.tokens.filter(token => token.symbol == symbol);
    // console.log(' ==>', tokenCfg[0])
    return tokenCfg[0]
}

function formatNumber(num, decimal = 0) {
    num = String(num)
    if (num === '' || num === '0') return num
    const arr = num.split('.')
    const integerPart = arr[0]
    const decimalPart = arr[1] || ''
    const len = integerPart.length

    let str = ''

    if (len > 2) {
        integerPart.split('').forEach((item, index) => {
            if (index > 0 && (len - index) % 3 === 0) str += ''
            str += item
        })
    } else {
        str = integerPart
    }

    if (decimal === 0) return str
    str += '.'

    const decimalLen = decimalPart.length
    if (decimal === decimalLen) {
        str += decimalPart
    } else if (decimal > decimalLen) {
        str += decimalPart + new Array(decimal - decimalLen).fill('0').join('')
    } else {
        str += decimalPart.substr(0, decimal)
    }

    return str
}

export {
    getTokenAddress,
    formatNumber,
    getTokenCfg
}