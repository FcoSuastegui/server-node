import mysql from 'promise-mysql';

import key from './key';

const pool = mysql.createPool(key.database);

pool.getConnection()
    .then( connection => {
        pool.releaseConnection(connection);
        console.log('DB is Connected');
    })
    .catch( error => {
        console.error( error );
    });

export default pool;