import request from '../request';

const getStore = (AuthToken, params = null) =>
    request({ method: 'GET', url: '/store', params, headers: { AuthToken } });

const createStore = (data, AuthToken) =>
    request({ method: 'POST', url: '/store/add', data, headers: { AuthToken } });

const updateStore = (data, AuthToken) =>
    request({ method: 'POST', url: '/store/update', data, headers: { AuthToken } });

const updateStoreStatus = (data, AuthToken) =>
    request({ method: 'POST', url: '/store/updatestatus', data, headers: { AuthToken } });

export default {
    getStore,
    createStore,
    updateStore,
    updateStoreStatus,
};
