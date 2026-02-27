import prisma from "../../prisma"

export const createContactUs = (data: any) => prisma.contactUs.create({ data })

export const getAllContactUs = () => prisma.contactUs.findMany({})