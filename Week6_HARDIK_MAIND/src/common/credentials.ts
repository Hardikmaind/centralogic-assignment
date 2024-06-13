import * as dotenv from 'dotenv';
dotenv.config();

const credentials ={
   postgres:{
    USERNAME : process.env.DATABASE_USER || "",
    DATABASE : process.env.DATABASE_NAME || "",
    HOST  : process.env.DATABASE_HOST || "",
    PASSWORD : process.env.DATABASE_PASSWORD || "",
    DBPORT : Number(process.env.DATABASE_PORT) || 5432,
   }

   

   
}

export default credentials;