
import { FiDollarSign, FiShoppingCart, FiUsers } from "react-icons/fi";

const stats = [
  {
    id: 1,
    title: "Revenue",
    value: "$24,500",
    change: "+12.5%",
    description: "from last month",
    icon: FiDollarSign,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    positive: true,
  },
  {
    id: 2,
    title: "Orders Count",
    value: "1,250",
    change: "+8.2%",
    description: "from last month",
    icon: FiShoppingCart,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    positive: true,
  },
  {
    id: 3,
    title: "Customers",
    value: "850",
    change: "+5.4%",
    description: "from last month",
    icon: FiUsers,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    positive: true,
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.id}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

                <h2 className="mt-2 text-2xl font-bold text-gray-800">
                  {stat.value}
                </h2>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconBg}`}
              >
                <Icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 text-sm">
              <span className="font-semibold text-green-600">
                {stat.change}
              </span>

              <span className="text-gray-400">
                {stat.description}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
