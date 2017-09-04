import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import loadReducers from '../reducers';

export default (initialState = {}) => {
    // ======================================================
    // Middleware Configuration
    // ======================================================
    const middleware = [thunk];

    // ======================================================
    // Store Enhancers
    // ======================================================
    const enhancers = [];
    if (__DEV__) {
        const devToolsExtension = global.devToolsExtension;
        if (typeof devToolsExtension === 'function') {
            enhancers.push(devToolsExtension());
        }
    }

    // ======================================================
    // Store Instantiation and HMR Setup
    // ======================================================
    const store = createStore(
        loadReducers(),
        initialState,
        compose(
            applyMiddleware(...middleware),
            ...enhancers,
        ),
    );
    if (__DEV__) {
        global.redux_store = store;
    }

    return store;
};
