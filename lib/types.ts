import { Prisma } from "./generated/prisma"

export const staffDataInclude = {
    institution:true
} satisfies Prisma.StaffInclude
export type StaffData = Prisma.StaffGetPayload<{include:typeof staffDataInclude}>