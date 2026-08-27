import request from '../request';

const getSubMenu = (AuthToken, params = null) =>
    request({ method: 'GET', url: '/sub-menu', params, headers: { AuthToken } });

const createSubMenu = (data, AuthToken) =>
    request({ method: 'POST', url: '/sub-menu/add', data, headers: { AuthToken } });

const updateSubMenu = (data, AuthToken) =>
    request({ method: 'POST', url: '/sub-menu/update', data, headers: { AuthToken } });

const updateSubMenuStatus = (data, AuthToken) =>
    request({ method: 'POST', url: '/sub-menu/updatestatus', data, headers: { AuthToken } });

export default {
    getSubMenu,
    createSubMenu,
    updateSubMenu,
    updateSubMenuStatus,
};
