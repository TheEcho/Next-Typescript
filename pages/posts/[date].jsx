import React from 'react';
import Head from 'next/head';
import Layout from '../../components/layout';
import Axios from '../../lib/axios';
import utilStyles from '../../styles/utils.module.css';
import getLastXDates from '../../lib/getLastXDates';

export default function FirstPost({ data }) {
    return (
        <Layout>
            <Head>
                <title>First Post</title>
            </Head>
            <h1>{ data.title }</h1>
            <section className={utilStyles.headingMd}>
                <img src={data.url} alt={data.title} />
                <p>{ data.explanation }</p>
                <p>{ data.date }</p>
            </section>
        </Layout>
    );
}

export async function getStaticProps({ params }) {
    const data = await Axios.get('/planetary/apod', {
        params: { date: params.date }
    }).then(res => res.data);

    return {
        props: { data }
    };
}

export async function getStaticPaths() {
    return {
        paths: getLastXDates(10).map(date => ({
            params: {
                date
            }
        })),
        fallback: false
    };
}
