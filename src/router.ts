import { Router } from 'express'

import ChargebackRouter from './routes/chargeback.route'
import CreditCardRouter from './routes/credit-card.route'
import TransactionRouter from './routes/transaction.route'

const routes = Router()

routes.use('/card', CreditCardRouter)
routes.use('/transaction', TransactionRouter)
routes.use('/chargeback', ChargebackRouter)

export default routes
