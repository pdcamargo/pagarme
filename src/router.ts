import { Router } from 'express'

import CreditCardRouter from './routes/credit-card.route'
import TransactionRouter from './routes/transaction.route'

const routes = Router()

routes.use('/card', CreditCardRouter)
routes.use('/transaction', TransactionRouter)

export default routes
