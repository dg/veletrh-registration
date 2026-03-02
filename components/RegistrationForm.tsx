"use client";

import { useState } from "react";
import { registrationSchema } from "@/lib/validations";

export default function RegistrationForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "Czech Republic",
    customCountry: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const showCustomCountry = form.country === "other";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setErrorMessage("");

    const data = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      country: showCustomCountry ? form.customCountry : form.country,
    };

    const parsed = registrationSchema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const mapped: Record<string, string> = {};
      for (const [key, msgs] of Object.entries(fieldErrors)) {
        if (msgs && msgs.length > 0) mapped[key] = msgs[0];
      }
      setErrors(mapped);
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json();
        setStatus("error");
        setErrorMessage(json.error || "Nastala chyba při registraci");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Nastala chyba při odesílání");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg bg-green-50 border border-green-200 p-8 text-center">
        <h2 className="text-2xl font-bold text-green-800 mb-2">
          Registrace úspěšná!
        </h2>
        <p className="text-green-700">
          Děkujeme za registraci. Potvrzovací e-mail byl odeslán na vaši adresu.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status === "error" && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-700">
          {errorMessage}
        </div>
      )}

      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
          Jméno
        </label>
        <input
          id="firstName"
          type="text"
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
        />
        {errors.firstName && (
          <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
        )}
      </div>

      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
          Příjmení
        </label>
        <input
          id="lastName"
          type="text"
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
        />
        {errors.lastName && (
          <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
          Země
        </label>
        <select
          id="country"
          value={form.country}
          onChange={(e) => setForm({ ...form, country: e.target.value })}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
        >
          <option value="Czech Republic">Česká republika</option>
          <option value="Slovakia">Slovensko</option>
          <option value="other">Jiná</option>
        </select>
      </div>

      {showCustomCountry && (
        <div>
          <label htmlFor="customCountry" className="block text-sm font-medium text-gray-700 mb-1">
            Název země
          </label>
          <input
            id="customCountry"
            type="text"
            value={form.customCountry}
            onChange={(e) => setForm({ ...form, customCountry: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          />
          {errors.country && (
            <p className="mt-1 text-sm text-red-600">{errors.country}</p>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {status === "loading" ? "Odesílání..." : "Registrovat se"}
      </button>
    </form>
  );
}
