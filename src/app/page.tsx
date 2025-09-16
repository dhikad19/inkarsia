export default function HomePage() {
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Welcome 🚀</h1>
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full border rounded px-3 py-2"
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 rounded border hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
