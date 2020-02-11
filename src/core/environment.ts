class Environment {
  private requiredKeys = ['MONGO_DB_NAME', 'MONGO_DB_HOST', 'MONGO_DB_PORT', 'PAGARME_MODE', 'PAGARME_DEV_KEY', 'PAGARME_PROD_KEY']

  public validateRequiredKeys (): void {
    for (const key of this.requiredKeys) {
      if (!(key in process.env)) {
        throw Error('Missing required key ' + key)
      }
    }

    if (this.key('PAGARME_MODE') !== 'development' && this.key('PAGARME_MODE') !== 'production') {
      throw Error('PAGARME_MODE must be production or development, but got ' + this.key('PAGARME_MODE'))
    }
  }

  public key (key: string, defaultValue = ''): string {
    return process.env[key] != null ? process.env[key] : defaultValue
  }

  public get mongoDbHost (): string {
    return this.key('MONGO_DB_HOST')
  }

  public get mongoDbName (): string {
    return this.key('MONGO_DB_NAME')
  }

  public get mongoDbPort (): string {
    return this.key('MONGO_DB_PORT')
  }

  public get pagarmeKey (): string {
    return this.isPagarmeInProductionMode ? this.pagarmeProdKey : this.pagarmeDevKey
  }

  private get isPagarmeInProductionMode (): boolean {
    return this.key('PAGARME_MODE') === 'production'
  }

  private get pagarmeDevKey (): string {
    return this.key('PAGARME_DEV_KEY')
  }

  private get pagarmeProdKey (): string {
    return this.key('PAGARME_PROD_KEY')
  }
}

export default new Environment()
