import { z } from "zod";

export const registrationSchema = z.object({
  firstName: z.string().min(1, "Jméno je povinné"),
  lastName: z.string().min(1, "Příjmení je povinné"),
  email: z.string().email("Neplatný e-mail"),
  country: z.string().min(1, "Země je povinná"),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
