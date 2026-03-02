import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function sendConfirmationEmail(
  email: string,
  firstName: string
) {
  try {
    await getResend().emails.send({
      from: "Veletrh <onboarding@resend.dev>",
      to: email,
      subject: "Potvrzení registrace na veletrh",
      html: `
        <h1>Děkujeme za registraci, ${firstName}!</h1>
        <p>Vaše registrace na veletrh byla úspěšně přijata.</p>
        <p>Těšíme se na setkání!</p>
      `,
    });
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
  }
}
