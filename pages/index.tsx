import React from 'react';
import Head from 'next/head';
import { Router, withRouter } from 'next/router';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { AxiosResponse } from 'axios';
import Post from '@/types/Post';
import Layout, { siteTitle } from '@/components/Layout/layout';
import PageListItem from '@/components/PostListItem/postListItem';
import API from '@/lib/axios';
import getLastXDates from '@/lib/getLastXDates';
import {
    Grid,
    withStyles,
    createStyles
} from '@material-ui/core';
import {
    Pagination
} from '@material-ui/lab';
import { WithStyles } from '@material-ui/styles';

const styles = createStyles({
    root: {
        padding: '1rem'
    },
    pagination: {
        marginTop: '2rem auto'
    }
});

interface Props extends WithStyles<typeof styles> {
    data: Post[];
    page: number;
    router: Router;
}

function Home(props: Props): JSX.Element {
    const {
        data,
        classes,
        router,
        page
    } = props;

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number): void => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, page: `${page}` }
        });
    };

    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={classes.root}>
                <Grid container>
                    {data && data.map((item: Post, index: number) => (
                        <Grid item xs={12} key={index}>
                            <PageListItem data={item} />
                        </Grid>
                    ))}
                </Grid>
            </section>
            <Grid container justify="center">
                <Pagination
                  className={classes.pagination}
                  count={10}
                  page={page}
                  onChange={handlePageChange}
                />
            </Grid>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ query }: GetServerSidePropsContext) => {
    const offset: number = ((Number(query?.page) || 1) - 1) * 5;

    const data: Post[] = await Promise.all(getLastXDates(5, offset).map(
        (date: string) => API.nasa.get('/planetary/apod', {
            params: { date }
        }).then((res: AxiosResponse) => ({
            url: res.data.url,
            title: res.data.title,
            explanation: res.data.explanation,
            date: res.data.date,
            mediaType: res.data.media_type
        }))
    ));
    return {
        props: { data, page: Number(query?.page) || 1 }
    };
};

export default withRouter(withStyles(styles)(Home));
