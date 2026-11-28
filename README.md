# Admin Dashboard — Week 1

## تشغيل المشروع
```bash
npm install
cp .env.example .env   # عدّل VITE_API_URL لرابط الـ API بتاعك
npm run dev
```

## اللي اتعمل (Week 1)
- Vite + React 18 + Tailwind CSS
- Axios instance (request interceptor للتوكن + response interceptor للـ 401)
- AuthContext (login / logout / جلب بيانات المستخدم عند التحميل)
- ProtectedRoute (لازم token + role = admin)
- Sidebar (NavLink + موبايل drawer + بيانات المستخدم + Logout) و Layout
- Login مع validation (React Hook Form) + Toast + حالات loading/error
- Dashboard: Revenue / Orders / Customers من الـ API

## ملاحظة
شكل الـ response بيتعامل معاه بمرونة (`user` / `data` ...). لو الـ API عندك بيرجّع أسماء حقول مختلفة، عدّل `pickUser` في AuthContext و `toList` / `orderTotal` في Dashboard.
