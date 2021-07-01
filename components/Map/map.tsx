import React from 'react';
import {
    withStyles,
    createStyles
} from '@material-ui/core';
import Customer from '@/types/Customer';
import { WithStyles } from '@material-ui/styles';
import {
    Map, Marker, TileLayer, Popup
} from 'react-leaflet';
import { Icon, icon } from 'leaflet';

const iconReduceTime: number = 40;
const customIcon: Icon = icon({
    iconUrl: '/images/marker.png',
    iconSize: [1024 / iconReduceTime, 1024 / iconReduceTime],
    iconAnchor: [512 / iconReduceTime, 1024 / iconReduceTime]
});

const styles = createStyles({
    mapContainer: {
        margin: '1rem',
        height: '500px',
        width: 'auto'
    },
    map: {
        height: '100%',
        width: '100%'
    }
});

interface Props extends WithStyles<typeof styles> {
    data: Customer[];
}

function MapComponent(props: Props): JSX.Element {
    const { data, classes } = props;
    return (
        <div className={classes.mapContainer}>
            <Map center={[46.5, 2]} zoom={5} className={classes.map}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                { data
                    .filter((item) => item.latitude && item.longitude && item.typeCode === 'deliver')
                    .map((item, index) => (
                        <Marker key={index} position={[item.latitude, item.longitude]} icon={customIcon}>
                            <Popup>{ item.displayName }</Popup>
                        </Marker>
                    )) }
            </Map>
        </div>
    );
}

export default withStyles(styles)(MapComponent);
