import pagarme from 'pagarme'

import environment from '../core/environment'
import { sanatizeTransactionObject } from '../core/utils'
import { TransactionInterface } from '../interfaces/transaction.interface'

class TransactionService {
  public async createTransaction (companyId: number, transaction: TransactionInterface): Promise<TransactionInterface> {
    return sanatizeTransactionObject(transaction)
  }
}

export default new TransactionService()
