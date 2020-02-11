import pagarme from 'pagarme'

import environment from '../core/environment'
import { PagarmeCreditCardInterface, CreditCardInterface, CreditCardSchemaInterface } from '../interfaces/credit-card.interface'
import CreditCard from '../schemas/credit-card.schema'

class CreditCardService {
  public async saveCreditCard (companyId: number, card: CreditCardInterface): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/camelcase
    const client = await pagarme.client.connect({ api_key: environment.pagarmeKey })

    const pagarmeCard: PagarmeCreditCardInterface = await client.cards.create(card)

    const cardExists = await this.cardIdAlreadyExists(companyId, pagarmeCard.id)

    if (!cardExists) {
      await this.storeCreditCard(companyId, pagarmeCard)
    }

    return pagarmeCard.id
  }

  public async storeCreditCard (companyId: number, card: PagarmeCreditCardInterface): Promise<CreditCardSchemaInterface> {
    const storedCreditcard = await CreditCard.create({
      companyId: companyId,
      creditCardId: card.id,
      brand: card.brand,
      holderName: card.holder_name,
      firstDigits: card.first_digits,
      lastDigits: card.last_digits,
      country: card.country,
      expirationDate: card.expiration_date
    })

    return storedCreditcard
  }

  public async cardIdAlreadyExists (companyId: number, cardId: string): Promise<boolean> {
    const company = await CreditCard.findOne({
      companyId: companyId,
      creditCardId: cardId
    })

    return company != null
  }

  public async getCompanyStoredCards (companyId: number): Promise<CreditCardSchemaInterface[]> {
    const cards = await CreditCard.find({
      companyId: companyId
    })

    return cards
  }

  public async deleteCreditCard (companyId: number, cardId: string): Promise<boolean> {
    const deleteInformation = await CreditCard.deleteOne({
      companyId: companyId,
      creditCardId: cardId
    })

    return deleteInformation.deletedCount === 1
  }

  public async getStoredCardById (companyId: number, cardId: string): Promise<CreditCardSchemaInterface> {
    const card = await CreditCard.findOne({
      creditCardId: cardId,
      companyId: companyId
    })

    return card
  }
}

export default new CreditCardService()
