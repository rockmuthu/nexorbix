import prisma from "../../prisma"

export const create = (data: any) => prisma.details.create({ data })

export const getAll = () => prisma.details.findMany({})