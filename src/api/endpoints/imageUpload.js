import request from '../request';

const uploadImage = (data, AuthToken, url) =>
    request({ method: 'POST', url: `/upload/image/${url}`, data, headers: { AuthToken } });


export default { uploadImage }