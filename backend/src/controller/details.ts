import { Request, Response } from 'express'
import { create, getAll } from '../models/details'

export const createNew = (req: Request, res: Response) => {
    create(req.body)
        .then(() => res.sendStatus(200))
        .catch((err: any) => {
            console.error('createNew error:', err)
            res.sendStatus(500)
        })
}

export const listAll = (_req: Request, res: Response) => {
    getAll()
        .then((data: any) => res.status(200).json(data))
        .catch((err: any) => {
            console.error('listAll error:', err)
            res.sendStatus(500)
        })
}