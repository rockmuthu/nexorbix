import { Application, Request, Response } from 'express'
import routes from './routes/index'

const healthRoute = (app: Application): void => {
    app.get('/health', (_req: Request, res: Response) => {
        res.status(200).send()
    })
}

const nonExistingRoute = (app: Application): void => {
    app.use((_req: Request, res: Response) => {
        res.status(404).send("Sorry can't find that!!!!")
    })
}

const setRoutes = (app: Application): void => {
    healthRoute(app)
    app.use('/api', routes)
    nonExistingRoute(app)
}

export default setRoutes