import { Router } from 'express'

import CreditCardController from '../controllers/credit-card.controller'

const CreditCardRouter = Router()

CreditCardRouter.post('/:companyId', CreditCardController.saveCreditCard)
CreditCardRouter.get('/list/:companyId', CreditCardController.getStoredCompanyCards)
CreditCardRouter.get('/:companyId/:cardId', CreditCardController.getStoredCardById)
CreditCardRouter.delete('/:companyId/:cardId', CreditCardController.deleteStoredCard)

export default CreditCardRouter
