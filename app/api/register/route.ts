import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { registrationSchema } from "@/lib/validations";
// import { sendConfirmationEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registrationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Neplatná data", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, country, city, budget } = parsed.data;

    const existing = await prisma.registration.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Tento e-mail je již registrován" },
        { status: 409 }
      );
    }

    const registration = await prisma.registration.create({
      data: { firstName, lastName, email, country, city, budget },
    });

    // TODO: enable when RESEND_API_KEY is configured
    // sendConfirmationEmail(email, firstName);

    return NextResponse.json(
      { message: "Registrace úspěšná", id: registration.id },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Chyba serveru" },
      { status: 500 }
    );
  }
}
