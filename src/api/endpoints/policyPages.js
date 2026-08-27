import request from '../request';

const getPolicyPage = (AuthToken, params = null) =>
    request({ method: 'GET', url: '/policy-page', params, headers: { AuthToken } });

const createPolicyPage = (data, AuthToken) =>
    request({ method: 'POST', url: '/policy-page/add', data, headers: { AuthToken } });

const updatePolicyPage = (data, AuthToken) =>
    request({ method: 'POST', url: '/policy-page/update', data, headers: { AuthToken } });

const updatePolicyPageStatus = (data, AuthToken) =>
    request({ method: 'POST', url: '/policy-page/updatestatus', data, headers: { AuthToken } });

export default {
    getPolicyPage,
    createPolicyPage,
    updatePolicyPage,
    updatePolicyPageStatus,
};
