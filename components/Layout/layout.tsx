import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {
    withStyles,
    createStyles,
    Paper,
    Theme
} from '@material-ui/core';
import { WithStyles } from '@material-ui/styles';
import nasaLogo from '@/public/images/nasa-logo.png';

export const siteTitle = 'Astronomy Picture of the Day';
const styles = (theme: Theme) => createStyles({
    container: {
        margin: '2rem auto',
        padding: '1rem',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
            margin: '0'
        },
        [theme.breakpoints.down('xl')]: {
            maxWidth: '960px'
        },
        [theme.breakpoints.up('xl')]: {
            maxWidth: '1280px'
        }
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    backToHome: {
        margin: '3rem 0 0'
    }
});

interface Props extends WithStyles<typeof styles> {
    children: JSX.Element[] | JSX.Element;
    home?: boolean;
}

function Layout(props: Props): JSX.Element {
    const { children, home, classes } = props;
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content="NASA APOD" />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <header className={classes.header}>
                <>
                    <Link href="/map">
                        <a>
                            <Image
                              priority
                              src={nasaLogo}
                              alt={siteTitle}
                              height={200}
                              width={400}
                            />
                        </a>
                    </Link>
                    <h1>{siteTitle}</h1>
                </>
            </header>
            <Paper elevation={3} className={classes.container}>
                <main>{children}</main>
                {!home && (
                    <div className={classes.backToHome}>
                        <Link href="/">
                            <a>← Back to home</a>
                        </Link>
                    </div>
                )}
            </Paper>
        </>
    );
}

export default withStyles(styles)(Layout);
