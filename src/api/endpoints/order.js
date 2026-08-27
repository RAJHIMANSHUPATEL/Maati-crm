import request from '../request';

const getOrders = (AuthToken, params = null) =>
    request({ method: 'GET', url: '/order', params, headers: { AuthToken } });

const getOrdersByMonth = (data, AuthToken) =>
    request({ method: 'POST', url: '/order/ordersbymonth', data, headers: { AuthToken } });

const getOrdersByDate = (data, AuthToken) =>
    request({ method: 'POST', url: '/order/bydate', data, headers: { AuthToken } });

const getOrdersByUserId = (data, AuthToken) =>
    request({ method: 'POST', url: '/order/byuserid', data, headers: { AuthToken } });

const getOrderCount = (AuthToken, params = null) =>
    request({ method: 'GET', url: '/order/count', params, headers: { AuthToken } });

const updateOrder = (data, AuthToken) =>
    request({ method: 'POST', url: '/order/update', data, headers: { AuthToken } });

export default {
    getOrders,
    getOrdersByMonth,
    getOrdersByDate,
    getOrdersByUserId,
    getOrderCount,
    updateOrder,
};
