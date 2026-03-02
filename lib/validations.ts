import { z } from "zod";

export const registrationSchema = z.object({
  firstName: z.string().min(1, "Jméno je povinné").max(100, "Jméno je příliš dlouhé"),
  lastName: z.string().min(1, "Příjmení je povinné").max(100, "Příjmení je příliš dlouhé"),
  email: z.string().email("Neplatný e-mail").max(200, "E-mail je příliš dlouhý"),
  country: z.string().min(1, "Země je povinná").max(100, "Název země je příliš dlouhý"),
  city: z.string().min(1, "Město je povinné").max(100, "Název města je příliš dlouhý"),
  budget: z.number({ invalid_type_error: "Rozpočet musí být číslo" }).int("Rozpočet musí být celé číslo").min(0, "Rozpočet nemůže být záporný").max(10000000, "Rozpočet je příliš velký"),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
