import express from 'express'
import newRoutes from './details'

const router = express.Router()

newRoutes(router)

export default router