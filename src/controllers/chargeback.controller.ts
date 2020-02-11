import { Request, Response } from 'express'

class ChargebackController {
  public async refund (req: Request, res: Response): Promise<Response> {
    return res.send({})
  }
}

export default new ChargebackController()
