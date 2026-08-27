import request from '../request';

const getSettings = (AuthToken) =>
    request({ method: 'GET', url: '/settings', headers: { AuthToken } });

const updateSettings = (data, AuthToken) =>
    request({ method: 'POST', url: '/settings/update', data, headers: { AuthToken } });

const getContacts = (AuthToken) =>
    request({ method: 'GET', url: '/settings/contacts', headers: { AuthToken } });

export default { getSettings, updateSettings, getContacts };
