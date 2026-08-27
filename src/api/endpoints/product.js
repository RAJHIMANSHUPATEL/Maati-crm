import request from '../request';

const getProduct = (AuthToken, params = null) =>
    request({ method: 'GET', url: '/product', params, headers: { AuthToken } });

const createProduct = (data, AuthToken) =>
    request({ method: 'POST', url: '/product/add', data, headers: { AuthToken } });

const updateProduct = (data, AuthToken) =>
    request({ method: 'POST', url: '/product/update', data, headers: { AuthToken } });

const updateProductStatus = (data, AuthToken) =>
    request({ method: 'POST', url: '/product/updatestatus', data, headers: { AuthToken } });

const getProductCount = (AuthToken) =>
    request({ method: 'GET', url: '/product/count', headers: { AuthToken } });

const adjustStock = (data, AuthToken) =>
    request({ method: 'POST', url: '/product/adjust-stock', data, headers: { AuthToken } });

const getLowStock = (AuthToken, params = null) =>
    request({ method: 'GET', url: '/product/low-stock', params, headers: { AuthToken } });

export default {
    getProduct,
    createProduct,
    updateProduct,
    updateProductStatus,
    getProductCount,
    adjustStock,
    getLowStock,
};
