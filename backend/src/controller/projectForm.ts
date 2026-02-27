import { Request, Response } from 'express'
import { createProjectForm, getAllProjectForm } from '../models/projectForm'

export const createNewProjectForm = (req: Request, res: Response) => {
    createProjectForm(req.body)
        .then(() => res.sendStatus(200))
        .catch((err: any) => {
            console.error('create ProjectForm error:', err)
            res.sendStatus(500)
        })
}

export const listAllProjectForm = (_req: Request, res: Response) => {
    getAllProjectForm()
        .then((data: any) => res.status(200).json(data))
        .catch((err: any) => {
            console.error('ProjectForm error:', err)
            res.sendStatus(500)
        })
}