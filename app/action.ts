"use server";

import prisma from "@/lib/prisma";
import { staffDataInclude } from "@/lib/types";
import { staffSchema, StaffSchema } from "@/lib/validation";
import { cache } from "react";

async function allStaffs() {
  return await prisma.staff.findMany({
    orderBy: { id: "asc" },
    include: staffDataInclude,
  });
}
export const getAllStaffs = cache(allStaffs);

export async function upsertStaff(input: StaffSchema) {
  //TODO: use authorization
  const { id, employeeNumber, name, supplierNumber, tin } =
    staffSchema.parse(input);
  const hasTin = !!tin;
  return await prisma.staff.upsert({
    where: { id },
    create: {
      employeeNumber,
      name,
      supplierNumber,
      tin: tin!,
      hasTin,
    },
    update: {
      employeeNumber,
      name,
      supplierNumber,
      tin: tin!,
      hasTin,
    },
    include: staffDataInclude,
  });
}

export async function deleteStaff(id: number) {
  //TODO: use authorization

  return await prisma.staff.delete({
    where: { id },
    include: staffDataInclude,
  });
}
