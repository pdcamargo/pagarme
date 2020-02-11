import { Request, Response } from 'express'

import { TransactionInterface } from '../interfaces/transaction.interface'
import TransactionService from '../services/transaction.service'

class TransactionController {
  public async createTransaction (req: Request, res: Response): Promise<Response> {
    const { companyId } = req.params
    const card: TransactionInterface = req.body
    return res.send({
      data: await TransactionService.createTransaction(parseInt(companyId), card)
    })
  }
}

export default new TransactionController()
