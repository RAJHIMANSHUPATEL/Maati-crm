import request from '../request';

const getSubCategory = (AuthToken, params = null) =>
    request({ method: 'GET', url: '/subcategory', params, headers: { AuthToken } });

const createSubCategory = (data, AuthToken) =>
    request({ method: 'POST', url: '/subcategory/add', data, headers: { AuthToken } });

const updateSubCategory = (data, AuthToken) =>
    request({ method: 'POST', url: '/subcategory/update', data, headers: { AuthToken } });

const updateSubCategoryStatus = (data, AuthToken) =>
    request({ method: 'POST', url: '/subcategory/updatestatus', data, headers: { AuthToken } });

const getSubCategoryByCategory = (categoryId, AuthToken) =>
    request({ method: 'POST', url: '/subcategory/getbycategory', params: { category_id: categoryId }, headers: { AuthToken } });

export default {
    getSubCategory,
    createSubCategory,
    updateSubCategory,
    updateSubCategoryStatus,
    getSubCategoryByCategory,
};
