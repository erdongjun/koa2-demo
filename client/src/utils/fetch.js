import 'whatwg-fetch'
import 'es6-promise'


export const Utilfetch = {}

/** 
 * 基于 fetch 封装的 GET请求 
 * @param url 
 * @param params {} 
 * @param headers 
 * @returns {Promise} 
 */
Utilfetch.get = function (url = '', params = {}, headers = {}) {
    let baseUrl = '/api' + url
    if (params) {
        let paramsArray = [];
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
        if (paramsArray.length) {
            if (baseUrl.search(/\?/) === -1) {
                baseUrl += '?' + paramsArray.join('&')
            } else {
                baseUrl += '&' + paramsArray.join('&')
            }
        }
    }
    return new Promise(function (resolve, reject) {
        let token = {
            'Authorization': 'Bearer ' + localStorage.getItem('MYTOKEN')
        }
        fetch(baseUrl, {
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
                resolve(response.json())
            } else {
                reject({msg:response.status})  
            }
        })
        .catch((err) => {
            reject(err);
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
    let baseUrl = '/api' + url

    return new Promise(function (resolve, reject) {
        let token = {
            'Authorization': 'Bearer ' + localStorage.getItem('MYTOKEN')
        }
        fetch(baseUrl, {
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
                    resolve(response.json())
                } else {
                    reject({msg:response.status})  
                }
            })
            .catch((err) => {
                error(err)
            })
    })
}

