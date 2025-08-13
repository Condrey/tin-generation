import { sendMailSchema } from "@/lib/validation";
import { sendStaffChanges } from "./send-staff-changes";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, staff, queryType, staffsCompleted, totalStaffs } =
    sendMailSchema.parse(body);
  try {
    await sendStaffChanges({
      email,
      staff,
      queryType,
      staffsCompleted,
      totalStaffs,
    });
    return Response.json("Success", { status: 200, statusText: "Email sent" });
  } catch (error) {
    console.error(error);
    return Response.json("Failed to send email", {
      status: 500,
      statusText: "Server error",
    });
  }
}
