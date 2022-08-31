import { Request, Response, Router } from 'express';
import BinaryParser from "../src";
import format from "../src/interfaces"

const bp = new BinaryParser();
const router = Router();

router
  .route('/encode')
  .post((req: Request, res: Response) => {
    try {
      const data: object = req.body.data;
      const formats: format[] = req.body.formats;
      const dataEncoded = bp.encode(data, formats);
      res.json({ size: dataEncoded.size, buffer: dataEncoded.buffer.toString("hex") });
    } catch (error) {
      res.status(500).send("Something went wrong encoding the data with the provided formats.")
    }

  });

router
  .route('/decode')
  .post((req: Request, res: Response) => {
    try {
      const buffer: Buffer = Buffer.from(req.body.buffer, "hex");
      const formats: format[] = req.body.formats;
      const dataDecoded = bp.decode(buffer, formats);
      res.json(dataDecoded);
    } catch (error) {
      res.status(500).send("Something went wrong decoding the buffer with the provided formats.")
    }
  });

export default router;
