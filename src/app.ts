import express, { Express } from 'express';
import path from 'path';
import BinaryParserRoutes from '../routes/binary-parser.routes';
import bodyParser from 'body-parser';

const app: Express = express();
const port: Number = 8080;

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../../docs`));
app.use("/api/v1/binary-parser", BinaryParserRoutes);

app.get('/*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../../docs/index.html`));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running on port ${port}`);
});