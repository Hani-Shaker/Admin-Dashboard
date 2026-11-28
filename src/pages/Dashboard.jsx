import { useCallback, useEffect, useMemo, useState } from 'react';
import { ShoppingBag, Clock, DollarSign, ShoppingCart, Package, Users } from 'lucide-react';
import api, { getErrorMessage } from '../api/axios';
import StatCard from '../components/StatCard';
import Spinner from '../components/Spinner';

// Tolerate different response shapes: [..] / { key: [..] } / { data: [..] }
const toList = (d, key) =>
  Array.isArray(d) ? d : d?.[key] || d?.data?.[key] || (Array.isArray(d?.data) ? d.data : []);
const total = (o) => Number(o.totalPrice ?? o.total ?? o.totalAmount ?? 0);
const itemsOf = (o) => o.items || o.orderItems || o.products || [];
const itemName = (i) => i.product?.name || i.name || 'Product';
const itemImg = (i) => i.product?.images?.[0]?.url || i.product?.images?.[0] || i.product?.image || i.image;
const itemQty = (i) => Number(i.quantity ?? i.qty ?? 1);
const itemPrice = (i) => Number(i.price ?? i.product?.discountPrice ?? i.product?.price ?? 0);
const money = (n) => Number(n).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
const date = (d) => (d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '');

const STATUSES = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  processing: 'bg-sky-50 text-sky-700 border-sky-200',
  confirmed: 'bg-blue-50 text-blue-700 border-blue-200',
  shipped: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  cancelled: 'bg-rose-50 text-rose-700 border-rose-200',
};

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [o, u] = await Promise.all([api.get('/orders/admin'), api.get('/users/all')]);
      setOrders(toList(o.data, 'orders'));
      setUsers(toList(u.data, 'users'));
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => { load(); }, [load]);

  const s = useMemo(() => {
    const valid = orders.filter((o) => o.status !== 'cancelled');
    const now = new Date();
    const thisMonth = valid.filter((o) => {
      const d = new Date(o.createdAt);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
    const byStatus = Object.fromEntries(Object.keys(STATUSES).map((k) => [k, 0]));
    orders.forEach((o) => { if (o.status in byStatus) byStatus[o.status] += 1; });

    const prod = {};
    valid.forEach((o) => itemsOf(o).forEach((i) => {
      const k = itemName(i);
      prod[k] ||= { name: k, img: itemImg(i), units: 0, revenue: 0 };
      prod[k].units += itemQty(i);
      prod[k].revenue += itemQty(i) * itemPrice(i);
    }));
    const top = Object.values(prod).sort((a, b) => b.units - a.units).slice(0, 5);

    return {
      count: orders.length,
      revenue: valid.reduce((t, o) => t + total(o), 0),
      month: thisMonth.reduce((t, o) => t + total(o), 0),
      byStatus, top,
      customers: users.filter((u) => u.role !== 'admin').length,
      recent: orders.slice(0, 5),
    };
  }, [orders, users]);

  if (loading) return <div className="grid place-items-center py-24"><Spinner /></div>;

  if (error) {
    return (
      <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
        <p>{error}</p>
        <button onClick={load} className="mt-2 text-sm font-semibold underline">Try again</button>
      </div>
    );
  }

  const card = 'rounded-xl border border-slate-200 bg-white p-6 shadow-sm';

  return (
    <div className="space-y-6">
      <section className={card}>
        <h2 className="text-xl font-semibold">Store overview</h2>
        <p className="mt-1 text-sm text-slate-500">Orders, revenue and customers, updated from your API.</p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Total Orders" value={s.count} hint="All orders received" icon={ShoppingBag} tone="emerald" />
        <StatCard label="Pending Orders" value={s.byStatus.pending} hint="Awaiting action" icon={Clock} tone="amber" />
        <StatCard label="Revenue" value={money(s.revenue)} hint="Excluding cancelled orders" icon={DollarSign} tone="rose" />
        <StatCard label="This Month" value={money(s.month)} hint="Sales this month" icon={ShoppingCart} tone="sky" />
        <StatCard label="Top Product" value={s.top[0]?.name || '—'} hint={s.top[0] ? `${s.top[0].units} units sold` : 'No sales yet'} icon={Package} tone="indigo" />
        <StatCard label="Users" value={s.customers} hint="Registered customers" icon={Users} tone="slate" />
      </section>

      <div className="grid gap-6 xl:grid-cols-5">

      </div>

      <section className={card}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent orders</h2>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">{s.recent.length} orders</span>
        </div>
        {s.recent.length === 0 ? (
          <p className="mt-4 rounded-lg border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">No orders yet. New orders will show up here.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {s.recent.map((o) => (
              <li key={o._id || o.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 p-4">
                <div className="min-w-0">
                  <p className="font-semibold">{o.user?.username || o.user?.name || 'Customer'}</p>
                  <p className="truncate text-sm text-slate-500">
                    {itemsOf(o).map(itemName).join(', ') || 'Order'} • {date(o.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full border px-3 py-1 text-xs font-medium ${STATUSES[o.status] || 'bg-slate-50 text-slate-600 border-slate-200'}`}>{o.status}</span>
                  <span className="font-semibold tabular-nums">{money(total(o))}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
