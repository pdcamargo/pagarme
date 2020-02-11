import { Router } from 'express'

import ChargebackController from '../controllers/chargeback.controller'

const ChargebackRouter = Router()

ChargebackRouter.post('/:companyId', ChargebackController.refund)

export default ChargebackRouter
