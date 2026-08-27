import request from '../request';

const getCategory = (AuthToken, params = null) =>
    request({ method: 'GET', url: '/category', params, headers: { AuthToken } });

const createCategory = (data, AuthToken) =>
    request({ method: 'POST', url: '/category/add', data, headers: { AuthToken } });

const updateCategory = (data, AuthToken) =>
    request({ method: 'POST', url: '/category/update', data, headers: { AuthToken } });

const updateCategoryStatus = (data, AuthToken) =>
    request({ method: 'POST', url: '/category/updatestatus', data, headers: { AuthToken } });

const getCategoryByStore = (storeId, AuthToken) =>
    request({ method: 'GET', url: '/category/bystore', params: { store_id: storeId }, headers: { AuthToken } });

export default {
    getCategory,
    createCategory,
    updateCategory,
    updateCategoryStatus,
    getCategoryByStore,
};
