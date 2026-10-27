
const orders = [
  {
    id: "#ORD-001",
    customer: "Ahmed Mohamed",
    date: "2026-10-25",
    total: 2500,
    status: "Delivered",
  },
  {
    id: "#ORD-002",
    customer: "Sara Ali",
    date: "2026-10-27",
    total: 1800,
    status: "Pending",
  },
  {
    id: "#ORD-003",
    customer: "Omar Hassan",
    date: "2026-10-24",
    total: 3200,
    status: "Processing",
  },
  {
    id: "#ORD-004",
    customer: "Mona Ahmed",
    date: "2026-10-26",
    total: 950,
    status: "Cancelled",
  },
  {
    id: "#ORD-005",
    customer: "Youssef Ali",
    date: "2026-10-23",
    total: 4100,
    status: "Delivered",
  },
  {
    id: "#ORD-006",
    customer: "Nada Mostafa",
    date: "2026-10-27",
    total: 1500,
    status: "Processing",
  },
  {
    id: "#ORD-007",
    customer: "Ali Mahmoud",
    date: "2026-10-22",
    total: 2700,
    status: "Pending",
  },
];

const statusStyles = {
  Delivered: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Processing: "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-700",
};

function RecentOrders() {
  // ترتيب الطلبات من الأحدث للأقدم
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <section className="w-full rounded-xl bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Recent Orders
        </h2>

        <button
          type="button"
          className="text-sm font-medium text-blue-600 transition hover:text-blue-800"
        >
          View All
        </button>
      </div>

      {/* Orders Table */}
      {recentOrders.length === 0 ? (
        <div className="py-10 text-center text-gray-500">
          No orders found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left">
            {/* Table Header */}
            <thead>
              <tr className="border-b border-gray-200 text-sm text-gray-500">
                <th className="px-4 py-3 font-medium">
                  Order ID
                </th>

                <th className="px-4 py-3 font-medium">
                  Customer
                </th>

                <th className="px-4 py-3 font-medium">
                  Date
                </th>

                <th className="px-4 py-3 font-medium">
                  Total
                </th>

                <th className="px-4 py-3 font-medium">
                  Status
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-100 transition hover:bg-gray-50 last:border-0"
                >
                  {/* Order ID */}
                  <td className="px-4 py-4 text-sm font-medium text-gray-800">
                    {order.id}
                  </td>

                  {/* Customer */}
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {order.customer}
                  </td>

                  {/* Date */}
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {order.date}
                  </td>

                  {/* Total */}
                  <td className="px-4 py-4 text-sm font-medium text-gray-800">
                    {order.total.toLocaleString()} EGP
                  </td>

                  {/* Status */}
                  <td className="px-4 py-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                        statusStyles[order.status] ||
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default RecentOrders;
