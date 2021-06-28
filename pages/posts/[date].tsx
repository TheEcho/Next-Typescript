import React from 'react';
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next';
import { AxiosResponse } from 'axios';
import Layout from '@/components/Layout/layout';
import Axios from '@/lib/axios';
import getLastXDates from '@/lib/getLastXDates';
import Post from '@/types/Post';
import {
    withStyles,
    createStyles,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    Typography
} from '@material-ui/core';
import moment from 'moment';
import { WithStyles } from '@material-ui/styles';

const styles = createStyles({
    root: {
        margin: '1rem'
    },
    image: {
        height: 'auto',
        width: '100%'
    },
    videoContainer: {
        position: 'relative',
        overflow: 'hidden',
        height: 0,
        paddingBottom: '56.25%',
        width: '100%'
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    }
});

interface Props extends WithStyles<typeof styles> {
    data: Post;
}

function PostPage(props: Props): JSX.Element {
    const { data, classes } = props;

    return (
        <Layout>
            <Head>
                <title>{data.title}</title>
            </Head>
            <Card className={classes.root}>
                <CardHeader
                  title={data.title}
                  subheader={moment(data.date).format('dddd, MMMM Do YYYY')}
                />
                <CardMedia>
                    { data.mediaType === 'image' && (
                        <img className={classes.image} src={data.url} alt={data.title} />
                    )}
                    { data.mediaType === 'video' && (
                        <div className={classes.videoContainer}>
                            <iframe title={data.title} src={data.url} className={classes.video} />
                        </div>
                    )}
                </CardMedia>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        { data.explanation }
                    </Typography>
                </CardContent>
            </Card>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
    const data = await Axios.get('/planetary/apod', {
        params: { date: params?.date }
    }).then((res: AxiosResponse) => ({
        url: res.data.url,
        title: res.data.title,
        explanation: res.data.explanation,
        date: res.data.date,
        mediaType: res.data.media_type
    }));
    return {
        props: { data }
    };
};

export const getStaticPaths: GetStaticPaths = () => ({
    paths: getLastXDates(10).map((date) => ({
        params: {
            date
        }
    })),
    fallback: true
});

export default withStyles(styles)(PostPage);
