import React from 'react';
import Link from 'next/link';
import Post from '@/types/Post';
import {
    withStyles,
    createStyles,
    Card,
    CardHeader,
    CardMedia,
    IconButton
} from '@material-ui/core';
import {
    ArrowForwardIos
} from '@material-ui/icons';
import { WithStyles } from '@material-ui/styles';
import moment from 'moment';

const styles = createStyles({
    root: {
        margin: '1rem'
    },
    cardMedia: {
        marginBottom: '-6px'
    },
    image: {
        height: 'auto',
        width: '100%',
        borderRadius: '0 0 4px 4px'
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
              action={(
                  <Link href={{ pathname: '/posts/[date]', query: { date: data.date } }}>
                      <a>
                          <IconButton>
                              <ArrowForwardIos />
                          </IconButton>
                      </a>
                  </Link>
              )}
            />
            <CardMedia className={classes.cardMedia}>
                { data.mediaType === 'image' && (
                    <img className={classes.image} src={data.url} alt={data.title} />
                )}
                { data.mediaType === 'video' && (
                    <div className={classes.videoContainer}>
                        <iframe title={data.title} src={data.url} className={classes.video} />
                    </div>
                )}
            </CardMedia>
        </Card>
    );
}

export default withStyles(styles)(PostListItem);
