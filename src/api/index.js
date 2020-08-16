import request from '../utils/request';

// 定义统一的 axios 接口请求
// get 请求方式
export const getRequest = (url,query) => {
    return request({
        url: url,
        method: 'get',
        params: query
    });
};

// get 请求方式 -- 文件下载
export const getFileRequest = (url,query) => {
    return request({
        url: url,
        method: 'get',
        params: query,
        responseType: 'blob'
    });
};
// post 请求方式
export const postRequest = (url,query) => {
    return request({
        url: url,
        method: 'post',
        data: query
    });
};

// delete 请求方式
export const deleteRequest = (url, query) => {
    return request({
        url: url,
        method: 'delete',
        data: query,
        params: query
    });
};

// put 请求方式
export const putRequest = (url,query) => {
    return request({
        url: url,
        method: 'put',
        data: query
    });
};



export const fetchData = query => {
    return request({
        url: 'user-center/user/selectUserAuthList',
        method: 'get',
        params: query
    });
};

export const addUser = addData => {
    return request({
        url: 'user-center/user/addUserAuth',
        method: 'post',
        data: addData
    });
};

export const deleteUser = query => {
    return request({
        url: 'user-center/user/deleteUserAuth',
        method: 'delete',
        params: query
    });
};