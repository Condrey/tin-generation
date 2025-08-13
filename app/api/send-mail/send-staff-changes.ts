import { webName } from "@/lib/utils";
import { SendMailSchema } from "@/lib/validation";
import { sendMail } from "./nodemailer";

export const sendStaffChanges = async ({
  email,
  staff,
  queryType,
  totalStaffs: totalStaffCount,
  staffsCompleted: withTinCount,
}: SendMailSchema) => {
  const { name, employeeNumber, supplierNumber, tin } = staff;
  const organization = webName;
  const senderName = "IT Officer | Lira City";
  const senderTitle = "Mr. Ogwang Coundrey James";
  const withoutTinCount = totalStaffCount - withTinCount;

  const subject =
    queryType === "CREATE"
      ? `Added ${name} on the list`
      : queryType === "UPDATE"
      ? `Updated ${name}'s information on the TIN collection list`
      : queryType === "DELETE"
      ? `Deleted ${name} from the TIN collection list`
      : `${name} updated their TIN on the TIN collection list`;

  const actionDescription =
    queryType === "CREATE"
      ? `A new employee ${name} has been added to the TIN collection list.`
      : queryType === `UPDATE`
      ? `The employee's details (${name}) have been updated on the TIN collection list.`
      : queryType === `DELETE`
      ? `The employee (${name}) has been removed from the TIN collection list.`
      : `The employee, ${name} has updated their TIN number.`;

  const htmlContent = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f8fafc; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: white; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0;">
      <div style="background-color: #1e293b; padding: 16px;">
        <h2 style="margin: 0; color: #facc15; font-size: 20px;">${organization}</h2>
      </div>
      <div style="padding: 20px;">
        <p style="font-size: 16px; color: #334155;">${actionDescription}</p>
        
        <table style="border-collapse: collapse; width: 100%; margin-top: 10px;">
          <tr>
            <td style="padding: 8px; border: 1px solid #cbd5e1; background-color: #f1f5f9;"><strong>Name</strong></td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #cbd5e1; background-color: #f1f5f9;"><strong>Employee Number</strong></td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">${
              employeeNumber ?? "—"
            }</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #cbd5e1; background-color: #f1f5f9;"><strong>Supplier Number</strong></td>
            <td style="padding: 8px; border: 1px solid #cbd5e1;">${
              supplierNumber ?? "—"
            }</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #cbd5e1; background-color: #f1f5f9;"><strong>TIN</strong></td>
            <td style="padding: 8px; border: 1px solid #cbd5e1; color: ${
              tin ? "#15803d" : "#b91c1c"
            };">
              ${tin ?? "Not Provided"}
            </td>
          </tr>
        </table>

        <div style="margin-top: 20px; background-color: #f8fafc; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0;">
          <p style="margin: 0; font-weight: bold; color: #1e293b;">TIN Collection Progress</p>
          <p style="margin: 4px 0; color: #334155;">Total Staff: <strong>${totalStaffCount}</strong></p>
          <p style="margin: 4px 0; color: #334155;">With TIN: <strong style="color: #15803d;">${withTinCount}</strong></p>
          <p style="margin: 4px 0; color: #334155;">Without TIN: <strong style="color: #b91c1c;">${withoutTinCount}</strong></p>
        </div>

        <div style="margin-top: 20px;">
          <a href="${
            process.env.NEXT_PUBLIC_BASE_URL
          }" style="display: inline-block; background-color: #1e293b; color: #facc15; padding: 10px 16px; border-radius: 4px; text-decoration: none; font-weight: bold;">
            View & download Full List (in excel)
          </a>
        </div>

        <p style="margin-top: 30px; color: #475569;">Best regards,<br>${senderName}<br>${senderTitle}</p>
      </div>
    </div>
  </div>
  `;
  // ,"rakullocdosdr933@gmail.com","aminahnafula768@gmail.com",	"ochenokoth@gmail.com"
  try {
    await sendMail(
      [
        email,
        "rakullocdosdr933@gmail.com",
        "aminahnafula768@gmail.com",
        "ochenokoth@gmail.com",
      ],
      {
        html: htmlContent,
        subject,
        organization,
        displayName: senderName,
      }
    );
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send email.");
  }
};
