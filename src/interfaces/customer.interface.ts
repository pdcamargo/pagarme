/* eslint-disable camelcase */
export interface CustomerInterface {
  external_id: string
  name: string
  type: 'individual'|'corporation'
  country: string
  email: string
  documents: [
    {
      'type': string,
      'number': string
    }
  ]
  phone_numbers: string[]
  birthday: string
  object?: 'customer'
  id?: number
  date_created?: Date
}
