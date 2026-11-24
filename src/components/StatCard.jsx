import Icon from "./Icon";

/* ---------- Icons and colors ---------- */

const iconProps = {
    className: "h-6 w-6",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 1.8,
    "aria-hidden": true,
};

const ICONS = {
    revenue: (
        <Icon iconName="revenue" properties={{ ...iconProps }} />
    ),
    orders: (
        <Icon iconName="orders" properties={{ ...iconProps }} />
    ),
    customers: (
        <Icon iconName="customers" properties={{ ...iconProps }} />
    ),
    products: (
        <Icon iconName="products" properties={{ ...iconProps }} />
    ),
    default: (
        <svg {...iconProps}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.1-1.34 2-3 2s-3-.9-3-2 1.34-2 3-2 3 .9 3 2zm12-3c0 1.1-1.34 2-3 2s-3-.9-3-2 1.34-2 3-2 3 .9 3 2z" />
        </svg>
    ),
};

const COLORS = {
    revenue: "bg-emerald-100 text-emerald-600",
    orders: "bg-indigo-100 text-indigo-600",
    customers: "bg-sky-100 text-sky-600",
    products: "bg-amber-100 text-amber-600",
    default: "bg-slate-100 text-slate-600",
};

/* ---------- Helpers functions ---------- */

function formatValue(value, format, currency) {
    const n = Number(value);
    if (!Number.isFinite(n)) return String(value);
    if (format === "currency") {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency,
            maximumFractionDigits: 0,
        }).format(n);
    }
    if (format === "compact") {
        return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n);
    }
    return new Intl.NumberFormat("en-US").format(n);
}

/* ---------- Pieces ---------- */

function RateOfChange({ change, changeLabel }) {
    if (change === undefined || change === null || Number.isNaN(Number(change))) return null;

    const num = Number(change);
    const up = num > 0;
    const fixed = num === 0;
    const tone = fixed ? "text-slate-500 bg-slate-100" : up ? "text-emerald-700 bg-emerald-50" : "text-red-700 bg-red-50";

    return (
        <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm">
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold ${tone}`}>
                {!fixed && (
                    <Icon iconName={up ? "arrow-up" : "arrow-down"} properties={{ ...iconProps, className: "h-3 w-3" }} />
                )}
                {up ? "+" : ""}
                {num}%
                <span className="sr-only">{fixed ? "no change" : up ? "increase" : "decrease"}</span>
            </span>
            <span className="text-slate-500">{changeLabel}</span>
        </p>
    );
}

function CardContainer({ content }) {
    return (
        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5 lg:p-6">
            {content}
        </div>
    );
}

/* ---------- Card ---------- */

export default function StatCard({
    title,
    value,
    variant = "default",
    icon,
    format = "number",
    currency = "EGP",
    change = 0,
    changeLabel = "vs last week",
    // loading = false, -> we can use it in the skeleton loading if we want to use it
    error = null,
    onRetry,
}) {
    const color = COLORS[variant] ?? COLORS.default;
    const cardIcon = icon ?? ICONS[variant] ?? ICONS.default;
    const isEmpty = value === null || value === undefined || value === "";

    /* skeleton loading - (optional) */
    // if (loading) {
    //     return (
    //         <CardContainer>
    //             <div role="status" aria-label={`Loading ${title}`} className="animate-pulse">
    //                 <div className="flex items-start justify-between gap-3">
    //                     <div className="h-4 w-24 rounded bg-slate-200" />
    //                     <div className="h-11 w-11 rounded-xl bg-slate-200 sm:h-12 sm:w-12" />
    //                 </div>
    //                 <div className="mt-4 h-8 w-32 rounded bg-slate-200 sm:h-9" />
    //                 <div className="mt-4 h-5 w-28 rounded bg-slate-200" />
    //             </div>
    //         </CardContainer>
    //     );
    // }

    /* Displaying an error with a retry function */
    if (error) {
        const message = typeof error === "string" ? error : error.message || "Failed to load";
        return (
            <CardContainer>
                <div role="alert" className="flex items-start justify-between gap-3">
                    <p className="min-w-0 truncate text-sm font-medium text-slate-500">{title}</p>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600 sm:h-12 sm:w-12">
                        <Icon iconName="error" properties={{ ...iconProps, className: "h-6 w-6" }} />
                    </div>
                </div>
                <p className="mt-3 wrap-break text-sm text-red-600">{message}</p>
                {onRetry && (
                    <button
                        type="button"
                        onClick={onRetry}
                        className="mt-3 rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    >
                        Retry
                    </button>
                )}
            </CardContainer>
        );
    }

    return (
        <CardContainer>
            <div className="flex items-start justify-between gap-3">
                <p className="min-w-0 truncate text-sm font-medium text-slate-500" title={title}>
                    {title}
                </p>
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${color}`}>
                    {cardIcon}
                </div>
            </div>

            {isEmpty ? (
                <>
                    <p className="mt-3 text-2xl font-bold text-slate-300 sm:text-3xl">—</p>
                    <p className="mt-3 text-xs text-slate-400 sm:text-sm">No data yet</p>
                </>
            ) : (
                <>
                    <p className="mt-3 truncate text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl" title={formatValue(value, format, currency)} >
                        {formatValue(value, format, currency)}
                    </p>
                    <RateOfChange change={change} changeLabel={changeLabel} />
                </>
            )}
        </CardContainer>
    );
}

/* ---------- Responsive grid wrapper ---------- */

export function StatCardGrid({ childrens }) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
            {childrens}
        </div>
    );
}