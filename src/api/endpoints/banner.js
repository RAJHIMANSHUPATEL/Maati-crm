import request from '../request';

const getBanner = (AuthToken, params = null) =>
    request({ method: 'GET', url: '/banner', params, headers: { AuthToken } });

const createBanner = (data, AuthToken) =>
    request({ method: 'POST', url: '/banner/add', data, headers: { AuthToken } });

const updateBanner = (data, AuthToken) =>
    request({ method: 'POST', url: '/banner/update', data, headers: { AuthToken } });

const updateBannerStatus = (data, AuthToken) =>
    request({ method: 'POST', url: '/banner/updatestatus', data, headers: { AuthToken } });

const getBannerByStore = (storeId, AuthToken) =>
    request({ method: 'GET', url: '/banner/bystore', params: { store_id: storeId }, headers: { AuthToken } });

export default {
    getBanner,
    createBanner,
    updateBanner,
    updateBannerStatus,
    getBannerByStore,
};
