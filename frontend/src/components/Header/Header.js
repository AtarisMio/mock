/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { connect } from 'react-redux'
import { toggleNavDrawer } from '../../reducers/actions/app'

import AppBar from '../Material-Design/AppBar';

import s from './Header.css';

import { siteFullName } from '../../globalVariables';

class Header extends React.Component {

    static propTypes = {
        toggleNavDrawer: PropTypes.func.isRequired,
    };

    toggleDrawerActive = () => this.props.toggleNavDrawer()

    render() {
        return (
            <AppBar title={siteFullName} leftIcon="menu" onLeftIconClick={this.toggleDrawerActive} >
            </AppBar>
        );
    }
}


const mapDispatchToProps = {
    toggleNavDrawer
}

const mapStateToProps = (state) => ({
})

const HeaderComponent = connect(mapStateToProps, mapDispatchToProps)(Header);

export default withStyles(s)(HeaderComponent);
