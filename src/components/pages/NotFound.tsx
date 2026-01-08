import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center border rounded-lg p-6 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-2">404</h1>
        <p className="text-sm text-gray-500 mb-4">
          The page you’re trying to access doesn’t exist.
        </p>

        <Link
          to="/dashboard"
          className="border px-4 py-2 rounded-md text-sm hover:bg-gray-50"
        >
          Go Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
