import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const securityKey = "r3cords";
export const webName = "TIN Collection | Lira City Council";
export const webDescription =
  "This website was created temporarily for collection of TIN (TaxPayer Identification Number) for a selected Lira City Council staff with missing Salary for the Month of July 2025";
