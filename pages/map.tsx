import React from 'react';
import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import { AxiosResponse } from 'axios';
import Customer from '@/types/Customer';
import Layout from '@/components/Layout/layout';
import API from '@/lib/axios';
import {
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
    data: Customer[];
}

function Map(props: Props): JSX.Element {
    const { data, classes } = props;
    const MapWithoutSSR = dynamic(() => import('@/components/Map/map'), {
        ssr: false
    });

    return (
        <Layout>
            <section className={classes.root}>
                <MapWithoutSSR data={data} />
            </section>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const data: Customer[] = await API.db.get('/gps').then((res: AxiosResponse) => res.data.customers);
    return {
        props: { data }
    };
};

export default withStyles(styles)(Map);
