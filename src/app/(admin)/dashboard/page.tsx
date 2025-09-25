export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-gray-600 dark:text-gray-300">
        Welcome to your admin dashboard. Here you can manage users, settings,
        and more.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 shadow">
          <h2 className="text-lg font-semibold">Users</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage registered users
          </p>
        </div>

        <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 shadow">
          <h2 className="text-lg font-semibold">Analytics</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            View site analytics
          </p>
        </div>

        <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 shadow">
          <h2 className="text-lg font-semibold">Settings</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Configure application settings
          </p>
        </div>
      </div>
    </div>
  );
}
