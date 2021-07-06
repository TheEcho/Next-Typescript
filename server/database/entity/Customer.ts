import { EntitySchema } from 'typeorm';

export interface Customer {
    id: number;
    displayName: string;
    latitude: number;
    longitude: number;
    typeCode: string;
}

export const CustomerEntity = new EntitySchema<Customer>({
    name: 'customer',
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true
        },
        displayName: {
            type: String
        },
        latitude: {
            type: 'double'
        },
        longitude: {
            type: 'double'
        },
        typeCode: {
            type: String
        }
    }
});
