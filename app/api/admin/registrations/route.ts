import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Nepřihlášen" }, { status: 401 });
  }

  const registrations = await prisma.registration.findMany({
    orderBy: { createdAt: "desc" },
  });

  const countryStats = registrations.reduce<Record<string, number>>(
    (acc, reg) => {
      acc[reg.country] = (acc[reg.country] || 0) + 1;
      return acc;
    },
    {}
  );

  return NextResponse.json({
    total: registrations.length,
    registrations,
    countryStats,
  });
}
