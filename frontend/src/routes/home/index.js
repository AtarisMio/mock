/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { connect } from 'react-redux'
import Home from './Home';
import Layout from '../../components/Layout';

const mapDispatchToProps = {
}

const mapStateToProps = (state) => ({
    isNow: state.app.isNow
})

const HomeComponent = connect(mapStateToProps, mapDispatchToProps)(Home);

export default async function loadPage({ fetch }) {
    // const resp = await fetch('/graphql', {
    //     body: JSON.stringify({
    //         query: '{news{title,link,content}}',
    //     }),
    // });
    // const { data } = await resp.json();
    const resp = await fetch('/api');
    const data = { news: [], resp };
    // if (!data || !data.news) throw new Error('Failed to load the news feed.');
    return {
        chunks: ['home'],
        title: 'React Starter Kit',
        component: (
            <Layout>
                <HomeComponent news={data.news} />
            </Layout>
        ),
    };
}
