"use server";

import prisma from "@/lib/prisma";
import { staffDataInclude } from "@/lib/types";
import { SendMailSchema, staffSchema, StaffSchema } from "@/lib/validation";
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
  const { data, staffsCompleted, totalStaffs } = await prisma.$transaction(
    async (tx) => {
      const data = await tx.staff.upsert({
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
      const totalStaffs = await tx.staff.count();
      const staffsCompleted = await tx.staff.count({
        where: { hasTin: true },
      });
      return { data, totalStaffs, staffsCompleted };
    },
  );
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-mail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      staff: data as StaffSchema,
      email: "wangzdrey@gmail.com",
      queryType: id === 0 || undefined ? "CREATE" : "UPDATE",
      staffsCompleted,
      totalStaffs,
    } satisfies SendMailSchema),
  });
  return data;
}

export async function updateStaffTin(input: StaffSchema) {
  //TODO: use authorization
  const { id, employeeNumber, name, supplierNumber, tin } =
    staffSchema.parse(input);
  const hasTin = !!tin;
  const { data, staffsCompleted, totalStaffs } = await prisma.$transaction(
    async (tx) => {
      const data = await tx.staff.update({
        where: { id },
        data: {
          tin: tin!,
          hasTin,
        },
        include: staffDataInclude,
      });
      const totalStaffs = await tx.staff.count();
      const staffsCompleted = await tx.staff.count({
        where: { hasTin: true },
      });
      return { data, totalStaffs, staffsCompleted };
    },
  );
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-mail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      staff: data as StaffSchema,
      email: "wangzdrey@gmail.com",
      queryType: "TIN",
      staffsCompleted,
      totalStaffs,
    } satisfies SendMailSchema),
  });
  return data;
}

export async function deleteStaff(id: number) {
  //TODO: use authorization
  const { data, staffsCompleted, totalStaffs } = await prisma.$transaction(
    async (tx) => {
      const data = await prisma.staff.delete({
        where: { id },
        include: staffDataInclude,
      });
      const totalStaffs = await tx.staff.count();
      const staffsCompleted = await tx.staff.count({
        where: { hasTin: true },
      });
      return { data, totalStaffs, staffsCompleted };
    },
  );
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-mail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      staff: data as StaffSchema,
      email: "wangzdrey@gmail.com",
      queryType: "DELETE",
      staffsCompleted,
      totalStaffs,
    } satisfies SendMailSchema),
  });
  return data;
}
