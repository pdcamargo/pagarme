import { Schema, model } from 'mongoose'

import { CreditCardSchemaInterface } from '../interfaces/credit-card.interface'

const CreditCardSchema = new Schema({
  creditCardId: { type: String, required: true, unique: true },
  companyId: { type: Number, required: true },
  brand: { type: String, required: true },
  holderName: { type: String, required: true },
  firstDigits: { type: String, required: true },
  lastDigits: { type: String, required: true },
  country: { type: String, required: true },
  expirationDate: { type: String, required: true }
})

CreditCardSchema.methods.cardPlaceholder = function (): string {
  return this.firstDigits + ' **** ' + this.lastDigits
}

export default model<CreditCardSchemaInterface>('CreditCard', CreditCardSchema)
