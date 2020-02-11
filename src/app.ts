import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'

import environment from './core/environment'
import routes from './router'

require('dotenv').config()
const { Kafka } = require('kafkajs')

class App {
    public express: express.Application
    private kafka
    private producer

    constructor () {
      environment.validateRequiredKeys()
      this.express = express()

      this.middlewares()
      this.database()
      // this.kafkaInit()
      // this.kafkaProducerInit()
      this.routes()
    }

    private middlewares (): void {
      this.express.use(express.json())
      this.express.use(cors())
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // this.express.use((req: any) => {
      //   req.producer = this.producer
      // })
    }

    private database (): void {
      mongoose.connect('mongodb://' + environment.mongoDbHost + ':' + environment.mongoDbPort + '/' + environment.mongoDbName + '', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      })
    }

    private routes (): void {
      this.express.use(routes)
    }

    private kafkaInit (): void {
      this.kafka = new Kafka({
        clientId: 'my-app',
        brokers: ['localhost:9092']
      })
    }

    private kafkaProducerInit (): void {
      this.producer = this.kafka.producer()
    }
}

export default new App().express
