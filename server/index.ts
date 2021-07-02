/* eslint-disable no-console */
import express, { Request, Response } from 'express';
import { createConnection, getConnection } from 'typeorm';
import next from 'next';
import Customer from '@/types/Customer';

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
    const server = express();
    await createConnection();

    server.get('/api/gps', async (req: Request, res: Response) => {
        let query: string = '';
        query += 'SELECT c.display_name AS displayName, a.latitude, a.longitude, at.code AS typeCode ';
        query += 'FROM customer c ';
        query += 'INNER JOIN customer_address ca ON (c.id = ca.customer_id) ';
        query += 'INNER JOIN address a ON (ca.address_id = a.id)';
        query += 'INNER JOIN address_type at ON (at.id = a.type_id)';
        query += 'WHERE a.latitude IS NOT NULL AND a.longitude IS NOT NULL';

        const customers = await getConnection().query(query);

        res.status(200).json({
            customers: customers.map((item: Customer) => ({
                ...item,
                latitude: parseFloat(`${item.latitude}`.replace(',', '.')),
                longitude: parseFloat(`${item.longitude}`.replace(',', '.'))
            }))
        });
    });

    server.all('*', (req: Request, res: Response) => handle(req, res));

    server.listen(port, (err?: any) => {
        if (err) throw err;
        console.info(`> Ready on http://localhost:${port}`);
    });
});
