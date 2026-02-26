import { Router } from 'express'
import { createNew, listAll } from '../controller/details'

const newRoutes = (router: Router) => {
    router.post('/create', createNew)
    router.get('/getData', listAll)
}

export default newRoutes