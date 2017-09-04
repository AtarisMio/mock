
/**
 * test action 类型
 */

export const ADD_TEST = 'ADD_TEST';


/**
 * test action ()
 */

export function test(testDate = {}) {
    return {
        type: ADD_TEST,
        payload: testDate
    }
}

/**
 * 导出所有的acton 
 */

export const actions = {
    test
}

// ================================
// Action handlers for Reducer
// 本来更新 state 是 Reducer 的责任
// 但要把 ActionType 导出又引入实在太麻烦
// 且在 Reducer 中写 switch-case 实在太不优雅
// 故在此直接给出处理逻辑
// ================================

const ACTION_HANDLERS = {
    [ADD_TEST]: (state, action) => ({ ...state, data: action.payload })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    isNow: true
}

export default function appReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
