"use client";

import { useEffect, useState } from "react";
import CountryChart from "@/components/CountryChart";
import RegistrationTable from "@/components/RegistrationTable";
import LogoutButton from "@/components/LogoutButton";

interface Registration {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  createdAt: string;
}

interface DashboardData {
  total: number;
  registrations: Registration[];
  countryStats: Record<string, number>;
}

export default function AdminPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/registrations")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Načítání...</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <main className="min-h-screen p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Administrace veletrhu
        </h1>
        <LogoutButton />
      </div>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <div className="rounded-lg bg-white border border-gray-200 p-6">
          <h2 className="text-sm font-medium text-gray-500 mb-1">
            Celkem registrací
          </h2>
          <p className="text-4xl font-bold text-gray-900">{data.total}</p>
        </div>

        <div className="rounded-lg bg-white border border-gray-200 p-6">
          <h2 className="text-sm font-medium text-gray-500 mb-4">
            Registrace podle zemí
          </h2>
          <CountryChart data={data.countryStats} />
        </div>
      </div>

      <div className="rounded-lg bg-white border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Všechny registrace
          </h2>
          <a
            href="/api/admin/export"
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors"
          >
            Export do Excelu
          </a>
        </div>
        <RegistrationTable registrations={data.registrations} />
      </div>
    </main>
  );
}
