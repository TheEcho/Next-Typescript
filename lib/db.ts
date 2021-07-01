import { createConnection, Connection } from 'typeorm';

const db: Connection = await createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'user',
    password: 'password',
    database: 'komet-api-master'
});

db.connect();
