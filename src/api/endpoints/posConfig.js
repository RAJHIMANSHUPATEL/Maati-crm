import request from '../request';

const getPosConfig = (AuthToken, params = null) =>
    request({ method: 'GET', url: '/pos-configuration', params, headers: { AuthToken } });

const createPosConfig = (data, AuthToken) =>
    request({ method: 'POST', url: '/pos-configuration/add', data, headers: { AuthToken } });

const updatePosConfig = (data, AuthToken) =>
    request({ method: 'POST', url: '/pos-configuration/update', data, headers: { AuthToken } });

const updatePosConfigStatus = (data, AuthToken) =>
    request({ method: 'POST', url: '/pos-configuration/updatestatus', data, headers: { AuthToken } });

export default {
    getPosConfig,
    createPosConfig,
    updatePosConfig,
    updatePosConfigStatus,
};
