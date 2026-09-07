export default function SummaryCard({
  title,
  amount,
  subtitle,
  icon: Icon,
  iconBg = "bg-blue-100",
  iconColor = "text-blue-600",
  percentage,
  trend = "up",
}) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">

      {/* Top Section */}
      <div className="flex items-start justify-between">

        {/* Icon */}
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full ${iconBg}`}
        >
          {Icon && (
            <Icon
              className={`h-6 w-6 ${iconColor}`}
            />
          )}
        </div>

        {/* Information */}
        <div className="ml-4 flex-1">
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="mt-1 text-[22px] font-bold tracking-tight text-[#172554]">
            {amount}
          </h2>

          <p className="mt-0.5 text-xs text-gray-500">
            {subtitle}
          </p>
        </div>
      </div>


      {/* Bottom Trend */}
      <div className="mt-2 flex items-center gap-1.5 text-xs">

        {/* Arrow */}
        <span
          className={`text-sm font-bold ${
            trend === "up"
              ? "text-emerald-500"
              : "text-red-500"
          }`}
        >
          {trend === "up" ? "↑" : "↓"}
        </span>

        {/* Percentage */}
        <span
          className={`font-semibold ${
            trend === "up"
              ? "text-emerald-500"
              : "text-red-500"
          }`}
        >
          {percentage}
        </span>

        {/* Description */}
        <span className="text-gray-500">
          from last month
        </span>
      </div>

    </div>
  );
}