import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md border rounded-xl p-6 shadow-sm">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 rounded-md bg-black dark:bg-white flex items-center justify-center">
            <GraduationCap className="text-white dark:text-black" size={22} />
          </div>

          <h1 className="text-2xl font-bold mt-2">Welcome to Pathly</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This project originally had login & signup, but for the hackathon
            demo we’ve kept things simple. You can directly explore the app.
          </p>

          <Link
            to="/dashboard"
            className="mt-4 px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
