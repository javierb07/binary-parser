import express, { Express, Request, Response } from 'express';
import path from 'path';
import BinaryParserRoutes from './routes/binary-parser.routes';

const app: Express = express();
const port = 8080;

app.use("/api/v1/binary-parser", BinaryParserRoutes);

app.get('/*', (req, res) => {
    console.log(__dirname)
    res.sendFile(path.join(`${__dirname}/../README.md`));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running on port ${port}`);
});