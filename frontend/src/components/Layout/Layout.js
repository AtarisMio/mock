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

// external-global styles must be imported in your JS.
import s from './Layout.css';
import { ThemeProvider, Layout as MaterialDesignLayout, NavDrawer, Panel } from '../Material-Design'
import Navigation from '../Navigation';
import Header from '../Header';
import Feedback from '../Feedback';
import Footer from '../Footer';

class Layout extends React.Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        hasTheme: PropTypes.bool.isRequired,
        NavDrawerActive: PropTypes.bool.isRequired,
    };

    render() {
        return (
            <ThemeProvider hasTheme={this.props.hasTheme} >
                <MaterialDesignLayout>
                    <NavDrawer
                        scrollY
                        pinned={this.props.NavDrawerActive}
                    >
                        <Navigation />
                    </NavDrawer>
                    <Panel>
                        <Header />
                        <MaterialDesignLayout  className={s.content}>
                            {this.props.children}
                        </MaterialDesignLayout>
                        <Footer />
                    </Panel>
                </MaterialDesignLayout>
            </ThemeProvider>
        );
    }
}

const mapDispatchToProps = {
}

const mapStateToProps = (state) => ({
    hasTheme: state.app.hasTheme,
    NavDrawerActive: state.app.navDrawerActive
})

const LayoutComponent = connect(mapStateToProps, mapDispatchToProps)(Layout);

export default withStyles(normalizeCss, s)(LayoutComponent);
