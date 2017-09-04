import { combineReducers } from 'redux'

import app from './actions/app';
import fetch from './actions/fetch';
// add more actions

export default () =>
    combineReducers({
        app,
        fetch,
    });
