/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import MaterialDesignNavigation from '../Material-Design/Navigation';
import { List, ListItem, ListSubHeader, ListDivider } from '../Material-Design/List';
import Button from '../Material-Design/Button';
import Chip from '../Material-Design/Chip';
import FontIcon from '../Material-Design/FontIcon';
// import {
//     Button
// } from 'react-toolbox';
// import theme from 'react-toolbox/lib/button/theme.css';

import s from './Navigation.css';
import Link from '../Link';
// import Chip from '../Material-Design/Chip/Chip';

class Navigation extends React.Component {
    render() {
        return (
            <MaterialDesignNavigation role="navigation">
                <List selectable ripple>

                </List>
            </MaterialDesignNavigation>
        );
    }
}

export default withStyles(s)(Navigation);
