import React from 'react';
import Link from 'next/link';
import Post from '@/types/Post';
import {
    withStyles,
    createStyles,
    Card,
    CardHeader,
    CardMedia,
    CardActions,
    Button
} from '@material-ui/core';
import { WithStyles } from '@material-ui/styles';
import moment from 'moment';

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

function PostListItem(props: Props): JSX.Element {
    const { data, classes } = props;
    return (
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
            <CardActions>
                <Link href={{ pathname: '/posts/[date]', query: { date: data.date } }}>
                    <a>
                        <Button variant="outlined" color="primary" size="small">
                            Learn More
                        </Button>
                    </a>
                </Link>
            </CardActions>
        </Card>
    );
}

export default withStyles(styles)(PostListItem);
