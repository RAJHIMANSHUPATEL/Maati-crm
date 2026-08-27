import request from '../request';

const getCoupon = (AuthToken, params = null) =>
    request({ method: 'GET', url: '/coupon', params, headers: { AuthToken } });

const createCoupon = (data, AuthToken) =>
    request({ method: 'POST', url: '/coupon/add', data, headers: { AuthToken } });

const updateCoupon = (data, AuthToken) =>
    request({ method: 'POST', url: '/coupon/update', data, headers: { AuthToken } });

const updateCouponStatus = (data, AuthToken) =>
    request({ method: 'POST', url: '/coupon/updatestatus', data, headers: { AuthToken } });

export default {
    getCoupon,
    createCoupon,
    updateCoupon,
    updateCouponStatus,
};
