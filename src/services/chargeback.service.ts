import pagarme from 'pagarme'

import environment from '../core/environment'
import { sanatizeChargebackObject } from '../core/utils'
import { ChargebackInterface } from '../interfaces/chargeback.interface'
import { PagarmeTransactionInterface } from '../interfaces/transaction.interface'
import Transaction from '../schemas/transaction.schema'

class ChargebackService {
  public async refund (companyId: number, refund: ChargebackInterface): Promise<{ status: string }> {
    // eslint-disable-next-line @typescript-eslint/camelcase
    const client = await pagarme.client.connect({ api_key: environment.pagarmeKey })
    const isTransactionByCreditCard = await this.isTransactionByCreditCard(companyId, refund.id)
    const sanatizedChargebackObject = sanatizeChargebackObject(refund, isTransactionByCreditCard)

    const pagarmeTransaction: PagarmeTransactionInterface = await client.transactions.refund(sanatizedChargebackObject)

    await this.updateTransactionStatus(companyId, refund.id, pagarmeTransaction.status)

    return {
      status: pagarmeTransaction.status
    }
  }

  private async isTransactionByCreditCard (companyId: number, id: number): Promise<boolean> {
    const transaction = await Transaction.findOne({
      id: id,
      companyId: companyId
    }, 'paymentMethod')

    return transaction.paymentMethod === 'credit_card'
  }

  private async updateTransactionStatus (companyId: number, id: number, status: string): Promise<void> {
    await Transaction.update({
      companyId: companyId,
      id: id
    }, {
      $set: { status: status }
    })
  }
}

export default new ChargebackService()
