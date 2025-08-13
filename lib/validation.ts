import z from "zod";

const requiredString = z.string().min(1, "This field is required.");
export const staffSchema = z.object({
  id: z.number().optional(),
  name: requiredString,
  employeeNumber: requiredString.length(15,'Include leading zeros, Number should be 15 characters'),
  tin: z.string().length(10,'TIN must be 10 characters').optional(),
  supplierNumber: requiredString,
});
export type StaffSchema = z.infer<typeof staffSchema>;

export const sendMailSchema = z.object({
   email: requiredString,
  staff: staffSchema,
  queryType: z.enum(["UPDATE", "DELETE", "CREATE", "TIN"]),
  staffsCompleted:z.number(),
  totalStaffs:z.number()
})
export type SendMailSchema = z.infer<typeof sendMailSchema>;
