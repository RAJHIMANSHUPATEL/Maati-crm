import request from '../request';

const loginUser = (data) =>
  request({ method: 'POST', url: '/user/login', data });

const verifyUser = (AuthToken) =>
  request({ method: 'GET', url: '/auth/verify', headers: { AuthToken } });

const getUser = (AuthToken, params = null) =>
  request({ method: 'GET', url: `/user`, params, headers: { AuthToken } });

const getCustomers = (AuthToken, params = null) =>
  request({ method: 'GET', url: `/user/customers`, params, headers: { AuthToken } });

const updateUser = (data, AuthToken) =>
  request({ method: 'POST', url: `/user/update`, data, headers: { AuthToken } });

const registerUser = (data, AuthToken) =>
  request({ method: 'POST', url: `/user/register`, data, headers: { AuthToken } });

const updateUserStatus = (data, AuthToken) =>
  request({ method: 'POST', url: `/user/updatestatus`, data, headers: { AuthToken } });

const getUserCount = (AuthToken, params = null) =>
  request({ method: 'GET', url: `/user/count`, params, headers: { AuthToken } });

export default {
  loginUser,
  verifyUser,
  getUser,
  getCustomers,
  updateUser,
  registerUser,
  updateUserStatus,
  getUserCount,
};
