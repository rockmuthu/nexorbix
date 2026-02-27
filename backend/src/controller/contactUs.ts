import { Request, Response } from 'express'
import { createContactUs, getAllContactUs } from '../models/contactUs'

export const createNewContactUs = (req: Request, res: Response) => {
    createContactUs(req.body)
        .then(() => res.sendStatus(200))
        .catch((err: any) => {
            console.error('create ContactUs error:', err)
            res.sendStatus(500)
        })
}

export const listAllContactUs = (_req: Request, res: Response) => {
    getAllContactUs()
        .then((data: any) => res.status(200).json(data))
        .catch((err: any) => {
            console.error('ContactUs error:', err)
            res.sendStatus(500)
        })
}