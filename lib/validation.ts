import z from "zod";

const requiredString = z.string().min(1, "This field is required.");
export const staffSchema = z.object({
  id: z.number().optional(),
  name: requiredString,
  employeeNumber: requiredString,
  tin: z.string().optional(),
  supplierNumber: requiredString,
});
export type StaffSchema = z.infer<typeof staffSchema>;
