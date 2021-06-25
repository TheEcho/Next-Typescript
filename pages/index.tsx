import React from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { AxiosResponse } from 'axios';
import Post from '@/types/Post';
import Layout, { siteTitle } from '@/components/Layout/layout';
import PageListItem from '@/components/PostListItem/postListItem';
import Axios from '@/lib/axios';
import getLastXDates from '@/lib/getLastXDates';
import {
    Grid,
    withStyles,
    createStyles
} from '@material-ui/core';
import { WithStyles } from '@material-ui/styles';

const styles = createStyles({
    root: {
        padding: '1rem'
    }
});

interface Props extends WithStyles<typeof styles> {
    data: Post[];
}

function Home(props: Props): JSX.Element {
    const { data, classes } = props;
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={classes.root}>
                <Grid container>
                    {data.map((item: Post, index: number) => (
                        <Grid item xs={12} key={index}>
                            <PageListItem data={item} />
                        </Grid>
                    ))}
                </Grid>
            </section>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const data: Post[] = await Promise.all(getLastXDates(10).map((date: string) => Axios.get('/planetary/apod', {
        params: { date }
    }).then((res: AxiosResponse) => ({
        url: res.data.url,
        title: res.data.title,
        explanation: res.data.explanation,
        date: res.data.date,
        mediaType: res.data.media_type
    }))));
    return {
        props: { data }
    };
};

export default withStyles(styles)(Home);
