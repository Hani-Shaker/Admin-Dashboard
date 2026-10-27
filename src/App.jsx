
import './App.css'
import RecentOrders from './components/RecentOrders'

function App() {
  return (
    <main className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="mb-2 text-sm font-medium text-blue-600">
            ADMIN DASHBOARD
          </p>

          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h1>

          <p className="mt-2 text-gray-500">
            Welcome back! Here is your latest order activity.
          </p>
        </header>

        <RecentOrders />
      </div>
    </main>
  )
}

export default App
