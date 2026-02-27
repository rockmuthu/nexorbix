import { Router } from 'express'
import { createNew, listAll } from '../controller/details'
import { createNewContactUs, listAllContactUs } from '../controller/contactUs'
import { createNewProjectForm, listAllProjectForm } from '../controller/projectForm'

const newRoutes = (router: Router) => {
    router.post('/create', createNew)
    router.get('/get_data', listAll)
    router.post('/create_contact', createNewContactUs)
    router.get('/get_contact', listAllContactUs)
    router.post('/create_project', createNewProjectForm)
    router.get('/get_project', listAllProjectForm)
}

export default newRoutes