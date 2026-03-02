import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import ExcelJS from "exceljs";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Nepřihlášen" }, { status: 401 });
  }

  const registrations = await prisma.registration.findMany({
    orderBy: { createdAt: "desc" },
  });

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Registrace");

  sheet.columns = [
    { header: "ID", key: "id", width: 8 },
    { header: "Jméno", key: "firstName", width: 20 },
    { header: "Příjmení", key: "lastName", width: 20 },
    { header: "E-mail", key: "email", width: 30 },
    { header: "Město", key: "city", width: 20 },
    { header: "Země", key: "country", width: 20 },
    { header: "Rozpočet (EUR)", key: "budget", width: 15 },
    { header: "Datum registrace", key: "createdAt", width: 22 },
  ];

  // Bold header row
  sheet.getRow(1).font = { bold: true };

  for (const reg of registrations) {
    sheet.addRow({
      id: reg.id,
      firstName: reg.firstName,
      lastName: reg.lastName,
      email: reg.email,
      city: reg.city,
      country: reg.country,
      budget: reg.budget,
      createdAt: reg.createdAt.toLocaleString("cs-CZ"),
    });
  }

  const buffer = await workbook.xlsx.writeBuffer();

  return new NextResponse(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": 'attachment; filename="registrace.xlsx"',
    },
  });
}
