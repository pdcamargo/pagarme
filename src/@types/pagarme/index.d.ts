/* eslint-disable camelcase */
declare module 'pagarme' {

  export interface CreditCardInterface {
    card_holder_name: string
    card_expiration_date: string
    card_number: string
    card_cvv: string
  }

  export interface PagarmeCreditCardInterface {
    object: 'card'
    id: string
    date_created: Date
    date_updated: Date
    brand: string
    holder_name: string
    first_digits: string
    last_digits: string
    country: string
    fingerprint: string
    customer: null
    valid: boolean
    expiration_date: string
  }

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

  export interface CustomerInterface {
    external_id: string
    name: string
    type: string
    country: string
    email: string
    documents: [
      {
        'type': string,
        'number': string
      }
    ]
    phone_numbers: string[]
    birthday: string
    object?: 'customer'
    id?: number
    date_created?: Date
  }

  export interface AddressInterface {
    object?: 'address'
    street: string
    street_number: string
    zipcode: string
    country: string
    state: string
    city: string
    neighborhood: string
    complementary?: string
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

  export interface ChargebackInterface {
    id: number
    bank_code?: string
    agencia?: string
    agencia_dv?: string
    conta?: string
    conta_dv?: string
    document_number?: string
    legal_name?: string
    async?: boolean
    type?: 'conta_corrente'|'conta_poupanca'|'conta_corrente_conjunta'|'conta_poupanca_conjunta'
  }

  interface Client {
    connect(data: {api_key: string}): Promise<ConnectedClient>
  }

  interface ConnectedClient {
    cards: {
      create(card: CreditCardInterface): Promise<PagarmeCreditCardInterface>
    }
    transactions: {
      create(transaction: TransactionInterface): Promise<PagarmeTransactionInterface>
      refund(refund: ChargebackInterface): Promise<PagarmeTransactionInterface>
    }
  }

  const client: Client
}
