/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* @flow */
import { addCache } from './reducers/actions/fetch';

type Fetch = (url: string, options: ?any) => Promise<any>;

type Options = {
    baseUrl: string,
    cookie?: string,
    store?: any,
};

/**
 * Creates a wrapper function around the HTML5 Fetch API that provides
 * default arguments to fetch(...) and is intended to reduce the amount
 * of boilerplate code in the application.
 * https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch
 */
function createFetch(fetch: Fetch, { baseUrl, cookie, store }: Options) {
    // NOTE: Tweak the default options to suite your application needs
    const defaultsPOST = {
        method: 'POST', // handy with GraphQL backends
        mode: baseUrl ? 'cors' : 'same-origin',
        credentials: baseUrl ? 'include' : 'same-origin',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            ...(cookie ? { Cookie: cookie } : null),
        },
    };

    const myFetch = async (url: string, options: any) => {
        const myUrl = url.includes('?') ? `${url}&t=${new Date().valueOf()}` : `${url}?t=${new Date().valueOf()}`;
        return fetch(myUrl, options).then(async res => {
            if(!res.ok) {
                throw new Error('Bad Request');
            }
            const contentType = res.headers.get('content-type');
            let ret = res;
            if (contentType.includes('json')) {
                ret = await res.json();
            } else if (contentType.includes('plain') || contentType.includes('html') || contentType.includes('css') || contentType.includes('javascript')) {
                ret = await res.text();
            } else if (contentType.includes('image')) {
                ret = await res.blob();
            }
            return ret;
        });
    };

    const getCacheData = (url, options) => {
        if (!options || options.cache !== false) {
            const state = store.getState();
            const caches = state && state.fetch && state.fetch.cache || {};
            if (caches[url + JSON.stringify(options)]) {
                return caches[url + JSON.stringify(options)];
            }
        }
        return false;
    }

    const addCacheData = (url, options) =>
        async res => {
            if (!options || options.cache !== false) {
                await store.dispatch(addCache(url, options, res.ok === true ? res.clone() : res));
                return res;
            }
            return res;
        }

    const addParams = async (url: string, options: any = {}) => {
        const myCacheData = getCacheData(url, options);
        if (undefined !== myCacheData) {
            return myCacheData;
        }
        if (!url.startsWith('/api')) // 非api开头直接请求
            return myFetch(url, options).then(addCacheData(url, options));
        if (options && options.method && String(options.method).toUpperCase() === 'POST') // post 请求，添加cookie
            return myFetch(`${baseUrl}${url}`, {
                ...defaultsPOST,
                ...options,
                headers: {
                    ...defaultsPOST.headers,
                    ...(options && options.headers),
                },
            }).then(addCacheData(url, options));
        return myFetch(`${baseUrl}${url}`, { // 响应get请求
            mode: baseUrl ? 'cors' : 'same-origin',
            credentials: baseUrl ? 'include' : 'same-origin',
            ...options,
            headers: {
                ...(cookie ? { Cookie: cookie } : null),
                ...(options && options.headers),
            }
        }).then(addCacheData(url, options));
    }

    addParams.get = (url: string, options: any) =>
        addParams(url, {...options, method: 'GET'});

    addParams.post = (url: string, body: any, options: any) => {
        let myBody;
        if (body instanceof URLSearchParams || typeof body === 'string') {
            myBody = body;
        } else {
            myBody = new URLSearchParams();
            Object.keys(body).every(key => myBody.append(key, body[key]) );
        }
        return addParams(url, {
            ...options,
            method: 'POST',
            body: myBody });
    }

    return addParams;
}

export default createFetch;
