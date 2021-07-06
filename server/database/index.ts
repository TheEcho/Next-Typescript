import { createConnection, getConnection } from 'typeorm';
import type Customer from '@/types/Customer';
import db from './db.json';

const main = async () => {
    await createConnection();
    await getConnection().getRepository('customer').delete({});
    db.customers.forEach((customer: Customer) => {
        getConnection().getRepository('customer').save(customer);
    });
    process.exit(0);
};

main();
