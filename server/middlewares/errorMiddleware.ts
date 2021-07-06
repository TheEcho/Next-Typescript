import type { ErrorRequestHandler } from 'express';

const errorMiddleWare: ErrorRequestHandler = (err, req, res) => {
    console.error(err);
    res.status(err.status || 500).send({
        error: {
            status: err.status || 500,
            message: err.message || 'Internal Server Error'
        }
    });
};

export default errorMiddleWare;
