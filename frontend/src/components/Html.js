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
import serialize from 'serialize-javascript';

/* eslint-disable react/no-danger */

const remHandle = () => {
    function setRem() {
        const html = window.document.documentElement;
        const width = html.getBoundingClientRect().width;
        const rem = (width > 1280 ? 1280 : width) / (375 / 37.5);
        html.style.fontSize = `${rem}px`;
        window.rem = rem;
    };
    let timer;
    function handle() {
        clearTimeout(timer);
        timer = setTimeout(setRem, 100);
    }
    window.addEventListener('resize', handle);
    window.addEventListener('pageshow', handle);
    setRem();
}

class Html extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        styles: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                cssText: PropTypes.string.isRequired,
            }).isRequired,
        ),
        error: PropTypes.bool,
        store: PropTypes.object, // eslint-disable-line react/forbid-prop-types, react/require-default-props
        scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
        app: PropTypes.object, // eslint-disable-line
        children: PropTypes.string.isRequired,
    };

    static defaultProps = {
        error: false,
        styles: [],
        scripts: [],
    };

    render() {
        const {
            error,
            title,
            description,
            styles,
            scripts,
            store,
            app,
            children,
        } = this.props;
        return (
            <html className="no-js" lang="en" style={{fontSize: '128px'}}>
                <head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                    <title>{title}</title>
                    <meta name="description" content={description} />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    {scripts.map(script =>
                        <link key={script} rel="preload" href={script} as="script" />
                    )}
                    <link rel="apple-touch-icon" href="apple-touch-icon.png" />
                    {styles.map(style =>
                        <style key={style.id} id={style.id} dangerouslySetInnerHTML={{ __html: style.cssText }} />,
                    )}
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `window.__PRELOADED_STATE__ = ${JSON.stringify(store || {}).replace(/</g, '\\u003c')}`,
                        }}
                    />
                </head>
                <body>
                    <div
                        id="app"
                        dangerouslySetInnerHTML={{ __html: children }}
                    />
                    { error ? null : <script
                        dangerouslySetInnerHTML={{
                            __html: `(${serialize(remHandle)})()`,
                        }}
                    /> }
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `window.App=${serialize(app)}`,
                        }}
                    />
                    {scripts.map(script =>
                        <script key={script} src={script} />,
                    )}
                </body>
            </html>
        );
    }
}

export default Html;
