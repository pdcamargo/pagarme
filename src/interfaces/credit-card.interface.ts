import { Document } from 'mongoose'

/* eslint-disable camelcase */
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

export interface CreditCardSchemaInterface extends Document {
    creditCardId: string
    companyId: number
    brand: string
    holderName: string
    firstDigits: string
    lastDigits: string
    country: string
    expirationDate: string
    cardPlaceholder(): string
}
