
/**
 * test action 类型
 */

export const TOGGLE_NAV_DRAWER = 'TOGGLE_NAV_DRAWER';


/**
 * test action ()
 */

export function toggleNavDrawer() {
    return {
        type: TOGGLE_NAV_DRAWER,
        payload: {}
    }
}

/**
 * 导出所有的acton 
 */

export const actions = {
    toggleNavDrawer
}

// ================================
// Action handlers for Reducer
// 本来更新 state 是 Reducer 的责任
// 但要把 ActionType 导出又引入实在太麻烦
// 且在 Reducer 中写 switch-case 实在太不优雅
// 故在此直接给出处理逻辑
// ================================

const ACTION_HANDLERS = {
    [TOGGLE_NAV_DRAWER]: (state) =>
        ({ ...state, navDrawerActive: !state.navDrawerActive })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    hasTheme: false,
    navDrawerActive: true
}

export default function appReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
