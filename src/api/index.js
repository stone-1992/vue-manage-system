import request from '../utils/request';

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
