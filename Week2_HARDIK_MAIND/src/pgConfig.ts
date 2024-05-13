

import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config({ path: "./.env" });

const pool = new Pool({
    // connectionString: `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`,
    connectionString: `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`,
    
});

// SQL query to create the orders table if not exists
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        orderID VARCHAR(255) UNIQUE NOT NULL
    );
`;

// Connect to the database and create the orders table if not exists
pool.connect((err, client, done) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }

    // Execute the query to create the orders table
    client.query(createTableQuery, (err, result) => {
        done(); // Release the client back to the pool

        if (err) {
            console.error('Error creating table:', err);
            return;
        }

        console.log('Table "orders" created successfully');
    });
});

export default pool;
