/* eslint-disable no-console */
import express from 'express';
import type { Request, Response } from 'express';
import { createConnection } from 'typeorm';
import next from 'next';
import { api } from './routes';
import { errorMiddleware } from './middlewares';

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
    const server = express();
    await createConnection();

    server.use('/api', api);
    server.all('*', (req: Request, res: Response) => handle(req, res));

    server.use(errorMiddleware);

    server.listen(port, (err?: any) => {
        if (err) throw err;
        console.info(`> Ready on http://localhost:${port}`);
    });
});
