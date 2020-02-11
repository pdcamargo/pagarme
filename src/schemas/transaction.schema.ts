/* eslint-disable @typescript-eslint/camelcase */
import { Schema, model } from 'mongoose'

import { TransactionSchemaInterface } from '../interfaces/transaction.interface'

const TransactionSchema = new Schema({
  companyId: { type: Number, required: true },
  id: { type: Number, required: true },
  creditCardId: { type: String, required: false, default: null },
  postbackUrl: { type: String, required: false, default: null },
  boletoUrl: { type: String, required: false, default: null },
  boletoBarcode: { type: String, required: false, default: null },
  status: { type: String, required: true },
  refseReason: { type: String, required: false, default: null },
  statusReason: { type: String, required: true },
  amount: { type: Number, required: true },
  authorizedAmount: { type: Number, required: true },
  paidAmount: { type: Number, required: true },
  refundedAmount: { type: Number, required: true },
  installments: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  dateCreated: { type: Date, required: true },
  dateUpdated: { type: Date, required: true },
  customer: {
    external_id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true }
  }
})

export default model<TransactionSchemaInterface>('Transaction', TransactionSchema)
