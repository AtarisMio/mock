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
import s from './Page.css';

const getScrollTop = () => {
    let bodyScrollTop = 0;
    let documentScrollTop = 0;
    if (document.body) {
        bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
    }
    return (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
}

const getScrollHeight = () => {
    let bodyScrollHeight = 0;
    let documentScrollHeight = 0;
    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    return (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
}

const getWindowHeight = () => {
    if (document.compatMode == "CSS1Compat") {
        return document.documentElement.clientHeight;
    }
    return document.body.clientHeight;
}

class Page extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        html: PropTypes.string.isRequired,
    };

    static childContextTypes = {
        triggerAtBottom: PropTypes.func.isRequired,
        triggerAtTop: PropTypes.func.isRequired,
    };

    getChildContext() {
        return {
            triggerAtBottom: this.triggerAtBottom,
            triggerAtTop: this.triggerAtTop,
        }
    }

    componentDidMount() {
        document.addEventListener('scroll', (e) => {
            if (getScrollTop() + getWindowHeight() - getScrollHeight() <= 100) { // 距离底端100px
                this.triggerAtBottom(e);
                return;
            }
            if (getScrollTop() <= 0) { // 到顶端
                this.triggerAtTop(e);
            }
        });
    }



    render() {
        const { title, html } = this.props;
        return (
            <div ref={this.getRef} className={s.root}>
                <div className={s.container}>
                    <h1>
                        {title}
                    </h1>
                    <div
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                </div>
            </div>
        );
    }
}

export default withStyles(s)(Page);
