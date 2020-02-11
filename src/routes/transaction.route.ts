import { Router } from 'express'

import TransactionController from '../controllers/transaction.controller'

const CreditCardRouter = Router()

CreditCardRouter.get('/:companyId', TransactionController.createTransaction)

export default CreditCardRouter
