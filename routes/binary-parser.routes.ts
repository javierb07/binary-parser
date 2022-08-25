import { Request, Response, Router } from 'express';

const router = Router();

router
  .route('/encode')
  .post((req: Request, res: Response) => {
    res.send("Encoding");
  });

router
  .route('/decode')
  .post((req: Request, res: Response) => {
    res.send("Decoding");
  });

export default router;
