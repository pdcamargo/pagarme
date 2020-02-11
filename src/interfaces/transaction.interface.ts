import { Document } from 'mongoose'

import { AddressInterface } from './address.interface'
import { CustomerInterface } from './customer.interface'

/* eslint-disable camelcase */
export interface TransactionItem {
  object?: 'item'
  id: string
  title: string
  unit_price: number
  quantity: number
  tangible: boolean
  category: string
}

export interface TransactionInterface {
  amount: number
  billing: {
    name: string,
    address: AddressInterface
  }
  items: TransactionItem[]
  payment_method: 'boleto'|'credit_card'
  async: boolean
  postback_url: string
  installments: '1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'10'|'11'|'12'
  soft_descriptor?: string
  card_number?: string
  card_cvv?: string
  card_expiration_date?: string
  card_holder_name?: string
  card_id?: string
  boleto_expiration_date?: string
  boleto_instructions?: string
  customer: CustomerInterface
}

export interface TransactionSchemaInterface extends Document {
  companyId: number
  id: number
  customer: CustomerInterface
  postbackUrl: string|null
  creditCardId: string|null
  boletoUrl: string|null
  boletoBarcode: string|null
  status: 'processing'|'authorized'|'paid'|'refunded'|'waiting_payment'|'pending_refund'|'refused'
  refseReason: null|'acquirer'|'antifraud'|'internal_error'|'no_acquirer'|'acquirer_timeout'
  statusReason: 'acquirer'|'antifraud'|'internal_error'|'no_acquirer'|'acquirer_timeout'
  amount: number
  authorizedAmount: number
  paidAmount: number
  refundedAmount: number
  installments: number
  paymentMethod: 'boleto'|'credit_card'
  dateCreated: Date
  dateUpdated: Date
}

export interface PagarmeTransactionInterface extends TransactionInterface {
  object: 'transaction'
  status: 'processing'|'authorized'|'paid'|'refunded'|'waiting_payment'|'pending_refund'|'refused'
  refse_reason?: 'acquirer'|'antifraud'|'internal_error'|'no_acquirer'|'acquirer_timeout'
  status_reason: 'acquirer'|'antifraud'|'internal_error'|'no_acquirer'|'acquirer_timeout'
  acquirer_name: string
  acquirer_id: string
  acquirer_response_code: string
  authorization_code: string
  soft_descriptor?: string
  tid: number
  nsu: number
  date_created: Date
  date_updated: Date
  amount: number
  authorized_amount: number
  paid_amount: number
  refunded_amount: number
  id: number
  cost: number
  antifraud_score?: string
  boleto_url?: string
  boleto_barcode?: string
  referer: string
  ip: string
}
