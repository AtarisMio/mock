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
            <div className={s.root} role="navigation">
                <Button label='About' />
                <Chip deletable>
                    About
                </Chip>
                <FontIcon>
                cancel
                </FontIcon>
                <Link className={s.link} to="/about">
                    <span>About</span>
                </Link>
                <Link className={s.link} to="/contact">
                    Contact
                </Link>
                <span className={s.spacer}> | </span>
                <Link className={s.link} to="/login">
                    Log in
                </Link>
                <span className={s.spacer}>or</span>
                <Link className={cx(s.link, s.highlight)} to="/register">
                    Sign up
                </Link>
            </div>
        );
    }
}

export default withStyles(s)(Navigation);
