"use client";

interface Registration {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  createdAt: string;
}

interface RegistrationTableProps {
  registrations: Registration[];
}

export default function RegistrationTable({ registrations }: RegistrationTableProps) {
  if (registrations.length === 0) {
    return <p className="text-gray-500 text-center py-8">Zatím žádné registrace</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Jméno</th>
            <th className="px-4 py-3">Příjmení</th>
            <th className="px-4 py-3">E-mail</th>
            <th className="px-4 py-3">Země</th>
            <th className="px-4 py-3">Datum</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {registrations.map((reg) => (
            <tr key={reg.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">{reg.id}</td>
              <td className="px-4 py-3">{reg.firstName}</td>
              <td className="px-4 py-3">{reg.lastName}</td>
              <td className="px-4 py-3">{reg.email}</td>
              <td className="px-4 py-3">{reg.country}</td>
              <td className="px-4 py-3">
                {new Date(reg.createdAt).toLocaleString("cs-CZ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
