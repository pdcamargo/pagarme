import { Request, Response } from 'express'

import { TransactionInterface } from '../interfaces/transaction.interface'
import TransactionService from '../services/transaction.service'

class TransactionController {
  public async createTransaction (req: Request, res: Response): Promise<Response> {
    const { companyId } = req.params
    const transactionParams: TransactionInterface = req.body
    const transaction = await TransactionService.createTransaction(parseInt(companyId), transactionParams)
    return res.send({
      transaction
    })
  }
}

export default new TransactionController()
