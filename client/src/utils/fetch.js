import 'whatwg-fetch'
import 'es6-promise'

import { message } from 'antd';


const success = (msg) => {
    message.success(msg);
}

const error = (msg) => {
    message.error(msg);
}

const warning = (msg) => {
    message.warning(msg)
}


export const Utilfetch = {}

/** 
 * 基于 fetch 封装的 GET请求 
 * @param url 
 * @param params {} 
 * @param headers 
 * @returns {Promise} 
 */
Utilfetch.get = function (url = '', params = {}, headers = {}) {
    if (params) {
        let paramsArray = [];
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
        if (paramsArray.length) {
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
    }
    return new Promise(function (resolve, reject) {
        let token = {
            'Authorization': 'Bearer ' + localStorage.getItem('MYTOKEN')
        }
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...token,
                ...headers
            }
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                //   reject({status:response.status})  
                error(response.status)
            }
        })
        .then((response) => {
            error(response.status)
            if (response.code != 0) {
                resolve(response);
            } else {
                error(response.msg)

            }
        })
        .catch((err) => {
            reject(err);
            error(err)
        })
    })
}


/** 
 * 基于 fetch 封装的 POST请求 json数据
 * @param url 
 * @param formData   
 * @param headers 
 * @returns {Promise} 
 */
Utilfetch.post = function (url = '', params = {}, headers = {}) {
    return new Promise(function (resolve, reject) {
        let token = {
            'Authorization': 'Bearer ' + localStorage.getItem('MYTOKEN')
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...token,
                ...headers
            },
            body: JSON.stringify(params)
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    error(response.status)
                }
            })
            .then((response) => {
                if (response.code != 0) {
                    success(response.msg)
                    resolve(response)
                } else {
                    error(response.msg)
                }
            })
            .catch((err) => {
                error(err)

            })
    })
}

