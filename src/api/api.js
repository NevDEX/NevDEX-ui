import request from '../utils/axios'

export function buildOrder(data) {
    return request({
        url: '/order/build',
        method: 'post',
        data
    })
}

export function placeOrder(data) {
    return request({
        url: '/order/place',
        method: 'post',
        data
    })
}

export function cancelOrder(data) {
    return request({
        url: '/order/cancel',
        method: 'post',
        data
    })
}

export function listOrder(data) {
    return request({
        url: '/order/orders',
        method: 'post',
        data
    })
}

export function myOrders(data) {
    return request({
        url: '/order/myorders',
        method: 'post',
        data
    })
}

export function orderbook(data) {
    return request({
        url: '/order/orderbook',
        method: 'post',
        data
    })
}

export function marketHistory(data) {
    return request({
        url: '/markethistory',
        method: 'post',
        data
    })
}