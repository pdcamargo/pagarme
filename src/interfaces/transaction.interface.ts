import { AddressInterface } from './address.interface'

/* eslint-disable camelcase */
export interface TransactionItem {
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
}
