import pg from 'pg';
import credencials from './credencials.js';

const { Client } = pg;

const client = new Client({
  user: credencials.db_user,
  host: credencials.db_host,
  database: credencials.db_base,
  password: credencials.db_password,
  port: credencials.db_port,
});

client.connect();

const createTable = async () => { 
    await client.query(
      `CREATE TABLE IF NOT EXISTS clients (
        id serial PRIMARY KEY, 
        name VARCHAR (255), 
        email VARCHAR (255) UNIQUE NOT NULL, 
        phone VARCHAR (20) UNIQUE NOT NULL, 
        lat VARCHAR (30) NOT NULL, 
        long VARCHAR (30) NOT NULL
      );`
    )
  };
  
createTable();

export default client;