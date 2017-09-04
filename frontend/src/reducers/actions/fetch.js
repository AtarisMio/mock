
/**
 * test action 类型
 */

export const ADD_CACHE = 'ADD_CACHE';
export const DEL_CACHE = 'DEL_CACHE';
export const CLEAN_CACHE = 'CLEAN_CACHE';


/**
 * test action ()
 */

export function addCache(url = '', options = {}, response) {
    return {
        type: ADD_CACHE,
        payload: {
            url,
            options,
            response,
        }
    }
}

export function delCache(url = '', options = {}) {
    return {
        type: DEL_CACHE,
        payload: {
            url,
            options,
        }
    }
}

export function cleanCache() {
    return {
        type: CLEAN_CACHE,
        payload: {}
    }
}

/**
 * 导出所有的acton 
 */

export const actions = {
    addCache,
    delCache,
    cleanCache
}

// ================================
// Action handlers for Reducer
// 本来更新 state 是 Reducer 的责任
// 但要把 ActionType 导出又引入实在太麻烦
// 且在 Reducer 中写 switch-case 实在太不优雅
// 故在此直接给出处理逻辑
// ================================

const ACTION_HANDLERS = {
    [ADD_CACHE]: (state, action) => ({
        ...state,
        cache: {
            ...state.cache,
            [action.payload.url + JSON.stringify(action.payload.options)]: action.payload.response,
        }
    }),
    [DEL_CACHE]: (state, action) => {
        const cache = Object.assign(state.cache);
        delete cache[action.payload.url + JSON.stringify(action.payload.options)];
        return {
            ...state,
            cache
        }
    },
    [CLEAN_CACHE]: state => ({
        ...state,
        cache: {}
    }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    cache: {}
}

export default function appReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
