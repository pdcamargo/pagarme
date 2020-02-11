import pagarme from 'pagarme'

import environment from '../core/environment'
import { sanatizeTransactionObject } from '../core/utils'
import { TransactionInterface, TransactionSchemaInterface, PagarmeTransactionInterface } from '../interfaces/transaction.interface'
import Transaction from '../schemas/transaction.schema'

class TransactionService {
  public async createTransaction (companyId: number, transaction: TransactionInterface): Promise<TransactionSchemaInterface> {
    // eslint-disable-next-line @typescript-eslint/camelcase
    const client = await pagarme.client.connect({ api_key: environment.pagarmeKey })

    const sanatizedTransactionObject = sanatizeTransactionObject(transaction)

    const pagarmeTransaction: PagarmeTransactionInterface = await client.transactions.create(sanatizedTransactionObject)

    const transactionSchema = await this.storeTransaction(companyId, pagarmeTransaction)

    return transactionSchema
  }

  public async storeTransaction (companyId: number, transaction: PagarmeTransactionInterface): Promise<TransactionSchemaInterface> {
    const storedTransaction = await Transaction.create({
      companyId: companyId,
      id: transaction.id,
      customer: transaction.customer,
      postbackUrl: transaction.postback_url,
      creditCardId: transaction.card_id,
      boletoUrl: transaction.boleto_url,
      boletoBarcode: transaction.boleto_barcode,
      status: transaction.status,
      refseReason: transaction.refse_reason,
      statusReason: transaction.status_reason,
      amount: transaction.amount,
      authorizedAmount: transaction.authorized_amount,
      paidAmount: transaction.paid_amount,
      refundedAmount: transaction.refunded_amount,
      installments: parseInt(transaction.installments),
      paymentMethod: transaction.payment_method,
      dateCreated: transaction.date_created,
      dateUpdated: transaction.date_updated
    })

    return storedTransaction
  }

  public async getCompanyStoredTransaction (companyId: number): Promise<TransactionSchemaInterface[]> {
    const transactions = await Transaction.find({
      companyId: companyId
    })

    return transactions
  }
}

export default new TransactionService()
