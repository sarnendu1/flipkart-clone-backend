import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from "mongoose";
// (node:15846) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead. (Use `node --trace-deprecation ...` to show where the warning was created)
//Mongoose is now at v5.4.13. Per their docs, these are the fixes for the deprecation warnings...
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


import Connection from './database/db.js';
import Routes from './routes/route.js';


dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const URL = 'mongodb://atlas-sql-6148a523fa999369c7a5ac31-qqvrd.a.query.mongodb.net/flipkartclone?ssl=true&authSource=admin';

Connection(process.env.MONGODB_URI || URL);

if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'))
}

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));


app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/', Routes);

