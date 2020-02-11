import { TransactionInterface } from '../interfaces/transaction.interface'

export function sanatizeTransactionObject (transaction: TransactionInterface): TransactionInterface {
  const copyTransaction = transaction
  if (transaction.payment_method === 'boleto') {
    delete copyTransaction.card_id
    delete copyTransaction.card_cvv
    delete copyTransaction.card_expiration_date
    delete copyTransaction.card_holder_name
    delete copyTransaction.card_number

    copyTransaction.installments = '1'
  }

  if (transaction.payment_method === 'credit_card') {
    if (transaction.card_id !== null && transaction.card_id.trim() !== '') {
      delete copyTransaction.card_cvv
      delete copyTransaction.card_expiration_date
      delete copyTransaction.card_holder_name
      delete copyTransaction.card_number
    } else {
      delete copyTransaction.card_id
    }
  }

  return copyTransaction
}
