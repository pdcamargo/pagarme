/* eslint-disable camelcase */
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
