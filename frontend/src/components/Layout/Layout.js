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
import normalizeCss from 'normalize.css';

import { connect } from 'react-redux'
import { toggleNavDrawer } from '../../reducers/actions/app'

// external-global styles must be imported in your JS.
import s from './Layout.css';
import MaterialDesignLayout, { NavDrawer, Panel } from '../Material-Design/Layout'
import Navigation from '../Navigation';
import Header from '../Header';
import Feedback from '../Feedback';
import Footer from '../Footer';

class Layout extends React.Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        toggleNavDrawer: PropTypes.func.isRequired,
        NavDrawerActive: PropTypes.bool.isRequired,
    };

    toggleDrawerActive = () => this.props.toggleNavDrawer()

    render() {
        return (
            <MaterialDesignLayout>
                <NavDrawer
                    active={this.props.NavDrawerActive}
                    permanentAt='xxxl' pinned
                    onOverlayClick={this.toggleDrawerActive} >
                    <Navigation />
                </NavDrawer>
                <Panel onClick={this.toggleDrawerActive}>
                    <Header />
                    {this.props.children}
                    <Footer />
                </Panel>
            </MaterialDesignLayout>
        );
    }
}

const mapDispatchToProps = {
    toggleNavDrawer
}

const mapStateToProps = (state) => ({
    NavDrawerActive: state.app.navDrawerActive
})

const LayoutComponent = connect(mapStateToProps, mapDispatchToProps)(Layout);

export default withStyles(normalizeCss, s)(LayoutComponent);
