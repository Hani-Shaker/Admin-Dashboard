import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecentOrders from './components/RecentOrders'
import DashboardLayout from './layouts/DashboardLayout'
import Login from './pages/Login'
import './App.css'


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* صفحة تسجيل الدخول بدون Sidebar */}
        <Route path="/login" element={<Login />} />

        {/* باقي الصفحات داخل Layout */}
        <Route path="/" element={<DashboardLayout />}>
          {/* <Route path="/" element={<Dashboard />} /> */}
          {/* <Route path="/products" element={<Products />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/users" element={<Users />} /> */}
          <Route path="/recent-orders" element={<RecentOrders />} />
        </Route>

      </Routes>
    </BrowserRouter>
    // <main className="min-h-screen bg-gray-100 p-6 md:p-10">
    //   <div className="mx-auto max-w-7xl">
    //     <header className="mb-8">
    //       <p className="mb-2 text-sm font-medium text-blue-600">
    //         ADMIN DASHBOARD
    //       </p>

    //       <h1 className="text-3xl font-bold text-gray-900">
    //         Dashboard
    //       </h1>

    //       <p className="mt-2 text-gray-500">
    //         Welcome back! Here is your latest order activity.
    //       </p>
    //     </header>

    // <RecentOrders />
    //   </div>
    // </main>
  )
}

export default App
