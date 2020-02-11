import { Request, Response } from 'express'

import CreditCardService from '../services/credit-card.service'

class CreditCardController {
  public async saveCreditCard (req: Request, res: Response): Promise<Response> {
    const { companyId } = req.params

    const cardHash = await CreditCardService.saveCreditCard(parseInt(companyId), req.body)

    return res.send({
      hash: cardHash
    })
  }

  public async getStoredCompanyCards (req: Request, res: Response): Promise<Response> {
    const { companyId } = req.params

    const cards = await CreditCardService.getCompanyStoredCards(parseInt(companyId))

    return res.send(cards)
  }

  public async getStoredCardById (req: Request, res: Response): Promise<Response> {
    const { companyId, cardId } = req.params
    const card = await CreditCardService.getStoredCardById(parseInt(companyId), cardId)

    return res.send({
      card
    })
  }

  public async deleteStoredCard (req: Request, res: Response): Promise<Response> {
    const { companyId, creditCardId } = req.params
    const deleted = await CreditCardService.deleteCreditCard(parseInt(companyId), creditCardId)

    return res.send({
      deleted: deleted
    })
  }
}

export default new CreditCardController()
