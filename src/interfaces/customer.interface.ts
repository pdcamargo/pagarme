/* eslint-disable camelcase */
export interface CustomerInterface {
  external_id: string
  name: string
  type: string
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
}

export interface PagarmeCustomerInterface extends CustomerInterface {
  object: 'customer'
  id: number
  date_created: Date
}
