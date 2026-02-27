import prisma from "../../prisma"

export const createProjectForm = (data: any) => prisma.projectForm.create({ data })

export const getAllProjectForm = () => prisma.projectForm.findMany({})