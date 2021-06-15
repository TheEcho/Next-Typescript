import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import Axios from '../lib/axios';
import getLastXDates from '../lib/getLastXDates';
import utilStyles from '../styles/utils.module.css';
import style from './index.module.css';

export default function Home({ data }) {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={{ ...utilStyles.headingMd, ...style.list }}>
                { data.map((item, index) => (
                    <Link key={index} href={`/posts/${item.date}`}>
                        <img className={style.listItem} src={item.url} alt={item.title} />
                    </Link>
                ))}
            </section>
        </Layout>
    );
}

export async function getStaticProps() {
    const data = await Promise.all(getLastXDates(10).map(date => Axios.get('/planetary/apod', {
        params: { date }
    }).then(res => res.data)));
    return {
        props: { data }
    };
}
