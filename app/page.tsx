import RegistrationForm from "@/components/RegistrationForm";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Registrace na veletrh
        </h1>
        <RegistrationForm />
      </div>
    </main>
  );
}
